import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { FormTextInput } from "components/FormTextInput/FormTextInput";
import { FormButton } from "components/FormButton/FormButton";
import { useAuth, useCurrentUser, useUsernameAvailability } from "hooks";
import { getApiErrorMessage } from "utils/apiError";
import { changeUsername, deleteAccount } from "services/user";
import styles from "./AccountSettingsStep.module.css";

// Rough client-side match for the backend's canonical form, only used to skip
// checking the user's own name (the backend does the real comparison).
const sameName = (a, b) => a.trim().toLowerCase() === b.trim().toLowerCase();

// Last step of profile settings: read-only email, username change, and account deletion.
// savedUsername is the username currently stored on the backend.
export const AccountSettingsStep = ({ savedUsername, isPlayer, isHost, onUsernameSaved }) => {
    const { user, session } = useAuth();
    const { refresh, logout } = useCurrentUser();
    const { trigger, setError, formState: { errors } } = useFormContext();
    const token = session?.access_token;

    const username = useWatch({ name: "username" }) ?? "";
    const usernameTaken = useUsernameAvailability(
        username,
        () => ({ isPlayer, isHost }),
        (value) => sameName(value, savedUsername)
    );
    const [savingUsername, setSavingUsername] = useState(false);
    const [usernameMessage, setUsernameMessage] = useState("");

    const [confirmText, setConfirmText] = useState("");
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState("");

    const usernameChanged = username.trim() !== "" && username.trim() !== savedUsername;
    const canSaveUsername = usernameChanged && !usernameTaken && !errors.username && !savingUsername;

    const handleSaveUsername = async () => {
        setUsernameMessage("");
        if (!(await trigger("username"))) return;

        setSavingUsername(true);
        try {
            const me = await changeUsername(username.trim(), token);
            onUsernameSaved(me.username);
            setUsernameMessage("Username updated.");
            // Updates the navbar and profile link.
            await refresh();
        } catch (err) {
            const message = err.response?.status === 409
                ? `${username.trim()} is already taken.`
                : getApiErrorMessage(err);
            setError("username", { type: "server", message });
        } finally {
            setSavingUsername(false);
        }
    };

    const handleDelete = async () => {
        setDeleteError("");
        setDeleting(true);
        try {
            await deleteAccount(token);
            // Signs out and hard-redirects home, so nothing keeps the deleted user's state.
            await logout();
        } catch (err) {
            setDeleteError(getApiErrorMessage(err));
            setDeleting(false);
        }
    };

    return (
        <div>
            <section className={styles.section}>
                <span className={styles.label}>Email</span>
                <p className={styles.readOnly}>{user?.email ?? "-"}</p>
            </section>

            <section className={styles.section}>
                <FormTextInput
                    id={"username"}
                    required={true}
                    name={"username"}
                    label={"Username"}
                    placeholder={"uSync"}
                    disabled={savingUsername}
                    inputClassName={""}
                    errorClassName={""}
                    labelClassName={""}
                    taken={usernameTaken}
                />
                {usernameMessage && <span className={styles.success}>{usernameMessage}</span>}
                <FormButton
                    type="button"
                    onClick={handleSaveUsername}
                    disabled={!canSaveUsername}
                    label={savingUsername ? "Saving..." : "Change username"}
                    className={styles.btnPrimary}
                />
            </section>

            <section className={`${styles.section} ${styles.dangerZone}`}>
                <h3 className={styles.dangerTitle}>Delete account</h3>
                <p className={styles.dangerText}>
                    This permanently deletes your profile, stats and event registrations, and signs you out.
                    Events you host stay listed without your name. This can't be undone.
                </p>
                <label htmlFor="delete_confirm" className={styles.label}>
                    Type <strong>{savedUsername}</strong> to confirm
                </label>
                <input
                    id="delete_confirm"
                    className={styles.input}
                    value={confirmText}
                    onChange={(e) => setConfirmText(e.target.value)}
                    autoComplete="off"
                />
                {deleteError && <span className={styles.error}>{deleteError}</span>}
                <FormButton
                    type="button"
                    onClick={handleDelete}
                    disabled={confirmText !== savedUsername || deleting}
                    label={deleting ? "Deleting..." : "Delete my account"}
                    className={styles.btnDanger}
                />
            </section>
        </div>
    );
};
