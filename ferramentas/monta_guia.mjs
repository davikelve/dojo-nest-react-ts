// Monta o documento ÚNICO do curso: guia/GUIA.md (sempre) e guia/GUIA.html (se houver gerador).
//   node ferramentas/monta_guia.mjs
// 1) roda o validador do conteúdo (placar em placar-conteudo.json); se reprovar, o guia NÃO é gerado
// 2) junta guia/fontes/guia-jornada.md + cockpit-implementacao.md (Anexo A) + cockpit-desenho.md (Anexo B)
// 3) se a variável GERADOR_DOC apontar para um gerador Markdown -> HTML (uso: python <gerador> <arquivo.md>),
//    gera o GUIA.html. O gerador do autor não faz parte deste repositório; o GUIA.html já vem pronto.
import { readFile, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DOJO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DOCS = path.join(DOJO, 'guia');
const GERADOR = process.env.GERADOR_DOC;
const roda = (cmd, args, cwd) => spawnSync(cmd, args, { cwd, stdio: 'inherit', windowsHide: true }).status;

// --rascunho: aceita trilha ainda incompleta (uso durante a escrita das lições)
const completo = process.argv.includes('--rascunho') ? [] : ['--completo'];
if (roda(process.execPath, ['validar.mjs', ...completo, '--json'], DOJO) !== 0) {
  console.error('\nGuia NÃO gerado: o conteúdo do Dojo está reprovado.');
  process.exit(1);
}

const semCabecalho = (md) => md.replaceAll('\r\n', '\n').replace(/^---\n[\s\S]*?\n---\n/, '');
// fora de bloco de código: "# Parte N — X" vira "# Anexo L · X" (dentro de ``` nada muda)
const anexo = (md, letra, nome) => {
  let dentro = false;
  const corpo = semCabecalho(md).split('\n').map((l) => {
    if (l.startsWith('```')) dentro = !dentro;
    return !dentro && /^# Parte \d+ — /.test(l) ? l.replace(/^# Parte \d+ — /, `# Anexo ${letra} · `) : l;
  }).join('\n');
  return `\n# Anexo ${letra} · ${nome}\n\n${corpo}`;
};

const guia = (await readFile(path.join(DOCS, 'fontes', 'guia-jornada.md'), 'utf8')).replaceAll('\r\n', '\n');
const impl = await readFile(path.join(DOCS, 'fontes', 'cockpit-implementacao.md'), 'utf8');
const desenho = await readFile(path.join(DOCS, 'fontes', 'cockpit-desenho.md'), 'utf8');

const notaA = '## Como ler este anexo\n\nÉ o passo a passo de construção do Cockpit, sprint a sprint. O Dojo abre aqui na seção da missão do dia. Onde o texto diz "documento 1", leia Anexo B; onde diz "documento 3", leia as Partes 1 a 9 deste guia.\n';
const notaB = '## Como ler este anexo\n\nÉ o desenho do Cockpit: produto, regras de negócio, arquitetura e decisões. Consulte quando uma sprint citar uma regra (RN-xx) ou uma decisão (D-xx).\n';
const tudo = guia.trimEnd() + '\n' + anexo(impl, 'A', 'O Cockpit, sprint a sprint').replace(/(# Anexo A · O Cockpit, sprint a sprint\n\n)/, `$1${notaA}\n`) + '\n' + anexo(desenho, 'B', 'O desenho do Cockpit').replace(/(# Anexo B · O desenho do Cockpit\n\n)/, `$1${notaB}\n`);
await writeFile(path.join(DOCS, 'GUIA.md'), tudo);

if (!GERADOR) {
  console.log('\nGUIA.md montado. GERADOR_DOC não definido: o GUIA.html não foi regerado.');
  process.exit(0);
}
const st = roda('python', [GERADOR, path.join(DOCS, 'GUIA.md'), '--cor', '#c2410c', '--sem-anexo'], DOCS);
if (st !== 0) process.exit(st ?? 1);
console.log(`\nGuia gerado: ${path.join(DOCS, 'GUIA.html')} (${tudo.split('\n').length} linhas de Markdown)`);
