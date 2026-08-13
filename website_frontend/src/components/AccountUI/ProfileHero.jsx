import { Link } from "react-router";
import { FaPen } from "react-icons/fa";
import styles from './AccountUI.module.css';
import { cardPatternClass } from './callingCards';

/**
 * Dashboard header. The banner is the player's equipped calling card (or their
 * own uploaded banner), so the profile and the shareable card always wear the
 * same skin. Edit profile sits top-right, out of the identity's way.
 */
export const ProfileHero = ({
    profile,
    verified = false,
    card,
    bannerUrl,
    platforms = [],
    personaLabels = [],
    eventTypeLabels = [],
    level,
    editable = true,
    editHref = "/account/profile/edit",
}) => {
    const isHost = profile.accountType === "host";
    const displayName = isHost ? profile.accountName : profile.username;
    const initials = (displayName || "?").slice(0, 1).toUpperCase();
    const location = [profile.state, profile.country].filter(Boolean).join(", ");
    const showLocation = !profile.hidden?.state && !profile.hidden?.country && !!location;
    const bannerClass = bannerUrl ? styles.patternCustom : styles[cardPatternClass(card?.id || 'nightfall')];
    const linked = platforms.filter(p => profile.links?.[p.value]);

    return (
        <section className={styles.hero}>
            <div
                className={`${styles.heroBanner} ${bannerClass}`}
                style={bannerUrl ? { '--pcard-banner': `url(${bannerUrl})` } : undefined}
                aria-hidden="true"
            >
                <span className={styles.heroBannerFade} />
            </div>

            {editable && (
                <Link to={editHref} className={styles.heroEdit}>
                    <FaPen /> Edit profile
                </Link>
            )}

            <div className={styles.heroBody}>
                <div
                    className={styles.heroAvatar}
                    style={profile.avatar ? { backgroundImage: `url(${profile.avatar})` } : undefined}
                >
                    {!profile.avatar && initials}
                </div>

                <div className={styles.heroIdentity}>
                    <div className={styles.heroNameRow}>
                        <h1 className={styles.heroName}>{displayName}</h1>
                        {verified && <span className={styles.verifiedPill}>✓ uSync Verified</span>}
                        {level != null && <span className={styles.heroLevel}>Level {level}</span>}
                    </div>

                    <div className={styles.heroMetaRow}>
                        {isHost && <span>@{profile.username}</span>}
                        {showLocation && <span>{location}</span>}
                        {(personaLabels.length > 0 || eventTypeLabels.length > 0) && (
                            <span className={styles.heroBadges}>
                                {(isHost ? eventTypeLabels : personaLabels).map(label => (
                                    <span className={styles.badge} key={label}>{label}</span>
                                ))}
                            </span>
                        )}
                    </div>

                    {profile.bio && <p className={styles.heroBio}>{profile.bio}</p>}

                    {linked.length > 0 && (
                        <div className={styles.socialIconRow}>
                            {linked.map(({ value, label, icon: Icon }) => (
                                <span className={styles.socialIconLink} key={value} title={`${label}: ${profile.links[value]}`}>
                                    <Icon />
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
