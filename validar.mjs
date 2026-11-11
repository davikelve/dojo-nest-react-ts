// Validador do conteúdo do Dojo. Prova por execução: roda cada exercício "prever" e confere a saída,
// passa cada exercício "compila" pelo compilador e confere o veredito. Nada é aceito por leitura.
//
//   node validar.mjs                      valida tudo o que existe em conteudo/
//   node validar.mjs conteudo/ts.json     valida um arquivo
//   node validar.mjs --completo           além disso, exige todas as lições da ementa
//   node validar.mjs --json               placar em JSON (para o guia ler)
import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { rodar, checar, normaliza, carregaTs, RAIZ_DOJO } from './motor/executa.mjs';

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith('--')));
const arquivosPedidos = args.filter((a) => !a.startsWith('--'));
const DIR = path.join(RAIZ_DOJO, 'conteudo');

const ementa = JSON.parse(await readFile(path.join(DIR, '_ementa.json'), 'utf8'));
const esperado = new Map();
for (const t of ementa.trilhas) for (const l of t.licoes) esperado.set(l.id, { ...l, trilha: t.id });

const arquivos = arquivosPedidos.length
  ? arquivosPedidos.map((a) => path.resolve(a))
  : (await readdir(DIR)).filter((f) => f.endsWith('.json') && !f.startsWith('_')).map((f) => path.join(DIR, f));

const falhas = [];
const placar = { licoes: 0, prever: 0, compila: 0, quiz: 0, corredor: 0, pratica: 0, cartoes: 0, palavras: 0 };
const vistos = new Set();
const tarefas = [];
const falha = (onde, msg) => falhas.push(`${onde}: ${msg}`);
const texto = (v) => typeof v === 'string' && v.trim().length > 0;
const palavras = (s) => String(s).split(/\s+/).filter(Boolean).length;

if (!carregaTs()) falha('ambiente', 'TypeScript não encontrado: rode npm install');

for (const arq of arquivos) {
  const nome = path.basename(arq);
  let doc;
  try {
    doc = JSON.parse(await readFile(arq, 'utf8'));
  } catch (e) {
    falha(nome, 'JSON inválido: ' + e.message);
    continue;
  }
  if (!Array.isArray(doc.licoes)) {
    falha(nome, 'falta o array "licoes"');
    continue;
  }
  for (const l of doc.licoes) {
    const onde = `${nome} ${l.id ?? '(sem id)'}`;
    const ref = esperado.get(l.id);
    if (!ref) {
      falha(onde, 'id fora da ementa');
      continue;
    }
    if (vistos.has(l.id)) falha(onde, 'id duplicado');
    vistos.add(l.id);
    placar.licoes++;
    if (l.titulo !== ref.titulo) falha(onde, `título difere da ementa (esperado: "${ref.titulo}")`);
    if (!Number.isInteger(l.minutos) || l.minutos < 4 || l.minutos > 15) falha(onde, '"minutos" deve ser inteiro de 4 a 15');
    if (!texto(l.ponte)) falha(onde, 'falta "ponte"');
    if (!texto(l.texto)) falha(onde, 'falta "texto"');
    else {
      const n = palavras(l.texto);
      placar.palavras += n;
      if (n < 220) falha(onde, `texto curto demais (${n} palavras; mínimo 220)`);
      if (n > 900) falha(onde, `texto longo demais (${n} palavras; máximo 900)`);
      if ((l.texto.match(/```/g) ?? []).length % 2) falha(onde, 'bloco de código ``` sem fechar');
    }
    if (!texto(l.naPratica)) falha(onde, 'falta "naPratica"');
    const ex = Array.isArray(l.exercicios) ? l.exercicios : [];
    if (ex.length < 3) falha(onde, `precisa de pelo menos 3 exercícios (tem ${ex.length})`);
    if (!ex.some((e) => e.tipo === 'quiz')) falha(onde, 'precisa de pelo menos 1 quiz');
    ex.forEach((e, i) => {
      const oe = `${onde} ex${i + 1}(${e.tipo})`;
      if (!texto(e.explicacao) && e.tipo !== 'pratica' && e.tipo !== 'corredor') falha(oe, 'falta "explicacao"');
      if (e.tipo === 'prever') {
        placar.prever++;
        if (!texto(e.codigo)) return falha(oe, 'falta "codigo"');
        if (typeof e.saida !== 'string') return falha(oe, 'falta "saida"');
        if (!['ts', 'js'].includes(e.linguagem)) return falha(oe, '"linguagem" deve ser ts ou js');
        tarefas.push(async () => {
          const r = await rodar(e.codigo, e.linguagem);
          if (r.estourou) return falha(oe, 'estourou o tempo');
          const obtido = normaliza(r.saida + (e.incluiErro ? r.erro : ''));
          if (!e.incluiErro && r.codigoSaida !== 0 && !e.terminaComErro)
            return falha(oe, `terminou com erro (use "terminaComErro": true se for de propósito): ${r.erro.slice(0, 300)}`);
          if (obtido !== normaliza(e.saida))
            falha(oe, `saída real difere.\n      esperado: ${JSON.stringify(normaliza(e.saida))}\n      obtido:   ${JSON.stringify(obtido)}`);
        });
      } else if (e.tipo === 'compila') {
        placar.compila++;
        if (!texto(e.codigo)) return falha(oe, 'falta "codigo"');
        if (typeof e.compila !== 'boolean') return falha(oe, '"compila" deve ser true ou false');
        tarefas.push(async () => {
          const erros = checar(e.codigo);
          if (e.compila && erros.length)
            return falha(oe, `deveria compilar, mas: ${erros.map((d) => `${d.codigo} L${d.linha} ${d.mensagem}`).join(' | ').slice(0, 400)}`);
          if (!e.compila) {
            if (!erros.length) return falha(oe, 'deveria NÃO compilar, mas compila');
            if (!texto(e.erro)) return falha(oe, 'falta "erro" (ex.: "TS2322")');
            if (!erros.some((d) => d.codigo === e.erro))
              return falha(oe, `erro esperado ${e.erro}; o compilador deu ${erros.map((d) => d.codigo + ' L' + d.linha).join(', ')}`);
            if (e.linha != null && !erros.some((d) => d.codigo === e.erro && d.linha === e.linha))
              falha(oe, `linha esperada ${e.linha}; o compilador apontou ${erros.map((d) => d.linha).join(', ')}`);
          }
        });
      } else if (e.tipo === 'quiz') {
        placar.quiz++;
        if (!texto(e.pergunta)) falha(oe, 'falta "pergunta"');
        if (!Array.isArray(e.opcoes) || e.opcoes.length < 3 || e.opcoes.length > 4 || !e.opcoes.every(texto))
          falha(oe, '"opcoes" deve ter 3 ou 4 textos');
        else if (new Set(e.opcoes).size !== e.opcoes.length) falha(oe, 'opções repetidas');
        if (!Number.isInteger(e.correta) || e.correta < 0 || e.correta >= (e.opcoes?.length ?? 0)) falha(oe, '"correta" fora do intervalo');
      } else if (e.tipo === 'corredor') {
        placar.corredor++;
        if (!texto(e.pergunta)) falha(oe, 'falta "pergunta"');
        if (!Array.isArray(e.pontos) || e.pontos.length < 3 || !e.pontos.every(texto)) falha(oe, '"pontos" precisa de 3 ou mais itens');
        if (!texto(e.modelo) || palavras(e.modelo) < 40) falha(oe, '"modelo" precisa de 40 palavras ou mais');
      } else if (e.tipo === 'pratica') {
        placar.pratica++;
        if (!texto(e.titulo)) falha(oe, 'falta "titulo"');
        if (!Array.isArray(e.passos) || e.passos.length < 2 || !e.passos.every(texto)) falha(oe, '"passos" precisa de 2 ou mais itens');
        if (!texto(e.prontoQuando)) falha(oe, 'falta "prontoQuando"');
        if (!Number.isInteger(e.minutos)) falha(oe, 'falta "minutos"');
      } else falha(oe, 'tipo desconhecido');
    });
    const cs = Array.isArray(l.cartoes) ? l.cartoes : [];
    placar.cartoes += cs.length;
    if (cs.length < 3 || cs.length > 6) falha(onde, `precisa de 3 a 6 cartões (tem ${cs.length})`);
    cs.forEach((c, i) => {
      if (!texto(c.frente) || !texto(c.verso)) falha(`${onde} cartão ${i + 1}`, 'falta frente ou verso');
    });
    for (const f of l.fontes ?? []) {
      if (!texto(f.titulo) || !/^https:\/\//.test(f.url ?? '')) falha(onde, 'fonte precisa de titulo e url https');
    }
    if (!Array.isArray(l.fontes) || !l.fontes.length) falha(onde, 'falta pelo menos 1 fonte oficial em "fontes"');
  }
}

// roda os exercícios executáveis, 4 de cada vez
let i = 0;
await Promise.all(
  Array.from({ length: 4 }, async () => {
    while (i < tarefas.length) await tarefas[i++]();
  }),
);

const faltando = [...esperado.keys()].filter((id) => !vistos.has(id));
if (flags.has('--completo')) for (const id of faltando) falha('ementa', `lição ${id} não foi escrita`);

const resumo = { ...placar, esperadas: esperado.size, faltando: faltando.length, falhas: falhas.length, executados: tarefas.length, ts: carregaTs(), node: process.version };
if (flags.has('--json')) {
  await writeFile(path.join(RAIZ_DOJO, 'placar-conteudo.json'), JSON.stringify(resumo, null, 2) + '\n');
}
for (const f of falhas) console.log('FALHA ' + f);
console.log(
  `\n${placar.licoes}/${esperado.size} lições · ${tarefas.length} exercícios executados (${placar.prever} prever, ${placar.compila} compila) · ` +
    `${placar.quiz} quiz · ${placar.corredor} corredor · ${placar.pratica} prática · ${placar.cartoes} cartões · ${placar.palavras} palavras`,
);
console.log(falhas.length ? `REPROVADO: ${falhas.length} falha(s)` : 'APROVADO: 0 falhas');
process.exit(falhas.length ? 1 : 0);
