// Teste do servidor do Dojo de ponta a ponta: node testes/servidor.test.mjs
// Sobe um servidor de verdade numa porta de teste, com estado numa pasta temporária.
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtemp, rm, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PORTA = 4398;
const base = `http://localhost:${PORTA}`;
const dir = await mkdtemp(path.join(tmpdir(), 'dojo-teste-'));
const arqEstado = path.join(dir, 'estado.json');
const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const proc = spawn(process.execPath, ['servidor.mjs', '--sem-navegador', '--porta', String(PORTA), '--estado', arqEstado], { cwd: raiz, windowsHide: true, env: { ...process.env, SEGREDO_DE_TESTE: 'nao-pode-vazar' } });
let log = '';
proc.stdout.on('data', (d) => (log += d));
proc.stderr.on('data', (d) => (log += d));

let n = 0;
const teste = async (nome, fn) => {
  await fn();
  n++;
  console.log('ok  ' + nome);
};
// requisição crua, para poder forjar o cabeçalho Host (o fetch não deixa)
const cru = (caminho, headers) =>
  new Promise((resolve, reject) => {
    http.get({ host: '127.0.0.1', port: PORTA, path: caminho, headers }, (r) => {
      r.resume();
      r.on('end', () => resolve(r.statusCode));
    }).on('error', reject);
  });

try {
  for (let i = 0; i < 50 && !log.includes('DOJO no ar'); i++) await new Promise((r) => setTimeout(r, 100));
  assert.ok(log.includes('DOJO no ar'), 'servidor não subiu: ' + log);

  const html = await (await fetch(base + '/')).text();
  const token = html.match(/DOJO_TOKEN = '([0-9a-f]{48})'/)?.[1];
  const api = (caminho, corpo, extra = {}) =>
    fetch(base + '/api/' + caminho, { method: corpo ? 'POST' : 'GET', headers: { 'x-dojo-token': token, 'content-type': 'application/json', ...extra }, body: corpo ? JSON.stringify(corpo) : undefined });

  await teste('a página entrega um token novo de 48 hex', async () => assert.ok(token));

  await teste('API sem token ou com token errado: 401', async () => {
    assert.equal((await fetch(base + '/api/tudo')).status, 401);
    assert.equal((await api('rodar', { codigo: 'console.log(1)' }, { 'x-dojo-token': 'x'.repeat(48) })).status, 401);
  });

  await teste('outro site (Origin de fora) não chama a API, mesmo com token: 403', async () => {
    assert.equal((await api('rodar', { codigo: 'console.log(1)' }, { origin: 'https://site-malicioso.example' })).status, 403);
  });

  await teste('cabeçalho Host de fora (DNS rebinding): 403', async () => {
    assert.equal(await cru('/', { host: 'site-malicioso.example' }), 403);
    assert.equal(await cru('/', { host: `localhost:${PORTA}` }), 200);
  });

  await teste('arquivo fora da pasta web não é servido', async () => {
    assert.equal(await cru('/../servidor.mjs', { host: `localhost:${PORTA}` }), 404);
    assert.equal(await cru('/..%2Fservidor.mjs', { host: `localhost:${PORTA}` }), 404);
    assert.equal((await fetch(base + '/logica.js')).status, 200);
  });

  let tudo;
  await teste('/api/tudo devolve conteúdo, rota completa e estado inicial zerado', async () => {
    tudo = await (await api('tudo')).json();
    assert.equal(tudo.ordem.length, tudo.ementa.trilhas.reduce((s, t) => s + t.licoes.length, 0));
    assert.equal(tudo.desafios.length, 24);
    assert.equal(tudo.estado.rev, 0);
    assert.deepEqual(tudo.estado.missoes, {});
    assert.deepEqual(tudo.git, { porDia: {}, hoje: [], ramo: null }); // sem projeto informado, nada de git
    assert.match(tudo.ts, /^\d+\.\d+/);
  });

  await teste('rodar: executa TypeScript de verdade e devolve a saída', async () => {
    const r = await (await api('rodar', { codigo: "const n: number = 20 + 22;\nsetTimeout(() => console.log('b'), 0);\nPromise.resolve().then(() => console.log('a'));\nconsole.log(n);\n" })).json();
    assert.equal(r.saida, '42\na\nb\n');
    assert.equal(r.codigoSaida, 0);
  });

  await teste('rodar: laço infinito é interrompido', async () => {
    const r = await (await api('rodar', { codigo: 'while (true) {}' })).json();
    assert.equal(r.estourou, true);
  });

  await teste('rodar: o trecho não herda as variáveis de ambiente do servidor (segredo não vaza)', async () => {
    const r = await (await api('rodar', { codigo: "console.log(String(process.env.SEGREDO_DE_TESTE), Object.keys(process.env).length < 20)" })).json();
    assert.equal(r.saida.trim(), 'undefined true');
  });

  await teste('checar: o compilador estrito aponta o erro e a linha', async () => {
    const r = await (await api('checar', { codigo: "const xs = ['a'];\nconst x: string = xs[0];\n" })).json();
    assert.deepEqual(r.erros.map((e) => [e.codigo, e.linha]), [['TS2322', 2]]);
    assert.deepEqual((await (await api('checar', { codigo: 'const ok: number = 1;\nconsole.log(ok);\n' })).json()).erros, []);
  });

  await teste('estado: grava em disco, sobe a revisão e recusa revisão velha (duas abas)', async () => {
    const e = { ...tudo.estado, xp: 77 };
    assert.deepEqual(await (await api('estado', e)).json(), { rev: 1 });
    assert.equal(JSON.parse(await readFile(arqEstado, 'utf8')).xp, 77);
    assert.equal((await api('estado', e)).status, 409); // rev 0 de novo
    assert.equal((await api('estado', { ...e, rev: 1, xp: 78 })).status, 200);
  });

  await teste('diário: recusa data inválida', async () => {
    assert.equal((await api('diario', { data: '../x', linhas: ['a'] })).status, 400);
    assert.equal((await api('diario', { data: '2026-11-10', linhas: ['Fiz: teste'] })).status, 200);
    assert.match(await readFile(path.join(dir, 'dojo-diario.md'), 'utf8'), /## 2026-11-10\n\n- Fiz: teste/);
  });

  console.log(`\n${n} testes do servidor: todos passaram`);
} finally {
  proc.kill();
  await rm(dir, { recursive: true, force: true }).catch(() => {});
}
