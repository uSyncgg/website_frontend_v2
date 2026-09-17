import { FormTextInput } from "components/FormTextInput/FormTextInput";
import { FormSelectInput } from "components/FormSelectInput/FormSelectInput";
import { FormDataCheck } from "components/FormDataCheck/FormDataCheck";
import { COUNTRIES } from "data/countries";
import { useState } from "react";

// Hosts run events for a region rather than a single country, so the broad
// options are pinned above the full country list (with the US, already
// pinned, removed from the list below to avoid a duplicate entry).
const REGION_OPTIONS = [
    { label: "United States", value: "us" },
    { label: "North America", value: "north_america" },
    { label: "Europe", value: "eu" },
    { label: "LATAM", value: "latam" },
    { label: "All Regions", value: "all_regions" },
    { label: "Certain Regions", value: "certain_regions" },
];

const HOST_COUNTRY_OPTIONS = [
    ...REGION_OPTIONS,
    ...COUNTRIES.filter(c => c.value !== "us"),
];

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
                options={HOST_COUNTRY_OPTIONS}
                disabled={false}
                inputClassName={""}
                errorClassName={""}
                labelClassName={""}
            />
        </div>
    )
}