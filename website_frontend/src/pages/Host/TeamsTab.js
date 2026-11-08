import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaPlus } from "react-icons/fa";
import { useAuth } from "hooks";
import { getApiErrorMessage } from "utils/apiError";
import { getMyInvites, getMyTeams, respondToInvite, teamUrl } from "services/teams";
import { CreateTeamModal } from "components/Teams/CreateTeamModal";
import { InviteCard, TeamCard } from "components/Teams/TeamParts";
import styles from "components/Teams/Teams.module.css";

// The Teams dashboard (Event Dashboard's Teams tab, and an org's settings Teams step):
// invites waiting on you, the teams you run or play on, and one "Create team" button.
// `ownerType` limits it to teams that profile type owns (e.g. 'org') and creates teams as it.
export const TeamsTab = ({ ownerType = null }) => {
    const { session } = useAuth();
    const token = session?.access_token;
    const navigate = useNavigate();
    const [teams, setTeams] = useState(null);
    const [invites, setInvites] = useState([]);
    const [error, setError] = useState('');
    const [busy, setBusy] = useState(false);
    const [creating, setCreating] = useState(false);

    const load = useCallback(() => {
        if (!token) return;
        Promise.all([getMyTeams(token), ownerType ? Promise.resolve([]) : getMyInvites(token)])
            .then(([t, i]) => { setTeams(t); setInvites(i); })
            .catch(err => setError(getApiErrorMessage(err)));
    }, [token, ownerType]);

    useEffect(load, [load]);

    const respond = async (inviteId, accept) => {
        setBusy(true);
        try {
            setInvites(await respondToInvite(inviteId, accept, token));
            if (accept) setTeams(await getMyTeams(token));
        } catch (err) {
            setError(getApiErrorMessage(err));
        } finally {
            setBusy(false);
        }
    };

    if (!teams && !error) return <p className={styles.sub}>Loading your teams…</p>;

    const shown = (teams ?? []).filter(t => !ownerType || (t.my_role === 'owner' && t.owner.type === ownerType));
    const running = shown.filter(t => t.my_role === 'owner');
    const playing = shown.filter(t => t.my_role !== 'owner');

    return (
        <div>
            <div className={styles.header}>
                <div>
                    <h2 className={styles.heading}>{ownerType === 'org' ? 'Your organization\'s teams' : 'Your teams'}</h2>
                    <p className={styles.sub}>Click a team to see its roster, invite players and pick captains.</p>
                </div>
                <button type="button" className={styles.createBtn} onClick={() => setCreating(true)}><FaPlus aria-hidden="true" /> Create team</button>
            </div>

            {error && <p className={styles.error} role="alert">{error}</p>}

            {invites.length > 0 &&
                <section className={styles.section}>
                    <h3 className={styles.sectionLabel}>Invites ({invites.length})</h3>
                    {invites.map(inv => <InviteCard key={inv.id} invite={inv} onRespond={respond} busy={busy} />)}
                </section>
            }

            {shown.length === 0 ? (
                <div className={`${styles.section} ${styles.empty}`}>
                    <h2>No teams yet</h2>
                    <p>Create a team, give it a name and an image, and invite your players. Team events need a team with enough players.</p>
                    <button type="button" className={styles.createBtn} onClick={() => setCreating(true)}><FaPlus aria-hidden="true" /> Create team</button>
                </div>
            ) : (
                <>
                    {running.length > 0 &&
                        <section className={styles.section}>
                            <h3 className={styles.sectionLabel}>Teams you run</h3>
                            <div className={styles.grid}>{running.map(t => <TeamCard key={t.public_id} team={t} />)}</div>
                        </section>
                    }
                    {playing.length > 0 &&
                        <section className={styles.section}>
                            <h3 className={styles.sectionLabel}>Teams you play on</h3>
                            <div className={styles.grid}>{playing.map(t => <TeamCard key={t.public_id} team={t} />)}</div>
                        </section>
                    }
                </>
            )}

            {creating &&
                <CreateTeamModal
                    ownerType={ownerType}
                    onClose={() => setCreating(false)}
                    onCreated={(team) => navigate(teamUrl(team))}
                />
            }
        </div>
    );
};
