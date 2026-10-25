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

// Supabase only emails addresses that belong to a user, but reports success either way.
export function sendPasswordReset(email) {
    return supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
    });
}

// The reset link signs the user in with a recovery session, which is what authorizes this.
export function updatePassword(password) {
    return supabase.auth.updateUser({ password });
}

export function signInWithProvider(provider) {
    return supabase.auth.signInWithOAuth({ provider, options: {
        redirectTo: `${window.location.origin}/complete-profile`
    } });
}
