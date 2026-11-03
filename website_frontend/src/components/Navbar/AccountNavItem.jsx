import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";
import { FaCheck, FaChevronDown, FaUserCircle } from "react-icons/fa";
import { useCurrentUser } from "hooks";
import { PROFILE_LABELS, canHostBrackets, profileUrl } from "utils/profiles";
import { getApiErrorMessage } from "utils/apiError";
import styles from '../Navbar/Navbar.module.css';

// react-snap prerenders with no session; render the neutral placeholder so the
// snapshot never bakes in logged-out buttons and matches the first client render.
const isPrerendering = typeof navigator !== 'undefined' && navigator.userAgent === 'ReactSnap';

const HOST_PATH = '/host/events';

const Avatar = ({ src }) => {
    const [failed, setFailed] = useState(false);

    if (!src || failed) {
        return <FaUserCircle className={styles.avatarFallback} aria-hidden="true" />;
    }
    return <img src={src} alt="" className={styles.avatarImage} onError={() => setFailed(true)} />;
};

// "Viewing as": the account's profiles, the current view (the default profile) ticked. Picking
// another switches the view everywhere (navbar, Profile link) and keeps you on the page you're on. Views will
// also decide what the rest of the site offers (e.g. hosts bidding on spots).
const ViewSwitch = ({ itemClass, onNavigate }) => {
    const { defaultProfile, profiles, switchProfile } = useCurrentUser();
    const [switching, setSwitching] = useState(null);
    const [error, setError] = useState('');

    if (!defaultProfile || profiles.length < 2) return null;

    const choose = async (profile) => {
        setError('');
        if (profile.type !== defaultProfile.type) {
            setSwitching(profile.type);
            try {
                await switchProfile(profile.type);
            } catch (err) {
                setError(getApiErrorMessage(err));
                setSwitching(null);
                return;
            }
            setSwitching(null);
        }
        onNavigate?.();
    };

    return (
        <div className={styles.viewSwitch} role="group" aria-label="Viewing as">
            <span className={styles.viewHeading}>Viewing as</span>
            {profiles.map(profile => {
                const active = profile.type === defaultProfile.type;
                return (
                    <button
                        key={profile.type}
                        type="button"
                        role="menuitemradio"
                        aria-checked={active}
                        className={`${itemClass} ${styles.dropdownButton} ${styles.viewOption} ${active ? styles.viewActive : ''}`}
                        onClick={() => choose(profile)}
                        disabled={switching !== null}
                    >
                        <span>{PROFILE_LABELS[profile.type]}</span>
                        {switching === profile.type ? <span className={styles.viewHint}>…</span> : active && <FaCheck aria-hidden="true" />}
                    </button>
                );
            })}
            {error && <span className={styles.viewError} role="alert">{error}</span>}
        </div>
    );
};

// The menu's items, shared by the desktop dropdown and the mobile hamburger menu.
// Before sign-up is finished there's no default profile: Profile goes to /profile (a blank
// profile pointing to the sign-up form) and Settings sends them to the form too.
// Switching the default profile lives in Profile Settings.
const AccountLinks = ({ itemClass, buttonClass, onNavigate }) => {
    const { defaultProfile, logout } = useCurrentUser();

    return (
        <>
            <ViewSwitch itemClass={itemClass} onNavigate={onNavigate} />
            <Link to={defaultProfile ? profileUrl(defaultProfile) : '/profile'} className={itemClass} role="menuitem" onClick={onNavigate}>
                Profile
            </Link>
            {/* Only while viewing as a host or venue that hosts brackets (see RequireBracketHost). */}
            {canHostBrackets(defaultProfile) &&
                <Link to={HOST_PATH} className={itemClass} role="menuitem" onClick={onNavigate}>
                    Host Dashboard
                </Link>
            }
            {/* Goes straight to the profile's settings when there's only one, otherwise asks which. */}
            <Link to="/settings/profile" className={itemClass} role="menuitem" onClick={onNavigate}>
                Profile Settings
            </Link>

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
                className={styles.accountTrigger}
                aria-label={defaultProfile ? `Account menu, viewing as ${PROFILE_LABELS[defaultProfile.type]}` : 'Account menu'}
                aria-haspopup="menu"
                aria-expanded={open}
                onClick={() => setOpen(o => !o)}
            >
                <span className={styles.avatarButton}>
                    <Avatar key={defaultProfile?.profile_picture} src={defaultProfile?.profile_picture} />
                </span>
                {defaultProfile &&
                    <span className={styles.viewLabel}>
                        {PROFILE_LABELS[defaultProfile.type]}
                        <FaChevronDown aria-hidden="true" />
                    </span>
                }
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
