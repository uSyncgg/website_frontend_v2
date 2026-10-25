import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import axios from "axios";
import { FormButton } from "components/FormButton/FormButton";
import { useAuth, useCurrentUser } from "hooks";
import { isRateLimited, RATE_LIMIT_MESSAGE } from "utils/apiError";
import styles from "./SignUpFormWizard.module.css";

import { buildStepSequence, otherNeedsPlayerOrHost, isStepComplete, COMPLETION_WATCH_FIELDS } from "./stepConfig";
import { submitSignUpForm } from "services/user";

export const SignUpFormWizard = () => {
    const methods = useForm({ defaultValues: { signup_path: [], venues: [{ name: '', location: '' }] }, mode: 'onBlur' });
    const { watch, trigger, setError, clearErrors, handleSubmit, formState: { isSubmitting, errors } } = methods;
    const { session } = useAuth();
    const { refresh } = useCurrentUser();
    const [stepIndex, setStepIndex] = useState(0);
    const [passedSteps, setPassedSteps] = useState(() => new Set());

    const pathSelection = watch('signup_path') ?? [];
    const otherRoles = watch('other_roles') ?? [];
    const pathKey = [...pathSelection].sort().join(',');
    const otherRolesKey = [...otherRoles].sort().join(',');
    const stepSequence = useMemo(() => buildStepSequence(pathSelection, otherRoles), [pathKey, otherRolesKey]);

    const completionWatch = watch(COMPLETION_WATCH_FIELDS);
    const completionValues = Object.fromEntries(COMPLETION_WATCH_FIELDS.map((name, i) => [name, completionWatch[i]]));
    const allStepsComplete = stepSequence.every(step => isStepComplete(step, completionValues, passedSteps));

    const currentStep = stepSequence[stepIndex];
    const isFirstStep = stepIndex === 0;
    const isLastStep = !isFirstStep && stepIndex === stepSequence.length - 1;

    const stepIndexForField = (fieldName) =>
        stepSequence.findIndex(step => step.fields.includes(fieldName));

    const handleNext = async () => {
        if (isFirstStep) {
            if (pathSelection.length === 0) {
                setError('signup_path', { type: 'manual', message: 'Select at least one option to continue.' });
                return;
            }
            if (otherNeedsPlayerOrHost(pathSelection)) {
                setError('signup_path', { type: 'manual', message: 'Other must be paired with Player and/or Host — select at least one to continue.' });
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
        // venues only applies when "Other" + "Venue" is selected; it otherwise carries the
        // Location step's blank default row and shouldn't be sent.
        // "other" is a UI-only sub-role gate — it never lands in signup_path itself (the user
        // is always required to also be player and/or host), but the other_roles/other_role_detail
        // fields it unlocks still ride along in the payload.
        const { linked_toggle, profile_picture, venues, ...rest } = data;
        const rawPath = data.signup_path ?? [];
        const isVenue = rawPath.includes('other') && (data.other_roles ?? []).includes('Venue');
        const submissionData = {
            ...rest,
            signup_path: rawPath.filter((p) => p !== 'other'),
            ...(isVenue ? { venues } : {}),
        };

        const payload = new FormData();
        payload.append('data', JSON.stringify(submissionData));
        if (profile_picture?.[0]) {
            payload.append('profile_picture', profile_picture[0]);
        }

        try {

            // for (const [key, value] of payload.entries()) {
            //     console.log(`PAYLOAD ${key}:`, key === 'data' ? JSON.parse(value) : value);
            // }
            // await axios.post('http://localhost:4242/registration', payload, {
            //     headers: { Authorization: `Bearer ${session?.access_token}` },
            // });
            await submitSignUpForm(payload, session?.access_token)

            // Marks the profile complete for the navbar, and RedirectIfProfileComplete
            // then forwards the user to their new profile page.
            await refresh();
        } catch (err) {
            const field = err.response?.data?.field;
            const message = err.response?.data?.message || 'Something went wrong. Please try again.';
            console.log(field)
            
            if (isRateLimited(err)) {
                setError('root', { type: 'server', message: RATE_LIMIT_MESSAGE });
            } else if (field) {
                setError(field, { type: 'server', message });
                const targetIndex = stepIndexForField(field);
                if (targetIndex !== -1) setStepIndex(targetIndex);
            } else if (err.response?.status === 409) {
                setError('root', { type: 'email', message: "Email is already in use. Try logging in instead." });
            } else if (err.response?.status == 422) {
                const firstError = err.response.data?.detail?.[0];
                const fieldName = firstError?.loc?.at(-1);              // e.g. "username"
                const targetIndex = fieldName ? stepIndexForField(fieldName) : -1;

                if (targetIndex !== -1) {
                    // The bad field is in the form: show the message under that input and jump to its step.
                    setError(fieldName, { type: 'validation', message: firstError.msg });
                    setStepIndex(targetIndex);
                } else {
                    // No usable field: fall back to the general message under the form.
                    setError('root', {
                        type: 'validation',
                        message: firstError?.msg ?? 'Some of your information is invalid. Please check the form and try again.',
                    });
                }
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
                                    <FormButton key="continue" type="button" onClick={handleNext} label="Continue" className={styles.btnPrimary} />
                                ) : (
                                    <FormButton key="submit" type="submit" disabled={isFirstStep || isSubmitting} label={isSubmitting ? 'Submitting...' : 'Submit'} className={styles.btnPrimary} />
                                )}
                            </div>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
