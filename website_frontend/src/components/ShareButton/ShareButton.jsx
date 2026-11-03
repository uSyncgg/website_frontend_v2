import { useState } from 'react';
import { FaShareAlt } from 'react-icons/fa';
import styles from './ShareButton.module.css';

/**
 * Shares the current page (or `url`): the device's share sheet where there is one (phones),
 * otherwise copies the link and says so.
 */
export const ShareButton = ({ title, url }) => {
    const [copied, setCopied] = useState(false);

    const share = async () => {
        const link = url ?? window.location.href;
        if (navigator.share) {
            try {
                await navigator.share({ title, url: link });
                return;
            } catch (err) {
                // Closing the share sheet isn't an error worth falling back from.
                if (err?.name === 'AbortError') return;
            }
        }
        try {
            await navigator.clipboard.writeText(link);
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
        } catch {
            window.prompt('Copy this link:', link);
        }
    };

    return (
        <button type="button" className={styles.share} onClick={share}>
            <FaShareAlt aria-hidden="true" />
            {copied ? 'Link copied' : 'Share'}
        </button>
    );
};
