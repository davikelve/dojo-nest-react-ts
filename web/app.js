// Dojo — a tela. JavaScript puro, sem framework e sem build (o projeto final do curso é refazê-la em React).
import * as L from './logica.js';

const $app = document.getElementById('app');
let D = null; // conteúdo: ementa, rota, lições, desafios, ordem (já com o nome de quem estuda)
let BRUTO = null; // o mesmo conteúdo como veio do servidor, com o marcador {{nome}}
let E = null; // estado (progresso)
let HOJE = L.hojeISO();
let retorno = null; // o que aconteceu com a ofensiva ao abrir
let relogio = null;

// ---------- utilidades ----------
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

function h(tag, attrs = {}, ...filhos) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs ?? {})) {
    if (v == null || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k === 'html') el.innerHTML = v;
    else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else if (v === true) el.setAttribute(k, '');
    else el.setAttribute(k, v);
  }
  for (const f of filhos.flat(Infinity)) if (f != null && f !== false) el.append(f.nodeType ? f : document.createTextNode(String(f)));
  return el;
}

/** Markdown enxuto e seguro: escapa tudo e só então aplica a formatação. */
function md(texto) {
  const inline = (s) => {
    const cod = [];
    let t = esc(s).replace(/`([^`]+)`/g, (_, c) => `\u0000${cod.push(c) - 1}\u0000`);
    t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/(^|[^*\w])\*([^*\n]+)\*(?!\*)/g, '$1<em>$2</em>');
    return t.replace(/\u0000(\d+)\u0000/g, (_, i) => `<code>${cod[i]}</code>`);
  };
  const partes = String(texto ?? '').replaceAll('\r\n', '\n').split(/```/);
  let html = '';
  partes.forEach((parte, i) => {
    if (i % 2) {
      html += `<pre><code>${esc(parte.replace(/^[a-z]*\n/, '').replace(/\n$/, ''))}</code></pre>`;
      return;
    }
    const linhas = parte.split('\n');
    let p = [];
    const fechaP = () => {
      if (p.length) html += `<p>${inline(p.join(' '))}</p>`;
      p = [];
    };
    for (let j = 0; j < linhas.length; j++) {
      const l = linhas[j];
      if (!l.trim()) fechaP();
      else if (/^#{2,4} /.test(l)) {
        fechaP();
        html += `<h3>${inline(l.replace(/^#+ /, ''))}</h3>`;
      } else if (/^\|/.test(l.trim())) {
        fechaP();
        const tab = [];
        while (j < linhas.length && /^\|/.test(linhas[j].trim())) tab.push(linhas[j++].trim());
        j--;
        const cel = (r) => r.replace(/^\||\|$/g, '').split(/(?<!\\)\|/).map((c) => inline(c.trim().replaceAll('\\|', '|')));
        const corpo = tab.filter((r, k) => !(k === 1 && /^[|\s:-]+$/.test(r)));
        html += '<table>' + corpo.map((r, k) => `<tr>${cel(r).map((c) => (k === 0 ? `<th>${c}</th>` : `<td>${c}</td>`)).join('')}</tr>`).join('') + '</table>';
      } else if (/^\s*([-*]|\d+\.) /.test(l)) {
        fechaP();
        const ord = /^\s*\d+\. /.test(l);
        const itens = [];
        while (j < linhas.length && (/^\s*([-*]|\d+\.) /.test(linhas[j]) || (/^\s{2,}\S/.test(linhas[j]) && itens.length))) {
          if (/^\s*([-*]|\d+\.) /.test(linhas[j])) itens.push(linhas[j].replace(/^\s*([-*]|\d+\.) /, ''));
          else itens[itens.length - 1] += ' ' + linhas[j].trim();
          j++;
        }
        j--;
        html += `<${ord ? 'ol' : 'ul'}>${itens.map((x) => `<li>${inline(x)}</li>`).join('')}</${ord ? 'ol' : 'ul'}>`;
      } else if (/^> ?/.test(l)) {
        fechaP();
        const q = [];
        while (j < linhas.length && /^> ?/.test(linhas[j])) q.push(linhas[j++].replace(/^> ?/, ''));
        j--;
        html += `<blockquote>${inline(q.join(' '))}</blockquote>`;
      } else p.push(l.trim());
    }
    fechaP();
  });
  return html;
}
const MD = (texto, classe = '') => h('div', { class: 'md ' + classe, html: md(texto) });

async function api(caminho, corpo) {
  const r = await fetch('/api/' + caminho, {
    method: corpo ? 'POST' : 'GET',
    headers: { 'x-dojo-token': window.DOJO_TOKEN, ...(corpo ? { 'content-type': 'application/json' } : {}) },
    body: corpo ? JSON.stringify(corpo) : undefined,
  });
  const dados = await r.json().catch(() => ({}));
  if (!r.ok) throw Object.assign(new Error(dados.erro ?? 'erro ' + r.status), { status: r.status });
  return dados;
}

function avisa(texto, ms = 3800) {
  const el = h('div', { class: 'aviso' }, texto);
  document.getElementById('avisos').append(el);
  setTimeout(() => el.remove(), ms);
}

function confete() {
  const cores = ['#ff7a45', '#ffb347', '#3fb950', '#58a6ff', '#f85149'];
  for (let i = 0; i < 26; i++) {
    const c = h('i', { class: 'confete', style: `left:${Math.random() * 100}vw;background:${cores[i % 5]};animation-delay:${Math.random() * 0.4}s` });
    document.body.append(c);
    setTimeout(() => c.remove(), 2400);
  }
}

let fila = Promise.resolve();
function salvar() {
  fila = fila.then(async () => {
    try {
      const r = await api('estado', E);
      E.rev = r.rev;
    } catch (e) {
      avisa('Não consegui salvar: ' + e.message, 8000);
    }
  });
  return fila;
}

function xp(n, motivo) {
  const antes = L.faixa(E.xp).nome;
  L.ganhaXP(E, HOJE, n);
  const o = L.atualizaOfensiva(E, HOJE);
  const depois = L.faixa(E.xp).nome;
  if (motivo) avisa(`+${n} XP · ${motivo}`);
  if (depois !== antes) {
    confete();
    avisa(`Faixa ${depois} conquistada.`, 6000);
  }
  if (o.escudoNovo) avisa(`${o.atual} dias seguidos: você ganhou um escudo 🛡️ (cobre um dia perdido).`, 7000);
  pintaTopo();
}

/** Troca o marcador {{nome}} das lições pelo primeiro nome de quem estuda. */
function aplicaNome() {
  const nome = JSON.stringify((BRUTO.estado.perfil?.nome || E?.perfil?.nome || 'Dev').replace(/[{}<>]/g, '').slice(0, 30)).slice(1, -1);
  const { estado, ...resto } = BRUTO;
  D = { ...JSON.parse(JSON.stringify(resto).replaceAll('{{nome}}', nome)), estado };
}

// ---------- consultas ao conteúdo ----------
const trilhaDe = (id) => D.ementa.trilhas.find((t) => t.licoes.some((l) => l.id === id));
const refDe = (id) => trilhaDe(id)?.licoes.find((l) => l.id === id);
const existe = (id) => !!D.licoes[id];
const feita = (id) => !!E.licoes[id]?.feitaEm;
const faseAtual = () => D.rota.fases.find((f) => L.progressoFase(D.ordem, E, f.id).pct < 100) ?? D.rota.fases.at(-1);
const linkGuia = (titulo) => '/guia?ir=' + encodeURIComponent(titulo);
const textoCartao = (cid) => {
  if (cid.startsWith('meu#')) return E.meusCartoes.find((c) => 'meu#' + c.id === cid) ?? null;
  const [lid, i] = cid.split('#');
  return D.licoes[lid]?.cartoes?.[Number(i)] ?? null;
};

// ---------- topo ----------
const ABAS = [['hoje', 'Hoje'], ['trilhas', 'Trilhas'], ['revisao', 'Revisão'], ['corredor', 'Corredor'], ['chefoes', 'Chefões'], ['lab', 'Laboratório'], ['progresso', 'Progresso']];

function pintaTopo() {
  const antigo = document.querySelector('.topo');
  const o = L.ofensiva(E, HOJE);
  const f = L.faixa(E.xp);
  const rota = (location.hash.slice(2) || 'hoje').split('/')[0];
  const venc = L.cartoesVencidos(E, HOJE).length;
  const topo = h('header', { class: 'topo' },
    h('div', { class: 'topo-dentro' },
      h('a', { class: 'marca', href: '#/hoje' }, '🥋 ', h('span', {}, 'Dojo')),
      h('nav', { class: 'abas' }, ABAS.map(([id, nome]) => h('a', { href: '#/' + id, class: rota === id || (id === 'trilhas' && ['trilha', 'licao'].includes(rota)) || (id === 'chefoes' && rota === 'desafio') ? 'ativa' : '' }, nome, id === 'revisao' && venc ? ` (${venc})` : '')),
        D.guia ? h('a', { href: '/guia', target: '_blank' }, 'Guia ↗') : null),
      h('div', { class: 'placar' },
        h('span', { title: `Ofensiva: dias seguidos. Recorde: ${o.recorde}` }, h('span', { class: 'fogo' + (o.hojeConta ? '' : ' apagado') }, '🔥'), ' ', o.atual),
        h('span', { title: 'Escudos: cada um cobre um dia perdido' }, '🛡️ ', E.escudos),
        h('div', { class: 'faixa-mini', title: f.proxima ? `Faltam ${f.falta} XP para a faixa ${f.proxima}` : 'Faixa máxima' },
          h('span', {}, `Faixa ${f.nome} · ${E.xp} XP`), h('div', { class: 'barra' }, h('i', { style: `width:${f.pct}%` }))))));
  if (antigo) antigo.replaceWith(topo);
  else document.body.prepend(topo);
}

// ---------- telas ----------
const TELAS = {};

function navega() {
  clearInterval(relogio);
  HOJE = L.hojeISO();
  const [rota, ...resto] = (location.hash.slice(2) || 'hoje').split('/');
  const tela = TELAS[rota] ?? TELAS.hoje;
  pintaTopo();
  $app.replaceChildren(h('main', { class: 'pagina' }, tela(...resto.map(decodeURIComponent))));
  window.scrollTo(0, 0);
}

// ----- Hoje -----
TELAS.hoje = () => {
  if (!E.perfil.pronto) return telaBoasVindas();
  const d = L.diaDe(E, HOJE);
  const energia = d.energia ?? 'normal';
  const cfg = L.ENERGIAS[energia];
  const o = L.ofensiva(E, HOJE);
  const vencidos = L.cartoesVencidos(E, HOJE);
  const alvoRev = Math.min(cfg.cartoes, vencidos.length + d.revisoes);
  const revOk = vencidos.length === 0 || d.revisoes >= alvoRev;
  const feitasHoje = d.licoes.length;
  const proximas = L.proximasLicoes(D.ordem, E, Math.max(0, cfg.licoes - feitasHoje), existe);
  const licOk = feitasHoje >= cfg.licoes || proximas.length === 0;
  const missao = L.proximaMissao(D.rota.missoes, E);
  const consOk = cfg.construir === 0 || d.minutos >= cfg.construir || !missao;
  const passos = [];
  const atual = (ok, anteriores) => (ok ? 'feito' : anteriores ? 'atual' : '');

  passos.push(h('div', { class: 'passo ' + atual(revOk, true) },
    h('div', { class: 'num' }, revOk ? '✓' : 1), h('div', { class: 'corpo' },
      h('h3', {}, 'Aquecer ', h('small', { class: 'sub' }, '5 min · revisão espaçada')),
      vencidos.length === 0 && d.revisoes === 0 ? h('p', { class: 'sub' }, Object.keys(E.cartoes).length ? 'Nenhum cartão vence hoje.' : 'Os cartões aparecem aqui depois da sua primeira lição.')
        : h('p', { class: 'sub' }, revOk ? `${d.revisoes} cartões revisados hoje.` : `${Math.min(cfg.cartoes, vencidos.length)} cartões para hoje. Responda de cabeça antes de virar.`),
      !revOk ? h('a', { class: 'btn primario', href: '#/revisao' }, 'Começar a revisão') : null)));

  passos.push(h('div', { class: 'passo ' + atual(licOk, revOk) },
    h('div', { class: 'num' }, licOk ? '✓' : 2), h('div', { class: 'corpo' },
      h('h3', {}, 'Aprender ', h('small', { class: 'sub' }, `${cfg.licoes} ${cfg.licoes > 1 ? 'lições' : 'lição'} · ler, prever, rodar`)),
      d.licoes.map((id) => h('p', { class: 'sub' }, '✓ ', refDe(id)?.titulo ?? id)),
      proximas.map((id) => h('p', {}, h('a', { class: 'btn ' + (revOk ? 'primario' : ''), href: '#/licao/' + id }, `${trilhaDe(id).icone} ${refDe(id).titulo}`), ' ', h('span', { class: 'sub' }, `${D.licoes[id].minutos} min`))),
      licOk && !proximas.length && feitasHoje >= cfg.licoes ? h('p', { class: 'sub' }, 'Quer mais? Abra a próxima em ', h('a', { href: '#/trilhas' }, 'Trilhas'), '.') : null)));

  if (cfg.construir > 0) {
    const emFoco = E.foco && E.foco.dia === HOJE;
    const visor = h('div', { class: 'relogio' }, '00:00');
    const tique = () => {
      const s = Math.floor((Date.now() - E.foco.inicio) / 1000);
      visor.textContent = `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
    };
    if (emFoco) {
      tique();
      relogio = setInterval(tique, 1000);
    }
    passos.push(h('div', { class: 'passo ' + atual(consOk, revOk && licOk) },
      h('div', { class: 'num' }, consOk ? '✓' : 3), h('div', { class: 'corpo' },
        h('h3', {}, 'Construir ', h('small', { class: 'sub' }, `${cfg.construir} min no Cockpit · digite, não cole`)),
        missao ? [
          h('p', {}, h('strong', {}, missao.titulo), ' ', h('span', { class: 'pilula' }, `~${missao.sessoes} ${missao.sessoes > 1 ? 'sessões' : 'sessão'}`),
            D.guia ? [' ', h('a', { href: linkGuia(missao.guia), target: '_blank' }, 'abrir no guia ↗')] : null),
          h('p', { class: 'sub' }, h('strong', {}, 'Pronto quando: '), missao.prontoQuando),
          h('p', { class: 'sub' }, `Hoje: ${d.minutos} de ${cfg.construir} min · nesta missão: ${E.missoes[missao.id]?.minutos ?? 0} min`,
            D.git?.hoje?.length ? ` · ${D.git.hoje.length} commit${D.git.hoje.length > 1 ? 's' : ''} hoje` : ''),
          emFoco ? h('div', { class: 'linha' }, visor, h('button', { class: 'btn primario', onclick: () => paraFoco(missao.id) }, 'Parar e registrar'))
            : h('div', { class: 'linha' },
              h('button', { class: 'btn ' + (revOk && licOk && !consOk ? 'primario' : ''), onclick: () => { E.foco = { inicio: Date.now(), dia: HOJE, missao: missao.id }; salvar(); navega(); } }, '▶ Iniciar foco'),
              h('button', { class: 'btn fantasma', onclick: () => concluiMissao(missao) }, 'Concluí esta missão')),
        ] : h('p', { class: 'sub' }, 'Todas as missões do Cockpit foram concluídas.'))));
  }

  const fechaForm = h('div', {},
    h('p', { class: 'sub' }, 'Duas linhas. O primeiro passo de amanhã é o que faz você sentar e começar sem pensar.'),
    h('input', { type: 'text', id: 'd-fiz', placeholder: 'Hoje eu aprendi / fiz…' }), h('div', { style: 'height:8px' }),
    h('input', { type: 'text', id: 'd-travei', placeholder: 'Errei a previsão / travei em… (opcional)' }), h('div', { style: 'height:8px' }),
    h('input', { type: 'text', id: 'd-amanha', placeholder: 'Primeiro passo de amanhã (uma ação pequena e concreta)' }), h('div', { style: 'height:10px' }),
    h('button', { class: 'btn primario', onclick: fechaDia }, 'Fechar o dia'));
  passos.push(h('div', { class: 'passo ' + atual(d.fechado, revOk && licOk && consOk) },
    h('div', { class: 'num' }, d.fechado ? '✓' : cfg.construir > 0 ? 4 : 3), h('div', { class: 'corpo' },
      h('h3', {}, 'Fechar ', h('small', { class: 'sub' }, '2 min')),
      d.fechado ? h('p', { class: 'sub' }, 'Dia fechado. ', E.amanha ? h('span', {}, 'Amanhã você começa por: ', h('strong', {}, E.amanha)) : '') : fechaForm)));

  const fase = faseAtual();
  const pf = L.progressoFase(D.ordem, E, fase.id);
  const chefao = D.rota.chefoes.find((c) => c.id === fase.chefao);
  const sem = L.semana(E, HOJE);
  const diasSemana = sem.filter((s) => s.conta && !s.escudo).length;
  const saudacao = o.hojeConta ? `Dia garantido. Ofensiva de ${o.atual} dia${o.atual > 1 ? 's' : ''}.` : o.atual > 0 ? `Ofensiva de ${o.atual} dia${o.atual > 1 ? 's' : ''}. A sessão mínima de hoje mantém ela viva.` : 'Uma lição hoje começa a sua ofensiva.';

  return h('div', { class: 'duas' },
    h('div', {},
      retorno?.tipo === 'retorno' ? h('div', { class: 'cartao destaque' }, h('h3', {}, 'Bom ter você de volta.'), h('p', { class: 'sub' }, `Foram ${retorno.dias} dias fora. Nada se perdeu: as lições feitas continuam feitas. Hoje a meta é só a sessão mínima. Voltar pesa mais do que nunca ter parado.`)) : null,
      retorno?.tipo === 'escudo' ? h('div', { class: 'cartao destaque' }, h('h3', {}, '🛡️ O escudo segurou a sua ofensiva'), h('p', { class: 'sub' }, `O dia ${L.dataBR(retorno.dia)} ficou coberto. Regra do Dojo: nunca dois dias seguidos.`)) : null,
      E.amanha && !d.fechado ? h('div', { class: 'cartao ponte' }, h('span', { class: 'sub' }, 'Você deixou combinado ontem · primeiro passo de hoje'), h('h3', { style: 'margin:4px 0 0' }, E.amanha)) : null,
      h('div', { class: 'cartao' },
        h('h1', {}, 'Sessão de hoje'), h('p', { class: 'sub' }, saudacao),
        h('p', { style: 'margin:12px 0 0;font-weight:650' }, 'Como está a sua energia agora?'),
        h('div', { class: 'energias' }, Object.entries(L.ENERGIAS).map(([id, c]) => h('button', { class: 'energia' + (id === energia ? ' ativa' : ''), onclick: () => { d.energia = id; salvar(); navega(); } }, h('b', {}, `${c.icone} ${c.nome} · ${c.minutos} min`), h('span', {}, c.descricao)))),
        passos)),
    h('aside', {},
      h('div', { class: 'cartao' },
        h('h3', {}, 'Esta semana ', h('small', {}, `${diasSemana} de ${E.perfil.metaDias} dias`)),
        h('div', { class: 'semana' }, sem.map((s, i) => h('div', { class: 'dia' + (s.escudo ? ' escudo' : s.conta ? ' conta' : '') + (s.hoje ? ' hoje' : ''), title: `${L.dataBR(s.iso)} · ${s.xp} XP` }, h('i', {}, s.escudo ? '🛡️' : s.conta ? '🔥' : ''), 'STQQSSD'[i])))),
      h('div', { class: 'cartao' },
        h('h3', {}, fase.nome), h('p', { class: 'sub' }, fase.resumo),
        h('div', { class: 'barra' }, h('i', { style: `width:${pf.pct}%` })),
        h('p', { class: 'sub', style: 'margin-top:6px' }, `${pf.feitas} de ${pf.total} lições · depois: `, h('a', { href: '#/chefoes' }, chefao?.nome ?? 'chefão'))),
      E.perfil.porque ? h('div', { class: 'cartao' }, h('h3', {}, 'Por que você está aqui'), h('p', { style: 'font-style:italic;margin:0' }, `“${E.perfil.porque}”`), E.perfil.gatilho ? h('p', { class: 'sub', style: 'margin:8px 0 0' }, `Seu combinado: depois de ${E.perfil.gatilho}${E.perfil.horario ? ', às ' + E.perfil.horario : ''}, eu abro o Dojo.`) : null) : null,
      D.git?.hoje?.length ? h('div', { class: 'cartao' }, h('h3', {}, 'Commits de hoje'), D.git.hoje.slice(0, 5).map((c) => h('p', { class: 'sub', style: 'margin:0 0 4px' }, h('code', { class: 'codigo-linha' }, c.hash), ' ', c.msg))) : null));
};

function paraFoco(missaoId) {
  const min = Math.min(180, Math.max(0, Math.round((Date.now() - E.foco.inicio) / 60000)));
  E.foco = null;
  if (min > 0) {
    L.diaDe(E, HOJE).minutos += min;
    E.missoes[missaoId] = { ...(E.missoes[missaoId] ?? {}), minutos: (E.missoes[missaoId]?.minutos ?? 0) + min };
    xp(min * L.XP.minuto, `${min} min construindo`);
  } else avisa('Menos de 1 minuto: nada registrado.');
  salvar();
  navega();
}

function concluiMissao(m) {
  if (!confirm(`Concluir "${m.titulo}"?\n\nPronto quando: ${m.prontoQuando}\n\nSó confirme se isso é verdade agora.`)) return;
  if (E.foco) paraFoco(m.id);
  E.missoes[m.id] = { ...(E.missoes[m.id] ?? {}), feitaEm: HOJE };
  xp(L.XP.missao, 'missão concluída');
  confete();
  salvar();
  navega();
}

async function fechaDia() {
  const v = (id) => document.getElementById(id).value.trim();
  const fiz = v('d-fiz'), travei = v('d-travei'), amanha = v('d-amanha');
  if (!fiz || !amanha) return avisa('Preencha o que você fez e o primeiro passo de amanhã.');
  const d = L.diaDe(E, HOJE);
  d.fechado = true;
  E.amanha = amanha;
  E.diario.push({ data: HOJE, fiz, travei, amanha });
  xp(L.XP.fechar, 'dia fechado');
  await salvar();
  api('diario', { data: HOJE, linhas: [`Fiz: ${fiz}`, ...(travei ? [`Errei / travei: ${travei}`] : []), `Amanhã: ${amanha}`, `Sessão: ${d.licoes.length} lição(ões), ${d.revisoes} cartões, ${d.minutos} min construindo, ${d.xp} XP`] }).catch(() => {});
  navega();
}

function telaBoasVindas() {
  return h('div', { class: 'cartao destaque', style: 'max-width:720px;margin:0 auto' },
    h('h1', {}, 'Bem-vindo ao Dojo'),
    h('p', {}, 'Um minuto e você começa. As respostas aparecem na tela nos dias em que o cansaço apertar.'),
    h('p', { style: 'font-weight:650;margin-bottom:4px' }, 'Como você quer ser chamado? (as perguntas de corredor usam o seu nome)'),
    h('input', { type: 'text', id: 'bv-nome', maxlength: 30, value: E.perfil.nome ?? '', placeholder: 'Seu primeiro nome', style: 'max-width:260px' }),
    h('p', { style: 'font-weight:650;margin:14px 0 4px' }, '1. Por que você está fazendo isso? (com as suas palavras)'),
    h('textarea', { id: 'bv-porque', placeholder: 'Ex.: quero responder com segurança quando me perguntarem se dá para migrar um módulo, e ser referência na stack nova.' }, E.perfil.porque ?? ''),
    h('p', { style: 'font-weight:650;margin:14px 0 4px' }, '2. Depois de quê você abre o Dojo? (um gatilho que já acontece todo dia)'),
    h('input', { type: 'text', id: 'bv-gatilho', value: E.perfil.gatilho ?? '', placeholder: 'Ex.: jantar · o banho · pôr as crianças para dormir' }),
    h('p', { style: 'font-weight:650;margin:14px 0 4px' }, '3. A que horas, mais ou menos?'),
    h('input', { type: 'time', id: 'bv-horario', value: E.perfil.horario || '20:30', style: 'max-width:160px' }),
    h('p', { style: 'font-weight:650;margin:14px 0 4px' }, '4. Quantos dias por semana é a sua meta?'),
    h('select', { id: 'bv-meta', style: 'max-width:260px' }, [4, 5, 6].map((n) => h('option', { value: n, selected: n === (E.perfil.metaDias ?? 5) }, `${n} dias (${7 - n} de descanso)`))),
    h('p', { style: 'font-weight:650;margin:14px 0 4px' }, '5. Opcional: a pasta do seu projeto Cockpit (caminho completo)'),
    h('input', { type: 'text', id: 'bv-projeto', value: E.perfil.projeto ?? '', placeholder: 'Ex.: C:\\projetos\\cockpit ou /home/voce/cockpit' }),
    h('p', { class: 'sub', style: 'margin:4px 0 0' }, 'Se for um repositório git, o Dojo mostra os seus commits do dia. Pode deixar em branco e preencher depois, na aba Progresso.'),
    h('div', { style: 'height:16px' }),
    h('button', { class: 'btn primario', onclick: () => {
      const nome = document.getElementById('bv-nome').value.trim();
      if (!nome) return avisa('Diga como quer ser chamado.');
      const porque = document.getElementById('bv-porque').value.trim();
      const gatilho = document.getElementById('bv-gatilho').value.trim();
      if (!porque || !gatilho) return avisa('Responda a 1 e a 2: são elas que seguram o hábito.');
      E.perfil = { nome, projeto: document.getElementById('bv-projeto').value.trim(), porque, gatilho, horario: document.getElementById('bv-horario').value, metaDias: Number(document.getElementById('bv-meta').value), pronto: true };
      BRUTO.estado = E;
      aplicaNome();
      salvar().then(() => api('git').then((g) => { D.git = BRUTO.git = g; }).catch(() => {}));
      navega();
    } }, 'Começar'));
}

// ----- Trilhas -----
TELAS.trilhas = () => {
  const prox = L.proximasLicoes(D.ordem, E, 1, existe)[0];
  return h('div', {},
    h('h1', {}, 'Trilhas'),
    h('p', { class: 'sub' }, 'A rota do dia escolhe a ordem por você. Aqui você vê o mapa inteiro e pode abrir qualquer lição quando quiser.'),
    h('div', { class: 'grade' }, D.ementa.trilhas.map((t) => {
      const total = t.licoes.length, f = t.licoes.filter((l) => feita(l.id)).length;
      return h('a', { class: 'cartao trilha', href: '#/trilha/' + t.id },
        h('div', { class: 'linha' }, h('span', { class: 'icone' }, t.icone), h('h3', { style: 'margin:0' }, t.nome), h('span', { class: 'espaco' }), h('span', { class: 'pilula' + (f === total ? ' ok' : '') }, `${f}/${total}`)),
        h('p', { class: 'sub', style: 'margin:8px 0' }, t.descricao),
        h('div', { class: 'barra' + (f === total ? ' ok' : '') }, h('i', { style: `width:${Math.round((f / total) * 100)}%` })),
        t.licoes.some((l) => l.id === prox) ? h('p', { class: 'sub', style: 'margin:8px 0 0;color:var(--acento)' }, '→ a próxima lição da rota está aqui') : null);
    })));
};

TELAS.trilha = (id) => {
  const t = D.ementa.trilhas.find((x) => x.id === id);
  if (!t) return TELAS.trilhas();
  const prox = L.proximasLicoes(D.ordem, E, 1, existe)[0];
  return h('div', {},
    h('p', {}, h('a', { href: '#/trilhas' }, '← Trilhas')),
    h('div', { class: 'cartao' },
      h('h1', {}, `${t.icone} ${t.nome}`), h('p', { class: 'sub' }, t.descricao),
      t.licoes.map((l, i) => h('a', { class: 'item-licao' + (feita(l.id) ? ' feita' : l.id === prox ? ' proxima' : ''), href: existe(l.id) ? '#/licao/' + l.id : null },
        h('span', { class: 'st' }, feita(l.id) ? '✓' : i + 1),
        h('span', { style: 'flex:1' }, l.titulo, l.id === prox ? h('span', { class: 'sub', style: 'color:var(--acento)' }, ' · próxima da rota') : null),
        h('span', { class: 'pilula n' + l.nivel }, D.ementa.niveis[l.nivel]),
        h('span', { class: 'sub', style: 'min-width:52px;text-align:right' }, existe(l.id) ? `${D.licoes[l.id].minutos} min` : 'em breve')))));
};

// ----- Lição -----
TELAS.licao = (id) => {
  const l = D.licoes[id];
  if (!l) return h('div', { class: 'cartao' }, h('p', {}, 'Esta lição ainda não foi escrita.'), h('a', { href: '#/trilhas' }, 'Voltar'));
  const t = trilhaDe(id), ref = refDe(id);
  const reg = (E.licoes[id] ??= { exs: {} });
  const botao = h('button', { class: 'btn primario' }, feita(id) ? 'Lição já concluída · voltar para Hoje' : 'Concluir a lição');
  const falta = h('span', { class: 'sub' });
  const atualiza = () => {
    const pend = l.exercicios.filter((e, i) => e.tipo !== 'pratica' && !reg.exs[i]?.feito).length;
    botao.disabled = pend > 0 && !feita(id);
    falta.textContent = pend > 0 && !feita(id) ? `Faltam ${pend} exercício${pend > 1 ? 's' : ''}.` : '';
  };
  botao.onclick = () => {
    if (!feita(id)) {
      reg.feitaEm = HOJE;
      L.diaDe(E, HOJE).licoes.push(id);
      l.cartoes.forEach((_, i) => (E.cartoes[`${id}#${i}`] ??= { venc: L.somaDias(HOJE, 1), intervalo: 0, facilidade: 2.5, reps: 0, erros: 0 }));
      xp(L.XP.licao, `lição concluída · ${l.cartoes.length} cartões entram na revisão amanhã`);
      confete();
      salvar();
    }
    location.hash = '#/hoje';
  };
  atualiza();
  return h('div', { style: 'max-width:820px;margin:0 auto' },
    h('p', {}, h('a', { href: '#/trilha/' + t.id }, `← ${t.icone} ${t.nome}`)),
    h('div', { class: 'linha', style: 'margin-bottom:6px' }, h('span', { class: 'pilula n' + ref.nivel }, D.ementa.niveis[ref.nivel]), h('span', { class: 'pilula' }, `${l.minutos} min`), feita(id) ? h('span', { class: 'pilula ok' }, 'concluída em ' + L.dataBR(reg.feitaEm)) : null),
    h('h1', {}, l.titulo),
    h('div', { class: 'cartao ponte' }, h('div', { class: 'ex', style: 'border:0;padding:0;margin:0;background:none' }, h('div', { class: 'tipo', style: 'color:var(--azul)' }, 'A ponte · do que você já sabe'), MD(l.ponte))),
    h('div', { class: 'cartao' }, MD(l.texto)),
    h('div', { class: 'cartao pratica-caixa' }, h('div', { class: 'ex', style: 'border:0;padding:0;margin:0;background:none' }, h('div', { class: 'tipo', style: 'color:var(--ok)' }, 'Na prática'), MD(l.naPratica))),
    h('h2', { style: 'margin-top:26px' }, 'Agora você'),
    l.exercicios.map((e, i) => exercicio(e, reg.exs[i], (r) => {
      const primeira = !reg.exs[i]?.feito;
      reg.exs[i] = { feito: true, ok: r.ok };
      if (primeira && e.tipo !== 'pratica') xp(r.xp ?? (r.ok ? L.XP.exCerto : L.XP.exErrado));
      if (e.tipo === 'pratica') E.oficina[`${id}#${i}`] = r.ok ? HOJE : 'depois';
      if (e.tipo === 'corredor') E.corredor[`${id}#${i}`] = { data: HOJE, pontos: r.pontos, total: e.pontos.length };
      salvar();
      atualiza();
    }, `${id}#${i}`)),
    l.fontes?.length ? h('div', { class: 'cartao' }, h('h3', {}, 'Para ir fundo (fonte oficial)'), l.fontes.map((f) => h('p', { style: 'margin:0 0 4px' }, h('a', { href: f.url, target: '_blank', rel: 'noopener' }, f.titulo)))) : null,
    h('div', { class: 'linha', style: 'margin-top:18px' }, botao, falta));
};

function blocoCodigo(codigo, { escolher = null } = {}) {
  const linhas = codigo.replace(/\n$/, '').split('\n');
  const pre = h('pre', { class: 'bloco' + (escolher ? ' escolhe' : '') }, linhas.map((txt, i) => {
    const ln = h('span', { class: 'linha-cod', 'data-l': i + 1 }, h('span', { class: 'ln' }, i + 1), txt || ' ');
    if (escolher) ln.onclick = () => { pre.querySelectorAll('.marcada').forEach((x) => x.classList.remove('marcada')); ln.classList.add('marcada'); escolher(i + 1); };
    return ln;
  }));
  return pre;
}

const NOMES = { prever: 'Preveja a saída', compila: 'Compila ou não compila?', quiz: 'Pergunta', corredor: 'Pergunta de corredor', pratica: 'Mãos na massa' };

function exercicio(e, anterior, aoResponder, chave) {
  const caixa = h('div', { class: 'ex' + (anterior?.feito && e.tipo !== 'pratica' ? (anterior.ok ? ' certo' : ' errado') : '') }, h('div', { class: 'tipo' }, NOMES[e.tipo], anterior?.feito ? ' · já respondido' : ''));
  const resultado = h('div', {});
  const fim = (ok, extra = {}) => { caixa.classList.remove('certo', 'errado'); caixa.classList.add(ok ? 'certo' : 'errado'); aoResponder({ ok, ...extra }); };
  const viraCartao = (frente, verso) => h('button', { class: 'btn pequeno', onclick: (ev) => { const id = Date.now().toString(36); E.meusCartoes.push({ id, frente, verso, origem: chave }); E.cartoes['meu#' + id] = { venc: L.somaDias(HOJE, 1), intervalo: 0, facilidade: 2.5, reps: 0, erros: 0 }; salvar(); ev.target.disabled = true; ev.target.textContent = 'Cartão criado ✓'; } }, 'Transformar este erro em cartão');

  if (e.tipo === 'prever') {
    const prev = h('textarea', { class: 'mono', placeholder: 'Escreva aqui o que vai aparecer no terminal, linha por linha. Só depois rode.', rows: 4 });
    const rodar = h('button', { class: 'btn primario', disabled: true }, '▶ Rodar de verdade');
    prev.oninput = () => (rodar.disabled = !prev.value.trim());
    rodar.onclick = async () => {
      rodar.disabled = true;
      rodar.textContent = 'Rodando…';
      try {
        const r = await api('rodar', { codigo: e.codigo, linguagem: e.linguagem });
        const real = (r.saida + (e.incluiErro ? r.erro : '')).replaceAll('\r\n', '\n');
        const norm = (s) => s.split('\n').map((x) => x.trimEnd()).join('\n').trim();
        const ok = norm(real) === norm(prev.value);
        resultado.replaceChildren(
          h('div', { class: 'veredito ' + (ok ? 'ok' : 'ruim') }, ok ? 'Previsão certa.' : 'A saída real é outra. É aqui que se aprende.'),
          h('div', { class: 'lado' }, h('div', {}, h('h4', {}, 'Você previu'), h('pre', { class: 'bloco' }, prev.value)), h('div', {}, h('h4', {}, 'O Node respondeu'), h('pre', { class: 'bloco' }, real || '(nada)'))),
          r.erro && !e.incluiErro ? h('pre', { class: 'bloco', style: 'color:#fca5a5' }, r.erro.trim().split('\n').slice(0, 8).join('\n')) : null,
          MD(e.explicacao), ok ? null : viraCartao(`${e.enunciado ?? 'O que este código imprime?'}\n\n\`\`\`\n${e.codigo}\`\`\``, `\`\`\`\n${real}\`\`\`\n\n${e.explicacao}`));
        fim(ok);
      } catch (err) {
        resultado.replaceChildren(h('p', { class: 'veredito ruim' }, 'Não consegui rodar: ' + err.message));
      }
      rodar.textContent = '▶ Rodar de novo';
      rodar.disabled = false;
    };
    caixa.append(e.enunciado ? MD(e.enunciado) : '', blocoCodigo(e.codigo), prev, h('div', { style: 'height:8px' }), rodar, resultado);
  } else if (e.tipo === 'compila') {
    let linha = null;
    const conferir = async (palpite) => {
      try {
        const { erros } = await api('checar', { codigo: e.codigo });
        const compila = erros.length === 0;
        const ok = palpite === compila;
        const acertouLinha = !compila && linha != null && erros.some((x) => x.linha === linha);
        caixa.querySelectorAll('.linha-cod').forEach((x) => erros.some((er) => er.linha === Number(x.dataset.l)) && x.classList.add('errada'));
        resultado.replaceChildren(
          h('div', { class: 'veredito ' + (ok ? 'ok' : 'ruim') }, ok ? (compila ? 'Certo: compila.' : acertouLinha ? 'Certo, e na linha exata.' : 'Certo: não compila.') : compila ? 'Compila, sim.' : 'Não compila.'),
          erros.length ? h('pre', { class: 'bloco' }, erros.map((x) => `linha ${x.linha} · ${x.codigo}: ${x.mensagem}`).join('\n')) : null,
          MD(e.explicacao), ok ? null : viraCartao(`${e.enunciado ?? 'Compila?'}\n\n\`\`\`\n${e.codigo}\`\`\``, (compila ? 'Compila.' : `Não compila (${erros[0]?.codigo}, linha ${erros[0]?.linha}).`) + '\n\n' + e.explicacao));
        fim(ok, { xp: ok ? L.XP.exCerto + (acertouLinha ? 2 : 0) : L.XP.exErrado });
      } catch (err) {
        resultado.replaceChildren(h('p', { class: 'veredito ruim' }, 'Não consegui checar: ' + err.message));
      }
    };
    caixa.append(e.enunciado ? MD(e.enunciado) : '', h('p', { class: 'sub' }, 'Decida antes de conferir. Se achar que não compila, clique na linha do erro.'), blocoCodigo(e.codigo, { escolher: (n) => (linha = n) }),
      h('div', { class: 'linha' }, h('button', { class: 'btn', onclick: () => conferir(true) }, '✓ Compila'), h('button', { class: 'btn', onclick: () => conferir(false) }, '✗ Não compila')), resultado);
  } else if (e.tipo === 'quiz') {
    const botoes = e.opcoes.map((op, i) => h('button', { class: 'opcao', html: md(op).replace(/^<p>|<\/p>$/g, ''), onclick: () => {
      botoes.forEach((b, j) => { b.disabled = true; if (j === e.correta) b.classList.add('certa'); else if (j === i) b.classList.add('errada'); });
      resultado.replaceChildren(h('div', { class: 'veredito ' + (i === e.correta ? 'ok' : 'ruim') }, i === e.correta ? 'Certo.' : 'Não é essa.'), MD(e.explicacao),
        i === e.correta ? null : viraCartao(e.pergunta, `${e.opcoes[e.correta]}\n\n${e.explicacao}`));
      fim(i === e.correta);
    } }));
    caixa.append(MD(e.pergunta), h('div', { class: 'opcoes' }, botoes), resultado);
  } else if (e.tipo === 'corredor') {
    const resp = h('textarea', { rows: 5, placeholder: 'Responda como responderia na hora, em até um minuto. Escreva, ou responda em voz alta e marque a caixa abaixo.' });
    const voz = h('input', { type: 'checkbox' });
    const ver = h('button', { class: 'btn primario' }, 'Comparar com a resposta de sênior');
    ver.onclick = () => {
      if (resp.value.trim().length < 30 && !voz.checked) return avisa('Responda primeiro (por escrito ou em voz alta). Ver a resposta antes anula o treino.');
      const marcas = e.pontos.map(() => h('input', { type: 'checkbox' }));
      const fechar = h('button', { class: 'btn primario' }, 'Registrar');
      fechar.onclick = () => { const n = marcas.filter((m) => m.checked).length; fechar.disabled = true; fechar.textContent = `${n} de ${e.pontos.length} pontos registrados`; fim(n >= Math.ceil(e.pontos.length * 0.6), { xp: L.XP.corredor, pontos: n }); };
      resultado.replaceChildren(h('h3', { style: 'margin-top:14px' }, 'Marque o que a sua resposta cobriu'), e.pontos.map((p, i) => h('label', { class: 'check' }, marcas[i], h('span', { html: md(p).replace(/^<p>|<\/p>$/g, '') }))),
        h('h3', { style: 'margin-top:12px' }, 'Uma resposta de sênior'), MD(e.modelo), fechar);
      ver.disabled = true;
    };
    caixa.append(MD(e.pergunta), resp, h('label', { class: 'check sub' }, voz, 'Respondi em voz alta'), ver, resultado);
  } else if (e.tipo === 'pratica') {
    caixa.append(h('h3', {}, e.titulo, h('small', { class: 'sub' }, ` · ${e.minutos} min`)), h('ol', {}, e.passos.map((p) => h('li', { html: md(p).replace(/^<p>|<\/p>$/g, '') }))),
      h('p', {}, h('strong', {}, 'Pronto quando: '), h('span', { html: md(e.prontoQuando).replace(/^<p>|<\/p>$/g, '') })),
      h('div', { class: 'linha' },
        h('button', { class: 'btn', onclick: (ev) => { fim(true, { xp: 0 }); xp(e.minutos, 'prática feita'); ev.target.parentElement.replaceChildren(h('span', { class: 'pilula ok' }, 'feita')); } }, 'Fiz'),
        h('button', { class: 'btn fantasma', onclick: (ev) => { aoResponder({ ok: false }); ev.target.parentElement.replaceChildren(h('span', { class: 'pilula' }, 'guardada na oficina (aba Progresso)')); } }, 'Deixar para um dia de Imersão')),
      anterior?.ok ? h('p', { class: 'sub' }, 'Você já fez esta prática.') : null);
  }
  return caixa;
}

// ----- Revisão -----
TELAS.revisao = () => {
  const d = L.diaDe(E, HOJE);
  const limite = L.ENERGIAS[d.energia ?? 'normal'].cartoes;
  const filaIds = L.cartoesVencidos(E, HOJE, Math.max(0, limite - d.revisoes) || limite).filter((id) => textoCartao(id));
  const r = L.resumoCartoes(E, HOJE);
  const palco = h('div', { class: 'cartao flash' });
  const vistos = new Set();
  const mostra = () => {
    document.onkeydown = null;
    const id = filaIds.shift();
    if (!id) {
      palco.replaceChildren(h('h2', {}, vistos.size ? 'Revisão do dia feita.' : 'Nada vence hoje.'), h('p', { class: 'sub' }, vistos.size ? `${vistos.size} cartões. Cada um volta sozinho na hora em que você estaria esquecendo.` : 'Os cartões entram aqui quando você conclui uma lição ou erra um exercício.'), h('a', { class: 'btn primario', href: '#/hoje' }, 'Voltar para a sessão'));
      pintaTopo();
      return;
    }
    const c = textoCartao(id);
    const verso = h('div', { class: 'verso', hidden: true }, MD(c.verso));
    const notas = h('div', { class: 'notas', hidden: true }, [['Errei', 'volta hoje'], ['Difícil', 'em breve'], ['Bom', 'intervalo normal'], ['Fácil', 'intervalo longo']].map(([nome, sub], nota) => h('button', { class: 'btn', onclick: () => responde(nota) }, `${nota + 1} · ${nome}`, h('small', {}, sub))));
    const virar = h('button', { class: 'btn primario', onclick: () => vira() }, 'Mostrar a resposta (espaço)');
    const vira = () => { verso.hidden = false; notas.hidden = false; virar.hidden = true; };
    const responde = (nota) => {
      E.cartoes[id] = L.agendaCartao(E.cartoes[id], nota, HOJE);
      if (!vistos.has(id)) { vistos.add(id); d.revisoes++; xp(L.XP.cartao); }
      if (nota === 0) filaIds.push(id);
      salvar();
      mostra();
    };
    document.onkeydown = (ev) => {
      if (['TEXTAREA', 'INPUT'].includes(ev.target.tagName)) return;
      if (ev.key === ' ' && verso.hidden) { ev.preventDefault(); vira(); } else if (!verso.hidden && '1234'.includes(ev.key)) responde(Number(ev.key) - 1);
    };
    palco.replaceChildren(h('p', { class: 'sub' }, `Faltam ${filaIds.length + 1} · responda de cabeça antes de virar`), h('div', { class: 'frente' }, MD(c.frente)), virar, verso, notas);
  };
  mostra();
  const frente = h('textarea', { rows: 2, placeholder: 'Pergunta (curta, uma ideia só)' }), versoN = h('textarea', { rows: 2, placeholder: 'Resposta (até 3 linhas)' });
  return h('div', {},
    h('h1', {}, 'Revisão'),
    h('div', { class: 'numeros', style: 'margin-bottom:16px' }, [['Vencem hoje', r.vencidos], ['Aprendendo', r.aprendendo], ['Firmes (21+ dias)', r.maduros], ['Total', r.total]].map(([n, v]) => h('div', { class: 'numero' }, h('b', {}, v), h('span', {}, n)))),
    palco,
    h('div', { class: 'cartao', style: 'max-width:680px;margin:16px auto 0' }, h('h3', {}, 'Criar um cartão seu'), h('p', { class: 'sub' }, 'Só vira cartão o que você errou ou entendeu com esforço hoje.'), frente, h('div', { style: 'height:8px' }), versoN, h('div', { style: 'height:8px' }),
      h('button', { class: 'btn', onclick: () => { if (!frente.value.trim() || !versoN.value.trim()) return avisa('Preencha pergunta e resposta.'); const id = Date.now().toString(36); E.meusCartoes.push({ id, frente: frente.value.trim(), verso: versoN.value.trim() }); E.cartoes['meu#' + id] = { venc: L.somaDias(HOJE, 1), intervalo: 0, facilidade: 2.5, reps: 0, erros: 0 }; frente.value = versoN.value = ''; salvar(); avisa('Cartão criado. Ele aparece amanhã.'); } }, 'Adicionar')));
};

// ----- Corredor -----
TELAS.corredor = (alvo) => {
  const todas = [];
  for (const o of D.ordem) (D.licoes[o.id]?.exercicios ?? []).forEach((e, i) => e.tipo === 'corredor' && todas.push({ chave: `${o.id}#${i}`, e, licao: o.id }));
  const liberadas = todas.filter((q) => feita(q.licao));
  const respondidas = todas.filter((q) => E.corredor[q.chave]).length;
  const escolhida = alvo ? todas.find((q) => q.chave === alvo) : null;
  if (escolhida)
    return h('div', { style: 'max-width:820px;margin:0 auto' }, h('p', {}, h('a', { href: '#/corredor' }, '← Corredor')), h('p', { class: 'sub' }, `Da lição: `, h('a', { href: '#/licao/' + escolhida.licao }, refDe(escolhida.licao).titulo)),
      exercicio(escolhida.e, null, (r) => { const primeira = !E.corredor[escolhida.chave]; E.corredor[escolhida.chave] = { data: HOJE, pontos: r.pontos, total: escolhida.e.pontos.length }; if (primeira) xp(L.XP.corredor, 'pergunta de corredor'); salvar(); }, escolhida.chave),
      h('a', { class: 'btn', href: '#/corredor' }, 'Outra pergunta'));
  const sorteia = () => { const base = (liberadas.length ? liberadas : todas); const novas = base.filter((q) => !E.corredor[q.chave]); const lista = novas.length ? novas : base; if (lista.length) location.hash = '#/corredor/' + encodeURIComponent(lista[Math.floor(Math.random() * lista.length)].chave); };
  return h('div', {},
    h('h1', {}, 'Corredor'),
    h('div', { class: 'cartao destaque' }, h('p', {}, `"${E.perfil.nome}, dá para migrar esse módulo?" "${E.perfil.nome}, é possível implementar isso no app novo?" Aqui você treina a resposta de um minuto: `, h('strong', {}, 'veredito, custo, risco e primeiro passo'), '. Responda antes de ver o modelo.'),
      h('div', { class: 'linha' }, h('button', { class: 'btn primario', disabled: !todas.length, onclick: sorteia }, '🎲 Sortear uma pergunta'), h('span', { class: 'sub' }, `${respondidas} de ${todas.length} respondidas · ${liberadas.length} liberadas pelas lições que você já fez`))),
    h('div', { class: 'cartao' }, h('h3', {}, 'Todas as perguntas'), todas.map((q) => { const r = E.corredor[q.chave]; return h('a', { class: 'item-licao' + (r ? ' feita' : ''), href: '#/corredor/' + encodeURIComponent(q.chave) }, h('span', { class: 'st' }, r ? '✓' : '?'), h('span', { style: 'flex:1' }, q.e.pergunta.replace(/[*`]/g, '').slice(0, 150)), r ? h('span', { class: 'pilula' }, `${r.pontos}/${r.total}`) : null, h('span', { class: 'pilula' }, trilhaDe(q.licao).nome)); })));
};

// ----- Chefões e desafios -----
TELAS.chefoes = () =>
  h('div', {},
    h('h1', {}, 'Chefões'),
    h('p', { class: 'sub' }, 'Lição mede o que você entendeu. Chefão mede o que você faz sozinho, com o relógio correndo e sem IA. É a única régua honesta de domínio.'),
    D.rota.fases.map((f) => {
      const p = L.progressoFase(D.ordem, E, f.id);
      const c = D.rota.chefoes.find((x) => x.id === f.chefao);
      const reg = E.chefoes[c.id];
      const corpo = h('div', { hidden: true });
      const abrir = h('button', { class: 'btn' + (p.pct === 100 && !reg?.feitoEm ? ' primario' : '') }, 'Ver o enunciado');
      abrir.onclick = () => {
        corpo.hidden = !corpo.hidden;
        if (corpo.childNodes.length) return;
        const marcas = c.aprova.map(() => h('input', { type: 'checkbox' }));
        corpo.append(h('p', {}, h('strong', {}, 'Pode: '), c.pode), h('p', {}, h('strong', {}, 'Não pode: '), c.naoPode), MD(c.enunciado),
          h('h3', {}, 'Aprova quando'), c.aprova.map((a, i) => h('label', { class: 'check' }, marcas[i], h('span', { html: md(a).replace(/^<p>|<\/p>$/g, '') }))),
          h('p', { class: 'sub', style: 'margin-top:10px' }, c.depois),
          h('button', { class: 'btn primario', onclick: () => { const n = marcas.filter((m) => m.checked).length; const aprovado = n === c.aprova.length; const primeira = !E.chefoes[c.id]?.aprovado; E.chefoes[c.id] = { feitoEm: HOJE, itens: n, aprovado, tentativas: (reg?.tentativas ?? 0) + 1 }; if (aprovado && primeira) { xp(L.XP.chefao, 'chefão vencido'); confete(); } else avisa(aprovado ? 'Registrado.' : `Registrado: ${n} de ${c.aprova.length}. Refazer com outro tema é o método funcionando.`); salvar(); navega(); } }, 'Registrar o resultado'));
      };
      return h('div', { class: 'cartao' + (reg?.aprovado ? '' : p.pct === 100 ? ' destaque' : '') },
        h('div', { class: 'linha' }, h('h2', { style: 'margin:0' }, f.nome), h('span', { class: 'espaco' }), h('span', { class: 'pilula' }, f.sprints)),
        h('p', { class: 'sub' }, f.resumo), h('div', { class: 'barra' + (p.pct === 100 ? ' ok' : '') }, h('i', { style: `width:${p.pct}%` })), h('p', { class: 'sub', style: 'margin-top:6px' }, `${p.feitas} de ${p.total} lições`),
        h('div', { class: 'linha' }, h('strong', {}, `👹 ${c.nome}`), h('span', { class: 'pilula' }, `${c.tempoMin} min`), reg?.aprovado ? h('span', { class: 'pilula ok' }, 'vencido em ' + L.dataBR(reg.feitoEm)) : reg?.feitoEm ? h('span', { class: 'pilula ruim' }, `${reg.itens}/${c.aprova.length} em ${L.dataBR(reg.feitoEm)}`) : p.pct < 100 ? h('span', { class: 'pilula' }, 'recomendado ao fechar a fase') : null, h('span', { class: 'espaco' }), abrir),
        corpo,
        D.desafios.some((x) => x.fase === f.id) ? h('div', { style: 'margin-top:12px' }, h('h3', {}, 'Desafios de depuração desta fase'), D.desafios.filter((x) => x.fase === f.id).map((x) => { const r = E.desafios[x.id]; return h('a', { class: 'item-licao' + (r?.resolvidoEm ? ' feita' : ''), href: '#/desafio/' + x.id }, h('span', { class: 'st' }, r?.resolvidoEm ? '✓' : '🐞'), h('span', { style: 'flex:1', html: md(`${x.id} — ${x.titulo}`).replace(/^<p>|<\/p>$/g, '') }), r?.resolvidoEm ? h('span', { class: 'pilula' }, `${r.dicas} dica${r.dicas === 1 ? '' : 's'}`) : null); })) : null);
    }));

TELAS.desafio = (id) => {
  const x = D.desafios.find((d) => d.id === id);
  if (!x) return TELAS.chefoes();
  const reg = (E.desafios[id] ??= { dicas: 0 });
  const dicas = h('div', {});
  const pinta = () => dicas.replaceChildren(x.dicas.slice(0, reg.dicas).map((t, i) => h('div', { class: 'cartao ponte', style: 'padding:10px 14px' }, h('strong', {}, `Dica ${i + 1}: `), h('span', { html: md(t).replace(/^<p>|<\/p>$/g, '') }))),
    reg.dicas < x.dicas.length ? h('button', { class: 'btn', onclick: () => { reg.dicas++; salvar(); pinta(); } }, `Abrir a dica ${reg.dicas + 1} de ${x.dicas.length}`) : null);
  pinta();
  const hip = h('textarea', { rows: 3, placeholder: 'Minha hipótese: acho que é X porque Y. E a correção seria…' });
  const gab = h('div', {});
  return h('div', { style: 'max-width:820px;margin:0 auto' },
    h('p', {}, h('a', { href: '#/chefoes' }, '← Chefões')), h('h1', { html: md(`🐞 ${x.id} — ${x.titulo}`).replace(/^<p>|<\/p>$/g, '') }),
    h('div', { class: 'cartao' }, h('h3', {}, 'Sintoma'), MD(x.sintoma), x.codigo ? blocoCodigo(x.codigo.texto) : null, h('p', { class: 'sub' }, 'Regra: 25 minutos sozinho antes da primeira dica. Com um mentor de IA, peça "planta o desafio ' + x.id + '" para caçar este defeito no seu próprio Cockpit, numa branch (Parte 8 do guia).')),
    dicas,
    h('div', { class: 'cartao' }, h('h3', {}, 'Antes do gabarito, escreva a sua hipótese'), hip, h('div', { style: 'height:8px' }),
      h('button', { class: 'btn primario', onclick: () => { if (hip.value.trim().length < 20) return avisa('Escreva a hipótese primeiro. É ela que fixa.'); gab.replaceChildren(h('h3', {}, 'Causa'), MD(x.gabarito.causa), h('h3', {}, 'Correção'), MD(x.gabarito.correcao), x.gabarito.teste ? [h('h3', {}, 'O teste que prova'), MD(x.gabarito.teste)] : null, h('p', { class: 'sub' }, 'Você aprende: ' + x.aprende.replace(/[*`]/g, '')),
        h('div', { class: 'linha' }, h('button', { class: 'btn primario', onclick: () => { if (!reg.resolvidoEm) { reg.resolvidoEm = HOJE; xp(Math.max(20, L.XP.desafio - reg.dicas * 10), 'desafio resolvido'); salvar(); } location.hash = '#/chefoes'; } }, 'Minha hipótese estava certa'), h('button', { class: 'btn', onclick: () => { reg.resolvidoEm ??= HOJE; reg.errou = true; const cid = Date.now().toString(36); E.meusCartoes.push({ id: cid, frente: `${x.titulo}: ${x.sintoma}`, verso: `${x.gabarito.causa}\n\n${x.gabarito.correcao}` }); E.cartoes['meu#' + cid] = { venc: L.somaDias(HOJE, 1), intervalo: 0, facilidade: 2.5, reps: 0, erros: 0 }; xp(20, 'virou cartão'); salvar(); location.hash = '#/chefoes'; } }, 'Errei: vira cartão'))); } }, 'Ver o gabarito'), gab));
};

// ----- Laboratório -----
TELAS.lab = () => {
  const area = h('textarea', { class: 'mono', rows: 16, spellcheck: 'false' });
  area.value = localStorage.getItem('dojo-lab') ?? "// Laboratório: escreva TypeScript e rode de verdade (Node, com os tipos apagados).\n// \"Checar tipos\" passa pelo compilador em modo estrito, como no Cockpit.\n\ntype Tarefa = { titulo: string; feita: boolean };\n\nconst tarefas: Tarefa[] = [\n  { titulo: 'Estudar hoje', feita: true },\n  { titulo: 'Abrir o PR', feita: false },\n];\n\nconsole.log(tarefas.filter((t) => !t.feita).map((t) => t.titulo));\n";
  area.oninput = () => localStorage.setItem('dojo-lab', area.value);
  area.onkeydown = (ev) => { if (ev.key === 'Tab') { ev.preventDefault(); const s = area.selectionStart; area.setRangeText('  ', s, area.selectionEnd, 'end'); } if (ev.key === 'Enter' && ev.ctrlKey) roda(); };
  const saida = h('pre', { class: 'bloco' }, 'A saída aparece aqui. Ctrl+Enter roda.');
  const roda = async () => { saida.textContent = 'Rodando…'; try { const r = await api('rodar', { codigo: area.value, linguagem: 'ts' }); saida.textContent = (r.saida + (r.erro ? '\n' + r.erro : '')).trim() || '(sem saída)'; if (r.estourou) saida.textContent += '\n[interrompido: passou de 6 segundos]'; } catch (e) { saida.textContent = 'Erro: ' + e.message; } };
  const checa = async () => { saida.textContent = 'Checando…'; try { const { erros } = await api('checar', { codigo: area.value }); saida.textContent = erros.length ? erros.map((x) => `linha ${x.linha} · ${x.codigo}: ${x.mensagem}`).join('\n') : 'Nenhum erro de tipo.'; } catch (e) { saida.textContent = 'Erro: ' + e.message; } };
  return h('div', {}, h('h1', {}, 'Laboratório'), h('p', { class: 'sub' }, `Teve uma dúvida no meio da lição? Teste aqui em vez de ficar na dúvida. Node ${D.node} · TypeScript ${D.ts ?? 'não encontrado'}. Sem pacotes npm: só a linguagem e os módulos node:.`),
    h('div', { class: 'cartao' }, area, h('div', { class: 'linha', style: 'margin:10px 0' }, h('button', { class: 'btn primario', onclick: roda }, '▶ Rodar'), h('button', { class: 'btn', onclick: checa }, 'Checar tipos')), saida));
};

// ----- Progresso -----
TELAS.progresso = () => {
  const dias = Object.entries(E.dias);
  const ativos = dias.filter(([, d]) => L.contaDia(d) && !d.escudo).length;
  const minutos = dias.reduce((s, [, d]) => s + (d.minutos ?? 0), 0);
  const licoes = Object.values(E.licoes).filter((l) => l.feitaEm).length;
  const total = D.ordem.length;
  const r = L.resumoCartoes(E, HOJE);
  const o = L.ofensiva(E, HOJE);
  const fase = faseAtual();
  const pf = L.progressoFase(D.ordem, E, fase.id);
  const proj = L.projecao(E, HOJE, pf.total - pf.feitas);
  const inicio = L.somaDias(HOJE, -(16 * 7 - 1) - ((L.diaDaSemana(HOJE) + 6) % 7) + 6);
  const calor = [];
  for (let i = 0; i < 16 * 7; i++) {
    const iso = L.somaDias(inicio, i);
    const d = E.dias[iso];
    const x = d?.xp ?? 0;
    calor.push(h('i', { class: d?.escudo ? 'esc' : x >= 120 ? 'c3' : x >= 50 ? 'c2' : x > 0 ? 'c1' : '', title: `${L.dataBR(iso)} · ${x} XP${D.git?.porDia?.[iso] ? ` · ${D.git.porDia[iso]} commit(s)` : ''}`, style: iso > HOJE ? 'opacity:.25' : '' }));
  }
  const oficina = Object.entries(E.oficina).filter(([, v]) => v === 'depois');
  return h('div', {},
    h('h1', {}, 'Progresso'),
    h('div', { class: 'numeros' }, [['Lições', `${licoes}/${total}`], ['Dias estudados', ativos], ['Ofensiva atual', o.atual], ['Recorde', o.recorde], ['Horas construindo', (minutos / 60).toFixed(1)], ['Cartões firmes', r.maduros], ['Missões', `${D.rota.missoes.filter((m) => E.missoes[m.id]?.feitaEm).length}/${D.rota.missoes.length}`], ['XP', E.xp]].map(([n, v]) => h('div', { class: 'numero' }, h('b', {}, v), h('span', {}, n)))),
    h('div', { class: 'cartao', style: 'margin-top:16px' }, h('h3', {}, 'Últimas 16 semanas'), h('div', { class: 'calor' }, calor), h('p', { class: 'sub', style: 'margin:8px 0 0' }, 'Cada quadrado é um dia. Mais cor, mais XP. Azul é dia coberto por escudo.')),
    h('div', { class: 'cartao' }, h('h3', {}, 'Onde você está'), h('p', {}, h('strong', {}, fase.nome), ` · ${pf.feitas} de ${pf.total} lições.`),
      h('p', { class: 'sub' }, proj.data ? `No seu ritmo dos últimos 14 dias (${proj.porSemana} lições por semana), você fecha esta fase por volta de ${L.dataBR(proj.data)}.` : 'Faça algumas lições e a projeção de término aparece aqui.')),
    h('div', { class: 'cartao' }, h('h3', {}, 'Por trilha'), D.ementa.trilhas.map((t) => { const f = t.licoes.filter((l) => feita(l.id)).length; return h('div', { style: 'margin-bottom:10px' }, h('div', { class: 'linha' }, h('span', {}, `${t.icone} ${t.nome}`), h('span', { class: 'espaco' }), h('span', { class: 'sub' }, `${f}/${t.licoes.length}`)), h('div', { class: 'barra' + (f === t.licoes.length ? ' ok' : '') }, h('i', { style: `width:${Math.round((f / t.licoes.length) * 100)}%` }))); })),
    oficina.length ? h('div', { class: 'cartao' }, h('h3', {}, 'Oficina: práticas guardadas'), oficina.map(([k]) => { const [lid, i] = k.split('#'); return h('a', { class: 'item-licao', href: '#/licao/' + lid }, h('span', { class: 'st' }, '🔧'), h('span', { style: 'flex:1' }, D.licoes[lid]?.exercicios?.[i]?.titulo ?? k), h('span', { class: 'sub' }, refDe(lid)?.titulo)); })) : null,
    h('div', { class: 'cartao' }, h('h3', {}, 'Perfil'), h('p', { class: 'sub' }, `${E.perfil.nome} · meta de ${E.perfil.metaDias} dias por semana · projeto: ${E.perfil.projeto || 'não informado'}`), h('button', { class: 'btn', onclick: () => { E.perfil.pronto = false; location.hash = '#/hoje'; } }, 'Editar perfil')),
    E.diario.length ? h('div', { class: 'cartao' }, h('h3', {}, 'Diário'), E.diario.slice(-10).reverse().map((x) => h('p', { style: 'margin:0 0 8px' }, h('strong', {}, L.dataBR(x.data) + ' · '), x.fiz, x.travei ? h('span', { class: 'sub' }, ' · travei: ' + x.travei) : null))) : null);
};

// ---------- partida ----------
async function inicia() {
  try {
    BRUTO = await api('tudo');
    aplicaNome();
  } catch (e) {
    $app.replaceChildren(h('p', { class: 'carregando' }, 'Não consegui falar com o servidor do Dojo: ' + e.message + '. Feche esta aba e inicie o Dojo de novo (npm start).'));
    return;
  }
  E = D.estado;
  HOJE = D.hoje;
  retorno = L.aplicaEscudos(E, HOJE);
  if (E.foco && E.foco.dia !== HOJE) E.foco = null;
  if (retorno.tipo === 'escudo') salvar();
  window.addEventListener('hashchange', navega);
  navega();
}
inicia();
