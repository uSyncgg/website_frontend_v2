import styles from './ProfileHeader.module.css';

/**
 * Top of a profile: avatar initial, username, verified badge and a statline of
 * the account's roles. `children` renders on the right (the view toggle).
 */
export const ProfileHeader = ({ username, verified, roles = [], children }) => {
    return (
        <section className={styles.phead}>
            <div className={styles.inner}>
                <div className={styles.avatar} aria-hidden="true">
                    {username.charAt(0).toUpperCase()}
                </div>
                <div className={styles.who}>
                    <div className={styles.tagline}>
                        <h1 className={styles.name}>{username}</h1>
                        {verified &&
                            <span className={styles.verified}>
                                <span className={styles.check}>
                                    <svg viewBox="0 0 24 24"><polyline points="4,13 9,18 20,6" /></svg>
                                </span>
                                Verified
                            </span>
                        }
                    </div>
                    {roles.length > 0 &&
                        <div className={styles.statline}>
                            {roles.map((role, i) => (
                                <span key={role}>
                                    {i > 0 && <span className={styles.sep}>/</span>}
                                    {role}
                                </span>
                            ))}
                        </div>
                    }
                </div>
                {children && <div className={styles.acts}>{children}</div>}
            </div>
        </section>
    );
}
