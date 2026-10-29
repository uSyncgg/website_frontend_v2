import { supabase } from "./supabaseClient";

// Where a login/sign-up lands when the user didn't come from somewhere specific.
// /complete-profile forwards users who already have a profile on to it.
export const DEFAULT_AUTH_PATH = "/complete-profile";

// `returnTo` is a same-site path (see getReturnPath) to land on after the email link or provider round trip.
export function signUp(email, password, returnTo = DEFAULT_AUTH_PATH) {
    return supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${window.location.origin}${returnTo}`
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

export function signInWithProvider(provider, returnTo = DEFAULT_AUTH_PATH) {
    return supabase.auth.signInWithOAuth({ provider, options: {
        redirectTo: `${window.location.origin}${returnTo}`
    } });
}

// Turns the `from` location that links pass to /login and /signup into a path to return to,
// or null. Only same-site paths are allowed, so the link can't send users to another site.
// The hash is dropped because the provider redirect puts the session in it.
export function getReturnPath(from) {
    const path = from?.pathname ? `${from.pathname}${from.search ?? ""}` : null;
    return path?.startsWith("/") && !path.startsWith("//") ? path : null;
}
