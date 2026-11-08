import { useEffect, useState } from "react";
import { supabase } from "services/supabaseClient";

// The last session this tab saw. Every page that calls useAuth starts from it, so moving between
// signed-in pages never shows a blank "loading" screen; getSession still re-checks every time.
let known = { loaded: false, session: null };

// Forgets the remembered session (tests start each case from a fresh tab).
export const resetAuthMemory = () => { known = { loaded: false, session: null }; };

export function useAuth() {
    const [session, setSession] = useState(known.session);
    const [loading, setLoading] = useState(!known.loaded);

    useEffect(() => {
        let mounted = true;
        supabase.auth.getSession().then(({ data: { session } }) => {
            known = { loaded: true, session };
            if (!mounted) return;
            setSession(session);
            setLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                known = { loaded: true, session };
                if (mounted) setSession(session);
            }
        );

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, []);

    const profileComplete = session?.user?.app_metadata?.profile_complete === true;

    return { 
        session, 
        user: session?.user ?? null, 
        isLoggedIn: !!session, 
        profileComplete,
        loading
    };
}
