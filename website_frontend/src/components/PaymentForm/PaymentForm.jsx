import { useForm, FormProvider } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { RequiredLabel } from "./RequiredLabel";
import { FormTextInput } from "./FormTextInput";
import { FormSubmission } from "./FormSubmission";
import styles from './PaymentForm.module.css'

export const PaymentForm = ({ children }) => {
    const methods = useForm();
    const navigate = useNavigate();

    useEffect(() => {
        const savedData = sessionStorage.getItem("formData");

        if (savedData) {
            methods.reset(JSON.parse(savedData));
        }
    }, [methods]);

    const onSubmit = (data) => {
        sessionStorage.setItem('formData', JSON.stringify(data));

        navigate('/checkout', {state: { formData: data } });
    }

    return (
        <FormProvider {...methods}>
            <h1>Submit Your Team Info</h1>
            <div className={styles.formContainer}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    {children}
                </form>
            </div>
        </FormProvider>
    )
}

PaymentForm.RequiredLabel = RequiredLabel;
PaymentForm.TextInput = FormTextInput;
PaymentForm.Submission = FormSubmission;