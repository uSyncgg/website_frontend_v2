import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useCurrentUser } from "hooks";
import styles from '../Navbar/Navbar.module.css';

// react-snap prerenders with no session; render the neutral placeholder so the
// snapshot never bakes in logged-out buttons and matches the first client render.
const isPrerendering = typeof navigator !== 'undefined' && navigator.userAgent === 'ReactSnap';

const SETTINGS_PATH = '/settings/profile';

const Avatar = ({ src }) => {
    const [failed, setFailed] = useState(false);

    if (!src || failed) {
        return <FaUserCircle className={styles.avatarFallback} aria-hidden="true" />;
    }
    return <img src={src} alt="" className={styles.avatarImage} onError={() => setFailed(true)} />;
};

const ProfileMenu = ({ profile, logout }) => {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        if (!open) return;

        const handleClickOutside = (e) => {
            if (!wrapperRef.current?.contains(e.target)) setOpen(false);
        };
        const handleEscape = (e) => {
            if (e.key === 'Escape') setOpen(false);
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [open]);

    const close = () => setOpen(false);

    return (
        <div className={styles.accountMenu} ref={wrapperRef}>
            <button
                type="button"
                className={styles.avatarButton}
                aria-label="Account menu"
                aria-haspopup="menu"
                aria-expanded={open}
                onClick={() => setOpen(o => !o)}
            >
                <Avatar key={profile?.profile_picture} src={profile?.profile_picture} />
            </button>

            {open &&
                <div className={styles.accountDropdown} role="menu">
                    {profile?.username &&
                        <Link to={`/profile/${encodeURIComponent(profile.username)}`} className={styles.dropdownItem} role="menuitem" onClick={close}>
                            Profile
                        </Link>
                    }
                    <Link to={SETTINGS_PATH} className={styles.dropdownItem} role="menuitem" onClick={close}>
                        Profile Settings
                    </Link>
                    <button type="button" className={`${styles.dropdownItem} ${styles.dropdownButton}`} role="menuitem" onClick={logout}>
                        Logout
                    </button>
                </div>
            }
        </div>
    );
};

// variant="header" renders in the top-right of the navbar (desktop);
// variant="menu" renders as plain links at the bottom of the hamburger menu (mobile).
export const AccountNavItem = ({ closeMenu, variant = 'header' }) => {
    const { status, profile, logout } = useCurrentUser();

    if (isPrerendering || status === 'loading') {
        return variant === 'header' ? <div className={styles.accountPlaceholder} /> : null;
    }

    if (status === 'anonymous') {
        return (
            <div className={variant === 'header' ? styles.accountButtons : styles.mobileAccount}>
                <Link to="/login" className={styles.secondaryButton} onClick={closeMenu}>Login</Link>
                <Link to="/signup" className={styles.primaryButton} onClick={closeMenu}>Sign Up</Link>
            </div>
        );
    }

    if (status === 'incomplete') {
        return (
            <div className={variant === 'header' ? styles.accountButtons : styles.mobileAccount}>
                <Link to="/complete-profile" className={styles.primaryButton} onClick={closeMenu}>Complete Profile</Link>
            </div>
        );
    }

    // 'complete', or 'error' (logged in but the profile lookup failed - still offer Logout).
    if (variant === 'header') {
        return <ProfileMenu profile={profile} logout={logout} />;
    }

    return (
        <div className={styles.mobileAccount}>
            {profile?.username &&
                <Link to={`/profile/${encodeURIComponent(profile.username)}`} className={styles.navLink} onClick={closeMenu}>
                    Profile
                </Link>
            }
            <Link to={SETTINGS_PATH} className={styles.navLink} onClick={closeMenu}>
                Profile Settings
            </Link>
            <button type="button" className={styles.navLink} onClick={logout}>
                Logout
            </button>
        </div>
    );
};
