import { useState } from "react";
import { FaSearch, FaTrash, FaUserPlus } from "react-icons/fa";
import { addEntrant, removeEntrant, setCheckedIn } from "services/hostEventsMock";
import { useManagedEvent } from "./ManageEvent";
import { isTeamEvent } from "./hostShared";
import styles from "./Host.module.css";

const FILTERS = [
    { key: 'all', label: 'All' },
    { key: 'in', label: 'Checked in' },
    { key: 'out', label: 'Not checked in' },
];

// /host/events/:eventId/entrants - everyone signed up for the event.
export const EventEntrants = () => {
    const event = useManagedEvent();
    const [query, setQuery] = useState('');
    const [filter, setFilter] = useState('all');
    const [newName, setNewName] = useState('');
    const teams = isTeamEvent(event);
    const locked = !!event.bracket?.published;
    const full = event.entrants.length >= event.maxEntrants;

    const rows = event.entrants
        .filter(e => filter === 'all' || (filter === 'in' ? e.checkedIn : !e.checkedIn))
        .filter(e => `${e.name} ${e.captain}`.toLowerCase().includes(query.trim().toLowerCase()));

    const add = (e) => {
        e.preventDefault();
        if (!newName.trim()) return;
        addEntrant(event.id, newName.trim());
        setNewName('');
    };

    const remove = (entrant) => {
        if (window.confirm(`Remove ${entrant.name} from this event?`)) removeEntrant(event.id, entrant.id);
    };

    const checkedIn = event.entrants.filter(e => e.checkedIn).length;

    return (
        <>
            <div className={styles.toolbar}>
                <div className={`${styles.grow}`} style={{ position: 'relative' }}>
                    <FaSearch style={{ position: 'absolute', left: '.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-4)' }} />
                    <input className={styles.input} style={{ paddingLeft: '2.2rem' }} value={query} onChange={e => setQuery(e.target.value)}
                        placeholder={`Search ${teams ? 'teams or captains' : 'players'}`} aria-label="Search entrants" />
                </div>
                <div className={styles.segmented} role="group" aria-label="Filter by check-in">
                    {FILTERS.map(f => (
                        <button key={f.key} type="button" aria-pressed={filter === f.key}
                            className={`${styles.segment} ${filter === f.key ? styles.segmentActive : ''}`}
                            onClick={() => setFilter(f.key)}>{f.label}</button>
                    ))}
                </div>
            </div>

            <p className={styles.muted} style={{ margin: '0 0 .75rem' }}>
                {event.entrants.length} of {event.maxEntrants} spots filled · {checkedIn} checked in
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
                            <th>Checked in</th>
                            <th aria-label="Actions" />
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map(entrant => (
                            <tr key={entrant.id}>
                                <td className={styles.num}>{event.entrants.indexOf(entrant) + 1}</td>
                                <td className={styles.entrantName}>{entrant.name}</td>
                                {teams && <td>@{entrant.captain}</td>}
                                <td className={styles.num}>{entrant.rating}</td>
                                <td>{new Date(entrant.registeredAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                                <td>
                                    <button type="button" role="switch" aria-checked={entrant.checkedIn} aria-label={`${entrant.name} checked in`}
                                        disabled={locked}
                                        className={`${styles.toggle} ${entrant.checkedIn ? styles.toggleOn : ''}`}
                                        onClick={() => setCheckedIn(event.id, entrant.id, !entrant.checkedIn)} />
                                </td>
                                <td>
                                    <button type="button" className={`${styles.iconBtn} ${styles.removeBtn}`} disabled={locked}
                                        aria-label={`Remove ${entrant.name}`} onClick={() => remove(entrant)}>
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {rows.length === 0 &&
                            <tr><td colSpan={teams ? 7 : 6} className={styles.muted} style={{ textAlign: 'center', padding: '2rem' }}>
                                {event.entrants.length ? 'No one matches that search.' : 'No sign-ups yet.'}
                            </td></tr>
                        }
                    </tbody>
                </table>
            </div>

            {!locked &&
                <form className={`${styles.card} ${styles.toolbar}`} style={{ marginTop: '1rem', marginBottom: 0 }} onSubmit={add}>
                    <div className={styles.grow}>
                        <label htmlFor="add-entrant" className={styles.fieldLabel}>Add a {teams ? 'team' : 'player'} manually</label>
                        <input id="add-entrant" className={styles.input} value={newName} onChange={e => setNewName(e.target.value)}
                            placeholder={teams ? 'Team name' : 'Gamertag'} disabled={full} />
                    </div>
                    <button type="submit" className={styles.secondaryBtn} style={{ alignSelf: 'flex-end' }} disabled={full || !newName.trim()}>
                        <FaUserPlus /> Add
                    </button>
                    {full && <p className={styles.fieldHint} style={{ width: '100%' }}>The event is full ({event.maxEntrants}).</p>}
                </form>
            }
        </>
    );
};
