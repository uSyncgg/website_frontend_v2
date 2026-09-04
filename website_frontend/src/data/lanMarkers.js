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

const hasCoordinates = (event) =>
    Number.isFinite(event.lat) && Number.isFinite(event.long) && (event.lat !== 0 || event.long !== 0);

// Converts one LAN event from the API into the marker shape LanMap expects.
// Pass `game` (the API game name) when the event itself doesn't carry one
// (single-game fetches); events from useAllLanEvents already carry it.
const toLanMarker = (event) => ({
    lat: event.lat,
    lng: event.long,
    name: event.name,
    link: `/lans${event.path}`,
    game: LAN_GAME_KEY[event.game] || event.game,
});

export const toLanMarkers = (events, game) =>
    (events || [])
        .filter(hasCoordinates)
        .map(e => toLanMarker(game ? { ...e, game } : e));
