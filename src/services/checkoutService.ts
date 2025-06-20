import axiosInstance from "@/utils/axiosInstance";

export const checkoutService = async (preDetails: {
  promoCode: string;
  email: string;
  priceId: string;
  plan: string;
}): Promise<string | undefined> => {
  try {
    const response = await axiosInstance.post(
      "/subscription/checkout",
      preDetails
    );
    const { clientSecret } = response.data;
    return clientSecret;
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
    const response = await axiosInstance.post("/subscription/checkout", {
      // const response = await axiosInstance.post("/subscription/checkout", {
      priceId,
      promoCode,
    });
    return response.data; // { id } or { clientSecret }
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
};
