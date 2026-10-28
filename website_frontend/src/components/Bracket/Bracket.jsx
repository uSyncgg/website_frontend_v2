import { useEffect, useState } from "react";
import { FaTrophy } from "react-icons/fa";
import { roundName } from "utils/bracket";
import styles from "./Bracket.module.css";

const Slot = ({ entrant, seed, score, isWinner, isLoser, placeholder }) => (
    <div className={`${styles.slot} ${isWinner ? styles.slotWinner : ''} ${isLoser ? styles.slotLoser : ''}`}>
        <span className={styles.seed}>{seed ?? ''}</span>
        <span className={styles.slotName}>{entrant ? entrant.name : <em>{placeholder}</em>}</span>
        <span className={styles.score}>{score ?? ''}</span>
    </div>
);

const MatchCard = ({ match, entrants, label, onSelect }) => {
    const a = entrants[match.a];
    const b = entrants[match.b];
    const done = match.status === 'complete';
    const clickable = onSelect && (match.status === 'ready' || done);
    const Tag = clickable ? 'button' : 'div';

    return (
        <Tag
            type={clickable ? 'button' : undefined}
            className={`${styles.match} ${clickable ? styles.matchClickable : ''} ${match.status === 'ready' ? styles.matchReady : ''} ${match.status === 'bye' ? styles.matchBye : ''}`}
            onClick={clickable ? () => onSelect(match) : undefined}
            aria-label={clickable ? `${done ? 'Edit' : 'Report'} result: ${a?.name} vs ${b?.name}` : undefined}
        >
            {label && <span className={styles.matchLabel}>{label}</span>}
            <Slot entrant={a} seed={match.seedA} score={done ? match.scoreA : null}
                isWinner={done && match.winner === match.a} isLoser={done && match.winner !== match.a}
                placeholder={match.status === 'bye' ? 'Bye' : 'TBD'} />
            <Slot entrant={b} seed={match.seedB} score={done ? match.scoreB : null}
                isWinner={done && match.winner === match.b} isLoser={done && match.winner !== match.b}
                placeholder={match.status === 'bye' ? 'Bye' : 'TBD'} />
            {match.status === 'ready' && onSelect && <span className={styles.reportHint}>Report score</span>}
        </Tag>
    );
};

const EliminationBracket = ({ built, entrants, onSelect }) => (
    <div className={styles.scroller}>
        <div className={styles.tree}>
            {built.rounds.map((round, r) => (
                <div key={r} className={styles.round}>
                    <h4 className={styles.roundTitle}>{roundName(r, built.rounds.length)}</h4>
                    <div className={styles.roundMatches}>
                        {round.map(match => (
                            <div key={match.id} className={`${styles.matchWrap} ${r > 0 ? styles.hasIn : ''} ${r < built.rounds.length - 1 ? (match.slot % 2 ? styles.outUp : styles.outDown) : ''}`}>
                                <MatchCard match={match} entrants={entrants} onSelect={onSelect} />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            {built.champion &&
                <div className={styles.championCol}>
                    <div className={styles.champion}>
                        <FaTrophy className={styles.trophy} />
                        <span className={styles.championLabel}>Champion</span>
                        <span className={styles.championName}>{entrants[built.champion]?.name}</span>
                    </div>
                </div>
            }
        </div>
    </div>
);

const RoundRobin = ({ built, entrants, onSelect }) => (
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
                            <td>{entrants[row.id]?.name}</td>
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
                    {round.map(match => <MatchCard key={match.id} match={match} entrants={entrants} onSelect={onSelect} />)}
                </div>
            ))}
        </div>
    </div>
);

// format: 'single_elim' | 'round_robin'. onSelect (host only) makes playable matches clickable.
export const Bracket = ({ format, built, entrants, onSelect }) =>
    format === 'round_robin'
        ? <RoundRobin built={built} entrants={entrants} onSelect={onSelect} />
        : <EliminationBracket built={built} entrants={entrants} onSelect={onSelect} />;

const Stepper = ({ value, onChange, max, name }) => (
    <div className={styles.stepper}>
        <button type="button" onClick={() => onChange(v => Math.max(0, v - 1))} aria-label={`Lower ${name}'s score`}>−</button>
        <span className={styles.stepValue}>{value}</span>
        <button type="button" onClick={() => onChange(v => Math.min(max, v + 1))} aria-label={`Raise ${name}'s score`}>+</button>
    </div>
);

// Score entry for one match. bestOf caps the score at the games needed to win.
export const ReportMatchDialog = ({ match, entrants, bestOf, onSave, onClear, onClose }) => {
    const [scoreA, setScoreA] = useState(match.status === 'complete' ? match.scoreA : 0);
    const [scoreB, setScoreB] = useState(match.status === 'complete' ? match.scoreB : 0);
    const maxScore = Math.ceil(bestOf / 2);

    useEffect(() => {
        const onKey = (e) => e.key === 'Escape' && onClose();
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [onClose]);

    const tied = scoreA === scoreB;
    const winnerName = tied ? null : entrants[scoreA > scoreB ? match.a : match.b]?.name;

    return (
        <div className={styles.overlay} role="dialog" aria-modal="true" aria-labelledby="report-title" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
            <div className={styles.dialog}>
                <h3 id="report-title" className={styles.dialogTitle}>Report result</h3>
                <p className={styles.dialogHint}>Best of {bestOf} · first to {maxScore}</p>

                {[[match.a, scoreA, setScoreA], [match.b, scoreB, setScoreB]].map(([id, value, set]) => (
                    <div key={id} className={styles.reportRow}>
                        <span className={styles.reportName}>{entrants[id]?.name}</span>
                        <Stepper value={value} onChange={set} max={maxScore} name={entrants[id]?.name} />
                    </div>
                ))}

                <p className={styles.dialogStatus}>
                    {tied ? 'Scores can\'t be tied.' : <>Winner: <strong>{winnerName}</strong> advances</>}
                </p>

                <div className={styles.dialogActions}>
                    {match.status === 'complete' &&
                        <button type="button" className={styles.dangerBtn} onClick={onClear}>Clear result</button>}
                    <span className={styles.spacer} />
                    <button type="button" className={styles.ghostBtn} onClick={onClose}>Cancel</button>
                    <button type="button" className={styles.primaryBtn} disabled={tied} onClick={() => onSave(scoreA, scoreB)}>Save</button>
                </div>
            </div>
        </div>
    );
};
