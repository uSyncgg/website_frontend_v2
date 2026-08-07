import { CheckoutSteps } from 'components/CheckoutSteps/CheckoutSteps';
import { PaymentComponent } from 'components/PaymentComponent/PaymentComponent';
import { SeoData } from 'components/SeoData/SeoData';
import { useLocation, useNavigate } from 'react-router';
import styles from '../GeneralPaymentForm/GeneralPaymentForm.module.css';
import { FaArrowLeft } from 'react-icons/fa';

// PLEASE NOTE THIS IS A PAGE FOR TESTING NOT PRODUCTION

function Payment() {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className="standardContainer">
            <SeoData
                title={"Complete Your Payment"}
                description="Securely complete your uSync event payment."
                canonicalPath={"/payment"}
                robots={"noindex, nofollow"}
            />
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
