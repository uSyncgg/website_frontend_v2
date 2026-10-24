#!/usr/bin/env node
// Re-runnable esports data scraper.
//   node scripts/scrape-esports.mjs [la-scene|liquipedia|all] [--wiki=counterstrike] [--limit=50]
// Output: data/scraped/<source>.json
//
// HLTV is intentionally not supported: it blocks automated requests (Cloudflare) and
// forbids scraping in its terms. Use a licensed provider (PandaScore, Abios, GRID) instead.

import { mkdir, writeFile } from 'node:fs/promises';

const UA = 'uSyncBot/0.1 (contact: tonegmzbusiness@gmail.com)';
const OUT = new URL('../data/scraped/', import.meta.url);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const args = process.argv.slice(2);
const source = args.find((a) => !a.startsWith('--')) ?? 'all';
const opt = (name, def) => args.find((a) => a.startsWith(`--${name}=`))?.split('=')[1] ?? def;
const LIMIT = Number(opt('limit', 50));

async function get(url, delay) {
  await sleep(delay);
  const res = await fetch(url, { headers: { 'User-Agent': UA, 'Accept-Encoding': 'gzip' } });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res;
}

async function save(name, data) {
  await mkdir(OUT, { recursive: true });
  await writeFile(new URL(`${name}.json`, OUT), JSON.stringify(data, null, 2));
  console.log(`wrote data/scraped/${name}.json (${data.length} rows)`);
}

// ---- la-scene.gg (robots.txt allows crawling; pages embed schema.org JSON-LD) ----
async function laScene() {
  const base = 'https://la-scene.gg';
  const list = await (await get(`${base}/championships`, 0)).text();
  const ids = [...new Set([...list.matchAll(/href="\/championships\/([0-9a-f-]{36})"/g)].map((m) => m[1]))];
  console.log(`la-scene: ${ids.length} championships`);
  const rows = [];
  for (const id of ids) {
    const html = await (await get(`${base}/championships/${id}`, 400)).text();
    const ld = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s);
    const ev = ld && JSON.parse(ld[1])['@graph']?.find((n) => n['@type'] === 'SportsEvent');
    const text = html.replace(/<script.*?<\/script>|<style.*?<\/style>/gs, '').replace(/<[^>]+>/g, '\n');
    const teams = (text.split('Équipes engagées')[1] ?? '').split('\n').map((s) => s.trim()).filter(Boolean);
    rows.push({
      id,
      url: `${base}/championships/${id}`,
      name: ev?.name,
      game: ev?.sport,
      organizer: ev?.organizer?.name,
      start: ev?.startDate,
      end: ev?.endDate,
      status: html.match(/Statut : ([^.]+)\./)?.[1],
      format: html.match(/Format : ([^.]+)\./)?.[1],
      teams: teams.slice(0, 64),
    });
  }
  await save('la-scene', rows);
}

// ---- Liquipedia (MediaWiki API; their rule: 1 req / 2s, gzip, descriptive UA) ----
async function liquipedia() {
  const wiki = opt('wiki', 'counterstrike');
  const api = `https://liquipedia.net/${wiki}/api.php`;
  const cats = opt('category', 'S-Tier_Tournaments,A-Tier_Tournaments').split(',');
  const q = (p) => `${api}?format=json&formatversion=2&${new URLSearchParams(p)}`;
  // Newest-added pages first: upcoming events are the ones recently created.
  const seen = new Set();
  const members = [];
  for (const cat of cats) {
    const res = (await (await get(q({
      action: 'query', list: 'categorymembers', cmtitle: `Category:${cat}`, cmlimit: String(LIMIT),
      cmnamespace: '0', cmsort: 'timestamp', cmdir: 'desc',
    }), 2100)).json()).query.categorymembers;
    for (const m of res) if (!seen.has(m.title)) { seen.add(m.title); members.push(m); }
    console.log(`liquipedia/${wiki}: ${res.length} pages in Category:${cat}`);
  }
  const rows = [];
  for (const { title } of members) {
    const data = await (await get(q({
      action: 'query', prop: 'revisions', rvprop: 'content', rvslots: 'main', titles: title,
    }), 2100)).json();
    const wt = data.query.pages[0]?.revisions?.[0]?.slots?.main?.content ?? '';
    const clean = (v) => v?.replace(/&nbsp;/g, ' ').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    const f = (k) => {
      const v = clean(wt.match(new RegExp(`\\|\\s*${k}\\s*=\\s*([^\\n|]*)`))?.[1]);
      return v && !v.includes('{{') ? v : null; // unresolved wiki templates (e.g. TBA) aren't data
    };
    rows.push({
      title,
      url: `https://liquipedia.net/${wiki}/${encodeURIComponent(title.replaceAll(' ', '_'))}`,
      name: f('name') ?? clean(title), series: f('series'), organizer: f('organizer'), tier: f('liquipediatier'),
      type: f('type'), country: f('country'), location: f('city') ?? f('location'), venue: f('venue'),
      start: f('sdate'), end: f('edate'), prizepool: f('prizepool'), teamCount: f('team_number'),
      winner: f('winner'), runnerup: f('runnerup'),
    });
  }
  await save(`liquipedia-${wiki}`, rows);
}

const jobs = { 'la-scene': laScene, liquipedia };
if (source === 'hltv') {
  console.error('HLTV is not supported (blocks bots, terms forbid scraping).');
  process.exit(1);
}
for (const [name, fn] of Object.entries(jobs)) {
  if (source === 'all' || source === name) await fn();
}
