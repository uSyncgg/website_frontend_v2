import { useState } from "react";
import styles from './AccountUI.module.css';

const money = (n) => `$${Number(n || 0).toLocaleString()}`;
const pct = (w, l) => (w + l === 0 ? 0 : (w / (w + l)) * 100);

// Headline numbers, above everything else on the player side.
export const MetricStrip = ({ metrics = [] }) => (
    <div className={styles.metricStrip}>
        {metrics.map(m => (
            <div className={styles.metricTile} key={m.label}>
                <span className={styles.metricLabel}>{m.label}</span>
                <span className={`${styles.metricValue} ${m.tone === 'money' ? styles.metricValueMoney : ''}`}>
                    {m.record
                        ? (<><span className={styles.win}>{m.record.w}</span><span className={styles.dash}>–</span><span className={styles.loss}>{m.record.l}</span></>)
                        : m.value}
                </span>
                {m.sub && <span className={styles.metricSub}>{m.sub}</span>}
            </div>
        ))}
    </div>
);

// Earnings split two ways — by game, or by the kind of event it was won at.
export const EarningsCard = ({ earnings, allowByGame = true }) => {
    const [groupBy, setGroupBy] = useState('game');
    // Scoped to one title there's only one "game" to split by, so the toggle
    // goes away and the event-type breakdown is all that's left.
    const key = allowByGame ? groupBy : 'type';
    const rows = (key === 'game' ? earnings.byGame : earnings.byType) || [];
    const max = Math.max(...rows.map(r => r.value), 1);

    return (
        <>
            {allowByGame && (
                <div className={styles.sectionToolbar}>
                    <div className={styles.segmented}>
                        <button
                            type="button"
                            className={`${styles.segmentedBtn} ${groupBy === 'game' ? styles.segmentedBtnActive : ''}`}
                            onClick={() => setGroupBy('game')}
                        >
                            By game
                        </button>
                        <button
                            type="button"
                            className={`${styles.segmentedBtn} ${groupBy === 'type' ? styles.segmentedBtnActive : ''}`}
                            onClick={() => setGroupBy('type')}
                        >
                            By event type
                        </button>
                    </div>
                </div>
            )}

            <div className={styles.earningsTotal}>
                <span className={styles.earningsAmount}>{money(earnings.total)}</span>
                <span className={styles.earningsCaption}>Lifetime, verified payouts</span>
            </div>

            <div className={styles.breakdownList}>
                {rows.map(row => (
                    <div className={styles.breakdownRow} key={row.label}>
                        <span className={styles.breakdownName}>{row.label}</span>
                        <span className={styles.breakdownAmount}>{money(row.value)}</span>
                        <span className={styles.breakdownTrack}>
                            <i style={{ width: `${(row.value / max * 100).toFixed(1)}%` }} />
                        </span>
                        <span className={styles.breakdownPct}>
                            {(row.value / (earnings.total || 1) * 100).toFixed(1)}% of total
                        </span>
                    </div>
                ))}
                {rows.length === 0 && <p className={styles.emptyState}>No earnings recorded yet.</p>}
            </div>
        </>
    );
};

// Overall record plus the same split per format, so a strong wager record
// doesn't get hidden inside one lifetime number.
export const MatchRecordCard = ({ record }) => {
    const { overall = { w: 0, l: 0 }, breakdown = [] } = record || {};
    const total = overall.w + overall.l;
    const winRate = pct(overall.w, overall.l);
    const circumference = 2 * Math.PI * 33;

    return (
        <>
            <div className={styles.recordTop}>
                <div>
                    <div className={styles.recordScore}>
                        <span className={styles.win}>{overall.w}</span>
                        <span className={styles.dash}>–</span>
                        <span className={styles.loss}>{overall.l}</span>
                    </div>
                    <div className={styles.recordCaption}>Wins – Losses · {total} matches</div>
                </div>

                <div className={styles.winRing}>
                    <svg viewBox="0 0 80 80" aria-hidden="true">
                        <defs>
                            <linearGradient id="usyncWinRate" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#9b6fe0" />
                                <stop offset="100%" stopColor="#b18af0" />
                            </linearGradient>
                        </defs>
                        <circle className={styles.winRingTrack} cx="40" cy="40" r="33" />
                        <circle
                            className={styles.winRingValue}
                            cx="40" cy="40" r="33"
                            strokeDasharray={circumference}
                            strokeDashoffset={circumference * (1 - winRate / 100)}
                        />
                    </svg>
                    <div>
                        <div className={styles.winRingValueText}>{winRate.toFixed(1)}%</div>
                        <div className={styles.recordCaption}>Win rate</div>
                    </div>
                </div>
            </div>

            {breakdown.map(row => {
                const rowTotal = row.w + row.l;
                const rowPct = pct(row.w, row.l);
                return (
                    <div className={styles.recordRow} key={row.label}>
                        <span className={styles.recordRowName}>{row.label}</span>
                        <span className={styles.recordRowScore}>
                            <span className={styles.win}>{row.w}</span>
                            <span className={styles.dash}>–</span>
                            <span className={styles.loss}>{row.l}</span>
                        </span>
                        <span className={styles.recordSplit}>
                            <i className={styles.recordSplitWin} style={{ width: `${rowPct.toFixed(1)}%` }} />
                            <i className={styles.recordSplitLoss} style={{ width: `${(100 - rowPct).toFixed(1)}%` }} />
                        </span>
                        <span className={styles.recordMeta}>
                            <span>{rowPct.toFixed(1)}% win rate</span>
                            <span className={styles.metaSep}>/</span>
                            <span>{rowTotal} matches</span>
                            {row.note && <><span className={styles.metaSep}>/</span><span>{row.note}</span></>}
                        </span>
                    </div>
                );
            })}
            {breakdown.length === 0 && <p className={styles.emptyState}>No matches played yet.</p>}
        </>
    );
};

// In-game ranks synced per title — separate from the uSync match record above.
export const RankList = ({ ranks = [] }) => (
    <>
        {ranks.map(rank => (
            <div className={styles.listRow} key={rank.game}>
                <span
                    className={styles.listBadge}
                    style={{ background: `radial-gradient(120% 90% at 50% 14%, ${rank.tint}55 0%, transparent 62%), linear-gradient(155deg,#241D33,#171320)` }}
                >
                    {rank.short}
                </span>
                <span className={styles.listBody}>
                    <span className={styles.listEyebrow}>{rank.game}</span>
                    <span className={styles.listTitle}>{rank.tier}</span>
                </span>
                <span className={styles.listTrailing}>{rank.rating}</span>
            </div>
        ))}
        {ranks.length === 0 && <p className={styles.emptyState}>No ranks synced yet.</p>}
    </>
);

export const TeamList = ({ teams = [] }) => (
    <>
        {teams.map(team => (
            <div className={styles.listRow} key={team.name}>
                <span className={styles.listBadge}>{team.short}</span>
                <span className={styles.listBody}>
                    <span className={styles.listTitleRow}>
                        <span className={styles.listTitle}>{team.name}</span>
                        <span className={styles.badge}>{team.type}</span>
                        {team.officer && <span className={`${styles.badge} ${styles.badgeGold}`}>Officer</span>}
                    </span>
                    <span className={styles.listEyebrow}>{team.role} · {team.game}</span>
                </span>
            </div>
        ))}
        {teams.length === 0 && <p className={styles.emptyState}>Not on a team yet.</p>}
    </>
);

/**
 * A count-per-label breakdown with a proportional bar — what a venue runs, or
 * which titles it runs it in. Same bar language as earnings so the two panels
 * read as one system, but the numbers are counts rather than money.
 */
export const BreakdownList = ({ rows = [], unit = "" }) => {
    const max = Math.max(...rows.map(r => r.value), 1);
    const total = rows.reduce((n, r) => n + r.value, 0);

    return (
        <div className={styles.breakdownList}>
            {rows.map(row => (
                <div className={styles.breakdownRow} key={row.label}>
                    <span className={styles.breakdownName}>{row.label}</span>
                    <span className={styles.breakdownAmount}>{row.value}</span>
                    <span className={styles.breakdownTrack}>
                        <i style={{ width: `${(row.value / max * 100).toFixed(1)}%` }} />
                    </span>
                    <span className={styles.breakdownPct}>
                        {(row.value / (total || 1) * 100).toFixed(0)}% of {unit || "total"}
                    </span>
                </div>
            ))}
            {rows.length === 0 && <p className={styles.emptyState}>Nothing here yet.</p>}
        </div>
    );
};
