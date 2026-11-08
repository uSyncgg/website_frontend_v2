import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "hooks/UseAuth/useAuth";

export function RequireCompleteProfile() {
    const { isLoggedIn, profileComplete, loading } = useAuth();
    const location = useLocation();

    // The same dark background as the pages, so there's no white flash while the session is checked.
    if (loading) return <div className="standardContainer" aria-busy="true" />;

    if (!isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    // if (!profileComplete) {
    //     return <Navigate to="/complete-profile" replace />;
    // }
    return <Outlet />;
}
