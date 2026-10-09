import { Navigate, Outlet } from "react-router";
import { useCurrentUser } from "hooks";

// Wraps /complete-profile. Login (password and social) lands there, so users who
// already have a profile are sent on to it; everyone else sees the sign-up wizard.
export function RedirectIfProfileComplete() {
    const { status, profile } = useCurrentUser();

    // 'anonymous' is only momentary here - RequireCompleteProfile already sent
    // logged-out users to /login, so wait for the profile lookup to catch up.
    if (status === 'loading' || status === 'anonymous') return null;

    if (status === 'complete') {
        return <Navigate to={`/profile/${encodeURIComponent(profile.username)}`} replace />;
    }

    // 'incomplete', or 'error' (lookup failed - fall back to the wizard).
    return <Outlet />;
}
