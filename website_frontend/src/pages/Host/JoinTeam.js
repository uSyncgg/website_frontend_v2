import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router";
import { useCurrentUser } from "hooks";
import { joinByCode } from "services/teamsMock";
import styles from "./Host.module.css";

// /teams/join/:code - where a team's invite link lands. Signed-in players join straight away.
export const JoinTeam = () => {
    const { code } = useParams();
    const { defaultProfile } = useCurrentUser();
    const username = defaultProfile?.username;
    const [team, setTeam] = useState(undefined);

    useEffect(() => {
        if (username) setTeam(joinByCode(code, username));
    }, [code, username]);

    if (team) return <Navigate to="/dashboard?tab=teams" replace />;

    return (
        <div className={`standardContainer ${styles.page}`}>
            <div className={styles.inner}>
                <div className={styles.emptyState}>
                    {team === null
                        ? <>
                            <h2 className={styles.sectionTitle}>This invite link isn't valid</h2>
                            <p className={styles.muted}>The team may have been deleted. Ask the manager for a new link.</p>
                            <Link to="/dashboard?tab=teams" className={styles.secondaryBtn}>Your teams</Link>
                        </>
                        : <p className={styles.muted}>Joining the team…</p>
                    }
                </div>
            </div>
        </div>
    );
};
