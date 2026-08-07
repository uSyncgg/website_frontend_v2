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
 *             { type: 'verifiedBoard', label, rows[] } — real verified
 *               organizers for this catalog's own type, each row one link.
 *               Omit entirely rather than inventing rows — see lans/tournaments
 *               catalogs, where no verified data exists for that type yet.
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
 *             `cornerRadius` (optional, default 'wide'): how much the card's
 *             rounded-corner clip covers. Most of this catalog's source
 *             images have a corner radius baked into the pixels as
 *             transparency, and on hover the browser can drop the container's
 *             own rounded clip mask for a frame, momentarily exposing that
 *             baked-in transparent corner as a real gap. A wider clip radius
 *             gives more margin over the baked corner so there's nothing left
 *             to expose. Set 'standard' only for art confirmed to render
 *             cleanly at the tighter radius (checked on hover, repeatedly).
 */

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
        eyebrow: '5+ Game Titles',
        headline: 'Pick your title.',
        accent: 'Find a real event.',
        lede: 'Every league, LAN, tournament, wager and head-to-head on uSync, sorted by game.',
    },

    /**
     * Every row here is verified={true} on its own page — checked against the
     * live event pages, not copied from the prototype (which listed two
     * organizers as verified that are not).
     */
    heroAside: {
        type: 'verifiedBoard',
        label: 'Verified organizers',
        rows: [
            { name: 'LockdownCL',       tag: 'Call of Duty league',      path: '/games/call-of-duty/leagues/lockdowncl-leagues' },
            { name: 'Titan Esports',    tag: 'League of Legends league', path: '/games/LoL/leagues/titan-leagues' },
            { name: 'Nemesis Leagues',  tag: 'Rocket League league',     path: '/games/RocketLeague/leagues/nemesis-leagues' },
            // Checkmate Gaming is verified for both wagers and head-to-head, but a
            // row is one link — wagers is the destination.
            { name: 'Checkmate Gaming', tag: 'Call of Duty wagers',      path: '/games/call-of-duty/wagers/cmg' },
        ],
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
            genre: 'FPS',
            path: '/games/call-of-duty',
            image: 'https://i.imgur.com/gNvoNEo.png',
            cornerRadius: 'standard',
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
            genre: 'Battle Royale',
            path: '/games/warzone',
            image: 'https://i.imgur.com/IBGIbY2.png',
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
            genre: 'FPS',
            path: '/games/halo',
            image: 'https://i.imgur.com/wqKJfEu.png',
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
            genre: 'MOBA',
            path: '/games/LoL',
            image: 'https://i.imgur.com/5riYNow.png',
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
            genre: 'Sports',
            path: '/games/RocketLeague',
            image: 'https://i.imgur.com/GJO8JIZ.png',
            sections: {
                leagues: '/games/RocketLeague/leagues',
                wagers:  '/games/RocketLeague/wagers',
                h2h:     '/games/RocketLeague/head-to-head',
            },
        },
        {
            slug: 'valorant',
            name: 'Valorant',
            genre: 'FPS',
            path: '/games/Valorant',
            image: 'https://i.imgur.com/Gsl3oIp.png',
            cornerRadius: 'standard',
            sections: {
                leagues: '/games/Valorant/leagues',
                wagers:  '/games/Valorant/wagers',
                h2h:     '/games/Valorant/head-to-head',
            },
        },
        {
            slug: 'cs2',
            name: 'Counter-Strike 2',
            genre: 'FPS',
            path: '/games/CS2',
            image: 'https://i.imgur.com/60FwDKN.png',
            sections: {
                leagues: '/games/CS2/leagues',
                wagers:  '/games/CS2/wagers',
                h2h:     '/games/CS2/head-to-head',
            },
        },
    ],
};
