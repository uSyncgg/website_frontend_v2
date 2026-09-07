import { buildEventPath } from 'utils/eventPaths';

// Maps the game name used by the backend/API to the short key LanMap uses
// for its legend, marker color, and per-page filtering.
export const LAN_GAME_KEY = {
    "Call of Duty": "CoD",
    "League of Legends": "LoL",
    "Halo": "Halo",
    "Warzone": "Warzone",
    "Conventions": "Conventions",
};

// Every game (API name) that currently has a LANs section.
export const LAN_GAMES = Object.keys(LAN_GAME_KEY);

// Where each game's own LANs listing page lives, for a LAN detail page's
// back button (the API game name doesn't map 1:1 onto its URL segment).
export const LAN_GAME_SECTION_PATH = {
    "Call of Duty": "/games/call-of-duty/lans",
    "Warzone": "/games/warzone/lans",
    "Halo": "/games/halo/lans",
    "League of Legends": "/games/LoL/lans",
    "Conventions": "/other-lans",
};

const hasCoordinates = (event) =>
    Number.isFinite(event.lat) && Number.isFinite(event.long) && (event.lat !== 0 || event.long !== 0);

// Converts one LAN event from the API into the marker shape LanMap expects.
// Pass `game` (the API game name) when the event itself doesn't carry one
// (single-game fetches); events from useAllLanEvents already carry it.
const toLanMarker = (event) => ({
    lat: event.lat,
    lng: event.long,
    name: event.name,
    link: buildEventPath('/lans', event.path),
    game: LAN_GAME_KEY[event.game] || event.game,
});

export const toLanMarkers = (events, game) =>
    (events || [])
        .filter(hasCoordinates)
        .map(e => toLanMarker(game ? { ...e, game } : e));
