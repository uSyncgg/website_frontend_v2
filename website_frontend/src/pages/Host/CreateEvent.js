import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaPlus, FaTrash } from "react-icons/fa";
import { createEvent } from "services/hostEventsMock";
import { FORMATS } from "utils/bracket";
import { BEST_OF, GAMES, MockBanner, TEAM_SIZES } from "./hostShared";
import styles from "./Host.module.css";

// Same shape as the existing pass portal (/passes/:slug): pass tiers, per-player
// fields, extra questions, and a 5% uSync fee on top of the pass price.
const PLAYER_FIELD_OPTIONS = ["Activision ID", "Riot ID", "Epic ID", "Steam", "Battle.net", "Xbox Gamertag", "PSN", "Discord", "Twitter / X"];
const USYNC_FEE = 0.05;

const defaultStart = () => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return { date: d.toISOString().slice(0, 10), time: '19:00' };
};

const blankTier = () => ({ name: '', price: '', capacity: '' });
const blankQuestion = () => ({ label: '', type: 'text', options: '', required: false });

// /host/events/new
export const CreateEvent = () => {
    const navigate = useNavigate();
    const start = defaultStart();
    const [form, setForm] = useState({
        name: '', game: 'Call of Duty', format: 'single_elim', teamSize: '1v1', bestOf: 3,
        maxEntrants: '16', uncapped: false,
        date: start.date, time: start.time, locationType: 'online', venue: '', prize: '',
        description: '', rules: '', checkInRequired: true, noShowMinutes: '10',
        usePayments: false,
    });
    const [payments, setPayments] = useState({
        payoutEmail: '', tiers: [{ name: 'Player Pass', price: '', capacity: '' }],
        playerFields: ['Discord'], questions: [], refundPolicy: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
    const setPay = (field, value) => setPayments(p => ({ ...p, [field]: value }));
    const setTier = (i, field, value) => setPay('tiers', payments.tiers.map((t, j) => (j === i ? { ...t, [field]: value } : t)));
    const setQuestion = (i, field, value) => setPay('questions', payments.questions.map((q, j) => (j === i ? { ...q, [field]: value } : q)));
    const togglePlayerField = (f) => setPay('playerFields', payments.playerFields.includes(f)
        ? payments.playerFields.filter(x => x !== f)
        : [...payments.playerFields, f]);

    const maxNum = Number(form.maxEntrants);
    const errors = {
        name: !form.name.trim() && 'Give your event a name',
        venue: form.locationType === 'in_person' && !form.venue.trim() && 'Add where the event is held',
        maxEntrants: !form.uncapped && (!Number.isInteger(maxNum) || maxNum < 2) && 'Enter a whole number of 2 or more, or tick "No cap"',
        noShowMinutes: !(Number(form.noShowMinutes) >= 0) && 'Enter how many minutes to wait',
        payoutEmail: form.usePayments && !/^\S+@\S+\.\S+$/.test(payments.payoutEmail) && 'Add the email we send payouts to',
        tiers: form.usePayments && payments.tiers.some(t => !t.name.trim() || !(Number(t.price) > 0)) && 'Every pass needs a name and a price above $0',
    };
    const hasErrors = Object.values(errors).some(Boolean);
    const err = (key) => submitted && errors[key] && <p className={styles.fieldError}>{errors[key]}</p>;

    const submit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (hasErrors) return;
        const { date, time, uncapped, usePayments, ...rest } = form;
        const lowestPrice = Math.min(...payments.tiers.map(t => Number(t.price)));
        const id = createEvent({
            ...rest,
            name: form.name.trim(),
            bestOf: Number(form.bestOf),
            maxEntrants: uncapped ? null : maxNum,
            noShowMinutes: Number(form.noShowMinutes),
            startsAt: new Date(`${date}T${time}`).toISOString(),
            entryFee: usePayments ? `$${lowestPrice.toFixed(2)}` : 'Free',
            payments: usePayments ? { enabled: true, ...payments } : { enabled: false },
            registrationOpen: true,
        });
        navigate(`/host/events/${id}`);
    };

    const unit = form.teamSize === '1v1' ? 'players' : 'teams';

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

                <form className={styles.form} onSubmit={submit} noValidate>
                    <section className={`${styles.card} ${styles.form}`}>
                        <h2 className={styles.sectionTitle}>The basics</h2>
                        <div className={styles.field}>
                            <label htmlFor="name">Event name</label>
                            <input id="name" className={styles.input} value={form.name} onChange={set('name')} placeholder="e.g. Friday Night 1v1s" maxLength={80} />
                            {err('name')}
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
                                    {err('venue')}
                                </div>
                            }
                        </div>
                    </section>

                    <section className={`${styles.card} ${styles.form}`}>
                        <h2 className={styles.sectionTitle}>Format</h2>
                        <div className={styles.formatGrid} role="radiogroup" aria-label="Format">
                            {Object.entries(FORMATS).map(([key, f]) => (
                                <button key={key} type="button" role="radio" aria-checked={form.format === key}
                                    className={`${styles.formatCard} ${form.format === key ? styles.formatCardActive : ''}`}
                                    onClick={() => setForm(prev => ({ ...prev, format: key }))}>
                                    <strong>{f.label}</strong>
                                    <span>{f.blurb}</span>
                                </button>
                            ))}
                        </div>

                        <div className={styles.fieldRow}>
                            <div className={styles.field}>
                                <label htmlFor="bestOf">Matches are best of</label>
                                <select id="bestOf" className={styles.select} value={form.bestOf} onChange={set('bestOf')}>
                                    {BEST_OF.map(b => <option key={b} value={b}>Best of {b}</option>)}
                                </select>
                            </div>
                            <div className={styles.field}>
                                <label htmlFor="maxEntrants">Max {unit}</label>
                                <input id="maxEntrants" type="number" min={2} step={1} inputMode="numeric" className={styles.input}
                                    value={form.uncapped ? '' : form.maxEntrants} onChange={set('maxEntrants')}
                                    disabled={form.uncapped} placeholder={form.uncapped ? 'No cap' : 'e.g. 32'} />
                                <label className={styles.checkRow} style={{ marginTop: '.5rem' }}>
                                    <input type="checkbox" checked={form.uncapped} onChange={set('uncapped')} /> No cap
                                </label>
                                {err('maxEntrants')}
                            </div>
                        </div>

                        <label className={styles.checkRow}>
                            <input type="checkbox" checked={form.checkInRequired} onChange={set('checkInRequired')} />
                            Require check-in before the event (only checked-in {unit} get seeded)
                        </label>

                        <div className={styles.field}>
                            <label htmlFor="noShowMinutes">No-show timer (minutes)</label>
                            <input id="noShowMinutes" type="number" min={0} step={1} inputMode="numeric" className={styles.input}
                                style={{ maxWidth: '10rem' }} value={form.noShowMinutes} onChange={set('noShowMinutes')} />
                            <p className={styles.fieldHint}>Players can "Report No Show" this long after the event starts. You decide what happens next.</p>
                            {err('noShowMinutes')}
                        </div>
                    </section>

                    <section className={`${styles.card} ${styles.form}`}>
                        <h2 className={styles.sectionTitle}>Payments</h2>
                        <div className={styles.segmented} role="radiogroup" aria-label="Payments">
                            {[[false, 'Free / handled elsewhere'], [true, 'Collect entry fees with uSync']].map(([value, label]) => (
                                <button key={label} type="button" role="radio" aria-checked={form.usePayments === value}
                                    className={`${styles.segment} ${form.usePayments === value ? styles.segmentActive : ''}`}
                                    onClick={() => setForm(f => ({ ...f, usePayments: value }))}>{label}</button>
                            ))}
                        </div>

                        {!form.usePayments &&
                            <div className={styles.field}>
                                <label htmlFor="prize">Prize (optional)</label>
                                <input id="prize" className={styles.input} value={form.prize} onChange={set('prize')} placeholder="e.g. $100 to 1st" />
                            </div>
                        }

                        {form.usePayments &&
                            <div className={styles.paymentPortal}>
                                <p className={styles.blurb}>
                                    We'll create a payment portal for this event, like our existing event pass pages. Players pay with Stripe when they
                                    sign up, and uSync adds a 5% service fee on top of your price.
                                </p>

                                <div className={styles.field}>
                                    <label htmlFor="payoutEmail">Payout email</label>
                                    <input id="payoutEmail" type="email" className={styles.input} value={payments.payoutEmail}
                                        onChange={e => setPay('payoutEmail', e.target.value)} placeholder="you@example.com" />
                                    {err('payoutEmail')}
                                </div>

                                <div>
                                    <span className={styles.fieldLabel}>Passes</span>
                                    {payments.tiers.map((tier, i) => (
                                        <div key={i} className={styles.tierRow}>
                                            <input className={styles.input} value={tier.name} onChange={e => setTier(i, 'name', e.target.value)} placeholder="Pass name" aria-label="Pass name" />
                                            <div className={styles.money}>
                                                <span>$</span>
                                                <input className={styles.input} type="number" min={0} step="0.01" value={tier.price}
                                                    onChange={e => setTier(i, 'price', e.target.value)} placeholder="Price" aria-label="Price" />
                                            </div>
                                            <input className={styles.input} type="number" min={1} step={1} value={tier.capacity}
                                                onChange={e => setTier(i, 'capacity', e.target.value)} placeholder="Limit (optional)" aria-label="How many can be sold" />
                                            <button type="button" className={`${styles.iconBtn} ${styles.removeBtn}`} disabled={payments.tiers.length === 1}
                                                onClick={() => setPay('tiers', payments.tiers.filter((_, j) => j !== i))} aria-label="Remove pass"><FaTrash /></button>
                                            {Number(tier.price) > 0 &&
                                                <span className={styles.tierTotal}>
                                                    Player pays ${(Number(tier.price) * (1 + USYNC_FEE)).toFixed(2)} (${Number(tier.price).toFixed(2)} + ${(Number(tier.price) * USYNC_FEE).toFixed(2)} fee)
                                                </span>
                                            }
                                        </div>
                                    ))}
                                    <button type="button" className={`${styles.ghostBtn} ${styles.smallBtn}`} onClick={() => setPay('tiers', [...payments.tiers, blankTier()])}>
                                        <FaPlus /> Add another pass
                                    </button>
                                    {err('tiers')}
                                </div>

                                <div>
                                    <span className={styles.fieldLabel}>Ask each player for</span>
                                    <div className={styles.pillGrid}>
                                        <span className={`${styles.pill} ${styles.pillOn} ${styles.pillLocked}`}>Gamertag (always)</span>
                                        {PLAYER_FIELD_OPTIONS.map(f => (
                                            <button key={f} type="button" aria-pressed={payments.playerFields.includes(f)}
                                                className={`${styles.pill} ${payments.playerFields.includes(f) ? styles.pillOn : ''}`}
                                                onClick={() => togglePlayerField(f)}>{f}</button>
                                        ))}
                                    </div>
                                    {form.teamSize !== '1v1' && <p className={styles.fieldHint}>Team passes also ask for a team name and captain, and collect these for all {form.teamSize.split('v')[0]} players.</p>}
                                </div>

                                <div>
                                    <span className={styles.fieldLabel}>Extra questions</span>
                                    {payments.questions.map((q, i) => (
                                        <div key={i} className={styles.questionRow}>
                                            <input className={styles.input} value={q.label} onChange={e => setQuestion(i, 'label', e.target.value)} placeholder="Question" aria-label="Question" />
                                            <select className={styles.select} value={q.type} onChange={e => setQuestion(i, 'type', e.target.value)} aria-label="Answer type">
                                                <option value="text">Short answer</option>
                                                <option value="select">Dropdown</option>
                                            </select>
                                            <label className={styles.checkRow}>
                                                <input type="checkbox" checked={q.required} onChange={e => setQuestion(i, 'required', e.target.checked)} /> Required
                                            </label>
                                            <button type="button" className={`${styles.iconBtn} ${styles.removeBtn}`}
                                                onClick={() => setPay('questions', payments.questions.filter((_, j) => j !== i))} aria-label="Remove question"><FaTrash /></button>
                                            {q.type === 'select' &&
                                                <input className={`${styles.input} ${styles.questionOptions}`} value={q.options} onChange={e => setQuestion(i, 'options', e.target.value)}
                                                    placeholder="Options, separated by commas" aria-label="Dropdown options" />
                                            }
                                        </div>
                                    ))}
                                    <button type="button" className={`${styles.ghostBtn} ${styles.smallBtn}`} onClick={() => setPay('questions', [...payments.questions, blankQuestion()])}>
                                        <FaPlus /> Add a question
                                    </button>
                                </div>

                                <div className={styles.field}>
                                    <label htmlFor="refundPolicy">Refund policy</label>
                                    <textarea id="refundPolicy" className={styles.textarea} style={{ minHeight: '4rem' }} value={payments.refundPolicy}
                                        onChange={e => setPay('refundPolicy', e.target.value)} placeholder="e.g. Full refund until check-in opens." />
                                </div>

                                <div className={styles.field}>
                                    <label htmlFor="prizePaid">Prize (optional)</label>
                                    <input id="prizePaid" className={styles.input} value={form.prize} onChange={set('prize')} placeholder="e.g. 70% of the pot to 1st" />
                                </div>
                            </div>
                        }
                    </section>

                    <section className={`${styles.card} ${styles.form}`}>
                        <h2 className={styles.sectionTitle}>Details players will see</h2>
                        <div className={styles.field}>
                            <label htmlFor="description">Description</label>
                            <textarea id="description" className={styles.textarea} value={form.description} onChange={set('description')} maxLength={1000} />
                        </div>
                        <div className={styles.field}>
                            <label htmlFor="rules">Rules</label>
                            <textarea id="rules" className={styles.textarea} value={form.rules} onChange={set('rules')} maxLength={3000}
                                placeholder="Maps, settings, how to report scores, no-show policy..." />
                        </div>
                    </section>

                    {submitted && hasErrors && <p className={styles.fieldError}>Fix the highlighted fields above.</p>}
                    <div className={styles.formActions}>
                        <Link to="/host/events" className={styles.ghostBtn}>Cancel</Link>
                        <button type="submit" className={styles.primaryBtn}>Create event</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
