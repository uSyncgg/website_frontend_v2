import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useAuth, useCurrentUser } from "hooks";
import { FaCalendarAlt, FaCheckCircle, FaClock, FaGamepad, FaMapMarkerAlt, FaSitemap, FaTicketAlt, FaTrophy } from "react-icons/fa";
import { Bracket, ReportMatchDialog } from "components/Bracket/Bracket";
import {
    useHostEvent, eventStage, isFull, register, unregister as leaveEvent, isPending, signedUpEntrants, pendingEntrants, teamSizeOf,
    matchState, matchReports, playerReportMatch, reportNoShow, noShowUnlocksAt,
} from "services/brackets";
import { getMyTeams } from "services/teams";
import { getApiErrorMessage } from "utils/apiError";
import { buildBracket, allMatches } from "utils/bracket";
import { EVENT_TYPES } from "utils/hostEvents";
import { BracketError, Modal, ShareButton, StageChip, capacityLabel, entrantsById, formatDate, formatLabel, unitLabel, isTeamEvent, EventLoading } from "./hostShared";
import styles from "./Host.module.css";

const USYNC_FEE = 0.05;

// Why one of your teams can't be entered in this event, or '' when it can. A team that's short
// of players can still enter - it shows as pending until its roster fills.
const teamEntryProblem = (team, event) => {
    if (!['owner', 'captain'].includes(team.my_role)) return 'Only the owner or a captain can enter this team';
    if (event.entrants.some(e => e.teamId === team.public_id)) return 'Already entered';
    return '';
};

const RegisterDialog = ({ event, username, onClose }) => {
    const pay = event.payments?.enabled ? event.payments : null;
    const team = isTeamEvent(event);
    const need = teamSizeOf(event);
    const form = event.signupForm ?? { playerFields: [], questions: [] };
    const { session } = useAuth();
    const token = session?.access_token;
    const [myTeams, setMyTeams] = useState(team ? null : []);
    const [loadError, setLoadError] = useState('');
    const [teamId, setTeamId] = useState('');
    const [email, setEmail] = useState('');
    const [answers, setAnswers] = useState({});
    const [tried, setTried] = useState(false);
    const [saving, setSaving] = useState(false);
    const [tierIndex, setTierIndex] = useState(0);
    const tier = pay?.tiers[tierIndex];
    const price = tier ? Number(tier.price) : 0;
    const answer = (key) => (e) => setAnswers(a => ({ ...a, [key]: e.target.value }));
    const chosen = myTeams?.find(t => t.public_id === teamId);
    const short = chosen ? need - chosen.members.length : 0;

    useEffect(() => {
        if (!team || !token) return;
        getMyTeams(token).then(setMyTeams).catch(err => { setMyTeams([]); setLoadError(getApiErrorMessage(err)); });
    }, [team, token]);

    const missing = [
        team && (!chosen || teamEntryProblem(chosen, event)) && 'a team you can enter',
        !/^\S+@\S+\.\S+$/.test(email) && 'email',
        ...form.questions.filter(q => q.required && !answers[q.label]?.trim()).map(q => q.label),
    ].filter(Boolean);

    const submit = async (e) => {
        e.preventDefault();
        setTried(true);
        if (missing.length) return;
        setSaving(true);
        const done = await register(event.id, {
            teamId: team ? chosen.public_id : null,
            email: email.trim(),
            answers,
            pass: tier?.name ?? null,
        });
        setSaving(false);
        if (done) onClose();
    };

    return (
        <Modal title={`Sign up for ${event.name}`} onClose={onClose}>
            <form onSubmit={submit} className={styles.form}>
                {team
                    ? (
                        <div>
                            <span className={styles.fieldLabel}>Choose your team ({need} players to be signed up)</span>
                            {myTeams === null && <p className={styles.fieldHint}>Loading your teams…</p>}
                            {loadError && <p className={styles.fieldError}>{loadError}</p>}
                            {myTeams?.length === 0 && !loadError &&
                                <p className={styles.fieldHint}>You're not on a team yet. <Link to="/dashboard?tab=teams">Make a team</Link>, invite players, then come back.</p>}
                            {myTeams?.length > 0 &&
                                <div className={styles.passList}>
                                    {myTeams.map(t => {
                                        const problem = teamEntryProblem(t, event);
                                        return (
                                            <label key={t.public_id} className={`${styles.passOption} ${t.public_id === teamId ? styles.passOptionOn : ''}`}>
                                                <input type="radio" name="team" disabled={!!problem} checked={t.public_id === teamId} onChange={() => setTeamId(t.public_id)} />
                                                <span>{t.name}{t.game ? ` · ${t.game}` : ''}</span>
                                                <strong>{problem || `${t.members.length} / ${need} players`}</strong>
                                            </label>
                                        );
                                    })}
                                </div>
                            }
                            {chosen && short > 0 &&
                                <p className={styles.fieldHint}>
                                    {chosen.name} has {chosen.members.length} of {need} players. It'll show to the host as <strong>pending</strong> and
                                    won't take a spot until {short} more player{short > 1 ? 's join' : ' joins'} - then it's signed up automatically.
                                </p>
                            }
                        </div>
                    )
                    : <p className={styles.blurb}>You'll be entered as <strong>{username}</strong>.</p>
                }
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
                    <button type="submit" className={styles.primaryBtn} disabled={saving}>
                        {saving ? 'Signing up…' : pay ? `Continue to payment` : 'Sign up'}
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
    const { defaultProfile } = useCurrentUser();
    const username = defaultProfile?.username;
    const [registering, setRegistering] = useState(false);
    const [reportingId, setReportingId] = useState(null);
    const [now, setNow] = useState(() => Date.now());
    const [tab, setTab] = useState(null);

    // Keep the no-show countdown current.
    useEffect(() => {
        const t = setInterval(() => setNow(Date.now()), 30000);
        return () => clearInterval(t);
    }, []);

    if (!event) return <EventLoading event={event} backTo="/" backLabel="Back home" />;

    // Your entrant (solo, or a team you're on). Only a solo player, or a team's owner or
    // captain, can report scores and no-shows; other teammates just see their match.
    const viewerId = event.viewerEntrantId ?? '';
    const canAct = event.viewerCanAct;

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
            leaveEvent(event.id);
        }
    };

    const submitNoShow = () => {
        if (window.confirm(`Report ${opponent.name} as a no-show? The host will review it and decide what happens.`)) {
            reportNoShow(event.id, myMatch);
        }
    };

    return (
        <div className={`standardContainer ${styles.page}`}>
            <title>{`uSync | ${event.name}`}</title>

            <div className={styles.inner}>
                <BracketError />

                {lastDelay &&
                    <div className={styles.delayBanner}>
                        <FaClock /> <span>Start time moved to <strong>{formatDate(event.startsAt)}</strong>{lastDelay.reason && <> - {lastDelay.reason}</>}</span>
                    </div>
                }

                <div className={styles.pageHeader}>
                    <div>
                        <p className={styles.eyebrow}>{event.game} · {EVENT_TYPES[event.eventType] ?? 'Event'}</p>
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
                        {canRegister && (username
                            ? <button type="button" className={styles.primaryBtn} onClick={() => setRegistering(true)}>Sign up</button>
                            : <Link to="/login" className={styles.primaryBtn}>Log in to sign up</Link>)}
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
                                <dt>Type</dt><dd>{EVENT_TYPES[event.eventType] ?? '-'}</dd>
                                <dt>Game</dt><dd>{event.game}</dd>
                                <dt>Format</dt><dd>{formatLabel(event.format)}, best of {event.bestOf}</dd>
                                <dt>Team size</dt><dd>{event.teamSize}</dd>
                                <dt>Starts</dt><dd>{formatDate(event.startsAt)}</dd>
                                <dt>Location</dt><dd>{event.locationType === 'online' ? 'Online' : event.venue}</dd>
                                <dt>Entry</dt><dd>{event.entryFee || 'Free'}</dd>
                                <dt>Prize</dt><dd>{event.prize || '-'}</dd>
                                <dt>Spots</dt><dd>{event.maxEntrants == null ? 'No limit' : `${event.maxEntrants} ${unit}`}</dd>
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
                                        {isPending(event, me)
                                            ? <p className={styles.blurb}><strong>{me.name}</strong> is pending: {me.rosterSize ?? 0} of {teamSizeOf(event)} players. Invite {teamSizeOf(event) - (me.rosterSize ?? 0)} more from your team page and it's signed up automatically.</p>
                                            : <p className={styles.registeredNote}><FaCheckCircle /> You're signed up as <strong>{me.name}</strong></p>}
                                        {!published &&
                                            <button type="button" className={`${styles.dangerBtn} ${styles.fullBtn}`} onClick={unregister}>Unregister</button>}
                                    </>
                                )
                                : canRegister
                                    ? (username
                                        ? <button type="button" className={`${styles.primaryBtn} ${styles.fullBtn}`} onClick={() => setRegistering(true)}>{pay ? 'Sign up & pay' : 'Sign up'}</button>
                                        : <Link to="/login" className={`${styles.primaryBtn} ${styles.fullBtn}`}>Log in to sign up</Link>)
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
                                onSelect={me && canAct ? (m) => setReportingId(m.id) : undefined}
                                canSelect={(m) => m.status === 'ready' && (m.a === viewerId || m.b === viewerId)}
                            />
                        </section>
                    )
                    : (
                        <section className={styles.card}>
                            <h2 className={styles.sectionTitle}>Who's playing</h2>
                            <p className={styles.blurb}>The bracket is posted once sign-ups close.</p>
                            <div className={styles.chipWrap}>
                                {signedUpEntrants(event).map(e => (
                                    <span key={e.id} className={`${styles.chip} ${styles.nameChip} ${e.id === viewerId ? styles.nameChipYou : ''}`}>{e.name}</span>
                                ))}
                                {pendingEntrants(event).map(e => (
                                    <span key={e.id} className={`${styles.chip} ${styles.nameChip} ${e.id === viewerId ? styles.nameChipYou : ''}`} style={{ opacity: .6 }}
                                        title={`Pending: ${e.rosterSize ?? 0} of ${teamSizeOf(event)} players`}>{e.name} (pending)</span>
                                ))}
                                {event.entrants.length === 0 && <span className={styles.muted}>No one yet - be the first.</span>}
                            </div>
                        </section>
                    )
                }
                    </>
                }

            </div>

            {registering && <RegisterDialog event={event} username={username} onClose={() => setRegistering(false)} />}

            {reporting && me && canAct &&
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
