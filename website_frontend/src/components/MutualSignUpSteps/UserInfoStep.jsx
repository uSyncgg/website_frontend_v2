import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormTextInput } from "components/FormTextInput/FormTextInput";
import { FormDataCheck } from "components/FormDataCheck/FormDataCheck";
import { useAuth } from "hooks";
import { checkUsername } from "services/user";

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

    const checkUsernameAvailability = async (value) => {
        const path = getValues("signup_path") ?? [];
        const player = path.includes("player");
        const host = path.includes("host");

        if (!value) {
            setUsernameTaken("");
            return;
        }

        try {
            await checkUsername(value, { isPlayer: player, isHost: host });
            setUsernameTaken("");
            clearErrors("username");
        } catch (err) {
            if (err.response?.status === 409) {
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
                onFieldBlur={checkUsernameAvailability}
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
