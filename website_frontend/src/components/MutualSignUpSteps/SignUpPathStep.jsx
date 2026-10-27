import { SelectableFormBlock } from "components/SelectableFormBlock/SelectableFormBlock";
import { FormTextInput } from "components/FormTextInput/FormTextInput";
import { useFormContext } from "react-hook-form";
import styles from "./SignUpPathStep.module.css";

const OTHER_ROLE_OPTIONS = ["Coach", "Sponsor", "Team", "Viewer", "Venue", "Other"];

export const SignUpPathStep = () => {
    const { watch, setValue, formState: { errors } } = useFormContext();
    const selected = watch('signup_path') ?? [];
    const otherRoles = watch('other_roles') ?? [];
    const showOtherRoles = selected.includes('other');
    const otherRoleDetailSelected = otherRoles.includes('Other');

    const toggle = (value) => {
        setValue('signup_path', selected.includes(value)
            ? selected.filter(v => v !== value)
            : [...selected, value]
        );
    };

    const toggleOtherRole = (value) => {
        setValue('other_roles', otherRoles.includes(value)
            ? otherRoles.filter(v => v !== value)
            : [...otherRoles, value]
        );
    };

    return (
        <div>
            <div className={styles.choiceRow} role="group" aria-label="Select how you plan to use uSync">
                <SelectableFormBlock
                    title="Player"
                    selected={selected.includes('player')}
                    onToggle={() => toggle('player')}
                    blockClassName={styles.choice}
                    selectedClassName={styles.choiceSelected}
                />
                <SelectableFormBlock
                    title="Host"
                    selected={selected.includes('host')}
                    onToggle={() => toggle('host')}
                    blockClassName={styles.choice}
                    selectedClassName={styles.choiceSelected}
                />
                <SelectableFormBlock
                    title="Other"
                    selected={selected.includes('other')}
                    onToggle={() => toggle('other')}
                    blockClassName={styles.choice}
                    selectedClassName={styles.choiceSelected}
                />
            </div>

            {showOtherRoles && (
                <div className={styles.otherRoles}>
                    <p className={styles.otherRolesLabel}>Which of these best describes you?</p>
                    <div className={styles.tileRow} role="group" aria-label="Select the roles that describe you">
                        {OTHER_ROLE_OPTIONS.map(opt => (
                            <SelectableFormBlock
                                key={opt}
                                title={opt}
                                selected={otherRoles.includes(opt)}
                                onToggle={() => toggleOtherRole(opt)}
                                blockClassName={styles.tile}
                                selectedClassName={styles.tileSelected}
                            />
                        ))}
                    </div>

                    {otherRoleDetailSelected && (
                        <div className={styles.otherDetailInput}>
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

            {errors.signup_path && <span className={styles.error}>{errors.signup_path.message}</span>}
        </div>
    )
}
