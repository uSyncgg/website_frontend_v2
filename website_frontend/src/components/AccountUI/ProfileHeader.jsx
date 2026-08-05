import { FaCamera } from "react-icons/fa";
import styles from './AccountUI.module.css';

export const ProfileHeader = ({
    profile,
    verified = false,
    mode = "view",
    platforms = [],
    showLinks = true,
    personaLabels = [],
    eventTypeLabels = [],
    onFieldChange,
    onLinkChange,
    onAvatarChange,
}) => {
    const isHost = profile.accountType === "host";
    const displayName = isHost ? profile.accountName : profile.username;
    const initials = (displayName || "?").slice(0, 1).toUpperCase();
    const location = [profile.state, profile.country].filter(Boolean).join(", ");
    const showLocation = !profile.hidden?.state && !profile.hidden?.country && !!location;
    const avatarStyle = profile.avatar ? { backgroundImage: `url(${profile.avatar})` } : undefined;

    const handleAvatarFile = (e) => {
        const file = e.target.files?.[0];
        if (file) onAvatarChange?.(URL.createObjectURL(file));
    };

    return (
        <div className={styles.profileHeader}>
            {mode === "edit" ? (
                <label className={styles.profileAvatar} style={avatarStyle}>
                    {!profile.avatar && <FaCamera />}
                    <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleAvatarFile} />
                </label>
            ) : (
                <div className={styles.profileAvatar} style={avatarStyle}>
                    {!profile.avatar && initials}
                </div>
            )}

            <div className={styles.profileIdentity}>
                <div className={styles.profileNameRow}>
                    <h1 className={styles.profileUsername}>{displayName}</h1>
                    {verified && <span className={styles.verifiedPill}>✓ uSync Verified</span>}
                </div>

                <div className={styles.profileBadgeRow}>
                    {!isHost && personaLabels.map(p => <span className={styles.badge} key={p}>{p}</span>)}
                    {isHost && eventTypeLabels.map(t => <span className={styles.badge} key={t}>{t}</span>)}
                </div>

                {(isHost || showLocation) && (
                    <div className={styles.profileMetaRow}>
                        {isHost && <span className={styles.profileMetaItem}>@{profile.username}</span>}
                        {showLocation && <span className={styles.profileMetaItem}>{location}</span>}
                    </div>
                )}

                {mode === "edit" ? (
                    <textarea
                        className={styles.input}
                        rows={3}
                        style={{ resize: "vertical", fontFamily: "inherit", marginBottom: "1.25rem" }}
                        placeholder="Tell people about yourself..."
                        value={profile.bio || ""}
                        onChange={(e) => onFieldChange?.("bio", e.target.value)}
                    />
                ) : (
                    profile.bio && <p className={styles.profileBio}>{profile.bio}</p>
                )}

                {showLinks && (mode === "edit" ? (
                    <div className={styles.linkAccountsGrid}>
                        {platforms.map(({ value, label, icon: Icon }) => (
                            <div className={styles.linkAccountRow} key={value}>
                                <Icon className={styles.linkAccountIcon} />
                                <span className={styles.linkAccountLabel}>{label}</span>
                                <input
                                    className={styles.linkAccountInput}
                                    placeholder="Username"
                                    value={profile.links?.[value] || ""}
                                    onChange={(e) => onLinkChange?.(value, e.target.value)}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles.socialIconRow}>
                        {platforms.filter(p => profile.links?.[p.value]).map(({ value, label, icon: Icon }) => (
                            <span className={styles.socialIconLink} key={value} title={`${label}: ${profile.links[value]}`}>
                                <Icon />
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};
