import { useState } from "react";
import { Link } from "react-router";
import { FaUndo } from "react-icons/fa";
import { Bracket, ReportMatchDialog } from "components/Bracket/Bracket";
import {
    publishBracket, hostReportMatch, clearMatch, resetBracket, revertDecision, dismissNoShow,
    matchState, matchReports, matchNoShow,
} from "services/hostEventsMock";
import { buildBracket, bracketProgress, allMatches } from "utils/bracket";
import { useManagedEvent } from "./ManageEvent";
import { entrantsById } from "./hostShared";
import styles from "./Host.module.css";

const SOURCE_LABELS = {
    players: 'Both players agreed',
    host: 'Host decision',
    forfeit: 'No-show forfeit',
    cleared: 'Result cleared',
};

// /host/events/:eventId/bracket - publish the draft, then run the event:
// resolve disputes and no-shows, report or fix scores, revert decisions.
export const EventBracket = () => {
    const event = useManagedEvent();
    const [selectedId, setSelectedId] = useState(null);

    if (!event.bracket) {
        return (
            <div className={styles.emptyState}>
                <h2 className={styles.sectionTitle}>No bracket yet</h2>
                <p className={styles.muted}>Set the seeding order to generate the bracket.</p>
                <Link to={`/host/events/${event.id}/seeding`} className={styles.primaryBtn}>Set seeding</Link>
            </div>
        );
    }

    const byId = entrantsById(event);
    const name = (id) => byId[id]?.name ?? 'Unknown';
    const { seeds, results, published, log = [] } = event.bracket;
    const built = buildBracket(event.format, seeds, results);
    const matches = allMatches(built);
    const { done, total } = bracketProgress(built);
    const stateOf = (m) => matchState(event.bracket, m);
    const needsHost = matches.filter(m => ['disputed', 'no_show'].includes(stateOf(m)));
    // Re-find the match each render so the dialog always shows current data.
    const selected = selectedId && matches.find(m => m.id === selectedId);

    const reset = () => {
        const warning = published && done
            ? `Reset the bracket? All ${done} reported results will be lost.`
            : 'Discard this bracket and go back to seeding?';
        if (window.confirm(warning)) resetBracket(event.id);
    };

    const close = () => setSelectedId(null);
    const forfeitScore = Math.ceil(event.bestOf / 2);

    return (
        <>
            {published && needsHost.length > 0 &&
                <section className={`${styles.card} ${styles.alertCard}`}>
                    <h2 className={styles.sectionTitle}>Needs your decision ({needsHost.length})</h2>
                    <div className={styles.alertList}>
                        {needsHost.map(m => (
                            <button key={m.id} type="button" className={styles.alertItem} onClick={() => setSelectedId(m.id)}>
                                <span className={stateOf(m) === 'disputed' ? styles.tagDisputed : styles.tagNoShow}>
                                    {stateOf(m) === 'disputed' ? 'DISPUTED' : 'NO SHOW REPORTED'}
                                </span>
                                <span>{name(m.a)} vs {name(m.b)}</span>
                                <span className={styles.alertGo}>Resolve</span>
                            </button>
                        ))}
                    </div>
                </section>
            }

            <section className={styles.card}>
                <div className={styles.cardHeader}>
                    <div>
                        <h2 className={styles.sectionTitle}>{published ? 'Bracket' : 'Bracket draft'}</h2>
                        {published
                            ? (
                                <div className={styles.progress} style={{ marginTop: '.4rem' }}>
                                    <span>{done} of {total} matches reported</span>
                                    <div className={styles.fillBar}><span style={{ width: `${total ? (done / total) * 100 : 0}%` }} /></div>
                                </div>
                            )
                            : <p className={styles.muted} style={{ margin: '.25rem 0 0' }}>Only you can see this. Publish it to show players and start reporting scores.</p>
                        }
                    </div>
                    <div className={styles.btnRow}>
                        {!published && <Link to={`/host/events/${event.id}/seeding`} className={styles.ghostBtn}>Edit seeding</Link>}
                        <button type="button" className={styles.dangerBtn} onClick={reset}>Reset bracket</button>
                        {!published && <button type="button" className={styles.primaryBtn} onClick={() => publishBracket(event.id)}>Publish bracket</button>}
                        {published && <Link to={`/brackets/${event.id}`} className={styles.secondaryBtn}>Player view</Link>}
                    </div>
                </div>

                {published &&
                    <p className={styles.blurb}>
                        Players report their own scores - when both agree, the winner advances automatically. Click any match to
                        settle a dispute, handle a no-show, or report and fix a score yourself.
                    </p>
                }

                <Bracket
                    format={event.format}
                    built={built}
                    entrants={byId}
                    stateOf={stateOf}
                    onSelect={published ? (m) => setSelectedId(m.id) : undefined}
                />
            </section>

            {published &&
                <section className={styles.card}>
                    <h2 className={styles.sectionTitle}>Decision history</h2>
                    {log.length === 0
                        ? <p className={styles.muted}>No results yet.</p>
                        : (
                            <ul className={styles.logList}>
                                {[...log].reverse().map(entry => (
                                    <li key={entry.id} className={`${styles.logItem} ${entry.reverted ? styles.logReverted : ''}`}>
                                        <div>
                                            <span className={styles.logMatch}>{name(entry.a)} vs {name(entry.b)}</span>
                                            <span className={styles.logDetail}>
                                                {entry.source === 'cleared'
                                                    ? 'Result cleared'
                                                    : `${name(entry.scoreA > entry.scoreB ? entry.a : entry.b)} won ${Math.max(entry.scoreA, entry.scoreB)}-${Math.min(entry.scoreA, entry.scoreB)}`}
                                                {' · '}{SOURCE_LABELS[entry.source]}
                                                {' · '}{new Date(entry.at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                                                {entry.reverted && ' · Reverted'}
                                            </span>
                                        </div>
                                        {!entry.reverted &&
                                            <button type="button" className={`${styles.ghostBtn} ${styles.smallBtn}`}
                                                onClick={() => window.confirm('Revert this decision? The match goes back to how it was before, and any later matches it fed into reset.') && revertDecision(event.id, entry.id)}>
                                                <FaUndo /> Revert
                                            </button>
                                        }
                                    </li>
                                ))}
                            </ul>
                        )
                    }
                </section>
            }

            {selected &&
                <ReportMatchDialog
                    key={selected.id}
                    match={selected}
                    entrants={byId}
                    bestOf={event.bestOf}
                    mode="host"
                    reports={matchReports(event.bracket, selected)}
                    noShow={matchNoShow(event.bracket, selected)}
                    onClose={close}
                    onSave={(a, b) => { hostReportMatch(event.id, selected, a, b); close(); }}
                    onClear={() => { clearMatch(event.id, selected); close(); }}
                    onForfeit={(winnerId) => {
                        const aWins = winnerId === selected.a;
                        hostReportMatch(event.id, selected, aWins ? forfeitScore : 0, aWins ? 0 : forfeitScore, { forfeit: true });
                        close();
                    }}
                    onDismissNoShow={() => { dismissNoShow(event.id, selected.id); close(); }}
                />
            }
        </>
    );
};
