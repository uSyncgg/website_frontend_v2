import { useFormContext, useFieldArray } from "react-hook-form";
import { FormTextInput } from "components/FormTextInput/FormTextInput";
import { FormButton } from "components/FormButton/FormButton";
import styles from "./LocationStep.module.css";

export const LocationStep = () => {
    const { control } = useFormContext();
    const { fields, append, remove } = useFieldArray({ control, name: "venues" });

    return (
        <div>
            {fields.map((field, index) => (
                <div key={field.id} className={styles.venueCard}>
                    <div className={styles.venueHeader}>
                        <span className={styles.venueLabel}>Venue {index + 1}</span>
                        {fields.length > 1 && (
                            <button
                                type="button"
                                className={styles.removeBtn}
                                onClick={() => remove(index)}
                                aria-label={`Remove venue ${index + 1}`}
                            >
                                Remove
                            </button>
                        )}
                    </div>

                    <FormTextInput
                        id={`venues.${index}.name`}
                        name={`venues.${index}.name`}
                        label={"Venue Name"}
                        placeholder={"uSync Arena"}
                        required={false}
                        disabled={false}
                        inputClassName={""}
                        errorClassName={""}
                        labelClassName={""}
                    />

                    <FormTextInput
                        id={`venues.${index}.location`}
                        name={`venues.${index}.location`}
                        label={"Venue Location"}
                        placeholder={"123 Main St, Austin, TX"}
                        required={false}
                        disabled={false}
                        inputClassName={""}
                        errorClassName={""}
                        labelClassName={""}
                    />
                </div>
            ))}

            <FormButton
                type="button"
                onClick={() => append({ name: "", location: "" })}
                label="+ Add another location"
                className={styles.addBtn}
            />
        </div>
    )
}
