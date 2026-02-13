import { PaymentComponent } from 'components';
import { useLocation } from 'react-router';

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
