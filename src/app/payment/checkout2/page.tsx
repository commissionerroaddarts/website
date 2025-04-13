// pages/checkout.js
"use client"

import React, { useEffect, useState } from "react";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from "@stripe/react-stripe-js";
import { createCheckoutSession } from "@/services/checkoutService";

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);


const CheckoutPage = () => {
    const priceId = "price_1RBudDFPgpuDm99R5rM1lpr4"; // Replace with your price ID

    const [clientSecret, setClientSecret] = useState("");
    
      const [promocode, setPromocode] = useState("");

    useEffect(() => {
        if (!priceId) return;

        const initCheckout = async () => {
            try {
                const { clientSecret } = await createCheckoutSession(priceId, promocode);
                setClientSecret(clientSecret);
            } catch (error) {
                console.error("Failed to initialize checkout:", error);
            }
        }

        initCheckout();

    }, [priceId]);



    const options: any = {
        clientSecret,
        // appearance: {
        //     theme: "flat",
        //     variables: {
        //         colorPrimaryText: "#262626",
        //     },
        // }
    };

    return (
        <div >
            {clientSecret && (
                <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
                    {/* <CheckoutForm /> */}
                    <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
            )}
        </div>
    );
};

export default CheckoutPage;
