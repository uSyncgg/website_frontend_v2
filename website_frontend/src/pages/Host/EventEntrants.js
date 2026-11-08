import { Fragment, useState } from "react";
import { FaSearch, FaTrash } from "react-icons/fa";
import { removeEntrant } from "services/hostEventsMock";
import { useManagedEvent } from "./ManageEvent";
import { Modal, formatDate, isTeamEvent } from "./hostShared";
import styles from "./Host.module.css";

// Everything this entrant filled in when they signed up.
const EntrantDetails = ({ event, entrant, onClose }) => {
    const team = isTeamEvent(event);
    const answers = Object.entries(entrant.answers ?? {});
    return (
        <Modal title={entrant.name} onClose={onClose}>
            <dl className={styles.detailList}>
                {team && <><dt>Captain</dt><dd>@{entrant.captain}</dd></>}
                {team && entrant.teammates?.length > 0 && <><dt>Teammates</dt><dd>{entrant.teammates.join(', ')}</dd></>}
                {!team && <><dt>Gamertag</dt><dd>{entrant.captain}</dd></>}
                <dt>Email</dt><dd>{entrant.email || '-'}</dd>
                <dt>Signed up</dt><dd>{formatDate(entrant.registeredAt)}</dd>
                {event.payments?.enabled && <><dt>Pass</dt><dd>{entrant.pass ?? event.payments.tiers[0]?.name ?? '-'}</dd></>}
                <dt>Skill rating</dt><dd>{entrant.rating}</dd>
            </dl>
            <h4 className={styles.sectionTitle} style={{ margin: '1.25rem 0 .6rem', fontSize: '.9rem' }}>Sign-up answers</h4>
            {answers.length
                ? (
                    <dl className={styles.detailList}>
                        {answers.map(([q, a]) => <Fragment key={q}><dt>{q}</dt><dd>{a || '-'}</dd></Fragment>)}
                    </dl>
                )
                : <p className={styles.muted}>No sign-up answers were recorded.</p>
            }
        </Modal>
    );
};

// /host/events/:eventId/entrants - everyone signed up for the event.
export const EventEntrants = () => {
    const event = useManagedEvent();
    const [query, setQuery] = useState('');
    const [viewingId, setViewingId] = useState(null);
    const teams = isTeamEvent(event);
    const locked = !!event.bracket?.published;

    const rows = event.entrants
        .filter(e => `${e.name} ${e.captain}`.toLowerCase().includes(query.trim().toLowerCase()));

    const remove = (entrant) => {
        if (window.confirm(`Remove ${entrant.name} from this event?`)) removeEntrant(event.id, entrant.id);
    };

    return (
        <>
            <div className={styles.toolbar}>
                <div className={`${styles.grow}`} style={{ position: 'relative' }}>
                    <FaSearch style={{ position: 'absolute', left: '.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-4)' }} />
                    <input className={styles.input} style={{ paddingLeft: '2.2rem' }} value={query} onChange={e => setQuery(e.target.value)}
                        placeholder={`Search ${teams ? 'teams or captains' : 'players'}`} aria-label="Search entrants" />
                </div>
            </div>

            <p className={styles.muted} style={{ margin: '0 0 .75rem' }}>
                {event.maxEntrants == null ? `${event.entrants.length} signed up (no cap)` : `${event.entrants.length} of ${event.maxEntrants} spots filled`}
                {locked && ' · The bracket is live, so the entrant list is locked.'}
            </p>

            <div className={styles.tableWrap}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>{teams ? 'Team' : 'Player'}</th>
                            {teams && <th>Captain</th>}
                            <th>Skill rating</th>
                            <th>Signed up</th>
                            <th aria-label="Actions" />
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map(entrant => (
                            <tr key={entrant.id}>
                                <td className={styles.num}>{event.entrants.indexOf(entrant) + 1}</td>
                                <td>
                                    <button type="button" className={styles.linkBtn} onClick={() => setViewingId(entrant.id)}>{entrant.name}</button>
                                </td>
                                {teams && <td>@{entrant.captain}</td>}
                                <td className={styles.num}>{entrant.rating}</td>
                                <td>{new Date(entrant.registeredAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                                <td>
                                    <button type="button" className={`${styles.iconBtn} ${styles.removeBtn}`} disabled={locked}
                                        aria-label={`Remove ${entrant.name}`} onClick={() => remove(entrant)}>
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {rows.length === 0 &&
                            <tr><td colSpan={teams ? 6 : 5} className={styles.muted} style={{ textAlign: 'center', padding: '2rem' }}>
                                {event.entrants.length ? 'No one matches that search.' : 'No sign-ups yet.'}
                            </td></tr>
                        }
                    </tbody>
                </table>
            </div>

            {viewingId && event.entrants.find(e => e.id === viewingId) &&
                <EntrantDetails event={event} entrant={event.entrants.find(e => e.id === viewingId)} onClose={() => setViewingId(null)} />
            }
        </>
    );
};
