import { useMemo, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormButton } from "components/FormButton/FormButton";
import { AccountSettingsStep } from "components/AccountSettingsStep/AccountSettingsStep";
import { buildSettingsSteps } from "components/SignUpFormWizard/stepConfig";
import { useAuth, useCurrentUser } from "hooks";
import { getApiErrorMessage } from "utils/apiError";
import { PROFILE_LABELS } from "utils/profiles";
import { toFormValues, buildProfileUpdate } from "utils/profileForm";
import { updateProfileSettings, updateProfilePicture } from "services/user";
import styles from "components/SignUpFormWizard/SignUpFormWizard.module.css";

const ACCOUNT_STEP = { key: 'account', title: 'Account', subtitle: "Change this profile's username, make it your default, or delete your account.", Component: AccountSettingsStep, fields: [], saveFields: [] };

const sameValue = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// Edits one profile (settings is GET /me/profiles/{type}). Each step saves only its own changed
// fields with one PATCH. The parent remounts this (key) when switching to another profile.
export const ProfileSettingsWizard = ({ settings }) => {
    const type = settings.type;
    const defaultValues = useMemo(() => toFormValues(settings), [settings]);
    const methods = useForm({ defaultValues, mode: 'onBlur' });
    const { trigger, getValues, setValue, resetField, setError, clearErrors, formState: { errors } } = methods;
    const { session } = useAuth();
    const { refresh } = useCurrentUser();
    const token = session?.access_token;

    const [stepIndex, setStepIndex] = useState(0);
    const [saving, setSaving] = useState(false);
    const [savedUsername, setSavedUsername] = useState(settings.username);
    const [pictureUrl, setPictureUrl] = useState(settings.profile_picture);

    // The values the backend currently holds. Compared against the form to find unsaved
    // changes; react-hook-form's dirtyFields can't be used because several step components
    // call setValue without shouldDirty.
    const savedValues = useRef(defaultValues);

    // A profile's type never changes, so neither does its step list.
    const steps = useMemo(() => [...buildSettingsSteps(type), ACCOUNT_STEP], [type]);

    const currentStep = steps[stepIndex];
    const isAccountStep = currentStep.key === ACCOUNT_STEP.key;

    const changedFields = (step) => {
        const values = getValues();
        return step.saveFields.filter(field =>
            field !== 'profile_picture' && !sameValue(values[field], savedValues.current[field])
        );
    };

    const newPicture = (step) =>
        step.saveFields.includes('profile_picture') ? getValues('profile_picture')?.[0] ?? null : null;

    const hasUnsavedChanges = (step) => changedFields(step).length > 0 || !!newPicture(step);

    // Leaving a step without saving puts its fields back to the saved values,
    // so stale edits can't be picked up by a later save.
    const discardChanges = (step) => {
        for (const field of changedFields(step)) {
            setValue(field, savedValues.current[field]);
        }
        if (newPicture(step)) resetField('profile_picture');
        clearErrors();
    };

    const goToStep = (index) => {
        if (index === stepIndex) return;
        if (hasUnsavedChanges(currentStep)) {
            if (!window.confirm('You have unsaved changes on this step. Leave without saving?')) return;
            discardChanges(currentStep);
        }
        setStepIndex(index);
    };

    const showSaveError = (err) => {
        // FastAPI validation errors point at the bad field, e.g. ["body", "details", "first_name"].
        const loc = err.response?.status === 422 ? err.response.data?.detail?.[0]?.loc : null;
        const field = Array.isArray(loc) ? loc.find(part => currentStep.saveFields.includes(part)) : null;

        if (field && field !== 'venues') {
            setError(field, { type: 'server', message: err.response.data.detail[0].msg });
        } else {
            setError('root', { type: 'server', message: getApiErrorMessage(err) });
        }
    };

    const saveStep = async (step) => {
        const values = getValues();
        const changed = changedFields(step);
        const update = buildProfileUpdate(type, changed, values);

        if (update) {
            await updateProfileSettings(type, update, token);
            savedValues.current = { ...savedValues.current, ...Object.fromEntries(changed.map(field => [field, values[field]])) };
        }

        const picture = newPicture(step);
        if (picture) {
            const payload = new FormData();
            payload.append('profile_picture', picture);
            const saved = await updateProfilePicture(type, payload, token);
            setPictureUrl(saved.profile_picture);
            resetField('profile_picture');
            // Updates the navbar avatar and switcher.
            await refresh();
        }
    };

    const handleSaveAndNext = async () => {
        clearErrors('root');
        if (!(await trigger(currentStep.fields))) return;

        setSaving(true);
        try {
            await saveStep(currentStep);
            setStepIndex(i => Math.min(i + 1, steps.length - 1));
        } catch (err) {
            showSaveError(err);
        } finally {
            setSaving(false);
        }
    };

    const handleUsernameSaved = (username) => {
        setSavedUsername(username);
        savedValues.current = { ...savedValues.current, username };
    };

    // Enter in a text field would otherwise submit the form.
    const guardEnterKey = (e) => {
        if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
            e.preventDefault();
        }
    };

    const stepProps = {
        ...(currentStep.props ?? {}),
        ...(currentStep.key === 'profile_bio' ? { currentPictureUrl: pictureUrl } : {}),
        ...(isAccountStep ? {
            type,
            savedUsername,
            isDefault: settings.is_default,
            onUsernameSaved: handleUsernameSaved,
        } : {}),
    };

    const progressPct = Math.round((stepIndex / Math.max(1, steps.length - 1)) * 100);

    return (
        <div className={styles.page}>
            <FormProvider {...methods}>
                <form onSubmit={(e) => e.preventDefault()} onKeyDown={guardEnterKey} className={styles.shell}>
                    <aside className={styles.shellSide}>
                        <div className={styles.sidebar}>
                            <h3>{PROFILE_LABELS[type]} profile</h3>
                            <div className={styles.progress}><span className={styles.progressBar} style={{ width: `${progressPct}%` }} /></div>
                            <span className={styles.progressLabel}>Step {stepIndex + 1} of {steps.length}</span>

                            <ul className={styles.steps}>
                                {steps.map((step, index) => (
                                    <li key={step.key} className={styles.stepItem} data-state={index === stepIndex ? 'active' : 'upcoming'}>
                                        <button type="button" className={styles.stepButton} onClick={() => goToStep(index)}>
                                            <span className={styles.bubble}>{index + 1}</span>
                                            <span className={styles.stepLabel}>{step.title}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    <div className={styles.shellMain}>
                        <div className={styles.card}>
                            <p className={styles.eyebrow}>Step {stepIndex + 1} of {steps.length}</p>
                            <h1 className={styles.stepTitle}>{currentStep.title}</h1>
                            {currentStep.subtitle && <p className={styles.stepSub}>{currentStep.subtitle}</p>}

                            <currentStep.Component {...stepProps} />

                            {errors.root && <span className={styles.errorRoot}>{errors.root.message}</span>}

                            <div className={styles.stepFooter}>
                                {stepIndex > 0 && (
                                    <FormButton type="button" onClick={() => goToStep(stepIndex - 1)} label="Back" className={styles.btnSecondary} />
                                )}

                                {!isAccountStep && (
                                    <FormButton
                                        type="button"
                                        onClick={handleSaveAndNext}
                                        disabled={saving}
                                        label={saving ? 'Saving...' : 'Save & Continue'}
                                        className={styles.btnPrimary}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};
