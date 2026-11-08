import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useCurrentUser } from "hooks";
import { createEvent, useHostEvent } from "services/brackets";
import { FORMATS, HAS_FINAL } from "utils/bracket";
import { PROFILE_LABELS, canHostBrackets, profileUrl } from "utils/profiles";
import { EVENT_TYPES, GAME_TITLES, HOST_GAMES, HOSTING_DASHBOARD_PATH, PLATFORMS, TOURNAMENT_GAME } from "utils/hostEvents";
import { PlayerPicker } from "components/Teams/TeamParts";
import { BEST_OF, BracketError, TEAM_SIZES } from "./hostShared";
import { SearchSelect } from "./SearchSelect";
import styles from "./Host.module.css";

// Same shape as the existing pass portal (/passes/:slug): pass tiers, per-player
// fields, extra questions, and a 5% uSync fee on top of the pass price.
// Gamertag is always asked for; Discord and Twitter / X are the only other IDs.
const PLAYER_FIELD_OPTIONS = ["Discord", "Twitter / X"];
const USYNC_FEE = 0.05;
const MAX_RESTRICTIONS = 10;

const defaultStart = () => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return { date: d.toISOString().slice(0, 10), time: '19:00' };
};

const blankTier = () => ({ name: '', price: '', capacity: '' });
const blankQuestion = () => ({ label: '', type: 'text', options: '', required: false });

const pad = (n) => String(n).padStart(2, '0');

// The form's fields filled from an earlier event (Duplicate on the Archived tab). The date moves
// to next week; the time of day, settings, sign-up form, payments and admins carry over.
const fromTemplate = (event, base) => {
    const at = new Date(event.startsAt);
    return {
        ...base,
        name: event.name,
        eventType: event.eventType,
        game: HOST_GAMES.includes(event.game) ? event.game : base.game,
        gameTitle: event.gameTitle ?? '',
        format: event.format,
        teamSize: event.teamSize,
        bestOf: event.bestOf,
        differentFinals: !!event.finalBestOf,
        finalBestOf: event.finalBestOf ?? base.finalBestOf,
        maxEntrants: event.maxEntrants == null ? base.maxEntrants : String(event.maxEntrants),
        uncapped: event.maxEntrants == null,
        useMin: event.minEntrants != null,
        minEntrants: event.minEntrants == null ? base.minEntrants : String(event.minEntrants),
        platform: event.platform ?? base.platform,
        time: `${pad(at.getHours())}:${pad(at.getMinutes())}`,
        venue: event.venue ?? '',
        prize: event.prize ?? '',
        description: event.description ?? '',
        rules: event.rules ?? '',
        noShowMinutes: event.noShowMinutes == null ? base.noShowMinutes : String(event.noShowMinutes),
        noShowOff: event.noShowMinutes == null,
        usePayments: !!event.payments?.enabled,
    };
};

const GAME_OPTIONS = HOST_GAMES.map(g => ({ value: g, label: g }));
const titleOptions = (game) => (GAME_TITLES[game] ?? []).map(([title, year]) => ({ value: title, label: title, hint: String(year) }));

// /host/events/new, or /host/events/new?profile=<public_id> from a host or venue profile's
// "Add event" button: the event is posted as that profile (or the one you're viewing as) and
// listed on it. ?type= and ?game= pre-fill the form from the page the host came from (the
// "Add your event" button on a game's Leagues page opens it as a league for that game).
export const CreateEvent = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { profiles, defaultProfile } = useCurrentUser();
    // Posted as the profile the button was on, otherwise the one you're viewing as.
    const requested = profiles.find(p => p.public_id === searchParams.get('profile') && canHostBrackets(p));
    const hostProfile = requested ?? (canHostBrackets(defaultProfile) ? defaultProfile : undefined);
    const backTo = hostProfile ? profileUrl(hostProfile) : HOSTING_DASHBOARD_PATH;
    const start = defaultStart();
    const typeParam = searchParams.get('type');
    const gameParam = searchParams.get('game');
    const [form, setForm] = useState({
        name: '',
        eventType: EVENT_TYPES[typeParam] ? typeParam : '',
        game: HOST_GAMES.includes(gameParam) ? gameParam : HOST_GAMES[0],
        gameTitle: '',
        format: 'single_elim', teamSize: '1v1', bestOf: 3,
        differentFinals: false, finalBestOf: 5,
        maxEntrants: '16', uncapped: false,
        useMin: false, minEntrants: '4',
        platform: 'pc_allowed',
        date: start.date, time: start.time, venue: '', prize: '',
        description: '', rules: '', noShowMinutes: '10', noShowOff: false,
        usePayments: true,
    });
    // Custom restrictions the host types in (e.g. "No snipers", "Controller only").
    const [restrictions, setRestrictions] = useState([]);
    // Players invited to help run the event; each accepts from their notifications.
    const [admins, setAdmins] = useState([]);
    const [payments, setPayments] = useState({
        notifyEmail: '', tiers: [{ name: 'Player Pass', price: '', capacity: '' }],
    });
    // What every player fills in when they sign up (free or paid), so the host knows who joined.
    const [signupForm, setSignupForm] = useState({ playerFields: ['Discord'], questions: [] });
    const [submitted, setSubmitted] = useState(false);

    // ?from=<event id>: start from an earlier event's settings (filled once it loads).
    const fromId = searchParams.get('from');
    const template = useHostEvent(fromId);
    const applied = useRef(false);
    useEffect(() => {
        if (!template || applied.current) return;
        applied.current = true;
        setForm(f => fromTemplate(template, f));
        setRestrictions(template.restrictions ?? []);
        setAdmins((template.admins ?? []).filter(a => a.status === 'accepted'));
        if (template.payments?.enabled) {
            setPayments({ notifyEmail: template.payments.notifyEmail ?? '', tiers: template.payments.tiers?.length ? template.payments.tiers : [blankTier()] });
        }
        const form = template.signupForm ?? {};
        setSignupForm({
            playerFields: (form.playerFields ?? []).filter(f => PLAYER_FIELD_OPTIONS.includes(f)),
            questions: form.questions ?? [],
        });
    }, [template]);

    const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
    const setValue = (field, value) => setForm(f => ({ ...f, [field]: value }));
    const setPay = (field, value) => setPayments(p => ({ ...p, [field]: value }));
    const setTier = (i, field, value) => setPay('tiers', payments.tiers.map((t, j) => (j === i ? { ...t, [field]: value } : t)));
    const setSignup = (field, value) => setSignupForm(f => ({ ...f, [field]: value }));
    const setQuestion = (i, field, value) => setSignup('questions', signupForm.questions.map((q, j) => (j === i ? { ...q, [field]: value } : q)));
    const togglePlayerField = (f) => setSignup('playerFields', signupForm.playerFields.includes(f)
        ? signupForm.playerFields.filter(x => x !== f)
        : [...signupForm.playerFields, f]);

    // LANs are in person (they need a venue); everything else is online.
    const isLan = form.eventType === 'lan';
    // Only Call of Duty tournaments can be posted for now.
    const isTournament = form.eventType === 'tournament';
    const game = isTournament ? TOURNAMENT_GAME : form.game;
    const titles = titleOptions(game);
    const hasFinal = !!HAS_FINAL[form.format];

    const chooseGame = (g) => setForm(f => ({ ...f, game: g, gameTitle: g === f.game ? f.gameTitle : '' }));

    const maxNum = Number(form.maxEntrants);
    const minNum = Number(form.minEntrants);
    const errors = {
        name: !form.name.trim() && 'Give your event a name',
        eventType: !form.eventType && 'Pick what kind of event this is',
        gameTitle: titles.length > 0 && !form.gameTitle && `Pick which ${game} game`,
        venue: isLan && !form.venue.trim() && 'Add where the LAN is held',
        maxEntrants: !form.uncapped && (!Number.isInteger(maxNum) || maxNum < 2) && 'Enter a whole number of 2 or more, or tick "No cap"',
        minEntrants: form.useMin && (
            (!Number.isInteger(minNum) || minNum < 2) ? 'Enter a whole number of 2 or more'
                : (!form.uncapped && minNum > maxNum) ? 'The minimum can\'t be more than the maximum' : false),
        finalBestOf: hasFinal && form.differentFinals && Number(form.finalBestOf) === Number(form.bestOf) && 'Pick a different best of for the finals, or untick the box',
        restrictions: restrictions.some(r => !r.trim()) && 'Fill in or remove the empty restriction',
        noShowMinutes: !form.noShowOff && !(Number(form.noShowMinutes) >= 0) && 'Enter how many minutes to wait, or turn the timer off',
        notifyEmail: form.usePayments && !/^\S+@\S+\.\S+$/.test(payments.notifyEmail) && 'Add the email we should notify about new sign-ups',
        tiers: form.usePayments && payments.tiers.some(t => !t.name.trim() || !(Number(t.price) > 0)) && 'Every pass needs a name and a price above $0',
    };
    const hasErrors = Object.values(errors).some(Boolean);
    const err = (key) => submitted && errors[key] && <p className={styles.fieldError}>{errors[key]}</p>;

    const [saving, setSaving] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (hasErrors) return;
        if (!hostProfile) return;
        setSaving(true);
        const { date, time, uncapped, usePayments, noShowOff, differentFinals, useMin, ...rest } = form;
        const lowestPrice = Math.min(...payments.tiers.map(t => Number(t.price)));
        const id = await createEvent({
            ...rest,
            name: form.name.trim(),
            game,
            gameTitle: titles.length ? form.gameTitle : '',
            locationType: isLan ? 'in_person' : 'online',
            venue: isLan ? form.venue.trim() : '',
            bestOf: Number(form.bestOf),
            finalBestOf: hasFinal && differentFinals ? Number(form.finalBestOf) : null,
            maxEntrants: uncapped ? null : maxNum,
            minEntrants: useMin ? minNum : null,
            restrictions: restrictions.map(r => r.trim()),
            admins: admins.map(a => a.public_id),
            noShowMinutes: noShowOff ? null : Number(form.noShowMinutes),
            startsAt: new Date(`${date}T${time}`).toISOString(),
            entryFee: usePayments ? `$${lowestPrice.toFixed(2)}` : 'Free',
            payments: usePayments ? { enabled: true, ...payments } : { enabled: false },
            signupForm: {
                ...signupForm,
                questions: signupForm.questions.filter(q => q.label.trim()),
            },
            registrationOpen: true,
            hostProfile: hostProfile.public_id,
        });
        setSaving(false);
        if (id) navigate(`/host/events/${id}`);
    };

    const unit = form.teamSize === '1v1' ? 'players' : 'teams';

    return (
        <div className={`standardContainer ${styles.page}`}>
            <title>uSync | Create Event</title>
            <meta name="robots" content="noindex, nofollow" />

            <div className={styles.narrow}>
                <BracketError />
                <div className={styles.pageHeader}>
                    <div>
                        <p className={styles.eyebrow}>
                            <Link to={backTo} className={styles.eyebrow}>{hostProfile ? hostProfile.username : 'Event Dashboard'}</Link>
                        </p>
                        <h1 className={styles.title}>{template ? 'Duplicate an event' : 'Create an event'}</h1>
                        {template && <p className={styles.subtitle}>Starting from <strong>{template.name}</strong>. Check the date and change anything you need.</p>}
                        <p className={styles.subtitle}>
                            {hostProfile && <>Posting as <strong>{hostProfile.username}</strong> ({PROFILE_LABELS[hostProfile.type]}), so it shows on that profile. </>}
                            Players can sign up as soon as you create it. You'll build the bracket once sign-ups close.
                        </p>
                    </div>
                </div>

                <form className={styles.form} onSubmit={submit} noValidate>
                    <section className={`${styles.card} ${styles.form}`}>
                        <h2 className={styles.sectionTitle}>The basics</h2>
                        <div className={styles.field}>
                            <label htmlFor="eventType">Event type</label>
                            <select id="eventType" className={styles.select} value={form.eventType} onChange={set('eventType')}>
                                <option value="" disabled>Choose a type</option>
                                {Object.entries(EVENT_TYPES).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
                            </select>
                            {form.eventType && <p className={styles.fieldHint}>{isLan ? 'LANs are held in person.' : 'Played online.'}</p>}
                            {err('eventType')}
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="name">Event name</label>
                            <input id="name" className={styles.input} value={form.name} onChange={set('name')} placeholder="e.g. Friday Night 1v1s" maxLength={80} />
                            {err('name')}
                        </div>

                        <div className={styles.fieldRow}>
                            <div className={styles.field}>
                                <label htmlFor="game">Game</label>
                                <SearchSelect id="game" value={game} options={GAME_OPTIONS} onChange={chooseGame}
                                    disabled={isTournament} searchPlaceholder="Search games" />
                                {isTournament && <p className={styles.fieldHint}>Only Call of Duty tournaments for now.</p>}
                            </div>
                            <div className={styles.field}>
                                <label htmlFor="teamSize">Team size</label>
                                <select id="teamSize" className={styles.select} value={form.teamSize} onChange={set('teamSize')}>
                                    {TEAM_SIZES.map(t => <option key={t}>{t}</option>)}
                                </select>
                            </div>
                        </div>

                        {titles.length > 0 &&
                            <div className={styles.field}>
                                <label htmlFor="gameTitle">Which {game} game</label>
                                <SearchSelect id="gameTitle" value={form.gameTitle} options={titles} onChange={v => setValue('gameTitle', v)}
                                    placeholder={`Choose a ${game} game`} searchPlaceholder={`Search ${game} games`} />
                                {err('gameTitle')}
                            </div>
                        }

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

                        {isLan &&
                            <div className={styles.field}>
                                <label htmlFor="venue">Venue / address</label>
                                <input id="venue" className={styles.input} value={form.venue} onChange={set('venue')} placeholder="Venue name, city" />
                                {err('venue')}
                            </div>
                        }

                        {!isLan &&
                            <div className={styles.field}>
                                <span className={styles.fieldLabel}>Platforms</span>
                                <div className={styles.segmented} role="radiogroup" aria-label="Platforms">
                                    {Object.entries(PLATFORMS).map(([value, label]) => (
                                        <button key={value} type="button" role="radio" aria-checked={form.platform === value}
                                            className={`${styles.segment} ${form.platform === value ? styles.segmentActive : ''}`}
                                            onClick={() => setValue('platform', value)}>{label}</button>
                                    ))}
                                </div>
                            </div>
                        }

                        <div className={styles.field}>
                            <span className={styles.fieldLabel}>Restrictions (optional)</span>
                            {restrictions.map((r, i) => (
                                <div key={i} className={styles.restrictionRow}>
                                    <input className={styles.input} value={r} maxLength={200} aria-label={`Restriction ${i + 1}`}
                                        onChange={e => setRestrictions(list => list.map((x, j) => (j === i ? e.target.value : x)))}
                                        placeholder="e.g. No snipers, controller only, NA servers" />
                                    <button type="button" className={`${styles.iconBtn} ${styles.removeBtn}`} aria-label="Remove restriction"
                                        onClick={() => setRestrictions(list => list.filter((_, j) => j !== i))}><FaTrash /></button>
                                </div>
                            ))}
                            {restrictions.length < MAX_RESTRICTIONS &&
                                <button type="button" className={`${styles.ghostBtn} ${styles.smallBtn}`} onClick={() => setRestrictions(list => [...list, ''])}>
                                    <FaPlus /> Add a restriction
                                </button>
                            }
                            {err('restrictions')}
                        </div>
                    </section>

                    <section className={`${styles.card} ${styles.form}`}>
                        <h2 className={styles.sectionTitle}>Format</h2>
                        <div className={styles.formatGrid} role="radiogroup" aria-label="Format">
                            {Object.entries(FORMATS).map(([key, f]) => (
                                <button key={key} type="button" role="radio" aria-checked={form.format === key}
                                    className={`${styles.formatCard} ${form.format === key ? styles.formatCardActive : ''}`}
                                    onClick={() => setValue('format', key)}>
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
                                {hasFinal &&
                                    <>
                                        <label className={styles.checkRow} style={{ marginTop: '.5rem' }}>
                                            <input type="checkbox" checked={form.differentFinals} onChange={set('differentFinals')} /> Finals are a different best of
                                        </label>
                                        {form.differentFinals &&
                                            <select id="finalBestOf" aria-label="Finals best of" className={styles.select} style={{ marginTop: '.5rem' }}
                                                value={form.finalBestOf} onChange={set('finalBestOf')}>
                                                {BEST_OF.map(b => <option key={b} value={b}>Finals: best of {b}</option>)}
                                            </select>
                                        }
                                        {err('finalBestOf')}
                                    </>
                                }
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

                        <div className={styles.field}>
                            <label className={styles.checkRow}>
                                <input type="checkbox" checked={form.useMin} onChange={set('useMin')} /> Set a minimum number of {unit}
                            </label>
                            {form.useMin &&
                                <input id="minEntrants" type="number" min={2} step={1} inputMode="numeric" className={styles.input}
                                    style={{ maxWidth: '10rem', marginTop: '.5rem' }} aria-label={`Minimum ${unit}`}
                                    value={form.minEntrants} onChange={set('minEntrants')} />
                            }
                            <p className={styles.fieldHint}>Players see this on the event page, so they know it needs at least this many to run.</p>
                            {err('minEntrants')}
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="noShowMinutes">No-show timer in minutes (optional)</label>
                            <input id="noShowMinutes" type="number" min={0} step={1} inputMode="numeric" className={styles.input}
                                style={{ maxWidth: '10rem' }} value={form.noShowOff ? '' : form.noShowMinutes} onChange={set('noShowMinutes')}
                                disabled={form.noShowOff} placeholder={form.noShowOff ? 'Off' : ''} />
                            <label className={styles.checkRow} style={{ marginTop: '.5rem' }}>
                                <input type="checkbox" checked={form.noShowOff} onChange={set('noShowOff')} /> Don't use a no-show timer
                            </label>
                            <p className={styles.fieldHint}>
                                {form.noShowOff
                                    ? 'Players won\'t see a "Report No Show" button.'
                                    : 'Players can "Report No Show" this long after the event starts. You decide what happens next.'}
                            </p>
                            {err('noShowMinutes')}
                        </div>
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

                    <section className={`${styles.card} ${styles.form}`}>
                        <h2 className={styles.sectionTitle}>Sign-up form</h2>
                        <p className={styles.blurb} style={{ margin: 0 }}>
                            Everyone who signs up fills this in, free or paid, so you can see exactly who joined. You'll find their answers on the Entrants tab.
                        </p>
                        <div>
                            <span className={styles.fieldLabel}>Ask each player for</span>
                            <div className={styles.pillGrid}>
                                <span className={`${styles.pill} ${styles.pillOn} ${styles.pillLocked}`}>Gamertag (always)</span>
                                {PLAYER_FIELD_OPTIONS.map(f => (
                                    <button key={f} type="button" aria-pressed={signupForm.playerFields.includes(f)}
                                        className={`${styles.pill} ${signupForm.playerFields.includes(f) ? styles.pillOn : ''}`}
                                        onClick={() => togglePlayerField(f)}>{f}</button>
                                ))}
                            </div>
                            {form.teamSize !== '1v1' && <p className={styles.fieldHint}>Team passes also ask for a team name and captain, and collect these for all {form.teamSize.split('v')[0]} players.</p>}
                        </div>

                        <div>
                            <span className={styles.fieldLabel}>Extra questions</span>
                            {signupForm.questions.map((q, i) => (
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
                                        onClick={() => setSignup('questions', signupForm.questions.filter((_, j) => j !== i))} aria-label="Remove question"><FaTrash /></button>
                                    {q.type === 'select' &&
                                        <input className={`${styles.input} ${styles.questionOptions}`} value={q.options} onChange={e => setQuestion(i, 'options', e.target.value)}
                                            placeholder="Options, separated by commas" aria-label="Dropdown options" />
                                    }
                                </div>
                            ))}
                            <button type="button" className={`${styles.ghostBtn} ${styles.smallBtn}`} onClick={() => setSignup('questions', [...signupForm.questions, blankQuestion()])}>
                                <FaPlus /> Add a question
                            </button>
                        </div>

                        <div>
                            <label className={styles.fieldLabel} htmlFor="admin-picker">Event admins (optional)</label>
                            <p className={styles.fieldHint} style={{ marginTop: 0 }}>
                                Invite players to help run this event. They get an invite in their notifications, and once they accept they can manage it like you can.
                            </p>
                            <PlayerPicker id="admin-picker" selected={admins} onChange={setAdmins} />
                        </div>
                    </section>

                    <section className={`${styles.card} ${styles.form}`}>
                        <h2 className={styles.sectionTitle}>Payments</h2>
                        <div className={styles.segmented} role="radiogroup" aria-label="Payments">
                            {[[true, 'Collect entry fees with uSync'], [false, 'Free / handled elsewhere']].map(([value, label]) => (
                                <button key={label} type="button" role="radio" aria-checked={form.usePayments === value}
                                    className={`${styles.segment} ${form.usePayments === value ? styles.segmentActive : ''}`}
                                    onClick={() => setValue('usePayments', value)}>{label}</button>
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
                                    <label htmlFor="notifyEmail">Email for new sign-ups</label>
                                    <input id="notifyEmail" type="email" className={styles.input} value={payments.notifyEmail}
                                        onChange={e => setPay('notifyEmail', e.target.value)} placeholder="you@example.com" />
                                    <p className={styles.fieldHint}>
                                        We email you here each time someone pays to sign up. Entry fees are collected by uSync and paid out to you separately.
                                    </p>
                                    {err('notifyEmail')}
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

                                <div className={styles.field}>
                                    <label htmlFor="prizePaid">Prize (optional)</label>
                                    <input id="prizePaid" className={styles.input} value={form.prize} onChange={set('prize')} placeholder="e.g. 70% of the pot to 1st" />
                                </div>
                            </div>
                        }
                    </section>

                    {submitted && hasErrors && <p className={styles.fieldError}>Fix the highlighted fields above.</p>}
                    <div className={styles.formActions}>
                        <Link to={backTo} className={styles.ghostBtn}>Cancel</Link>
                        <button type="submit" className={styles.primaryBtn} disabled={saving}>{saving ? 'Creating…' : 'Create event'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};
