import React, { useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import styles from './PaymentComponent.module.css';

export const NestedPaymentComponent = ({ price }) => {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [agree, setAgree] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements || !agree) {
            return;
        }

        setLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: "https://usync.gg/complete",
            },
        });

        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occured.");
        }

        setLoading(false);
    }

    const paymentOptions = {
        layout: "accordion"
    }

    return (
        <div className={`standardContainer ${styles.paymentContainer}`}>
            <form id={styles.paymentElement} className={styles.paymentForm} onSubmit={handleSubmit}>
                <PaymentElement id={styles.paymentElement} options={paymentOptions} />

                <label className={styles.paymentLabel}>
                    <input type='checkbox' checked={agree} onChange={(e) => setAgree(e.target.checked)} />{" "}
                    I acknowledge that (i) payments for tickets, registrations, and donations related to events 
                    listed on uSync.gg will be directed to the Event Organizer, (ii) uSync.gg will charge a platform fee of 5% 
                    on the total payment made to the Event Organizer; and (iii) uSync.gg is not responsible for the deliverability 
                    or quality of the Event.
                </label>

                <button disabled={loading || !stripe || !elements || !agree} id='submit' className={styles.paymentButton}>
                    <span>
                        {loading ? <div className={styles.spinner} /> : `Pay $${price / 100} now`}
                    </span>
                </button>

                {message && <div className={styles.paymentMessage}>{message}</div>}
            </form>
        </div>
    );
}