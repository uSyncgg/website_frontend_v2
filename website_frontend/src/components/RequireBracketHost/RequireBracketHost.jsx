import { Navigate, Outlet, useLocation } from "react-router";
import { useCurrentUser } from "hooks";

// MOCKUP PREVIEW: on a localhost dev build anyone (even logged out) can open the
// host pages so the flow can be reviewed. Production builds ignore this.
const DEV_PREVIEW = process.env.NODE_ENV === 'development';

// TODO(bracket auth): confirm /users/me returns bracket_hosting (it's saved on
// the users table at sign-up / in profile settings) and enforce it on the API too.
const canHostBrackets = (profile) => profile?.bracket_hosting === true;

// Host tools: only accounts that turned on bracket hosting in their setup.
// Logged out -> /login. Logged in without it -> profile settings to turn it on.
export function RequireBracketHost() {
    const { status, profile } = useCurrentUser();
    const location = useLocation();

    if (DEV_PREVIEW) return <Outlet />;
    if (status === 'loading') return null;

    if (status === 'anonymous') {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    if (status === 'incomplete') {
        return <Navigate to="/complete-profile" replace />;
    }
    if (!canHostBrackets(profile)) {
        return <Navigate to="/settings/profile" replace />;
    }
    return <Outlet />;
}
