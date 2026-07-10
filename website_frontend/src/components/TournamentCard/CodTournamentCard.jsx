import React from "react";
import { FaRegClock, FaGamepad, FaGlobeAmericas, FaMedal } from "react-icons/fa";
import styles from './TournamentCard.module.css';
import { HOSTS } from './hosts';

export const CodTournamentCard = ({ tournament }) => {
    const host = HOSTS[tournament.company] || { label: tournament.company, logo: null };

    var estDate = tournament.date
    var estTime = tournament.time

    // Step 1: Remove the 'th', 'st', etc. from the date string
    const cleanedDate = estDate.replace(/(\d+)(st|nd|rd|th)/, '$1'); // "Apr 14"

    // Step 2: Combine the cleaned date and time with a year (e.g., current year)
    const currentYear = new Date().getFullYear();
    const combinedString = `${cleanedDate} ${currentYear} ${estTime}`; // "Apr 14 2025 10:00 AM"

    // Step 3: Create a Date object in EST
    const estDateObj = new Date(`${combinedString} GMT-0400`); // EST is UTC-5

    // Step 4: Get the user's time zone
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // Step 4: Convert time
    const timeParts = estDateObj.toLocaleTimeString('en-US', {
        timeZone: userTimeZone,
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
    // Removes leading 0 if present — already done by 'numeric' format
    const formattedTime = timeParts; // e.g., "5:00 AM" or "10:00 PM"
    const timeZoneParts = new Intl.DateTimeFormat('en-US', {
        timeZone: userTimeZone,
        timeZoneName: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }).formatToParts(estDateObj);
    let abbreviation = timeZoneParts.find(part => part.type === 'timeZoneName')?.value || '';

    // Step 7: Remove the + and the number (if any) after the abbreviation
    abbreviation = abbreviation.replace(/([A-Z]+)(\s?[+-]\d{1,2})?/, '$1');

    // The restriction badge only shows when the scraper sends a real requirement
    const requirements = (tournament.requirements || '').trim();
    const restriction = ['', 'none', 'n/a', 'no requirements'].includes(requirements.toLowerCase())
        ? null
        : requirements;

    const isFreeEntry = (tournament.entry || '').toLowerCase().includes('free');

    return (
        <div className={styles.tournamentCard}>
            <div className={styles.hostTile}>
                {host.logo
                    ? <img src={host.logo} alt={`${host.label} logo`} />
                    : <span>{host.label}</span>
                }
            </div>

            <div className={styles.cardInfo}>
                <h2 className={styles.cardTitle}>
                    {tournament.team_size} {tournament.series} · {tournament.gamemode.toUpperCase()}
                </h2>

                <div className={styles.metaRow}>
                    <span className={styles.metaTime}>
                        <FaRegClock /> {formattedTime} {abbreviation}
                    </span>
                    <span className={styles.metaItem}>
                        <FaGamepad /> {tournament.platforms}
                    </span>
                </div>

                <div className={styles.metaRow}>
                    <span className={styles.metaItem}>
                        <FaGlobeAmericas /> {tournament.region}
                    </span>
                    <span className={styles.metaItem}>
                        <FaMedal /> {tournament.skill}
                    </span>
                </div>
            </div>

            <div className={styles.cardActions}>
                {restriction && <span className={styles.restriction}>{restriction}</span>}
                <span className={`${styles.entry} ${isFreeEntry ? styles.entryFree : ''}`}>
                    {tournament.entry}
                </span>
                <button className={styles.tournamentButton} type="button" onClick={() => window.open(tournament.url, '_blank')}>
                    Join Now
                </button>
            </div>
        </div>
    )
}
