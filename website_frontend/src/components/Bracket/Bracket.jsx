import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FaTrophy, FaSearchMinus, FaSearchPlus, FaExpand } from "react-icons/fa";
import { roundName, losersRoundName, isEntrant, placements } from "utils/bracket";
import styles from "./Bracket.module.css";

const MIN_ZOOM = 0.3;
const MAX_ZOOM = 2.5;
const DRAG_THRESHOLD = 4;
const clampZoom = (z) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z));

// The bracket sits on a canvas you can grab and drag around (open-hand cursor)
// and zoom with the scroll wheel, toward the cursor - like a map. A short drag
// doesn't count as a click, so matches stay clickable.
const PanZoom = ({ children }) => {
    const frameRef = useRef(null);
    const contentRef = useRef(null);
    const drag = useRef(null);
    const justDragged = useRef(false);
    const [view, setView] = useState({ x: 0, y: 0, zoom: 1 });
    const [dragging, setDragging] = useState(false);
    const [height, setHeight] = useState(320);

    // Frame height follows the bracket's natural height, within limits.
    useLayoutEffect(() => {
        const el = contentRef.current;
        const measure = () => setHeight(Math.max(260, Math.min(el.offsetHeight + 24, window.innerHeight * 0.75)));
        measure();
        const ro = new ResizeObserver(measure);
        ro.observe(el);
        return () => ro.disconnect();
    }, []);

    // Zoom so the point under (cx, cy) stays put.
    const zoomAt = (factor, cx, cy) => setView(v => {
        const zoom = clampZoom(v.zoom * factor);
        const k = zoom / v.zoom;
        return { zoom, x: cx - (cx - v.x) * k, y: cy - (cy - v.y) * k };
    });

    const zoomCenter = (factor) => {
        const r = frameRef.current.getBoundingClientRect();
        zoomAt(factor, r.width / 2, r.height / 2);
    };

    const fit = () => {
        const frame = frameRef.current.getBoundingClientRect();
        const w = contentRef.current.offsetWidth;
        const h = contentRef.current.offsetHeight;
        const zoom = clampZoom(Math.min(1, (frame.width - 24) / w, (frame.height - 24) / h));
        setView({ zoom, x: 12, y: 12 });
    };

    useEffect(() => {
        const el = frameRef.current;
        const onWheel = (e) => {
            e.preventDefault();
            const r = el.getBoundingClientRect();
            zoomAt(Math.exp(-e.deltaY * 0.0015), e.clientX - r.left, e.clientY - r.top);
        };
        // Non-passive so the page doesn't scroll while zooming the bracket.
        el.addEventListener('wheel', onWheel, { passive: false });
        return () => el.removeEventListener('wheel', onWheel);
    }, []);

    // Every finger/mouse currently down on the canvas, by pointer id.
    const pointers = useRef(new Map());
    const pinch = useRef(null);
    const viewRef = useRef(view);
    viewRef.current = view;

    const local = (e) => {
        const r = frameRef.current.getBoundingClientRect();
        return { x: e.clientX - r.left, y: e.clientY - r.top };
    };

    // Capture keeps the gesture going if a finger slides off the canvas; it can
    // fail for a pointer the browser no longer tracks, which is harmless.
    const capture = (id) => {
        try {
            frameRef.current.setPointerCapture(id);
        } catch {
            // ignore
        }
    };

    const startDrag = (id, p) => {
        drag.current = { startX: p.x, startY: p.y, x: viewRef.current.x, y: viewRef.current.y, moved: false, id };
    };

    // Two fingers: zoom around the midpoint between them (like a map); moving
    // both fingers together pans.
    const startPinch = () => {
        const [p1, p2] = [...pointers.current.values()];
        pinch.current = {
            dist: Math.hypot(p2.x - p1.x, p2.y - p1.y) || 1,
            mid: { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 },
            view: viewRef.current,
        };
        if (drag.current) drag.current.moved = true; // a pinch is never a click
        setDragging(true);
    };

    const onPointerDown = (e) => {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        const p = local(e);
        pointers.current.set(e.pointerId, p);
        if (pointers.current.size === 1) startDrag(e.pointerId, p);
        if (pointers.current.size === 2) {
            startPinch();
            capture(e.pointerId);
        }
    };

    const onPointerMove = (e) => {
        if (!pointers.current.has(e.pointerId)) return;
        const p = local(e);
        pointers.current.set(e.pointerId, p);

        if (pinch.current && pointers.current.size >= 2) {
            const [p1, p2] = [...pointers.current.values()];
            const start = pinch.current;
            const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
            const mid = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
            const zoom = clampZoom(start.view.zoom * dist / start.dist);
            const k = zoom / start.view.zoom;
            setView({ zoom, x: mid.x - (start.mid.x - start.view.x) * k, y: mid.y - (start.mid.y - start.view.y) * k });
            return;
        }

        const d = drag.current;
        if (!d || d.id !== e.pointerId) return;
        const dx = p.x - d.startX;
        const dy = p.y - d.startY;
        if (!d.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
        if (!d.moved) {
            d.moved = true;
            capture(d.id);
            setDragging(true);
        }
        setView(v => ({ ...v, x: d.x + dx, y: d.y + dy }));
    };

    const endDrag = (e) => {
        pointers.current.delete(e.pointerId);
        const wasGesture = drag.current?.moved || pinch.current;
        if (pointers.current.size === 1) {
            // Lifting one finger of a pinch: carry on panning with the other.
            pinch.current = null;
            const [[id, p]] = [...pointers.current.entries()];
            startDrag(id, p);
            drag.current.moved = true;
            return;
        }
        if (pointers.current.size === 0) {
            if (wasGesture) {
                justDragged.current = true;
                setTimeout(() => { justDragged.current = false; }, 0);
            }
            pinch.current = null;
            drag.current = null;
            setDragging(false);
        }
    };

    return (
        <div className={styles.zoomFrame}>
            <div className={styles.zoomBar}>
                <span className={styles.zoomHint}>Drag to move · scroll or pinch to zoom</span>
                <button type="button" onClick={() => zoomCenter(1 / 1.2)} aria-label="Zoom out" disabled={view.zoom <= MIN_ZOOM}><FaSearchMinus /></button>
                <button type="button" className={styles.zoomValue} onClick={() => setView({ x: 0, y: 0, zoom: 1 })} title="Reset to 100%">{Math.round(view.zoom * 100)}%</button>
                <button type="button" onClick={() => zoomCenter(1.2)} aria-label="Zoom in" disabled={view.zoom >= MAX_ZOOM}><FaSearchPlus /></button>
                <button type="button" onClick={fit} aria-label="Fit bracket to view" title="Fit to view"><FaExpand /></button>
            </div>
            <div
                ref={frameRef}
                className={`${styles.canvas} ${dragging ? styles.canvasDragging : ''}`}
                style={{ height }}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                // Swallow the click that ends a drag so it doesn't open a match.
                onClickCapture={(e) => { if (justDragged.current) { e.stopPropagation(); e.preventDefault(); } }}
            >
                <div
                    ref={contentRef}
                    className={styles.canvasContent}
                    style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.zoom})` }}
                >
                    {children}
                </div>
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

const PLACES = [
    { label: '1st place', className: 'podiumFirst' },
    { label: '2nd place', className: 'podiumSecond' },
    { label: '3rd place', className: 'podiumThird' },
];

// Final standings, shown above the bracket once the event is decided.
const Podium = ({ places, entrants }) => (
    <div className={styles.podium} aria-label="Final placings">
        {PLACES.map((place, i) => places[i] && (
            <div key={place.label} className={`${styles.podiumSpot} ${styles[place.className]}`}>
                <FaTrophy className={styles.podiumIcon} aria-hidden="true" />
                <span className={styles.podiumLabel}>{place.label}</span>
                <span className={styles.podiumName}>{entrants[places[i]]?.name}</span>
            </div>
        ))}
    </div>
);

const SingleElim = ({ built, cardProps }) => (
    <div className={styles.treeRow}>
        <Tree rounds={built.rounds} titleOf={r => roundName(r, built.rounds.length)} merges={built.rounds.map(() => true)} cardProps={cardProps} />
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
    const places = placements(format, built);
    return (
        <>
        {places && <Podium places={places} entrants={entrants} />}
        <PanZoom>
            {format === 'round_robin' && <PoolPlay built={built} cardProps={cardProps} />}
            {format === 'double_elim' && <DoubleElim built={built} cardProps={cardProps} />}
            {format === 'single_elim' && <SingleElim built={built} cardProps={cardProps} />}
        </PanZoom>
        </>
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
