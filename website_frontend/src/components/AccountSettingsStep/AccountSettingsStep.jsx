import { useState } from "react";
import { useNavigate } from "react-router";
import { useFormContext, useWatch } from "react-hook-form";
import { FormTextInput } from "components/FormTextInput/FormTextInput";
import { FormButton } from "components/FormButton/FormButton";
import { useAuth, useCurrentUser, useUsernameAvailability } from "hooks";
import { getApiErrorMessage } from "utils/apiError";
import { PROFILE_LABELS } from "utils/profiles";
import { changeUsername, deleteAccount } from "services/user";
import styles from "./AccountSettingsStep.module.css";

// Rough client-side match for the backend's canonical form, only used to skip
// checking the user's own name (the backend does the real comparison).
const sameName = (a, b) => a.trim().toLowerCase() === b.trim().toLowerCase();

// Last step of profile settings: read-only email, this profile's username, making it the
// default, deleting just this profile (only when the account has another one), and account
// deletion (which removes every profile).
// savedUsername is the username currently stored on the backend.
export const AccountSettingsStep = ({ type, savedUsername, isDefault, onUsernameSaved }) => {
    const { user, session } = useAuth();
    const { refresh, logout, switchProfile, removeProfile, profiles } = useCurrentUser();
    const navigate = useNavigate();
    const { trigger, setError, formState: { errors } } = useFormContext();
    const token = session?.access_token;

    const username = useWatch({ name: "username" }) ?? "";
    const usernameTaken = useUsernameAvailability(username, type, {
        skip: (value) => sameName(value, savedUsername),
    });
    const [savingUsername, setSavingUsername] = useState(false);
    const [usernameMessage, setUsernameMessage] = useState("");

    const [isDefaultNow, setIsDefaultNow] = useState(isDefault);
    const [defaultSaving, setDefaultSaving] = useState(false);
    const [defaultError, setDefaultError] = useState("");

    const [profileConfirmText, setProfileConfirmText] = useState("");
    const [deletingProfile, setDeletingProfile] = useState(false);
    const [deleteProfileError, setDeleteProfileError] = useState("");

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
            const saved = await changeUsername(type, username.trim(), token);
            onUsernameSaved(saved.username);
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

    const handleMakeDefault = async () => {
        setDefaultError("");
        setDefaultSaving(true);
        try {
            // Also updates the navbar.
            await switchProfile(type);
            setIsDefaultNow(true);
        } catch (err) {
            setDefaultError(getApiErrorMessage(err));
        } finally {
            setDefaultSaving(false);
        }
    };

    const handleDeleteProfile = async () => {
        setDeleteProfileError("");
        setDeletingProfile(true);
        try {
            // Updates the navbar, including the new default if this one was the default.
            await removeProfile(type);
            navigate("/settings/profile", { replace: true });
        } catch (err) {
            setDeleteProfileError(getApiErrorMessage(err));
            setDeletingProfile(false);
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

            {profiles.length > 1 &&
                <section className={styles.section}>
                    <span className={styles.label}>Default profile</span>
                    {isDefaultNow
                        ? <p className={styles.readOnly}>This is your default profile. It's the one the navbar shows.</p>
                        : <>
                            <p className={styles.readOnly}>The navbar shows your default profile.</p>
                            {defaultError && <span className={styles.error}>{defaultError}</span>}
                            <FormButton
                                type="button"
                                onClick={handleMakeDefault}
                                disabled={defaultSaving}
                                label={defaultSaving ? "Saving..." : "Make this my default"}
                                className={styles.btnPrimary}
                            />
                        </>
                    }
                </section>
            }

            {/* The only profile can't be deleted on its own (the backend 409s): delete the account instead. */}
            {profiles.length > 1 &&
                <section className={`${styles.section} ${styles.dangerZone}`}>
                    <h3 className={styles.dangerTitle}>Delete this {PROFILE_LABELS[type].toLowerCase()} profile</h3>
                    <p className={styles.dangerText}>
                        This permanently deletes this profile and everything on it. Your other profiles and your
                        account stay.{isDefaultNow && " Your oldest remaining profile becomes your default."} This
                        can't be undone.
                    </p>
                    <label htmlFor="delete_profile_confirm" className={styles.label}>
                        Type <strong>{savedUsername}</strong> to confirm
                    </label>
                    <input
                        id="delete_profile_confirm"
                        className={styles.input}
                        value={profileConfirmText}
                        onChange={(e) => setProfileConfirmText(e.target.value)}
                        autoComplete="off"
                    />
                    {deleteProfileError && <span className={styles.error}>{deleteProfileError}</span>}
                    <FormButton
                        type="button"
                        onClick={handleDeleteProfile}
                        disabled={profileConfirmText !== savedUsername || deletingProfile}
                        label={deletingProfile ? "Deleting..." : "Delete this profile"}
                        className={styles.btnDanger}
                    />
                </section>
            }

            <section className={`${styles.section} ${styles.dangerZone}`}>
                <h3 className={styles.dangerTitle}>Delete account</h3>
                <p className={styles.dangerText}>
                    This permanently deletes your whole account - every profile on it - along with your stats
                    and event registrations, and signs you out.
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
