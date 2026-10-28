import { Link, useLocation } from "react-router";
import { useCurrentUser } from "hooks";
import { setReturnTo } from "utils/returnTo";
import styles from "./ClaimEventPrompt.module.css";

// Bottom of an event page: lets a host account claim the listing as theirs.
// Logged-out visitors see it too - they log in or sign up first, then land on the form.
// eventType: 'lan' | 'league' | 'platform'.
export const ClaimEventPrompt = ({ eventType, eventName }) => {
    const { status, profile } = useCurrentUser();
    const location = useLocation();
    const anonymous = status === 'anonymous';

    if (!eventName || status === 'loading') return null;
    if (!anonymous && !profile?.is_host) return null;

    const claimPath = `/claim-event?${new URLSearchParams({ type: eventType, path: location.pathname, name: eventName })}`;

    return (
        <p className={styles.prompt}>
            Own this event? Claim{' '}
            {anonymous
                ? <Link to="/login" state={{ from: claimPath }} onClick={() => setReturnTo(claimPath)} className={styles.link}>here</Link>
                : <Link to={claimPath} className={styles.link}>here</Link>}
        </p>
    );
};
