import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { SeoData, AccountShell, AccountField, PasswordField, OAuthButtons } from "components";
import shared from "../../../components/AccountUI/AccountUI.module.css";

const CODE_LENGTH = 6;

export const Login = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState("credentials");
    const [form, setForm] = useState({ identifier: "", password: "", remember: true, rememberDuration: "30d" });
    const [errors, setErrors] = useState({});
    const [code, setCode] = useState(Array(CODE_LENGTH).fill(""));
    const codeRefs = useRef([]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [step]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    };

    const handleOAuth = (provider) => {
        // UI-only mockup: pretend the provider handshake succeeded
        navigate('/');
    };

    const handleCredentialsSubmit = (e) => {
        e.preventDefault();
        const nextErrors = {};
        if (!form.identifier.trim()) nextErrors.identifier = "Enter your username, email, or phone number.";
        if (!form.password) nextErrors.password = "Enter your password.";

        setErrors(nextErrors);
        if (Object.keys(nextErrors).length === 0) {
            setStep("twofa");
        }
    };

    const handleCodeChange = (index, value) => {
        const digit = value.replace(/\D/g, "").slice(-1);
        setCode(prev => {
            const next = [...prev];
            next[index] = digit;
            return next;
        });

        if (digit && index < CODE_LENGTH - 1) {
            codeRefs.current[index + 1]?.focus();
        }
    };

    const handleCodeKeyDown = (index, e) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            codeRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = (e) => {
        e.preventDefault();
        navigate('/');
    };

    return (
        <div className="standardContainer">
            <SeoData
                title={"Log In"}
                description="Log in to your uSync account to track your stats, join brackets, and host esports events."
                canonicalPath={"/account/login"}
            />

            <AccountShell onBack={step === "twofa" ? () => setStep("credentials") : undefined}>
                {step === "credentials" ? (
                    <>
                        <p className={shared.eyebrow}>Welcome back</p>
                        <h1 className={shared.stepTitle}>Log in to uSync</h1>
                        <p className={shared.stepSubtitle}>Track your stats, join brackets, and manage your hosted events.</p>

                        <form onSubmit={handleCredentialsSubmit}>
                            <AccountField
                                label="Username, email, or phone number"
                                name="identifier"
                                value={form.identifier}
                                onChange={handleChange}
                                placeholder="you@email.com"
                                required
                                error={errors.identifier}
                                autoComplete="username"
                            />

                            <div style={{ height: '1.25rem' }} />

                            <PasswordField
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                error={errors.password}
                                autoComplete="current-password"
                                showStrength={false}
                            />

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '.75rem 0 1.5rem', flexWrap: 'wrap', gap: '.5rem' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '.5rem', fontSize: '.82rem', color: 'rgba(255,255,255,.65)', cursor: 'pointer' }}>
                                    <input type="checkbox" name="remember" checked={form.remember} onChange={handleChange} style={{ accentColor: '#8e6ace' }} />
                                    Save my login for
                                </label>

                                {form.remember && (
                                    <select
                                        name="rememberDuration"
                                        value={form.rememberDuration}
                                        onChange={handleChange}
                                        className={shared.input}
                                        style={{ width: 'auto', padding: '.35rem .6rem', fontSize: '.8rem' }}
                                    >
                                        <option value="30d">30 days</option>
                                        <option value="6mo">6 months</option>
                                    </select>
                                )}

                                <Link to="/account/forgot-password" className={shared.footNote} style={{ margin: 0 }}>Forgot password?</Link>
                            </div>

                            <button type="submit" className={shared.primaryButton}>Log in</button>
                        </form>

                        <OAuthButtons onSelect={handleOAuth} />

                        <p className={shared.footNote}>
                            Don't have an account? <Link to="/account/signup">Sign up</Link>
                        </p>
                    </>
                ) : (
                    <>
                        <p className={shared.eyebrow}>Two-factor authentication</p>
                        <h1 className={shared.stepTitle}>Enter your code</h1>
                        <p className={shared.stepSubtitle}>We sent a 6-digit verification code to the email on file for this account.</p>

                        <form onSubmit={handleVerify}>
                            <div className={shared.codeRow}>
                                {code.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={el => (codeRefs.current[index] = el)}
                                        className={shared.codeDigit}
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleCodeChange(index, e.target.value)}
                                        onKeyDown={(e) => handleCodeKeyDown(index, e)}
                                    />
                                ))}
                            </div>

                            <label className={shared.checkboxRow}>
                                <input type="checkbox" defaultChecked />
                                <span>Trust this device for 30 days so I don't have to do this again.</span>
                            </label>

                            <button type="submit" className={shared.primaryButton} disabled={code.some(d => !d)}>Verify and log in</button>
                        </form>

                        <p className={shared.footNote}>
                            Didn't get a code? <Link to="#" onClick={(e) => e.preventDefault()}>Resend it</Link>
                        </p>
                    </>
                )}
            </AccountShell>
        </div>
    );
};
