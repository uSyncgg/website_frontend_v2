import React from "react";
import styles from './TournamentCard.module.css';

export const CodTournamentCard = ({ tournament }) => {
    const banners = {
        'cmg': window.innerWidth > 750 ? "https://i.imgur.com/M4FR1qC.png" : "https://i.imgur.com/X7jdhHR.png",
        'codagent': window.innerWidth > 750 ? "https://i.imgur.com/R12yczc.png" : "https://i.imgur.com/N614MLb.png"
    }

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
        // "10:00 AM" -> hour, minute, meridiem
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

        // Date in the viewer's local time zone, e.g. "Apr 21st"
        const dateFieldParts = new Intl.DateTimeFormat('en-US', {
            timeZone: userTimeZone,
            month: 'short',
            day: 'numeric'
        }).formatToParts(estDateObj);
        const month = dateFieldParts.find(part => part.type === 'month')?.value || '';
        const dayNum = parseInt(dateFieldParts.find(part => part.type === 'day')?.value, 10);
        formattedDate = Number.isNaN(dayNum) ? formattedDate : `${month} ${getOrdinalSuffix(dayNum)}`;
    }

    return (
        <div className={styles.tournamentCardContainer}>
            <div className={`${styles.tournamentCard}`} style={{ '--bg-image': `url(${banners[tournament.site]})` }}>
                <div className={styles.titleInfo}>
                    <h2 className={styles.white}>{tournament.team_size} {" "} {tournament.series}</h2>
                    <h2 className={styles.white}>{tournament.gamemode.toUpperCase()}</h2>
                    <h2 className={styles.purple}>{formattedTime} {" "} {abbreviation}</h2>
                </div>

                <div className={styles.bodyInfo}>
                    <p className={styles.white}>Date</p>
                    <p className={styles.purple}>{formattedDate}</p>
                    <p className={styles.white}>Region</p>
                    <p className={styles.purple}>{tournament.region}</p>
                </div>

                <div className={styles.bodyInfo}>
                    <p className={styles.white}>Platform</p>
                    <p className={styles.purple}>{tournament.platforms}</p>
                    <p className={styles.white}>Skill</p>
                    <p className={styles.purple}>{tournament.skill}</p>
                </div>

                <div className={styles.bodyInfo}>
                    <p className={styles.white}>Entry Fee</p>
                    <p className={styles.purple}>{tournament.entry}</p>
                    <p className={styles.white}>Restrictions</p>
                    <p className={styles.purple}>{tournament.requirements}</p>
                </div>

                <div className={styles.buttonContainer}>
                    <button className={styles.tournamentButton} type="submit" onClick={() => window.open(tournament.url, '_blank')}>Join Now</button>
                </div>
            </div>
        </div>
    )
}
