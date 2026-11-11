// Testes da lógica do Dojo: node testes/logica.test.mjs
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import * as L from '../web/logica.js';

let n = 0;
const teste = (nome, fn) => {
  fn();
  n++;
  console.log('ok  ' + nome);
};
const novo = () => L.estadoInicial('2026-11-10');
const estudou = (e, iso) => (L.diaDe(e, iso).licoes = ['x']);

teste('datas: soma, diferença e virada de mês/ano', () => {
  assert.equal(L.somaDias('2026-11-30', 1), '2026-12-01');
  assert.equal(L.somaDias('2026-12-31', 1), '2027-01-01');
  assert.equal(L.somaDias('2026-03-01', -1), '2026-02-28');
  assert.equal(L.difDias('2026-11-10', '2026-11-17'), 7);
  assert.equal(L.diaDaSemana('2026-11-10'), 2); // terça
});

teste('sessão mínima: 1 lição, ou 15 min, ou 8 cartões contam o dia', () => {
  assert.equal(L.contaDia({ licoes: ['a'] }), true);
  assert.equal(L.contaDia({ licoes: [], minutos: 15 }), true);
  assert.equal(L.contaDia({ licoes: [], minutos: 14, revisoes: 7 }), false);
  assert.equal(L.contaDia({ licoes: [], revisoes: 8 }), true);
  assert.equal(L.contaDia(undefined), false);
});

teste('ofensiva: conta dias seguidos e não zera antes de o dia acabar', () => {
  const e = novo();
  ['2026-11-10', '2026-11-11', '2026-11-12'].forEach((d) => estudou(e, d));
  assert.equal(L.ofensiva(e, '2026-11-12').atual, 3);
  assert.deepEqual({ ...L.ofensiva(e, '2026-11-13') }, { atual: 3, hojeConta: false, recorde: 3 });
  assert.equal(L.ofensiva(e, '2026-11-14').atual, 0); // um dia inteiro perdido
});

teste('escudo: cobre exatamente UM dia perdido e é consumido', () => {
  const e = novo();
  ['2026-11-10', '2026-11-11'].forEach((d) => estudou(e, d));
  e.escudos = 1;
  assert.deepEqual(L.aplicaEscudos(e, '2026-11-13'), { tipo: 'escudo', dia: '2026-11-12' });
  assert.equal(e.escudos, 0);
  estudou(e, '2026-11-13');
  assert.equal(L.ofensiva(e, '2026-11-13').atual, 4);
  assert.equal(L.aplicaEscudos(e, '2026-11-13').tipo, 'seguido'); // abrir de novo não gasta outro
});

teste('escudo: dois dias perdidos não são cobertos (nunca dois seguidos)', () => {
  const e = novo();
  estudou(e, '2026-11-10');
  e.escudos = 2;
  assert.deepEqual(L.aplicaEscudos(e, '2026-11-13'), { tipo: 'retorno', dias: 2 });
  assert.equal(e.escudos, 2);
  assert.equal(L.ofensiva(e, '2026-11-13').atual, 0);
});

teste('escudo: sem escudo, um dia perdido quebra a ofensiva', () => {
  const e = novo();
  estudou(e, '2026-11-10');
  assert.equal(L.aplicaEscudos(e, '2026-11-12').tipo, 'retorno');
  assert.equal(L.aplicaEscudos(novo(), '2026-11-12').tipo, 'primeiro');
});

teste('escudo: 7 dias seguidos dão 1 escudo, uma vez só, no máximo 2', () => {
  const e = novo();
  let ganhou = 0;
  for (let i = 0; i < 21; i++) {
    const d = L.somaDias('2026-11-10', i);
    estudou(e, d);
    if (L.atualizaOfensiva(e, d).escudoNovo) ganhou++;
    L.atualizaOfensiva(e, d); // chamar duas vezes no mesmo dia não dá outro
  }
  assert.equal(ganhou, 2);
  assert.equal(e.escudos, 2);
  assert.equal(e.recorde, 21);
});

teste('faixa: limites exatos', () => {
  assert.equal(L.faixa(0).nome, 'Branca');
  assert.equal(L.faixa(399).nome, 'Branca');
  assert.equal(L.faixa(400).nome, 'Amarela');
  assert.equal(L.faixa(399).falta, 1);
  assert.equal(L.faixa(99999).nome, 'Preta');
  assert.equal(L.faixa(99999).pct, 100);
});

teste('revisão espaçada: intervalos crescem, erro volta hoje, facilidade tem piso', () => {
  let c = { venc: '2026-11-10', intervalo: 0, facilidade: 2.5, reps: 0, erros: 0 };
  c = L.agendaCartao(c, 2, '2026-11-10');
  assert.equal(c.venc, '2026-11-11');
  c = L.agendaCartao(c, 2, '2026-11-11');
  assert.equal(c.intervalo, 3);
  c = L.agendaCartao(c, 2, '2026-11-14');
  assert.equal(c.intervalo, 8); // 3 × 2,5
  c = L.agendaCartao(c, 0, '2026-11-22');
  assert.deepEqual([c.intervalo, c.venc, c.reps, c.erros], [0, '2026-11-22', 0, 1]);
  for (let i = 0; i < 20; i++) c = L.agendaCartao(c, 0, '2026-11-22');
  assert.equal(c.facilidade, 1.3);
  assert.equal(L.agendaCartao({ intervalo: 0, facilidade: 2.5, reps: 0 }, 3, '2026-11-10').intervalo, 3);
});

teste('fila de revisão: só os vencidos, do mais atrasado para o mais novo, com limite', () => {
  const e = novo();
  e.cartoes = { a: { venc: '2026-11-12' }, b: { venc: '2026-11-08' }, c: { venc: '2026-11-10' }, d: { venc: '2026-11-11' } };
  assert.deepEqual(L.cartoesVencidos(e, '2026-11-10'), ['b', 'c']);
  assert.deepEqual(L.cartoesVencidos(e, '2026-11-12', 2), ['b', 'c']);
  assert.equal(L.resumoCartoes(e, '2026-11-11').vencidos, 3);
});

const ementa = JSON.parse(await readFile(new URL('../conteudo/_ementa.json', import.meta.url), 'utf8'));
const rota = JSON.parse(await readFile(new URL('../conteudo/_rota.json', import.meta.url), 'utf8'));

teste('rota: toda lição da ementa aparece exatamente uma vez, em 5 fases', () => {
  const ordem = L.ordemDaRota(rota, ementa);
  const total = ementa.trilhas.reduce((s, t) => s + t.licoes.length, 0);
  assert.equal(ordem.length, total);
  assert.equal(new Set(ordem.map((o) => o.id)).size, total);
  assert.deepEqual([...new Set(ordem.map((o) => o.fase))], ['f1', 'f2', 'f3', 'f4', 'f5']);
  const nivel = new Map(ementa.trilhas.flatMap((t) => t.licoes.map((l) => [l.id, l.nivel])));
  assert.ok(ordem.filter((o) => o.fase === 'f4').every((o) => nivel.get(o.id) <= 2), 'fase 4 só tem até o nível Pleno');
  assert.ok(ordem.filter((o) => o.fase === 'f5').every((o) => nivel.get(o.id) === 3), 'fase 5 é o que sobrou: Sênior');
  console.log('    lições por fase:', ['f1', 'f2', 'f3', 'f4', 'f5'].map((f) => `${f}=${ordem.filter((o) => o.fase === f).length}`).join(' '));
});

teste('rota: lição repetida ou desconhecida é recusada', () => {
  assert.throws(() => L.ordemDaRota({ fases: [{ id: 'a', licoes: ['ts-01', 'ts-01'] }] }, ementa), /repetida/);
  assert.throws(() => L.ordemDaRota({ fases: [{ id: 'a', licoes: ['nao-existe'] }] }, ementa), /desconhecida/);
  assert.throws(() => L.ordemDaRota({ fases: [{ id: 'a', licoes: ['ts-01'] }] }, ementa), /fora da rota/);
});

teste('rota: cada fase tem chefão, cada chefão tem critério de aprovação, missões sem id repetido', () => {
  for (const f of rota.fases) assert.ok(rota.chefoes.some((c) => c.id === f.chefao && c.aprova.length >= 3), f.id);
  assert.equal(new Set(rota.missoes.map((m) => m.id)).size, rota.missoes.length);
  assert.ok(rota.missoes.every((m) => m.titulo && m.guia && m.prontoQuando && m.sessoes > 0));
});

teste('próxima lição e próxima missão respeitam o que já foi feito', () => {
  const e = L.estadoInicial('2026-11-10');
  const ordem = L.ordemDaRota(rota, ementa);
  assert.deepEqual(L.proximasLicoes(ordem, e, 2), ['ts-01', 'mig-02']);
  e.licoes['ts-01'] = { feitaEm: '2026-11-10' };
  assert.deepEqual(L.proximasLicoes(ordem, e, 1), ['mig-02']);
  assert.deepEqual(L.proximasLicoes(ordem, e, 1, (id) => id !== 'mig-02'), ['js-06']);
  assert.equal(L.proximaMissao(rota.missoes, e).id, 's0'); // quem começa, começa pela Sprint 0
  const veterano = L.estadoInicial('2026-11-10', ['s0', 's1.1']);
  assert.equal(L.proximaMissao(rota.missoes, veterano).id, 's1.2');
});

teste('projeção: ritmo dos últimos 14 dias', () => {
  const e = novo();
  for (let i = 0; i < 7; i++) L.diaDe(e, L.somaDias('2026-11-10', -i)).licoes = ['a', 'b'];
  const p = L.projecao(e, '2026-11-10', 10);
  assert.equal(p.porSemana, 7);
  assert.equal(p.data, '2026-11-20');
  assert.equal(L.projecao(novo(), '2026-11-10', 10).data, null);
});

console.log(`\n${n} testes de lógica: todos passaram`);
