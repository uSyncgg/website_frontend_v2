import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { NestedPaymentComponent } from './NestedPaymentComponent';
import { useLocation } from 'react-router';

export const PaymentComponent = ({ id, price }) => {
    // FOR LIVE
    // const stripePublicKey = process.env.REACT_APP_STRIPE_PK;
    // const stripePromise = loadStripe(stripePublicKey);

    // FOR TESTING
    const stripePublicTestKey = process.env.REACT_APP_STRIPE_TK; 
    const stripePromise = loadStripe(stripePublicTestKey);

    // BELOW IS FOR STRIPE PAYMENTS, DO NOT REMOVE DO NOT UNCOMMENT
    const [clientSecret, setClientSecret] = useState("");

    // Test Credit Card - 4242 4242 4242 4242 with any 3 digit svc and any valid date
    const location = useLocation();
    const formData = location.state?.formData;
    const formType = location.state?.formType;

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        // Test Link: "http://localhost:4242/usyncPayments/generalPayment"
        // Live Link: "https://website-backend-5m32.onrender.com/usyncPayments/generalPayment"
        fetch("http://localhost:4242/usyncPayments/generalPayment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: [{ id: id, amount: price, formData: formData, formType: formType }] }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);

    const appearance = {
        theme: 'night',
        variables: {
            fontFamily: 'Sohne, system-ui, sans-serif',
            fontWeightNormal: '500',
            borderRadius: '8px',
            colorBackground: 'rgb(0,0,0)',
            colorPrimary: 'white',
            accessibleColorOnColorPrimary: 'white',
            colorText: 'white',
            colorTextSecondary: 'white',
            colorTextPlaceholder: '#ABB2BF',
            tabIconColor: 'white',
            logoColor: 'dark'
        },
        rules: {
            '.Input': {
            backgroundColor: 'rgb(93, 66, 133)',
            border: '1px solid var(--colorPrimary)'
            }
        }
    };

    // Enable the skeleton loader UI for optimal loading.
    const loader = 'auto';

    return (
        <React.Fragment>
            {clientSecret && (
                <Elements options={{clientSecret, appearance, loader}} stripe={stripePromise}>
                    <NestedPaymentComponent price={price} />
                </Elements>
            )}
        </React.Fragment>
    );
}
