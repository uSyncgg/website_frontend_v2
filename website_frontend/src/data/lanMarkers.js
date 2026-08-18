export const COD_LAN_MARKERS = [
    { lat: 30.0990662, lng: -81.5229898,  name: "EWGL 3",              link: "/lans/ewgl3",              game: 'CoD' },
    { lat: 39.9940032, lng: -83.0060542,  name: "Shinto Champs",       link: "/lans/shintochamps2026",   game: 'CoD' },
    { lat: 39.9939480, lng: -83.0060490,  name: "GA:CoD Modern Warfare 4 Launch Tournament", link: "/lans/ga-cod-modern-warfare-4-launch-tournament", game: 'CoD' },
];

export const LOL_LAN_MARKERS = [
];

export const HALO_LAN_MARKERS = [
    { lat: 35.7735601, lng: -78.6408138,  name: "Game And Geek Expo 2026",         link: "/lans/game-and-geek-2026", game: 'Halo' },
];

export const WZ_LAN_MARKERS = [];

export const CONVENTION_MARKERS = [
    // Offset slightly south from Citadel I (39.6829806) to avoid overlap on AllLans/Home maps
    { lat: 39.6479806, lng: -105.0793028, name: "Hellcase CS2 LAN 2026",          link: "/lans/hellcase-cs2-2026",               game: 'Conventions' },
    { lat: 32.6613598, lng: -116.9995153, name: "LAN-A-THON Under The Sun 2026",  link: "/lans/lan-a-thon-under-the-sun-2026",   game: 'Conventions' },
    { lat: 41.0764636, lng: -85.1404836,  name: "FortLAN 2026",                   link: "/lans/fortlan-2026",                    game: 'Conventions' },
    { lat: 32.9414733, lng: -97.0592118,  name: "LAN All Night 2026",             link: "/lans/lan-all-night-2026",              game: 'Conventions' },
    // Offset slightly south from Game Arena X (39.9940139) to avoid overlap with Shinto Champs / GA:CoD MW4 markers
    { lat: 39.9640139, lng: -83.0060336,  name: "Gears of War E-Day Launch Tournament", link: "/lans/gears-of-war-e-day-launch-tournament", game: 'Conventions' },
];

export const ALL_LAN_MARKERS = [
    ...COD_LAN_MARKERS,
    ...LOL_LAN_MARKERS,
    ...HALO_LAN_MARKERS,
    ...WZ_LAN_MARKERS,
    ...CONVENTION_MARKERS,
];
