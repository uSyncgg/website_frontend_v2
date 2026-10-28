// Remembers where to send someone after they log in or sign up (e.g. back to
// the claim form). Stored in localStorage so it survives social-login redirects
// and opening the email-confirmation link; it expires after an hour.
const KEY = 'usync.returnTo';
const MAX_AGE_MS = 60 * 60 * 1000;

export const setReturnTo = (path) => {
    try {
        localStorage.setItem(KEY, JSON.stringify({ path, at: Date.now() }));
    } catch {
        // storage blocked - they'll land on their profile as usual
    }
};

const read = () => {
    try {
        const saved = JSON.parse(localStorage.getItem(KEY));
        // Only same-site paths, and only recent ones.
        if (saved?.path?.startsWith('/') && !saved.path.startsWith('//') && Date.now() - saved.at < MAX_AGE_MS) return saved.path;
    } catch {
        // missing or unreadable
    }
    return null;
};

export const peekReturnTo = read;

// Reads and clears it, so it's only used once.
export const takeReturnTo = () => {
    const path = read();
    try {
        localStorage.removeItem(KEY);
    } catch {
        // ignore
    }
    return path;
};
