import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";
import { FaCheck, FaChevronDown, FaUserCircle } from "react-icons/fa";
import { useCurrentUser } from "hooks";
import { PROFILE_LABELS, profileUrl } from "utils/profiles";
import { getApiErrorMessage } from "utils/apiError";
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

// "Viewing as": the account's profiles, the current view (the default profile) ticked. Picking
// another switches the view everywhere (navbar, Profile link) and keeps you on the page you're on. Views will
// also decide what the rest of the site offers (e.g. hosts bidding on spots). It opens from the
// view label next to the avatar, on its own (the avatar opens the account menu).
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

// The account menu's items (no view switching - that's the view label's menu), shared by the
// avatar's dropdown and the mobile hamburger menu.
// Before sign-up is finished there's no default profile: Profile goes to /profile (a blank
// profile pointing to the sign-up form) and Settings sends them to the form too.
const AccountLinks = ({ itemClass, buttonClass, onNavigate }) => {
    const { defaultProfile, logout } = useCurrentUser();

    return (
        <>
            <Link to={defaultProfile ? profileUrl(defaultProfile) : '/profile'} className={itemClass} role="menuitem" onClick={onNavigate}>
                Profile
            </Link>
            {/* Goes straight to the profile's settings when there's only one, otherwise asks which. */}
            <Link to="/settings/profile" className={itemClass} role="menuitem" onClick={onNavigate}>
                Settings
            </Link>

            <button type="button" className={buttonClass} role="menuitem" onClick={logout}>
                Logout
            </button>
        </>
    );
};

// Two menus side by side: the avatar opens the account menu (Profile, Settings, Logout) and the view label opens "Viewing as". With a single profile there's nothing to
// switch to, so the label is just a label.
const ProfileMenu = () => {
    const { defaultProfile, profiles } = useCurrentUser();
    // null, 'account' or 'view'.
    const [open, setOpen] = useState(null);
    const wrapperRef = useRef(null);
    const canSwitch = !!defaultProfile && profiles.length > 1;

    useEffect(() => {
        if (!open) return;

        const handleClickOutside = (e) => {
            if (!wrapperRef.current?.contains(e.target)) setOpen(null);
        };
        const handleEscape = (e) => {
            if (e.key === 'Escape') setOpen(null);
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [open]);

    const toggle = (menu) => setOpen(current => (current === menu ? null : menu));
    const viewLabel = defaultProfile && PROFILE_LABELS[defaultProfile.type];

    return (
        <div className={styles.accountMenu} ref={wrapperRef}>
            <div className={styles.accountTriggers}>
                <button
                    type="button"
                    className={styles.accountTrigger}
                    aria-label="Account menu"
                    aria-haspopup="menu"
                    aria-expanded={open === 'account'}
                    onClick={() => toggle('account')}
                >
                    <span className={styles.avatarButton}>
                        <Avatar key={defaultProfile?.profile_picture} src={defaultProfile?.profile_picture} />
                    </span>
                </button>
                {viewLabel && (canSwitch
                    ? (
                        <button
                            type="button"
                            className={`${styles.accountTrigger} ${styles.viewTrigger}`}
                            aria-label={`Viewing as ${viewLabel}, switch view`}
                            aria-haspopup="menu"
                            aria-expanded={open === 'view'}
                            onClick={() => toggle('view')}
                        >
                            <span className={styles.viewLabel}>
                                {viewLabel}
                                <FaChevronDown aria-hidden="true" />
                            </span>
                        </button>
                    )
                    : <span className={styles.viewLabel} aria-label={`Viewing as ${viewLabel}`}>{viewLabel}</span>
                )}
            </div>

            {open === 'account' &&
                <div className={styles.accountDropdown} role="menu">
                    <AccountLinks
                        itemClass={styles.dropdownItem}
                        buttonClass={`${styles.dropdownItem} ${styles.dropdownButton}`}
                        onNavigate={() => setOpen(null)}
                    />
                </div>
            }
            {open === 'view' &&
                <div className={styles.accountDropdown} role="menu">
                    <ViewSwitch itemClass={styles.dropdownItem} onNavigate={() => setOpen(null)} />
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
