import { useState } from 'react';
import { linkedAccounts } from 'utils/linkedPlatforms';
import styles from './ProfileLinks.module.css';

const PlatformMark = ({ platform }) => (
    <span className={styles.mark} aria-hidden="true">
        {platform.Icon ? <platform.Icon /> : <img src={platform.icon} alt="" />}
    </span>
);

// One linked account. Platforms with a public page open it; the rest (Discord, game IDs)
// copy the handle, since there's nowhere to send people. Discord shows just its logo.
const LinkChip = ({ platform, handle }) => {
    const [copied, setCopied] = useState(false);
    const title = `${platform.label}: ${handle}`;

    if (platform.url) {
        return (
            <a className={styles.chip} href={platform.url(handle)} target="_blank" rel="noopener noreferrer" title={title} aria-label={title}>
                <PlatformMark platform={platform} />
            </a>
        );
    }

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(handle);
            setCopied(true);
            setTimeout(() => setCopied(false), 1400);
        } catch {
            // Clipboard can be blocked; the handle is still in the tooltip.
        }
    };

    return (
        <button type="button" className={`${styles.chip} ${platform.iconOnly && !copied ? '' : styles.idChip}`} onClick={copy} title={`${title} (click to copy)`} aria-label={`Copy ${title}`}>
            <PlatformMark platform={platform} />
            {platform.iconOnly
                ? copied && <span className={styles.handle}>Copied</span>
                : <span className={styles.handle}>{copied ? 'Copied' : handle}</span>}
        </button>
    );
};

/**
 * The linked accounts row under a profile's name: socials and competitive sites as icon
 * links, game IDs as copyable chips. `onEdit` (the owner only) adds a button to manage them,
 * which also stands in for the row when nothing is linked yet.
 */
export const ProfileLinks = ({ profile, onEdit }) => {
    const accounts = linkedAccounts(profile);
    const links = accounts.filter(a => a.platform.group !== 'game');
    const gameIds = accounts.filter(a => a.platform.group === 'game');

    if (accounts.length === 0 && !onEdit) return null;

    return (
        <div className={styles.row}>
            {links.length > 0 &&
                <div className={styles.group}>
                    {links.map(a => <LinkChip key={a.platform.key} {...a} />)}
                </div>
            }
            {gameIds.length > 0 &&
                <div className={styles.group}>
                    {gameIds.map(a => <LinkChip key={a.platform.key} {...a} />)}
                </div>
            }
            {onEdit &&
                <button type="button" className={styles.edit} onClick={onEdit}>
                    {accounts.length > 0 ? 'Edit links' : '+ Link your accounts'}
                </button>
            }
        </div>
    );
};
