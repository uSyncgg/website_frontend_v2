import { PaymentComponent } from 'components';

// PLEASE NOTE THIS IS A PAGE FOR TESTING NOT PRODUCTION

function Payment() {

    return (
        <div className="standardContainer">
            <PaymentComponent id={"test_env"} price={2625} />
        </div>
    );
}

export default Payment;
