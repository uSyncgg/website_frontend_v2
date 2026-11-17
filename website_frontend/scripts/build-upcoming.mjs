#!/usr/bin/env node
// Merges data/scraped/*.json into src/data/upcomingEvents.json (ongoing + future events only).
//   node scripts/build-upcoming.mjs [--max=12]

import { readFile, readdir, writeFile } from 'node:fs/promises';

const SCRAPED = new URL('../data/scraped/', import.meta.url);
const OUT = new URL('../src/data/upcomingEvents.json', import.meta.url);
const MAX = Number(process.argv.find((a) => a.startsWith('--max='))?.split('=')[1] ?? 12);

const GAME_BY_WIKI = {
  counterstrike: 'Counter-Strike 2',
  valorant: 'Valorant',
  leagueoflegends: 'League of Legends',
  rocketleague: 'Rocket League',
  halo: 'Halo',
  callofduty: 'Call of Duty',
  warzone: 'Warzone',
};

const day = (v) => (v ? String(v).slice(0, 10) : null);
const today = new Date().toISOString().slice(0, 10);
const daysFromToday = (iso) => (Date.parse(iso) - Date.parse(today)) / 864e5;
const spanDays = (e) => (Date.parse(e.end ?? e.start) - Date.parse(e.start)) / 864e5;

const events = [];
for (const file of await readdir(SCRAPED)) {
  if (!file.endsWith('.json')) continue;
  const rows = JSON.parse(await readFile(new URL(file, SCRAPED), 'utf8'));
  if (file.startsWith('liquipedia-')) {
    const game = GAME_BY_WIKI[file.slice(11, -5)] ?? file.slice(11, -5);
    for (const r of rows) {
      events.push({
        name: r.name ?? r.title, game, start: day(r.start), end: day(r.end) ?? day(r.start),
        location: [r.location, r.country].filter(Boolean).join(', ') || (r.type === 'Online' ? 'Online' : null),
        online: r.type === 'Online', prizePool: r.prizepool, tier: r.tier, url: r.url, source: 'Liquipedia',
      });
    }
  } else if (file === 'la-scene.json') {
    for (const r of rows) {
      events.push({
        name: r.name, game: r.game, start: day(r.start), end: day(r.end), location: 'Online',
        online: true, prizePool: null, tier: null, url: r.url, source: 'la-scene.gg',
      });
    }
  }
}

const upcoming = events
  // Skip year-long programs and events too far out to be useful on a homepage.
  .filter((e) => e.name && e.start && (e.end ?? e.start) >= today && spanDays(e) <= 45 && daysFromToday(e.start) <= 270)
  .sort((a, b) => a.start.localeCompare(b.start))
  .slice(0, MAX);

await writeFile(OUT, JSON.stringify({ generatedAt: new Date().toISOString(), events: upcoming }, null, 2) + '\n');
console.log(`wrote src/data/upcomingEvents.json (${upcoming.length} of ${events.length} events)`);
