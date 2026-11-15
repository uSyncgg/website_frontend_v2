import { FormSelectInput } from "components/FormSelectInput/FormSelectInput";
import { HOST_COUNTRY_OPTIONS } from "components/HostSignUpSteps/HostOrgStep";

// Where an organization is based: a region (North America, LATAM...) or a country, like a
// host's. Its name is asked once, on the username step.
export const OrgDetailsStep = () => (
    <div>
        <FormSelectInput
            id={"org_country"}
            required={true}
            name={"org_country"}
            label={"Country or region"}
            placeholder={"Select your country or region"}
            options={HOST_COUNTRY_OPTIONS}
            disabled={false}
            inputClassName={""}
            errorClassName={""}
            labelClassName={""}
        />
    </div>
);
