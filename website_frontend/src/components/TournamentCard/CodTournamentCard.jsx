import React from "react";
import { FaRegClock, FaGamepad, FaGlobeAmericas, FaMedal } from "react-icons/fa";
import styles from './TournamentCard.module.css';
import { HOSTS } from './hosts';
import { Link } from "react-router";

export const CodTournamentCard = ({ tournament }) => {
    const host = HOSTS[tournament.site] || { label: tournament.site, logo: null };

    // Add ordinal suffix to the day (e.g. 21 -> "21st")
    function getOrdinalSuffix(n) {
        if (n >= 11 && n <= 13) return `${n}th`;
        switch (n % 10) {
        case 1: return `${n}st`;
        case 2: return `${n}nd`;
        case 3: return `${n}rd`;
        default: return `${n}th`;
        }
    }

    // Build the tournament's start time as a real Date object WITHOUT relying on
    // `new Date("Apr 14 2025 10:00 AM GMT-0400")`. That string format parses on
    // Chrome but returns an Invalid Date on Safari/iOS, which then throws when
    // formatted and blanks the whole page. We parse the pieces into numbers and
    // build the date explicitly, which every browser handles the same way.
    function parseEstDate(dateStr, timeStr) {
        if (!dateStr || !timeStr) return null;

        const MONTHS = {
            jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
            jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
        };

        // "Apr 14th" / "April 14" -> month name + day number
        const dateMatch = String(dateStr).match(/([A-Za-z]+)\s+(\d{1,2})/);
        // "10:00 AM" / "10:00 AM EDT" -> hour, minute, meridiem
        const timeMatch = String(timeStr).match(/(\d{1,2}):(\d{2})\s*([AaPp][Mm])/);
        if (!dateMatch || !timeMatch) return null;

        const monthIndex = MONTHS[dateMatch[1].slice(0, 3).toLowerCase()];
        const day = parseInt(dateMatch[2], 10);
        if (monthIndex === undefined || Number.isNaN(day)) return null;

        let hour = parseInt(timeMatch[1], 10);
        const minute = parseInt(timeMatch[2], 10);
        const meridiem = timeMatch[3].toLowerCase();
        if (Number.isNaN(hour) || Number.isNaN(minute)) return null;
        if (meridiem === 'pm' && hour !== 12) hour += 12;
        if (meridiem === 'am' && hour === 12) hour = 0;

        // Source times are stated in EST/EDT (GMT-0400). Local = UTC - 4, so
        // UTC = local + 4. Date.UTC gives an unambiguous epoch on all browsers.
        const year = new Date().getFullYear();
        const estDateObj = new Date(Date.UTC(year, monthIndex, day, hour + 4, minute));
        return Number.isNaN(estDateObj.getTime()) ? null : estDateObj;
    }

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

    return (
        <Link className={styles.tournamentCard} to={tournament.url} target="_blank">
            <div className={styles.hostTile}>
                {host.logo
                    ? <img src={host.logo} alt={`${host.label} logo`} />
                    : <span>{host.label}</span>
                }
            </div>

            <div className={styles.cardInfo}>
                <h2 className={styles.cardTitle}>
                    {tournament.team_size} {series} · {(tournament.gamemode || '').toUpperCase()}
                </h2>

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
        </Link>
    )
}
