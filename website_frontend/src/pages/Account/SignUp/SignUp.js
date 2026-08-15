import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { SeoData, AccountShell, SignupSidebar } from "components";
import { AccountTypeStep, SuccessStep } from "./SharedSteps";
import { CredentialsStep, AboutYouStep, GamesStep, ProfileBasicsStep } from "./PlayerSteps";
import { HostDetailsStep, HostEventsStep } from "./HostSteps";

// An account can be Player, Host, or both. Picking both merges the two flows
// rather than concatenating them: anything shared is asked exactly once, and
// only the genuinely host-specific steps get added.
//
// Signup only asks for what an account can't exist without. Linking accounts
// and turning on bracket hosting used to live here and don't anymore — neither
// is needed to have an account, and putting them in the way of finishing cost
// us finished signups. They're offered on the profile instead, where people
// can do them right away or leave them for later.
//
// Passwords are deliberately absent: Supabase owns credential storage, so
// signup only collects the username and email that we keep on our side.
const buildSteps = (accountTypes) => {
    const isPlayer = accountTypes.includes('player');
    const isHost = accountTypes.includes('host');

    const steps = [
        { id: 'accountType', label: 'Account type' },
        { id: 'credentials', label: 'Your login' },
    ];

    // Personal details only make sense for a person, not an org on its own.
    if (isPlayer) steps.push({ id: 'aboutYou', label: 'About you' });

    // No "Your role" step — roles (Player/Coach/Caster/…) are a profile
    // decoration, not something registration needs. People add them from
    // Edit profile when they actually care, instead of guessing up front.
    steps.push({ id: 'games', label: 'Your games' });

    if (isHost) {
        steps.push({ id: 'hostDetails', label: 'Host details' });
        steps.push({ id: 'hostEvents', label: 'Your events' });
    }

    steps.push({ id: 'profileBasics', label: 'Profile basics' });

    return steps;
};

const initialForm = {
    accountTypes: [],
    // shared login (no password, Supabase handles auth)
    username: "", email: "",
    // personal details (player)
    firstName: "", lastName: "", phone: "", gender: "", birthday: "",
    country: "", state: "", zip: "",
    timezone: "", timezoneMode: "auto", timezoneManual: "",
    // Roles aren't collected at signup — they're added later from the profile.
    personas: [],
    games: [], otherGame: "", bracketHosting: null, avatar: "", bio: "",
    // host / organization — org name + the account email is the whole contact
    // story, no separate contact-person block
    accountName: "",
    hostCountry: "", hostState: "", hostZip: "",
    eventTypes: [],
    // shared
    links: {},
    // sensitive fields default to hidden from the public profile for safety
    // (zip is never shown publicly at all, so it has no visibility toggle)
    hidden: { email: true, phone: true, gender: true, birthday: true },
};

const validateCredentials = (form) => {
    const errors = {};
    if (!form.username.trim()) errors.username = "Choose a username.";
    if (!form.email.trim()) errors.email = "Enter your email.";
    return errors;
};

// Only first/last name are required — gender and phone are optional by
// design (Marcos' note), and location is optional too since not everyone
// wants to share it up front.
const validateAboutYou = (form) => {
    const errors = {};
    if (!form.firstName?.trim()) errors.firstName = "Required.";
    if (!form.lastName?.trim()) errors.lastName = "Required.";
    return errors;
};

const validateHostDetails = (form) => {
    const errors = {};
    if (!form.accountName?.trim()) errors.accountName = "Required.";
    return errors;
};

export const SignUp = () => {
    const navigate = useNavigate();
    const [stepIndex, setStepIndex] = useState(0);
    const [visited, setVisited] = useState([0]);
    const [done, setDone] = useState(false);
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});

    const steps = buildSteps(form.accountTypes);
    const current = steps[Math.min(stepIndex, steps.length - 1)];
    const isPlayer = form.accountTypes.includes('player');
    const isHost = form.accountTypes.includes('host');

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [stepIndex]);

    const setField = (name, value) => setForm(prev => ({ ...prev, [name]: value }));

    const goTo = (index) => {
        setErrors({});
        setStepIndex(index);
        setVisited(prev => (prev.includes(index) ? prev : [...prev, index]));
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

    // The counter is a map, not a gate: any step opens in any order, forwards
    // or backwards. What's enforced is the finish — the account can't be
    // created until the required fields are filled in.
    const jumpTo = (index) => goTo(index);

    const handleAccountTypesChange = (value) => {
        setForm(prev => {
            const cur = prev.accountTypes;
            return { ...prev, accountTypes: cur.includes(value) ? cur.filter(v => v !== value) : [...cur, value] };
        });
        // The step list changes shape with the selection, so anything visited
        // past the first screen no longer maps to the same step.
        setVisited([0]);
    };

    // Everything still required, in one place, so the last step can name what's
    // missing and link straight to it instead of just refusing to submit.
    const missing = [
        !form.username.trim() && { label: 'a username', step: steps.findIndex(x => x.id === 'credentials') },
        !form.email.trim() && { label: 'your email', step: steps.findIndex(x => x.id === 'credentials') },
        isPlayer && !form.firstName?.trim() && { label: 'your first name', step: steps.findIndex(x => x.id === 'aboutYou') },
        isPlayer && !form.lastName?.trim() && { label: 'your last name', step: steps.findIndex(x => x.id === 'aboutYou') },
        isHost && !form.accountName?.trim() && { label: 'your organization name', step: steps.findIndex(x => x.id === 'hostDetails') },
    ].filter(Boolean);

    const submit = () => {
        if (missing.length > 0) {
            goTo(missing[0].step);
            return;
        }
        setDone(true);
    };

    // Sidebar shows every step except the account-type screen, which is the
    // fork the rest of the flow is built from rather than a step in it.
    const sidebarSteps = steps.slice(1).map(x => x.label);
    const showSidebar = stepIndex > 0 && !done;

    const renderStep = () => {
        switch (current.id) {
            case 'accountType':
                return <AccountTypeStep value={form.accountTypes} onChange={handleAccountTypesChange} onNext={() => advance()} />;
            case 'credentials':
                return <CredentialsStep form={form} setField={setField} errors={errors} onNext={() => advance(validateCredentials)} onBack={back} />;
            case 'aboutYou':
                return <AboutYouStep form={form} setField={setField} errors={errors} onNext={() => advance(validateAboutYou)} onBack={back} />;
            case 'games':
                return <GamesStep form={form} setField={setField} onNext={() => advance()} onBack={back} isPlayer={isPlayer} isHost={isHost} />;
            case 'hostDetails':
                return <HostDetailsStep form={form} setField={setField} errors={errors} onNext={() => advance(validateHostDetails)} onBack={back} />;
            case 'hostEvents':
                return <HostEventsStep form={form} setField={setField} onNext={() => advance()} onBack={back} />;
            default:
                return (
                    <ProfileBasicsStep
                        form={form}
                        setField={setField}
                        onNext={submit}
                        onBack={back}
                        isHost={isHost}
                        finishLabel="Create my account"
                        missing={missing}
                        onFixMissing={goTo}
                    />
                );
        }
    };

    return (
        <div className="standardContainer">
            <SeoData
                title={"Set Up Your Account"}
                description="Finish setting up your uSync account as a Player, a Host, or both. Track stats, join brackets, and run your own esports events."
                canonicalPath={"/account/setup"}
            />

            <AccountShell
                sidebar={showSidebar ? (
                    <SignupSidebar
                        steps={sidebarSteps}
                        activeIndex={stepIndex - 1}
                        visited={visited.map(i => i - 1)}
                        onStepClick={(i) => jumpTo(i + 1)}
                    />
                ) : null}
            >
                {done
                    ? <SuccessStep onDone={() => navigate('/account/profile')} isPlayer={isPlayer} isHost={isHost} />
                    : renderStep()}
            </AccountShell>
        </div>
    );
};
