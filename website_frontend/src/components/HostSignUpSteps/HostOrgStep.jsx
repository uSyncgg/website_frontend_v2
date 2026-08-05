import { FormTextInput } from "components/FormTextInput/FormTextInput";
import { FormSelectInput } from "components/FormSelectInput/FormSelectInput";
import { FormDataCheck } from "components/FormDataCheck/FormDataCheck";
import { useState } from "react";

export const HostOrgStep = () => {
    const [organizationTaken, setOrganizationTaken] = useState("");

    const checkOrganizationAvailability = async (value) => {
        if (!value) {
            setOrganizationTaken("");
            return;
        }

        const result = await FormDataCheck({ // NOTE: this needs to be updated to supabase interaction, this is on the sunset mongodb interaction
            endpoint: "review/organization-availability",
            formData: { organization: value },
            collectionName: "",
        });

        setOrganizationTaken(result.success ? "" : value);
    };

    return (
        <div>
            <FormTextInput
                id={"organization"}
                name={"organization"}
                placeholder={"uSync"}
                required={true}
                label={"Organization Name"}
                taken={organizationTaken}
                onFieldBlur={checkOrganizationAvailability}
                disabled={false}
                inputClassName={""}
                errorClassName={""}
                labelClassName={""}
            />

            <FormSelectInput
                id={"host_country"}
                required={false}
                name={"host_country"}
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