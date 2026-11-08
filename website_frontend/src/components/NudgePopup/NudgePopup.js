import { useCallback, useEffect, useState } from "react";
import { useAuth } from "hooks";
import { getMyNudges, dismissNudge } from "services/nudges";
import styles from "./NudgePopup.module.css";

// One admin nudge: a small card in the corner with an optional link and a close button.
export const NudgeCard = ({ nudge, onClose }) => (
    <div className={styles.card} role="dialog" aria-labelledby={`nudge-${nudge.id}`}>
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close">×</button>
        <h2 id={`nudge-${nudge.id}`} className={styles.title}>{nudge.title}</h2>
        {nudge.message && <p className={styles.message}>{nudge.message}</p>}
        {nudge.link_url &&
            <a className={styles.link} href={nudge.link_url} onClick={onClose}>
                {nudge.link_label || 'Check it out'}
            </a>
        }
    </div>
);

// Mounted once for the whole app: shows the signed-in user's oldest undismissed nudge.
export const NudgeHost = () => {
    const { session } = useAuth();
    const token = session?.access_token;
    const [nudges, setNudges] = useState([]);

    const load = useCallback(() => {
        getMyNudges(token).then(setNudges).catch(() => setNudges([]));
    }, [token]);

    useEffect(() => {
        load();
        window.addEventListener('usync-nudges-changed', load);
        return () => window.removeEventListener('usync-nudges-changed', load);
    }, [load]);

    const current = nudges[nudges.length - 1];
    if (!current) return null;

    const close = () => {
        setNudges(list => list.filter(n => n.id !== current.id));
        dismissNudge(token, current.id).catch(() => {});
    };

    return (
        <div className={styles.host}>
            <NudgeCard nudge={current} onClose={close} />
        </div>
    );
};
