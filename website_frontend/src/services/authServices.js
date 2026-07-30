import { supabase } from "./supabaseClient";

export function signUp(email, password) {
    return supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `https://usync.gg/wz` // Change to configure profile form 
        }
    })
}

export function signInWithPassword(email, password) {
    return supabase.auth.signInWithPassword({ email, password });
}

export function signInWithProvider(provider) {
    return supabase.auth.signInWithOAuth({ provider });
}
