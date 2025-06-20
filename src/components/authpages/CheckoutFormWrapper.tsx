"use client";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { checkoutService } from "@/services/checkoutService";
import { useState } from "react";
import PreCheckoutForm from "@/components/authpages/PreCheckoutForm"; // Adjust path
import Confetti from "react-confetti"; // 🎉 install it via `npm i react-confetti`
import { useAppState } from "@/hooks/useAppState";
import { useAppDispatch } from "@/store";
import { setEmail, setPromoCode } from "@/store/slices/planSlice";

const isProduction = process.env.NEXT_PUBLIC_ENV === "production";

const stripePromise = loadStripe(
  isProduction
    ? process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
    : process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_TEST_KEY ?? ""
);

console.log(isProduction, stripePromise);

export default function CheckoutFormWrapper() {
  const { plan, user } = useAppState(); // Assuming you have a custom hook to get user state
  const { isLoggedIn, userDetails } = user;
  const { email: userEmail } = userDetails || {};
  const { selectedPlan } = plan;
  const [clientSecret, setClientSecret] = useState("");
  const [checkoutReady, setCheckoutReady] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const dispatch = useAppDispatch();

  const priceId =
    selectedPlan?.billingCycle === "monthly"
      ? selectedPlan?.prices?.monthly?.priceId
      : selectedPlan?.prices?.yearly?.priceId;

  // Save this function to use manually
  const initCheckout = async (data: { email: string; promoCode?: string }) => {
    if (!priceId) return;

    try {
      const email = isLoggedIn
        ? userEmail?.toLowerCase() ?? ""
        : data.email?.toLowerCase() ?? "";
      dispatch(setEmail(email));
      if (typeof window !== "undefined") {
        localStorage.setItem("checkoutEmail", email);
      }
      dispatch(setPromoCode(data.promoCode ?? ""));
      const formData = {
        promoCode: data.promoCode?.toUpperCase() ?? "",
        email,
        priceId,
        plan: selectedPlan?.name?.split(" ")[0]?.toLowerCase() ?? "",
      };
      const clientSecret = await checkoutService(formData);

      if (clientSecret) {
        if (data?.promoCode !== "") {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 5000);
        }
        setClientSecret(clientSecret);
        setCheckoutReady(true);
      }
    } catch (error) {
      console.error("Failed to initialize checkout:", error);
    }
  };

  const options: StripeElementsOptions = {
    clientSecret,
  };

  return (
    <>
      {!checkoutReady ? (
        <PreCheckoutForm onSuccess={initCheckout} />
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
