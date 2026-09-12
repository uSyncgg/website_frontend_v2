import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import styles from '../../Payment/GeneralPaymentForm/GeneralPaymentForm.module.css';
import { CheckoutSteps, PaymentCart, LoadingWheel } from "components";
import { NestedPaymentComponent } from "components/PaymentComponent/NestedPaymentComponent";
import { stripeAppearance, stripeLoader } from "utils/stripeAppearance";
import { createPaymentIntent } from "services/event_registration";
import { useEventReceipt } from "hooks";
import { getApiErrorMessage } from "utils/apiError";

const STEPS = ['Registration', 'Payment', 'Confirmation'];

function PassPayment() {
    // FOR TESTING - swap for REACT_APP_STRIPE_PK when going live
    // Must stay inside the component (not module scope): CRA bundles every
    // page into one main.js, so a top-level call here runs on every route
    // load - including react-snap's prerender crawl of pages that never
    // render this component - and throws when the env var isn't set there.
    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_TK);

    const { registrationId } = useParams();
    const [clientSecret, setClientSecret] = useState('');
    const [total, setTotal] = useState(null);
    const [intentError, setIntentError] = useState(null);

    const { data: receipt } = useEventReceipt(registrationId);

    useEffect(() => {
        let cancelled = false;
        setIntentError(null);

        createPaymentIntent({ registration_id: registrationId })
            .then((data) => {
                if (cancelled) return;
                setClientSecret(data.client_secret);
                setTotal(data.total_snapshot_cents);
            })
            .catch((err) => {
                if (!cancelled) setIntentError(getApiErrorMessage(err));
            });

        return () => { cancelled = true; };
    }, [registrationId]);

    const returnUrl = `${window.location.origin}/passes/registration/${registrationId}/receipt`;
    const pass = receipt ? receipt.price_snapshot_cents / 100 : undefined;
    const fee = receipt ? receipt.fee_snapshot_cents / 100 : undefined;

    return (
        <div className="standardContainer">
            <div className={styles.checkoutHeader}>
                <p className={styles.eyebrow}>Secure Checkout</p>
                <h1 className={styles.eventTitle}>Payment</h1>
                <CheckoutSteps active={2} steps={STEPS} />
            </div>

            <div className={styles.generalFormContainer}>
                <div className={styles.sectionOneForm}>
                    {intentError ? (
                        <p style={{ textAlign: 'center', color: 'white', fontSize: '1.25rem', padding: '2rem 0' }}>{intentError}</p>
                    ) : !clientSecret ? (
                        <LoadingWheel />
                    ) : (
                        <Elements options={{ clientSecret, appearance: stripeAppearance, loader: stripeLoader }} stripe={stripePromise}>
                            <NestedPaymentComponent price={total} returnUrl={returnUrl} />
                        </Elements>
                    )}
                </div>

                <div className={styles.sectionTwoForm}>
                    {pass !== undefined && fee !== undefined && (
                        <PaymentCart pass={pass} fee={fee} eventName={"Your Event Pass"} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default PassPayment;
