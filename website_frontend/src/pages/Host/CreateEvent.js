import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { createEvent } from "services/hostEventsMock";
import { FORMATS } from "utils/bracket";
import { BEST_OF, GAMES, MAX_ENTRANTS, MockBanner, TEAM_SIZES } from "./hostShared";
import styles from "./Host.module.css";

const FORMAT_BLURBS = {
    single_elim: 'Lose once and you\'re out. Fast, classic bracket.',
    round_robin: 'Everyone plays everyone. Best for small groups and leagues.',
    double_elim: 'Winners and losers brackets - lose twice to be out.',
};

const defaultStart = () => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return { date: d.toISOString().slice(0, 10), time: '19:00' };
};

// /host/events/new
export const CreateEvent = () => {
    const navigate = useNavigate();
    const start = defaultStart();
    const [form, setForm] = useState({
        name: '', game: 'Call of Duty', format: 'single_elim', teamSize: '1v1', bestOf: 3, maxEntrants: 16,
        date: start.date, time: start.time, locationType: 'online', venue: '', entryFee: 'Free', prize: '',
        description: '', rules: '', checkInRequired: true,
    });
    const [submitted, setSubmitted] = useState(false);

    const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

    const errors = {
        name: !form.name.trim() && 'Give your event a name',
        venue: form.locationType === 'in_person' && !form.venue.trim() && 'Add where the event is held',
    };
    const hasErrors = Object.values(errors).some(Boolean);

    const submit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (hasErrors) return;
        const { date, time, ...rest } = form;
        const id = createEvent({
            ...rest,
            name: form.name.trim(),
            bestOf: Number(form.bestOf),
            maxEntrants: Number(form.maxEntrants),
            startsAt: new Date(`${date}T${time}`).toISOString(),
            registrationOpen: true,
        });
        navigate(`/host/events/${id}`);
    };

    return (
        <div className={`standardContainer ${styles.page}`}>
            <title>uSync | Create Event</title>
            <meta name="robots" content="noindex, nofollow" />

            <div className={styles.narrow}>
                <MockBanner />
                <div className={styles.pageHeader}>
                    <div>
                        <p className={styles.eyebrow}><Link to="/host/events" className={styles.eyebrow}>Host Dashboard</Link></p>
                        <h1 className={styles.title}>Create an event</h1>
                        <p className={styles.subtitle}>Players can sign up as soon as you create it. You'll build the bracket once sign-ups close.</p>
                    </div>
                </div>

                <form className={`${styles.card} ${styles.form}`} onSubmit={submit} noValidate>
                    <div className={styles.field}>
                        <label htmlFor="name">Event name</label>
                        <input id="name" className={styles.input} value={form.name} onChange={set('name')} placeholder="e.g. Friday Night 1v1s" maxLength={80} />
                        {submitted && errors.name && <p className={styles.fieldError}>{errors.name}</p>}
                    </div>

                    <div className={styles.fieldRow}>
                        <div className={styles.field}>
                            <label htmlFor="game">Game</label>
                            <select id="game" className={styles.select} value={form.game} onChange={set('game')}>
                                {GAMES.map(g => <option key={g}>{g}</option>)}
                            </select>
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="teamSize">Team size</label>
                            <select id="teamSize" className={styles.select} value={form.teamSize} onChange={set('teamSize')}>
                                {TEAM_SIZES.map(t => <option key={t}>{t}</option>)}
                            </select>
                        </div>
                    </div>

                    <div>
                        <span className={styles.fieldLabel}>Format</span>
                        <div className={styles.formatGrid} role="radiogroup" aria-label="Format">
                            {Object.entries(FORMATS).map(([key, f]) => (
                                <button
                                    key={key}
                                    type="button"
                                    role="radio"
                                    aria-checked={form.format === key}
                                    disabled={!f.available}
                                    className={`${styles.formatCard} ${form.format === key ? styles.formatCardActive : ''}`}
                                    onClick={() => setForm(prev => ({ ...prev, format: key }))}
                                >
                                    {!f.available && <span className={styles.soon}>Coming soon</span>}
                                    <strong>{f.label}</strong>
                                    <span>{FORMAT_BLURBS[key]}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.fieldRow}>
                        <div className={styles.field}>
                            <label htmlFor="bestOf">Matches are best of</label>
                            <select id="bestOf" className={styles.select} value={form.bestOf} onChange={set('bestOf')}>
                                {BEST_OF.map(b => <option key={b} value={b}>Best of {b}</option>)}
                            </select>
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="maxEntrants">Max {form.teamSize === '1v1' ? 'players' : 'teams'}</label>
                            <select id="maxEntrants" className={styles.select} value={form.maxEntrants} onChange={set('maxEntrants')}>
                                {MAX_ENTRANTS.map(m => <option key={m} value={m}>{m}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className={styles.fieldRow}>
                        <div className={styles.field}>
                            <label htmlFor="date">Start date</label>
                            <input id="date" type="date" className={styles.input} value={form.date} onChange={set('date')} />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="time">Start time</label>
                            <input id="time" type="time" className={styles.input} value={form.time} onChange={set('time')} />
                        </div>
                    </div>

                    <div className={styles.fieldRow}>
                        <div className={styles.field}>
                            <label htmlFor="locationType">Where</label>
                            <select id="locationType" className={styles.select} value={form.locationType} onChange={set('locationType')}>
                                <option value="online">Online</option>
                                <option value="in_person">In person (LAN)</option>
                            </select>
                        </div>
                        {form.locationType === 'in_person' &&
                            <div className={styles.field}>
                                <label htmlFor="venue">Venue / address</label>
                                <input id="venue" className={styles.input} value={form.venue} onChange={set('venue')} placeholder="Venue name, city" />
                                {submitted && errors.venue && <p className={styles.fieldError}>{errors.venue}</p>}
                            </div>
                        }
                    </div>

                    <div className={styles.fieldRow}>
                        <div className={styles.field}>
                            <label htmlFor="entryFee">Entry fee</label>
                            <input id="entryFee" className={styles.input} value={form.entryFee} onChange={set('entryFee')} placeholder="Free" />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="prize">Prize</label>
                            <input id="prize" className={styles.input} value={form.prize} onChange={set('prize')} placeholder="e.g. $100 to 1st" />
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="description">Description</label>
                        <textarea id="description" className={styles.textarea} value={form.description} onChange={set('description')} maxLength={1000} />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="rules">Rules</label>
                        <textarea id="rules" className={styles.textarea} value={form.rules} onChange={set('rules')} maxLength={3000}
                            placeholder="Maps, settings, how to report scores, no-show policy..." />
                    </div>

                    <label className={styles.checkRow}>
                        <input type="checkbox" checked={form.checkInRequired} onChange={set('checkInRequired')} />
                        Require check-in before the event (only checked-in players get seeded)
                    </label>

                    <div className={styles.formActions}>
                        <Link to="/host/events" className={styles.ghostBtn}>Cancel</Link>
                        <button type="submit" className={styles.primaryBtn}>Create event</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
