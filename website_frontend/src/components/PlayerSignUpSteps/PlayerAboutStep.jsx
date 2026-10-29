import { FormTextInput } from "components/FormTextInput/FormTextInput";
import { FormSelectInput } from "components/FormSelectInput/FormSelectInput";
import { COUNTRIES_US_FIRST } from "data/countries";
import styles from "./PlayerAboutStep.module.css";

// Matches the backend's accepted range. The value stays a "YYYY-MM-DD" string, the format
// the date input and the API both use; a JS Date would add a time and timezone that shift the day.
const MIN_BIRTH_DATE = "1900-01-01";
// en-CA formats as YYYY-MM-DD in the user's local time (toISOString would use UTC and can be a day off).
const todayIso = () => new Date().toLocaleDateString("en-CA");

export const PlayerAboutStep = () => {
    return (
        <div className={styles.grid}>
            <FormTextInput 
                id={"first_name"}
                required={true}
                name={"first_name"}
                placeholder={"John"}
                label={"Enter your first name"}
                disabled={false}
                inputClassName={""}
                errorClassName={""}
                labelClassName={""}
            />

            <FormTextInput 
                id={"last_name"}
                required={true}
                name={"last_name"}
                placeholder={"Smith"}
                label={"Enter your last name"}
                disabled={false}
                inputClassName={""}
                errorClassName={""}
                labelClassName={""}
            />

            <FormTextInput 
                id={"phone_number"}
                required={false}
                name={"phone_number"}
                placeholder={"+1 (123)-456-7890"}
                label={"Enter your phone number"}
                disabled={false}
                inputClassName={""}
                errorClassName={""}
                labelClassName={""}
            />

            <FormSelectInput
                id={"gender"}
                required={false}
                name={"gender"}
                label={"Gender"}
                placeholder={"Select your gender"}
                options={[
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                    { label: "Other", value: "other" },
                ]}
                disabled={false}
                inputClassName={""}
                errorClassName={""}
                labelClassName={""}
            />

            <FormTextInput
                id={"date_of_birth"}
                required={false}
                name={"date_of_birth"}
                label={"Enter your birthday"}
                disabled={false}
                type={"date"}
                min={MIN_BIRTH_DATE}
                max={todayIso()}
                inputClassName={""}
                errorClassName={""}
                labelClassName={""}
            />

            <FormSelectInput
                id={"country"}
                required={false}
                name={"country"}
                label={"Country"}
                placeholder={"Select your country"}
                options={COUNTRIES_US_FIRST}
                disabled={false}
                inputClassName={""}
                errorClassName={""}
                labelClassName={""}
            />
        </div>
    )
}