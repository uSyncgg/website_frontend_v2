import { useMemo, useState } from "react";
import { LoadingWheel, Segmented } from "components";
import { useAdminAccounts } from "hooks/useAdminAnalytics";
import { LINK_PLATFORMS } from "services/adminAnalytics";
import { getLoadErrorMessage } from "utils/apiError";
import styles from "./AdminAnalytics.module.css";

// Accounts tab of /admin/analytics: filter every account, including half-finished sign-ups.

const ROLES = [
    { key: 'all', label: 'All' },
    { key: 'player', label: 'Players' },
    { key: 'host', label: 'Hosts' },
    { key: 'venue', label: 'Venues' },
];

const PROFILE = [
    { key: 'all', label: 'All' },
    { key: 'complete', label: 'Complete' },
    { key: 'incomplete', label: 'Not finished' },
];

const LINK_COUNTS = [
    { key: 'all', label: 'Any' },
    { key: 'none', label: '0 linked' },
    { key: 'some', label: '1+ linked' },
    { key: 'many', label: '3+ linked' },
];

const JOINED = [
    { key: 'all', label: 'Any time', days: null },
    { key: '7', label: 'Last 7 days', days: 7 },
    { key: '30', label: 'Last 30 days', days: 30 },
    { key: '90', label: 'Last 90 days', days: 90 },
    { key: 'old', label: 'Over 90 days ago', days: -90 },
];

const SHOW_LIMIT = 200;

const linkedCount = (a) => LINK_PLATFORMS.filter(p => a.linked?.[p.key]).length;

export const AdminAccountsTab = () => {
    const { data, loading, error } = useAdminAccounts();
    const accounts = data?.accounts;

    const [search, setSearch] = useState('');
    const [role, setRole] = useState('all');
    const [profile, setProfile] = useState('all');
    const [game, setGame] = useState('all');
    const [joined, setJoined] = useState('all');
    const [linkCount, setLinkCount] = useState('all');
    const [missing, setMissing] = useState([]);
    const [has, setHas] = useState([]);

    const games = useMemo(() => [...new Set((accounts ?? []).flatMap(a => a.games ?? []))].sort(), [accounts]);

    const shown = useMemo(() => {
        if (!accounts) return [];
        const q = search.trim().toLowerCase();
        const days = JOINED.find(j => j.key === joined).days;
        const cutoff = days && Date.now() - Math.abs(days) * 86400000;
        return accounts.filter(a => {
            if (q && !`${a.username ?? ''} ${a.email ?? ''}`.toLowerCase().includes(q)) return false;
            if (role !== 'all' && !a[`is_${role}`]) return false;
            if (profile === 'complete' && !a.profile_complete) return false;
            if (profile === 'incomplete' && a.profile_complete) return false;
            if (game !== 'all' && !a.games?.includes(game)) return false;
            if (cutoff) {
                const created = new Date(a.created_at).getTime();
                if (days > 0 ? created < cutoff : created >= cutoff) return false;
            }
            const n = linkedCount(a);
            if (linkCount === 'none' && n !== 0) return false;
            if (linkCount === 'some' && n < 1) return false;
            if (linkCount === 'many' && n < 3) return false;
            if (missing.some(k => a.linked?.[k])) return false;
            if (has.some(k => !a.linked?.[k])) return false;
            return true;
        });
    }, [accounts, search, role, profile, game, joined, linkCount, missing, has]);

    const resetFilters = () => {
        setSearch(''); setRole('all'); setProfile('all'); setGame('all');
        setJoined('all'); setLinkCount('all'); setMissing([]); setHas([]);
    };

    if (error) return <p className={styles.error}>{getLoadErrorMessage(error, "Unable to load accounts right now.")}</p>;
    if (loading || !accounts) return <LoadingWheel />;

    return (
        <>
            <section className={styles.card}>
                <div className={styles.cardHeader}>
                    <div>
                        <h2 className={styles.cardTitle}>Filter accounts</h2>
                        <p className={styles.cardSubtitle}>
                            {shown.length.toLocaleString('en-US')} of {accounts.length.toLocaleString('en-US')} accounts match
                        </p>
                    </div>
                    <button type="button" className={styles.ghostButton} onClick={resetFilters}>Clear filters</button>
                </div>

                <div className={styles.filterRow}>
                    <input
                        className={styles.input}
                        style={{ maxWidth: '18rem' }}
                        placeholder="Search username or email"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        aria-label="Search accounts"
                    />
                    <label className={styles.filterLabel} htmlFor="accounts-game">Game</label>
                    <select id="accounts-game" className={styles.select} value={game} onChange={e => setGame(e.target.value)}>
                        <option value="all">All games</option>
                        {games.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                    <label className={styles.filterLabel} htmlFor="accounts-joined">Joined</label>
                    <select id="accounts-joined" className={styles.select} value={joined} onChange={e => setJoined(e.target.value)}>
                        {JOINED.map(j => <option key={j.key} value={j.key}>{j.label}</option>)}
                    </select>
                </div>
                <div className={styles.filterRow}>
                    <span className={styles.filterLabel}>Role</span>
                    <Segmented options={ROLES} value={role} onChange={setRole} label="Role" />
                    <span className={styles.filterLabel}>Profile</span>
                    <Segmented options={PROFILE} value={profile} onChange={setProfile} label="Profile status" />
                </div>
                <div className={styles.filterRow}>
                    <span className={styles.filterLabel}>Linked accounts</span>
                    <Segmented options={LINK_COUNTS} value={linkCount} onChange={setLinkCount} label="Linked account count" />
                </div>
                <div className={styles.filterRow}>
                    <span className={styles.filterLabel}>Missing</span>
                    <Segmented multiple options={LINK_PLATFORMS} value={missing} onChange={setMissing} label="Platforms not linked" />
                </div>
                <div className={styles.filterRow}>
                    <span className={styles.filterLabel}>Has</span>
                    <Segmented multiple options={LINK_PLATFORMS} value={has} onChange={setHas} label="Platforms linked" />
                </div>

                <div className={styles.tableWrap}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Roles</th>
                                <th>Profile</th>
                                <th>Linked</th>
                                <th>Joined</th>
                            </tr>
                        </thead>
                        <tbody>
                            {shown.slice(0, SHOW_LIMIT).map(a => (
                                <tr key={a.id}>
                                    <td className={styles.eventName}>{a.username || '—'}</td>
                                    <td>{a.email}</td>
                                    <td>{['player', 'host', 'venue'].filter(r => a[`is_${r}`]).join(', ') || '—'}</td>
                                    <td>{a.profile_complete ? 'Complete' : 'Not finished'}</td>
                                    <td title={LINK_PLATFORMS.filter(p => a.linked?.[p.key]).map(p => p.label).join(', ')}>{linkedCount(a)}</td>
                                    <td>{new Date(a.created_at).toLocaleDateString('en-US', { dateStyle: 'medium' })}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {shown.length > SHOW_LIMIT &&
                        <p className={styles.chartNote}>Showing the first {SHOW_LIMIT} of {shown.length.toLocaleString('en-US')}.</p>
                    }
                    {!shown.length && <p className={styles.chartNote}>No accounts match these filters.</p>}
                </div>
            </section>

        </>
    );
};
