#!/usr/bin/env node
// Turns scraped Liquipedia tournaments into a ready-to-paste /add-lan request.
//   node scripts/lan-draft.mjs --list              offline events still to come
//   node scripts/lan-draft.mjs "<name substring>"  draft for the first match
// The output covers every field the add-lan skill asks for. Entry fee, SEO hook
// and the Imgur image can't be scraped, so they are left as TODOs.

import { readFile, readdir } from 'node:fs/promises';

const SCRAPED = new URL('../data/scraped/', import.meta.url);
const today = new Date().toISOString().slice(0, 10);

// add-lan only accepts these game values; anything else goes under Conventions.
const LAN_GAME = { callofduty: 'CoD', halo: 'Halo', leagueoflegends: 'LoL', warzone: 'Warzone' };

const rows = [];
for (const file of await readdir(SCRAPED)) {
  const m = file.match(/^liquipedia-(.+)\.json$/);
  if (!m) continue;
  for (const r of JSON.parse(await readFile(new URL(file, SCRAPED), 'utf8'))) {
    rows.push({ ...r, wiki: m[1] });
  }
}
const lans = rows.filter((r) => r.type === 'Offline' && r.start && (r.end ?? r.start) >= today
  && Date.parse(r.end ?? r.start) - Date.parse(r.start) <= 45 * 864e5);

const arg = process.argv[2];
if (!arg || arg === '--list') {
  if (!lans.length) console.log('No upcoming offline events in the scraped data. Run scrape-esports.mjs first.');
  for (const r of [...lans].sort((a, b) => a.start.localeCompare(b.start))) console.log(`${r.start}  ${r.name ?? r.title}  (${[r.location, r.country].filter(Boolean).join(', ')})`);
  process.exit(0);
}

const r = lans.find((x) => (x.name ?? x.title).toLowerCase().includes(arg.toLowerCase()));
if (!r) {
  console.error(`No upcoming offline event matching "${arg}". Try --list.`);
  process.exit(1);
}

const fmt = (iso) => new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
const date = r.end && r.end !== r.start
  ? `${fmt(r.start).replace(/,? \d{4}$/, '')} - ${fmt(r.end)}`
  : fmt(r.start);
const bullets = [
  r.prizepool && `$${String(r.prizepool).replace(/^\$/, '')} Prize Pool`,
  r.teamCount && `${r.teamCount} Teams`,
  r.tier && `${r.tier} Event`,
].filter(Boolean);
const place = [r.venue, r.location, r.country].filter(Boolean).join(', ');
if (r.start > today && Date.parse(r.start) - Date.parse(today) > 365 * 864e5) console.error('Note: this event is over a year away; details may still change.');

console.log(`/add-lan
- Game(s): ${LAN_GAME[r.wiki] ?? 'Conventions'}${LAN_GAME[r.wiki] ? '' : `   (${r.wiki} has no LAN section; Conventions is the closest fit)`}
- Title: ${r.name ?? r.title}
- SEO hook: TODO (1-2 sentences)
- Description bullets: ${bullets.map((b) => `"${b}"`).join(', ') || 'TODO'}
- Date: ${date}
- Exact location: ${place || 'TODO'}
- Entry fee: TODO
- Event link: ${r.url}
- Imgur image URL: TODO

Source: Liquipedia (CC-BY-SA). Check the details before publishing.`);
