// Dojo — servidor local do curso. Só o Node da máquina (o TypeScript vem do npm install).
//   node servidor.mjs                 sobe em http://localhost:4321 e abre o navegador
//   node servidor.mjs --sem-navegador não abre o navegador
//   node servidor.mjs --porta 4400 --estado caminho.json   (usado pelos testes)
// Só escuta em 127.0.0.1 e toda chamada de API exige o token da sessão: outro site aberto no
// navegador não consegue mandar este servidor executar código.
import http from 'node:http';
import { readFile, writeFile, rename, mkdir, readdir, appendFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { randomBytes } from 'node:crypto';
import { execFile, exec } from 'node:child_process';
import path from 'node:path';
import { rodar, checar, carregaTs, RAIZ_DOJO } from './motor/executa.mjs';
import { estadoInicial, hojeISO, ordemDaRota } from './web/logica.js';

const arg = (nome, padrao) => {
  const i = process.argv.indexOf(nome);
  return i > 0 ? process.argv[i + 1] : padrao;
};
const PORTA = Number(arg('--porta', 4321));
const ARQ_ESTADO = path.resolve(arg('--estado', path.join(RAIZ_DOJO, 'meu-progresso', 'dojo-estado.json')));
const ARQ_DIARIO = path.join(path.dirname(ARQ_ESTADO), 'dojo-diario.md');
const ARQ_GUIA = path.join(RAIZ_DOJO, 'guia', 'GUIA.html');
const TOKEN = randomBytes(24).toString('hex');
const WEB = path.join(RAIZ_DOJO, 'web');
const CONTEUDO = path.join(RAIZ_DOJO, 'conteudo');
const TIPOS = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.json': 'application/json; charset=utf-8' };

const lerJson = async (arq) => JSON.parse(await readFile(arq, 'utf8'));

async function carregaConteudo() {
  const ementa = await lerJson(path.join(CONTEUDO, '_ementa.json'));
  const rota = await lerJson(path.join(CONTEUDO, '_rota.json'));
  const { desafios } = await lerJson(path.join(CONTEUDO, '_desafios.json'));
  const licoes = {};
  for (const f of (await readdir(CONTEUDO)).filter((n) => n.endsWith('.json') && !n.startsWith('_'))) {
    try {
      for (const l of (await lerJson(path.join(CONTEUDO, f))).licoes ?? []) licoes[l.id] = l;
    } catch (e) {
      console.error(`conteúdo ignorado (${f}): ${e.message}`);
    }
  }
  const ordem = ordemDaRota(rota, ementa);
  return { ementa, rota, desafios, licoes, ordem };
}

async function carregaEstado(conteudo) {
  if (existsSync(ARQ_ESTADO)) return lerJson(ARQ_ESTADO);
  return estadoInicial(hojeISO());
}

async function gravaEstado(estado) {
  await mkdir(path.dirname(ARQ_ESTADO), { recursive: true });
  const tmp = ARQ_ESTADO + '.tmp';
  await writeFile(tmp, JSON.stringify(estado, null, 1) + '\n');
  if (existsSync(ARQ_ESTADO)) {
    // uma cópia por dia: se algo corromper, o dia anterior está salvo
    const copia = ARQ_ESTADO.replace(/\.json$/, `.${hojeISO()}.bak.json`);
    if (!existsSync(copia)) await writeFile(copia, await readFile(ARQ_ESTADO));
  }
  await rename(tmp, ARQ_ESTADO);
}

/** Commits por dia do projeto que a pessoa informou nas boas-vindas (somente leitura). É a evidência do
 *  bloco Construir. O caminho vai como argumento separado para o git: nunca passa por um shell. */
function commits() {
  return new Promise((resolve) => {
    const RAIZ_APP = typeof estado?.perfil?.projeto === 'string' ? estado.perfil.projeto.trim() : '';
    if (!RAIZ_APP || !path.isAbsolute(RAIZ_APP) || !existsSync(path.join(RAIZ_APP, '.git'))) return resolve({ porDia: {}, hoje: [], ramo: null });
    execFile('git', ['-C', RAIZ_APP, 'log', '--all', '--since=120 days ago', '--date=format-local:%Y-%m-%d', '--format=%ad|%h|%s'], { windowsHide: true }, (erro, saida) => {
      if (erro) return resolve({ porDia: {}, hoje: [], ramo: null });
      const porDia = {};
      const hoje = [];
      for (const linha of saida.split('\n').filter(Boolean)) {
        const [dia, hash, ...msg] = linha.split('|');
        porDia[dia] = (porDia[dia] ?? 0) + 1;
        if (dia === hojeISO()) hoje.push({ hash, msg: msg.join('|') });
      }
      execFile('git', ['-C', RAIZ_APP, 'branch', '--show-current'], { windowsHide: true }, (_e, ramo) => resolve({ porDia, hoje, ramo: (ramo ?? '').trim() || null }));
    });
  });
}

const corpo = (req) =>
  new Promise((resolve, reject) => {
    let dados = '';
    req.on('data', (d) => {
      dados += d;
      if (dados.length > 5e6) reject(new Error('corpo grande demais'));
    });
    req.on('end', () => {
      try {
        resolve(dados ? JSON.parse(dados) : {});
      } catch (e) {
        reject(e);
      }
    });
  });

const responde = (res, status, obj) => {
  res.writeHead(status, { 'content-type': TIPOS['.json'], 'cache-control': 'no-store' });
  res.end(JSON.stringify(obj));
};

let conteudo = await carregaConteudo();
let estado = await carregaEstado(conteudo);

const servidor = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, 'http://x');
    const hostOk = [`localhost:${PORTA}`, `127.0.0.1:${PORTA}`].includes(req.headers.host);
    if (!hostOk) return responde(res, 403, { erro: 'host não permitido' });

    if (url.pathname.startsWith('/api/')) {
      const origem = req.headers.origin;
      if (origem && ![`http://localhost:${PORTA}`, `http://127.0.0.1:${PORTA}`].includes(origem)) return responde(res, 403, { erro: 'origem não permitida' });
      if (req.headers['x-dojo-token'] !== TOKEN) return responde(res, 401, { erro: 'token inválido: recarregue a página' });

      if (req.method === 'GET' && url.pathname === '/api/tudo') {
        conteudo = await carregaConteudo(); // recarrega: lição nova aparece sem reiniciar
        return responde(res, 200, { ...conteudo, estado, git: await commits(), hoje: hojeISO(), ts: carregaTs(), node: process.version, guia: existsSync(ARQ_GUIA) });
      }
      if (req.method === 'GET' && url.pathname === '/api/git') return responde(res, 200, await commits());
      if (req.method === 'POST' && url.pathname === '/api/estado') {
        const novo = await corpo(req);
        if (novo.rev !== estado.rev) return responde(res, 409, { erro: 'O Dojo está aberto em outra aba com dados mais novos. Recarregue esta página.' });
        novo.rev++;
        estado = novo;
        await gravaEstado(estado);
        return responde(res, 200, { rev: estado.rev });
      }
      if (req.method === 'POST' && url.pathname === '/api/rodar') {
        const { codigo, linguagem } = await corpo(req);
        if (typeof codigo !== 'string' || codigo.length > 20000) return responde(res, 400, { erro: 'código inválido' });
        return responde(res, 200, await rodar(codigo, linguagem === 'js' ? 'js' : 'ts'));
      }
      if (req.method === 'POST' && url.pathname === '/api/checar') {
        const { codigo } = await corpo(req);
        if (typeof codigo !== 'string' || codigo.length > 20000) return responde(res, 400, { erro: 'código inválido' });
        return responde(res, 200, { erros: checar(codigo) });
      }
      if (req.method === 'POST' && url.pathname === '/api/diario') {
        const { data, linhas } = await corpo(req);
        if (!/^\d{4}-\d{2}-\d{2}$/.test(data ?? '') || !Array.isArray(linhas)) return responde(res, 400, { erro: 'diário inválido' });
        await mkdir(path.dirname(ARQ_DIARIO), { recursive: true });
        await appendFile(ARQ_DIARIO, `\n## ${data}\n\n${linhas.map((l) => `- ${String(l).replace(/\s+/g, ' ')}`).join('\n')}\n`);
        return responde(res, 200, { ok: true });
      }
      return responde(res, 404, { erro: 'rota de API desconhecida' });
    }

    if (req.method !== 'GET') return responde(res, 405, { erro: 'método não permitido' });
    if (url.pathname === '/guia') {
      if (!existsSync(ARQ_GUIA)) return responde(res, 404, { erro: 'GUIA.html ainda não foi gerado' });
      res.writeHead(200, { 'content-type': TIPOS['.html'], 'cache-control': 'no-store' });
      // ?ir=<título> rola até a seção com esse título (as missões do Dojo abrem o guia no ponto certo)
      const pulo = `<script>(()=>{const q=new URLSearchParams(location.search).get('ir');if(!q)return;const n=(s)=>s.replace(/\\s+/g,' ').trim().toLowerCase();const alvo=n(q);addEventListener('load',()=>setTimeout(()=>{const els=[...document.querySelectorAll('h1,h2,h3,h4,.flow-title,.part-band')];const el=els.find((e)=>n(e.textContent).endsWith(alvo))||els.find((e)=>n(e.textContent).includes(alvo));if(el){el.style.scrollMarginTop='96px';el.scrollIntoView({block:'start'});el.style.outline='3px solid #ff7a45';el.style.outlineOffset='6px';}},150));})();</script>`;
      return res.end((await readFile(ARQ_GUIA, 'utf8')).replace('</body>', pulo + '</body>'));
    }
    const rel = url.pathname === '/' ? 'index.html' : url.pathname.replace(/^\/+/, '');
    const arq = path.resolve(WEB, rel);
    if (!arq.startsWith(WEB + path.sep) || !existsSync(arq)) return responde(res, 404, { erro: 'não encontrado' });
    let dados = await readFile(arq);
    if (rel === 'index.html') dados = dados.toString('utf8').replace('__DOJO_TOKEN__', TOKEN);
    res.writeHead(200, { 'content-type': TIPOS[path.extname(arq)] ?? 'application/octet-stream', 'cache-control': 'no-store' });
    res.end(dados);
  } catch (e) {
    responde(res, 500, { erro: String(e?.message ?? e) });
  }
});

const endereco = `http://localhost:${PORTA}`;
const abre = () => {
  if (process.argv.includes('--sem-navegador')) return;
  const comando = process.platform === 'win32' ? `start "" "${endereco}"` : process.platform === 'darwin' ? `open "${endereco}"` : `xdg-open "${endereco}"`;
  exec(comando, { windowsHide: true }, () => {});
};
servidor.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.log(`O Dojo já está rodando em ${endereco}. Abrindo o navegador.`);
    abre();
    setTimeout(() => process.exit(0), 500);
  } else throw e;
});
servidor.listen(PORTA, '127.0.0.1', () => {
  console.log(`\n  DOJO no ar: ${endereco}`);
  console.log(`  ${Object.keys(conteudo.licoes).length} lições carregadas · TypeScript ${carregaTs() ?? 'não encontrado'} · Node ${process.version}`);
  console.log(`  Progresso salvo em: ${ARQ_ESTADO}`);
  console.log('  Deixe esta janela aberta enquanto estuda. Para encerrar: Ctrl+C.\n');
  abre();
});
