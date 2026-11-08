import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { FaCrown } from "react-icons/fa";
import { LoadingWheel, SeoData } from "components";
import { useAuth } from "hooks";
import { NotFound } from "pages/NotFound";
import { getApiErrorMessage } from "utils/apiError";
import { EVENT_DASHBOARD_PATH } from "utils/hostEvents";
import { PROFILE_LABELS, profileUrl } from "utils/profiles";
import {
    getTeam, getMyInvites, respondToInvite, invitePlayer, cancelInvite, setMemberRole, removeMember,
    deleteTeam, leaveTeam, updateTeam, updateTeamPicture, ROLE_LABELS,
} from "services/teams";
import { Avatar, PlayerPicker } from "components/Teams/TeamParts";
import host from "pages/Host/Host.module.css";
import styles from "components/Teams/Teams.module.css";

// /teams/:teamId - a team's page: its image, owner and roster, each linking to the profile.
// The owner manages it here (invite, captains, remove, rename, image, delete); a player with
// an invite to it can accept or decline from here after seeing who they'd be playing with.
export const TeamPage = () => {
    const { teamId } = useParams();
    const { session } = useAuth();
    const token = session?.access_token;
    const navigate = useNavigate();
    const [team, setTeam] = useState(null);
    const [invite, setInvite] = useState(null);
    const [loadError, setLoadError] = useState(null);
    const [error, setError] = useState('');
    const [busy, setBusy] = useState(false);
    const [toInvite, setToInvite] = useState([]);
    const [renaming, setRenaming] = useState(false);
    const [name, setName] = useState('');
    const fileInput = useRef(null);

    useEffect(() => {
        setLoadError(null);
        getTeam(teamId, token).then(setTeam).catch(setLoadError);
        if (token) {
            getMyInvites(token)
                .then(list => setInvite(list.find(i => i.team.public_id === teamId) ?? null))
                .catch(() => setInvite(null));
        }
    }, [teamId, token]);

    // Runs one change. Calls that return the team update the page.
    const run = async (call) => {
        setBusy(true);
        setError('');
        try {
            const result = await call(token);
            if (result?.public_id) setTeam(result);
            return true;
        } catch (err) {
            setError(getApiErrorMessage(err));
            return false;
        } finally {
            setBusy(false);
        }
    };

    if (loadError?.response?.status === 404) return <NotFound />;
    if (loadError) return <div className="standardContainer"><p>{getApiErrorMessage(loadError)}</p></div>;
    if (!team) return <div className="standardContainer"><LoadingWheel /></div>;

    const isOwner = team.my_role === 'owner';
    const isMember = team.my_role === 'captain' || team.my_role === 'player';

    const sendInvites = async () => {
        for (const p of toInvite) {
            if (!(await run(t => invitePlayer(team.public_id, p.username, t)))) return;
        }
        setToInvite([]);
    };

    const respond = async (accept) => {
        if (await run(t => respondToInvite(invite.id, accept, t))) {
            setInvite(null);
            if (accept) setTeam(await getTeam(teamId, token));
        }
    };

    const saveName = async () => {
        if (name.trim().length >= 2 && name.trim() !== team.name) {
            if (!(await run(t => updateTeam(team.public_id, { name: name.trim() }, t)))) return;
        }
        setRenaming(false);
    };

    const pickImage = (e) => {
        const file = e.target.files?.[0];
        e.target.value = '';
        if (file) run(t => updateTeamPicture(team.public_id, file, t));
    };

    const remove = async () => {
        if (!window.confirm(`Delete ${team.name}? Its roster and invites go with it.`)) return;
        if (await run(t => deleteTeam(team.public_id, t))) navigate(`${EVENT_DASHBOARD_PATH}?tab=teams`);
    };

    const leave = async () => {
        if (!window.confirm(`Leave ${team.name}?`)) return;
        if (await run(t => leaveTeam(team.public_id, t))) navigate(`${EVENT_DASHBOARD_PATH}?tab=teams`);
    };

    return (
        <div className={host.page}>
            <SeoData title={`${team.name} | uSync`} description={`${team.name}, a team on uSync.`} />
            <div className={`${host.inner} ${host.narrow}`}>
                <Link to={`${EVENT_DASHBOARD_PATH}?tab=teams`} className={host.muted}>← Teams</Link>

                <header className={host.pageHeader} style={{ display: 'flex', gap: '1.25rem', alignItems: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
                    {isOwner ? (
                        <button type="button" className={styles.imageButton} onClick={() => fileInput.current?.click()} aria-label="Change team image" disabled={busy}>
                            <Avatar src={team.picture} name={team.name} size={88} team />
                        </button>
                    ) : <Avatar src={team.picture} name={team.name} size={88} team />}
                    <input ref={fileInput} type="file" accept="image/jpeg,image/png,image/webp" className={styles.hidden} onChange={pickImage} />

                    <div style={{ flex: 1, minWidth: '12rem' }}>
                        {team.game && <p className={host.eyebrow}>{team.game}</p>}
                        {renaming ? (
                            <div className={styles.actions}>
                                <input className={styles.input} style={{ maxWidth: '18rem' }} value={name} maxLength={40} onChange={e => setName(e.target.value)} aria-label="Team name" autoFocus />
                                <button type="button" className={host.primaryBtn} disabled={busy} onClick={saveName}>Save</button>
                                <button type="button" className={host.ghostBtn} onClick={() => setRenaming(false)}>Cancel</button>
                            </div>
                        ) : <h1 className={host.title}>{team.name}</h1>}
                        <p className={host.subtitle}>
                            Run by <Link to={profileUrl(team.owner)}>{team.owner.username}</Link> ({PROFILE_LABELS[team.owner.type]})
                            {' · '}{team.members.length} player{team.members.length === 1 ? '' : 's'}
                        </p>
                    </div>

                    <div className={host.btnRow}>
                        {isOwner && !renaming && <button type="button" className={host.ghostBtn} onClick={() => { setName(team.name); setRenaming(true); }}>Rename</button>}
                        {isOwner && <button type="button" className={host.dangerBtn} disabled={busy} onClick={remove}>Delete team</button>}
                        {isMember && <button type="button" className={host.dangerBtn} disabled={busy} onClick={leave}>Leave team</button>}
                    </div>
                </header>

                {invite &&
                    <div className={styles.inviteCard} style={{ marginBottom: '1rem' }}>
                        <p className={styles.inviteText}>
                            <Link to={profileUrl(invite.invited_by)}>{invite.invited_by.username}</Link> invited you to join this team.
                        </p>
                        <div className={styles.actions}>
                            <button type="button" className={styles.createBtn} disabled={busy} onClick={() => respond(true)}>Accept</button>
                            <button type="button" className={styles.linkBtn} disabled={busy} onClick={() => respond(false)}>Decline</button>
                        </div>
                    </div>
                }

                {error && <p className={styles.error} role="alert">{error}</p>}

                <section className={host.card}>
                    <h2 className={host.sectionTitle}>Roster</h2>
                    {team.members.length === 0 && <p className={host.muted}>No players yet.</p>}
                    <ul style={{ listStyle: 'none', padding: 0, margin: '.75rem 0 0', display: 'grid', gap: '.6rem' }}>
                        {team.members.map(m => (
                            <li key={m.public_id} style={{ display: 'flex', alignItems: 'center', gap: '.75rem', flexWrap: 'wrap' }}>
                                <Link to={profileUrl(m)} style={{ display: 'flex', alignItems: 'center', gap: '.6rem', flex: 1, color: 'var(--ink)', fontWeight: 600 }}>
                                    <Avatar src={m.profile_picture} name={m.username} size={36} />
                                    {m.username}
                                    {m.role === 'captain' && <FaCrown aria-label="Captain" style={{ color: 'var(--violet-bright)' }} />}
                                </Link>
                                {isOwner ? (
                                    <>
                                        <select className={styles.input} style={{ width: 'auto' }} aria-label={`Role for ${m.username}`} value={m.role} disabled={busy}
                                            onChange={e => run(t => setMemberRole(team.public_id, m.public_id, e.target.value, t))}>
                                            <option value="player">Player</option>
                                            <option value="captain">Captain - can enter events</option>
                                        </select>
                                        <button type="button" className={`${host.dangerBtn} ${host.smallBtn}`} disabled={busy}
                                            onClick={() => window.confirm(`Remove ${m.username} from ${team.name}?`) && run(t => removeMember(team.public_id, m.public_id, t))}>
                                            Remove
                                        </button>
                                    </>
                                ) : <span className={host.muted}>{ROLE_LABELS[m.role]}</span>}
                            </li>
                        ))}
                    </ul>
                </section>

                {isOwner &&
                    <section className={host.card}>
                        <h2 className={host.sectionTitle}>Invite players</h2>
                        <div style={{ marginTop: '.75rem' }}>
                            <PlayerPicker
                                id="team-page-invite"
                                selected={toInvite}
                                onChange={setToInvite}
                                exclude={[...team.members.map(m => m.username), ...team.invites.map(i => i.username)]}
                            />
                            {toInvite.length > 0 &&
                                <button type="button" className={host.primaryBtn} style={{ marginTop: '.75rem' }} disabled={busy} onClick={sendInvites}>
                                    Send {toInvite.length} invite{toInvite.length === 1 ? '' : 's'}
                                </button>
                            }
                        </div>

                        {team.invites.length > 0 &&
                            <>
                                <h3 className={styles.sectionLabel} style={{ marginTop: '1.25rem' }}>Waiting to accept</h3>
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '.5rem' }}>
                                    {team.invites.map(i => (
                                        <li key={i.id} style={{ display: 'flex', alignItems: 'center', gap: '.6rem' }}>
                                            <Link to={profileUrl(i)} style={{ display: 'flex', alignItems: 'center', gap: '.6rem', flex: 1, color: 'var(--ink)' }}>
                                                <Avatar src={i.profile_picture} name={i.username} size={28} /> {i.username}
                                            </Link>
                                            <button type="button" className={styles.linkBtn} disabled={busy} onClick={() => run(t => cancelInvite(team.public_id, i.id, t))}>Cancel invite</button>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        }
                    </section>
                }
            </div>
        </div>
    );
};
