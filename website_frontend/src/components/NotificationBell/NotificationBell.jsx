import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { FaBell } from "react-icons/fa";
import { useAuth, useCurrentUser } from "hooks";
import { getApiErrorMessage } from "utils/apiError";
import { EVENT_DASHBOARD_PATH } from "utils/hostEvents";
import { getMyInvites, respondToInvite } from "services/teams";
import { getNotifications, markNotificationsRead, notificationText } from "services/notifications";
import { InviteCard } from "components/Teams/TeamParts";
import styles from "./NotificationBell.module.css";

const REFRESH_MS = 60 * 1000;

const timeAgo = (iso) => {
    const minutes = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (minutes < 1440) return `${Math.round(minutes / 60)}h ago`;
    return `${Math.round(minutes / 1440)}d ago`;
};

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
    const [open, setOpen] = useState(false);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    const ref = useRef(null);

    const load = useCallback(() => {
        if (!token) return;
        getMyInvites(token).then(setInvites).catch(() => {});
        getNotifications().then(setItems).catch(() => {});
    }, [token]);

    // Checked on load, every minute, and whenever the bell opens.
    useEffect(() => {
        load();
        const id = setInterval(load, REFRESH_MS);
        return () => clearInterval(id);
    }, [load]);

    useEffect(() => {
        if (!open) return;
        load();
        const outside = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
        const escape = (e) => { if (e.key === 'Escape') setOpen(false); };
        document.addEventListener('mousedown', outside);
        document.addEventListener('keydown', escape);
        return () => {
            document.removeEventListener('mousedown', outside);
            document.removeEventListener('keydown', escape);
        };
    }, [open, load]);

    if (!defaultProfile) return null;

    const unread = items.filter(n => !n.read).length;
    const count = invites.length + unread;

    const toggle = () => {
        const opening = !open;
        setOpen(opening);
        // Seen once the bell is opened; they stay highlighted until it closes.
        if (opening && unread) markNotificationsRead().catch(() => {});
    };

    const close = () => {
        setOpen(false);
        setItems(list => list.map(n => ({ ...n, read: true })));
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
                    {invites.length === 0 && items.length === 0
                        ? <p className={styles.empty}>Nothing yet. Team invites, matches and event updates show up here.</p>
                        : (
                            <div className={styles.list}>
                                {invites.map(inv => <InviteCard key={inv.id} invite={inv} onRespond={respond} busy={busy} onNavigate={close} />)}
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
