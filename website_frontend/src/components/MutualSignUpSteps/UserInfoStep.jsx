import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { FormTextInput } from "components/FormTextInput/FormTextInput";
import { FormDataCheck } from "components/FormDataCheck/FormDataCheck";
import { useAuth } from "hooks";
import { isRateLimited, RATE_LIMIT_MESSAGE } from "utils/apiError";
import { checkUsername } from "services/user";

const USERNAME_CHECK_DEBOUNCE_MS = 300;

export const UserInfoStep = () => {
    const { user } = useAuth();
    const { setValue, getValues, setError, clearErrors } = useFormContext();
    const [usernameTaken, setUsernameTaken] = useState("");
    const [emailTaken, setEmailTaken] = useState("");

    const prefillEmail =
        user?.email ??
        user?.user_metadata?.email ??
        user?.identities?.find(i => i.identity_data?.email)?.identity_data?.email ??
        "";

    useEffect(() => {
        if (prefillEmail) {
            setValue("email", prefillEmail);
        }
    }, [prefillEmail, setValue]);

    const username = useWatch({ name: "username" });

    // Check availability once the user stops typing rather than on every keystroke,
    // which keeps them well under the backend's rate limit. Each keystroke cancels
    // the pending check, and a response for an older value is ignored.
    useEffect(() => {
        let stale = false;
        const timer = setTimeout(
            () => checkUsernameAvailability(username, () => stale),
            USERNAME_CHECK_DEBOUNCE_MS
        );
        return () => {
            stale = true;
            clearTimeout(timer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [username]);

    const checkUsernameAvailability = async (value, isStale = () => false) => {
        const path = getValues("signup_path") ?? [];
        const player = path.includes("player");
        const host = path.includes("host");

        if (!value) {
            setUsernameTaken("");
            return;
        }

        try {
            await checkUsername(value, { isPlayer: player, isHost: host });
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

        // const result = await FormDataCheck({ // NOTE: this needs to be updated to supabase interaction, this is on the sunset mongodb interaction
        //     endpoint: "review/username-availability",
        //     formData: { username: value },
        //     collectionName: "accounts",
        // });

        // setUsernameTaken(result.success ? "" : value);
    };

    const checkEmailInUse = async (value) => {
        if (!value) {
            setEmailTaken("");
            return;
        }

        // const result = await FormDataCheck({ // Same note as above
        //     endpoint: "review/email-availability",
        //     formData: { email: value },
        //     collectionName: "accounts",
        // });

        // setEmailTaken(result.success ? "" : value);
    };

    return (
        <div>
            <FormTextInput
                id={"username"}
                required={true}
                name={"username"}
                label={"Enter your username"}
                placeholder={"uSync"}
                disabled={false}
                inputClassName={""}
                errorClassName={""}
                labelClassName={""}
                taken={usernameTaken}
            />

            <FormTextInput
                id={"email"}
                required={true}
                name={"email"}
                label={"Enter your email"}
                placeholder={"contact@usync.gg"}
                disabled={!!prefillEmail}
                inputClassName={""}
                errorClassName={""}
                labelClassName={""}
                taken={emailTaken}
                onFieldBlur={checkEmailInUse}
            />

        </div>
    )
}
