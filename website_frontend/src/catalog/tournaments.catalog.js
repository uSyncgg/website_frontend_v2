/**
 * Catalog config for /tournaments. Same shape as games.catalog.js — see that
 * file's header comment for the full field reference.
 *
 * Only Call of Duty has online tournaments (matches the existing site's
 * Tournaments.js, which lists only CoD) — its tournament data comes from a
 * live API (CodTournaments.js), not a static HostBanner list, and nothing in
 * that pipeline carries a "verified" flag, so there's no real data for a
 * verifiedBoard here and no `heroAside` at all. With one entry, a search box
 * and genre-chip row above a single card would just be noise, so `search`
 * and `facet` are both omitted too — this catalog is the pattern's minimum
 * shape, deliberately.
 */

export const SECTIONS = [
    { key: 'tournaments', label: 'Tournaments' },
];

export const tournamentsCatalog = {
    key: 'tournaments',

    hero: {
        eyebrow: 'Live Every Day',
        headline: 'Pick your bracket.',
        accent: 'Play today.',
        lede: 'Every ongoing tournament for your esports title, all in one place.',
    },

    heading: 'Tournaments by title',
    sections: SECTIONS,

    entries: [
        {
            slug: 'call-of-duty',
            name: 'Call of Duty',
            genre: 'FPS',
            path: '/tournaments/call-of-duty-tournaments',
            image: 'https://i.imgur.com/gNvoNEo.png',
            cornerRadius: 'standard',
            sections: { tournaments: '/tournaments/call-of-duty-tournaments' },
        },
    ],
};
