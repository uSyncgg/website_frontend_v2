import { CheckoutSteps } from 'components';
import { useLocation, useNavigate } from 'react-router';
import styles from '../GeneralPaymentForm/GeneralPaymentForm.module.css';
import { FaArrowLeft } from 'react-icons/fa';
import { lazy, Suspense } from 'react';

const PaymentComponent = lazy(() => import('components/PaymentComponent/PaymentComponent').then(p => ({ default: p.PaymentComponent })));

// PLEASE NOTE THIS IS A PAGE FOR TESTING NOT PRODUCTION

function Payment() {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className="standardContainer">
            <div className={styles.checkoutHeader}>
                <button type="button" className={styles.backButton} onClick={() => navigate(-1)}>
                    <FaArrowLeft /> Back
                </button>
                <p className={styles.eyebrow}>Secure Checkout</p>
                <h1 className={styles.eventTitle}>{location.state?.eventName || 'Complete Your Payment'}</h1>
                <CheckoutSteps active={3} />
            </div>

            <PaymentComponent id={location.state?.id} price={location.state?.price} />
        </div>
    );
}

export default Payment;
