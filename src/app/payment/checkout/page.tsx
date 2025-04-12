// pages/checkout.js
"use client"

import React, { useEffect, useState } from "react";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { createCheckoutSession } from "@/services/checkoutService";
import CheckoutForm from "@/components/checkout/CheckoutForm";

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



  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "flat",
      variables: {
        colorPrimaryText: "#262626",
      },
    }
  };

  return (
    <div>
      

      


      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      )}






    </div>
  );
};

export default CheckoutPage;
