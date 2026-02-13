import { useLocation } from "react-router"
import { LoadingWheel } from "components";
import { Elements } from "@stripe/react-stripe-js";
import React, { useState, useEffect } from "react";
import axios from "axios";

// Production Backend: 'https://website-backend-5m32.onrender.com/usyncApp/lans'
// Testing Backend: 'http://localhost:4242/usyncApp/lans'

function Checkout() {
    const location = useLocation();
    const formData = location.state?.formData;
    const endpoint = location.state?.endpoint;

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!formData) {
            return (
                <div>
                    <h1>Payment either invalid or not provided please resubmit your form and payment.</h1>
                </div>
            )
        } else {
            console.log('bla');
            // SubmitFormData();
        }
    }, [])

    const SubmitFormData = async () => {
        try {
            const response = await axios.post(`http://localhost:4242/usyncApp/lans${endpoint}`, formData, {
                headers: { 'Content-Type': 'application/json' }
            });

            setLoading(false);
        } catch (err) {
            return (
                <div>
                    <h1>Error storing team information. Please contact usyncgg@gmail.com</h1>
                </div>
            )
        }
    }

    return (
        <React.Fragment>
            {
                loading ? <LoadingWheel /> : 
                <div>
                    <h1>SUCCESS!</h1>
                </div>
            }
        </React.Fragment>
    )

}

export default Checkout
