import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaBell } from "react-icons/fa";
import { useAuth, useCurrentUser } from "hooks";
import { getApiErrorMessage } from "utils/apiError";
import { EVENT_DASHBOARD_PATH } from "utils/hostEvents";
import { getMyInvites, respondToInvite } from "services/teams";
import { getNotifications, markNotificationsRead, notificationText, subscribeToNotifications } from "services/notifications";
import { getAdminInvites, respondAdminInvite } from "services/brackets";
import { InviteCard } from "components/Teams/TeamParts";
import { timeAgo } from "utils/humanize";
import styles from "./NotificationBell.module.css";

// The bell to the left of the profile avatar. Invites waiting on you come first (accept or
// decline right here), then your unread notifications, each with its own action ("Go to match",
// "Go to queue", ...) and Dismiss. Acting on one or dismissing it marks it read, which takes it out
// of the bell; nothing is marked read just by opening the bell.
//
// New notifications arrive live over Supabase Realtime - no polling. The bell also reloads when
// it opens and when you come back to the tab (invites aren't streamed).
export const NotificationBell = () => {
    const { session } = useAuth();
    const navigate = useNavigate();
    const accountId = session?.user?.id;
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

    // On load, when you come back to the tab, and live as notifications are created.
    useEffect(() => {
        load();
        const onVisible = () => { if (document.visibilityState === 'visible') load(); };
        document.addEventListener('visibilitychange', onVisible);
        return () => document.removeEventListener('visibilitychange', onVisible);
    }, [load]);

    useEffect(() => {
        if (!accountId) return undefined;
        return subscribeToNotifications(accountId, (n) => {
            setItems(list => (list.some(x => x.id === n.id) ? list : [n, ...list]));
            // A new notification often comes with a new invite or a change worth reloading.
            getMyInvites(token).then(setInvites).catch(() => {});
            getAdminInvites().then(setAdminInvites).catch(() => {});
        });
    }, [accountId, token]);

    const close = useCallback(() => setOpen(false), []);

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

    const count = invites.length + adminInvites.length + items.length;

    const toggle = () => (open ? close() : setOpen(true));

    // Acting on or dismissing a notification marks it read, which removes it from the bell.
    const markRead = (n) => {
        setItems(list => list.filter(x => x.id !== n.id));
        markNotificationsRead([n.id]).catch(() => {});
    };
    const goTo = (n, to) => {
        markRead(n);
        close();
        navigate(to);
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
                                    const { text, to, action } = notificationText(n);
                                    return (
                                        <div key={n.id} className={`${styles.item} ${styles.unread}`}>
                                            <p className={styles.text}>{text}</p>
                                            <span className={styles.time}>{timeAgo(n.created_at)}</span>
                                            <div className={styles.actions}>
                                                {to && <button type="button" className={styles.accept} onClick={() => goTo(n, to)}>{action}</button>}
                                                <button type="button" className={styles.decline} onClick={() => markRead(n)}>Dismiss</button>
                                            </div>
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
