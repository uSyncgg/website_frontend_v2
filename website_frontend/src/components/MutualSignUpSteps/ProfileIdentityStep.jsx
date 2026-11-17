import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { FormTextInput } from "components/FormTextInput/FormTextInput";
import { SelectableFormBlock } from "components/SelectableFormBlock/SelectableFormBlock";
import { useAuth, useUsernameAvailability } from "hooks";
import { PROFILE_LABELS, usernameField } from "utils/profiles";
import styles from "./ProfileIdentityStep.module.css";

// One username input, checked live against other profiles of the same type.
const UsernameInput = ({ type, label, placeholder = "uSync" }) => {
    const field = usernameField(type);
    const username = useWatch({ name: field });
    const usernameTaken = useUsernameAvailability(username, type, { field });

    return (
        <FormTextInput
            id={field}
            required={true}
            name={field}
            label={label}
            placeholder={placeholder}
            disabled={false}
            inputClassName={""}
            errorClassName={""}
            labelClassName={""}
            taken={usernameTaken}
        />
    );
};

// Sign-up and add-a-profile: a username for each profile being created. On sign-up it also
// shows the account email and, with more than one profile, which one is the default.
export const ProfileIdentityStep = ({ types, isSignUp }) => {
    const { user } = useAuth();
    const { setValue } = useFormContext();
    const defaultProfile = useWatch({ name: "default_profile" });
    const typesKey = types.join(',');

    const prefillEmail =
        user?.email ??
        user?.user_metadata?.email ??
        user?.identities?.find(i => i.identity_data?.email)?.identity_data?.email ??
        "";

    useEffect(() => {
        if (isSignUp && prefillEmail) {
            setValue("email", prefillEmail);
        }
    }, [isSignUp, prefillEmail, setValue]);

    // Keep the default pointing at a profile that's actually being created (the picked types
    // can change on Get Started after a default was chosen).
    useEffect(() => {
        if (isSignUp && !types.includes(defaultProfile)) {
            setValue("default_profile", types[0]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSignUp, typesKey, defaultProfile]);

    return (
        <div>
            {types.map(type => (
                <UsernameInput
                    key={type}
                    type={type}
                    // An org's username is its organization name, the only time it's asked.
                    label={type === 'org' ? "Organization name" : types.length > 1 ? `${PROFILE_LABELS[type]} username` : "Enter your username"}
                    placeholder={type === 'org' ? "e.g. Static Gaming" : "uSync"}
                />
            ))}

            {isSignUp &&
                <FormTextInput
                    id={"email"}
                    required={true}
                    name={"email"}
                    label={"Your email"}
                    placeholder={"contact@usync.gg"}
                    disabled={!!prefillEmail}
                    inputClassName={""}
                    errorClassName={""}
                    labelClassName={""}
                />
            }

            {isSignUp && types.length > 1 &&
                <div className={styles.section}>
                    <p className={styles.sectionLabel}>Which profile should show by default?</p>
                    <div className={styles.tileRow} role="radiogroup" aria-label="Default profile">
                        {types.map(type => (
                            <SelectableFormBlock
                                key={type}
                                title={PROFILE_LABELS[type]}
                                selected={defaultProfile === type}
                                onToggle={() => setValue("default_profile", type)}
                                blockClassName={styles.tile}
                                selectedClassName={styles.tileSelected}
                            />
                        ))}
                    </div>
                    <p className={styles.hint}>It's the one in the navbar. You can switch any time.</p>
                </div>
            }
        </div>
    );
};
