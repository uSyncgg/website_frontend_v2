import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { FormButton } from "components/FormButton/FormButton";
import { GamesPicker } from "components/Teams/TeamParts";
import styles from "components/MutualSignUpSteps/LocationStep.module.css";
import own from "./OrgTeamsStep.module.css";

const EMPTY_TEAM = { name: '', games: [] };

// Optional teams to create along with the org (org_teams). Blank rows are ignored on submit,
// so skipping this step is fine. A named team plays at least one game (the supported games, by
// key). Players are invited later, once the teams exist.
export const OrgTeamsStep = () => {
    const { control, register, getValues, formState: { errors } } = useFormContext();
    const { fields, append, remove } = useFieldArray({ control, name: "org_teams" });

    return (
        <div>
            {fields.length === 0 && <p className={own.empty}>No teams yet. Add one now, or skip this and create teams from your profile later.</p>}

            {fields.map((field, index) => (
                <div key={field.id} className={styles.venueCard}>
                    <div className={styles.venueHeader}>
                        <span className={styles.venueLabel}>Team {index + 1}</span>
                        <button type="button" className={styles.removeBtn} onClick={() => remove(index)} aria-label={`Remove team ${index + 1}`}>
                            Remove
                        </button>
                    </div>
                    <label className={own.label} htmlFor={`org_teams.${index}.name`}>Team name</label>
                    <input
                        id={`org_teams.${index}.name`}
                        className={own.input}
                        placeholder="e.g. Static Black"
                        maxLength={40}
                        {...register(`org_teams.${index}.name`)}
                    />
                    <span className={own.label}>Games</span>
                    <Controller
                        control={control}
                        name={`org_teams.${index}.games`}
                        rules={{
                            validate: (games) => !getValues(`org_teams.${index}.name`)?.trim() || (games?.length > 0) || 'Pick at least one game this team plays.',
                        }}
                        render={({ field: { value, onChange } }) => <GamesPicker id={`org_teams.${index}.games`} value={value ?? []} onChange={onChange} />}
                    />
                    {errors.org_teams?.[index]?.games && <p className={own.empty} role="alert">{errors.org_teams[index].games.message}</p>}
                </div>
            ))}

            <FormButton type="button" onClick={() => append(EMPTY_TEAM)} label="+ Add a team" className={own.addBtn} />
        </div>
    );
};
