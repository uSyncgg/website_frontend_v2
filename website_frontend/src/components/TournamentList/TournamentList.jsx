import React from "react";
import { CodTournamentCard } from "components";
import styles from './TournamentList.module.css';

// "Apr 14th" -> "Apr 14", so dates can be compared to today's
const stripOrdinal = (date) => (date || '').replace(/(\d+)(st|nd|rd|th)/, '$1');

const isToday = (date) => {
    const now = new Date();
    const todayString = `${now.toLocaleString('en-US', { month: 'short' })} ${now.getDate()}`;
    return stripOrdinal(date) === todayString;
};

export const TournamentList = ({ tournaments, game }) => {
    if (game !== 'Cod') return null;

    // Group consecutive tournaments that share a date under one heading
    const groups = [];
    tournaments.forEach(tournament => {
        const lastGroup = groups[groups.length - 1];
        if (lastGroup && lastGroup.date === tournament.date) {
            lastGroup.items.push(tournament);
        } else {
            groups.push({ date: tournament.date, items: [tournament] });
        }
    });

    return (
        <React.Fragment>
            {groups.map(group => (
                <div key={group.date} className={styles.dateGroup}>
                    <h2 className={styles.dateHeading}>
                        {isToday(group.date) ? `Today · ${group.date}` : group.date}
                    </h2>

                    {group.items.map((tournament, index) => (
                        <CodTournamentCard key={`${group.date}-${index}`} tournament={tournament} />
                    ))}
                </div>
            ))}
        </React.Fragment>
    );
}
