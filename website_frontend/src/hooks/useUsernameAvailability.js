import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { isRateLimited, RATE_LIMIT_MESSAGE } from "utils/apiError";
import { checkUsername } from "services/user";

const USERNAME_CHECK_DEBOUNCE_MS = 300;

// Live availability check for a username field of the surrounding form. Used by sign-up,
// adding a profile and the settings username change.
// - type: the profile type ('player' | 'host' | 'venue' | 'org'). A name only clashes within its type.
// - field: the form field to put errors on.
// - skip(value) returns true for values that shouldn't be checked (e.g. the profile's current name).
// Returns the value that was found taken ("" when it's free), for FormTextInput's `taken` prop.
export function useUsernameAvailability(username, type, { field = "username", skip = () => false } = {}) {
    const { setError, clearErrors } = useFormContext();
    const [usernameTaken, setUsernameTaken] = useState("");

    // Check once the user stops typing rather than on every keystroke, which keeps them
    // well under the backend's rate limit. Each keystroke cancels the pending check,
    // and a response for an older value is ignored.
    useEffect(() => {
        let stale = false;
        const timer = setTimeout(
            () => checkAvailability(username, () => stale),
            USERNAME_CHECK_DEBOUNCE_MS
        );
        return () => {
            stale = true;
            clearTimeout(timer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username, type]);

    const checkAvailability = async (value, isStale) => {
        if (!value || !type || skip(value)) {
            setUsernameTaken("");
            return;
        }

        try {
            await checkUsername(value, type);
            if (isStale()) return;
            setUsernameTaken("");
            clearErrors(field);
        } catch (err) {
            if (isStale()) return;
            if (isRateLimited(err)) {
                setUsernameTaken("");
                setError(field, { type: "server", message: RATE_LIMIT_MESSAGE });
            } else if (err.response?.status === 409) {
                setUsernameTaken(value);
            } else if (err.response?.status === 422) {
                setUsernameTaken("");
                const msg = err.response.data?.detail?.[0]?.msg;
                setError(field, { type: "validation", message: msg ?? "That username isn't valid." });
            } else {
                setUsernameTaken("");
            }
        }
    };

    return usernameTaken;
}
