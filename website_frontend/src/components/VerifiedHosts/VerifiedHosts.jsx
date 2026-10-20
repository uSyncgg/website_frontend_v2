import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import styles from './VerifiedHosts.module.css';

// Curated, hand-checked against each host's own page (verified={true} on its
// BannerImage) rather than assumed — see games.catalog.js's board for the
// same standard applied to the /games hero panel.
const VERIFIED_HOSTS = [
    {
        name: 'LockdownCL',
        tag: 'Call of Duty League',
        hosting: "Running Legends, Uppers, Lowers & Women's divisions",
        path: '/games/call-of-duty/leagues/lockdowncl-leagues',
    },
    {
        name: 'Titan Esports',
        tag: 'League of Legends League',
        hosting: 'Running 10 divisions, from Sentinel up to Immortal',
        path: '/games/LoL/leagues/titan-leagues',
    },
    {
        name: 'Nemesis Leagues',
        tag: 'Rocket League League',
        hosting: 'Running 6 divisions, from Provisional up to Titan',
        path: '/games/RocketLeague/leagues/nemesis-leagues',
    },
    {
        name: 'Checkmate Gaming',
        tag: 'Call of Duty Wagers',
        hosting: 'Running live wager challenges and ladders',
        path: '/games/call-of-duty/wagers/cmg',
    },
];

const ROTATE_MS = 5000;

export const VerifiedHosts = () => {
    const [active, setActive] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused) return;
        const id = setInterval(() => {
            setActive(i => (i + 1) % VERIFIED_HOSTS.length);
        }, ROTATE_MS);
        return () => clearInterval(id);
    }, [paused]);

    const host = VERIFIED_HOSTS[active];

    return (
        <div
            className={styles.container}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <p className={styles.eyebrow}>Verified Hosts</p>
            <h2 className={styles.white}>Host Spotlight</h2>
            <img className="underlineImg" src="https://i.imgur.com/eNhKhTI.png" alt="underline" />
            <p className={styles.subtext}>
                Organizers uSync has verified, and what they're currently running.
            </p>

            <div className={styles.card} key={host.path}>
                <div className={styles.head}>
                    <img
                        className={styles.mark}
                        src="https://i.imgur.com/PCHIHQB.png"
                        alt=""
                        loading="lazy"
                        decoding="async"
                    />
                    <div>
                        <h3 className={styles.name}>{host.name}</h3>
                        <span className={styles.tag}>{host.tag}</span>
                    </div>
                </div>
                <p className={styles.hosting}>{host.hosting}</p>
                <Link to={host.path} className={styles.viewPill}>View {host.name}</Link>
            </div>

            <div className={styles.dots}>
                {VERIFIED_HOSTS.map((h, i) => (
                    <button
                        key={h.path}
                        type="button"
                        className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
                        aria-label={`Show ${h.name}`}
                        onClick={() => setActive(i)}
                    />
                ))}
            </div>
        </div>
    );
};
