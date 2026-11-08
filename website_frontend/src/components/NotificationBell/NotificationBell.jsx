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
import styles from "./NotificationBell.module.css";

const REFRESH_MS = 60 * 1000;

const timeAgo = (iso) => {
    const minutes = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (minutes < 1440) return `${Math.round(minutes / 60)}h ago`;
    return `${Math.round(minutes / 1440)}d ago`;
};

// The unread count in the browser tab's title: "(3) uSync | Event". Pages set their own title, so
// this watches the <head> and puts the count back whenever the title changes.
const COUNT_PREFIX = /^\((\d+|99\+)\) /;
const useTabCount = (count) => {
    useEffect(() => {
        const prefix = count > 0 ? `(${count > 99 ? '99+' : count}) ` : '';
        const apply = () => {
            const next = prefix + document.title.replace(COUNT_PREFIX, '');
            if (document.title !== next) document.title = next;
        };
        apply();
        const observer = new MutationObserver(apply);
        observer.observe(document.head, { childList: true, subtree: true, characterData: true });
        return () => {
            observer.disconnect();
            document.title = document.title.replace(COUNT_PREFIX, '');
        };
    }, [count]);
};

// The bell to the left of the profile avatar. Team invites waiting on you come first (accept or
// decline right here), then everything else: someone joined your team, your team is signed up or
// back to pending, an event was delayed, you have a match, the other side reported a score, a
// score is disputed, a no-show was reported. Each one is marked read when you click it, or all at once with "Mark all as read".
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
    const epoch = useRef(0);

    const load = useCallback(() => {
        if (!token) return;
        getMyInvites(token).then(setInvites).catch(() => {});
        // A response that was already on its way when you marked things read is stale; skip it.
        const sent = epoch.current;
        getNotifications().then(list => { if (sent === epoch.current) setItems(list); }).catch(() => {});
        getAdminInvites().then(setAdminInvites).catch(() => {});
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

    // Everything that needs you: invites waiting on an answer plus unread notifications.
    const unread = items.filter(n => !n.read).length;
    const count = defaultProfile ? invites.length + adminInvites.length + unread : 0;
    useTabCount(count);

    if (!defaultProfile) return null;

    const toggle = () => setOpen(o => !o);
    const close = () => setOpen(false);

    // Optimistic: they read as read straight away, and the server catches up.
    const markRead = (ids) => {
        epoch.current += 1;
        setItems(list => list.map(n => (ids === null || ids.includes(n.id) ? { ...n, read: true } : n)));
        markNotificationsRead(ids).then(() => load()).catch(() => load());
    };
    const openItem = (n) => {
        if (!n.read) markRead([n.id]);
        close();
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
                        {unread > 0 &&
                            <button type="button" className={styles.link} onClick={() => markRead(null)}>Mark all as read</button>}
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
                                            {to ? <Link to={to} className={styles.itemLink} onClick={() => openItem(n)}>{body}</Link> : body}
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
