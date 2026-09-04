import React, { useMemo } from "react";
import styles from './Home.module.css';
import '../index.css';
import { Link } from "react-router";
import { ChooseYourGame, SeoData, HomeTournaments, LanMap } from "components";
import { FaMapMarkerAlt, FaLayerGroup, FaSitemap, FaTrophy } from "react-icons/fa";
import { useAllLanEvents } from "hooks";
import { toLanMarkers } from 'data/lanMarkers';

export const Home = () => {
    const { data: lanEvents } = useAllLanEvents();
    const lanMarkers = useMemo(() => toLanMarkers(lanEvents), [lanEvents]);

    return (
        <div className={`standardContainer ${styles.homeDark}`}>
            <SeoData
                description="uSync is the world's largest selection of esports LANs, Leagues, and Tournaments. Find your next event today."
                canonicalPath={"/"}
            />

            <div className={styles.sectionOne}>
                <div className={styles.heroOverlay} />
                <div className={styles.sectionOneContainer}>
                    <Link to="#" className={styles.compete}>
                        <span className={styles.pulseDot} />
                        Compete in Esports Events
                    </Link>
                    <h1 className={styles.white}>THE WORLD'S LARGEST</h1>
                    <h1 className={styles.gradientText}>ESPORTS HUB</h1>
                    <h2>
                        Find Verified LANs, Tournaments, and More.
                        <br />
                        The All-In-One Platform Built for Players and Hosts.
                    </h2>
                    <div className={styles.heroButtons}>
                        <Link to="/games" className={styles.start}>Browse Events</Link>
                    </div>
                </div>
            </div>

            <div className={styles.sectionTwo}>

                <div className={styles.statsRow}>
                    <div className={styles.statCard}>
                        <p className={styles.statValue}>100+</p>
                        <p className={styles.statLabel}>LANs</p>
                    </div>
                    <div className={styles.statCard}>
                        <p className={styles.statValue}>200+</p>
                        <p className={styles.statLabel}>Daily Tournaments</p>
                    </div>
                    <div className={styles.statCard}>
                        <p className={styles.statValue}>70+</p>
                        <p className={styles.statLabel}>Leagues</p>
                    </div>
                </div>

                <p className={styles.eyebrow}>Built for the Community</p>
                <h2 className={styles.white}>Everything in One Hub</h2>
                <img className={"underlineImg"} src="https://i.imgur.com/eNhKhTI.png" alt="underline" />
                <p className={styles.subtext}>
                    Whether you play, host, or just watch, uSync has a role for you.
                </p>

                <div className={styles.featureCards}>
                    <Link to="/lans" className={styles.featureCard}>
                        <div className={styles.featureIcon}><FaMapMarkerAlt /></div>
                        <h3>LANs</h3>
                        <p>Discover LAN events happening worldwide, from local meetups to major conventions.</p>
                        <span className={styles.explorePill}>Explore</span>
                    </Link>
                    <Link to="/leagues" className={styles.featureCard}>
                        <div className={styles.featureIcon}><FaSitemap /></div>
                        <h3>Leagues</h3>
                        <p>Join a league in your favorite game and compete across structured seasons and playoffs.</p>
                        <span className={styles.explorePill}>Explore</span>
                    </Link>
                    <Link to="/tournaments" className={styles.featureCard}>
                        <div className={styles.featureIcon}><FaTrophy /></div>
                        <h3>Tournaments</h3>
                        <p>Enter tournaments across every title we support, sorted by game, prize pool, and format.</p>
                        <span className={styles.explorePill}>Explore</span>
                    </Link>
                </div>

                <div className="hr" />

                <HomeTournaments />

                <div className="hr" />

                <p className={styles.eyebrow}>LAN Map</p>
                <h2 className={styles.white}>Find Events Near You</h2>
                <img className={"underlineImg"} src="https://i.imgur.com/eNhKhTI.png" alt="underline" />
                <p className={styles.subtext}>Browse LAN events happening worldwide.</p>
                
                <div className={styles.mapContainer}>
                    <LanMap markers={lanMarkers} className={styles.map} showAllGames={true} />
                </div>

                <h3 className={styles.learn}>
                    Learn how to post your LAN to the map {" "}
                    <Link to="/more/eventhost">here</Link>
                </h3>

                <div className="hr" />

                <ChooseYourGame />

                <div className={styles.cta}>
                    <div className={styles.ctaGlow} />
                    <h2 className={styles.white}>We Sync, So uSync.</h2>
                    <p className={styles.ctaSubtext}>Find Your Next Event Today.</p>
                    <Link to="/games" className={styles.ctaButton}>Browse Events</Link>
                </div>

            </div>

        </div>
    );
}
