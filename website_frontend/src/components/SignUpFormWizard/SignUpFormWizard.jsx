import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { FormButton } from "components/FormButton/FormButton";
import { useAuth, useCurrentUser } from "hooks";
import { getApiErrorMessage, isRateLimited, RATE_LIMIT_MESSAGE } from "utils/apiError";
import { PROFILE_LABELS, pictureField, profileUrl, usernameField } from "utils/profiles";
import { buildSignUpRequest, buildAddProfileRequest, toFormData } from "utils/profileForm";
import { submitSignUpForm, addProfile } from "services/user";
import styles from "./SignUpFormWizard.module.css";

import { buildStepSequence, buildAddProfileSteps, selectedTypes, otherNeedsProfile, isStepComplete, hasRequiredInfo, COMPLETION_WATCH_FIELDS } from "./stepConfig";

const EMPTY_VENUE = { name: '', location: '' };

// Works out which form field a FastAPI error points at, e.g.
// ["body", "profiles", 1, "username"] -> "username_host", or ["body", "profile_picture"] (adding
// a host profile) -> "profile_picture_host". `types` is the profile types in the order they were sent.
function fieldForErrorLoc(loc, types) {
    if (!Array.isArray(loc)) return null;
    const last = [...loc].reverse().find(part => typeof part === 'string');
    const typeAt = () => loc.includes('profiles') ? types[loc[loc.indexOf('profiles') + 1]] : types[0];

    if (last === 'username') {
        const type = typeAt();
        return type ? usernameField(type) : null;
    }
    // Sign-up names its files profile_picture_<type> already; adding a profile sends one profile_picture.
    if (last?.startsWith('profile_picture_')) return last;
    if (last === 'profile_picture' || last === 'picture') {
        const type = typeAt();
        return type ? pictureField(type) : null;
    }
    if (loc.includes('locations')) return 'venues';
    return last ?? null;
}

const TAKEN_USERNAME = /^That (player|host|venue|org) username is taken/;

// Sign-up (no addType) creates the account with one profile per type picked on Get Started.
// With addType ('player' | 'host' | 'venue' | 'org') it adds that one profile to the signed in account,
// reusing the same detail steps.
export const SignUpFormWizard = ({ addType = null }) => {
    const isSignUp = !addType;
    const methods = useForm({
        defaultValues: { signup_path: [], venues: [EMPTY_VENUE] },
        mode: 'onBlur',
    });
    const { watch, trigger, setError, clearErrors, handleSubmit, formState: { isSubmitting, errors } } = methods;
    const { session } = useAuth();
    const { refresh, defaultProfile } = useCurrentUser();
    const navigate = useNavigate();
    const [stepIndex, setStepIndex] = useState(0);
    const [passedSteps, setPassedSteps] = useState(() => new Set());

    const pathSelection = watch('signup_path') ?? [];
    const pathKey = [...pathSelection].sort().join(',');
    const types = isSignUp ? selectedTypes(pathSelection) : [addType];
    const stepSequence = useMemo(
        () => isSignUp ? buildStepSequence(pathSelection) : buildAddProfileSteps(addType),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [isSignUp, pathKey, addType]
    );

    const completionWatch = watch(COMPLETION_WATCH_FIELDS);
    const completionValues = Object.fromEntries(COMPLETION_WATCH_FIELDS.map((name, i) => [name, completionWatch[i]]));
    // Submitting only needs the required information. Optional steps (and the last step, which
    // has Submit instead of Continue) never block it.
    const canSubmit = types.length > 0 && stepSequence.every(step => hasRequiredInfo(step, completionValues));

    const currentStep = stepSequence[Math.min(stepIndex, stepSequence.length - 1)];
    const isFirstStep = stepIndex === 0;
    // On sign-up the first step alone (nothing picked yet) is never the last.
    const isLastStep = stepIndex === stepSequence.length - 1 && !(isSignUp && isFirstStep);

    const stepIndexForField = (fieldName) =>
        stepSequence.findIndex(step => step.fields.includes(fieldName));

    const handleNext = async () => {
        if (isSignUp && isFirstStep) {
            if (types.length === 0) {
                setError('signup_path', { type: 'manual', message: 'Pick Player, Host, Venue or Organization to continue.' });
                return;
            }
            if (otherNeedsProfile(pathSelection)) {
                setError('signup_path', { type: 'manual', message: 'Other must be paired with Player, Host, Venue or Organization.' });
                return;
            }
            if (pathSelection.includes('other') && (watch('other_roles') ?? []).length === 0) {
                setError('signup_path', { type: 'manual', message: 'Pick which other role describes you.' });
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

    // Puts a server error under the field it's about and jumps to that step, or under the form.
    const showServerError = (err) => {
        if (isRateLimited(err)) {
            setError('root', { type: 'server', message: RATE_LIMIT_MESSAGE });
            return;
        }

        const status = err.response?.status;
        const detail = err.response?.data?.detail;
        let field = null;
        let message = getApiErrorMessage(err);

        if (status === 422 && Array.isArray(detail)) {
            field = fieldForErrorLoc(detail[0]?.loc, types);
        } else if (status === 409 && typeof detail === 'string') {
            const taken = detail.match(TAKEN_USERNAME);
            if (taken) field = usernameField(taken[1]);
        }

        const targetIndex = field ? stepIndexForField(field) : -1;
        if (targetIndex === -1) {
            setError('root', { type: 'server', message });
            return;
        }

        setStepIndex(targetIndex);
        // Venue rows are separate inputs, so a locations error shows under the form instead.
        setError(field === 'venues' ? 'root' : field, { type: 'server', message });
    };

    // A field that fails validation on a step other than the one showing would otherwise make
    // Submit look like it did nothing, so jump to the first step with an error.
    const onInvalid = (formErrors) => {
        const targetIndex = stepSequence.findIndex(step => step.fields.some(field => formErrors[field]));
        if (targetIndex !== -1) setStepIndex(targetIndex);
    };

    const onSubmit = async (values) => {
        const token = session?.access_token;
        try {
            if (isSignUp) {
                await submitSignUpForm(toFormData(buildSignUpRequest(values)), token);
                // Marks the account complete for the navbar, and RedirectIfProfileComplete
                // then forwards the user to their default profile page.
                await refresh();
            } else {
                const request = buildAddProfileRequest(addType, values, { defaultHasPicture: !!defaultProfile?.profile_picture });
                const created = await addProfile(toFormData(request), token);
                // Navigate first: once refresh() shows the new profile, the add page would
                // otherwise redirect to its settings instead.
                navigate(profileUrl(created));
                // Adds the new profile to the navbar's switcher.
                await refresh();
            }
        } catch (err) {
            showServerError(err);
        }
    };


    const title = isSignUp ? 'Create account' : `New ${PROFILE_LABELS[addType].toLowerCase()} profile`;
    const progressPct = Math.round((stepIndex / Math.max(1, stepSequence.length - 1)) * 100);

    return (
        <div className={styles.page}>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit, onInvalid)} onKeyDown={guardEnterKey} className={styles.shell}>
                    <aside className={styles.shellSide}>
                        <div className={styles.sidebar}>
                            <h3>{title}</h3>
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
                                disabled={!canSubmit || isSubmitting}
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
                                    <FormButton key="continue" type="button" onClick={handleNext} label="Continue" className={styles.btnPrimary} />
                                ) : (
                                    <FormButton key="submit" type="submit" disabled={!canSubmit || isSubmitting} label={isSubmitting ? 'Submitting...' : 'Submit'} className={styles.btnPrimary} />
                                )}
                            </div>
                            {isLastStep && !canSubmit &&
                                <p className={styles.submitHint}>Finish the steps without a ✓ in the sidebar to submit.</p>
                            }
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
