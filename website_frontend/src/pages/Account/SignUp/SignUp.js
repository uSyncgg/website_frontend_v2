import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { SeoData, AccountShell, SignupSidebar } from "components";
import { AccountTypeStep, LinkAccountsStep, SuccessStep } from "./SharedSteps";
import { CredentialsStep, AboutYouStep, GamesStep, BracketHostingStep, ProfileBasicsStep } from "./PlayerSteps";
import { HostDetailsStep, HostEventsStep } from "./HostSteps";
import { SOCIAL_PLATFORMS, GAME_PLATFORMS, COMPETITIVE_PLATFORMS, HOST_LINK_PLATFORMS } from "./accountData";

// An account can be Player, Host, or both. Picking both merges the two flows
// rather than concatenating them: anything shared (login, role, games, profile,
// links) is asked exactly once, and only the genuinely host-specific steps get
// added. That's the whole point of allowing both, one pass instead of two
// accounts, so don't reintroduce a step that asks the same thing twice.
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

    // A Host account already has hosting turned on, so only offer the opt-in
    // to player-only accounts.
    if (isPlayer && !isHost) steps.push({ id: 'bracketHosting', label: 'Bracket hosting' });

    steps.push({ id: 'profileBasics', label: 'Profile basics' });
    steps.push({ id: 'linkAccounts', label: 'Link accounts' });
    steps.push({ id: 'success', label: 'Done' });

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
    const [maxStepReached, setMaxStepReached] = useState(0);
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
    // to it (or forward to any other step they've already reached).
    const jumpTo = (index) => {
        if (index <= maxStepReached) goTo(index);
    };

    const handleAccountTypesChange = (value) => {
        setForm(prev => {
            const cur = prev.accountTypes;
            return { ...prev, accountTypes: cur.includes(value) ? cur.filter(v => v !== value) : [...cur, value] };
        });
        // The step list changes shape with the selection, so progress past the
        // first screen can't be trusted anymore.
        setMaxStepReached(0);
    };

    const handleLinkChange = (platform, value) => setForm(prev => ({ ...prev, links: { ...prev.links, [platform]: value } }));

    const finish = () => navigate('/account/profile');

    // Sidebar shows every step except the account-type screen and the final
    // success screen, which aren't really "steps" people navigate between.
    const sidebarSteps = steps.slice(1, -1).map(s => s.label);
    const showSidebar = stepIndex > 0 && current.id !== 'success';

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
            case 'bracketHosting':
                return <BracketHostingStep form={form} setField={setField} onNext={() => advance()} onBack={back} />;
            case 'profileBasics':
                return <ProfileBasicsStep form={form} setField={setField} onNext={() => advance()} onBack={back} isHost={isHost} />;
            case 'linkAccounts':
                return (
                    <LinkAccountsStep
                        links={form.links}
                        onChange={handleLinkChange}
                        onFinish={() => advance()}
                        onSkip={() => advance()}
                        onBack={back}
                        socialPlatforms={isPlayer ? SOCIAL_PLATFORMS : HOST_LINK_PLATFORMS}
                        gamePlatforms={isPlayer ? GAME_PLATFORMS : []}
                        competitivePlatforms={isPlayer ? COMPETITIVE_PLATFORMS : []}
                    />
                );
            default:
                return <SuccessStep onDone={finish} isPlayer={isPlayer} isHost={isHost} />;
        }
    };

    return (
        <div className="standardContainer">
            <SeoData
                title={"Sign Up"}
                description="Create your uSync account as a Player, a Host, or both. Track stats, join brackets, and run your own esports events."
                canonicalPath={"/account/signup"}
            />

            <AccountShell
                sidebar={showSidebar ? (
                    <SignupSidebar
                        steps={sidebarSteps}
                        activeIndex={stepIndex - 1}
                        maxCompleted={maxStepReached - 1}
                        onStepClick={(i) => jumpTo(i + 1)}
                    />
                ) : null}
            >
                {renderStep()}
            </AccountShell>
        </div>
    );
};
