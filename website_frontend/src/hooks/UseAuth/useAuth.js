import { useEffect, useState } from "react";
import { supabase } from "services/supabaseClient";

export function useAuth() {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => setSession(session)
        );

        return () => subscription.unsubscribe();
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
