import React from "react";
import { FaRegClock, FaGamepad, FaGlobeAmericas, FaMedal } from "react-icons/fa";
import styles from './TournamentCard.module.css';
import { HOSTS } from './hosts';
import { parseEstDate, getOrdinalSuffix } from 'utils/tournamentDate';
import { trackTournamentJoinClick } from "utils/analytics";

export const CodTournamentCard = ({ tournament, badge }) => {
    const host = HOSTS[tournament.site] || { label: tournament.site, logo: null };

    const estDateObj = parseEstDate(tournament.date, tournament.time);
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    let formattedTime = tournament.time || '';
    let abbreviation = '';
    let formattedDate = tournament.date || '';

    if (estDateObj) {
        // Time in the viewer's local time zone, e.g. "5:00 AM"
        formattedTime = estDateObj.toLocaleTimeString('en-US', {
            timeZone: userTimeZone,
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });

        // Local time zone abbreviation, e.g. "EST"
        const timeZoneParts = new Intl.DateTimeFormat('en-US', {
            timeZone: userTimeZone,
            timeZoneName: 'short',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        }).formatToParts(estDateObj);
        abbreviation = timeZoneParts.find(part => part.type === 'timeZoneName')?.value || '';
        // Drop any trailing offset like "GMT-4" -> "GMT"
        abbreviation = abbreviation.replace(/([A-Za-z]+)(\s?[+-]\d{1,2})?/, '$1');

        // Date in the viewer's local time zone, e.g. "Apr 21st" — the timezone
        // conversion can shift the calendar day, so it must be derived from the
        // same Date object as the time.
        const dateFieldParts = new Intl.DateTimeFormat('en-US', {
            timeZone: userTimeZone,
            month: 'short',
            day: 'numeric'
        }).formatToParts(estDateObj);
        const month = dateFieldParts.find(part => part.type === 'month')?.value || '';
        const dayNum = parseInt(dateFieldParts.find(part => part.type === 'day')?.value, 10);
        formattedDate = Number.isNaN(dayNum) ? formattedDate : `${month} ${getOrdinalSuffix(dayNum)}`;
    }

    // "BEST OF 1" -> "Best of 1"
    const series = tournament.series
        ? tournament.series.charAt(0).toUpperCase() + tournament.series.slice(1).toLowerCase()
        : '';

    // The restriction badge only shows when the scraper sends a real requirement
    const requirements = (tournament.requirements || '').trim();
    const restriction = ['', 'none', 'n/a', 'no requirements'].includes(requirements.toLowerCase())
        ? null
        : requirements;

    const isFreeEntry = tournament.is_free === true
        || (tournament.entry || '').toLowerCase().includes('free');

    const cardTitle = `${tournament.team_size} ${series} · ${(tournament.gamemode || '').toUpperCase()}`;

    return (
        <a className={styles.tournamentCard} href={tournament.url} target="_blank" rel="noopener noreferrer" onClick={() => trackTournamentJoinClick(tournament.site, cardTitle, tournament.url)}>
            <div className={styles.hostTile}>
                {host.logo
                    ? <img src={host.logo} alt={`${host.label} logo`} />
                    : <span>{host.label}</span>
                }
            </div>

            <div className={styles.cardInfo}>
                <h3 className={styles.cardTitle}>
                    {cardTitle}
                    {badge && <span className={styles.homeBadge}>{badge}</span>}
                </h3>

                <div className={styles.metaRow}>
                    <span className={styles.metaTime}>
                        <FaRegClock /> {formattedDate} · {formattedTime} {abbreviation}
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
                <button className={styles.tournamentButton}>
                    Join Now
                </button>
            </div>
        </a>
    )
}
