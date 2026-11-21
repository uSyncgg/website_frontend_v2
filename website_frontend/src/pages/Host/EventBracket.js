import { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaUndo } from "react-icons/fa";
import { Bracket, ReportMatchDialog } from "components/Bracket/Bracket";
import { publishBracket, resetBracket, ruleOnMatch, getDecisions, revertDecision, matchState, matchView } from "services/brackets";
import { allMatches } from "utils/bracket";
import { useManagedEvent } from "./ManageEvent";
import { entrantsById } from "./hostShared";
import styles from "./Host.module.css";

const ACTION_LABELS = {
    award: 'Result awarded',
    forfeit: 'Forfeit awarded',
    clear: 'Result cleared',
    uphold: 'Result upheld',
    revert: 'Decision reverted',
};

// /host/events/:eventId/bracket - publish the draft, then run the event: rule on matches (award
// a result or a forfeit, clear a match, uphold a disputed result) and revert decisions. Issues
// raised by players come in through the Queue tab.
export const EventBracket = () => {
    const event = useManagedEvent();
    const [selectedId, setSelectedId] = useState(null);
    const [decisions, setDecisions] = useState([]);
    const live = event.bracket && event.bracket.status !== 'draft';
    const progressKey = event.bracket?.built?.progress?.done;

    useEffect(() => {
        if (!live) return;
        getDecisions(event.id).then(setDecisions).catch(() => {});
    }, [event.id, live, progressKey, event.bracket?.matches]);

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
    const { built } = event.bracket;
    const { done, total } = built.progress;
    const stateOf = (m) => matchState(event, m);
    // Re-find the match each render so the dialog always shows current data.
    const selected = selectedId && allMatches(built).find(m => m.id === selectedId);
    const view = matchView(event, selected);

    // Hosts can only throw away a draft. Once published, only uSync support can reset it.
    const reset = () => {
        if (window.confirm('Discard this bracket and go back to seeding?')) resetBracket(event.id);
    };

    const close = () => setSelectedId(null);
    const rule = async (ruling) => {
        if (await ruleOnMatch(event.id, selected.id, ruling)) close();
    };

    const result = (r) => (r.status === 'complete' && r.scoreA != null
        ? `${name(r.winner)} ${Math.max(r.scoreA, r.scoreB)}-${Math.min(r.scoreA, r.scoreB)}`
        : 'no result');

    return (
        <>
            {live && event.openIssues > 0 &&
                <section className={`${styles.card} ${styles.alertCard}`}>
                    <h2 className={styles.sectionTitle}>{event.openIssues} issue{event.openIssues > 1 ? 's' : ''} in the queue</h2>
                    <p className={styles.blurb}>Disputes, no-shows and unanswered reports wait in the queue for you or another admin.</p>
                    <Link to={`/host/events/${event.id}/queue`} className={styles.primaryBtn}>Open the queue</Link>
                </section>
            }

            <section className={styles.card}>
                <div className={styles.cardHeader}>
                    <div>
                        <h2 className={styles.sectionTitle}>{live ? 'Bracket' : 'Bracket draft'}</h2>
                        {live
                            ? (
                                <div className={styles.progress} style={{ marginTop: '.4rem' }}>
                                    <span>{done} of {total} matches decided</span>
                                    <div className={styles.fillBar}><span style={{ width: `${total ? (done / total) * 100 : 0}%` }} /></div>
                                </div>
                            )
                            : <p className={styles.muted} style={{ margin: '.25rem 0 0' }}>Only you and your admins can see this. Publish it to show players and start the matches.</p>
                        }
                    </div>
                    <div className={styles.btnRow}>
                        {!live && <Link to={`/host/events/${event.id}/seeding`} className={styles.ghostBtn}>Edit seeding</Link>}
                        {!live && <button type="button" className={styles.dangerBtn} onClick={reset}>Reset bracket</button>}
                        {!live && <button type="button" className={styles.primaryBtn} onClick={() => publishBracket(event.id)}>Publish bracket</button>}
                        {live && <Link to={`/brackets/${event.id}`} className={styles.secondaryBtn}>Player view</Link>}
                    </div>
                </div>

                {live &&
                    <p className={styles.blurb}>
                        Players report their own scores - when both name the same winner, that winner advances. Click any match to
                        decide it yourself. Your decisions are final.
                    </p>
                }

                <Bracket
                    format={event.format}
                    built={built}
                    entrants={byId}
                    stateOf={stateOf}
                    onSelect={live ? (m) => setSelectedId(m.id) : undefined}
                />
            </section>

            {live &&
                <section className={styles.card}>
                    <h2 className={styles.sectionTitle}>Decision history</h2>
                    {decisions.length === 0
                        ? <p className={styles.muted}>No decisions yet.</p>
                        : (
                            <ul className={styles.logList}>
                                {decisions.map(d => {
                                    const m = allMatches(built).find(x => x.id === d.matchId);
                                    return (
                                        <li key={d.id} className={`${styles.logItem} ${d.reverted ? styles.logReverted : ''}`}>
                                            <div>
                                                <span className={styles.logMatch}>{m ? `${name(m.a)} vs ${name(m.b)}` : d.matchId}</span>
                                                <span className={styles.logDetail}>
                                                    {ACTION_LABELS[d.action] ?? d.action}: {result(d.before)} → {result(d.after)}
                                                    {d.by && ` · ${d.by}`}
                                                    {' · '}{new Date(d.at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                                                    {d.reverted && ' · Reverted'}
                                                </span>
                                            </div>
                                            {d.canRevert &&
                                                <button type="button" className={`${styles.ghostBtn} ${styles.smallBtn}`}
                                                    onClick={() => window.confirm('Revert this decision? The match goes back to how it was before it.') && revertDecision(event.id, d.id)}>
                                                    <FaUndo /> Revert
                                                </button>
                                            }
                                        </li>
                                    );
                                })}
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
                    bestOf={selected.bestOf ?? event.bestOf}
                    mode="host"
                    reports={view.reports ?? {}}
                    issues={view.issues ?? []}
                    onClose={close}
                    onSave={(a, b) => rule({ action: 'award', scoreA: a, scoreB: b })}
                    onClear={() => rule({ action: 'clear' })}
                    onUphold={() => rule({ action: 'uphold' })}
                    onForfeit={(winnerId) => {
                        const win = Math.ceil((selected.bestOf ?? event.bestOf) / 2);
                        const aWins = winnerId === selected.a;
                        rule({ action: 'award', scoreA: aWins ? win : 0, scoreB: aWins ? 0 : win, forfeit: true });
                    }}
                />
            }
        </>
    );
};
