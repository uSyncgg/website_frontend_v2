import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { isRateLimited, RATE_LIMIT_MESSAGE } from "utils/apiError";
import { checkUsername } from "services/user";

const USERNAME_CHECK_DEBOUNCE_MS = 300;

// Live availability check for the `username` field of the surrounding form. Used by
// sign-up and by the settings username change.
// - getRoles() returns { isPlayer, isHost }, read at check time since a name only clashes within a role.
// - skip(value) returns true for values that shouldn't be checked (e.g. the user's current name).
// Returns the value that was found taken ("" when it's free), for FormTextInput's `taken` prop.
export function useUsernameAvailability(username, getRoles, skip = () => false) {
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
    }, [username]);

    const checkAvailability = async (value, isStale) => {
        if (!value || skip(value)) {
            setUsernameTaken("");
            return;
        }

        try {
            await checkUsername(value, getRoles());
            if (isStale()) return;
            setUsernameTaken("");
            clearErrors("username");
        } catch (err) {
            if (isStale()) return;
            if (isRateLimited(err)) {
                setUsernameTaken("");
                setError("username", { type: "server", message: RATE_LIMIT_MESSAGE });
            } else if (err.response?.status === 409) {
                setUsernameTaken(value);
            } else if (err.response?.status === 422) {
                setUsernameTaken("");
                const msg = err.response.data?.detail?.[0]?.msg;
                setError("username", { type: "validation", message: msg ?? "That username isn't valid." });
            } else {
                setUsernameTaken("");
            }
        }
    };

    return usernameTaken;
}
