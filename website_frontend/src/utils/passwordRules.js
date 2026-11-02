// Client-side copy of the password policy in Supabase (Authentication → Policies).
// It only drives the live checklist; Supabase makes the final call, and friendlyAuthError
// reports what Supabase actually rejected, so a drift here can't hide the real reason.
// Supabase's "symbols" set: !@#$%^&*()_+-=[]{};'\:"|<>?,./`~
const SYMBOL = /[!@#$%^&*()_+\-=[\]{};'\\:"|<>?,./`~]/;

export const PASSWORD_RULES = [
    { label: "At least 8 characters", test: (p) => p.length >= 8 },
    { label: "An uppercase letter (A–Z)", test: (p) => /[A-Z]/.test(p) },
    { label: "A lowercase letter (a–z)", test: (p) => /[a-z]/.test(p) },
    { label: "A number (0–9)", test: (p) => /[0-9]/.test(p) },
    { label: "A special character (like ! @ # $ %)", test: (p) => SYMBOL.test(p) },
];

const REQUIREMENTS_UNMET = "Your password doesn't meet all the requirements above.";

// react-hook-form validate rule for new passwords.
export const validatePassword = (value = "") =>
    PASSWORD_RULES.every(rule => rule.test(value)) || REQUIREMENTS_UNMET;

// Supabase's weak_password message lists every allowed character, so swap it for something readable.
// error.reasons comes from supabase-js (AuthWeakPasswordError): "length", "characters" and/or "pwned".
// Any other error (e.g. same_password) keeps Supabase's own message.
export const friendlyAuthError = (error) => {
    if (error.code !== "weak_password") return error.message;
    const reasons = error.reasons ?? [];
    if (reasons.includes("pwned")) {
        return "This password has appeared in a known data breach. Please choose a different one.";
    }
    if (reasons.includes("length") || reasons.includes("characters")) return REQUIREMENTS_UNMET;
    return error.message;
};
