import { Navigate, Outlet, useLocation } from "react-router";
import { useCurrentUser } from "hooks";

// TODO(admin auth): placeholder until the real authorization check lands. Swap
// this for whatever the backend exposes (role claim, is_admin flag, allowlist).
// Until then only localhost dev builds get in, so production stays locked.
const isAuthorizedAdmin = (profile) =>
    profile?.is_admin === true || process.env.NODE_ENV === 'development';

// Admin-only routes: logged-out users go to /login, everyone else who isn't
// authorized is sent home.
export function RequireAdmin() {
    const { status, profile } = useCurrentUser();
    const location = useLocation();

    if (status === 'loading') return null;

    if (status === 'anonymous') {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    if (!isAuthorizedAdmin(profile)) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
}
