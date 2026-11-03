import { Link, useLocation } from "react-router";
import { FaPlus } from "react-icons/fa";
import { useCurrentUser } from "hooks";
import { eventContextFromPath, EVENT_TYPES } from "utils/hostEvents";
import { canHostBrackets, createEventUrl } from "utils/profiles";
import styles from "./AddYourEventButton.module.css";

/**
 * "Add your event" on the league, LAN, wager and head-to-head pages. Only shown while viewing as
 * a host or venue that hosts brackets (the same rule as the host pages). It opens the event form
 * pre-filled with this page's event type and game, worked out from the URL; detail pages that
 * know better (e.g. a LAN's own game) pass `type` / `game`.
 */
export const AddYourEventButton = ({ type, game }) => {
    const { defaultProfile } = useCurrentUser();
    const { pathname } = useLocation();

    if (!canHostBrackets(defaultProfile)) return null;

    const fromPath = eventContextFromPath(pathname);
    const prefill = { type: type ?? fromPath.type, game: game ?? fromPath.game };
    const label = prefill.type ? `Add your ${EVENT_TYPES[prefill.type]}` : 'Add your event';

    return (
        <div className={styles.row}>
            <Link to={createEventUrl(defaultProfile.public_id, prefill)} className={styles.button}>
                <FaPlus aria-hidden="true" /> {label}
            </Link>
        </div>
    );
};
