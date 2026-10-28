import { useState } from "react";
import { Navigate, useLocation } from "react-router";
import { LoadingWheel, ProfileSettingsWizard } from "components";
import { useAuth, useCurrentUser, useSettings } from "hooks";
import { getLoadErrorMessage } from "utils/apiError";

// /settings/profile - RequireCompleteProfile has already sent logged-out users to /login.
export const ProfileSettings = () => {
    const { session } = useAuth();
    const { status } = useCurrentUser();
    const location = useLocation();
    // Bumped after a role is added so the settings (and the wizard's steps) reload.
    const [version, setVersion] = useState(0);
    const [notice, setNotice] = useState(null);
    const { data: settings, loading, error } = useSettings(session?.access_token, version);

    // added: the roles just added, e.g. ['player', 'venue'].
    const handleRolesChanged = (added) => {
        const names = { player: 'a player', host: 'a host', venue: 'a venue' };
        setNotice(`You're now ${added.map(r => names[r]).join(' and ')}! Your new details are saved - you can edit them in the steps below.`);
        setVersion(v => v + 1);
    };

    // No profile row yet: finish sign-up first.
    if (status === 'incomplete' || error?.response?.status === 404) {
        return <Navigate to="/complete-profile" replace />;
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
    if (loading || !settings) {
        return <div className="standardContainer"><LoadingWheel /></div>;
    }

    return <ProfileSettingsWizard key={version} settings={settings} notice={notice} onRolesChanged={handleRolesChanged} />;
};
