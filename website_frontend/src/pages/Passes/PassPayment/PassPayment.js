import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import styles from '../../Payment/GeneralPaymentForm/GeneralPaymentForm.module.css';
import paymentStyles from 'components/PaymentComponent/PaymentComponent.module.css';
import { CheckoutSteps, PaymentCart, LoadingWheel } from "components";
import { NestedPaymentComponent } from "components/PaymentComponent/NestedPaymentComponent";
import { stripeAppearance, stripeLoader } from "utils/stripeAppearance";
import { createPaymentIntent } from "services/event_registration";
import { useEventReceipt } from "hooks";
import { getApiErrorMessage } from "utils/apiError";

const STEPS = ['Registration', 'Payment', 'Confirmation'];

// Must match REGISTRATION_HOLD_MINUTES in the backend (app/services/__init__.py).
const HOLD_MINUTES = 30;
const EXPIRED_MESSAGE = 'Your reservation expired, so your pass was released. Please register again.';
const messageStyle = { textAlign: 'center', color: 'white', fontSize: '1.25rem', padding: '2rem 0' };

function PassPayment() {
    // LIVE key. Must stay inside the component (not module scope): CRA
    // bundles every page into one main.js, so a top-level call here runs on
    // every route load - including react-snap's prerender crawl of pages
    // that never render this component - and throws when the env var isn't
    // set there.
    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

    const { registrationId } = useParams();
    const location = useLocation();
    // Set by PassSelection on navigate. Missing if the buyer opened this URL directly.
    const passesPath = location.state?.passesPath || '/lans';
    const [clientSecret, setClientSecret] = useState('');
    const [total, setTotal] = useState(null);
    const [intentError, setIntentError] = useState(null);
    const [expired, setExpired] = useState(false);

    const { data: receipt } = useEventReceipt(registrationId);

    useEffect(() => {
        let cancelled = false;
        setIntentError(null);
        setExpired(false);

        createPaymentIntent({ registration_id: registrationId })
            .then((data) => {
                if (cancelled) return;
                setClientSecret(data.client_secret);
                setTotal(data.total_snapshot_cents);
            })
            .catch((err) => {
                if (cancelled) return;
                // 410: the unpaid reservation passed its hold window and the slot was released.
                if (err?.response?.status === 410) setExpired(true);
                else setIntentError(getApiErrorMessage(err));
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
                    {expired ? (
                        <div style={{ textAlign: 'center' }}>
                            <p style={messageStyle}>{EXPIRED_MESSAGE}</p>
                            <Link
                                to={passesPath}
                                className={paymentStyles.paymentButton}
                                style={{ display: 'inline-block', textDecoration: 'none' }}
                            >
                                {passesPath === '/lans' ? 'Back to events' : 'Register again'}
                            </Link>
                        </div>
                    ) : intentError ? (
                        <p style={messageStyle}>{intentError}</p>
                    ) : !clientSecret ? (
                        <LoadingWheel />
                    ) : (
                        <>
                            <p style={{ textAlign: 'center', color: 'rgba(255, 255, 255, .7)', fontSize: '.9rem', margin: '0 0 1rem' }}>
                                Your pass is reserved for {HOLD_MINUTES} minutes from registration. Complete payment before then to keep it.
                            </p>
                            <Elements options={{ clientSecret, appearance: stripeAppearance, loader: stripeLoader }} stripe={stripePromise}>
                                <NestedPaymentComponent price={total} returnUrl={returnUrl} onIntentCanceled={() => setExpired(true)} />
                            </Elements>
                        </>
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
