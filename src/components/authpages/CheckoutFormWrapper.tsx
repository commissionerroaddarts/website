"use client";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { checkoutService } from "@/services/checkoutService";
import { useAppDispatch, useAppSelector } from "@/store";
import { useEffect, useState } from "react";
import { setPromoCode, setEmail } from "@/store/slices/planSlice";
import PreCheckoutForm from "@/components/authpages/checkoutcomponents/PreCheckoutForm"; // Adjust path
import Confetti from "react-confetti"; // 🎉 install it via `npm i react-confetti`

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);

export default function CheckoutFormWrapper() {
  const dispatch = useAppDispatch();
  const { plan } = useAppSelector((state) => state);
  const { selectedPlan, email, promoCode } = plan;

  const [clientSecret, setClientSecret] = useState("");
  const [checkoutReady, setCheckoutReady] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const priceId =
    selectedPlan?.billingCycle === "monthly"
      ? selectedPlan?.prices?.monthly?.priceId
      : selectedPlan?.prices?.yearly?.priceId;

  useEffect(() => {
    const initCheckout = async () => {
      if (!priceId || !email || !promoCode) return;

      try {
        const clientSecret = await checkoutService({
          promoCode,
          email,
          priceId,
        });
        if (clientSecret) {
          setShowConfetti(true);
          setTimeout(() => {
            setShowConfetti(false);
          }, 5000); // Hide confetti after 5 seconds
          console.log("Client Secret:", clientSecret);
          console.log("Checkout initialized successfully:", {
            clientSecret,
            priceId,
            promoCode,
            email,
          });
          setClientSecret(clientSecret);
          setCheckoutReady(true);
        }
      } catch (error) {
        console.error("Failed to initialize checkout:", error);
      }
    };

    if (!clientSecret) initCheckout();
  }, [priceId, email, promoCode]);

  const options: StripeElementsOptions = {
    clientSecret,
  };

  const handleFormSuccess = (data: { email: string; promoCode: string }) => {
    dispatch(setEmail(data.email));
    dispatch(setPromoCode(data.promoCode));
  };

  return (
    <>
      {!checkoutReady ? (
        <PreCheckoutForm onSuccess={handleFormSuccess} />
      ) : (
        <>
          <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
          {showConfetti && <Confetti />}
        </>
      )}
    </>
  );
}
