import axiosInstance from "@/utils/axiosInstance";
import { loadStripe } from "@stripe/stripe-js";

// Load your Stripe public key
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? ""
);
export const checkoutService = async (planName: string) => {
  try {
    const response = await axiosInstance.post("/subscription/checkout", {
      plan: planName,
    });

    const { id } = response.data;

    const stripe = await stripePromise;

    if (!stripe) {
      throw new Error("Stripe.js has not loaded yet.");
    }

    const { error } = await stripe.redirectToCheckout({ sessionId: id });

    if (error) {
      console.error("Stripe checkout error:", error);
    }

    // return id; // Expected { message: "Checkout successful!" }
  } catch (error: any) {
    console.error("Checkout error:", error);
    throw error;
  }
};

export const createCheckoutSession = async (
  priceId: string,
  promoCode: string
) => {
  try {
    const response = await axiosInstance.post(
      "/subscription/create-payment-intent",
      {
        // const response = await axiosInstance.post("/subscription/checkout", {
        priceId,
        promoCode,
      }
    );
    return response.data; // { id } or { clientSecret }
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
};
