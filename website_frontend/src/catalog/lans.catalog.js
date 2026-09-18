/**
 * Catalog config for /lans. Same shape as games.catalog.js — see that file's
 * header comment for the full field reference.
 *
 * Only 4 of the 7 titles have LAN events (CS2, Rocket League and Valorant
 * don't — matches the existing site's Lans.js, which lists the same 4).
 *
 * Unlike leagues.catalog.js, the hero's aside slot deliberately carries a
 * "All LANs" cta rather than a `verifiedBoard` — LANs are inherently
 * cross-title events, so the most useful thing to put next to a per-title
 * grid is a way off of it: the site's existing cross-title map view
 * (EventTypeImages page="All LANs" -> /lans/all), giving visitors a shortcut
 * straight to every upcoming LAN across every game on one map.
 */

import { GAME_ICONS } from 'catalog/gameIcons';

export const SECTIONS = [
    { key: 'lans', label: 'LANs' },
];

export const lansCatalog = {
    key: 'lans',

    hero: {
        eyebrow: '100+ Yearly LANs',
        headline: 'Pick your LAN.',
        accent: 'Meet up and play.',
        lede: 'Esports LAN events for your favorite titles, from local venues to majors.',
    },

    heroAside: {
        type: 'cta',
        eyebrow: 'Every LAN, one map',
        body: 'Browse every upcoming LAN across every title on a single map.',
        buttonLabel: 'All LANs',
        path: '/lans/all',
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

    heading: 'LANs by title',
    sections: SECTIONS,

    entries: [
        {
            slug: 'call-of-duty',
            name: 'Call of Duty',
            genre: 'FPS',
            path: '/games/call-of-duty/lans',
            image: GAME_ICONS['call-of-duty'],
            sections: { lans: '/games/call-of-duty/lans' },
        },
        {
            slug: 'warzone',
            name: 'Warzone',
            genre: 'Battle Royale',
            path: '/games/warzone/lans',
            image: GAME_ICONS['warzone'],
            sections: { lans: '/games/warzone/lans' },
        },
        {
            slug: 'halo',
            name: 'Halo',
            genre: 'FPS',
            path: '/games/halo/lans',
            image: GAME_ICONS['halo'],
            sections: { lans: '/games/halo/lans' },
        },
        {
            slug: 'league-of-legends',
            name: 'League of Legends',
            genre: 'MOBA',
            path: '/games/LoL/lans',
            image: GAME_ICONS['league-of-legends'],
            sections: { lans: '/games/LoL/lans' },
        },
    ],
};
