import styles from './PaymentForm.module.css';
import React from 'react';
import { useNavigate } from 'react-router';

export const FormSubmission = ({ review, disabled }) => {
    const navigate = useNavigate();

    const goBack = () => {
        // sessionStorage.setItem('formData', JSON.stringify(data));

        navigate('/paymentform');
    }

    return (
        <React.Fragment>
            {review ? (
                <React.Fragment>
                    <button type="button" onClick={goBack} className={styles.formEditButton}>Edit</button>
                    <button type="submit" className={styles.formButton} disabled={disabled}>Go to Payment</button>
                </React.Fragment>
            ) : (
                <button type="submit" className={styles.formButton}>Go to Review</button>
            )}
        </React.Fragment>
    )
}
