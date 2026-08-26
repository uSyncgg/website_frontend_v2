/**
 * Catalog config for /leagues. Same shape as games.catalog.js — see that
 * file's header comment for the full field reference.
 *
 * Unlike the /games catalog, each entry here is scoped to ONE section
 * (leagues), so `entry.path` and `entry.sections.leagues` point at the same
 * place: the game's leagues page directly, matching the real site's existing
 * per-type listing pages (Leagues.js linked straight to /games/{game}/leagues,
 * not to the game hub).
 */

import { verifiedRowsFor } from './verifiedOrganizers';

export const SECTIONS = [
    { key: 'leagues', label: 'Leagues' },
];

export const leaguesCatalog = {
    key: 'leagues',

    hero: {
        eyebrow: '200+ Leagues',
        headline: 'Pick your league.',
        accent: 'Find your division.',
        lede: 'Every competitive league on uSync, sorted by game — open brackets, invite-only divisions, and everything between.',
    },

    // Rows come from catalog/verifiedOrganizers.js, scoped to leagues only —
    // that keeps a wagers-only host (Checkmate Gaming) off this board without
    // hand-maintaining a second copy of the games catalog's list.
    heroAside: {
        type: 'verifiedBoard',
        label: 'Verified league organizers',
        rows: verifiedRowsFor('leagues', { tagSection: false }),
    },

    search: {
        param: 'q',
        label: 'Search titles',
        placeholder: 'Search titles',
    },

    facet: {
        param: 'genre',
        allLabel: 'All genres',
        field: 'genre',
    },

    heading: 'Leagues by title',
    sections: SECTIONS,

    // Every title has a leagues section, so this mirrors games.catalog.js's
    // full entry list — just re-pointed straight at each game's leagues page.
    entries: [
        {
            slug: 'call-of-duty',
            name: 'Call of Duty',
            genre: 'FPS',
            path: '/games/call-of-duty/leagues',
            image: 'https://i.imgur.com/gNvoNEo.png',
            cornerRadius: 'standard',
            sections: { leagues: '/games/call-of-duty/leagues' },
        },
        {
            slug: 'warzone',
            name: 'Warzone',
            genre: 'Battle Royale',
            path: '/games/warzone/leagues',
            image: 'https://i.imgur.com/IBGIbY2.png',
            sections: { leagues: '/games/warzone/leagues' },
        },
        {
            slug: 'halo',
            name: 'Halo',
            genre: 'FPS',
            path: '/games/halo/leagues',
            image: 'https://i.imgur.com/wqKJfEu.png',
            sections: { leagues: '/games/halo/leagues' },
        },
        {
            slug: 'league-of-legends',
            name: 'League of Legends',
            genre: 'MOBA',
            path: '/games/LoL/leagues',
            image: 'https://i.imgur.com/5riYNow.png',
            sections: { leagues: '/games/LoL/leagues' },
        },
        {
            slug: 'rocket-league',
            name: 'Rocket League',
            genre: 'Sports',
            path: '/games/RocketLeague/leagues',
            image: 'https://i.imgur.com/GJO8JIZ.png',
            sections: { leagues: '/games/RocketLeague/leagues' },
        },
        {
            slug: 'valorant',
            name: 'Valorant',
            genre: 'FPS',
            path: '/games/Valorant/leagues',
            image: 'https://i.imgur.com/Gsl3oIp.png',
            cornerRadius: 'standard',
            sections: { leagues: '/games/Valorant/leagues' },
        },
        {
            slug: 'cs2',
            name: 'Counter-Strike 2',
            genre: 'FPS',
            path: '/games/CS2/leagues',
            image: 'https://i.imgur.com/60FwDKN.png',
            sections: { leagues: '/games/CS2/leagues' },
        },
    ],
};
