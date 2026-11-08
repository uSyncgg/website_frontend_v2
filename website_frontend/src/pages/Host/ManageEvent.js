import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate, useOutletContext, useParams } from "react-router";
import { FaCalendarAlt, FaClock, FaGamepad, FaMapMarkerAlt, FaSitemap } from "react-icons/fa";
import { useHostEvent, eventStage, updateEvent, deleteEvent, delayStart, pendingEntrants, inviteAdmin, removeAdmin, cancelEvent, closeEvent, reopenEvent, getEventFinances } from "services/brackets";
import { formatMoney } from "services/bank";
import { Avatar, PlayerPicker } from "components/Teams/TeamParts";
import { buildBracket, bracketProgress } from "utils/bracket";
import { BracketError, Modal, ShareButton, StageChip, capacityLabel, formatDate, formatLabel, unitLabel, EventLoading, formatSummary, locationLabel, gameDisplayName, RestrictionList } from "./hostShared";
import styles from "./Host.module.css";
import { EVENT_TYPES, HOSTING_DASHBOARD_PATH } from "utils/hostEvents";

export const useManagedEvent = () => useOutletContext();

// /host/events/:eventId/* - header + tabs shared by every manage screen.
export const ManageEvent = () => {
    const { eventId } = useParams();
    const event = useHostEvent(eventId);

    // Only the host gets the manage screens; for anyone else it doesn't exist.
    if (!event || !event.canManage) {
        return <EventLoading event={event === undefined ? undefined : null} backTo={HOSTING_DASHBOARD_PATH} backLabel="Back to your events" />;
    }

    const stage = eventStage(event);
    const tabs = [
        { to: '', label: 'Overview', end: true },
        { to: 'entrants', label: 'Entrants', count: event.entrants.length },
        { to: 'seeding', label: 'Seeding' },
        { to: 'bracket', label: 'Bracket' },
    ];

    return (
        <div className={`standardContainer ${styles.page}`}>
            <title>{`uSync | Manage ${event.name}`}</title>
            <meta name="robots" content="noindex, nofollow" />

            <div className={styles.inner}>
                <BracketError />

                <div className={styles.pageHeader}>
                    <div>
                        <p className={styles.eyebrow}><Link to={HOSTING_DASHBOARD_PATH} className={styles.eyebrow}>Event Dashboard</Link> / Manage event</p>
                        <h1 className={styles.title}>{event.name}</h1>
                        <div className={styles.metaRow}>
                            <StageChip stage={stage} />
                            <span><FaGamepad /> {gameDisplayName(event)} · {event.teamSize}</span>
                            <span><FaCalendarAlt /> {formatDate(event.startsAt)}{event.delays?.length > 0 && <span className={styles.delayedTag}>Delayed</span>}</span>
                            <span><FaSitemap /> {formatLabel(event.format)} · Bo{event.bestOf}</span>
                            <span><FaMapMarkerAlt /> {locationLabel(event)}</span>
                        </div>
                    </div>
                    <div className={styles.btnRow}>
                        <ShareButton event={event} />
                        <Link to={`/brackets/${event.id}`} className={styles.ghostBtn}>View public page</Link>
                    </div>
                </div>

                <nav className={styles.tabs} aria-label="Manage event">
                    {tabs.map(tab => (
                        <NavLink key={tab.label} to={tab.to} end={tab.end}
                            className={({ isActive }) => `${styles.tab} ${isActive ? styles.tabActive : ''}`}>
                            {tab.label}{tab.count != null && <span className={styles.tabCount}>{tab.count}</span>}
                        </NavLink>
                    ))}
                </nav>

                <Outlet context={event} />
            </div>
        </div>
    );
};

// What the host should do next, based on where the event is.
const NEXT_STEPS = {
    registration: { text: 'Sign-ups are open. Share the event to get players in. When you\'re ready to build the bracket, close registration and head to Seeding.', to: 'entrants', label: 'Review entrants' },
    closed: { text: 'Registration is closed. Set the seeding order and generate your bracket.', to: 'seeding', label: 'Set seeding' },
    seeding: { text: 'Your bracket draft is ready. Check the matchups, then publish it so players can see it.', to: 'bracket', label: 'Review bracket' },
    live: { text: 'The bracket is live. Players report their own scores - step in when a match is disputed or a no-show is reported.', to: 'bracket', label: 'Open bracket' },
    complete: { text: 'Every match is done. Close the event below to lock in the winners - prizes and your payout follow 45 minutes later.', to: 'bracket', label: 'See final bracket' },
    cancelled: { text: 'This event was cancelled and everyone who paid has been refunded.', to: 'entrants', label: 'See entrants' },
};

const DELAY_OPTIONS = [15, 30, 60];

const toLocalInput = (iso) => {
    const d = new Date(iso);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 16);
};

const DelayDialog = ({ event, onClose }) => {
    const [mode, setMode] = useState(15);
    const [custom, setCustom] = useState(toLocalInput(new Date(new Date(event.startsAt).getTime() + 3600000).toISOString()));
    const [reason, setReason] = useState('');
    const newStart = mode === 'custom'
        ? new Date(custom)
        : new Date(new Date(event.startsAt).getTime() + mode * 60000);
    const valid = !Number.isNaN(newStart.getTime()) && newStart > new Date(event.startsAt);

    const confirm = async () => {
        if (await delayStart(event.id, newStart.toISOString(), reason.trim())) onClose();
    };

    return (
        <Modal title="Delay start time" onClose={onClose}>
            <p className={styles.blurb}>Currently starts <strong>{formatDate(event.startsAt)}</strong>.</p>
            <div className={styles.btnRow} role="radiogroup" aria-label="Delay by">
                {DELAY_OPTIONS.map(m => (
                    <button key={m} type="button" role="radio" aria-checked={mode === m}
                        className={`${styles.ghostBtn} ${styles.smallBtn} ${mode === m ? styles.segmentActive : ''}`}
                        onClick={() => setMode(m)}>+{m < 60 ? `${m} min` : '1 hour'}</button>
                ))}
                <button type="button" role="radio" aria-checked={mode === 'custom'}
                    className={`${styles.ghostBtn} ${styles.smallBtn} ${mode === 'custom' ? styles.segmentActive : ''}`}
                    onClick={() => setMode('custom')}>Pick a time</button>
            </div>
            {mode === 'custom' &&
                <input type="datetime-local" className={styles.input} style={{ marginTop: '.75rem' }} value={custom}
                    onChange={e => setCustom(e.target.value)} aria-label="New start time" />
            }
            <div className={styles.field} style={{ marginTop: '1rem' }}>
                <label htmlFor="delay-reason">Message to players (optional)</label>
                <input id="delay-reason" className={styles.input} value={reason} onChange={e => setReason(e.target.value)}
                    placeholder="e.g. Server issues, starting shortly" maxLength={140} />
            </div>
            <p className={styles.blurb} style={{ marginTop: '1rem' }}>
                {valid ? <>New start: <strong>{formatDate(newStart.toISOString())}</strong>.</> : 'Pick a time later than the current start.'}
                {' '}All {event.entrants.length} registered {unitLabel(event)} will be notified.
            </p>
            <div className={styles.formActions}>
                <button type="button" className={styles.ghostBtn} onClick={onClose}>Cancel</button>
                <button type="button" className={styles.primaryBtn} disabled={!valid} onClick={confirm}>Delay and notify</button>
            </div>
        </Modal>
    );
};

export const EventOverview = () => {
    const event = useManagedEvent();
    const navigate = useNavigate();
    const [delaying, setDelaying] = useState(false);
    const stage = eventStage(event);
    const next = NEXT_STEPS[stage];
    const progress = event.bracket
        ? bracketProgress(buildBracket(event.format, event.bracket.seeds, event.bracket.results))
        : null;
    const unit = unitLabel(event);

    const remove = async () => {
        if (!window.confirm(`Delete "${event.name}"? This can't be undone.`)) return;
        if (await deleteEvent(event.id)) navigate(HOSTING_DASHBOARD_PATH);
    };

    return (
        <>
            <div className={styles.statGrid}>
                <div className={styles.stat}><span className={styles.statLabel}>{unit[0].toUpperCase() + unit.slice(1)} signed up</span><span className={styles.statValue}>{capacityLabel(event)}</span></div>
                {pendingEntrants(event).length > 0 &&
                    <div className={styles.stat}><span className={styles.statLabel}>Pending teams</span><span className={styles.statValue}>{pendingEntrants(event).length}</span></div>}
                <div className={styles.stat}><span className={styles.statLabel}>Matches played</span><span className={styles.statValue}>{progress ? `${progress.done} / ${progress.total}` : '-'}</span></div>
                <div className={styles.stat}><span className={styles.statLabel}>Registration</span><span className={`${styles.statValue} ${styles.statValueSmall}`}>{event.registrationOpen ? 'Open' : 'Closed'}</span></div>
            </div>

            <div className={styles.twoCol}>
                <div>
                    <section className={styles.card}>
                        <h2 className={styles.sectionTitle}>Details</h2>
                        <dl className={styles.detailList}>
                            <dt>Type</dt><dd>{EVENT_TYPES[event.eventType] ?? '-'}</dd>
                            <dt>Game</dt><dd>{gameDisplayName(event)}</dd>
                            <dt>Format</dt><dd>{formatSummary(event)}</dd>
                            <dt>Team size</dt><dd>{event.teamSize}</dd>
                            <dt>Max {unit}</dt><dd>{event.maxEntrants ?? 'No cap'}</dd>
                            <dt>Min {unit}</dt><dd>{event.minEntrants ?? 'None'}</dd>
                            <dt>Starts</dt><dd>{formatDate(event.startsAt)}</dd>
                            <dt>Location</dt><dd>{locationLabel(event)}</dd>
                            <dt>Restrictions</dt><dd>{event.restrictions?.length ? <RestrictionList event={event} /> : 'None'}</dd>
                            <dt>Entry fee</dt><dd>{event.payments?.enabled ? `${event.entryFee} via uSync payments` : (event.entryFee || 'Free')}</dd>
                            <dt>Prize</dt><dd>{event.prize || '-'}</dd>
                            <dt>No-show timer</dt><dd>{event.noShowMinutes == null ? 'Off' : `${event.noShowMinutes} min after start`}</dd>
                        </dl>
                    </section>
                    {(event.description || event.rules) &&
                        <section className={styles.card}>
                            {event.description && <><h2 className={styles.sectionTitle}>Description</h2><p className={styles.preWrap}>{event.description}</p></>}
                            {event.rules && <><h2 className={styles.sectionTitle} style={{ marginTop: event.description ? '1.25rem' : 0 }}>Rules</h2><p className={styles.preWrap}>{event.rules}</p></>}
                        </section>
                    }
                </div>

                <div>
                    <section className={`${styles.card} ${styles.nextStep}`}>
                        <h2 className={styles.sectionTitle}>Next step</h2>
                        <p>{next.text}</p>
                        <Link to={next.to} className={styles.primaryBtn}>{next.label}</Link>
                    </section>

                    <section className={styles.card}>
                        <h2 className={styles.sectionTitle}>Start time</h2>
                        <p className={styles.blurb}>{formatDate(event.startsAt)}</p>
                        {event.delays?.length > 0 &&
                            <ul className={styles.delayList}>
                                {event.delays.map((d, i) => (
                                    <li key={i}>
                                        Delayed from {formatDate(d.from)}{d.reason && <> - "{d.reason}"</>}
                                    </li>
                                ))}
                            </ul>
                        }
                        <button type="button" className={styles.secondaryBtn} disabled={stage === 'complete' || stage === 'cancelled'} onClick={() => setDelaying(true)}>
                            <FaClock /> Delay start
                        </button>
                    </section>

                    <section className={styles.card}>
                        <h2 className={styles.sectionTitle}>Registration</h2>
                        <p className={styles.blurb}>
                            {event.bracket?.published
                                ? 'Registration closed automatically when the bracket was published.'
                                : event.registrationOpen ? 'Players can currently sign up.' : 'New sign-ups are paused.'}
                        </p>
                        <div className={styles.btnRow}>
                            <button type="button" className={styles.secondaryBtn} disabled={event.bracket?.published || stage === 'cancelled'}
                                onClick={() => updateEvent(event.id, { registrationOpen: !event.registrationOpen })}>
                                {event.registrationOpen ? 'Close registration' : 'Reopen registration'}
                            </button>
                            <ShareButton event={event} className={styles.ghostBtn} />
                            {event.isHost && <button type="button" className={styles.dangerBtn} onClick={remove}>Delete event</button>}
                        </div>
                    </section>

                    <FinancesCard event={event} stage={stage} />

                    <AdminsCard event={event} />
                </div>
            </div>

            {delaying && <DelayDialog event={event} onClose={() => setDelaying(false)} />}
        </>
    );
};

const money = (cents) => formatMoney(cents ?? 0);

const timeLabel = (iso) => new Date(iso).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });

// Entry revenue for paid events (what's collected, what prizes take, what the host keeps), plus the
// host's end-of-event controls: close the event once the winners are in (payouts follow 45 minutes
// later; reopen to fix a result first) or cancel it and refund everyone.
const FinancesCard = ({ event, stage }) => {
    const paid = !!event.payments?.enabled;
    const [finances, setFinances] = useState(null);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    // Reloaded whenever the event changes (a sign-up, a refund, a close) and every minute.
    const stamp = `${event.entrants.length}|${event.closedAt}|${event.paidOutAt}|${event.cancelledAt}|${event.entrants.map(e => e.payment?.paidCount).join(',')}`;
    useEffect(() => {
        if (!paid) return undefined;
        let live = true;
        const load = () => getEventFinances(event.id).then(f => live && setFinances(f)).catch(() => {});
        load();
        const id = setInterval(load, 60000);
        return () => { live = false; clearInterval(id); };
    }, [paid, event.id, stamp]);

    const canClose = stage === 'complete' && !event.closedAt && !event.cancelledAt;
    const canReopen = event.closedAt && !event.paidOutAt && !event.cancelledAt;
    const canCancel = event.isHost && !event.cancelledAt && !event.paidOutAt;
    if (!paid && !canClose && !canReopen && !canCancel && !event.paidOutAt) return null;

    const run = async (action, confirmText) => {
        if (confirmText && !window.confirm(confirmText)) return;
        setBusy(true);
        setError('');
        try {
            await action(event.id);
        } finally {
            setBusy(false);
        }
    };

    return (
        <section className={styles.card}>
            <h2 className={styles.sectionTitle}>{paid ? 'Entry revenue' : 'Close out'}</h2>
            {paid && finances &&
                <dl className={styles.detailList}>
                    <dt>Collected (pass prices)</dt><dd>{money(finances.collectedCents)}</dd>
                    <dt>Prizes {finances.final ? 'paid' : 'to pay'}</dt><dd>−{money(finances.prizesCents)}{finances.prizesScaledDown && ' (scaled down to fit)'}</dd>
                    <dt>uSync fee ({finances.hostFeePercent}% of profit)</dt><dd>−{money(finances.usyncFeeCents)}</dd>
                    <dt><strong>{finances.final ? 'You received' : 'You\'ll receive'}</strong></dt><dd><strong>{money(finances.hostNetCents)}</strong></dd>
                    {finances.refundedCents > 0 && <><dt>Refunded to players</dt><dd>{money(finances.refundedCents)}</dd></>}
                </dl>
            }
            {paid && finances?.forfeitedPlayers > 0 &&
                <p className={styles.fieldHint}>Includes {finances.forfeitedPlayers} share{finances.forfeitedPlayers > 1 ? 's' : ''} from players who left after registration closed.</p>}
            {event.paidOutAt && <p className={styles.blurb}>Paid out {timeLabel(event.paidOutAt)}. Prizes and your revenue are in the players' and your uSync balances.</p>}
            {event.closedAt && !event.paidOutAt && !event.cancelledAt &&
                <p className={styles.blurb}>Event closed. Prizes and your payout are sent automatically around <strong>{timeLabel(event.payoutAt)}</strong>. Spot a mistake? Reopen it before then.</p>}
            {canClose && <p className={styles.blurb}>Every match is played. Closing the event locks in the winners; payouts follow 45 minutes later.</p>}
            {error && <p className={styles.fieldError} role="alert">{error}</p>}
            <div className={styles.btnRow}>
                {canClose &&
                    <button type="button" className={styles.primaryBtn} disabled={busy}
                        onClick={() => run(closeEvent, 'Close this event? Winners are recorded and prizes and your payout are sent in 45 minutes.')}>
                        Close event &amp; record results
                    </button>}
                {canReopen &&
                    <button type="button" className={styles.secondaryBtn} disabled={busy} onClick={() => run(reopenEvent)}>Reopen to fix results</button>}
                {canCancel &&
                    <button type="button" className={styles.dangerBtn} disabled={busy}
                        onClick={() => run(cancelEvent, paid
                            ? `Cancel "${event.name}"? Every player is refunded in full (fees included) and sign-ups close. This can't be undone.`
                            : `Cancel "${event.name}"? Sign-ups close and players are told. This can't be undone.`)}>
                        Cancel event
                    </button>}
            </div>
        </section>
    );
};

// Who helps run the event. The host invites players by searching for them; each accepts from
// their notifications and can then manage the event (everything but deleting it or changing admins).
const AdminsCard = ({ event }) => {
    const [busy, setBusy] = useState(false);
    const admins = event.admins ?? [];

    const invite = async (picked) => {
        const added = picked[picked.length - 1];
        if (!added) return;
        setBusy(true);
        await inviteAdmin(event.id, added.public_id);
        setBusy(false);
    };

    const remove = async (admin) => {
        const verb = admin.status === 'pending' ? 'Cancel the admin invite for' : 'Remove admin';
        if (!window.confirm(`${verb} ${admin.username}?`)) return;
        setBusy(true);
        await removeAdmin(event.id, admin.id);
        setBusy(false);
    };

    return (
        <section className={styles.card}>
            <h2 className={styles.sectionTitle}>Admins</h2>
            <p className={styles.blurb}>
                {event.isHost
                    ? 'Admins can edit the event, seed the bracket and report scores like you. Only you can delete the event or change admins.'
                    : 'You\'re an admin for this event.'}
            </p>
            {admins.length > 0 &&
                <ul className={styles.adminList}>
                    {admins.map(a => (
                        <li key={a.id} className={styles.adminRow}>
                            <Avatar src={a.profile_picture} name={a.username} size={24} />
                            <span>{a.username}</span>
                            <span className={styles.muted}>{a.status === 'pending' ? 'Invited' : 'Admin'}</span>
                            {event.isHost &&
                                <button type="button" className={`${styles.ghostBtn} ${styles.smallBtn}`} disabled={busy} onClick={() => remove(a)}>
                                    {a.status === 'pending' ? 'Cancel' : 'Remove'}
                                </button>
                            }
                        </li>
                    ))}
                </ul>
            }
            {event.isHost &&
                <>
                    <label className={styles.fieldLabel} htmlFor="assign-admin">Assign an admin</label>
                    <PlayerPicker id="assign-admin" selected={[]} onChange={invite} exclude={admins.map(a => a.username)} />
                </>
            }
        </section>
    );
};
