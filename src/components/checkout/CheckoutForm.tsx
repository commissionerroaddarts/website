// components/CheckoutForm.js

import React, { useState } from "react";
import { PaymentElement, useStripe, useElements  } from "@stripe/react-stripe-js";


const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage("");
        setIsLoading(true);

        if (!stripe || !elements) {
            console.warn("Stripe.js has not yet loaded.");
            return;
        }


        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/return`,
                // receipt_email: email,
            },
        });

        if (result.error) {
            setMessage(result.error.message + "");
        }

        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: "0 auto" }}>
        

            <PaymentElement />
            <button disabled={isLoading || !stripe || !elements} 
            style={{
                width: "100%",
                marginTop: 16,
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '600',
                color: '#fff',
                backgroundColor: isLoading ? '#a0aec0' : '#635bff',
                border: 'none',
                borderRadius: '6px',
                cursor: isLoading || !stripe || !elements ? 'not-allowed' : 'pointer',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                transition: 'background-color 0.3s ease',
              }}>
                {isLoading ? "Processing…" : "Pay now"}
            </button>

            {message && <p>{message}</p>}
        </form>
    );
};

export default CheckoutForm;
