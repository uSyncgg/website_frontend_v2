import React from "react";
import styles from './Home.module.css';
import '../index.css';
import { Link } from "react-router";
import { MapCoverHome, GameImage, SeoData } from "components";

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
                    <iframe 
                        title="LAN Map" 
                        id="map" 
                        className={styles.map}
                        src="https://www.google.com/maps/d/u/2/embed?mid=1QrCfeXFSyZJMXLzUeAiIWy0hcWgaJVg&ehbc=2E312F"
                    />

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
