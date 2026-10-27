import { useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { FormTextInput } from "components/FormTextInput/FormTextInput";
import { FormDataCheck } from "components/FormDataCheck/FormDataCheck";
import { useAuth, useUsernameAvailability } from "hooks";

export const UserInfoStep = () => {
    const { user } = useAuth();
    const { setValue, getValues } = useFormContext();
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
    const usernameTaken = useUsernameAvailability(username, () => {
        const path = getValues("signup_path") ?? [];
        return { isPlayer: path.includes("player"), isHost: path.includes("host") };
    });

    const checkEmailInUse = async (value) => {
        if (!value) {
            setEmailTaken("");
            return;
        }

        // const result = await FormDataCheck({ // NOTE: this needs to be updated to supabase interaction, this is on the sunset mongodb interaction
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
