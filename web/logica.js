// Lógica pura do Dojo (sem tela, sem rede): datas, revisão espaçada, ofensiva, XP e rota.
// É importada pelo navegador e pelos testes (node testes/logica.test.mjs).

export const XP = { cartao: 2, exCerto: 8, exErrado: 4, licao: 20, minuto: 1, missao: 50, corredor: 15, desafio: 60, chefao: 300, fechar: 10 };

export const FAIXAS = [
  ['Branca', 0], ['Amarela', 400], ['Laranja', 1200], ['Verde', 2500],
  ['Azul', 4500], ['Roxa', 7000], ['Marrom', 10000], ['Preta', 14000],
];

export const ENERGIAS = {
  minimo: { nome: 'Mínimo', minutos: 15, icone: '🪫', cartoes: 8, licoes: 1, construir: 0, descricao: 'Dia pesado. 15 minutos seguram a ofensiva.' },
  normal: { nome: 'Normal', minutos: 60, icone: '🔋', cartoes: 15, licoes: 1, construir: 35, descricao: 'Revisão, uma lição e 35 minutos de Cockpit.' },
  imersao: { nome: 'Imersão', minutos: 120, icone: '⚡', cartoes: 25, licoes: 2, construir: 75, descricao: 'Revisão, duas lições e 75 minutos de Cockpit.' },
};

// ---------- datas (sempre a data LOCAL, no formato AAAA-MM-DD) ----------
export function hojeISO(d = new Date()) {
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}
const paraData = (iso) => {
  const [a, m, d] = iso.split('-').map(Number);
  return new Date(a, m - 1, d, 12);
};
export const somaDias = (iso, n) => {
  const d = paraData(iso);
  d.setDate(d.getDate() + n);
  return hojeISO(d);
};
export const difDias = (a, b) => Math.round((paraData(b) - paraData(a)) / 86400000);
export const diaDaSemana = (iso) => paraData(iso).getDay(); // 0 = domingo
export function dataBR(iso) {
  const [a, m, d] = iso.split('-');
  return `${d}/${m}/${a}`;
}

// ---------- estado ----------
export function estadoInicial(hoje, missoesJaFeitas = []) {
  const missoes = {};
  for (const id of missoesJaFeitas) missoes[id] = { feitaEm: hoje, minutos: 0, anterior: true };
  return {
    versao: 1, rev: 0, criadoEm: hoje,
    perfil: { nome: '', projeto: '', porque: '', gatilho: '', horario: '', metaDias: 5, pronto: false },
    dias: {}, licoes: {}, cartoes: {}, meusCartoes: [], missoes, chefoes: {}, desafios: {}, corredor: {},
    oficina: {}, foco: null, escudos: 0, recorde: 0, xp: 0, diario: [], amanha: '',
  };
}

export function diaDe(estado, iso) {
  estado.dias[iso] ??= { xp: 0, energia: null, revisoes: 0, licoes: [], minutos: 0, fechado: false };
  return estado.dias[iso];
}

/** O dia "conta" para a ofensiva com a sessão mínima: 1 lição, ou 15 min construindo, ou 8 cartões. */
export function contaDia(d) {
  if (!d) return false;
  return d.escudo === true || (d.licoes?.length ?? 0) >= 1 || (d.minutos ?? 0) >= 15 || (d.revisoes ?? 0) >= 8;
}
const diaAtivo = (d) => contaDia(d) && d.escudo !== true;

export function ganhaXP(estado, hoje, n) {
  estado.xp += n;
  diaDe(estado, hoje).xp += n;
}

// ---------- ofensiva (dias seguidos) e escudo ----------
export function ofensiva(estado, hoje) {
  let fim = contaDia(estado.dias[hoje]) ? hoje : somaDias(hoje, -1);
  let atual = 0;
  while (contaDia(estado.dias[fim])) {
    atual++;
    fim = somaDias(fim, -1);
  }
  return { atual, hojeConta: contaDia(estado.dias[hoje]), recorde: Math.max(estado.recorde ?? 0, atual) };
}

/** Ao abrir o Dojo: um escudo cobre UM dia perdido (regra "nunca dois dias seguidos"). Devolve o que houve. */
export function aplicaEscudos(estado, hoje) {
  const ativos = Object.keys(estado.dias).filter((k) => k < hoje && diaAtivo(estado.dias[k])).sort();
  const ultimo = ativos.at(-1);
  if (!ultimo) return { tipo: 'primeiro' };
  const buraco = difDias(ultimo, hoje) - 1;
  if (buraco <= 0) return { tipo: 'seguido' };
  const perdidos = Array.from({ length: buraco }, (_, i) => somaDias(ultimo, i + 1)).filter((k) => !contaDia(estado.dias[k]));
  if (!perdidos.length) return { tipo: 'seguido' };
  if (perdidos.length === 1 && estado.escudos > 0) {
    estado.escudos--;
    estado.dias[perdidos[0]] = { ...diaDe(estado, perdidos[0]), escudo: true };
    return { tipo: 'escudo', dia: perdidos[0] };
  }
  return { tipo: 'retorno', dias: buraco };
}

/** Chamar depois de qualquer atividade: atualiza recorde e dá 1 escudo a cada 7 dias seguidos (máx. 2). */
export function atualizaOfensiva(estado, hoje) {
  const o = ofensiva(estado, hoje);
  estado.recorde = Math.max(estado.recorde ?? 0, o.atual);
  const d = diaDe(estado, hoje);
  if (o.hojeConta && o.atual > 0 && o.atual % 7 === 0 && !d.ganhouEscudo) {
    d.ganhouEscudo = true;
    if (estado.escudos < 2) {
      estado.escudos++;
      return { ...o, escudoNovo: true };
    }
  }
  return o;
}

export function semana(estado, hoje) {
  const inicio = somaDias(hoje, -((diaDaSemana(hoje) + 6) % 7)); // segunda
  return Array.from({ length: 7 }, (_, i) => {
    const iso = somaDias(inicio, i);
    const d = estado.dias[iso];
    return { iso, conta: contaDia(d), escudo: d?.escudo === true, hoje: iso === hoje, futuro: iso > hoje, xp: d?.xp ?? 0 };
  });
}

// ---------- faixa (nível por XP) ----------
export function faixa(xp) {
  let i = 0;
  while (i + 1 < FAIXAS.length && xp >= FAIXAS[i + 1][1]) i++;
  const [nome, base] = FAIXAS[i];
  const prox = FAIXAS[i + 1];
  return { nome, indice: i, base, proxima: prox ? prox[0] : null, falta: prox ? prox[1] - xp : 0, pct: prox ? Math.round(((xp - base) / (prox[1] - base)) * 100) : 100 };
}

// ---------- revisão espaçada ----------
// nota: 0 = errei, 1 = difícil, 2 = bom, 3 = fácil
export function agendaCartao(c, nota, hoje) {
  const n = { intervalo: 0, facilidade: 2.5, reps: 0, erros: 0, ...c };
  if (nota === 0) {
    n.reps = 0;
    n.erros++;
    n.intervalo = 0;
    n.facilidade = Math.max(1.3, n.facilidade - 0.2);
  } else {
    if (nota === 1) {
      n.intervalo = Math.max(1, Math.round(n.intervalo * 1.2));
      n.facilidade = Math.max(1.3, n.facilidade - 0.15);
    } else if (n.reps === 0) n.intervalo = nota === 3 ? 3 : 1;
    else if (n.reps === 1) n.intervalo = nota === 3 ? 6 : 3;
    else {
      n.intervalo = Math.round(n.intervalo * n.facilidade * (nota === 3 ? 1.3 : 1));
      if (nota === 3) n.facilidade += 0.15;
    }
    n.reps++;
  }
  n.venc = somaDias(hoje, n.intervalo);
  n.visto = hoje;
  return n;
}

export function cartoesVencidos(estado, hoje, limite = 999) {
  return Object.entries(estado.cartoes)
    .filter(([, c]) => c.venc <= hoje)
    .sort((a, b) => (a[1].venc < b[1].venc ? -1 : a[1].venc > b[1].venc ? 1 : a[0] < b[0] ? -1 : 1))
    .slice(0, limite)
    .map(([id]) => id);
}

export function resumoCartoes(estado, hoje) {
  const todos = Object.values(estado.cartoes);
  return {
    total: todos.length,
    vencidos: todos.filter((c) => c.venc <= hoje).length,
    maduros: todos.filter((c) => c.intervalo >= 21).length,
    aprendendo: todos.filter((c) => c.intervalo < 21).length,
  };
}

// ---------- rota ----------
/** Ordem completa das lições: as fases com lista explícita primeiro; as fases "auto" recebem o que sobrou
 *  até o nível indicado, intercalando as trilhas. Devolve [{ id, fase }]. */
export function ordemDaRota(rota, ementa) {
  const info = new Map();
  for (const t of ementa.trilhas) for (const l of t.licoes) info.set(l.id, { ...l, trilha: t.id });
  const usados = new Set();
  const saida = [];
  for (const f of rota.fases) {
    for (const id of f.licoes ?? []) {
      if (!info.has(id)) throw new Error(`rota: lição desconhecida ${id} na fase ${f.id}`);
      if (usados.has(id)) throw new Error(`rota: lição repetida ${id}`);
      usados.add(id);
      saida.push({ id, fase: f.id });
    }
    if (f.auto) {
      const filas = ementa.trilhas
        .map((t) => t.licoes.filter((l) => !usados.has(l.id) && l.nivel <= f.auto.ateNivel).map((l) => l.id))
        .filter((q) => q.length);
      while (filas.some((q) => q.length)) {
        for (const q of filas) {
          const id = q.shift();
          if (id) {
            usados.add(id);
            saida.push({ id, fase: f.id });
          }
        }
      }
    }
  }
  const faltou = [...info.keys()].filter((id) => !usados.has(id));
  if (faltou.length) throw new Error('rota: lições fora da rota: ' + faltou.join(', '));
  return saida;
}

export function progressoFase(ordem, estado, faseId) {
  const ids = ordem.filter((o) => o.fase === faseId).map((o) => o.id);
  const feitas = ids.filter((id) => estado.licoes[id]?.feitaEm).length;
  return { total: ids.length, feitas, pct: ids.length ? Math.round((feitas / ids.length) * 100) : 0 };
}

export const proximasLicoes = (ordem, estado, n = 1, existe = () => true) =>
  ordem.filter((o) => !estado.licoes[o.id]?.feitaEm && existe(o.id)).slice(0, n).map((o) => o.id);

export const proximaMissao = (missoes, estado) => missoes.find((m) => !estado.missoes[m.id]?.feitaEm) ?? null;

/** Ritmo dos últimos 14 dias e projeção de término de um conjunto de lições. */
export function projecao(estado, hoje, restantes) {
  let feitas = 0;
  for (let i = 0; i < 14; i++) feitas += estado.dias[somaDias(hoje, -i)]?.licoes?.length ?? 0;
  const porDia = feitas / 14;
  if (feitas < 3 || restantes <= 0) return { porSemana: +(porDia * 7).toFixed(1), data: null };
  return { porSemana: +(porDia * 7).toFixed(1), data: somaDias(hoje, Math.ceil(restantes / porDia)) };
}
