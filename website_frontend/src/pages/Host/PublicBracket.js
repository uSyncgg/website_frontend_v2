import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { FaCalendarAlt, FaCheckCircle, FaClock, FaGamepad, FaMapMarkerAlt, FaSitemap, FaTicketAlt, FaTrophy, FaUserSecret } from "react-icons/fa";
import { Bracket, ReportMatchDialog } from "components/Bracket/Bracket";
import {
    useHostEvent, eventStage, isFull, addEntrant, removeEntrant, setCheckedIn,
    matchState, matchReports, playerReportMatch, reportNoShow, noShowUnlocksAt,
} from "services/hostEventsMock";
import { buildBracket, allMatches } from "utils/bracket";
import { MockBanner, Modal, ShareButton, StageChip, capacityLabel, entrantsById, formatDate, formatLabel, unitLabel, isTeamEvent } from "./hostShared";
import styles from "./Host.module.css";

const USYNC_FEE = 0.05;

// MOCKUP ONLY: which entrant this browser is "logged in" as, so player actions
// (register, report scores, report no-shows) can be tried without real accounts.
const viewerKey = (eventId) => `usync.mock.viewer.${eventId}`;
const useMockViewer = (event) => {
    const [viewerId, setViewerId] = useState(() => {
        try {
            return localStorage.getItem(viewerKey(event?.id)) || '';
        } catch {
            return '';
        }
    });
    const valid = event?.entrants.some(e => e.id === viewerId) ? viewerId : '';
    const choose = (id) => {
        setViewerId(id);
        try {
            localStorage.setItem(viewerKey(event.id), id);
        } catch {
            // storage unavailable - keep it for this visit only
        }
    };
    return [valid, choose];
};

const RegisterDialog = ({ event, onClose, onRegistered }) => {
    const pay = event.payments?.enabled ? event.payments : null;
    const team = isTeamEvent(event);
    const form = event.signupForm ?? { playerFields: [], questions: [] };
    const teammateCount = team ? Number(event.teamSize[0]) - 1 : 0;
    const [name, setName] = useState('');
    const [captain, setCaptain] = useState('');
    const [email, setEmail] = useState('');
    const [teammates, setTeammates] = useState(() => Array(teammateCount).fill(''));
    const [answers, setAnswers] = useState({});
    const [tried, setTried] = useState(false);
    const [tierIndex, setTierIndex] = useState(0);
    const tier = pay?.tiers[tierIndex];
    const price = tier ? Number(tier.price) : 0;
    const answer = (key) => (e) => setAnswers(a => ({ ...a, [key]: e.target.value }));

    const missing = [
        !name.trim() && 'name',
        team && !captain.trim() && 'captain',
        !/^\S+@\S+\.\S+$/.test(email) && 'email',
        ...form.questions.filter(q => q.required && !answers[q.label]?.trim()).map(q => q.label),
    ].filter(Boolean);

    const submit = (e) => {
        e.preventDefault();
        setTried(true);
        if (missing.length) return;
        onRegistered(addEntrant(event.id, name.trim(), {
            captain: (team ? captain : name).trim(),
            email: email.trim(),
            teammates: teammates.map(t => t.trim()).filter(Boolean),
            answers,
            pass: tier?.name,
        }));
        onClose();
    };

    return (
        <Modal title={`Sign up for ${event.name}`} onClose={onClose}>
            <form onSubmit={submit} className={styles.form}>
                <div className={styles.field}>
                    <label htmlFor="reg-name">{team ? 'Team name' : 'Gamertag'}</label>
                    <input id="reg-name" className={styles.input} value={name} onChange={e => setName(e.target.value)} autoFocus maxLength={40} />
                </div>
                {team &&
                    <div className={styles.field}>
                        <label htmlFor="reg-captain">Captain's gamertag</label>
                        <input id="reg-captain" className={styles.input} value={captain} onChange={e => setCaptain(e.target.value)} maxLength={40} />
                    </div>
                }
                {teammates.map((t, i) => (
                    <div key={i} className={styles.field}>
                        <label htmlFor={`reg-mate-${i}`}>Teammate {i + 2} gamertag (optional)</label>
                        <input id={`reg-mate-${i}`} className={styles.input} value={t}
                            onChange={e => setTeammates(list => list.map((x, j) => (j === i ? e.target.value : x)))} maxLength={40} />
                    </div>
                ))}
                <div className={styles.field}>
                    <label htmlFor="reg-email">Contact email</label>
                    <input id="reg-email" type="email" className={styles.input} value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                {form.playerFields.map(f => (
                    <div key={f} className={styles.field}>
                        <label htmlFor={`reg-${f}`}>{team ? `Captain's ${f}` : f}</label>
                        <input id={`reg-${f}`} className={styles.input} value={answers[f] ?? ''} onChange={answer(f)} />
                    </div>
                ))}
                {form.questions.map(q => (
                    <div key={q.label} className={styles.field}>
                        <label htmlFor={`reg-q-${q.label}`}>{q.label}{q.required ? '' : ' (optional)'}</label>
                        {q.type === 'select'
                            ? (
                                <select id={`reg-q-${q.label}`} className={styles.select} value={answers[q.label] ?? ''} onChange={answer(q.label)}>
                                    <option value="" disabled>Select...</option>
                                    {q.options.split(',').map(o => o.trim()).filter(Boolean).map(o => <option key={o}>{o}</option>)}
                                </select>
                            )
                            : <input id={`reg-q-${q.label}`} className={styles.input} value={answers[q.label] ?? ''} onChange={answer(q.label)} />
                        }
                    </div>
                ))}
                {tried && missing.length > 0 && <p className={styles.fieldError}>Fill in: {missing.join(', ')}.</p>}

                {pay &&
                    <>
                        <div>
                            <span className={styles.fieldLabel}>Choose your pass</span>
                            <div className={styles.passList}>
                                {pay.tiers.map((t, i) => (
                                    <label key={i} className={`${styles.passOption} ${i === tierIndex ? styles.passOptionOn : ''}`}>
                                        <input type="radio" name="pass" checked={i === tierIndex} onChange={() => setTierIndex(i)} />
                                        <span>{t.name}</span>
                                        <strong>${Number(t.price).toFixed(2)}</strong>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <dl className={styles.detailList}>
                            <dt>Pass</dt><dd>${price.toFixed(2)}</dd>
                            <dt>uSync fee (5%)</dt><dd>${(price * USYNC_FEE).toFixed(2)}</dd>
                            <dt><strong>Total</strong></dt><dd><strong>${(price * (1 + USYNC_FEE)).toFixed(2)}</strong></dd>
                        </dl>
                        <p className={styles.fieldHint}>Mockup: in the live version this continues to secure Stripe checkout, the same as our event pass pages.</p>
                    </>
                }

                <div className={styles.formActions}>
                    <button type="button" className={styles.ghostBtn} onClick={onClose}>Cancel</button>
                    <button type="submit" className={styles.primaryBtn}>
                        {pay ? `Continue to payment` : 'Sign up'}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

// /brackets/:eventId - the public event page: everything players need to know,
// sign-up, and (once it's live) the bracket and their own match.
export const PublicBracket = () => {
    const { eventId } = useParams();
    const event = useHostEvent(eventId);
    const [viewerId, setViewerId] = useMockViewer(event);
    const [registering, setRegistering] = useState(false);
    const [reportingId, setReportingId] = useState(null);
    const [now, setNow] = useState(() => Date.now());
    const [tab, setTab] = useState(null);

    // Keep the no-show countdown current.
    useEffect(() => {
        const t = setInterval(() => setNow(Date.now()), 30000);
        return () => clearInterval(t);
    }, []);

    if (!event) {
        return (
            <div className={`standardContainer ${styles.page}`}>
                <div className={`${styles.inner} ${styles.emptyState}`}>
                    <h1 className={styles.sectionTitle}>Event not found</h1>
                    <Link to="/" className={styles.secondaryBtn}>Back home</Link>
                </div>
            </div>
        );
    }

    const stage = eventStage(event);
    const byId = entrantsById(event);
    const me = byId[viewerId];
    const published = event.bracket?.published;
    const built = published ? buildBracket(event.format, event.bracket.seeds, event.bracket.results) : null;
    const stateOf = (m) => matchState(event.bracket, m);
    const unit = unitLabel(event);
    const pay = event.payments?.enabled ? event.payments : null;
    const lastDelay = event.delays?.[event.delays.length - 1];

    const myMatch = built && me
        ? allMatches(built).find(m => m.status === 'ready' && (m.a === me.id || m.b === me.id))
        : null;
    const myState = myMatch && stateOf(myMatch);
    const opponent = myMatch && byId[myMatch.a === me.id ? myMatch.b : myMatch.a];
    const noShowAt = noShowUnlocksAt(event);
    const noShowOpen = noShowAt != null && now >= noShowAt.getTime();
    const reporting = reportingId && built && allMatches(built).find(m => m.id === reportingId);

    const canRegister = !me && event.registrationOpen && !published && !isFull(event);
    // Live events open on the bracket; upcoming ones on the event info.
    const activeTab = tab ?? (published ? 'bracket' : 'info');

    const unregister = () => {
        if (window.confirm(`Unregister ${me.name} from ${event.name}?`)) {
            removeEntrant(event.id, me.id);
            setViewerId('');
        }
    };

    const submitNoShow = () => {
        if (window.confirm(`Report ${opponent.name} as a no-show? The host will review it and decide what happens.`)) {
            reportNoShow(event.id, myMatch, me.id);
        }
    };

    return (
        <div className={`standardContainer ${styles.page}`}>
            <title>{`uSync | ${event.name}`}</title>

            <div className={styles.inner}>
                <MockBanner />

                <div className={styles.viewerBar}>
                    <FaUserSecret aria-hidden="true" />
                    <label htmlFor="viewer">Mockup - viewing as</label>
                    <select id="viewer" className={styles.select} value={viewerId} onChange={e => setViewerId(e.target.value)}>
                        <option value="">A visitor (not signed up)</option>
                        {event.entrants.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                    </select>
                </div>

                {lastDelay &&
                    <div className={styles.delayBanner}>
                        <FaClock /> <span>Start time moved to <strong>{formatDate(event.startsAt)}</strong>{lastDelay.reason && <> - {lastDelay.reason}</>}</span>
                    </div>
                }

                <div className={styles.pageHeader}>
                    <div>
                        <p className={styles.eyebrow}>{event.game} event</p>
                        <h1 className={styles.title}>{event.name}</h1>
                        <div className={styles.metaRow}>
                            <StageChip stage={stage} />
                            <span><FaGamepad /> {event.teamSize}</span>
                            <span><FaCalendarAlt /> {formatDate(event.startsAt)}</span>
                            <span><FaSitemap /> {formatLabel(event.format)} · Bo{event.bestOf}</span>
                            <span><FaMapMarkerAlt /> {event.locationType === 'online' ? 'Online' : event.venue}</span>
                            {event.prize && <span><FaTrophy /> {event.prize}</span>}
                        </div>
                    </div>
                    <div className={styles.btnRow}>
                        <ShareButton event={event} className={styles.ghostBtn} />
                        {canRegister && <button type="button" className={styles.primaryBtn} onClick={() => setRegistering(true)}>Sign up</button>}
                    </div>
                </div>

                <nav className={styles.tabs} aria-label="Event sections">
                    {[['info', 'Event info'], ['bracket', 'Bracket']].map(([key, label]) => (
                        <button key={key} type="button" aria-pressed={activeTab === key}
                            className={`${styles.tab} ${styles.tabButton} ${activeTab === key ? styles.tabActive : ''}`}
                            onClick={() => setTab(key)}>
                            {label}
                            {key === 'bracket' && myMatch && <span className={styles.tabDot} aria-label="you have a match to play" />}
                        </button>
                    ))}
                </nav>

                {activeTab === 'info' &&
                <div className={styles.publicLayout}>
                    <div className={styles.publicMain}>
                        {event.description &&
                            <section className={styles.card}>
                                <h2 className={styles.sectionTitle}>About this event</h2>
                                <p className={styles.preWrap}>{event.description}</p>
                            </section>
                        }

                        <section className={styles.card}>
                            <h2 className={styles.sectionTitle}>Details</h2>
                            <dl className={styles.detailList}>
                                <dt>Game</dt><dd>{event.game}</dd>
                                <dt>Format</dt><dd>{formatLabel(event.format)}, best of {event.bestOf}</dd>
                                <dt>Team size</dt><dd>{event.teamSize}</dd>
                                <dt>Starts</dt><dd>{formatDate(event.startsAt)}</dd>
                                <dt>Location</dt><dd>{event.locationType === 'online' ? 'Online' : event.venue}</dd>
                                <dt>Entry</dt><dd>{event.entryFee || 'Free'}</dd>
                                <dt>Prize</dt><dd>{event.prize || '-'}</dd>
                                <dt>Spots</dt><dd>{event.maxEntrants == null ? 'No limit' : `${event.maxEntrants} ${unit}`}</dd>
                                <dt>Check-in</dt><dd>{event.checkInRequired ? 'Required before the start' : 'Not required'}</dd>
                            </dl>
                        </section>

                        {event.rules &&
                            <section className={styles.card}>
                                <h2 className={styles.sectionTitle}>Rules</h2>
                                <p className={styles.preWrap}>{event.rules}</p>
                            </section>
                        }

                    </div>

                    <aside className={styles.publicSide}>
                        <section className={styles.card}>
                            <h2 className={styles.sectionTitle}>Registration</h2>
                            <p className={styles.blurb}>
                                {capacityLabel(event)} {unit} signed up
                                {pay && <> · <FaTicketAlt /> from ${Math.min(...pay.tiers.map(t => Number(t.price))).toFixed(2)}</>}
                            </p>

                            {myMatch &&
                                <button type="button" className={`${styles.secondaryBtn} ${styles.fullBtn}`} style={{ marginBottom: '.75rem' }} onClick={() => setTab('bracket')}>
                                    You have a match - go to the bracket
                                </button>
                            }
                            {me
                                ? (
                                    <>
                                        <p className={styles.registeredNote}><FaCheckCircle /> You're signed up as <strong>{me.name}</strong></p>
                                        {event.checkInRequired && !published &&
                                            (me.checkedIn
                                                ? <p className={styles.blurb}>Checked in. See you at the start!</p>
                                                : <button type="button" className={`${styles.primaryBtn} ${styles.fullBtn}`} onClick={() => setCheckedIn(event.id, me.id, true)}>Check in</button>)
                                        }
                                        {!published &&
                                            <button type="button" className={`${styles.dangerBtn} ${styles.fullBtn}`} onClick={unregister}>Unregister</button>}
                                    </>
                                )
                                : canRegister
                                    ? <button type="button" className={`${styles.primaryBtn} ${styles.fullBtn}`} onClick={() => setRegistering(true)}>{pay ? 'Sign up & pay' : 'Sign up'}</button>
                                    : <p className={styles.blurb}>{published ? 'The bracket is live - sign-ups are closed.' : isFull(event) ? 'This event is full.' : 'Sign-ups are closed.'}</p>
                            }
                        </section>

                    </aside>
                </div>
                }

                {activeTab === 'bracket' &&
                    <>
                        {myMatch &&
                            <section className={`${styles.card} ${styles.myMatch}`}>
                                <h2 className={styles.sectionTitle}>Your match</h2>
                                <p className={styles.blurb}>vs <strong>{opponent?.name}</strong></p>
                                {myState === 'disputed' && <p className={styles.tagDisputed}>DISPUTED - the host will decide</p>}
                                {myState === 'no_show' && <p className={styles.tagNoShow}>NO SHOW REPORTED - waiting on the host</p>}
                                {myState === 'awaiting' && (
                                    matchReports(event.bracket, myMatch)[me.id]
                                        ? <p className={styles.blurb}>You reported a score. Waiting for {opponent?.name} to confirm.</p>
                                        : <p className={styles.blurb}>{opponent?.name} reported a score. Report yours to confirm it.</p>
                                )}
                                <div className={styles.stackBtns}>
                                    <button type="button" className={styles.primaryBtn} onClick={() => setReportingId(myMatch.id)}>Report score</button>
                                    {myState !== 'no_show' && noShowAt &&
                                        <button type="button" className={styles.ghostBtn} disabled={!noShowOpen} onClick={submitNoShow}>
                                            Report No Show
                                        </button>
                                    }
                                    {noShowAt && !noShowOpen && myState !== 'no_show' &&
                                        <span className={styles.fieldHint}>Unlocks at {noShowAt.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} ({event.noShowMinutes} min after start)</span>}
                                </div>
                            </section>
                        }
                {published
                    ? (
                        <section className={styles.card}>
                            <h2 className={styles.sectionTitle}>Bracket</h2>
                            <Bracket
                                format={event.format}
                                built={built}
                                entrants={byId}
                                stateOf={stateOf}
                                viewerId={viewerId}
                                onSelect={me ? (m) => setReportingId(m.id) : undefined}
                                canSelect={(m) => m.status === 'ready' && (m.a === viewerId || m.b === viewerId)}
                            />
                        </section>
                    )
                    : (
                        <section className={styles.card}>
                            <h2 className={styles.sectionTitle}>Who's playing</h2>
                            <p className={styles.blurb}>The bracket is posted once sign-ups close.</p>
                            <div className={styles.chipWrap}>
                                {event.entrants.map(e => (
                                    <span key={e.id} className={`${styles.chip} ${styles.nameChip} ${e.id === viewerId ? styles.nameChipYou : ''}`}>{e.name}</span>
                                ))}
                                {event.entrants.length === 0 && <span className={styles.muted}>No one yet - be the first.</span>}
                            </div>
                        </section>
                    )
                }
                    </>
                }

            </div>

            {registering && <RegisterDialog event={event} onClose={() => setRegistering(false)} onRegistered={setViewerId} />}

            {reporting && me &&
                <ReportMatchDialog
                    key={reporting.id}
                    match={reporting}
                    entrants={byId}
                    bestOf={event.bestOf}
                    mode="player"
                    viewerId={me.id}
                    reports={matchReports(event.bracket, reporting)}
                    onClose={() => setReportingId(null)}
                    onSave={(a, b) => { playerReportMatch(event.id, reporting, me.id, a, b); setReportingId(null); }}
                />
            }
        </div>
    );
};
