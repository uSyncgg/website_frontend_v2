import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { SiGoogle, SiDiscord } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { FaArrowLeft, FaCalendarCheck, FaChartLine, FaEnvelope, FaTrophy } from "react-icons/fa";
import { SeoData, AccountField, PasswordField } from "components";
import shared from "../../../components/AccountUI/AccountUI.module.css";
import styles from "./Auth.module.css";

// This page is the auth gate, and nothing else. It is deliberately NOT part of
// the signup form: creating credentials and filling out a uSync profile are two
// separate entities. Anyone who signs up here is handed off to /account/setup
// (the multi-step form) afterwards, and anyone who logs in goes to their
// profile. Don't move profile questions onto this page — the whole point is
// that this screen stays identical for every login and every signup.
const PROVIDERS = [
    { id: 'google', label: 'Google', icon: SiGoogle, className: 'providerGoogle' },
    { id: 'discord', label: 'Discord', icon: SiDiscord, className: 'providerDiscord' },
    { id: 'x', label: 'X', icon: FaXTwitter, className: 'providerX' },
];

const HIGHLIGHTS = [
    { icon: FaChartLine, title: 'One profile, every game', text: 'Stats, teams, and match history in a single place.' },
    { icon: FaTrophy, title: 'Join brackets faster', text: 'Sign up once and enter any event on uSync.' },
    { icon: FaCalendarCheck, title: 'Host your own events', text: 'Run LANs, leagues, and tournaments from the same account.' },
];

const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export const Auth = ({ mode = "login" }) => {
    const navigate = useNavigate();
    const isSignup = mode === "signup";

    // "reset" is a sub-state of the login screen rather than its own route:
    // forgetting a password is part of logging in, not a separate destination.
    const [view, setView] = useState("form");
    const [form, setForm] = useState({ email: "", password: "", remember: true });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setView("form");
        setErrors({});
    }, [mode]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };

    // Mockup only: no provider handshake, no session. Signing up lands on the
    // profile setup form, logging in lands on the profile itself.
    const finish = () => navigate(isSignup ? '/account/setup' : '/account/profile');

    const handleSubmit = (e) => {
        e.preventDefault();
        const nextErrors = {};
        if (!form.email.trim()) nextErrors.email = "Enter your email.";
        else if (!isEmail(form.email)) nextErrors.email = "That doesn't look like an email address.";
        if (!form.password) nextErrors.password = "Enter your password.";
        else if (isSignup && form.password.length < 8) nextErrors.password = "Use at least 8 characters.";

        setErrors(nextErrors);
        if (Object.keys(nextErrors).length === 0) finish();
    };

    const handleReset = (e) => {
        e.preventDefault();
        if (!form.email.trim() || !isEmail(form.email)) {
            setErrors({ email: "Enter the email on your account." });
            return;
        }
        setErrors({});
        setView("resetSent");
    };

    const renderCardBody = () => {
        if (view === "reset" || view === "resetSent") {
            return (
                <>
                    <button type="button" className={shared.backButton} onClick={() => { setView("form"); setErrors({}); }}>
                        <FaArrowLeft /> Back to log in
                    </button>

                    {view === "reset" ? (
                        <>
                            <p className={shared.eyebrow}>Password reset</p>
                            <h1 className={shared.stepTitle}>Forgot your password?</h1>
                            <p className={shared.stepSubtitle}>Enter the email on your account and we'll send you a link to set a new one.</p>

                            <form onSubmit={handleReset}>
                                <AccountField
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="you@email.com"
                                    required
                                    error={errors.email}
                                    autoComplete="email"
                                />

                                <button type="submit" className={`${shared.primaryButton} ${styles.submitButton} ${styles.submitSpaced}`}>
                                    Send reset link
                                </button>
                            </form>
                        </>
                    ) : (
                        <>
                            <div className={styles.sentIcon}><FaEnvelope /></div>
                            <h1 className={shared.stepTitle}>Check your email</h1>
                            <p className={shared.stepSubtitle}>
                                If an account exists for <strong className={styles.sentEmail}>{form.email}</strong>, a reset link is on its way. The link expires in 30 minutes.
                            </p>

                            <button type="button" className={`${shared.primaryButton} ${styles.submitButton}`} onClick={() => setView("form")}>Back to log in</button>

                            <p className={shared.footNote}>
                                Didn't get it? <Link to="#" onClick={(e) => { e.preventDefault(); setView("reset"); }}>Try another email</Link>
                            </p>
                        </>
                    )}
                </>
            );
        }

        return (
            <>
                <div className={styles.tabRow} role="tablist">
                    <Link
                        to="/account/login"
                        role="tab"
                        aria-selected={!isSignup}
                        className={`${styles.tab} ${!isSignup ? styles.tabActive : ''}`}
                    >
                        Log in
                    </Link>
                    <Link
                        to="/account/signup"
                        role="tab"
                        aria-selected={isSignup}
                        className={`${styles.tab} ${isSignup ? styles.tabActive : ''}`}
                    >
                        Sign up
                    </Link>
                </div>

                <h1 className={shared.stepTitle}>{isSignup ? 'Create your uSync account' : 'Welcome back'}</h1>
                <p className={shared.stepSubtitle}>
                    {isSignup
                        ? "Set up your login first — we'll walk you through your profile right after."
                        : 'Log in to track your stats, join brackets, and manage your events.'}
                </p>

                <div className={styles.providerStack}>
                    {PROVIDERS.map(({ id, label, icon: Icon, className }) => (
                        <button
                            key={id}
                            type="button"
                            className={`${styles.providerButton} ${styles[className]}`}
                            onClick={finish}
                        >
                            <Icon />
                            <span>Continue with {label}</span>
                        </button>
                    ))}
                </div>

                <div className={`${shared.dividerRow} ${styles.divider}`}>
                    <span className={shared.dividerLine} />
                    <span className={shared.dividerLabel}>or use your email</span>
                    <span className={shared.dividerLine} />
                </div>

                <form onSubmit={handleSubmit}>
                    <AccountField
                        label="Email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@email.com"
                        required
                        error={errors.email}
                        autoComplete="email"
                    />

                    <div className={styles.fieldSpacer} />

                    <PasswordField
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        error={errors.password}
                        autoComplete={isSignup ? "new-password" : "current-password"}
                        showStrength={isSignup}
                    />

                    {!isSignup && (
                        <div className={styles.optionRow}>
                            <label className={styles.rememberLabel}>
                                <input type="checkbox" name="remember" checked={form.remember} onChange={handleChange} className={styles.checkbox} />
                                Keep me logged in
                            </label>

                            <button
                                type="button"
                                className={styles.linkButton}
                                onClick={() => { setView("reset"); setErrors({}); }}
                            >
                                Forgot password?
                            </button>
                        </div>
                    )}

                    <button
                        type="submit"
                        className={`${shared.primaryButton} ${styles.submitButton} ${isSignup ? styles.submitSpaced : ''}`}
                    >
                        {isSignup ? 'Create account' : 'Log in'}
                    </button>
                </form>

                {isSignup ? (
                    <>
                        <p className={styles.legal}>
                            By creating an account you agree to uSync's Terms of Service and Privacy Policy.
                        </p>
                        <p className={shared.footNote}>
                            Already have an account? <Link to="/account/login">Log in</Link>
                        </p>
                    </>
                ) : (
                    <p className={shared.footNote}>
                        New to uSync? <Link to="/account/signup">Create an account</Link>
                    </p>
                )}
            </>
        );
    };

    return (
        <div className="standardContainer">
            <SeoData
                title={isSignup ? "Sign Up" : "Log In"}
                description={isSignup
                    ? "Create your uSync account to track your stats, join brackets, and host esports events."
                    : "Log in to your uSync account to track your stats, join brackets, and manage your hosted events."}
                canonicalPath={isSignup ? "/account/signup" : "/account/login"}
            />

            <div className={styles.page}>
                <div className={styles.glow} aria-hidden="true" />

                <div className={styles.brandCol}>
                    <img src="https://i.imgur.com/F5lNU1H.png" alt="uSync" className={styles.brandLogo} />

                    <h2 className={styles.brandHeadline}>
                        The all-in-one hub for esports <span className={styles.brandAccent}>LANs, leagues, and tournaments.</span>
                    </h2>

                    <ul className={styles.highlightList}>
                        {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
                            <li key={title} className={styles.highlight}>
                                <span className={styles.highlightIcon}><Icon /></span>
                                <span>
                                    <strong className={styles.highlightTitle}>{title}</strong>
                                    <span className={styles.highlightText}>{text}</span>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={styles.formCol}>
                    <div className={styles.authCard}>
                        {renderCardBody()}
                    </div>
                </div>
            </div>
        </div>
    );
};
