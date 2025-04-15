"use client";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { createCheckoutSession } from "@/services/checkoutService";
import { useEffect, useState } from "react";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { useAppState } from "@/hooks/useAppState";

// Load your Stripe public key
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);

export default function CheckoutFormWrapper() {
  const { plan } = useAppState(); // Assuming you have a plan object in your Redux store
  const { selectedPlan, promoCode } = plan; // Get the selected plan from Redux store
  const priceId = selectedPlan?.priceId; // Get the price ID from the selected plan
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (!priceId) return;

    const initCheckout = async () => {
      try {
        const { clientSecret } = await createCheckoutSession(
          priceId,
          promoCode
        );
        setClientSecret(clientSecret);
      } catch (error) {
        console.error("Failed to initialize checkout:", error);
      }
    };

    initCheckout();
  }, [priceId]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "flat",
      variables: {
        colorPrimaryText: "#262626",
      },
    },
  };

  return (
    <>
      {clientSecret && (
        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </>
  );
}
