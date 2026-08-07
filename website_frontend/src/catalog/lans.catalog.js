/**
 * Catalog config for /lans. Same shape as games.catalog.js — see that file's
 * header comment for the full field reference.
 *
 * Only 4 of the 7 titles have LAN events (CS2, Rocket League and Valorant
 * don't — matches the existing site's Lans.js, which lists the same 4).
 *
 * No verified LAN organizer exists anywhere in the codebase (checked directly
 * against every LAN listing page — zero verified={true} on any of them), so
 * unlike leagues.catalog.js this has no `verifiedBoard` to show. The hero's
 * aside slot carries the "All LANs" link instead — the site's existing
 * cross-title map view (EventTypeImages page="All LANs" -> /lans/all) that
 * this redesign would otherwise have no place for.
 */

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
            image: 'https://i.imgur.com/gNvoNEo.png',
            cornerRadius: 'standard',
            sections: { lans: '/games/call-of-duty/lans' },
        },
        {
            slug: 'warzone',
            name: 'Warzone',
            genre: 'Battle Royale',
            path: '/games/warzone/lans',
            image: 'https://i.imgur.com/IBGIbY2.png',
            sections: { lans: '/games/warzone/lans' },
        },
        {
            slug: 'halo',
            name: 'Halo',
            genre: 'FPS',
            path: '/games/halo/lans',
            image: 'https://i.imgur.com/wqKJfEu.png',
            sections: { lans: '/games/halo/lans' },
        },
        {
            slug: 'league-of-legends',
            name: 'League of Legends',
            genre: 'MOBA',
            path: '/games/LoL/lans',
            image: 'https://i.imgur.com/5riYNow.png',
            sections: { lans: '/games/LoL/lans' },
        },
    ],
};
