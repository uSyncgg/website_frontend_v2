import { useFormContext } from "react-hook-form";
import { SelectableFormBlock } from "components/SelectableFormBlock/SelectableFormBlock";
import { FormTextInput } from "components/FormTextInput/FormTextInput";
import pathStyles from "components/MutualSignUpSteps/SignUpPathStep.module.css";
import styles from "./SettingsRoleSteps.module.css";

const OTHER_ROLE_OPTIONS = ["Coach", "Sponsor", "Team", "Viewer", "Venue", "Other"];

// Step 1 of profile settings: the same choices as sign-up's "Get Started", but roles
// the account already has (player / host) stay on - they can only be added here.
// lockedRoles: the signup_path values already saved, e.g. ['player'].
export const SettingsRolesStep = ({ lockedRoles = [] }) => {
    const { watch, setValue, formState: { errors } } = useFormContext();
    const selected = watch('signup_path') ?? [];
    const otherRoles = watch('other_roles') ?? [];
    const showOtherRoles = selected.includes('other');

    const toggle = (value) => {
        if (lockedRoles.includes(value)) return;
        setValue('signup_path', selected.includes(value)
            ? selected.filter(v => v !== value)
            : [...selected, value]);
    };

    const toggleOtherRole = (value) => {
        setValue('other_roles', otherRoles.includes(value)
            ? otherRoles.filter(v => v !== value)
            : [...otherRoles, value]);
    };

    const tile = (value, title) => {
        const locked = lockedRoles.includes(value);
        return (
            <div className={styles.roleTile}>
                {/* Every tile reserves the note's line so the bubbles stay the same size. */}
                <span className={styles.lockedNote} aria-hidden={!locked}>{locked ? 'Your current role' : ' '}</span>
                <SelectableFormBlock
                    title={title}
                    selected={selected.includes(value)}
                    onToggle={() => toggle(value)}
                    blockClassName={`${pathStyles.choice} ${locked ? styles.locked : ''}`}
                    selectedClassName={pathStyles.choiceSelected}
                />
            </div>
        );
    };

    const addingHost = selected.includes('host') && !lockedRoles.includes('host');
    const addingVenue = showOtherRoles && otherRoles.includes('Venue') && !lockedRoles.includes('venue');

    return (
        <div>
            <div className={pathStyles.choiceRow} role="group" aria-label="Your roles on uSync">
                {tile('player', 'Player')}
                {tile('host', 'Host')}
                {tile('other', 'Other')}
            </div>

            {showOtherRoles && (
                <div className={pathStyles.otherRoles}>
                    <p className={pathStyles.otherRolesLabel}>Which of these best describes you?</p>
                    <div className={pathStyles.tileRow} role="group" aria-label="Select the roles that describe you">
                        {OTHER_ROLE_OPTIONS.map(opt => (
                            <SelectableFormBlock
                                key={opt}
                                title={opt}
                                selected={otherRoles.includes(opt)}
                                onToggle={() => toggleOtherRole(opt)}
                                blockClassName={pathStyles.tile}
                                selectedClassName={pathStyles.tileSelected}
                            />
                        ))}
                    </div>

                    {otherRoles.includes('Other') && (
                        <div className={pathStyles.otherDetailInput}>
                            <FormTextInput
                                id={"other_role_detail"}
                                name={"other_role_detail"}
                                label={"Other: please specify"}
                                placeholder={"e.g. Referee"}
                                required={false}
                                disabled={false}
                                inputClassName={""}
                                errorClassName={""}
                                labelClassName={""}
                            />
                        </div>
                    )}
                </div>
            )}

            {(addingHost || addingVenue) && (
                <p className={styles.addingNote}>
                    {addingHost && addingVenue ? 'Becoming a host and a venue'
                        : addingHost ? 'Becoming a host' : 'Becoming a venue'} needs a few more details. Continue to fill them in -
                    nothing changes on your profile until you finish those steps.
                </p>
            )}

            {errors.signup_path && <span className={pathStyles.error}>{errors.signup_path.message}</span>}
        </div>
    );
};
