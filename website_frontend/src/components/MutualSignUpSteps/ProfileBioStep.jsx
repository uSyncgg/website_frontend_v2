import { FormTextArea } from "components/FormTextArea/FormTextArea";
import { FormPFPUpload } from "components/FormPFPUpload/FormPFPUpload";

export const ProfileBioStep = () => {
    return (
        <div>
            <FormPFPUpload
                id={"profile_picture"}
                name={"profile_picture"}
                label={"Upload a Profile Picture"}
                required={false}
                inputClassName={""}
                labelClassName={""}
                errorClassName={""}
            />

            <FormTextArea
                id={"bio"}
                name={"bio"}
                required={false}
                label={"Short Bio"}
                maxLength={500}
                disabled={false}
                labelClassName={""}
                errorClassName={""}
                inputClassName={""}
                counterClassName={""}
            />
        </div>
    )
}