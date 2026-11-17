import { Link, useLocation } from "react-router";
import { FaPlus } from "react-icons/fa";
import { useCurrentUser } from "hooks";
import { eventContextFromPath, EVENT_TYPES } from "utils/hostEvents";
import { canHostBrackets, createEventUrl } from "utils/profiles";
import styles from "./AddYourEventButton.module.css";

/**
 * "Add your event", centered just above the events on the league, LAN and tournament pages.
 * Only shown while viewing as a host profile (with bracket hosting on). It opens the event form
 * pre-filled with this page's event type and game, worked out from the URL; detail pages that
 * know better (e.g. a LAN's own game) pass `type` / `game`. align="start" lines it up with the
 * text it sits under (the /leagues, /lans and /tournaments heroes) instead of centering it.
 */
export const AddYourEventButton = ({ type, game, align = 'center' }) => {
    const { defaultProfile } = useCurrentUser();
    const { pathname } = useLocation();

    if (defaultProfile?.type !== 'host' || !canHostBrackets(defaultProfile)) return null;

    const fromPath = eventContextFromPath(pathname);
    const prefill = { type: type ?? fromPath.type, game: game ?? fromPath.game };
    const label = prefill.type ? `Add your ${EVENT_TYPES[prefill.type]}` : 'Add your event';

    return (
        <div className={`${styles.row} ${align === 'start' ? styles.start : ''}`}>
            <Link to={createEventUrl(defaultProfile.public_id, prefill)} className={styles.button}>
                <FaPlus aria-hidden="true" /> {label}
            </Link>
        </div>
    );
};
