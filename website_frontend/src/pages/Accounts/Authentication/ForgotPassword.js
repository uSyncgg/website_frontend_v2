import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { sendPasswordReset } from "services/authServices";
import styles from "./AuthPage.module.css";

// Supabase rejects a second reset email to the same address within 60 seconds.
const RESEND_COOLDOWN_SECONDS = 60;

export const ForgotPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        defaultValues: { email: location.state?.email ?? "" },
    });
    const [message, setMessage] = useState(null);
    const [cooldown, setCooldown] = useState(0);

    useEffect(() => {
        if (cooldown <= 0) return;
        const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
        return () => clearTimeout(timer);
    }, [cooldown]);

    const onSubmit = async ({ email }) => {
        const { error } = await sendPasswordReset(email);
        if (error) return setMessage({ type: "error", text: error.message });
        // Same message whether or not the account exists, so the form can't be used to look up emails.
        setMessage({ type: "success", text: "If an account exists for that email, we've sent a reset link." });
        setCooldown(RESEND_COOLDOWN_SECONDS);
    };

    return (
        <div className={styles.page}>
            <div className={styles.auth}>
                <div className={styles.authCard}>
                    <h1 className={styles.stepTitle}>Reset your password</h1>
                    <p className={styles.stepSub}>Enter your account email and we'll send you a link to set a new password.</p>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className={styles.field}>
                            <label className={styles.label} htmlFor="forgot-email">Email</label>
                            <input
                                {...register("email", { required: "Email is required." })}
                                id="forgot-email"
                                className={styles.input}
                                type="email"
                                autoComplete="email"
                                placeholder="you@email.com"
                            />
                            {errors.email && <span className={styles.fieldError}>{errors.email.message}</span>}
                        </div>

                        <button type="submit" className={styles.btnPrimary} disabled={isSubmitting || cooldown > 0}>
                            {cooldown > 0 ? `Resend in ${cooldown}s` : "Send reset link"}
                        </button>
                    </form>

                    {message && (
                        <p className={message.type === "error" ? styles.msgError : styles.msgSuccess} role="status">{message.text}</p>
                    )}

                    <p className={styles.footnote}>
                        Remembered it? <button type="button" onClick={() => navigate("/login", { replace: true })}>Back to log in</button>
                    </p>
                </div>
            </div>
        </div>
    );
};
