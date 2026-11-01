import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { supabase } from "services/supabaseClient";
import { getMe, setDefaultProfile } from "services/user";
import { byProfileType } from "utils/profiles";
import { useAuth } from "./useAuth";

// status is one of:
// - 'loading'    auth session or profile lookup still in flight
// - 'anonymous'  not logged in
// - 'incomplete' logged in through Supabase, but sign-up isn't finished (/users/me 404s)
// - 'complete'   logged in with at least one profile
// - 'error'      logged in, but the lookup failed for another reason
//
// me is GET /users/me: { verified, default_profile, profiles }. Each profile is a summary
// ({ type, username, public_id, profile_picture }). defaultProfile is the one the navbar shows.
const CurrentUserContext = createContext(null);

export function CurrentUserProvider({ children }) {
    const { session, loading: authLoading } = useAuth();
    const [status, setStatus] = useState('loading');
    const [me, setMe] = useState(null);

    const userId = session?.user?.id;
    const token = session?.access_token;

    const refresh = useCallback(async () => {
        if (!token) return;
        try {
            setMe(await getMe(token));
            setStatus('complete');
        } catch (err) {
            setMe(null);
            // Only a 404 means "no profile yet" - anything else (network, 5xx) must not
            // tell an existing user to complete their profile.
            setStatus(err.response?.status === 404 ? 'incomplete' : 'error');
        }
    }, [token]);

    // Re-run the lookup only when the signed in user changes, not on every token refresh.
    useEffect(() => {
        if (authLoading) return;
        if (!userId) {
            setMe(null);
            setStatus('anonymous');
            return;
        }
        setStatus('loading');
        refresh();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authLoading, userId]);

    // Switches which profile the navbar shows. The response is the new /me, so no refetch.
    // Throws on failure so the caller can show the error.
    const switchProfile = useCallback(async (type) => {
        setMe(await setDefaultProfile(type, token));
    }, [token]);

    const logout = useCallback(async () => {
        await supabase.auth.signOut();
        // Hard reload so nothing on the page holds on to the old user's state.
        window.location.assign('/');
    }, []);

    const value = {
        status,
        me,
        defaultProfile: me?.default_profile ?? null,
        profiles: [...(me?.profiles ?? [])].sort(byProfileType),
        refresh,
        switchProfile,
        logout,
    };

    return (
        <CurrentUserContext.Provider value={value}>
            {children}
        </CurrentUserContext.Provider>
    );
}

export function useCurrentUser() {
    return useContext(CurrentUserContext);
}
