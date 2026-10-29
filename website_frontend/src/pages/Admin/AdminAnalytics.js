import { useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { LoadingWheel } from "components";
import { useAuth, useAdminAnalytics } from "hooks";
import { isMockAnalytics } from "services/adminAnalytics";
import { getLoadErrorMessage } from "utils/apiError";
import { AdminEventsTab } from "./AdminEventsTab";
import { AdminFinanceTab } from "./AdminFinanceTab";
import styles from "./AdminAnalytics.module.css";

// /admin/analytics - read-only dashboard for site admins: accounts, events and (soon) finance.
// RequireAdmin decides who reaches this page.

const RANGES = [
    { key: '7d', label: '7D', days: 7, bucket: 'day', caption: 'last 7 days' },
    { key: '30d', label: '30D', days: 30, bucket: 'day', caption: 'last 30 days' },
    { key: '90d', label: '90D', days: 90, bucket: 'week', caption: 'last 90 days' },
    { key: '1y', label: '1Y', days: 365, bucket: 'month', caption: 'last 12 months' },
    { key: 'all', label: 'All', days: null, bucket: 'month', caption: 'all time' },
];

const ROLES = [
    { key: 'total', label: 'All accounts' },
    { key: 'players', label: 'Players' },
    { key: 'hosts', label: 'Hosts' },
    { key: 'venues', label: 'Venues' },
];

const GAME_AUDIENCES = [
    { key: 'players', label: 'Players' },
    { key: 'hosts', label: 'Hosts' },
    { key: 'combined', label: 'Combined' },
];

const fmt = (n) => n.toLocaleString('en-US');
const pct = (n, of) => (of ? `${Math.round((n / of) * 100)}%` : '0%');

const parseDay = (iso) => new Date(`${iso}T00:00:00`);

const bucketKey = (iso, bucket) => {
    const d = parseDay(iso);
    if (bucket === 'month') return iso.slice(0, 7);
    if (bucket === 'week') {
        d.setDate(d.getDate() - d.getDay());
        return d.toISOString().slice(0, 10);
    }
    return iso;
};

const bucketLabel = (key, bucket) => {
    if (bucket === 'month') {
        return parseDay(`${key}-01`).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }
    const label = parseDay(key).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    return bucket === 'week' ? `Week of ${label}` : label;
};

// Groups daily rows into day/week/month buckets, oldest first.
const groupSignups = (rows, bucket) => {
    const groups = new Map();
    for (const row of rows) {
        const key = bucketKey(row.date, bucket);
        const g = groups.get(key) ?? { key, total: 0, players: 0, hosts: 0, venues: 0 };
        g.total += row.total;
        g.players += row.players;
        g.hosts += row.hosts;
        g.venues += row.venues;
        groups.set(key, g);
    }
    return [...groups.values()];
};

const StatTile = ({ label, value, added, caption }) => (
    <div className={styles.tile}>
        <span className={styles.tileLabel}>{label}</span>
        <span className={styles.tileValue}>{fmt(value)}</span>
        <span className={styles.tileDelta}>
            <strong>+{fmt(added)}</strong> {caption}
        </span>
    </div>
);

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

const SignupChart = ({ buckets, role, bucket }) => {
    const [hover, setHover] = useState(null);
    const max = Math.max(1, ...buckets.map(b => b[role]));
    const peak = buckets.reduce((best, b) => (b[role] > (best?.[role] ?? -1) ? b : best), null);
    const labelEvery = Math.ceil(buckets.length / 6);
    // Evenly spaced, skipping any too close to the right edge to fit.
    const showAxisLabel = (i) => i % labelEvery === 0 && i < buckets.length - labelEvery / 2;

    return (
        <div className={styles.columnChart}>
            <div className={styles.columnGrid}>
                <span className={styles.gridValue} style={{ bottom: '100%' }}>{fmt(max)}</span>
                <span className={styles.gridValue} style={{ bottom: '50%' }}>{fmt(Math.round(max / 2))}</span>
                <span className={styles.gridLine} style={{ bottom: '100%' }} />
                <span className={styles.gridLine} style={{ bottom: '50%' }} />
            </div>
            <div className={styles.columns} onMouseLeave={() => setHover(null)}>
                {buckets.map((b, i) => (
                    <div
                        key={b.key}
                        className={styles.columnHit}
                        onMouseEnter={() => setHover(i)}
                        onFocus={() => setHover(i)}
                        onBlur={() => setHover(null)}
                        tabIndex={0}
                        aria-label={`${bucketLabel(b.key, bucket)}: ${fmt(b[role])} sign-ups`}
                    >
                        <div
                            className={`${styles.column} ${hover === i ? styles.columnHover : ''}`}
                            style={{ height: `${(b[role] / max) * 100}%` }}
                        />
                        {hover === i &&
                            <div className={`${styles.tooltip} ${i > buckets.length / 2 ? styles.tooltipLeft : ''}`}>
                                <span className={styles.tooltipTitle}>{bucketLabel(b.key, bucket)}</span>
                                <span><strong>{fmt(b[role])}</strong> sign-ups</span>
                            </div>
                        }
                    </div>
                ))}
            </div>
            <div className={styles.columnAxis}>
                {buckets.map((b, i) => (
                    <span key={b.key} className={styles.axisLabel}>
                        {showAxisLabel(i) ? bucketLabel(b.key, bucket).replace('Week of ', '') : ''}
                    </span>
                ))}
            </div>
            {peak && peak[role] > 0 &&
                <p className={styles.chartNote}>
                    Busiest: <strong>{bucketLabel(peak.key, bucket)}</strong> with {fmt(peak[role])} sign-ups
                </p>
            }
        </div>
    );
};

const GameChart = ({ games, base }) => {
    const total = games.reduce((n, g) => n + g.count, 0);
    const max = Math.max(1, ...games.map(g => g.count));

    return (
        <div className={styles.barChart}>
            {games.map(g => (
                <div key={g.game} className={styles.barRow} title={`${g.game}: ${fmt(g.count)} picks`}>
                    <span className={styles.barLabel}>{g.game}</span>
                    <div className={styles.barTrack}>
                        <div className={styles.bar} style={{ width: `${(g.count / max) * 100}%` }} />
                    </div>
                    <span className={styles.barValue}>
                        {fmt(g.count)} <span className={styles.barPct}>{pct(g.count, base)}</span>
                    </span>
                </div>
            ))}
            <p className={styles.chartNote}>
                {fmt(total)} picks from {fmt(base)} accounts. Accounts can pick more than one game,
                so percentages are share of accounts and add up to more than 100%.
            </p>
        </div>
    );
};

const OverviewTab = () => {
    const { session } = useAuth();
    const { data, loading, error } = useAdminAnalytics(session?.access_token);
    const [rangeKey, setRangeKey] = useState('30d');
    const [role, setRole] = useState('total');
    const [audience, setAudience] = useState('players');

    const range = RANGES.find(r => r.key === rangeKey);

    const inRange = useMemo(() => {
        if (!data) return [];
        return range.days ? data.signups.slice(-range.days) : data.signups;
    }, [data, range]);

    const added = useMemo(() => {
        const sum = (key) => inRange.reduce((n, d) => n + d[key], 0);
        return { total: sum('total'), players: sum('players'), hosts: sum('hosts'), venues: sum('venues') };
    }, [inRange]);

    const buckets = useMemo(() => groupSignups(inRange, range.bucket), [inRange, range]);

    const { gameRows, gameBase } = useMemo(() => {
        if (!data) return { gameRows: [], gameBase: 0 };
        const sources = audience === 'combined' ? [data.games.players, data.games.hosts] : [data.games[audience]];
        const counts = {};
        for (const src of sources) {
            for (const [game, n] of Object.entries(src)) counts[game] = (counts[game] ?? 0) + n;
        }
        const rows = Object.entries(counts)
            .map(([game, count]) => ({ game, count }))
            // "Other" always sits last so the ranking reads cleanly.
            .sort((a, b) => (a.game === 'Other') - (b.game === 'Other') || b.count - a.count);
        const base = audience === 'combined' ? data.totals.players + data.totals.hosts : data.totals[audience];
        return { gameRows: rows, gameBase: base };
    }, [data, audience]);

    if (loading) return <LoadingWheel />;
    if (error) return <p className={styles.error}>{getLoadErrorMessage(error, "Unable to load analytics right now.")}</p>;

    const topGame = gameRows.find(g => g.game !== 'Other');

    return (
        <>
            <p className={styles.subtitle}>
                Updated {new Date(data.generated_at).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}
            </p>

            <div className={styles.filterRow}>
                <span className={styles.filterLabel}>New accounts in</span>
                <Segmented options={RANGES} value={rangeKey} onChange={setRangeKey} label="Time range" />
            </div>

            <section className={styles.tiles} aria-label="Account totals">
                <StatTile label="Total accounts" value={data.totals.total} added={added.total} caption={range.caption} />
                <StatTile label="Player accounts" value={data.totals.players} added={added.players} caption={range.caption} />
                <StatTile label="Host accounts" value={data.totals.hosts} added={added.hosts} caption={range.caption} />
                <StatTile label="Venue accounts" value={data.totals.venues} added={added.venues} caption={range.caption} />
            </section>
            <p className={styles.footnote}>
                One account can be both a player and a host, so the role counts add up to more than the total.
            </p>

            <section className={styles.card}>
                <div className={styles.cardHeader}>
                    <div>
                        <h2 className={styles.cardTitle}>Accounts created</h2>
                        <p className={styles.cardSubtitle}>
                            {fmt(added[role])} {ROLES.find(r => r.key === role).label.toLowerCase()} · {range.caption}, by {range.bucket}
                        </p>
                    </div>
                    <Segmented options={ROLES} value={role} onChange={setRole} label="Account type" />
                </div>
                <SignupChart buckets={buckets} role={role} bucket={range.bucket} />
            </section>

            <section className={styles.card}>
                <div className={styles.cardHeader}>
                    <div>
                        <h2 className={styles.cardTitle}>Games picked at sign-up</h2>
                        <p className={styles.cardSubtitle}>
                            All time{topGame && <> · top game: <strong>{topGame.game}</strong> ({pct(topGame.count, gameBase)} of {audience === 'combined' ? 'accounts' : audience})</>}
                        </p>
                    </div>
                    <Segmented options={GAME_AUDIENCES} value={audience} onChange={setAudience} label="Audience" />
                </div>
                <GameChart games={gameRows} base={gameBase} />
            </section>
        </>
    );
};

const TABS = [
    { key: 'overview', label: 'Overview', Component: OverviewTab },
    { key: 'events', label: 'Events', Component: AdminEventsTab },
    { key: 'finance', label: 'Finance', Component: AdminFinanceTab },
];

export const AdminAnalytics = () => {
    // The open tab lives in the URL (?tab=events) so it survives a refresh and can be linked.
    const [params, setParams] = useSearchParams();
    const tab = TABS.find(t => t.key === params.get('tab')) ?? TABS[0];

    return (
        <div className={`standardContainer ${styles.page}`}>
            <title>uSync | Admin Analytics</title>
            <meta name="robots" content="noindex, nofollow" />

            <div className={styles.inner}>
                <header className={styles.header}>
                    <div>
                        <p className={styles.eyebrow}>Admin</p>
                        <h1 className={styles.title}>Analytics</h1>
                    </div>
                    {isMockAnalytics &&
                        <span className={styles.mockBadge} title="REACT_APP_ADMIN_ANALYTICS_MOCK is on">
                            Sample data
                        </span>
                    }
                </header>

                <nav className={styles.tabs} role="tablist" aria-label="Admin sections">
                    {TABS.map(t => (
                        <button
                            key={t.key}
                            type="button"
                            role="tab"
                            aria-selected={t.key === tab.key}
                            className={`${styles.tab} ${t.key === tab.key ? styles.tabActive : ''}`}
                            onClick={() => setParams(t.key === 'overview' ? {} : { tab: t.key }, { replace: true })}
                        >
                            {t.label}
                        </button>
                    ))}
                </nav>

                <div role="tabpanel">
                    <tab.Component />
                </div>
            </div>
        </div>
    );
};
