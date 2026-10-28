import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaArrowDown, FaArrowUp, FaGripVertical, FaRandom } from "react-icons/fa";
import { Bracket } from "components/Bracket/Bracket";
import { saveBracketDraft, publishBracket } from "services/hostEventsMock";
import { buildBracket, SEEDING_METHODS } from "utils/bracket";
import { useManagedEvent } from "./ManageEvent";
import { entrantsById, isTeamEvent } from "./hostShared";
import styles from "./Host.module.css";

// /host/events/:eventId/seeding - order the field, preview the bracket, then publish.
export const EventSeeding = () => {
    const event = useManagedEvent();
    const navigate = useNavigate();
    const byId = entrantsById(event);
    const [checkedInOnly, setCheckedInOnly] = useState(event.checkInRequired);
    const [method, setMethod] = useState('rating');
    const [dragIndex, setDragIndex] = useState(null);
    const [overIndex, setOverIndex] = useState(null);

    const pool = useMemo(
        () => event.entrants.filter(e => !checkedInOnly || e.checkedIn),
        [event.entrants, checkedInOnly]
    );

    // Start from a saved draft when there is one, otherwise sort the pool by rating.
    const [order, setOrder] = useState(() => (
        event.bracket && !event.bracket.published
            ? event.bracket.seeds.filter(id => byId[id])
            : SEEDING_METHODS.rating.sort(pool).map(e => e.id)
    ));

    // Keep the order in step with the pool if check-ins change or the filter flips.
    const poolIds = pool.map(e => e.id);
    const seeds = [...order.filter(id => poolIds.includes(id)), ...poolIds.filter(id => !order.includes(id))];

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

    const preview = buildBracket(event.format, seeds, {});

    if (event.bracket?.published) {
        return (
            <div className={styles.emptyState}>
                <h2 className={styles.sectionTitle}>The bracket is already live</h2>
                <p className={styles.muted}>Seeding is locked once a bracket is published. Reset the bracket from the Bracket tab to reseed.</p>
                <Link to="../bracket" relative="path" className={styles.secondaryBtn}>Go to bracket</Link>
            </div>
        );
    }

    const tooFew = seeds.length < 2;
    const save = (andPublish) => {
        saveBracketDraft(event.id, seeds);
        if (andPublish) publishBracket(event.id);
        navigate(`/host/events/${event.id}/bracket`);
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

                {event.checkInRequired &&
                    <label className={`${styles.checkRow} ${styles.optionGroup}`}>
                        <input type="checkbox" checked={checkedInOnly} onChange={e => setCheckedInOnly(e.target.checked)} />
                        Only seed checked-in {isTeamEvent(event) ? 'teams' : 'players'} ({event.entrants.filter(e => e.checkedIn).length} of {event.entrants.length})
                    </label>
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
                            <span className={styles.seedRating}>{byId[id].rating}</span>
                            <span className={styles.seedMoves}>
                                <button type="button" className={styles.iconBtn} disabled={i === 0} onClick={() => move(i, i - 1)} aria-label={`Move ${byId[id].name} up`}><FaArrowUp /></button>
                                <button type="button" className={styles.iconBtn} disabled={i === seeds.length - 1} onClick={() => move(i, i + 1)} aria-label={`Move ${byId[id].name} down`}><FaArrowDown /></button>
                            </span>
                        </li>
                    ))}
                </ol>
                {tooFew && <p className={styles.fieldError}>You need at least 2 {isTeamEvent(event) ? 'teams' : 'players'} to build a bracket.</p>}
            </section>

            <section className={styles.card}>
                <div className={styles.cardHeader}>
                    <div>
                        <h2 className={styles.sectionTitle}>Bracket preview</h2>
                        <p className={styles.muted} style={{ margin: '.25rem 0 0' }}>
                            {event.format === 'single_elim' && seeds.length > 1 && (() => {
                                const size = preview.rounds[0].length * 2;
                                const byes = size - seeds.length;
                                return byes ? `${byes} top seed${byes > 1 ? 's get' : ' gets'} a first-round bye.` : 'No byes - the field fills the bracket.';
                            })()}
                            {event.format === 'round_robin' && seeds.length > 1 && `${preview.rounds.flat().length} matches over ${preview.rounds.length} rounds.`}
                        </p>
                    </div>
                    <div className={styles.btnRow}>
                        <button type="button" className={styles.ghostBtn} disabled={tooFew} onClick={() => save(false)}>Save draft</button>
                        <button type="button" className={styles.primaryBtn} disabled={tooFew} onClick={() => save(true)}>Publish bracket</button>
                    </div>
                </div>
                {!tooFew && <Bracket format={event.format} built={preview} entrants={byId} />}
            </section>
        </div>
    );
};
