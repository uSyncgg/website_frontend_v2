import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router";
import { useAuth, useCurrentUser } from "hooks";
import { LoadingWheel } from "components/LoadingWheel/LoadingWheel";
import { checkAdminAccess } from "services/adminAccess";

const Message = ({ title, text }) => (
    <div className="standardContainer" style={{ textAlign: 'center', padding: '6rem 1.5rem', minHeight: '60vh' }}>
        <title>uSync | Admin</title>
        <meta name="robots" content="noindex, nofollow" />
        <h1>{title}</h1>
        <p>{text}</p>
        <Link to="/">Go to the home page</Link>
    </div>
);

const NoAccess = () => <Message title="No access" text="You don't have access to this page." />;

// Admin-only routes. The backend decides who is an admin; this only picks what to show, and
// doesn't load the dashboard until the backend says yes. Runs once per signed-in user, so a
// token refresh doesn't reload the page.
export function RequireAdmin() {
    const { status } = useCurrentUser();
    const { session } = useAuth();
    const userId = session?.user?.id;
    const [access, setAccess] = useState('checking');

    useEffect(() => {
        if (!userId) return;
        let cancelled = false;
        setAccess('checking');
        checkAdminAccess()
            .then(() => { if (!cancelled) setAccess('allowed'); })
            .catch(err => {
                if (cancelled) return;
                setAccess([401, 403].includes(err.response?.status) ? 'denied' : 'error');
            });
        return () => { cancelled = true; };
    }, [userId]);

    if (status === 'loading') return <LoadingWheel />;
    if (status === 'anonymous') return <NoAccess />;
    if (access === 'checking') return <LoadingWheel />;
    if (access === 'denied') return <NoAccess />;
    if (access === 'error') return <Message title="Something went wrong" text="We couldn't check your access. Please try again." />;
    return <Outlet />;
}
