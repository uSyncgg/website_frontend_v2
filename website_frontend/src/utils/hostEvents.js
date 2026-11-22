import { gamesCatalog } from "catalog/games.catalog";

// Games a host can run an event for: the site's supported titles, named as the API names them.
export const HOST_GAMES = gamesCatalog.entries.map(entry => entry.apiGame);

// The kinds of event a host can post. LANs are always in person. Wagers and head-to-head
// aren't offered (for now), so those pages don't get the "Add your event" button.
export const EVENT_TYPES = {
    league: 'League',
    lan: 'LAN',
    tournament: 'Tournament',
};

// The Event Dashboard (everyone signed in): Entered and Hosting tabs.
export const EVENT_DASHBOARD_PATH = '/dashboard';
export const HOSTING_DASHBOARD_PATH = `${EVENT_DASHBOARD_PATH}?tab=hosting`;

// Tournaments can only be posted for Call of Duty for now (the only title with a tournaments page).
export const TOURNAMENT_GAME = 'Call of Duty';

// The API's game keys (the games lookup table), by the name the site uses for the game.
export const GAME_KEYS = {
    'Call of Duty': 'call_of_duty',
    'Warzone': 'warzone',
    'Halo': 'halo',
    'CS2': 'cs2',
    'League of Legends': 'league_of_legends',
    'Rocket League': 'rocket_league',
    'Valorant': 'valorant',
};

// Catalog section key -> event type.
const SECTION_TYPES = { leagues: 'league', lans: 'lan', tournaments: 'tournament' };

/**
 * The event type and game a page is about, from its URL: /games/call-of-duty/leagues (and any
 * league under it) is { type: 'league', game: 'Call of Duty' }, and
 * /tournaments/call-of-duty-tournaments is a Call of Duty tournament. Pages outside those
 * sections give {}.
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

// "Call of Duty: Black Ops 7", or just the game when no title was picked.
export const gameDisplayName = (event) => {
    if (!event.gameTitle) return event.game;
    return event.gameTitle.toLowerCase().startsWith(event.game.toLowerCase().split(' ')[0])
        ? event.gameTitle
        : `${event.game}: ${event.gameTitle}`;
};

export const PLATFORMS = { pc_allowed: 'PC allowed', console_only: 'Console only' };

// A match's own page (who you play, rules, maps, reporting).
export const matchUrl = (eventId, matchId) => `/brackets/${encodeURIComponent(eventId)}/matches/${encodeURIComponent(matchId)}`;
