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
    const eventName = location.state?.eventName;

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        // Test Link: "http://localhost:4242/usyncPayments/generalPayment"
        // Live Link: "https://website-backend-5m32.onrender.com/usyncPayments/generalPayment"
        fetch("https://website-backend-5m32.onrender.com/usyncPayments/generalPayment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: [{ id: id, amount: price, formData: formData, formType: formType, eventName: eventName }] }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);

    const appearance = {
        theme: 'night',
        variables: {
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            fontWeightNormal: '500',
            borderRadius: '10px',
            colorBackground: 'rgb(21, 19, 26)',
            colorPrimary: '#8e6ace',
            accessibleColorOnColorPrimary: 'white',
            colorText: 'white',
            colorTextSecondary: 'rgb(170, 166, 178)',
            colorTextPlaceholder: 'rgba(255, 255, 255, 0.35)',
            colorDanger: '#f28ba8',
            tabIconColor: 'rgb(170, 166, 178)',
            tabIconSelectedColor: '#8e6ace',
            logoColor: 'light'
        },
        rules: {
            '.Input': {
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: 'none'
            },
            '.Input:focus': {
                border: '1px solid #8e6ace',
                boxShadow: '0 0 0 3px rgba(142, 106, 206, 0.18)'
            },
            '.Tab': {
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
            },
            '.Tab:hover': {
                border: '1px solid rgba(255, 255, 255, 0.25)'
            },
            '.Tab--selected': {
                backgroundColor: 'rgba(142, 106, 206, 0.12)',
                border: '1px solid #8e6ace'
            },
            '.Label': {
                color: 'rgba(255, 255, 255, 0.85)',
                fontWeight: '600'
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
