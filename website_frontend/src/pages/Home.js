import React from "react";
import styles from './Home.module.css';
import '../index.css';
import { Link } from "react-router";
import { MapCoverHome, GameImage, SeoData, LanMap } from "components";

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

export const Home = () => {
    return (
        <div className="standardContainer">
            <SeoData 
                description="uSync is the world's largest selection of esports LANs, Leagues, and Tournaments. Find your next event today."
                canonicalPath={"/"}
            />
            
            <div className={styles.sectionOne}>
                <div className={styles.sectionOneContainer}>
                    <Link to="#" className={styles.compete}>$ Compete in Esports Events</Link>
                    <h1 className={styles.white}>THE WORLD'S LARGEST</h1>
                    <h1 className={styles.purple}>ESPORTS HUB</h1>
                    <h2>
                        Find Verified LANs, Tournaments, and More.
                        <br />
                        The All-In-One Platform Built for Players and Hosts.
                    </h2>
                    <Link to="/games" className={styles.start}>Get Started {'>'}</Link>
                </div>
            </div>

            <div className={styles.sectionTwo}>

                <GameImage 
                    games={
                        {
                            "Call of Duty": "/games/call-of-duty",
                            "Warzone": "/games/warzone",
                            "Halo": "/games/halo",
                            "League of Legends": "/games/LoL",
                            "Rocket League": "/games/RocketLeague",
                            "Valorant": "/games/Valorant",
                            "CS2": "/games/CS2"
                        }
                    }

                    title={"Explore Events"} 
                />

                <div className="hr" />

                <h2 className={styles.white}>LAN Events</h2>
                <img className={"underlineImg"} src="https://i.imgur.com/eNhKhTI.png" alt="underline" />

                <div className={styles.mapContainer}>
                    <LanMap markers={ALL_LAN_MARKERS} className={styles.map} />

                    <MapCoverHome />
                </div>

                <h3 className={styles.learn}>
                    Learn how to post your LAN to the map {" "}
                    <Link to="/more/eventhost">here</Link>
                </h3>

                <div className="hr" />

                <GameImage 
                    games={
                        {
                            "Fortnite": "/Comingsoon", 
                            "Apex Legends": "/Comingsoon", 
                            "Super Smash Bros": "/Comingsoon", 
                            "Overwatch 2": "/Comingsoon"
                        }
                    }

                    title={"Coming Soon!"} 
                />

                <div className={`hr ${styles.bottomSpace}`} />
            </div>

        </div>
    );
}
