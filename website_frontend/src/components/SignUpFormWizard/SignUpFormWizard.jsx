import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import axios from "axios";
import { FormButton } from "components/FormButton/FormButton";
import { useAuth } from "hooks";
import styles from "./SignUpFormWizard.module.css";

import { SignUpPathStep } from "components/MutualSignUpSteps/SignUpPathStep";
import { UserInfoStep } from "components/MutualSignUpSteps/UserInfoStep";
import { UserGamesStep } from "components/MutualSignUpSteps/UserGamesStep";
import { ProfileBioStep } from "components/MutualSignUpSteps/ProfileBioStep";
import { LocationStep } from "components/MutualSignUpSteps/LocationStep";

import { PlayerAboutStep } from "components/PlayerSignUpSteps/PlayerAboutStep";
import { PlayerBracketStep } from "components/PlayerSignUpSteps/PlayerBracketStep";
import { PlayerAccountsStep } from "components/PlayerSignUpSteps/PlayerAccountsStep";

import { HostOrgStep } from "components/HostSignUpSteps/HostOrgStep";
import { HostEventStep } from "components/HostSignUpSteps/HostEventStep";
import { HostAccountsStep } from "components/HostSignUpSteps/HostAccountsStep";

// Step 0 is always the path choice; every other step's presence depends on it.
const PATH_STEP = { key: 'signup_path', title: 'Get Started', subtitle: "Pick one or both. If you compete and run events, choose both — it's a single account either way.", Component: SignUpPathStep, fields: [] };
const MUTUAL_INFO_STEP = { key: 'user_info', title: 'Account Info', subtitle: "This is how you'll show up across uSync.", Component: UserInfoStep, fields: ['username', 'email'] };
const MUTUAL_BIO_STEP = { key: 'profile_bio', title: 'Profile', subtitle: 'A photo and a line about yourself. Both optional — you can do this later.', Component: ProfileBioStep, fields: ['profile_picture', 'bio'] };
// Shown whenever "Venue" is picked on the Get Started step, on top of whatever
// player/host/other steps are already in the sequence.
const LOCATION_STEP = { key: 'venue_location', title: 'Location', subtitle: "Add every venue you'll be hosting from. You can add more than one.", Component: LocationStep, fields: [] };

// "Games You Play" (player), "Hosted Titles" (host), or "Games You Play & Host"
// (both) — same UserGamesStep component, told via `props.mode` which field(s) to bind.
const PLAYER_GAMES_STEP = { key: 'user_games', title: 'Games You Play', subtitle: 'Pick as many as you like — this drives the events we surface for you.', Component: UserGamesStep, props: { mode: 'player' }, fields: ['other_games'] };
const HOST_GAMES_STEP = { key: 'user_games', title: 'Hosted Titles', subtitle: 'Pick every title you run events for.', Component: UserGamesStep, props: { mode: 'host' }, fields: ['other_hosted_games'] };
const COMBINED_GAMES_STEP = { key: 'user_games', title: 'Games You Play & Host', subtitle: 'Pick as many as you like in each — this drives the events we surface for you.', Component: UserGamesStep, props: { mode: 'combined' }, fields: ['other_games', 'other_hosted_games'] };

const PLAYER_STEPS = [
    MUTUAL_INFO_STEP,
    { key: 'player_about', title: 'About You', subtitle: 'Only your name shows publicly by default.', Component: PlayerAboutStep, fields: ['first_name', 'last_name', 'phone_number', 'gender', 'date_of_birth', 'country'] },
    PLAYER_GAMES_STEP,
    { key: 'player_bracket', title: 'Bracket Hosting', subtitle: 'Want to run your own brackets for friends or your team? You can change this later.', Component: PlayerBracketStep, fields: [] },
    MUTUAL_BIO_STEP,
    { key: 'player_accounts', title: 'Linked Accounts', subtitle: 'Optional — connect the platforms you use so teammates and organizers can find you.', Component: PlayerAccountsStep, fields: [] },
];

const HOST_STEPS = [
    MUTUAL_INFO_STEP,
    HOST_GAMES_STEP,
    { key: 'host_org', title: 'Organization', subtitle: 'This is the name players will see on every event you run.', Component: HostOrgStep, fields: ['organization', 'host_country'] },
    { key: 'host_events', title: 'Event Types', subtitle: 'Pick every format you host.', Component: HostEventStep, fields: [] },
    MUTUAL_BIO_STEP,
    { key: 'host_accounts', title: 'Linked Accounts', subtitle: 'Optional — connect the platforms you use so players can find you.', Component: HostAccountsStep, fields: [] },
];

const COMBINED_STEPS = [
    MUTUAL_INFO_STEP,
    { key: 'player_about', title: 'About You', subtitle: 'Only your name shows publicly by default.', Component: PlayerAboutStep, fields: ['first_name', 'last_name', 'phone_number', 'gender', 'date_of_birth', 'country'] },
    COMBINED_GAMES_STEP,
    { key: 'host_org', title: 'Organization', subtitle: 'This is the name players will see on every event you run.', Component: HostOrgStep, fields: ['organization', 'host_country'] },
    { key: 'host_events', title: 'Event Types', subtitle: 'Pick every format you host.', Component: HostEventStep, fields: [] },
    MUTUAL_BIO_STEP,
    { key: 'player_accounts', title: 'Linked Accounts', subtitle: 'Optional — connect the platforms you use so teammates and organizers can find you.', Component: PlayerAccountsStep, fields: [] }
]

// The order/composition of the sequence lives entirely here - reorder or interleave
// player/host steps by editing this function, nothing else needs to change.
function buildStepSequence(pathSelection) {
    const isPlayer = pathSelection.includes('player');
    const isHost = pathSelection.includes('host');
    const isVenue = pathSelection.includes('venue');

    let steps;
    if (isPlayer && isHost) steps = [PATH_STEP, ...COMBINED_STEPS];
    else if (isHost) steps = [PATH_STEP, ...HOST_STEPS];
    else if (isPlayer) steps = [PATH_STEP, ...PLAYER_STEPS];
    else steps = [PATH_STEP];

    if (!isVenue) return steps;

    // Venue is independent of player/host/other, so it just slots the
    // Location step in right after Account Info wherever that ends up
    // (or right after Get Started, if Account Info isn't in the sequence).
    const infoIndex = steps.findIndex(step => step.key === 'user_info');
    const insertAt = infoIndex === -1 ? 1 : infoIndex + 1;
    return [...steps.slice(0, insertAt), LOCATION_STEP, ...steps.slice(insertAt)];
}

// Fields the sidebar checkmarks care about — kept to a minimal, targeted watch
// list so typing doesn't re-render the whole wizard on every keystroke.
const COMPLETION_WATCH_FIELDS = ['signup_path', 'other_roles', 'username', 'email', 'first_name', 'last_name', 'organization'];

// A step only earns its sidebar checkmark once it's actually been dealt with:
// - Steps with real required fields (signup path, account info, about you,
//   organization) check off as soon as that information is filled in,
//   regardless of whether the step has been visited yet.
// - Steps with nothing strictly required (bracket hosting, event types,
//   games, bio, linked accounts) have no data to validate, so they only
//   check off once the user has actually continued past them — otherwise
//   every optional step would show a checkmark from the very start.
function isStepComplete(step, values, passedSteps) {
    switch (step.key) {
        case 'signup_path': {
            const selection = values.signup_path ?? [];
            if (selection.length === 0) return false;
            if (selection.includes('other') && (values.other_roles ?? []).length === 0) return false;
            return true;
        }
        case 'user_info':
            return !!values.username && !!values.email;
        case 'player_about':
            return !!values.first_name && !!values.last_name;
        case 'host_org':
            return !!values.organization;
        default:
            return passedSteps.has(step.key);
    }
}

export const SignUpFormWizard = () => {
    const methods = useForm({ defaultValues: { signup_path: [], venues: [{ name: '', location: '' }] }, mode: 'onBlur' });
    const { watch, trigger, setError, clearErrors, handleSubmit, formState: { isSubmitting, errors } } = methods;
    const { session } = useAuth();
    const navigate = useNavigate();
    const [stepIndex, setStepIndex] = useState(0);
    const [passedSteps, setPassedSteps] = useState(() => new Set());

    const pathSelection = watch('signup_path') ?? [];
    const pathKey = [...pathSelection].sort().join(',');
    const stepSequence = useMemo(() => buildStepSequence(pathSelection), [pathKey]);

    const completionWatch = watch(COMPLETION_WATCH_FIELDS);
    const completionValues = Object.fromEntries(COMPLETION_WATCH_FIELDS.map((name, i) => [name, completionWatch[i]]));
    const allStepsComplete = stepSequence.every(step => isStepComplete(step, completionValues, passedSteps));

    const currentStep = stepSequence[stepIndex];
    const isFirstStep = stepIndex === 0;
    const isLastStep = stepIndex === stepSequence.length - 1;

    const stepIndexForField = (fieldName) =>
        stepSequence.findIndex(step => step.fields.includes(fieldName));

    const handleNext = async () => {
        if (isFirstStep) {
            if (pathSelection.length === 0) {
                setError('signup_path', { type: 'manual', message: 'Select at least one option to continue.' });
                return;
            }
            clearErrors('signup_path');
        } else {
            const valid = await trigger(currentStep.fields);
            if (!valid) return;
        }

        setPassedSteps((prev) => new Set(prev).add(currentStep.key));
        setStepIndex((i) => Math.min(i + 1, stepSequence.length - 1));
    };

    const handleBack = () => setStepIndex((i) => Math.max(i - 1, 0));

    // Enter in a text field would otherwise implicitly submit the form as soon
    // as the last step (which renders a type="submit" button) is reached.
    const guardEnterKey = (e) => {
        if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
            e.preventDefault();
        }
    };

    const onSubmit = async (data) => {
        // linked_toggle is UI-only state (which account tab is showing) - not real submission data.
        const { linked_toggle, profile_picture, ...submissionData } = data;

        const payload = new FormData();
        payload.append('data', JSON.stringify(submissionData));
        if (profile_picture?.[0]) {
            payload.append('profile_picture', profile_picture[0]);
        }

        try {
            await axios.post('http://localhost:4242/registration', payload, {
                headers: { Authorization: `Bearer ${session?.access_token}` },
            });

            navigate('/');
        } catch (err) {
            const field = err.response?.data?.field;
            const message = err.response?.data?.message || 'Something went wrong. Please try again.';

            if (field) {
                setError(field, { type: 'server', message });
                const targetIndex = stepIndexForField(field);
                if (targetIndex !== -1) setStepIndex(targetIndex);
            } else {
                setError('root', { type: 'server', message });
            }
        }
    };

    const progressPct = Math.round((stepIndex / Math.max(1, stepSequence.length - 1)) * 100);

    return (
        <div className={styles.page}>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)} onKeyDown={guardEnterKey} className={styles.shell}>
                    <aside className={styles.shellSide}>
                        <div className={styles.sidebar}>
                            <h3>Create account</h3>
                            <div className={styles.progress}><span className={styles.progressBar} style={{ width: `${progressPct}%` }} /></div>
                            <span className={styles.progressLabel}>Step {stepIndex + 1} of {stepSequence.length}</span>

                            <ul className={styles.steps}>
                                {stepSequence.map((step, index) => {
                                    const state = index === stepIndex ? 'active' : isStepComplete(step, completionValues, passedSteps) ? 'done' : 'upcoming';
                                    return (
                                        <li key={step.key} className={styles.stepItem} data-state={state}>
                                            <button type="button" className={styles.stepButton} onClick={() => setStepIndex(index)}>
                                                <span className={styles.bubble}>{state === 'done' ? '✓' : index + 1}</span>
                                                <span className={styles.stepLabel}>{step.title}</span>
                                            </button>
                                        </li>
                                    );
                                })}
                            </ul>

                            <FormButton
                                type="submit"
                                disabled={!allStepsComplete || isSubmitting}
                                label={isSubmitting ? 'Submitting...' : 'Submit'}
                                className={styles.sidebarSubmit}
                            />
                        </div>
                    </aside>

                    <div className={styles.shellMain}>
                        <div className={styles.card}>
                            <p className={styles.eyebrow}>Step {stepIndex + 1} of {stepSequence.length}</p>
                            <h1 className={styles.stepTitle}>{currentStep.title}</h1>
                            {currentStep.subtitle && <p className={styles.stepSub}>{currentStep.subtitle}</p>}

                            <currentStep.Component {...(currentStep.props ?? {})} />

                            {errors.root && <span className={styles.errorRoot}>{errors.root.message}</span>}

                            <div className={styles.stepFooter}>
                                {!isFirstStep && (
                                    <FormButton type="button" onClick={handleBack} label="Back" className={styles.btnSecondary} />
                                )}

                                {!isLastStep ? (
                                    <FormButton type="button" onClick={handleNext} label="Continue" className={styles.btnPrimary} />
                                ) : (
                                    <FormButton type="submit" disabled={isSubmitting} label={isSubmitting ? 'Submitting...' : 'Submit'} className={styles.btnPrimary} />
                                )}
                            </div>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
