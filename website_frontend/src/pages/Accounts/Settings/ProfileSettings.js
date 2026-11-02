import { useState } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router";
import { LoadingWheel, ProfileSettingsWizard, SignUpFormWizard } from "components";
import { useAuth, useCurrentUser, useSettings } from "hooks";
import { useAsync } from "hooks/useEvents";
import { getMe } from "services/user";
import { getLoadErrorMessage } from "utils/apiError";
import { PROFILE_LABELS, PROFILE_TYPES, addProfileUrl, byProfileType, missingProfileTypes, settingsUrl } from "utils/profiles";
import styles from "./ProfileSettings.module.css";

const Loading = () => <div className="standardContainer"><LoadingWheel /></div>;

// Above a profile's settings and the add-a-profile form: back to the profile picker.
const SettingsBar = () => (
    <div className={styles.bar}>
        <Link to="/settings/profile" className={styles.barLink}>← All profiles</Link>
    </div>
);

const PickerAvatar = ({ profile }) => {
    const [failed, setFailed] = useState(false);
    return (
        <span className={styles.avatar} aria-hidden="true">
            {profile.profile_picture && !failed
                ? <img src={profile.profile_picture} alt="" onError={() => setFailed(true)} />
                : profile.username.charAt(0).toUpperCase()}
        </span>
    );
};

// /settings/profile - fetches the account's profiles and asks which one to edit, however many
// there are. Each type the account doesn't have yet shows as a faded, dotted "Add a ... profile"
// card that opens the add-a-profile form. RequireCompleteProfile has already sent logged-out users to /login.
export const ProfileSettingsHome = () => {
    const { session } = useAuth();
    const { status } = useCurrentUser();
    const location = useLocation();
    const token = session?.access_token;
    const { data: me, loading, error } = useAsync(() => getMe(token), [token], { skip: !token });

    // No account yet, so nothing to edit: finish sign-up first. The navbar already knows
    // (status), and the fetch's 404 covers a visit before it does.
    if (status === 'incomplete' || error?.response?.status === 404) return <Navigate to="/complete-profile" replace />;
    if (error?.response?.status === 401) return <Navigate to="/login" state={{ from: location }} replace />;
    if (error) {
        return (
            <div className="standardContainer">
                <p>{getLoadErrorMessage(error, "Unable to load your settings right now.")}</p>
            </div>
        );
    }
    if (loading || !me) return <Loading />;

    const profiles = [...me.profiles].sort(byProfileType);

    return (
        <div className={styles.pickerPage}>
            <div className={styles.picker}>
                <h1 className={styles.pickerTitle}>Profile settings</h1>
                <p className={styles.pickerSub}>Which profile do you want to edit?</p>

                <div className={styles.cards}>
                    {profiles.map(profile => (
                        <Link key={profile.type} to={settingsUrl(profile.type)} className={styles.card}>
                            <PickerAvatar profile={profile} />
                            <span className={styles.cardText}>
                                <span className={styles.cardType}>{PROFILE_LABELS[profile.type]}</span>
                                <span className={styles.cardName}>{profile.username}</span>
                            </span>
                            {profile.type === me.default_profile?.type && <span className={styles.cardDefault}>Default</span>}
                        </Link>
                    ))}

                    {missingProfileTypes(profiles).map(type => (
                        <Link key={type} to={addProfileUrl(type)} className={`${styles.card} ${styles.cardAdd}`}>
                            <span className={styles.avatar} aria-hidden="true">+</span>
                            <span className={styles.cardText}>
                                <span className={styles.cardType}>{PROFILE_LABELS[type]}</span>
                                <span className={styles.cardName}>Add a {PROFILE_LABELS[type].toLowerCase()} profile</span>
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

// /settings/profile/:type - one profile's settings.
export const ProfileSettings = () => {
    const { type } = useParams();
    const { session } = useAuth();
    const { status } = useCurrentUser();
    const location = useLocation();
    const validType = PROFILE_TYPES.includes(type);
    const { data, loading, error } = useSettings(validType ? session?.access_token : null, type);
    // Switching profiles changes `type` a render before the hook drops the previous profile's
    // settings, so only use settings for the profile in the URL.
    const settings = data?.type === type ? data : null;

    // No account yet: finish sign-up first.
    if (status === 'incomplete') {
        return <Navigate to="/complete-profile" replace />;
    }

    // Not a profile type, or one this account doesn't have: back to the picker.
    if (!validType || error?.response?.status === 404) {
        return <Navigate to="/settings/profile" replace />;
    }

    if (error?.response?.status === 401) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (error) {
        return (
            <div className="standardContainer">
                <p>{getLoadErrorMessage(error, "Unable to load your settings right now.")}</p>
            </div>
        );
    }

    // The wizard reads its defaultValues once, so only mount it after the data has arrived.
    if (loading || !settings) return <Loading />;

    return (
        <div className={styles.settingsPage}>
            <SettingsBar />
            {/* key: a fresh form for each profile, so one profile's edits can't carry into another's. */}
            <ProfileSettingsWizard key={type} settings={settings} />
        </div>
    );
};

// /settings/profile/add/:type - add a player, host or venue profile to the account.
export const AddProfile = () => {
    const { type } = useParams();
    const { status, profiles } = useCurrentUser();

    if (status === 'loading') return <Loading />;
    if (status === 'incomplete') return <Navigate to="/complete-profile" replace />;
    if (!PROFILE_TYPES.includes(type)) return <Navigate to="/settings/profile" replace />;

    // Already has one: edit it instead.
    if (profiles.some(profile => profile.type === type)) {
        return <Navigate to={settingsUrl(type)} replace />;
    }

    return (
        <div className={styles.settingsPage}>
            <SettingsBar />
            <SignUpFormWizard key={type} addType={type} />
        </div>
    );
};
