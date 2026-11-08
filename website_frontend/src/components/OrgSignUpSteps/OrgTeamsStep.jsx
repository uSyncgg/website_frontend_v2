import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { FormButton } from "components/FormButton/FormButton";
import styles from "components/MutualSignUpSteps/LocationStep.module.css";
import own from "./OrgTeamsStep.module.css";

const EMPTY_TEAM = { name: '', game: '' };

// Optional teams to create along with the org (org_teams). Blank rows are ignored on submit,
// so skipping this step is fine. Players are invited later, once the teams exist.
export const OrgTeamsStep = () => {
    const { control, register } = useFormContext();
    const { fields, append, remove } = useFieldArray({ control, name: "org_teams" });
    const orgGames = (useWatch({ name: "org_games" }) ?? []).filter(g => g !== 'Other');

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
                    {orgGames.length > 0 && (
                        <>
                            <label className={own.label} htmlFor={`org_teams.${index}.game`}>Game</label>
                            <select id={`org_teams.${index}.game`} className={own.input} {...register(`org_teams.${index}.game`)}>
                                <option value="">Any / not set</option>
                                {orgGames.map(game => <option key={game} value={game}>{game}</option>)}
                            </select>
                        </>
                    )}
                </div>
            ))}

            <FormButton type="button" onClick={() => append(EMPTY_TEAM)} label="+ Add a team" className={own.addBtn} />
        </div>
    );
};
