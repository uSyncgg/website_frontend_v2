import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useAuth, useCurrentUser } from "hooks";
import { FaCalendarAlt, FaCheckCircle, FaClock, FaGamepad, FaMapMarkerAlt, FaSitemap, FaTicketAlt, FaTrophy } from "react-icons/fa";
import { Bracket, ReportMatchDialog } from "components/Bracket/Bracket";
import {
    useHostEvent, eventStage, isFull, register, unregister as leaveEvent, isPending, signedUpEntrants, pendingEntrants, teamSizeOf,
    matchState, matchReports, playerReportMatch, reportNoShow, noShowUnlocksAt,
} from "services/brackets";
import { getMyTeams } from "services/teams";
import { useWallet, formatMoney } from "services/bank";
import { getApiErrorMessage } from "utils/apiError";
import { buildBracket, allMatches, matchBestOf } from "utils/bracket";
import { EVENT_TYPES, matchUrl } from "utils/hostEvents";
import { BracketError, Modal, ShareButton, StageChip, capacityLabel, entrantsById, formatDate, formatLabel, unitLabel, isTeamEvent, EventLoading, formatSummary, locationLabel, gameDisplayName, RestrictionList } from "./hostShared";
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
    const { profiles = [] } = useCurrentUser();
    const token = session?.access_token;
    // Accounts with an organization pick whether they're entering as themselves (a player's
    // teams) or as the organization (its teams). Everyone else never sees the choice.
    const org = profiles.find(p => p.type === 'org');
    const [signupAs, setSignupAs] = useState('player');
    const [allTeams, setMyTeams] = useState(team ? null : []);
    const myTeams = allTeams && org
        ? allTeams.filter(t => (signupAs === 'org') === (t.owner?.public_id === org.public_id))
        : allTeams;
    const [loadError, setLoadError] = useState('');
    const [teamId, setTeamId] = useState('');
    const [email, setEmail] = useState('');
    const [answers, setAnswers] = useState({});
    const [tried, setTried] = useState(false);
    const [saving, setSaving] = useState(false);
    const [tierIndex, setTierIndex] = useState(0);
    // Teammates whose share you're paying (team events): usernames.
    const [covering, setCovering] = useState([]);
    const wallet = useWallet(!!pay);
    const tier = pay?.tiers[tierIndex];
    const price = tier ? Number(tier.price) : 0;
    // What one player's spot costs, in cents: the pass plus the 5% uSync fee.
    const shareCents = Math.round(price * 100) + Math.round(Math.round(price * 100) * USYNC_FEE);
    const answer = (key) => (e) => setAnswers(a => ({ ...a, [key]: e.target.value }));
    const chosen = myTeams?.find(t => t.public_id === teamId);
    const short = chosen ? need - chosen.members.length : 0;
    // The players who each owe a share: the first `need` on the team. You pay your own (if you're
    // one of them) and anyone you tick; everyone else pays from their own balance.
    const players = (chosen?.members ?? []).slice(0, need);
    const isMe = (m) => m.username?.toLowerCase() === username?.toLowerCase();
    const youPlay = !team || players.some(isMe);
    const covered = players.filter(m => !isMe(m) && covering.includes(m.username));
    const youPayShares = pay ? (team ? (youPlay ? 1 : 0) + covered.length : 1) : 0;
    const youPay = youPayShares * shareCents;
    const balance = wallet?.balanceCents;
    const shortOnFunds = pay && balance != null && balance < youPay;
    const toggleCover = (name) => setCovering(list => (list.includes(name) ? list.filter(n => n !== name) : [...list, name]));

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
        if (missing.length || shortOnFunds) return;
        setSaving(true);
        const done = await register(event.id, {
            teamId: team ? chosen.public_id : null,
            email: email.trim(),
            answers,
            pass: tier?.name ?? null,
            payFor: covered.map(m => m.username),
        });
        setSaving(false);
        if (done) onClose();
    };

    return (
        <Modal title={`Sign up for ${event.name}`} onClose={onClose}>
            <form onSubmit={submit} className={styles.form}>
                {team && org &&
                    <div className={styles.field}>
                        <span className={styles.fieldLabel}>Sign up as</span>
                        <div className={styles.segmented} role="radiogroup" aria-label="Sign up as">
                            {[['player', 'Player'], ['org', 'Organization']].map(([value, label]) => (
                                <button key={value} type="button" role="radio" aria-checked={signupAs === value}
                                    className={`${styles.segment} ${signupAs === value ? styles.segmentActive : ''}`}
                                    onClick={() => { setSignupAs(value); setTeamId(''); setCovering([]); }}>
                                    {value === 'org' ? `${label} (${org.username})` : label}
                                </button>
                            ))}
                        </div>
                    </div>
                }
                {team
                    ? (
                        <div>
                            <span className={styles.fieldLabel}>Choose your team ({need} players to be signed up)</span>
                            {myTeams === null && <p className={styles.fieldHint}>Loading your teams…</p>}
                            {loadError && <p className={styles.fieldError}>{loadError}</p>}
                            {myTeams?.length === 0 && !loadError && (signupAs === 'org' && org
                                ? <p className={styles.fieldHint}>{org.username} has no teams yet. <Link to="/dashboard?tab=teams">Make a team</Link>, invite players, then come back.</p>
                                : <p className={styles.fieldHint}>You're not on a team yet. <Link to="/dashboard?tab=teams">Make a team</Link>, invite players, then come back.</p>)}
                            {myTeams?.length > 0 &&
                                <div className={styles.passList}>
                                    {myTeams.map(t => {
                                        const problem = teamEntryProblem(t, event);
                                        return (
                                            <label key={t.public_id} className={`${styles.passOption} ${t.public_id === teamId ? styles.passOptionOn : ''}`}>
                                                <input type="radio" name="team" disabled={!!problem} checked={t.public_id === teamId} onChange={() => { setTeamId(t.public_id); setCovering([]); }} />
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
                            <dt>Pass{team ? ' (per player)' : ''}</dt><dd>${price.toFixed(2)}</dd>
                            <dt>uSync fee (5%)</dt><dd>${(price * USYNC_FEE).toFixed(2)}</dd>
                            <dt><strong>{team ? 'Cost per player' : 'Total'}</strong></dt><dd><strong>{formatMoney(shareCents)}</strong></dd>
                        </dl>
                        {team && chosen && players.length > 0 &&
                            <div>
                                <span className={styles.fieldLabel}>Who pays?</span>
                                <p className={styles.fieldHint} style={{ margin: '0 0 .5rem' }}>
                                    Everyone on the team pays their own {formatMoney(shareCents)} from their uSync balance. Tick a teammate to pay it for them from yours instead.
                                    The team is only signed up once every player has paid.
                                </p>
                                <div className={styles.passList}>
                                    {players.map(m => (
                                        <label key={m.username} className={`${styles.passOption} ${isMe(m) || covering.includes(m.username) ? styles.passOptionOn : ''}`}>
                                            <input type="checkbox" disabled={isMe(m)} checked={isMe(m) || covering.includes(m.username)} onChange={() => toggleCover(m.username)} />
                                            <span>{isMe(m) ? `${m.username} (you)` : m.username}</span>
                                            <strong>{isMe(m) ? 'You pay' : covering.includes(m.username) ? 'You pay' : 'Pays their own'}</strong>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        }
                        <dl className={styles.detailList}>
                            <dt><strong>You pay now</strong></dt><dd><strong>{formatMoney(youPay)}</strong></dd>
                            <dt>Your uSync balance</dt><dd>{balance == null ? '…' : formatMoney(balance)}</dd>
                        </dl>
                        {shortOnFunds &&
                            <p className={styles.fieldError} role="alert">
                                You need {formatMoney(youPay - balance)} more. <Link to="/bank">Add funds on the Bank page</Link>, then come back.
                            </p>
                        }
                        <p className={styles.fieldHint}>
                            {event.refundable
                                ? 'Leave before registration closes and the money goes back to whoever paid. If the event is cancelled everyone is refunded in full.'
                                : 'Registration is closed, so leaving won\'t be refunded. If the event is cancelled everyone is refunded in full.'}
                        </p>
                    </>
                }

                <div className={styles.formActions}>
                    <button type="button" className={styles.ghostBtn} onClick={onClose}>Cancel</button>
                    <button type="submit" className={styles.primaryBtn} disabled={saving || !!shortOnFunds}>
                        {saving ? 'Signing up…' : pay ? `Pay ${formatMoney(youPay)} and sign up` : 'Sign up'}
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
    const navigate = useNavigate();
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
        const refundNote = pay
            ? (event.refundable ? ' Everything paid for your spot is refunded.' : ' Registration is closed, so what was paid is not refunded.')
            : '';
        if (window.confirm(`Unregister ${me.name} from ${event.name}?${refundNote}`)) {
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

                {event.cancelledAt &&
                    <div className={styles.delayBanner} role="status">
                        <FaClock /> <span><strong>This event was cancelled.</strong>{pay && ' Everyone who paid was refunded in full.'}</span>
                    </div>
                }

                {me && pay && !me.fullyPaid && !event.cancelledAt &&
                    <div className={styles.delayBanner} role="status">
                        <FaTicketAlt />
                        <span>
                            <strong>{me.name} isn't fully paid yet.</strong>{' '}
                            {me.payment
                                ? `Waiting on ${me.payment.players.filter(p => !p.paid).map(p => p.username).join(', ')}. `
                                : 'A teammate still needs to pay their share. '}
                            Until every player has paid, the team stays pending. <Link to="/bank">Add funds</Link> if it's you.
                        </span>
                    </div>
                }

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
                            <span><FaMapMarkerAlt /> {locationLabel(event)}</span>
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
                                <dt>Game</dt><dd>{gameDisplayName(event)}</dd>
                                <dt>Format</dt><dd>{formatSummary(event)}</dd>
                                <dt>Team size</dt><dd>{event.teamSize}</dd>
                                <dt>Starts</dt><dd>{formatDate(event.startsAt)}</dd>
                                <dt>Location</dt><dd>{locationLabel(event)}</dd>
                                {event.restrictions?.length > 0 && <><dt>Restrictions</dt><dd><RestrictionList event={event} /></dd></>}
                                <dt>Entry</dt><dd>{event.entryFee || 'Free'}</dd>
                                <dt>Prize</dt><dd>{event.prize || '-'}</dd>
                                <dt>Spots</dt><dd>{event.maxEntrants == null ? 'No limit' : `${event.maxEntrants} ${unit}`}</dd>
                                {event.minEntrants != null && <><dt>Minimum</dt><dd>Needs at least {event.minEntrants} {unit} to run</dd></>}
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
                                <Link to={matchUrl(event.id, myMatch.id)} className={`${styles.secondaryBtn} ${styles.fullBtn}`} style={{ marginBottom: '.75rem' }}>
                                    You have a match vs {opponent?.name} - view it
                                </Link>
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
                                <p className={styles.blurb}>vs <strong>{opponent?.name}</strong> · <Link to={matchUrl(event.id, myMatch.id)}>Match page: roster, rules and maps</Link></p>
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
                                view
                                onSelect={(m) => navigate(matchUrl(event.id, m.id))}
                                canSelect={(m) => m.status === 'ready' || m.status === 'complete'}
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
                    bestOf={matchBestOf(event, built, reporting)}
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
