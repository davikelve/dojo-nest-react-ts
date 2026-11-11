// Motor de execução do Dojo: roda trechos de JS/TS de verdade e confere tipos com o compilador.
// Usa o Node da máquina e o TypeScript instalado por `npm install` (a única dependência do Dojo).
import { spawn } from 'node:child_process';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
export const RAIZ_DOJO = path.resolve(AQUI, '..');

const LIMITE_SAIDA = 20000;

/** Roda um trecho num processo Node separado. `.mts` = TypeScript com os tipos apagados pelo Node. */
export async function rodar(codigo, linguagem = 'ts', { timeoutMs = 6000 } = {}) {
  const dir = await mkdtemp(path.join(tmpdir(), 'dojo-'));
  const arq = path.join(dir, linguagem === 'js' ? 'trecho.mjs' : 'trecho.mts');
  await writeFile(arq, codigo, 'utf8');
  try {
    return await new Promise((resolve) => {
      const env = {
        PATH: process.env.PATH ?? '',
        SystemRoot: process.env.SystemRoot ?? '',
        TEMP: dir,
        TMP: dir,
        TZ: 'America/Sao_Paulo', // fuso fixo: exercício de data dá o mesmo resultado em qualquer máquina
        NO_COLOR: '1',
      };
      const p = spawn(process.execPath, ['--no-warnings', arq], { cwd: dir, env, windowsHide: true });
      let saida = '';
      let erro = '';
      let estourou = false;
      const relogio = setTimeout(() => {
        estourou = true;
        p.kill();
      }, timeoutMs);
      p.stdout.on('data', (d) => {
        if (saida.length < LIMITE_SAIDA) saida += d;
      });
      p.stderr.on('data', (d) => {
        if (erro.length < LIMITE_SAIDA) erro += d;
      });
      p.on('close', (codigoSaida) => {
        clearTimeout(relogio);
        const limpa = (s) =>
          String(s)
            .replaceAll('\r\n', '\n')
            .replaceAll(dir + path.sep, '')
            .replaceAll('file:///' + dir.replaceAll('\\', '/') + '/', '');
        resolve({ saida: limpa(saida), erro: limpa(erro), codigoSaida, estourou });
      });
    });
  } finally {
    await rm(dir, { recursive: true, force: true }).catch(() => {});
  }
}

let ts = null;
const cacheLib = new Map();

/** Carrega o TypeScript de node_modules. Devolve a versão ou null se não achar. */
export function carregaTs() {
  if (ts) return ts.version;
  try {
    ts = createRequire(path.join(RAIZ_DOJO, 'package.json'))('typescript');
    return ts.version;
  } catch {
    return null;
  }
}

/** Confere tipos de um trecho com as mesmas opções rígidas do Cockpit. Devolve os erros do compilador. */
export function checar(codigo) {
  if (!carregaTs()) throw new Error('TypeScript não encontrado: rode npm install na pasta do Dojo');
  const nome = 'trecho.ts';
  const opts = {
    strict: true,
    noUncheckedIndexedAccess: true,
    target: ts.ScriptTarget.ES2023,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    lib: ['lib.es2023.d.ts', 'lib.dom.d.ts'],
    types: [],
    noEmit: true,
    skipLibCheck: true,
  };
  const host = ts.createCompilerHost(opts);
  const original = host.getSourceFile.bind(host);
  host.getSourceFile = (arquivo, alvo, ...resto) => {
    if (arquivo === nome) return ts.createSourceFile(arquivo, codigo, alvo, true);
    if (!cacheLib.has(arquivo)) cacheLib.set(arquivo, original(arquivo, alvo, ...resto));
    return cacheLib.get(arquivo);
  };
  const existe = host.fileExists.bind(host);
  host.fileExists = (arquivo) => arquivo === nome || existe(arquivo);
  const le = host.readFile.bind(host);
  host.readFile = (arquivo) => (arquivo === nome ? codigo : le(arquivo));
  const prog = ts.createProgram([nome], opts, host);
  return ts.getPreEmitDiagnostics(prog).map((d) => {
    const pos = d.file && d.start != null ? d.file.getLineAndCharacterOfPosition(d.start) : null;
    return {
      codigo: 'TS' + d.code,
      linha: pos ? pos.line + 1 : null,
      mensagem: ts.flattenDiagnosticMessageText(d.messageText, '\n'),
    };
  });
}

/** Compara saídas ignorando espaço no fim das linhas e linhas vazias no fim. */
export function normaliza(s) {
  return String(s ?? '')
    .replaceAll('\r\n', '\n')
    .split('\n')
    .map((l) => l.trimEnd())
    .join('\n')
    .trim();
}
