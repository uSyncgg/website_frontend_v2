import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { useAuth, useCurrentUser } from "hooks";
import { profileUrl } from "utils/profiles";
import { searchPlayers, teamUrl, ROLE_LABELS } from "services/teams";
import styles from "./Teams.module.css";

const initial = (name) => (name ?? '?').trim().charAt(0).toUpperCase();

// A round profile picture (or the name's first letter). `team` makes it a rounded square.
export const Avatar = ({ src, name, size = 32, team = false }) => {
    const [failed, setFailed] = useState(false);
    useEffect(() => setFailed(false), [src]);
    return (
        <span className={`${styles.avatar} ${team ? styles.teamAvatar : ''}`} style={{ width: size, height: size, fontSize: size * .42 }} aria-hidden="true">
            {src && !failed ? <img src={src} alt="" onError={() => setFailed(true)} /> : initial(name)}
        </span>
    );
};

// A link to someone's profile, with their picture.
export const ProfileLink = ({ profile, onClick }) => (
    <Link to={profileUrl(profile)} onClick={onClick}>{profile.username}</Link>
);

// A team in the dashboard grid. The whole card opens the team page.
export const TeamCard = ({ team }) => (
    <Link to={teamUrl(team)} className={styles.teamCard}>
        <div className={styles.cardBanner}>
            {team.my_role && <span className={styles.rolePill}>{ROLE_LABELS[team.my_role]}</span>}
        </div>
        <div className={styles.cardBody}>
            <Avatar src={team.picture} name={team.name} size={56} team />
            <h3 className={styles.cardName}>{team.name}</h3>
            <div className={styles.cardMeta}>
                {[team.game, `${team.members.length} player${team.members.length === 1 ? '' : 's'}`].filter(Boolean).join(' · ')}
            </div>
            <div className={styles.cardMeta}>Run by {team.owner.username}</div>
            {team.members.length > 0 &&
                <div className={styles.avatarRow}>
                    {team.members.slice(0, 6).map(m => <Avatar key={m.public_id} src={m.profile_picture} name={m.username} size={26} />)}
                </div>
            }
        </div>
    </Link>
);

// A pending invite to the signed in player: the team (opens its page so you can see who's on
// it) and who sent it (opens their profile), with Accept / Decline.
export const InviteCard = ({ invite, onRespond, busy, onNavigate }) => (
    <div className={styles.inviteCard}>
        <Link to={teamUrl(invite.team)} onClick={onNavigate} aria-label={`View ${invite.team.name}`}>
            <Avatar src={invite.team.picture} name={invite.team.name} size={48} team />
        </Link>
        <p className={styles.inviteText}>
            <ProfileLink profile={invite.invited_by} onClick={onNavigate} /> invited you to join{' '}
            <Link to={teamUrl(invite.team)} onClick={onNavigate}>{invite.team.name}</Link>
            {invite.team.members.length > 0 && <> · {invite.team.members.length} player{invite.team.members.length === 1 ? '' : 's'}</>}
        </p>
        <div className={styles.actions}>
            <button type="button" className={styles.createBtn} disabled={busy} onClick={() => onRespond(invite.id, true)}>Accept</button>
            <button type="button" className={styles.linkBtn} disabled={busy} onClick={() => onRespond(invite.id, false)}>Decline</button>
        </div>
    </div>
);

// Search player profiles by username and pick them. `selected` is a list of profile summaries;
// `exclude` is usernames that can't be picked (already on the team or invited).
export const PlayerPicker = ({ selected, onChange, exclude = [], id = 'player-picker' }) => {
    const { session } = useAuth();
    // You can't invite yourself (the backend refuses too), so your own player profile never shows.
    const { profiles: mine = [] } = useCurrentUser();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const timer = useRef(null);
    const taken = new Set([...exclude, ...mine.filter(p => p.type === 'player').map(p => p.username), ...selected.map(p => p.username)].map(n => n.toLowerCase()));

    useEffect(() => {
        clearTimeout(timer.current);
        const q = query.trim();
        if (q.length < 2) {
            setResults([]);
            return;
        }
        timer.current = setTimeout(() => {
            searchPlayers(q, session?.access_token).then(setResults).catch(() => setResults([]));
        }, 250);
        return () => clearTimeout(timer.current);
    }, [query, session?.access_token]);

    const shown = results.filter(p => !taken.has(p.username.toLowerCase()));

    return (
        <div>
            <input
                id={id}
                className={styles.input}
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && e.preventDefault()}
                placeholder="Search players by username"
                autoComplete="off"
            />
            {shown.length > 0 &&
                <ul className={styles.results}>
                    {shown.map(p => (
                        <li key={p.public_id}>
                            <button type="button" className={styles.result} onClick={() => { onChange([...selected, p]); setQuery(''); }}>
                                <Avatar src={p.profile_picture} name={p.username} size={24} /> {p.username}
                            </button>
                        </li>
                    ))}
                </ul>
            }
            {query.trim().length >= 2 && shown.length === 0 && <p className={styles.hint}>No players match "{query.trim()}".</p>}
            {selected.length > 0 &&
                <div className={styles.chips}>
                    {selected.map(p => (
                        <span key={p.public_id} className={styles.chip}>
                            <Avatar src={p.profile_picture} name={p.username} size={20} /> {p.username}
                            <button type="button" aria-label={`Don't invite ${p.username}`} onClick={() => onChange(selected.filter(s => s.public_id !== p.public_id))}>×</button>
                        </span>
                    ))}
                </div>
            }
        </div>
    );
};
