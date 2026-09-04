import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import { CodTournamentCard } from "components";
import { pickHomepageTournaments } from "utils/pickHomepageTournaments";
import styles from './HomeTournaments.module.css';

export const HomeTournaments = () => {
    const [tournaments, setTournaments] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/tournaments/cod`)
            .then(res => setTournaments(res.data))
            .catch(err => console.log(err))
            .finally(() => setIsLoaded(true));
    }, []);

    const featured = pickHomepageTournaments(tournaments);

    return (
        <div className={styles.container}>
            <p className={styles.eyebrow}>Live Right Now</p>
            <h2 className={styles.white}>Tournaments Starting Soon</h2>
            <img className="underlineImg" src="https://i.imgur.com/eNhKhTI.png" alt="underline" />
            <p className={styles.subtext}>
                A live sample of what's running on Call of Duty right now. Browse every match on the full tournaments page.
            </p>

            {!isLoaded ? (
                <div className={styles.statusMessage}>
                    <h3 className="white">Loading tournaments...</h3>
                </div>
            ) : featured.length === 0 ? (
                <div className={styles.statusMessage}>
                    <h3 className="white">Check back soon for live tournaments.</h3>
                </div>
            ) : (
                <div className={styles.list}>
                    {featured.map(tournament => (
                        <CodTournamentCard key={tournament.url} tournament={tournament} badge={tournament.homeBadge} />
                    ))}
                </div>
            )}

            <Link to="/tournaments/call-of-duty-tournaments" className={styles.viewAllPill}>
                View All Tournaments
            </Link>
        </div>
    );
};
