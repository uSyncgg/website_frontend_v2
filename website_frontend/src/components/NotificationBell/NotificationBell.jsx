import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { FaBell } from "react-icons/fa";
import { useAuth, useCurrentUser } from "hooks";
import { getApiErrorMessage } from "utils/apiError";
import { EVENT_DASHBOARD_PATH } from "utils/hostEvents";
import { getMyInvites, respondToInvite } from "services/teams";
import { InviteCard } from "components/Teams/TeamParts";
import styles from "./NotificationBell.module.css";

const REFRESH_MS = 60 * 1000;

// The bell to the left of the profile avatar: team invites waiting on you. Each invite links
// to the team (to see who you'd be playing with) and to the profile that sent it.
export const NotificationBell = () => {
    const { session } = useAuth();
    const { defaultProfile } = useCurrentUser();
    const token = session?.access_token;
    const [invites, setInvites] = useState([]);
    const [open, setOpen] = useState(false);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');
    const ref = useRef(null);

    const load = useCallback(() => {
        if (!token) return;
        getMyInvites(token).then(setInvites).catch(() => {});
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

    const close = () => setOpen(false);

    return (
        <div className={styles.wrap} ref={ref}>
            <button type="button" className={styles.bell} aria-label={`Notifications${invites.length ? `, ${invites.length} new` : ''}`}
                aria-haspopup="true" aria-expanded={open} onClick={() => setOpen(o => !o)}>
                <FaBell aria-hidden="true" />
                {invites.length > 0 && <span className={styles.badge}>{invites.length}</span>}
            </button>
            {open &&
                <div className={styles.panel}>
                    <div className={styles.head}>
                        <h2>Notifications</h2>
                    </div>
                    {error && <p className={styles.empty} role="alert">{error}</p>}
                    {invites.length === 0
                        ? <p className={styles.empty}>Nothing yet. Team invites show up here.</p>
                        : <div className={styles.list}>{invites.map(inv => <InviteCard key={inv.id} invite={inv} onRespond={respond} busy={busy} onNavigate={close} />)}</div>
                    }
                    <div className={styles.foot}>
                        <Link to={`${EVENT_DASHBOARD_PATH}?tab=teams`} className={styles.link} onClick={close}>Your teams</Link>
                    </div>
                </div>
            }
        </div>
    );
};
