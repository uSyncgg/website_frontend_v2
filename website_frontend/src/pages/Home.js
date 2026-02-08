import React from "react";
import styles from './Home.module.css';
import '../index.css';
import { Link } from "react-router";
import { MapCoverHome } from "components";

export const Home = () => {
    return (
        <div className="standardContainer">
            <div className={styles.sectionOne}>
                <div className={styles.sectionOneContainer}>
                    <Link to="#" className={styles.compete}>$ Compete in Esports Events</Link>
                    <h1 className={styles.white}>THE WORLD'S LARGEST</h1>
                    <h1 className={styles.purple}>ESPORTS HUB</h1>
                    <h2>
                        Find Verified LANs, Tournaments, and More.
                        <br />
                        The All-In-One Platform built for Players and Hosts.
                    </h2>
                    <Link to="/games" className={styles.start}>Get Started {'>'}</Link>
                </div>
            </div>

            <div className={styles.sectionTwo}>
                <h2 className={styles.white}>Explore Events</h2>
                <img className={styles.underline} src="https://i.imgur.com/eNhKhTI.png" alt="underline" />

                <div className={styles.imageContainer}>
                    <Link to="/games/call-of-duty">
                        <img src="https://i.imgur.com/gNvoNEo.png" alt="Call of Duty" />
                    </Link>

                    <Link to="/games/warzone">
                        <img src="https://i.imgur.com/IBGIbY2.png" alt="Warzone" />
                    </Link>

                    <Link to="/games/halo">
                        <img src="https://i.imgur.com/wqKJfEu.png" alt="Halo" />
                    </Link>

                    <Link to="/games/LoL">
                        <img src="https://i.imgur.com/5riYNow.png" alt="League of Legends" />
                    </Link>

                    <Link to="/games/RocketLeague">
                        <img src="https://i.imgur.com/GJO8JIZ.png" alt="Rocket League" />
                    </Link>

                    <Link to="/games/Valorant">
                        <img src="https://i.imgur.com/Gsl3oIp.png" alt="Valorant" />
                    </Link>

                    <Link to="/games/CS2">
                        <img src="https://i.imgur.com/60FwDKN.png" alt="Counter-Strike 2" />
                    </Link>
                </div>

                <div className="hr" />

                <h2 className={styles.white}>LAN Events</h2>
                <img className={styles.underline} src="https://i.imgur.com/eNhKhTI.png" alt="underline" />

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

                <h2 className={styles.white}>Coming Soon!</h2>
                <img className={styles.underline} src="https://i.imgur.com/eNhKhTI.png" alt="underline" />

                <div className={styles.imageContainer}>
                    <Link to="/Comingsoon">
                        <img src="https://i.imgur.com/ybSqQK4.png" alt="Fortnite Coming Soon" />
                    </Link>

                    <Link to="/Comingsoon">
                        <img src="https://i.imgur.com/MUcaqmt.png" alt="Apex Legends Coming Soon" />
                    </Link>

                    <Link to="/Comingsoon">
                        <img src="https://i.imgur.com/qpQDtRJ.png" alt="Super Smash Bros. Ultimate Coming Soon" />
                    </Link>

                    <Link to="/Comingsoon">
                        <img src="https://i.imgur.com/XxOYZiE.png" alt="Overwatch 2 Coming Soon" />
                    </Link>
                </div>

                <div className={`hr ${styles.bottomSpace}`} />
            </div>

        </div>
    );
}
