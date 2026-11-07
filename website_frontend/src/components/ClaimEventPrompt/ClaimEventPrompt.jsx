import { Link, useLocation } from "react-router";
import { useCurrentUser } from "hooks";
import styles from "./ClaimEventPrompt.module.css";

// Bottom of an event page: "Own this event? Claim here". Everyone sees it; the claim page
// handles logging in (its route is behind RequireCompleteProfile, which comes back afterwards)
// and tells accounts without a host profile to make one.
// eventId is the listing's events.id from the backend payload.
export const ClaimEventPrompt = ({ eventId }) => {
    const { status } = useCurrentUser();
    const location = useLocation();

    // Older API responses don't include the id yet; nothing to claim without it.
    if (!eventId || status === 'loading') return null;

    return (
        <p className={styles.prompt}>
            Own this event? Claim{' '}
            <Link to={`/claim-event/${eventId}`} state={{ eventPath: location.pathname }} className={styles.link}>here</Link>
        </p>
    );
};
