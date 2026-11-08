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

// Series where the host also picks which game in the series, newest first. Release years are
// shown in the picker. (Sources: callofduty.com, halowaypoint.com, Wikipedia.)
export const GAME_TITLES = {
    'Call of Duty': [
        ['Modern Warfare 4', 2026],
        ['Black Ops 7', 2025],
        ['Black Ops 6', 2024],
        ['Modern Warfare III', 2023],
        ['Modern Warfare II', 2022],
        ['Vanguard', 2021],
        ['Black Ops Cold War', 2020],
        ['Modern Warfare (2019)', 2019],
        ['Call of Duty: Mobile', 2019],
        ['Black Ops 4', 2018],
        ['WWII', 2017],
        ['Infinite Warfare', 2016],
        ['Modern Warfare Remastered', 2016],
        ['Black Ops III', 2015],
        ['Advanced Warfare', 2014],
        ['Ghosts', 2013],
        ['Black Ops II', 2012],
        ['Modern Warfare 3', 2011],
        ['Black Ops', 2010],
        ['Modern Warfare 2', 2009],
        ['World at War', 2008],
        ['Call of Duty 4: Modern Warfare', 2007],
        ['Call of Duty 3', 2006],
        ['Call of Duty 2', 2005],
        ['Call of Duty: Finest Hour', 2004],
        ['Call of Duty: United Offensive', 2004],
        ['Call of Duty', 2003],
    ],
    Halo: [
        ['Halo: Campaign Evolved', 2026],
        ['Halo Infinite', 2021],
        ['Halo Wars 2', 2017],
        ['Halo 5: Guardians', 2015],
        ['Halo: The Master Chief Collection', 2014],
        ['Halo 4', 2012],
        ['Halo: Combat Evolved Anniversary', 2011],
        ['Halo: Reach', 2010],
        ['Halo 3: ODST', 2009],
        ['Halo Wars', 2009],
        ['Halo 3', 2007],
        ['Halo 2', 2004],
        ['Halo: Combat Evolved', 2001],
    ],
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
