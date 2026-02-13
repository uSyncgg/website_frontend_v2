import { useForm, FormProvider } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { RequiredLabel, RegularLabel } from "./FormLabels";
import { FormTextInput } from "./FormTextInput";
import { FormSubmission } from "./FormSubmission";
import styles from './PaymentForm.module.css'

export const PaymentForm = ({ children, review, formType, reviewEndpoint, id, price }) => {
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

        if (review) {
            navigate('/payment', {state: { formData: data, formType: formType, reviewEndpoint: reviewEndpoint, id: id, price: price } });
        } else {
            navigate('/paymentform/review', {state: { formData: data, formType: formType, reviewEndpoint: reviewEndpoint, id: id, price: price } });
        }
    }

    return (
        <FormProvider {...methods}>
            <h1 className={styles.formTitle}>Submit Your Team Info</h1>
            <div className={styles.formContainer}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    {children}
                </form>
            </div>
        </FormProvider>
    )
}

PaymentForm.RequiredLabel = RequiredLabel;
PaymentForm.RegularLabel = RegularLabel;
PaymentForm.TextInput = FormTextInput;
PaymentForm.Submission = FormSubmission;