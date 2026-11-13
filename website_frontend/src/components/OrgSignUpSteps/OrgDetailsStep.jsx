import { FormSelectInput } from "components/FormSelectInput/FormSelectInput";
import { FormTextInput } from "components/FormTextInput/FormTextInput";
import { HOST_COUNTRY_OPTIONS } from "components/HostSignUpSteps/HostOrgStep";

// An organization's details. Its name is its username (asked on the username step), so this is
// where it's based (a country or a region, like a host's) and two optional ways to reach it.
// The backend checks the website and email; a bare domain like "example.gg" gets https:// added.
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

        <FormTextInput
            id={"website"}
            required={false}
            name={"website"}
            label={"Website (optional)"}
            placeholder={"https://usync.gg"}
            disabled={false}
            inputClassName={""}
            errorClassName={""}
            labelClassName={""}
        />

        <FormTextInput
            id={"contact_email"}
            required={false}
            name={"contact_email"}
            label={"Contact email (optional, shown on your profile)"}
            placeholder={"contact@usync.gg"}
            disabled={false}
            inputClassName={""}
            errorClassName={""}
            labelClassName={""}
        />
    </div>
);
