import React from "react";
import styles from './TournamentCard.module.css';

export const CodTournamentCard = ({ tournament }) => {
    const banners = {
        'cmg': window.innerWidth > 750 ? "https://i.imgur.com/M4FR1qC.png" : "https://i.imgur.com/X7jdhHR.png",
        'codagent': window.innerWidth > 750 ? "https://i.imgur.com/R12yczc.png" : "https://i.imgur.com/N614MLb.png"
    }

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
    // console.log(`FORMATTED TIME: ${formattedTime}`)
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
    // console.log(abbreviation)
    // Step 5: Convert date
    const dateObj = new Date(estDateObj.toLocaleString('en-US', { timeZone: userTimeZone }));
    const month = dateObj.toLocaleString('en-US', { month: 'short' }); // e.g., "Apr"
    const day = dateObj.getDate();
    
    // Add ordinal suffix to the day
    function getOrdinalSuffix(n) {
        if (n >= 11 && n <= 13) return `${n}th`;
        switch (n % 10) {
        case 1: return `${n}st`;
        case 2: return `${n}nd`;
        case 3: return `${n}rd`;
        default: return `${n}th`;
        }
    }
    
    const formattedDate = `${month} ${getOrdinalSuffix(day)}`; // e.g., "Apr 21st"

    return (
        <div className={styles.tournamentCardContainer}>
            <div className={`${styles.tournamentCard}`} style={{ '--bg-image': `url(${banners[tournament.company]})` }}>
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
