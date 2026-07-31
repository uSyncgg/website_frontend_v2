import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "hooks/UseAuth/useAuth";

export function RequireCompleteProfile() {
    const { isLoggedIn, profileComplete, loading } = useAuth();
    const location = useLocation();

    if (loading) return null; 

    if (!isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    if (!profileComplete) {
        return <Navigate to="/complete-profile" replace />;
    }
    return <Outlet />;
}
