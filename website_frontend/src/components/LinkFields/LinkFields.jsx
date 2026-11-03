import { platformsFor, toHandle } from 'utils/linkedPlatforms';
import styles from './LinkFields.module.css';

const GROUPS = [
    { key: 'social', title: 'Socials' },
    { key: 'game', title: 'Game accounts' },
    { key: 'competitive', title: 'Competitive sites' },
    { key: 'brand', title: 'Brand & website' },
];

const PLACEHOLDERS = { website: 'yoursite.com', discord: 'username' };

const placeholder = (p) => (p.invite ? 'Link to your server, ensure it never expires' : PLACEHOLDERS[p.key]) ?? 'Handle or link to your page';

// Where a typed/pasted value will actually link, shown under the field so people can see that
// a pasted URL was understood (and that only the handle is kept).
export const linkPreview = (p, value) => {
    if (!value?.trim()) return null;
    if (!p.url) return p.key === 'discord' && !toHandle(p, value) ? 'Not a valid username' : null;
    const handle = toHandle(p, value);
    return handle ? p.url(handle).replace(/^https:\/\/(www\.)?/, '') : 'Not a valid link';
};

/**
 * The link inputs for one profile type, grouped (socials, game accounts, ...). Used by the link
 * editor and the sign-up/add-a-profile "Linked Accounts" step. `values` maps platform key to
 * what's typed; `onChange(key, value)` updates it.
 */
export const LinkFields = ({ type, values, onChange }) => {
    const platforms = platformsFor(type);

    return GROUPS.map(group => {
        const inGroup = platforms.filter(p => p.group === group.key);
        if (inGroup.length === 0) return null;
        return (
            <fieldset key={group.key} className={styles.group}>
                <legend className={styles.legend}>{group.title}</legend>
                {inGroup.map(p => {
                    // Game accounts get linked by signing in to the platform (for live stats).
                    // That isn't built yet, so the button doesn't do anything for now.
                    if (p.group === 'game') {
                        return (
                            <div key={p.key} className={`${styles.field} ${styles.gameField}`}>
                                <span className={styles.mark} aria-hidden="true"><img src={p.icon} alt="" /></span>
                                <span className={styles.label}>{p.label}</span>
                                <button type="button" className={styles.linkButton} aria-label={`Link ${p.label} account`}>Link account</button>
                            </div>
                        );
                    }
                    const preview = linkPreview(p, values[p.key]);
                    return (
                        <label key={p.key} className={`${styles.field} ${p.comingSoon ? styles.soon : ''}`}>
                            <span className={styles.mark} aria-hidden="true">
                                {p.Icon ? <p.Icon /> : <img src={p.icon} alt="" />}
                            </span>
                            <span className={styles.label}>{p.label}</span>
                            <input
                                className={styles.input}
                                value={p.comingSoon ? '' : values[p.key] ?? ''}
                                placeholder={p.comingSoon ? 'Coming soon' : placeholder(p)}
                                disabled={p.comingSoon}
                                onChange={(e) => onChange(p.key, e.target.value)}
                                autoComplete="off"
                                spellCheck={false}
                            />
                            {preview &&
                                <span className={`${styles.preview} ${preview.startsWith('Not a valid') ? styles.invalid : ''}`}>→ {preview}</span>
                            }
                        </label>
                    );
                })}
            </fieldset>
        );
    });
};
