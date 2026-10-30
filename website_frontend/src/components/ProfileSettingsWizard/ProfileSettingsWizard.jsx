import { useMemo, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FormButton } from "components/FormButton/FormButton";
import { AccountSettingsStep } from "components/AccountSettingsStep/AccountSettingsStep";
import {
    buildStepSequence, otherNeedsPlayerOrHost,
    LOCATION_STEP, HOST_GAMES_STEP, HOST_ORG_STEP, HOST_EVENTS_STEP, PLAYER_ABOUT_STEP, PLAYER_GAMES_STEP, PLAYER_BRACKET_STEP,
} from "components/SignUpFormWizard/stepConfig";
import { SettingsRolesStep } from "components/SettingsRoleSteps/SettingsRolesStep";
import { RoleUsernameStep } from "components/SettingsRoleSteps/RoleUsernameStep";
import { useAuth, useCurrentUser } from "hooks";
import { getApiErrorMessage } from "utils/apiError";
import { updateUserSettings, updatePlayerSettings, updateHostSettings, updateProfilePicture, becomeHost, becomePlayer, checkUsername } from "services/user";
import { toFormValues, buildPayloads, sectionFields, buildHostDetails, buildPlayerDetails } from "./settingsMapping";
import styles from "components/SignUpFormWizard/SignUpFormWizard.module.css";

// Username and email live on the Account step instead, and host linked accounts aren't editable here yet.
// Player linked accounts show here (locked, "coming soon") so existing players can add links once linking launches.
const EXCLUDED_STEPS = new Set(['user_info', 'host_accounts']);

const ACCOUNT_STEP = { key: 'account', title: 'Account', subtitle: 'Change your username, or delete your account.', Component: AccountSettingsStep, fields: [], saveFields: [] };

// Step 1: which roles the account has. Player/host can only be added here; "other" roles
// (including Venue) can be changed freely.
const ROLES_STEP = { key: 'roles', title: 'Your Roles', subtitle: 'Add a role to your account. Your current roles stay on.', Component: SettingsRolesStep, fields: [], saveFields: ['other_roles', 'other_role_detail'] };

// Extra steps shown while a role is being added. Nothing is saved until the last one.
const usernameStep = (role) => ({
    key: 'role_username', title: role === 'host' ? 'Host Username' : 'Player Username',
    subtitle: role === 'host' ? 'The name players see on your host profile and events.' : 'The name other players and hosts see on your player profile.',
    Component: RoleUsernameStep, props: { role }, fields: [], saveFields: [],
});
const pending = (step, title) => ({ ...step, key: `new_${step.key}`, title: title ?? step.title, pending: true });
const NEW_VENUE_STEPS = [pending(LOCATION_STEP, 'Venue Location')];
const NEW_HOST_STEPS = [
    pending(usernameStep('host')),
    pending(HOST_GAMES_STEP),
    pending(HOST_ORG_STEP),
    pending(HOST_EVENTS_STEP),
];
// Hosts always get bracket hosting, so the Bracket Hosting step only shows for a non-host becoming a player.
const newPlayerSteps = (isHost) => [
    pending(usernameStep('player')),
    pending(PLAYER_ABOUT_STEP),
    pending(PLAYER_GAMES_STEP),
    ...(isHost ? [] : [pending(PLAYER_BRACKET_STEP)]),
];

const ROLE_NAMES = { player: 'a player', host: 'a host', venue: 'a venue' };
const joinRoles = (roles) => roles.map(r => ROLE_NAMES[r]).join(' and ');

const hasVenueRole = (path, otherRoles) => path.includes('other') && (otherRoles ?? []).includes('Venue');

// Saved in this order so a combined step's failure is predictable.
const SECTION_SAVERS = [
    ['user', updateUserSettings],
    ['player', updatePlayerSettings],
    ['host', updateHostSettings],
];

const sameValue = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// onRolesChanged: called after a role is added, so the page reloads the settings
// (and this wizard rebuilds its steps around the new roles).
export const ProfileSettingsWizard = ({ settings, notice, onRolesChanged }) => {
    const defaultValues = useMemo(() => toFormValues(settings), [settings]);
    const methods = useForm({ defaultValues, mode: 'onBlur' });
    const { trigger, getValues, setValue, resetField, setError, clearErrors, watch, formState: { errors } } = methods;
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

    // Roles as saved on the backend. The step list after Your Roles is built from these;
    // roles picked but not saved yet add their own pending steps.
    const savedPath = defaultValues.signup_path;
    const savedVenue = hasVenueRole(savedPath, defaultValues.other_roles);
    const lockedRoles = useMemo(() => savedPath.filter(r => r === 'player' || r === 'host'), [savedPath]);

    const selectedPath = watch('signup_path') ?? [];
    const selectedOther = watch('other_roles') ?? [];
    const savedHost = savedPath.includes('host');
    const addingHost = selectedPath.includes('host') && !savedHost;
    const addingPlayer = selectedPath.includes('player') && !savedPath.includes('player');
    const addingVenue = hasVenueRole(selectedPath, selectedOther) && !savedVenue;
    const addingRole = addingHost || addingPlayer || addingVenue;
    // Roles being added, in the order they're described ("a player and a venue").
    const addedRoles = [...(addingPlayer ? ['player'] : []), ...(addingHost ? ['host'] : []), ...(addingVenue ? ['venue'] : [])];

    const steps = useMemo(() => [
        ROLES_STEP,
        ...(addingVenue ? NEW_VENUE_STEPS : []),
        ...(addingHost ? NEW_HOST_STEPS : []),
        ...(addingPlayer ? newPlayerSteps(savedHost) : []),
        ...buildStepSequence(savedPath, defaultValues.other_roles)
            .slice(1)
            .filter(step => !EXCLUDED_STEPS.has(step.key)),
        ACCOUNT_STEP,
    ], [addingVenue, addingHost, addingPlayer, savedHost, savedPath, defaultValues]);

    // Your Roles plus any pending steps: you can move around inside this group freely
    // while adding a role; leaving it throws the unfinished role change away.
    const inRoleChange = (step) => step.key === ROLES_STEP.key || !!step.pending;
    const lastPendingIndex = steps.reduce((last, step, i) => (step.pending ? i : last), -1);

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

    const hasUnsavedChanges = (step) =>
        (inRoleChange(step) && addingRole) || changedFields(step).length > 0 || !!newPicture(step);

    // Puts every role-related field back to what's saved (used when abandoning a role change).
    const ROLE_CHANGE_FIELDS = ['signup_path', 'other_roles', 'other_role_detail', 'venues',
        'organization', 'host_country', 'hosted_games', 'other_hosted_games', 'event_types',
        'first_name', 'last_name', 'phone_number', 'gender', 'date_of_birth', 'country', 'interests', 'other_games', 'bracket_hosting',
        'role_username_mode', 'role_username'];

    // Leaving a step without saving puts its fields back to the saved values,
    // so stale edits can't be picked up by a later save.
    const discardChanges = (step) => {
        if (inRoleChange(step) && addingRole) {
            for (const field of ROLE_CHANGE_FIELDS) setValue(field, savedValues.current[field] ?? defaultValues[field]);
        }
        for (const field of changedFields(step)) {
            setValue(field, savedValues.current[field]);
        }
        if (newPicture(step)) resetField('profile_picture');
        clearErrors();
    };

    const goToStep = (index) => {
        if (index === stepIndex) return;
        const target = steps[index];
        // Moving between Your Roles and its pending steps keeps the role change going.
        if (addingRole && inRoleChange(currentStep) && inRoleChange(target)) {
            setStepIndex(index);
            return;
        }
        if (addingRole && inRoleChange(currentStep)) {
            if (!window.confirm('You haven\'t finished adding your new role. Leave and discard it?')) return;
            discardChanges(currentStep);
            // The pending steps disappear, so find the target again by key.
            setStepIndex(Math.max(0, stepsWithoutPending.findIndex(s => s.key === target.key)));
            return;
        }
        if (hasUnsavedChanges(currentStep)) {
            if (!window.confirm('You have unsaved changes on this step. Leave without saving?')) return;
            discardChanges(currentStep);
        }
        setStepIndex(index);
    };

    const showSaveError = (err) => {
        // FastAPI validation errors point at the bad field, e.g. ["body", "first_name"].
        const loc = err.response?.status === 422 ? err.response.data?.detail?.[0]?.loc : null;
        const field = Array.isArray(loc) ? loc.find(part => currentStep.saveFields.includes(part)) : null;

        if (field) {
            setError(field, { type: 'server', message: err.response.data.detail[0].msg });
        } else {
            setError('root', { type: 'server', message: getApiErrorMessage(err) });
        }
    };

    const saveStep = async (step) => {
        const values = getValues();
        const payloads = buildPayloads(changedFields(step), values);

        for (const [section, save] of SECTION_SAVERS) {
            if (!payloads[section]) continue;
            await save(payloads[section], token);
            // Record each section as soon as it lands, so a later failure only re-sends what didn't save.
            for (const field of sectionFields(section)) {
                if (field in payloads[section]) savedValues.current = { ...savedValues.current, [field]: values[field] };
            }
        }

        const picture = newPicture(step);
        if (picture) {
            const payload = new FormData();
            payload.append('profile_picture', picture);
            const me = await updateProfilePicture(payload, token);
            setPictureUrl(me.profile_picture);
            resetField('profile_picture');
            // Updates the navbar avatar.
            await refresh();
        }
    };

    // Step list once a role change is dropped (used to land on the right step after discarding).
    const stepsWithoutPending = steps.filter(step => !step.pending);

    // Checks the Your Roles choices themselves (mirrors sign-up's Get Started rules).
    const validateRoles = () => {
        const path = getValues('signup_path') ?? [];
        const other = getValues('other_roles') ?? [];
        if (path.length === 0) {
            setError('signup_path', { type: 'manual', message: 'Pick at least one role.' });
            return false;
        }
        if (path.includes('other') && other.length === 0) {
            setError('signup_path', { type: 'manual', message: 'Pick which other role describes you, or untick Other.' });
            return false;
        }
        if (otherNeedsPlayerOrHost(path)) {
            setError('signup_path', { type: 'manual', message: 'Other roles go with Player or Host - keep at least one of those.' });
            return false;
        }
        clearErrors('signup_path');
        return true;
    };

    // Extra checks a pending step needs before moving on.
    const validatePendingStep = async (step) => {
        const values = getValues();
        if (step.key === 'new_venue_location') {
            const complete = (values.venues ?? []).some(v => v.name.trim() && v.location.trim());
            if (!complete) {
                setError('root', { type: 'manual', message: 'Add at least one venue with a name and location.' });
                return false;
            }
        }
        if (step.key === 'new_role_username') {
            const role = step.props.role;
            const isNew = values.role_username_mode === 'new';
            const name = isNew ? values.role_username.trim() : savedUsername;
            if (!name) {
                setError('role_username', { type: 'manual', message: 'Enter a username.' });
                return false;
            }
            try {
                // A new name must be free in every role the account will have; keeping
                // your own only needs to be free in the role being added.
                await checkUsername(name, isNew
                    ? { isPlayer: settings.is_player || role === 'player', isHost: settings.is_host || role === 'host' }
                    : (role === 'host' ? { isHost: true } : { isPlayer: true }));
            } catch (err) {
                const message = err.response?.status === 409
                    ? (isNew ? 'That username is taken.' : `Another ${role} already uses your username - choose a new one.`)
                    : err.response?.data?.detail?.[0]?.msg ?? getApiErrorMessage(err);
                setError(isNew ? 'role_username' : 'root', { type: 'server', message });
                return false;
            }
        }
        return true;
    };

    // Saves the new role(s) in one go once every pending step is filled in.
    // Set once the player/host role is saved, so a retry after a later failure doesn't re-send it.
    const roleSaved = useRef(false);

    const commitRoleChange = async () => {
        const values = getValues();
        const username = values.role_username_mode === 'new' ? values.role_username.trim() : savedUsername;
        if (!roleSaved.current && addingHost) {
            await becomeHost({ username, host: buildHostDetails(values) }, token);
            roleSaved.current = true;
        }
        if (!roleSaved.current && addingPlayer) {
            await becomePlayer({ username, player: buildPlayerDetails(values) }, token);
            roleSaved.current = true;
        }

        // Other roles (Venue included), venues and bracket hosting live on the users row.
        // Hosts always have bracket hosting on.
        const willBeHost = savedHost || addingHost;
        const otherRoles = values.signup_path.includes('other') ? values.other_roles : [];
        const userValues = { ...values, other_roles: otherRoles, bracket_hosting: willBeHost ? 'yes' : values.bracket_hosting };
        const userFields = ['other_roles', 'other_role_detail', 'bracket_hosting', ...(addingVenue ? ['venues'] : [])];
        const changed = userFields.filter(f => !sameValue(userValues[f], savedValues.current[f]));
        if (changed.length) {
            await updateUserSettings(buildPayloads(changed, userValues).user, token);
        }

        await refresh();
        onRolesChanged?.(addedRoles);
    };

    const handleSaveAndNext = async () => {
        clearErrors('root');

        if (currentStep.key === ROLES_STEP.key) {
            if (!validateRoles()) return;
            if (addingRole) {
                // Don't save yet - the new role's own steps come next.
                setStepIndex(i => i + 1);
                return;
            }
            // No new role: drop "other" roles if Other was unticked, then save like any step.
            if (!getValues('signup_path').includes('other')) {
                setValue('other_roles', []);
                setValue('other_role_detail', '');
            }
        }

        if (!(await trigger(currentStep.fields))) return;

        if (currentStep.pending) {
            if (!(await validatePendingStep(currentStep))) return;
            if (stepIndex < lastPendingIndex) {
                setStepIndex(i => i + 1);
                return;
            }
            setSaving(true);
            try {
                await commitRoleChange();
            } catch (err) {
                showSaveError(err);
            } finally {
                setSaving(false);
            }
            return;
        }

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
        ...(currentStep.key === ROLES_STEP.key ? { lockedRoles: [...lockedRoles, ...(savedVenue ? ['venue'] : [])] } : {}),
        ...(currentStep.key === 'new_role_username' ? { savedUsername } : {}),
        ...(currentStep.key === 'profile_bio' ? { currentPictureUrl: pictureUrl } : {}),
        ...(isAccountStep ? {
            savedUsername,
            isPlayer: settings.is_player,
            isHost: settings.is_host,
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
                            <h3>Profile settings</h3>
                            <div className={styles.progress}><span className={styles.progressBar} style={{ width: `${progressPct}%` }} /></div>
                            <span className={styles.progressLabel}>Step {stepIndex + 1} of {steps.length}</span>

                            <ul className={styles.steps}>
                                {steps.map((step, index) => (
                                    <li key={step.key} className={styles.stepItem} data-state={index === stepIndex ? 'active' : 'upcoming'}>
                                        <button type="button" className={styles.stepButton} onClick={() => goToStep(index)}>
                                            <span className={styles.bubble}>{index + 1}</span>
                                            <span className={styles.stepLabel}>{step.title}{step.pending && <span className={styles.newTag}>New</span>}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    <div className={styles.shellMain}>
                        <div className={styles.card}>
                            {notice && <p className={styles.notice}>{notice}</p>}
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
                                        label={saving ? 'Saving...'
                                            : currentStep.key === ROLES_STEP.key && addingRole ? 'Continue'
                                            : currentStep.pending && stepIndex === lastPendingIndex
                                                ? `Save & become ${joinRoles(addedRoles)}`
                                            : currentStep.pending ? 'Continue'
                                            : 'Save & Continue'}
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
