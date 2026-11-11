// Confere se cada URL de "fontes" das lições responde. node ferramentas/confere_links.mjs
// Só faz GET anônimo nas páginas públicas de documentação; não envia dado nenhum.
import { readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'conteudo');
const usos = new Map();
for (const f of (await readdir(DIR)).filter((n) => n.endsWith('.json') && !n.startsWith('_')))
  for (const l of JSON.parse(await readFile(path.join(DIR, f), 'utf8')).licoes)
    for (const s of l.fontes ?? []) usos.set(s.url, [...(usos.get(s.url) ?? []), l.id]);

const urls = [...usos.keys()];
const ruins = [];
let i = 0;
async function confere(url) {
  for (let tentativa = 0; tentativa < 2; tentativa++) {
    try {
      const r = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(20000), headers: { 'user-agent': 'Mozilla/5.0 (link-check)', accept: 'text/html,*/*' } });
      await r.body?.cancel();
      if (r.ok) return null;
      if (tentativa === 1 || ![403, 429, 500, 502, 503].includes(r.status)) return String(r.status);
    } catch (e) {
      if (tentativa === 1) return e.name === 'TimeoutError' ? 'tempo esgotado' : (e.cause?.code ?? e.message);
    }
    await new Promise((r) => setTimeout(r, 1500));
  }
}
await Promise.all(Array.from({ length: 6 }, async () => {
  while (i < urls.length) {
    const url = urls[i++];
    const erro = await confere(url);
    if (erro) ruins.push({ url, erro, licoes: usos.get(url) });
  }
}));
ruins.sort((a, b) => a.url.localeCompare(b.url));
for (const r of ruins) console.log(`${r.erro.padEnd(16)} ${r.url}  [${r.licoes.join(', ')}]`);
console.log(`\n${urls.length} URLs distintas · ${urls.length - ruins.length} respondem · ${ruins.length} com problema`);
await writeFile(path.join(DIR, '..', 'placar-links.json'), JSON.stringify({ total: urls.length, ok: urls.length - ruins.length, ruins }, null, 1) + '\n');
