import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useCurrentUser } from "hooks";
import { addProfileUrl, missingProfileTypes, profileUrl } from "utils/profiles";
import styles from '../Navbar/Navbar.module.css';

// react-snap prerenders with no session; render the neutral placeholder so the
// snapshot never bakes in logged-out buttons and matches the first client render.
const isPrerendering = typeof navigator !== 'undefined' && navigator.userAgent === 'ReactSnap';

const Avatar = ({ src }) => {
    const [failed, setFailed] = useState(false);

    if (!src || failed) {
        return <FaUserCircle className={styles.avatarFallback} aria-hidden="true" />;
    }
    return <img src={src} alt="" className={styles.avatarImage} onError={() => setFailed(true)} />;
};

// The menu's items, shared by the desktop dropdown and the mobile hamburger menu.
// Before sign-up is finished there's no default profile: Profile goes to /profile (a blank
// profile pointing to the sign-up form) and Settings sends them to the form too.
// Switching the default profile lives in Profile Settings.
const AccountLinks = ({ itemClass, buttonClass, onNavigate }) => {
    const { defaultProfile, profiles, logout } = useCurrentUser();
    const canAdd = missingProfileTypes(profiles);

    return (
        <>
            <Link to={defaultProfile ? profileUrl(defaultProfile) : '/profile'} className={itemClass} role="menuitem" onClick={onNavigate}>
                Profile
            </Link>
            {/* Goes straight to the profile's settings when there's only one, otherwise asks which. */}
            <Link to="/settings/profile" className={itemClass} role="menuitem" onClick={onNavigate}>
                Profile Settings
            </Link>

            {defaultProfile && canAdd.length > 0 &&
                <Link to={addProfileUrl(canAdd[0])} className={itemClass} role="menuitem" onClick={onNavigate}>
                    Add a Profile
                </Link>
            }

            <button type="button" className={buttonClass} role="menuitem" onClick={logout}>
                Logout
            </button>
        </>
    );
};

const ProfileMenu = () => {
    const { defaultProfile } = useCurrentUser();
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
                <Avatar key={defaultProfile?.profile_picture} src={defaultProfile?.profile_picture} />
            </button>

            {open &&
                <div className={styles.accountDropdown} role="menu">
                    <AccountLinks
                        itemClass={styles.dropdownItem}
                        buttonClass={`${styles.dropdownItem} ${styles.dropdownButton}`}
                        onNavigate={() => setOpen(false)}
                    />
                </div>
            }
        </div>
    );
};

// variant="header" renders in the top-right of the navbar (desktop and mobile);
// variant="menu" also renders at the bottom of the hamburger menu (mobile only).
export const AccountNavItem = ({ closeMenu, variant = 'header' }) => {
    const { status } = useCurrentUser();

    if (isPrerendering || status === 'loading') {
        return variant === 'header' ? <div className={styles.accountPlaceholder} /> : null;
    }

    if (status === 'anonymous') {
        return (
            <div className={variant === 'header' ? styles.accountButtons : styles.mobileAccount}>
                <Link to="/login" className={styles.secondaryButton} onClick={closeMenu}>Log In</Link>
                <Link to="/signup" className={styles.primaryButton} onClick={closeMenu}>Sign Up</Link>
            </div>
        );
    }

    // 'complete', 'incomplete' (sign-up not finished - same menu, Profile and Settings lead to
    // the form), or 'error' (logged in but the lookup failed - still offer Logout).
    if (variant === 'header') {
        return <ProfileMenu />;
    }

    return (
        <div className={styles.mobileAccount}>
            <AccountLinks itemClass={styles.navLink} buttonClass={styles.navLink} onNavigate={closeMenu} />
        </div>
    );
};
