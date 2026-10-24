import React from "react";
import data from "data/upcomingEvents.json";
import styles from './UpcomingEvents.module.css';
import underline from 'assets/images/misc/underline-decorative-graphic_9.6.26.webp';

const formatRange = (start, end) => {
    const opts = { month: 'short', day: 'numeric', timeZone: 'UTC' };
    const s = new Date(`${start}T00:00:00Z`).toLocaleDateString('en-US', opts);
    if (!end || end === start) return s;
    return `${s} - ${new Date(`${end}T00:00:00Z`).toLocaleDateString('en-US', opts)}`;
};

export const UpcomingEvents = () => {
    const today = new Date().toISOString().slice(0, 10);
    // The JSON is a build-time snapshot, so drop anything that has ended since.
    const events = data.events.filter(e => (e.end ?? e.start) >= today).slice(0, 6);

    if (events.length === 0) return null;

    return (
        <div className={styles.container}>
            <p className={styles.eyebrow}>On the Calendar</p>
            <h2 className={styles.white}>Upcoming Esports Events</h2>
            <img className="underlineImg" src={underline} alt="underline" />
            <div className={styles.grid}>
                {events.map(event => (
                    <a key={event.url} className={styles.card} href={event.url} target="_blank" rel="noopener noreferrer">
                        <span className={styles.game}>{event.game}</span>
                        <h3>{event.name}</h3>
                        <p className={styles.meta}>{formatRange(event.start, event.end)}</p>
                        <p className={styles.meta}>{event.location ?? (event.online ? 'Online' : 'TBA')}</p>
                        {event.prizePool && <p className={styles.prize}>${String(event.prizePool).replace(/^\$/, '')}</p>}
                    </a>
                ))}
            </div>
            <p className={styles.source}>Event data from Liquipedia and la-scene.gg</p>
        </div>
    );
};
