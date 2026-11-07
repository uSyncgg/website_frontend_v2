import { Navigate, Outlet } from "react-router";
import { useCurrentUser } from "hooks";
import { profileUrl } from "utils/profiles";

// Wraps /complete-profile. Login (password and social) lands there, so users who
// already have an account are sent on to their default profile; everyone else sees the sign-up wizard.
export function RedirectIfProfileComplete() {
    const { status, defaultProfile } = useCurrentUser();

    // 'anonymous' is only momentary here - RequireCompleteProfile already sent
    // logged-out users to /login, so wait for the profile lookup to catch up.
    if (status === 'loading' || status === 'anonymous') return null;

    if (status === 'complete') {
        return <Navigate to={defaultProfile ? profileUrl(defaultProfile) : '/settings/profile'} replace />;
    }

    // 'incomplete', or 'error' (lookup failed - fall back to the wizard).
    return <Outlet />;
}
