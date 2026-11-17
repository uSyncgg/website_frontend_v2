import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getQueue, claimIssue, dismissIssue, fetchEvent } from "services/brackets";
import { getApiErrorMessage } from "utils/apiError";
import { timeAgo } from "utils/humanize";
import { matchUrl } from "utils/hostEvents";
import { useManagedEvent } from "./ManageEvent";
import styles from "./Host.module.css";

const REFRESH_MS = 15000;

// /host/events/:eventId/queue - the event's admin queue, for the host and admins only.
// Everything that needs someone to step in (a disputed score, a one-sided report nobody answered
// for 5 minutes, a no-show, a dispute after a team advanced) waits here, oldest first.
// - "Go to issue" claims it (if two admins click at once, one gets it and the other is told
//   another admin claimed it) and opens the match to decide it. A claim not acted on within 10
//   minutes goes back in the queue.
// - "Dismiss" closes it without a ruling. Dismissing beats a claim.
// - It closes itself once its match is decided.
// The server decides all of this; the page just shows its answer.
export const EventQueue = () => {
    const event = useManagedEvent();
    const navigate = useNavigate();
    const [queue, setQueue] = useState(null);
    const [message, setMessage] = useState('');
    const [busy, setBusy] = useState(null);

    const load = useCallback(() => getQueue(event.id).then(setQueue).catch(err => setMessage(getApiErrorMessage(err))), [event.id]);

    useEffect(() => {
        load();
        const tick = () => { if (document.visibilityState === 'visible') load(); };
        const t = setInterval(tick, REFRESH_MS);
        return () => clearInterval(t);
    }, [load]);

    const goTo = async (issue) => {
        setBusy(issue.id);
        setMessage('');
        try {
            const { matchId } = await claimIssue(event.id, issue.id);
            navigate(matchId ? matchUrl(event.id, matchId) : `/host/events/${event.id}/bracket`);
        } catch (err) {
            setMessage(getApiErrorMessage(err));
            load();
        } finally {
            setBusy(null);
        }
    };

    const dismiss = async (issue) => {
        setBusy(issue.id);
        setMessage('');
        try {
            setQueue(await dismissIssue(event.id, issue.id));
            fetchEvent(event.id);
        } catch (err) {
            setMessage(getApiErrorMessage(err));
            load();
        } finally {
            setBusy(null);
        }
    };

    if (!queue) return <p className={styles.muted}>Loading the queue…</p>;

    return (
        <>
            {message && <p className={styles.fieldError} role="alert">{message}</p>}
            <section className={styles.card}>
                <h2 className={styles.sectionTitle}>Queue ({queue.open.length})</h2>
                {queue.open.length === 0
                    ? <p className={styles.muted}>Nothing needs you right now. New disputes, no-shows and unanswered reports show up here.</p>
                    : (
                        <ul className={styles.logList}>
                            {queue.open.map(issue => (
                                <li key={issue.id} className={styles.logItem}>
                                    <div>
                                        <span className={styles.logMatch}>{issue.label}</span>
                                        <span className={styles.logDetail}>
                                            {issue.data.summary || issue.matchId}
                                            {' · '}{timeAgo(issue.createdAt)}
                                            {issue.status === 'claimed' && ` · Claimed by ${issue.claimedBy ?? 'an admin'}`}
                                        </span>
                                    </div>
                                    <div className={styles.btnRow}>
                                        <button type="button" className={`${styles.primaryBtn} ${styles.smallBtn}`} disabled={busy === issue.id || issue.status === 'claimed'}
                                            onClick={() => goTo(issue)}>Go to issue</button>
                                        <button type="button" className={`${styles.ghostBtn} ${styles.smallBtn}`} disabled={busy === issue.id}
                                            onClick={() => dismiss(issue)}>Dismiss</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )
                }
            </section>

            {queue.closed.length > 0 &&
                <section className={styles.card}>
                    <h2 className={styles.sectionTitle}>Recently closed</h2>
                    <ul className={styles.logList}>
                        {queue.closed.map(issue => (
                            <li key={issue.id} className={`${styles.logItem} ${styles.logReverted}`}>
                                <div>
                                    <span className={styles.logMatch}>{issue.label}</span>
                                    <span className={styles.logDetail}>
                                        {issue.status === 'dismissed' ? 'Dismissed' : 'Resolved'}
                                        {issue.closedBy ? ` by ${issue.closedBy}` : ' automatically'}
                                        {issue.closedAt && ` · ${timeAgo(issue.closedAt)}`}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            }
        </>
    );
};
