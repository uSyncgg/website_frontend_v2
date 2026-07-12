export const COD_LAN_MARKERS = [
    { lat: 30.0990662, lng: -81.5229898, name: "EWGL 3",                   link: "/lans/ewgl3",                        game: 'CoD' },
    { lat: 39.9940032, lng: -83.0060542, name: "Shinto Champs",            link: "/lans/shintochamps2026",             game: 'CoD' },
];

export const LOL_LAN_MARKERS = [
    { lat: 42.2469148, lng: -83.0210947, name: "The Summoning 2026", link: "/lans/the-summoning-2026", game: 'LoL' },
];

export const HALO_LAN_MARKERS = [
    { lat: 35.7735601, lng: -78.6408138,  name: "Game And Geek Expo 2026",         link: "/lans/game-and-geek-2026", game: 'Halo' },
    { lat: 33.8847879, lng: -84.4649911,  name: "Southern-Fried Gaming Expo 2026", link: "/lans/sfge-2026",          game: 'Halo' },
    { lat: 39.6829806, lng: -105.0793028, name: "Citadel I",                        link: "/lans/citadel-i",          game: 'Halo' },
];

export const WZ_LAN_MARKERS = [];

export const CONVENTION_MARKERS = [
    { lat: 39.9940217, lng: -83.0062971,  name: "GA:CS Operation Heatwave", link: "/lans/gacs-operation-heatwave", game: 'Conventions' },
    { lat: 39.9597244, lng: -75.16156,    name: "The Retake",               link: "/lans/the-retake",              game: 'Conventions' },
    // Offset slightly south from Citadel I (39.6829806) to avoid overlap on AllLans/Home maps
    { lat: 39.6479806, lng: -105.0793028, name: "Hellcase CS2 LAN 2026",    link: "/lans/hellcase-cs2-2026",       game: 'Conventions' },
];

export const ALL_LAN_MARKERS = [
    ...COD_LAN_MARKERS,
    ...LOL_LAN_MARKERS,
    ...HALO_LAN_MARKERS,
    ...WZ_LAN_MARKERS,
    ...CONVENTION_MARKERS,
];
