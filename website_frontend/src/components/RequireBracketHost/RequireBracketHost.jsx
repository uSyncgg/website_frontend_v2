import { Navigate, Outlet, useLocation } from "react-router";
import { useCurrentUser } from "hooks";
import { canHostBrackets } from "utils/profiles";

// MOCKUP PREVIEW: on a localhost dev build anyone (even logged out) can open the
// host pages so the flow can be reviewed. Production builds ignore this.
const DEV_PREVIEW = process.env.NODE_ENV === 'development';

// Host tools: accounts with a host or venue profile that has bracket hosting turned on
// (/users/me lists bracket_hosting on each profile; the API enforces the same rule).
// Logged out -> /login. Logged in without it -> profile settings to turn it on.
export function RequireBracketHost() {
    const { status, profiles } = useCurrentUser();
    const location = useLocation();

    if (DEV_PREVIEW) return <Outlet />;
    if (status === 'loading') return null;

    if (status === 'anonymous') {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    if (status === 'incomplete') {
        return <Navigate to="/complete-profile" replace />;
    }
    if (!profiles.some(canHostBrackets)) {
        return <Navigate to="/settings/profile" replace />;
    }
    return <Outlet />;
}
