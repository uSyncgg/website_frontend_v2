/**
 * Catalog config for /games.
 *
 * This is the ONLY domain-specific file in the catalog pattern. Every component
 * under components/Catalog* is driven by a config of this shape, so standing up
 * a second catalog (real-life sports, for example) means writing a new config
 * here and pointing a page at it — no new components.
 *
 * Shape:
 *   hero      { eyebrow, headline, accent, lede } — the text hero
 *   heroAside optional panel beside the hero, discriminated by `type`:
 *             { type: 'verifiedBoard', label, rows[] } — a static, hand-
 *               maintained board (see catalog/verifiedOrganizers.js). Omit
 *               entirely rather than inventing rows — see lans/tournaments
 *               catalogs, where no verified data exists for that type yet.
 *             { type: 'verifiedBoard', label, sections[] } — a board built
 *               live, one request per entry's `apiGame`, from
 *               /events/{game}/verified (see verifiedOrganizers.js's
 *               `liveVerifiedRowsFor` and useVerifiedBoardRows).
 *             { type: 'verifiedBoard', label, eventType, section, tagSection }
 *               — a board built live from a single /events/{type}/verified/
 *               event/type fetch spanning every game (see
 *               verifiedOrganizers.js's `liveVerifiedRowsForType` and
 *               useVerifiedBoardRowsByType) — see leagues.catalog.js.
 *             { type: 'cta', eyebrow, body, buttonLabel, path } — a plain
 *               call-to-action, for when the verified-board slot has nothing
 *               real to show but the space is worth using for something else.
 *   search    { param, label, placeholder }       — omit to drop the search box
 *   facet     { param, allLabel, field }          — omit to drop the chip row.
 *             `field` names the entry property the chips filter on, and the
 *             chip set is derived from the distinct values present. Chips are
 *             multi-select — any number can be active, matches are OR'd.
 *   heading   label for the section rule above the grid
 *   sections  the taxonomy, in display order. Each entry lists the subset it
 *             actually has; anything absent is hidden rather than linked to a
 *             "coming soon" dead end.
 *   entries   the catalog items. `sections` maps a section key -> its real
 *             path, so a section is "available" iff it has a path here.
 *             `apiGame` (optional): the `game` value this entry is fetched
 *             under from /events/{game}/verified, for a `heroAside` that
 *             derives its rows live (see `liveVerifiedRowsFor`). Not always
 *             the same as `name` — the API expects "CS2", not this catalog's
 *             display name "Counter-Strike 2".
 */

import { GAME_ICONS } from 'catalog/gameIcons';

export const SECTIONS = [
    { key: 'leagues',     label: 'Leagues' },
    { key: 'lans',        label: 'LANs' },
    { key: 'tournaments', label: 'Tournaments' },
    { key: 'wagers',      label: 'Wagers' },
    { key: 'h2h',         label: 'Head to Head' },
];

export const gamesCatalog = {
    key: 'games',

    hero: {
        // Not "Supported titles" — that already heads the grid below.
        eyebrow: '7 Game Titles',
        headline: 'Pick your title.',
        accent: 'Find a real event.',
        lede: 'Every league, LAN, tournament, wager and head-to-head on uSync, sorted by game.',
    },

    // Rows are fetched live per entry's `apiGame` — see CatalogIndex and
    // catalog/verifiedOrganizers.js's `liveVerifiedRowsFor`.
    heroAside: {
        type: 'verifiedBoard',
        label: 'Verified organizers',
        sections: ['leagues', 'wagers'],
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

    heading: 'Supported titles',
    sections: SECTIONS,

    entries: [
        {
            slug: 'call-of-duty',
            name: 'Call of Duty',
            apiGame: 'Call of Duty',
            genre: 'FPS',
            path: '/games/call-of-duty',
            image: GAME_ICONS['call-of-duty'],
            sections: {
                leagues:     '/games/call-of-duty/leagues',
                lans:        '/games/call-of-duty/lans',
                // Tournaments live outside the /games tree — CoD is the only title with them.
                tournaments: '/tournaments/call-of-duty-tournaments',
                wagers:      '/games/call-of-duty/wagers',
                h2h:         '/games/call-of-duty/head-to-head',
            },
        },
        {
            slug: 'warzone',
            name: 'Warzone',
            apiGame: 'Warzone',
            genre: 'Battle Royale',
            path: '/games/warzone',
            image: GAME_ICONS['warzone'],
            sections: {
                leagues: '/games/warzone/leagues',
                lans:    '/games/warzone/lans',
                wagers:  '/games/warzone/wagers',
                h2h:     '/games/warzone/head-to-head',
            },
        },
        {
            slug: 'halo',
            name: 'Halo',
            apiGame: 'Halo',
            genre: 'FPS',
            path: '/games/halo',
            image: GAME_ICONS['halo'],
            sections: {
                leagues: '/games/halo/leagues',
                lans:    '/games/halo/lans',
                wagers:  '/games/halo/wagers',
                h2h:     '/games/halo/head-to-head',
            },
        },
        {
            slug: 'league-of-legends',
            name: 'League of Legends',
            apiGame: 'League of Legends',
            genre: 'MOBA',
            path: '/games/LoL',
            image: GAME_ICONS['league-of-legends'],
            sections: {
                leagues: '/games/LoL/leagues',
                lans:    '/games/LoL/lans',
                wagers:  '/games/LoL/wagers',
                h2h:     '/games/LoL/head-to-head',
            },
        },
        {
            slug: 'rocket-league',
            name: 'Rocket League',
            apiGame: 'Rocket League',
            genre: 'Sports',
            path: '/games/RocketLeague',
            image: GAME_ICONS['rocket-league'],
            sections: {
                leagues: '/games/RocketLeague/leagues',
                wagers:  '/games/RocketLeague/wagers',
                h2h:     '/games/RocketLeague/head-to-head',
            },
        },
        {
            slug: 'valorant',
            name: 'Valorant',
            apiGame: 'Valorant',
            genre: 'FPS',
            path: '/games/Valorant',
            image: GAME_ICONS['valorant'],
            sections: {
                leagues: '/games/Valorant/leagues',
                wagers:  '/games/Valorant/wagers',
                h2h:     '/games/Valorant/head-to-head',
            },
        },
        {
            slug: 'cs2',
            name: 'Counter-Strike 2',
            apiGame: 'CS2',
            genre: 'FPS',
            path: '/games/CS2',
            image: GAME_ICONS['cs2'],
            sections: {
                leagues: '/games/CS2/leagues',
                wagers:  '/games/CS2/wagers',
                h2h:     '/games/CS2/head-to-head',
            },
        },
    ],
};
