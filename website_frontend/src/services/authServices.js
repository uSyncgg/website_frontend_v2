import { supabase } from "./supabaseClient";

export function signUp(email, password) {
    return supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${window.location.origin}/complete-profile` 
        }
    })
}

export function signInWithPassword(email, password) {
    return supabase.auth.signInWithPassword({ email, password });
}

export function signInWithProvider(provider) {
    return supabase.auth.signInWithOAuth({ provider, options: {
        redirectTo: `${window.location.origin}/complete-profile`
    } });
}
