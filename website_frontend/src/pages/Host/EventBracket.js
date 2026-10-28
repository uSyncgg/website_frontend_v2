import { useState } from "react";
import { Link } from "react-router";
import { Bracket, ReportMatchDialog } from "components/Bracket/Bracket";
import { publishBracket, reportMatch, clearMatch, resetBracket } from "services/hostEventsMock";
import { buildBracket, bracketProgress } from "utils/bracket";
import { useManagedEvent } from "./ManageEvent";
import { entrantsById } from "./hostShared";
import styles from "./Host.module.css";

// /host/events/:eventId/bracket - publish the draft, then report scores.
export const EventBracket = () => {
    const event = useManagedEvent();
    const [selected, setSelected] = useState(null);

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
    const { seeds, results, published } = event.bracket;
    const built = buildBracket(event.format, seeds, results);
    const { done, total } = bracketProgress(built);

    const reset = () => {
        const warning = published && done
            ? `Reset the bracket? All ${done} reported results will be lost.`
            : 'Discard this bracket and go back to seeding?';
        if (window.confirm(warning)) resetBracket(event.id);
    };

    return (
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

            {published && <p className={styles.muted} style={{ margin: '0 0 1rem' }}>Click a match to report or fix its score. Winners move on automatically.</p>}

            <Bracket format={event.format} built={built} entrants={byId} onSelect={published ? setSelected : undefined} />

            {selected &&
                <ReportMatchDialog
                    match={selected}
                    entrants={byId}
                    bestOf={event.bestOf}
                    onClose={() => setSelected(null)}
                    onSave={(a, b) => { reportMatch(event.id, selected, a, b); setSelected(null); }}
                    onClear={() => { clearMatch(event.id, selected.id); setSelected(null); }}
                />
            }
        </section>
    );
};
