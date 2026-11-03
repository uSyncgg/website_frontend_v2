import { gamesCatalog } from "catalog/games.catalog";

// Games a host can run an event for: the site's supported titles, named as the API names them.
export const HOST_GAMES = gamesCatalog.entries.map(entry => entry.apiGame);

// The kind of event, the same as the site's sections. LANs are always in person.
export const EVENT_TYPES = {
    league: 'League',
    lan: 'LAN',
    wager: 'Wagers',
    h2h: 'Head-to-head',
};

// Catalog section key -> event type.
const SECTION_TYPES = { leagues: 'league', lans: 'lan', wagers: 'wager', h2h: 'h2h' };

/**
 * The event type and game a page is about, from its URL: /games/call-of-duty/leagues (and any
 * league under it) is { type: 'league', game: 'Call of Duty' }. Pages outside a game's section
 * give what they can ({} when nothing matches).
 */
export const eventContextFromPath = (pathname) => {
    const path = pathname.toLowerCase();
    for (const entry of gamesCatalog.entries) {
        for (const [section, sectionPath] of Object.entries(entry.sections ?? {})) {
            const base = sectionPath.toLowerCase();
            if (SECTION_TYPES[section] && (path === base || path.startsWith(`${base}/`))) {
                return { type: SECTION_TYPES[section], game: entry.apiGame };
            }
        }
    }
    return {};
};
