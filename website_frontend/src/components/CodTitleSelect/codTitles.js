// The Call of Duty titles we aggregate tournaments for.
//
// The order here is the order the bubbles render in.
//
// `art`, `short`, `year` and `accent` are not used by the bubbles, which are
// text and a count only. They are kept because the covers are sourced and
// sized already, and a poster view of the titles is the obvious next place for
// them. The trailing "l" on each imgur ID is their 640px thumbnail; drop it for
// the full-size original.
// Only titles with tournaments actually running are listed. Checked against
// CheckMate Gaming and Console Kings on 2026-08-09: Black Ops 6, Modern
// Warfare III, Vanguard and Cold War all returned zero active tournaments, and
// Modern Warfare II has no listing page at all, so they are not shown. Their
// art and accents are kept in RETIRED_COD_TITLES below — move an entry back up
// here if its scene picks up again.
export const COD_TITLES = [
    { id: 'bo7',     label: 'Black Ops 7', short: 'BO7', year: '2025',    accent: '#f0a03c', art: 'https://i.imgur.com/gNvoNEol.jpg' },
    { id: 'warzone', label: 'Warzone',     short: 'WZ',  year: 'Ongoing', accent: '#e8c33a', art: 'https://i.imgur.com/IBGIbY2l.jpg' },
    { id: 'bo2',     label: 'Black Ops II', short: 'BO2', year: '2012',   accent: '#e2673c', art: 'https://i.imgur.com/NwHCHk8l.jpg' },
    { id: 'bo1',     label: 'Black Ops',   short: 'BO1', year: '2010',    accent: '#c4423c', art: 'https://i.imgur.com/hqntpjDl.jpg' }
];

// Not rendered — parked here so bringing a title back is a copy/paste.
export const RETIRED_COD_TITLES = [
    { id: 'bo6',      label: 'Black Ops 6',        short: 'BO6',   year: '2024', accent: '#d8b24a', art: 'https://i.imgur.com/lt94bkCl.jpg' },
    { id: 'mwiii',    label: 'Modern Warfare III', short: 'MWIII', year: '2023', accent: '#e0533a', art: 'https://i.imgur.com/kcjX9Jxl.jpg' },
    { id: 'mwii',     label: 'Modern Warfare II',  short: 'MWII',  year: '2022', accent: '#5f9e7c', art: 'https://i.imgur.com/vYQtjHGl.jpg' },
    { id: 'vanguard', label: 'Vanguard',           short: 'VG',    year: '2021', accent: '#c98b4b', art: 'https://i.imgur.com/88lyFbLl.jpg' },
    { id: 'coldwar',  label: 'Black Ops Cold War', short: 'BOCW',  year: '2020', accent: '#3f9bd4', art: 'https://i.imgur.com/S2176oBl.jpg' }
];

export const COD_TITLES_BY_ID = Object.fromEntries(COD_TITLES.map(title => [title.id, title]));

// Every id we know about, retired ones included, so an explicit title from the
// scrapers is always honoured even if that title has no tile right now.
const ALL_TITLE_IDS = new Set([...COD_TITLES, ...RETIRED_COD_TITLES].map(title => title.id));

// Backdrop for the "All Titles" tile. It sits under a purple wash so the tile
// still reads as the odd one out next to the real box art.
export const ALL_TITLE_ART = 'https://i.imgur.com/POoVfw2l.jpg';

// Tournaments the scrapers send have no title field yet, so we read it off the
// host's URL slug. CMG puts the game in the path
// (/tournament/cross-platform/call-of-duty-black-ops-7/...); other hosts don't,
// which is why we fall back to the current title.
//
// Order matters — the most specific slugs have to be tested first. Warzone is
// near the top because its brackets are named "Black Ops Royale", which would
// otherwise get read as a Black Ops slug.
//
// The retired titles are still matched. If one of their scenes comes back, the
// tournaments get labelled correctly the moment the tile is re-added; until
// then they land on an id with no tile and simply stay under "All".
const URL_PATTERNS = [
    [/warzone/, 'warzone'],
    [/black-ops-cold-war|cold-war/, 'coldwar'],
    [/black-ops-7|black-ops-vii/, 'bo7'],
    [/black-ops-6|black-ops-vi/, 'bo6'],
    [/black-ops-2|black-ops-ii/, 'bo2'],
    [/black-ops-1|black-ops-i\b|black-ops(?!-)/, 'bo1'],
    [/modern-warfare-3|modern-warfare-iii/, 'mwiii'],
    [/modern-warfare-2|modern-warfare-ii/, 'mwii'],
    [/vanguard/, 'vanguard']
];

// What an unrecognised tournament is assumed to be. Every host is running the
// newest title, so this is the safe guess until the scrapers send a real one.
export const DEFAULT_COD_TITLE = 'bo7';

export const codTitleFromTournament = (tournament) => {
    // Once the scrapers send a title, it wins over anything we can infer.
    if (tournament?.title && ALL_TITLE_IDS.has(tournament.title)) return tournament.title;

    const url = String(tournament?.url || '').toLowerCase();
    const match = URL_PATTERNS.find(([pattern]) => pattern.test(url));
    return match ? match[1] : DEFAULT_COD_TITLE;
};

// { bo7: 24, bo6: 8, ... } for the count badge on each tile.
export const countByCodTitle = (tournaments = []) =>
    tournaments.reduce((counts, tournament) => {
        const id = codTitleFromTournament(tournament);
        counts[id] = (counts[id] || 0) + 1;
        return counts;
    }, {});
