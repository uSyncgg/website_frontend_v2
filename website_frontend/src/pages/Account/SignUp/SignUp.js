import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { SeoData, AccountShell, SignupSidebar } from "components";
import { AccountTypeStep, TwoFactorStep, LinkAccountsStep, SuccessStep } from "./SharedSteps";
import { CredentialsStep, AboutYouStep, RoleStep, GamesStep, BracketHostingStep, ProfileBasicsStep } from "./PlayerSteps";
import { HostDetailsStep, VerifiedInterestStep, HostPasswordStep } from "./HostSteps";

const PERSON_SIDEBAR = ['Account type', 'Credentials', 'About you', 'Your role', 'Your games', 'Bracket hosting', 'Profile basics', 'Security', 'Link accounts'];
const HOST_SIDEBAR = ['Account type', 'Host details', 'Verified', 'Password', 'Security', 'Link accounts'];

const initialForm = {
    accountType: null,
    // credentials / person
    username: "", email: "", password: "", confirmPassword: "",
    firstName: "", lastName: "", phone: "", gender: "", birthday: "",
    country: "", state: "", zip: "",
    timezone: "", timezoneMode: "auto", timezoneManual: "",
    persona: "", genre: "",
    games: [], otherGame: "", bracketHosting: null, avatar: "", bio: "",
    // host
    accountName: "", contactName: "", contactEmail: "", contactDiscord: "",
    eventTypes: [], verifiedInterest: null,
    // shared
    twoFactorEnabled: false,
    links: {},
    // sensitive fields default to hidden from the public profile for safety
    // (zip is never shown publicly at all, so it has no visibility toggle)
    hidden: { email: true, phone: true, gender: true, birthday: true },
};

const PASSWORD_REQUIREMENTS_MESSAGE = "Password needs an uppercase letter, a lowercase letter, a number, and a special character.";

const passwordMeetsRequirements = (pw) => (
    pw.length >= 8 && /[a-z]/.test(pw) && /[A-Z]/.test(pw) && /\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)
);

const validateCredentials = (form) => {
    const errors = {};
    if (!form.username.trim()) errors.username = "Choose a username.";
    if (!form.email.trim()) errors.email = "Enter your email.";
    if (!form.password) errors.password = "Choose a password.";
    else if (!passwordMeetsRequirements(form.password)) errors.password = PASSWORD_REQUIREMENTS_MESSAGE;
    if (form.password && form.password !== form.confirmPassword) errors.confirmPassword = "Passwords don't match.";
    return errors;
};

const validateAboutYou = (form) => {
    const errors = {};
    ['firstName', 'lastName', 'gender', 'birthday', 'country', 'state'].forEach(field => {
        if (!form[field]?.trim?.() && !form[field]) errors[field] = "Required.";
    });
    return errors;
};

const validateHostDetails = (form) => {
    const errors = {};
    ['accountName', 'email', 'country', 'state', 'contactName', 'contactEmail'].forEach(field => {
        if (!form[field]?.trim?.()) errors[field] = "Required.";
    });
    return errors;
};

const validateHostPassword = (form) => {
    const errors = {};
    if (!form.password) errors.password = "Choose a password.";
    else if (!passwordMeetsRequirements(form.password)) errors.password = PASSWORD_REQUIREMENTS_MESSAGE;
    if (form.password && form.password !== form.confirmPassword) errors.confirmPassword = "Passwords don't match.";
    return errors;
};

export const SignUp = () => {
    const navigate = useNavigate();
    const [stepIndex, setStepIndex] = useState(0);
    const [maxStepReached, setMaxStepReached] = useState(0);
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [stepIndex]);

    const setField = (name, value) => setForm(prev => ({ ...prev, [name]: value }));

    const goTo = (index) => {
        setErrors({});
        setStepIndex(index);
        setMaxStepReached(prev => Math.max(prev, index));
    };

    const advance = (validator) => {
        if (validator) {
            const nextErrors = validator(form);
            setErrors(nextErrors);
            if (Object.keys(nextErrors).length > 0) return;
        }
        goTo(stepIndex + 1);
    };

    const back = () => goTo(Math.max(0, stepIndex - 1));

    // Once a step has already been filled out, let people jump straight back
    // to it (or forward to any other step they've already reached) from the sidebar.
    const jumpTo = (index) => {
        if (index <= maxStepReached) goTo(index);
    };

    const handleAccountTypeChange = (value) => {
        setField('accountType', value);
        // The two paths have entirely different step lists, so progress in one doesn't carry over.
        setMaxStepReached(0);
    };

    const handleLinkChange = (platform, value) => setForm(prev => ({ ...prev, links: { ...prev.links, [platform]: value } }));

    const finish = () => navigate('/');

    const sidebarSteps = form.accountType === 'host' ? HOST_SIDEBAR : PERSON_SIDEBAR;
    const showSidebar = stepIndex > 0 && stepIndex < sidebarSteps.length;

    const renderStep = () => {
        if (stepIndex === 0) {
            return <AccountTypeStep value={form.accountType} onChange={handleAccountTypeChange} onNext={() => advance()} />;
        }

        if (form.accountType === 'host') {
            switch (stepIndex) {
                case 1: return <HostDetailsStep form={form} setField={setField} errors={errors} onNext={() => advance(validateHostDetails)} onBack={back} />;
                case 2: return <VerifiedInterestStep form={form} setField={setField} onNext={() => advance()} onBack={back} />;
                case 3: return <HostPasswordStep form={form} setField={setField} errors={errors} onNext={() => advance(validateHostPassword)} onBack={back} />;
                case 4: return <TwoFactorStep enabled={form.twoFactorEnabled} onChange={(v) => setField('twoFactorEnabled', v)} onNext={() => advance()} onBack={back} />;
                case 5: return <LinkAccountsStep links={form.links} onChange={handleLinkChange} onFinish={() => advance()} onSkip={() => advance()} onBack={back} />;
                default: return <SuccessStep onDone={finish} />;
            }
        }

        switch (stepIndex) {
            case 1: return <CredentialsStep form={form} setField={setField} errors={errors} onNext={() => advance(validateCredentials)} onBack={back} />;
            case 2: return <AboutYouStep form={form} setField={setField} errors={errors} onNext={() => advance(validateAboutYou)} onBack={back} />;
            case 3: return <RoleStep form={form} setField={setField} onNext={() => advance()} onBack={back} />;
            case 4: return <GamesStep form={form} setField={setField} onNext={() => advance()} onBack={back} />;
            case 5: return <BracketHostingStep form={form} setField={setField} onNext={() => advance()} onBack={back} />;
            case 6: return <ProfileBasicsStep form={form} setField={setField} onNext={() => advance()} onBack={back} />;
            case 7: return <TwoFactorStep enabled={form.twoFactorEnabled} onChange={(v) => setField('twoFactorEnabled', v)} onNext={() => advance()} onBack={back} />;
            case 8: return <LinkAccountsStep links={form.links} onChange={handleLinkChange} onFinish={() => advance()} onSkip={() => advance()} onBack={back} />;
            default: return <SuccessStep onDone={finish} />;
        }
    };

    return (
        <div className="standardContainer">
            <SeoData
                title={"Sign Up"}
                description="Create your uSync account as a Person or Host. Track stats, join brackets, and run your own esports events."
                canonicalPath={"/account/signup"}
            />

            <AccountShell sidebar={showSidebar ? <SignupSidebar steps={sidebarSteps} activeIndex={stepIndex} maxCompleted={maxStepReached} onStepClick={jumpTo} /> : null}>
                {renderStep()}
            </AccountShell>
        </div>
    );
};
