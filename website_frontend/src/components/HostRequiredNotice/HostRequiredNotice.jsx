import { useEffect } from "react";
import { Link } from "react-router";
import { FaTimes } from "react-icons/fa";
import { dismissHostNotice, useHostNotice } from "hooks/usePostYourEvent";
import { addProfileUrl, settingsUrl } from "utils/profiles";
import styles from "./HostRequiredNotice.module.css";

const MESSAGES = {
    signed_out: { text: 'Posting an event needs a host account.', link: '/login', label: 'Log in' },
    no_host: { text: 'You need a host profile to post events. You can add one in Settings.', link: addProfileUrl('host'), label: 'Add a host profile' },
    hosting_off: { text: 'Bracket hosting is turned off for your host profile. Turn it on in Settings to post events.', link: settingsUrl('host'), label: 'Open Settings' },
};

/**
 * The popup under the navbar when someone tries to post an event without a host profile
 * (see usePostYourEvent). It closes on its own after 10 seconds, when dismissed, or on its link.
 */
export const HostRequiredNotice = () => {
    const reason = useHostNotice();

    useEffect(() => {
        if (!reason) return;
        const t = setTimeout(dismissHostNotice, 10000);
        return () => clearTimeout(t);
    }, [reason]);

    if (!reason) return null;
    const { text, link, label } = MESSAGES[reason];

    return (
        <div className={styles.notice} role="alert">
            <span>{text}</span>
            <Link to={link} className={styles.link} onClick={dismissHostNotice}>{label}</Link>
            <button type="button" className={styles.close} onClick={dismissHostNotice} aria-label="Close">
                <FaTimes aria-hidden="true" />
            </button>
        </div>
    );
};
