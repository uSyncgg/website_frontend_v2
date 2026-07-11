<<<<<<< HEAD
import { SeoData, MapCoverGame, LanMap } from "components";

const ALL_LAN_MARKERS = [
    { lat: 37.545672,  lng: -77.4363207,  name: "RVA Esports Championship",        link: "/lans/rva-esports-championship-2026", game: 'CoD'         },
    { lat: 30.0990662, lng: -81.5229898,  name: "EWGL 3",                           link: "/lans/ewgl3",                         game: 'CoD'         },
    { lat: 39.9940032, lng: -83.0060542,  name: "Shinto Champs",                    link: "/lans/shintochamps2026",              game: 'CoD'         },
    { lat: 42.2469148, lng: -83.0210947,  name: "The Summoning 2026",               link: "/lans/the-summoning-2026",            game: 'LoL'         },
    { lat: 35.7735601, lng: -78.6408138,  name: "Game And Geek Expo 2026",          link: "/lans/game-and-geek-2026",            game: 'Halo'        },
    { lat: 33.8847879, lng: -84.4649911,  name: "Southern-Fried Gaming Expo 2026",  link: "/lans/sfge-2026",                     game: 'Halo'        },
    { lat: 39.6829806, lng: -105.0793028, name: "Citadel I",                        link: "/lans/citadel-i",                     game: 'Halo'        },
    { lat: 37.5450707, lng: -77.4368334,  name: "ImmerseCon 2026",                  link: "/lans/immersecon-2026",               game: 'Conventions' },
    { lat: 29.7519972, lng: -95.3573069,  name: "Dream Con 2026",                   link: "/lans/dreamcon2026",                  game: 'Conventions' },
    { lat: 39.9940217, lng: -83.0062971,  name: "GA:CS Operation Heatwave",         link: "/lans/gacs-operation-heatwave",       game: 'Conventions' },
    { lat: 39.9597244, lng: -75.16156,    name: "The Retake",                       link: "/lans/the-retake",                    game: 'Conventions' },
    { lat: 39.6829806, lng: -105.0793028, name: "Hellcase CS2 LAN 2026",            link: "/lans/hellcase-cs2-2026",             game: 'Conventions' },
];
=======
import { SeoData, LanMap } from "components";
import { ALL_LAN_MARKERS } from 'data/lanMarkers';
>>>>>>> origin/main

export const AllLans = () => {
    return (
        <div className="standardContainer">
            <SeoData
                description="Find all esports LAN events across every game title on an interactive map. Browse upcoming in-person gaming tournaments and LAN parties near you."
                canonicalPath={"/lans/all"}
            />
            <div className="lanMapContainer">
<<<<<<< HEAD
                <LanMap markers={ALL_LAN_MARKERS} />

                <MapCoverGame />
=======
                <LanMap markers={ALL_LAN_MARKERS} showAllGames={true} />
>>>>>>> origin/main
            </div>
        </div>
    )
}
