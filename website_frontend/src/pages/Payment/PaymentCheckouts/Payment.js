import { CheckoutSteps } from 'components';
import { useLocation, useNavigate } from 'react-router';
import styles from '../GeneralPaymentForm/GeneralPaymentForm.module.css';
import { FaArrowLeft } from 'react-icons/fa';
import { lazy, Suspense } from 'react';

const PaymentComponent = lazy(() => import('components/PaymentComponent/PaymentComponent').then(p => ({ default: p.PaymentComponent })));

// PLEASE NOTE THIS IS A PAGE FOR TESTING NOT PRODUCTION

function Payment() {
    const location = useLocation();

    return (
        <div className="standardContainer">
            <PaymentComponent id={location.state?.id} price={location.state?.price} />
        </div>
    );
}

export default Payment;
