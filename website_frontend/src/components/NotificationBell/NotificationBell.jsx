import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { FaBell } from "react-icons/fa";
import { useAuth, useCurrentUser } from "hooks";
import { getApiErrorMessage } from "utils/apiError";
import { EVENT_DASHBOARD_PATH } from "utils/hostEvents";
import { getMyInvites, respondToInvite } from "services/teams";
import { getNotifications, markNotificationsRead, notificationText } from "services/notifications";
import { getAdminInvites, respondAdminInvite } from "services/brackets";
import { InviteCard } from "components/Teams/TeamParts";
import { timeAgo } from "utils/humanize";
import styles from "./NotificationBell.module.css";

const REFRESH_MS = 60 * 1000;


// The bell to the left of the profile avatar. Team invites waiting on you come first (accept or
// decline right here), then everything else: someone joined your team, your team is signed up or
// back to pending, an event was delayed, you have a match, the other side reported a score, a
// score is disputed, a no-show was reported. Opening the bell marks them read.
export const NotificationBell = () => {
    const { session } = useAuth();
    const { defaultProfile } = useCurrentUser();
    const token = session?.access_token;
    const [invites, setInvites] = useState([]);
    const [items, setItems] = useState([]);
    const [adminInvites, setAdminInvites] = useState([]);
    const [open, setOpen] = useState(false);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    const ref = useRef(null);

    const load = useCallback(() => {
        if (!token) return;
        getMyInvites(token).then(setInvites).catch(() => {});
        getNotifications().then(setItems).catch(() => {});
        getAdminInvites().then(setAdminInvites).catch(() => {});
    }, [token]);

    // Checked on load, every minute, and whenever the bell opens.
    useEffect(() => {
        load();
        const id = setInterval(load, REFRESH_MS);
        return () => clearInterval(id);
    }, [load]);

    // However the bell closes (its button, a link, Esc or a click outside), what was shown counts
    // as read, so the badge never sticks at a stale number.
    const close = useCallback(() => {
        setOpen(false);
        setItems(list => list.map(n => ({ ...n, read: true })));
    }, []);

    useEffect(() => {
        if (!open) return;
        load();
        const outside = (e) => { if (!ref.current?.contains(e.target)) close(); };
        const escape = (e) => { if (e.key === 'Escape') close(); };
        document.addEventListener('mousedown', outside);
        document.addEventListener('keydown', escape);
        return () => {
            document.removeEventListener('mousedown', outside);
            document.removeEventListener('keydown', escape);
        };
    }, [open, load, close]);

    if (!defaultProfile) return null;

    const unread = items.filter(n => !n.read).length;
    const count = invites.length + adminInvites.length + unread;

    const toggle = () => {
        if (open) return close();
        setOpen(true);
        // Seen once the bell is opened; they stay highlighted until it closes.
        if (unread) markNotificationsRead().catch(() => {});
    };

    const respond = async (inviteId, accept) => {
        setBusy(true);
        setError('');
        try {
            setInvites(await respondToInvite(inviteId, accept, token));
        } catch (err) {
            setError(getApiErrorMessage(err));
        } finally {
            setBusy(false);
        }
    };

    const respondAdmin = async (inviteId, accept) => {
        setBusy(true);
        setError('');
        try {
            setAdminInvites(await respondAdminInvite(inviteId, accept));
        } catch (err) {
            setError(getApiErrorMessage(err));
        } finally {
            setBusy(false);
        }
    };

    return (
        <div className={styles.wrap} ref={ref}>
            <button type="button" className={styles.bell} aria-label={`Notifications${count ? `, ${count} new` : ''}`}
                aria-haspopup="true" aria-expanded={open} onClick={toggle}>
                <FaBell aria-hidden="true" />
                {count > 0 && <span className={styles.badge}>{count > 99 ? '99+' : count}</span>}
            </button>
            {open &&
                <div className={styles.panel}>
                    <div className={styles.head}>
                        <h2>Notifications</h2>
                    </div>
                    {error && <p className={styles.empty} role="alert">{error}</p>}
                    {invites.length === 0 && adminInvites.length === 0 && items.length === 0
                        ? <p className={styles.empty}>Nothing yet. Team invites, matches and event updates show up here.</p>
                        : (
                            <div className={styles.list}>
                                {invites.map(inv => <InviteCard key={inv.id} invite={inv} onRespond={respond} busy={busy} onNavigate={close} />)}
                                {adminInvites.map(inv => (
                                    <div key={inv.id} className={`${styles.item} ${styles.unread}`}>
                                        <p className={styles.text}>
                                            <strong>{inv.host.username}</strong> invited you to be an admin for{' '}
                                            <Link to={`/brackets/${encodeURIComponent(inv.eventId)}`} className={styles.link} onClick={close}>{inv.eventName}</Link>.
                                        </p>
                                        <div className={styles.actions}>
                                            <button type="button" className={styles.accept} disabled={busy} onClick={() => respondAdmin(inv.id, true)}>Accept</button>
                                            <button type="button" className={styles.decline} disabled={busy} onClick={() => respondAdmin(inv.id, false)}>Decline</button>
                                        </div>
                                    </div>
                                ))}
                                {items.map(n => {
                                    const { text, to } = notificationText(n);
                                    const body = <>
                                        <p className={styles.text}>{text}</p>
                                        <span className={styles.time}>{timeAgo(n.created_at)}</span>
                                    </>;
                                    return (
                                        <div key={n.id} className={`${styles.item} ${n.read ? '' : styles.unread}`}>
                                            {to ? <Link to={to} className={styles.itemLink} onClick={close}>{body}</Link> : body}
                                        </div>
                                    );
                                })}
                            </div>
                        )
                    }
                    <div className={styles.foot}>
                        <Link to={`${EVENT_DASHBOARD_PATH}?tab=teams`} className={styles.link} onClick={close}>Your teams</Link>
                        <Link to={EVENT_DASHBOARD_PATH} className={styles.link} onClick={close}>Your events</Link>
                    </div>
                </div>
            }
        </div>
    );
};
