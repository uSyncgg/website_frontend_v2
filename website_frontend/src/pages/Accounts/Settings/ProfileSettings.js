import { Navigate, useLocation } from "react-router";
import { LoadingWheel, ProfileSettingsWizard } from "components";
import { useAuth, useCurrentUser, useSettings } from "hooks";
import { getLoadErrorMessage } from "utils/apiError";

// /settings/profile - RequireCompleteProfile has already sent logged-out users to /login.
export const ProfileSettings = () => {
    const { session } = useAuth();
    const { status } = useCurrentUser();
    const location = useLocation();
    const { data: settings, loading, error } = useSettings(session?.access_token);

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

    return <ProfileSettingsWizard settings={settings} />;
};
