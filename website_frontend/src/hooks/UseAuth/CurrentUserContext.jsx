import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { supabase } from "services/supabaseClient";
import { getMe } from "services/user";
import { useAuth } from "./useAuth";

// status is one of:
// - 'loading'    auth session or profile lookup still in flight
// - 'anonymous'  not logged in
// - 'incomplete' logged in through Supabase, but no profile row yet (/users/me 404s)
// - 'complete'   logged in with a profile
// - 'error'      logged in, but the profile lookup failed for another reason
const CurrentUserContext = createContext(null);

export function CurrentUserProvider({ children }) {
    const { session, loading: authLoading } = useAuth();
    const [status, setStatus] = useState('loading');
    const [profile, setProfile] = useState(null);

    const userId = session?.user?.id;
    const token = session?.access_token;

    const refresh = useCallback(async () => {
        if (!token) return;
        try {
            setProfile(await getMe(token));
            setStatus('complete');
        } catch (err) {
            setProfile(null);
            // Only a 404 means "no profile yet" - anything else (network, 5xx) must not
            // tell an existing user to complete their profile.
            setStatus(err.response?.status === 404 ? 'incomplete' : 'error');
        }
    }, [token]);

    // Re-run the lookup only when the signed in user changes, not on every token refresh.
    useEffect(() => {
        if (authLoading) return;
        if (!userId) {
            setProfile(null);
            setStatus('anonymous');
            return;
        }
        setStatus('loading');
        refresh();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authLoading, userId]);

    const logout = useCallback(async () => {
        await supabase.auth.signOut();
        // Hard reload so nothing on the page holds on to the old user's state.
        window.location.assign('/');
    }, []);

    return (
        <CurrentUserContext.Provider value={{ status, profile, refresh, logout }}>
            {children}
        </CurrentUserContext.Provider>
    );
}

export function useCurrentUser() {
    return useContext(CurrentUserContext);
}
