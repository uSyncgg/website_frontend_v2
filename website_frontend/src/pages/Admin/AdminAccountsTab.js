import { useEffect, useMemo, useState } from "react";
import { LoadingWheel, NudgeCard } from "components";
import { useAuth } from "hooks";
import { getAdminAccounts, sendNudge, LINK_PLATFORMS, NUDGE_SENDING_ENABLED } from "services/nudges";
import { getLoadErrorMessage } from "utils/apiError";
import styles from "./AdminAnalytics.module.css";

// Accounts tab of /admin/analytics: filter every account (including half-finished sign-ups),
// then send the matching accounts a nudge popup they see on their next visit.

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

const Segmented = ({ options, value, onChange, label }) => (
    <div className={styles.segmented} role="group" aria-label={label}>
        {options.map(opt => (
            <button
                key={opt.key}
                type="button"
                className={`${styles.segment} ${value === opt.key ? styles.segmentActive : ''}`}
                aria-pressed={value === opt.key}
                onClick={() => onChange(opt.key)}
            >
                {opt.label}
            </button>
        ))}
    </div>
);

// Toggle chips for a set of platform keys.
const PlatformChips = ({ value, onChange, label }) => (
    <div className={styles.segmented} role="group" aria-label={label} style={{ flexWrap: 'wrap' }}>
        {LINK_PLATFORMS.map(p => {
            const on = value.includes(p.key);
            return (
                <button
                    key={p.key}
                    type="button"
                    className={`${styles.segment} ${on ? styles.segmentActive : ''}`}
                    aria-pressed={on}
                    onClick={() => onChange(on ? value.filter(k => k !== p.key) : [...value, p.key])}
                >
                    {p.label}
                </button>
            );
        })}
    </div>
);

const EMPTY_NUDGE = { title: '', message: '', link_url: '', link_label: '' };

export const AdminAccountsTab = () => {
    const { session } = useAuth();
    const token = session?.access_token;
    const [accounts, setAccounts] = useState(null);
    const [error, setError] = useState(null);

    const [search, setSearch] = useState('');
    const [role, setRole] = useState('all');
    const [profile, setProfile] = useState('all');
    const [game, setGame] = useState('all');
    const [joined, setJoined] = useState('all');
    const [linkCount, setLinkCount] = useState('all');
    const [missing, setMissing] = useState([]);
    const [has, setHas] = useState([]);

    const [nudge, setNudge] = useState(EMPTY_NUDGE);
    const [sending, setSending] = useState(false);
    const [result, setResult] = useState(null);

    useEffect(() => {
        let cancelled = false;
        getAdminAccounts(token)
            .then(res => { if (!cancelled) setAccounts(res); })
            .catch(err => { if (!cancelled) setError(err); });
        return () => { cancelled = true; };
    }, [token]);

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

    const send = async (e) => {
        e.preventDefault();
        if (!window.confirm(`Send this popup to ${shown.length.toLocaleString('en-US')} accounts?`)) return;
        setSending(true);
        setResult(null);
        try {
            const res = await sendNudge(token, nudge, shown.map(a => a.id));
            setResult({ ok: true, text: `Sent to ${res.sent.toLocaleString('en-US')} accounts.` });
            setNudge(EMPTY_NUDGE);
        } catch (err) {
            setResult({ ok: false, text: getLoadErrorMessage(err, 'Could not send the popup.') });
        } finally {
            setSending(false);
        }
    };

    if (error) return <p className={styles.error}>{getLoadErrorMessage(error, "Unable to load accounts right now.")}</p>;
    if (!accounts) return <LoadingWheel />;

    const field = (key) => ({ value: nudge[key], onChange: e => setNudge(n => ({ ...n, [key]: e.target.value })) });

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
                    <PlatformChips value={missing} onChange={setMissing} label="Platforms not linked" />
                </div>
                <div className={styles.filterRow}>
                    <span className={styles.filterLabel}>Has</span>
                    <PlatformChips value={has} onChange={setHas} label="Platforms linked" />
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
                        <p className={styles.chartNote}>Showing the first {SHOW_LIMIT}. The popup goes to all {shown.length.toLocaleString('en-US')}.</p>
                    }
                    {!shown.length && <p className={styles.chartNote}>No accounts match these filters.</p>}
                </div>
            </section>

            <section className={styles.card}>
                <div className={styles.cardHeader}>
                    <div>
                        <h2 className={styles.cardTitle}>Send a popup</h2>
                        <p className={styles.cardSubtitle}>
                            Goes to the {shown.length.toLocaleString('en-US')} accounts above. Each one sees it once on their next visit until they close it.
                        </p>
                    </div>
                </div>
                <form className={styles.filterRow} style={{ alignItems: 'flex-start' }} onSubmit={send}>
                    <div style={{ display: 'grid', gap: '.6rem', flex: '1 1 20rem' }}>
                        <input className={styles.input} placeholder="Title (e.g. New CoD league starts Friday)" maxLength={80} required {...field('title')} />
                        <textarea className={styles.input} placeholder="Message" rows={3} maxLength={300} {...field('message')} />
                        <input className={styles.input} placeholder="Link URL (optional, e.g. /leagues)" {...field('link_url')} />
                        <input className={styles.input} placeholder="Button text (optional)" maxLength={30} {...field('link_label')} />
                        <div className={styles.formActions}>
                            <button type="submit" className={styles.primaryButton} disabled={!NUDGE_SENDING_ENABLED || sending || !shown.length || !nudge.title.trim()}>
                                {sending ? 'Sending…' : `Send to ${shown.length.toLocaleString('en-US')}`}
                            </button>
                            {!NUDGE_SENDING_ENABLED && <span className={styles.formError}>Sending is off for now (read-only). Use /dev/nudge-test to try the popup.</span>}
                            {result && <span className={result.ok ? styles.formSuccess : styles.formError}>{result.text}</span>}
                        </div>
                    </div>
                    <div style={{ flex: '0 1 22rem' }}>
                        <p className={styles.filterLabel}>Preview</p>
                        <NudgeCard nudge={{ id: 'preview', ...nudge, title: nudge.title || 'Your title' }} onClose={() => {}} />
                    </div>
                </form>
            </section>
        </>
    );
};
