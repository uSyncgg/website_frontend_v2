import { useCallback, useSyncExternalStore } from "react";
import { useNavigate } from "react-router";
import { useCurrentUser } from "hooks/UseAuth/CurrentUserContext";
import { canHostBrackets } from "utils/profiles";

// "Post Your Event" (navbar, footer and the old /more/eventhost links) opens the event form for
// a host. Anyone who can't post yet gets a notice at the top of the page saying what to do
// instead. The notice is shared state so the navbar can show it whichever link was used.

let notice = null;
const listeners = new Set();
const setNotice = (next) => {
    notice = next;
    listeners.forEach(fn => fn());
};
const subscribe = (fn) => {
    listeners.add(fn);
    return () => listeners.delete(fn);
};

// null, or why they can't post: 'signed_out' | 'no_host' | 'hosting_off'.
export const useHostNotice = () => useSyncExternalStore(subscribe, () => notice, () => null);
export const dismissHostNotice = () => setNotice(null);

/**
 * Returns postEvent(): goes to the event form as the account's host profile (switching the
 * "Viewing as" view to it first if needed), or shows the notice and returns false.
 */
export const usePostYourEvent = () => {
    const { status, profiles, defaultProfile, switchProfile } = useCurrentUser();
    const navigate = useNavigate();

    return useCallback(async ({ replace = false } = {}) => {
        const host = profiles.find(p => p.type === 'host');
        const blocked = status !== 'complete' ? 'signed_out'
            : !host ? 'no_host'
            : !canHostBrackets(host) ? 'hosting_off'
            : null;
        if (blocked) {
            setNotice(blocked);
            return false;
        }

        setNotice(null);
        if (defaultProfile?.public_id !== host.public_id) {
            await switchProfile('host');
        }
        navigate('/host/events/new', { replace });
        return true;
    }, [status, profiles, defaultProfile, switchProfile, navigate]);
};
