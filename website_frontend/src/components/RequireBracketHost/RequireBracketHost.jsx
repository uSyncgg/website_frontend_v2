import { Navigate, Outlet, useLocation } from "react-router";
import { useCurrentUser } from "hooks";
import { canHostBrackets, profileUrl } from "utils/profiles";

// Creating events: only while viewing as a host or venue profile with bracket hosting on (the
// view picked in the navbar's "Viewing as" menu). Switching to another view sends you back to
// that profile. The API checks the same rule when an event is created. Managing an existing
// event isn't gated here - see the /host/events/:eventId routes in index.js.
// Logged out -> /login. Sign-up unfinished -> /complete-profile.
export function RequireBracketHost() {
    const { status, defaultProfile } = useCurrentUser();
    const location = useLocation();

    if (status === 'loading') return null;

    if (status === 'anonymous') {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    if (status === 'incomplete') {
        return <Navigate to="/complete-profile" replace />;
    }
    if (!canHostBrackets(defaultProfile)) {
        return <Navigate to={defaultProfile ? profileUrl(defaultProfile) : '/settings/profile'} replace />;
    }
    return <Outlet />;
}
