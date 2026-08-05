import { FormTextInput } from "components/FormTextInput/FormTextInput";
import { FormSelectInput } from "components/FormSelectInput/FormSelectInput";

export const PlayerAboutStep = () => {
    return (
        <div>
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
                options={[
                    { label: "United States of America", value: "us" },
                    { label: "Mexico", value: "mx" },
                    { label: "Other", value: "other" },
                ]}
                disabled={false}
                inputClassName={""}
                errorClassName={""}
                labelClassName={""}
            />
        </div>
    )
}