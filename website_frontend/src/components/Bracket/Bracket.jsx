import { useEffect, useRef, useState } from "react";
import { FaTrophy, FaSearchMinus, FaSearchPlus } from "react-icons/fa";
import { roundName, losersRoundName, isEntrant } from "utils/bracket";
import styles from "./Bracket.module.css";

const MIN_ZOOM = 0.4;
const MAX_ZOOM = 2;
const clampZoom = (z) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Math.round(z * 100) / 100));

// Ctrl/Cmd + scroll (or trackpad pinch) zooms the bracket instead of the page.
const ZoomFrame = ({ children }) => {
    const [zoom, setZoom] = useState(1);
    const frameRef = useRef(null);

    useEffect(() => {
        const el = frameRef.current;
        const onWheel = (e) => {
            if (!e.ctrlKey && !e.metaKey) return;
            e.preventDefault();
            setZoom(z => clampZoom(z * Math.exp(-e.deltaY * 0.0015)));
        };
        // Must be non-passive so preventDefault stops the browser zooming the whole page.
        el.addEventListener('wheel', onWheel, { passive: false });
        return () => el.removeEventListener('wheel', onWheel);
    }, []);

    return (
        <div className={styles.zoomFrame}>
            <div className={styles.zoomBar}>
                <span className={styles.zoomHint}>Ctrl + scroll to zoom</span>
                <button type="button" onClick={() => setZoom(z => clampZoom(z - 0.1))} aria-label="Zoom out" disabled={zoom <= MIN_ZOOM}><FaSearchMinus /></button>
                <button type="button" className={styles.zoomValue} onClick={() => setZoom(1)} title="Reset zoom">{Math.round(zoom * 100)}%</button>
                <button type="button" onClick={() => setZoom(z => clampZoom(z + 0.1))} aria-label="Zoom in" disabled={zoom >= MAX_ZOOM}><FaSearchPlus /></button>
            </div>
            <div className={styles.scroller} ref={frameRef}>
                <div style={{ zoom }}>{children}</div>
            </div>
        </div>
    );
};

const STATE_BADGES = {
    disputed: { label: 'DISPUTED', className: 'badgeDisputed' },
    no_show: { label: 'NO SHOW REPORTED', className: 'badgeNoShow' },
    awaiting: { label: '1 of 2 reported', className: 'badgeAwaiting' },
};

const Slot = ({ id, entrants, seed, score, isWinner, isLoser, isYou, forfeit }) => (
    <div className={`${styles.slot} ${isWinner ? styles.slotWinner : ''} ${isLoser ? styles.slotLoser : ''} ${isYou ? styles.slotYou : ''}`}>
        <span className={styles.seed}>{seed ?? ''}</span>
        <span className={styles.slotName}>
            {isEntrant(id) ? entrants[id]?.name : <em>{id ? 'Bye' : 'TBD'}</em>}
            {isYou && <span className={styles.youTag}>You</span>}
        </span>
        <span className={styles.score}>{forfeit && isLoser ? 'FF' : score ?? ''}</span>
    </div>
);

const MatchCard = ({ match, entrants, label, stateOf, onSelect, canSelect, viewerId }) => {
    const state = stateOf ? stateOf(match) : match.status;
    const done = match.status === 'complete';
    const clickable = onSelect && (canSelect ? canSelect(match, state) : (match.status === 'ready' || done));
    const badge = STATE_BADGES[state];
    const Tag = clickable ? 'button' : 'div';

    return (
        <Tag
            type={clickable ? 'button' : undefined}
            className={[
                styles.match,
                clickable && styles.matchClickable,
                state === 'ready' && onSelect && styles.matchReady,
                state === 'disputed' && styles.matchDisputed,
                state === 'no_show' && styles.matchNoShow,
                match.status === 'bye' && styles.matchBye,
            ].filter(Boolean).join(' ')}
            onClick={clickable ? () => onSelect(match) : undefined}
            aria-label={clickable ? `${done ? 'Edit' : 'Report'} result: ${entrants[match.a]?.name} vs ${entrants[match.b]?.name}` : undefined}
        >
            {label && <span className={styles.matchLabel}>{label}</span>}
            {['a', 'b'].map(side => (
                <Slot key={side} id={match[side]} entrants={entrants} seed={side === 'a' ? match.seedA : match.seedB}
                    score={done ? (side === 'a' ? match.scoreA : match.scoreB) : null}
                    isWinner={done && match.winner === match[side]} isLoser={done && match.winner !== match[side]}
                    isYou={viewerId && match[side] === viewerId} forfeit={match.forfeit} />
            ))}
            {badge && <span className={`${styles.badge} ${styles[badge.className]}`}>{badge.label}</span>}
            {!badge && clickable && state === 'ready' && <span className={styles.reportHint}>Report score</span>}
        </Tag>
    );
};

// One elimination tree. `merges[r]` says whether round r feeds the next round
// two-into-one (an elbow connector) or one-into-one (a straight line).
const Tree = ({ rounds, titleOf, merges, cardProps }) => (
    <div className={styles.tree}>
        {rounds.map((round, r) => {
            const last = r === rounds.length - 1;
            return (
                <div key={r} className={styles.round}>
                    <h4 className={styles.roundTitle}>{titleOf(r)}</h4>
                    <div className={styles.roundMatches}>
                        {round.map(match => {
                            const out = last ? '' : merges[r] ? (match.slot % 2 ? styles.outUp : styles.outDown) : styles.outStraight;
                            return (
                                <div key={match.id} className={`${styles.matchWrap} ${r > 0 ? styles.hasIn : ''} ${match.status === 'empty' ? '' : out}`}>
                                    {match.status === 'empty'
                                        ? <div className={styles.emptySlot} />
                                        : <MatchCard match={match} {...cardProps} />}
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        })}
    </div>
);

const Champion = ({ name }) => (
    <div className={styles.champion}>
        <FaTrophy className={styles.trophy} />
        <span className={styles.championLabel}>Champion</span>
        <span className={styles.championName}>{name}</span>
    </div>
);

const SingleElim = ({ built, cardProps }) => (
    <div className={styles.treeRow}>
        <Tree rounds={built.rounds} titleOf={r => roundName(r, built.rounds.length)} merges={built.rounds.map(() => true)} cardProps={cardProps} />
        {built.champion && <div className={styles.championCol}><Champion name={cardProps.entrants[built.champion]?.name} /></div>}
    </div>
);

const DoubleElim = ({ built, cardProps }) => {
    const lr = built.losersRounds;
    return (
        <div className={styles.doubleElim}>
            <div className={styles.treeRow}>
                <div>
                    <h3 className={styles.bracketHeading}>Winners bracket</h3>
                    <Tree rounds={built.rounds} titleOf={r => roundName(r, built.rounds.length, 'Winners')}
                        merges={built.rounds.map(() => true)} cardProps={cardProps} />
                </div>
                <div className={styles.grandCol}>
                    <h3 className={styles.bracketHeading}>Grand final</h3>
                    {built.grandFinal.map((match, i) => (
                        <div key={match.id} className={styles.grandMatch}>
                            <h4 className={styles.roundTitle}>{i === 0 ? 'Grand Final' : 'Grand Final Reset'}</h4>
                            {match.status === 'empty' ? null : <MatchCard match={match} {...cardProps} />}
                        </div>
                    ))}
                    {built.grandFinal.length === 1 && built.grandFinal[0].status !== 'complete' &&
                        <p className={styles.grandNote}>If the losers-bracket side wins, a reset match decides it.</p>}
                    {built.champion && <Champion name={cardProps.entrants[built.champion]?.name} />}
                </div>
            </div>
            {lr.length > 0 &&
                <div>
                    <h3 className={styles.bracketHeading}>Losers bracket</h3>
                    <Tree rounds={lr} titleOf={r => losersRoundName(r, lr.length)}
                        merges={lr.map((round, r) => r < lr.length - 1 && lr[r + 1].length < round.length)} cardProps={cardProps} />
                </div>
            }
        </div>
    );
};

const PoolPlay = ({ built, cardProps }) => (
    <div className={styles.rr}>
        <div className={styles.tableWrap}>
            <table className={styles.standings}>
                <thead>
                    <tr><th>#</th><th>Entrant</th><th>W</th><th>L</th><th>Played</th><th>+/-</th></tr>
                </thead>
                <tbody>
                    {built.standings.map((row, i) => (
                        <tr key={row.id} className={i === 0 && row.wins > 0 ? styles.leader : ''}>
                            <td>{i + 1}</td>
                            <td>{cardProps.entrants[row.id]?.name}</td>
                            <td>{row.wins}</td>
                            <td>{row.losses}</td>
                            <td>{row.played}</td>
                            <td>{row.diff > 0 ? `+${row.diff}` : row.diff}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className={styles.rrRounds}>
            {built.rounds.map((round, r) => (
                <div key={r} className={styles.rrRound}>
                    <h4 className={styles.roundTitle}>Round {r + 1}</h4>
                    {round.map(match => <MatchCard key={match.id} match={match} {...cardProps} />)}
                </div>
            ))}
        </div>
    </div>
);

// format: 'single_elim' | 'double_elim' | 'round_robin'.
// onSelect makes matches clickable (canSelect narrows which); stateOf(match) adds
// report states (disputed / no-show / awaiting); viewerId highlights "your" matches.
export const Bracket = ({ format, built, entrants, onSelect, canSelect, stateOf, viewerId }) => {
    const cardProps = { entrants, onSelect, canSelect, stateOf, viewerId };
    return (
        <ZoomFrame>
            {format === 'round_robin' && <PoolPlay built={built} cardProps={cardProps} />}
            {format === 'double_elim' && <DoubleElim built={built} cardProps={cardProps} />}
            {format === 'single_elim' && <SingleElim built={built} cardProps={cardProps} />}
        </ZoomFrame>
    );
};

const Stepper = ({ value, onChange, max, name }) => (
    <div className={styles.stepper}>
        <button type="button" onClick={() => onChange(v => Math.max(0, v - 1))} aria-label={`Lower ${name}'s score`}>−</button>
        <span className={styles.stepValue}>{value}</span>
        <button type="button" onClick={() => onChange(v => Math.min(max, v + 1))} aria-label={`Raise ${name}'s score`}>+</button>
    </div>
);

const timeAgo = (iso) => {
    const mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins} min ago`;
    return `${Math.round(mins / 60)} h ago`;
};

// Score entry for one match.
// mode 'host': the host's call is final; shows both players' reports and any no-show report.
// mode 'player': the viewer reports their own match; the opponent has to agree.
export const ReportMatchDialog = ({
    match, entrants, bestOf, mode = 'host', viewerId, reports = {}, noShow,
    onSave, onClear, onForfeit, onDismissNoShow, onClose,
}) => {
    const mine = mode === 'player' ? reports[viewerId] : null;
    const start = match.status === 'complete' ? [match.scoreA, match.scoreB] : mine ? [mine.scoreA, mine.scoreB] : [0, 0];
    const [scoreA, setScoreA] = useState(start[0]);
    const [scoreB, setScoreB] = useState(start[1]);
    const maxScore = Math.ceil(bestOf / 2);
    const name = (id) => entrants[id]?.name;

    useEffect(() => {
        const onKey = (e) => e.key === 'Escape' && onClose();
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [onClose]);

    const tied = scoreA === scoreB;
    const winnerName = tied ? null : name(scoreA > scoreB ? match.a : match.b);
    const reportList = Object.entries(reports);
    const claim = (r) => `${name(r.scoreA > r.scoreB ? r.a : r.b)} won ${Math.max(r.scoreA, r.scoreB)}-${Math.min(r.scoreA, r.scoreB)}`;

    return (
        <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="report-title" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
            <div className={styles.dialog}>
                <h3 id="report-title" className={styles.dialogTitle}>
                    {mode === 'player' ? 'Report your result' : match.status === 'complete' ? 'Edit result' : 'Report result'}
                </h3>
                <p className={styles.dialogHint}>
                    Best of {bestOf} · first to {maxScore}
                    {mode === 'player' && ' · your opponent has to confirm'}
                </p>

                {mode === 'host' && noShow &&
                    <div className={`${styles.notice} ${styles.noticeNoShow}`}>
                        <strong>NO SHOW REPORTED</strong>
                        <p>{name(noShow.reportedBy)} says {name(noShow.against)} didn't show up ({timeAgo(noShow.at)}).</p>
                        <div className={styles.noticeActions}>
                            <button type="button" className={styles.primaryBtn} onClick={() => onForfeit(noShow.reportedBy)}>
                                Advance {name(noShow.reportedBy)}
                            </button>
                            <button type="button" className={styles.ghostBtn} onClick={onDismissNoShow}>Dismiss report</button>
                        </div>
                    </div>
                }

                {mode === 'host' && reportList.length > 0 &&
                    <div className={`${styles.notice} ${reportList.length > 1 ? styles.noticeDisputed : ''}`}>
                        {reportList.length > 1 && <strong>DISPUTED</strong>}
                        {reportList.map(([who, r]) => (
                            <p key={who}><b>{name(who)}</b> reported: {claim(r)} <span className={styles.ago}>({timeAgo(r.at)})</span></p>
                        ))}
                        {reportList.length === 1 && <p className={styles.ago}>Waiting for {name(reportList[0][0] === match.a ? match.b : match.a)} to confirm.</p>}
                    </div>
                }

                {mode === 'player' && Object.keys(reports).length > 1 &&
                    <div className={`${styles.notice} ${styles.noticeDisputed}`}>
                        <strong>DISPUTED</strong>
                        <p>You and your opponent reported different winners. The host will decide - you can update your report below.</p>
                    </div>
                }
                {mode === 'player' && mine && Object.keys(reports).length === 1 &&
                    <div className={styles.notice}><p>You reported: {claim(mine)}. Waiting for your opponent to confirm.</p></div>
                }

                {[[match.a, scoreA, setScoreA], [match.b, scoreB, setScoreB]].map(([id, value, set]) => (
                    <div key={id} className={styles.reportRow}>
                        <span className={styles.reportName}>{name(id)}{id === viewerId && <span className={styles.youTag}>You</span>}</span>
                        <Stepper value={value} onChange={set} max={maxScore} name={name(id)} />
                    </div>
                ))}

                <p className={styles.dialogStatus}>
                    {tied ? 'Scores can\'t be tied.' : <>Winner: <strong>{winnerName}</strong>{mode === 'host' ? ' advances' : ''}</>}
                </p>

                <div className={styles.dialogActions}>
                    {mode === 'host' && match.status === 'complete' &&
                        <button type="button" className={styles.dangerBtn} onClick={onClear}>Clear result</button>}
                    <span className={styles.spacer} />
                    <button type="button" className={styles.ghostBtn} onClick={onClose}>Cancel</button>
                    <button type="button" className={styles.primaryBtn} disabled={tied} onClick={() => onSave(scoreA, scoreB)}>
                        {mode === 'player' ? 'Submit report' : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    );
};
