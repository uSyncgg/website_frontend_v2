import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaArrowDown, FaArrowUp, FaGripVertical, FaRandom } from "react-icons/fa";
import { Bracket } from "components/Bracket/Bracket";
import { saveBracketDraft, publishBracket, signedUpEntrants, pendingEntrants } from "services/brackets";
import { SEEDING_METHODS, firstRoundByes } from "utils/bracket";
import { useManagedEvent } from "./ManageEvent";
import { entrantsById, isTeamEvent } from "./hostShared";
import styles from "./Host.module.css";

const SAVE_DELAY_MS = 400;

// /host/events/:eventId/seeding - order the field, preview the bracket, then publish.
// The preview is the server's: each change to the order is saved as the draft (after a short
// pause) and the bracket that comes back is what's drawn. Only the host and admins see drafts.
export const EventSeeding = () => {
    const event = useManagedEvent();
    const navigate = useNavigate();
    const byId = entrantsById(event);
    const [method, setMethod] = useState('registration');
    const [dragIndex, setDragIndex] = useState(null);
    const [overIndex, setOverIndex] = useState(null);
    const draft = event.bracket?.status === 'draft' ? event.bracket : null;

    // Pending teams (not enough players picked) sit out until their roster fills.
    const pool = signedUpEntrants(event);

    // Start from the saved draft when there is one, otherwise in sign-up order.
    const [order, setOrder] = useState(() => (
        draft ? draft.seeds.filter(id => byId[id]) : SEEDING_METHODS.registration.sort(pool).map(e => e.id)
    ));

    // Keep the order in step with the pool if the entrants change.
    const poolIds = pool.map(e => e.id);
    const seeds = [...order.filter(id => poolIds.includes(id)), ...poolIds.filter(id => !order.includes(id))];
    const seedKey = seeds.join(',');
    const tooFew = seeds.length < 2;

    // Save the draft (and so refresh the preview) once the order settles.
    const saved = useRef(draft ? draft.seeds.join(',') : '');
    const live = !!event.bracket && event.bracket.status !== 'draft';
    useEffect(() => {
        if (tooFew || seedKey === saved.current || live) return undefined;
        const t = setTimeout(() => {
            saved.current = seedKey;
            saveBracketDraft(event.id, seedKey.split(','));
        }, SAVE_DELAY_MS);
        return () => clearTimeout(t);
    }, [seedKey, tooFew, event.id, live]);

    const applyMethod = (key) => {
        setMethod(key);
        setOrder(SEEDING_METHODS[key].sort(pool).map(e => e.id));
    };

    const move = (from, to) => {
        if (to < 0 || to >= seeds.length) return;
        const next = [...seeds];
        const [item] = next.splice(from, 1);
        next.splice(to, 0, item);
        setOrder(next);
        setMethod('manual');
    };

    if (live) {
        return (
            <div className={styles.emptyState}>
                <h2 className={styles.sectionTitle}>The bracket is already live</h2>
                <p className={styles.muted}>Seeding is locked once a bracket is published. Reset the bracket from the Bracket tab to reseed.</p>
                <Link to="../bracket" relative="path" className={styles.secondaryBtn}>Go to bracket</Link>
            </div>
        );
    }

    const preview = draft && draft.seeds.join(',') === seedKey ? draft.built : null;

    const publish = async () => {
        if (seedKey !== saved.current) {
            saved.current = seedKey;
            if (!await saveBracketDraft(event.id, seeds)) return;
        }
        if (await publishBracket(event.id)) navigate(`/host/events/${event.id}/bracket`);
    };

    return (
        <div className={styles.seedLayout}>
            <section className={styles.card}>
                <h2 className={styles.sectionTitle}>Seeding</h2>

                <div className={styles.optionGroup}>
                    <span className={styles.optionLabel}>Seed by</span>
                    <div className={styles.btnRow}>
                        {Object.entries(SEEDING_METHODS).map(([key, m]) => (
                            <button key={key} type="button"
                                className={`${styles.ghostBtn} ${styles.smallBtn} ${method === key ? styles.segmentActive : ''}`}
                                onClick={() => applyMethod(key)}>
                                {key === 'random' && <FaRandom />} {m.label}
                            </button>
                        ))}
                    </div>
                    <p className={styles.fieldHint}>
                        {method === 'manual' ? 'Manual order - drag players or use the arrows.' : 'Drag players or use the arrows to fine-tune.'}
                        {method === 'random' && ' Click Random again to reshuffle.'}
                    </p>
                </div>

                {pendingEntrants(event).length > 0 &&
                    <p className={styles.fieldHint}>
                        {pendingEntrants(event).length} pending team{pendingEntrants(event).length > 1 ? 's' : ''} ({pendingEntrants(event).map(e => e.name).join(', ')}) won't be seeded until {pendingEntrants(event).length > 1 ? 'their captains pick' : 'its captain picks'} enough players.
                    </p>
                }

                <ol className={styles.seedList}>
                    {seeds.map((id, i) => (
                        <li key={id}
                            draggable
                            onDragStart={() => setDragIndex(i)}
                            onDragOver={(e) => { e.preventDefault(); setOverIndex(i); }}
                            onDragEnd={() => { setDragIndex(null); setOverIndex(null); }}
                            onDrop={(e) => { e.preventDefault(); if (dragIndex !== null) move(dragIndex, i); setDragIndex(null); setOverIndex(null); }}
                            className={`${styles.seedItem} ${dragIndex === i ? styles.seedItemDragging : ''} ${overIndex === i && dragIndex !== i ? styles.seedItemOver : ''}`}
                        >
                            <span className={styles.seedNum}>{i + 1}</span>
                            <FaGripVertical className={styles.grip} aria-hidden="true" />
                            <span className={styles.seedName}>{byId[id].name}</span>
                            <span className={styles.seedMoves}>
                                <button type="button" className={styles.iconBtn} disabled={i === 0} onClick={() => move(i, i - 1)} aria-label={`Move ${byId[id].name} up`}><FaArrowUp /></button>
                                <button type="button" className={styles.iconBtn} disabled={i === seeds.length - 1} onClick={() => move(i, i + 1)} aria-label={`Move ${byId[id].name} down`}><FaArrowDown /></button>
                            </span>
                        </li>
                    ))}
                </ol>
                {tooFew && <p className={styles.fieldError}>You need at least 2 {isTeamEvent(event) ? 'teams' : 'players'} to build a bracket.</p>}
                {event.minEntrants != null && seeds.length < event.minEntrants &&
                    <p className={styles.fieldHint}>This event needs at least {event.minEntrants} signed up before it can start.</p>}
            </section>

            <section className={styles.card}>
                <div className={styles.cardHeader}>
                    <div>
                        <h2 className={styles.sectionTitle}>Bracket preview</h2>
                        <p className={styles.muted} style={{ margin: '.25rem 0 0' }}>
                            {!preview && !tooFew && 'Updating the preview…'}
                            {preview && event.format === 'single_elim' && (firstRoundByes(preview)
                                ? `${firstRoundByes(preview)} top seed${firstRoundByes(preview) > 1 ? 's get' : ' gets'} a first-round bye.`
                                : 'No byes - the field fills the bracket.')}
                            {preview && event.format === 'round_robin' && `${preview.rounds.flat().length} matches over ${preview.rounds.length} rounds.`}
                            {preview && event.format === 'swiss' && `${preview.rounds.length} rounds. Each round after the first is paired by record once the last one is played.`}
                        </p>
                    </div>
                    <div className={styles.btnRow}>
                        <button type="button" className={styles.primaryBtn} disabled={tooFew} onClick={publish}>Publish bracket</button>
                    </div>
                </div>
                <p className={styles.fieldHint}>The order saves as a draft automatically. Publishing rechecks who's signed up.</p>
                {preview && <Bracket format={event.format} built={preview} entrants={byId} />}
            </section>
        </div>
    );
};
