import { useMemo, useState } from "react";
import { LoadingWheel } from "components";
import { useAuth, useAdminEvents } from "hooks";
import { getLoadErrorMessage } from "utils/apiError";
import styles from "./AdminAnalytics.module.css";

// Events tab of /admin/analytics: every listing by when it was last updated, flagging
// ones that haven't been touched in 2+ months (yellow) or 4+ months (red).

const TYPE_LABELS = { LAN: 'LAN', LEAGUE: 'League', LEAGUE_GROUP: 'League group', WAGER: 'Wager', XP: 'Head-to-head' };
const TYPES = [{ key: 'all', label: 'All' }, ...Object.entries(TYPE_LABELS).map(([key, label]) => ({ key, label }))];

const SORTS = {
    updated: (a, b) => b.updatedMs - a.updatedMs,
    game: (a, b) => a.game.localeCompare(b.game) || b.updatedMs - a.updatedMs,
};

// The backend stores UTC times without a zone marker.
const parseUpdated = (iso) => new Date(/Z|[+-]\d\d:\d\d$/.test(iso) ? iso : `${iso}Z`);

const monthsAgo = (n) => {
    const d = new Date();
    d.setMonth(d.getMonth() - n);
    return d.getTime();
};

const daysAgoLabel = (ms) => {
    const days = Math.floor((Date.now() - ms) / 86400000);
    if (days <= 0) return 'today';
    if (days === 1) return 'yesterday';
    return `${days} days ago`;
};

export const AdminEventsTab = () => {
    const { session } = useAuth();
    const { data, loading, error } = useAdminEvents(session?.access_token);
    const [game, setGame] = useState('all');
    const [type, setType] = useState('all');
    const [sort, setSort] = useState('updated');

    const events = useMemo(() => {
        if (!data) return [];
        const twoMonths = monthsAgo(2);
        const fourMonths = monthsAgo(4);
        return data.events.map(e => {
            const updatedMs = parseUpdated(e.updated_at).getTime();
            const age = updatedMs < fourMonths ? 'stale' : updatedMs < twoMonths ? 'aging' : 'fresh';
            return { ...e, updatedMs, age };
        });
    }, [data]);

    const games = useMemo(() => [...new Set(events.map(e => e.game))].sort(), [events]);

    const shown = useMemo(() => events
        .filter(e => (game === 'all' || e.game === game) && (type === 'all' || e.event_type === type))
        .sort(SORTS[sort]), [events, game, type, sort]);

    const counts = useMemo(() => ({
        stale: shown.filter(e => e.age === 'stale').length,
        aging: shown.filter(e => e.age === 'aging').length,
    }), [shown]);

    if (loading) return <LoadingWheel />;
    if (error) return <p className={styles.error}>{getLoadErrorMessage(error, "Unable to load events right now.")}</p>;

    const sortHeader = (key, label) => (
        <th aria-sort={sort === key ? (key === 'updated' ? 'descending' : 'ascending') : 'none'}>
            <button type="button" className={`${styles.sortButton} ${sort === key ? styles.sortActive : ''}`} onClick={() => setSort(key)}>
                {label}{sort === key && <span aria-hidden="true">{key === 'updated' ? ' ↓' : ' ↑'}</span>}
            </button>
        </th>
    );

    return (
        <>
            <div className={styles.filterRow}>
                <label className={styles.filterLabel} htmlFor="events-game">Game</label>
                <select id="events-game" className={styles.select} value={game} onChange={e => setGame(e.target.value)}>
                    <option value="all">All games</option>
                    {games.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
                <span className={styles.filterLabel}>Type</span>
                <div className={styles.segmented} role="group" aria-label="Event type">
                    {TYPES.map(t => (
                        <button
                            key={t.key}
                            type="button"
                            className={`${styles.segment} ${type === t.key ? styles.segmentActive : ''}`}
                            aria-pressed={type === t.key}
                            onClick={() => setType(t.key)}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>
            </div>

            <section className={styles.card}>
                <div className={styles.cardHeader}>
                    <div>
                        <h2 className={styles.cardTitle}>Events by last update</h2>
                        <p className={styles.cardSubtitle}>{shown.length.toLocaleString('en-US')} events</p>
                    </div>
                    <div className={styles.legend}>
                        <span className={styles.legendItem}><span className={`${styles.swatch} ${styles.swatchAging}`} />Not updated in 2+ months ({counts.aging})</span>
                        <span className={styles.legendItem}><span className={`${styles.swatch} ${styles.swatchStale}`} />Not updated in 4+ months ({counts.stale})</span>
                    </div>
                </div>

                <div className={styles.tableWrap}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Event</th>
                                <th>Type</th>
                                {sortHeader('game', 'Game')}
                                <th>Status</th>
                                {sortHeader('updated', 'Last updated')}
                                <th>Updated by</th>
                            </tr>
                        </thead>
                        <tbody>
                            {shown.map(e => (
                                <tr key={e.id} className={e.age === 'stale' ? styles.rowStale : e.age === 'aging' ? styles.rowAging : undefined}>
                                    <td className={styles.eventName}>{e.name}</td>
                                    <td>{TYPE_LABELS[e.event_type] ?? e.event_type}</td>
                                    <td>{e.game}</td>
                                    <td className={styles.status}>{e.status}</td>
                                    <td>
                                        {new Date(e.updatedMs).toLocaleDateString('en-US', { dateStyle: 'medium' })}
                                        <span className={styles.updatedAgo}>
                                            {daysAgoLabel(e.updatedMs)}
                                            {e.age !== 'fresh' && <> · {e.age === 'stale' ? '4+ months' : '2+ months'}</>}
                                        </span>
                                    </td>
                                    <td className={styles.updatedBy}>{e.updated_by ?? 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {!shown.length && <p className={styles.chartNote}>No events match these filters.</p>}
                </div>
            </section>
        </>
    );
};
