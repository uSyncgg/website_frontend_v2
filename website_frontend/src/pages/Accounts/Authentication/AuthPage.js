import { SocialLoginButtons } from "components";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { signInWithPassword, signUp } from "services/authServices";
import styles from "./AuthPage.module.css";

// /login and /signup both render this page; `mode` picks the copy and the submit action.
const COPY = {
    login: {
        title: "Welcome back",
        subtitle: "Log in to track your stats, join brackets, and manage your events.",
        submit: "Log in",
        footPrompt: "New to uSync?",
        footAction: "Create an account",
        swapTo: "/signup",
    },
    signup: {
        title: "Create your uSync account",
        subtitle: "Set up your login first — we'll walk you through your profile right after.",
        submit: "Create account",
        footPrompt: "Already have an account?",
        footAction: "Log in",
        swapTo: "/login",
    },
};

const HIGHLIGHTS = [
    { icon: "◈", title: "One profile, every game", text: "Stats, teams, and match history in a single place." },
    { icon: "▲", title: "Join brackets faster", text: "Sign up once and enter any event on uSync." },
    { icon: "■", title: "Host your own events", text: "Run LANs, leagues, and tournaments from the same account." },
];

export const AuthPage = ({ mode }) => {
    const isSignup = mode === "signup";
    const copy = COPY[mode];
    const { register, handleSubmit, reset, getValues, formState: { errors, isSubmitting } } = useForm();
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    // Switching tabs keeps this component mounted, so clear anything left over from the other tab.
    useEffect(() => {
        reset();
        setMessage(null);
    }, [mode, reset]);

    const goTo = (path) => navigate(path, { replace: true });

    const onSubmit = async ({ email, password }) => {
        if (isSignup) {
            const { error } = await signUp(email, password);
            setMessage(error
                ? { type: "error", text: error.message }
                : { type: "success", text: "Check your email to confirm your account." });
            return;
        }

        const { error } = await signInWithPassword(email, password);
        if (error) return setMessage({ type: "error", text: error.message });
        // /complete-profile forwards users who already have a profile on to it.
        navigate("/complete-profile", { replace: true });
    };

    return (
        <div className={styles.page}>
            <div className={styles.auth}>
                <span className={styles.authGlow} aria-hidden="true" />

                <div className={styles.authBrand}>
                    <h2>The all-in-one hub for esports <span className={styles.accent}>LANs, leagues, and tournaments.</span></h2>
                    <ul className={styles.hl}>
                        {HIGHLIGHTS.map(({ icon, title, text }) => (
                            <li key={title}>
                                <span className={styles.hlIcon} aria-hidden="true">{icon}</span>
                                <span>
                                    <strong>{title}</strong>
                                    <span className={styles.hlText}>{text}</span>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={styles.authCard}>
                    <div className={styles.tabs} role="tablist" aria-label="Log in or sign up">
                        <button type="button" role="tab" aria-selected={!isSignup} onClick={() => goTo("/login")}>Log in</button>
                        <button type="button" role="tab" aria-selected={isSignup} onClick={() => goTo("/signup")}>Sign up</button>
                    </div>

                    <h1 className={styles.stepTitle}>{copy.title}</h1>
                    <p className={styles.stepSub}>{copy.subtitle}</p>

                    <SocialLoginButtons />

                    <div className={styles.divider}><i /><span>or use your email</span><i /></div>

                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className={styles.field}>
                            <label className={styles.label} htmlFor="auth-email">Email</label>
                            <input
                                {...register("email", { required: "Email is required." })}
                                id="auth-email"
                                className={styles.input}
                                type="email"
                                autoComplete="email"
                                placeholder="you@email.com"
                            />
                            {errors.email && <span className={styles.fieldError}>{errors.email.message}</span>}
                        </div>
                        <div className={styles.field}>
                            <label className={styles.label} htmlFor="auth-pass">Password</label>
                            <input
                                {...register("password", {
                                    required: "Password is required.",
                                    ...(isSignup && { minLength: { value: 8, message: "Password must be at least 8 characters." } }),
                                })}
                                id="auth-pass"
                                className={styles.input}
                                type="password"
                                autoComplete={isSignup ? "new-password" : "current-password"}
                                placeholder="••••••••"
                            />
                            {errors.password && <span className={styles.fieldError}>{errors.password.message}</span>}
                        </div>

                        {!isSignup && (
                            <div className={styles.optRow}>
                                <button
                                    type="button"
                                    className={styles.linkish}
                                    onClick={() => navigate("/forgot-password", { state: { email: getValues("email") } })}
                                >
                                    Forgot password?
                                </button>
                            </div>
                        )}

                        <button type="submit" className={styles.btnPrimary} disabled={isSubmitting}>{copy.submit}</button>
                    </form>

                    {message && (
                        <p className={message.type === "error" ? styles.msgError : styles.msgSuccess} role="status">{message.text}</p>
                    )}

                    {isSignup && (
                        <p className={styles.legal}>By creating an account you agree to uSync's Terms of Service and Privacy Policy.</p>
                    )}
                    <p className={styles.footnote}>
                        {copy.footPrompt} <button type="button" onClick={() => goTo(copy.swapTo)}>{copy.footAction}</button>
                    </p>
                </div>
            </div>
        </div>
    );
};
