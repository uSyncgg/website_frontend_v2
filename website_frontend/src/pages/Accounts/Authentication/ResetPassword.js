import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "hooks";
import { updatePassword } from "services/authServices";
import styles from "./AuthPage.module.css";

// An expired or already-used reset link lands here with error params instead of a session.
const linkHasError = () => {
    const params = new URLSearchParams(window.location.hash.slice(1) || window.location.search);
    return params.has("error") || params.has("error_code");
};

export const ResetPassword = () => {
    const { session, loading } = useAuth();
    const navigate = useNavigate();
    const [linkError] = useState(linkHasError);
    const { register, handleSubmit, getValues, formState: { errors, isSubmitting } } = useForm();
    const [message, setMessage] = useState(null);

    const onSubmit = async ({ password }) => {
        const { error } = await updatePassword(password);
        if (error) return setMessage({ type: "error", text: error.message });
        // /complete-profile forwards users who already have a profile on to it.
        navigate("/complete-profile", { replace: true });
    };

    // Any signed-in session can change the password, so the form doesn't wait for the PASSWORD_RECOVERY event.
    const canReset = !linkError && !!session;

    return (
        <div className={styles.page}>
            <div className={styles.auth}>
                <div className={styles.authCard}>
                    {loading ? null : canReset ? (
                        <>
                            <h1 className={styles.stepTitle}>Set a new password</h1>
                            <p className={styles.stepSub}>Choose a new password for your uSync account.</p>

                            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                <div className={styles.field}>
                                    <label className={styles.label} htmlFor="reset-pass">New password</label>
                                    <input
                                        {...register("password", {
                                            required: "Password is required.",
                                            minLength: { value: 8, message: "Password must be at least 8 characters." },
                                        })}
                                        id="reset-pass"
                                        className={styles.input}
                                        type="password"
                                        autoComplete="new-password"
                                        placeholder="••••••••"
                                    />
                                    {errors.password && <span className={styles.fieldError}>{errors.password.message}</span>}
                                </div>
                                <div className={styles.field}>
                                    <label className={styles.label} htmlFor="reset-confirm">Confirm password</label>
                                    <input
                                        {...register("confirm", {
                                            required: "Please confirm your password.",
                                            validate: (value) => value === getValues("password") || "Passwords don't match.",
                                        })}
                                        id="reset-confirm"
                                        className={styles.input}
                                        type="password"
                                        autoComplete="new-password"
                                        placeholder="••••••••"
                                    />
                                    {errors.confirm && <span className={styles.fieldError}>{errors.confirm.message}</span>}
                                </div>

                                <button type="submit" className={styles.btnPrimary} disabled={isSubmitting}>Update password</button>
                            </form>

                            {message && (
                                <p className={message.type === "error" ? styles.msgError : styles.msgSuccess} role="status">{message.text}</p>
                            )}
                        </>
                    ) : (
                        <>
                            <h1 className={styles.stepTitle}>Link invalid or expired</h1>
                            <p className={styles.stepSub}>This reset link is invalid or has expired. Request a new one to reset your password.</p>
                            <button type="button" className={styles.btnPrimary} onClick={() => navigate("/forgot-password", { replace: true })}>
                                Request a new link
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
