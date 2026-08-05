import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import axios from "axios";
import { FormButton } from "components/FormButton/FormButton";
import { useAuth } from "hooks";

import { SignUpPathStep } from "components/MutualSignUpSteps/SignUpPathStep";
import { UserInfoStep } from "components/MutualSignUpSteps/UserInfoStep";
import { UserGamesStep } from "components/MutualSignUpSteps/UserGamesStep";
import { ProfileBioStep } from "components/MutualSignUpSteps/ProfileBioStep";

import { PlayerAboutStep } from "components/PlayerSignUpSteps/PlayerAboutStep";
import { PlayerBracketStep } from "components/PlayerSignUpSteps/PlayerBracketStep";
import { PlayerAccountsStep } from "components/PlayerSignUpSteps/PlayerAccountsStep";

import { HostOrgStep } from "components/HostSignUpSteps/HostOrgStep";
import { HostEventStep } from "components/HostSignUpSteps/HostEventStep";
import { HostAccountsStep } from "components/HostSignUpSteps/HostAccountsStep";

// Step 0 is always the path choice; every other step's presence depends on it.
const PATH_STEP = { key: 'signup_path', title: 'Get Started', Component: SignUpPathStep, fields: [] };
const MUTUAL_INFO_STEP = { key: 'user_info', title: 'Account Info', Component: UserInfoStep, fields: ['username', 'email'] };
const MUTUAL_GAMES_STEP = { key: 'user_games', title: 'Games You Play', Component: UserGamesStep, fields: ['other_games'] };
const MUTUAL_BIO_STEP = { key: 'profile_bio', title: 'Profile', Component: ProfileBioStep, fields: ['profile_picture', 'bio'] };

const PLAYER_STEPS = [
    MUTUAL_INFO_STEP,
    { key: 'player_about', title: 'About You', Component: PlayerAboutStep, fields: ['first_name', 'last_name', 'phone_number', 'gender', 'date_of_birth', 'country'] },
    MUTUAL_GAMES_STEP,
    { key: 'player_bracket', title: 'Bracket Hosting', Component: PlayerBracketStep, fields: [] },
    MUTUAL_BIO_STEP,
    { key: 'player_accounts', title: 'Linked Accounts', Component: PlayerAccountsStep, fields: [] },
];

const HOST_STEPS = [
    MUTUAL_INFO_STEP,
    MUTUAL_GAMES_STEP,
    { key: 'host_org', title: 'Organization', Component: HostOrgStep, fields: ['organization', 'host_country'] },
    { key: 'host_events', title: 'Event Types', Component: HostEventStep, fields: [] },
    MUTUAL_BIO_STEP,
    { key: 'host_accounts', title: 'Linked Accounts', Component: HostAccountsStep, fields: [] },
];

const COMBINED_STEPS = [
    MUTUAL_INFO_STEP,
    { key: 'player_about', title: 'About You', Component: PlayerAboutStep, fields: ['first_name', 'last_name', 'phone_number', 'gender', 'date_of_birth', 'country'] },
    MUTUAL_GAMES_STEP,
    { key: 'host_org', title: 'Organization', Component: HostOrgStep, fields: ['organization', 'host_country'] },
    { key: 'host_events', title: 'Event Types', Component: HostEventStep, fields: [] },
    MUTUAL_BIO_STEP,
    { key: 'player_accounts', title: 'Linked Accounts', Component: PlayerAccountsStep, fields: [] }
]

// The order/composition of the sequence lives entirely here - reorder or interleave
// player/host steps by editing this function, nothing else needs to change.
function buildStepSequence(pathSelection) {
    const isPlayer = pathSelection.includes('player');
    const isHost = pathSelection.includes('host');

    if (isPlayer && isHost) return [PATH_STEP, ...COMBINED_STEPS];
    if (isHost) return [PATH_STEP, ...HOST_STEPS];
    if (isPlayer) return [PATH_STEP, ...PLAYER_STEPS];

    return [PATH_STEP];
}

export const SignUpFormWizard = () => {
    const methods = useForm({ defaultValues: { signup_path: [] }, mode: 'onBlur' });
    const { watch, trigger, setError, clearErrors, handleSubmit, formState: { isSubmitting, errors } } = methods;
    const { session } = useAuth();
    const navigate = useNavigate();
    const [stepIndex, setStepIndex] = useState(0);

    const pathSelection = watch('signup_path') ?? [];
    const pathKey = [...pathSelection].sort().join(',');
    const stepSequence = useMemo(() => buildStepSequence(pathSelection), [pathKey]);

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

        setStepIndex((i) => Math.min(i + 1, stepSequence.length - 1));
    };

    const handleBack = () => setStepIndex((i) => Math.max(i - 1, 0));

    const onSubmit = async (data) => {
        // linked_toggle is UI-only state (which account tab is showing) - not real submission data.
        const { linked_toggle, profile_picture, ...submissionData } = data;

        const payload = new FormData();
        payload.append('data', JSON.stringify(submissionData));
        if (profile_picture?.[0]) {
            payload.append('profile_picture', profile_picture[0]);
        }

        try {
            await axios.post('https://www.usync.gg/signup/complete', payload, {
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

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <nav>
                    {stepSequence.map((step, index) => (
                        <button key={step.key} type="button" onClick={() => setStepIndex(index)}>
                            {step.title}
                        </button>
                    ))}
                </nav>

                <currentStep.Component />

                {errors.root && <span>{errors.root.message}</span>}

                <div>
                    {!isFirstStep && (
                        <FormButton type="button" onClick={handleBack} label="Back" />
                    )}

                    {!isLastStep ? (
                        <FormButton type="button" onClick={handleNext} label="Continue" />
                    ) : (
                        <FormButton type="submit" disabled={isSubmitting} label={isSubmitting ? 'Submitting...' : 'Submit'} />
                    )}
                </div>
            </form>
        </FormProvider>
    )
}
