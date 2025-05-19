import axiosInstance from "@/utils/axiosInstance";

const plans = [
  {
    name: "Basic plan",
    icon: "/images/icons/basic.svg",
    bgColor:
      "linear-gradient(112.11deg, rgba(31, 0, 55, 0.82) 2.19%, rgba(75, 0, 130, 0.1) 95.99%)",
    discountedPriceYearly: 99,
  },
  {
    name: "Standard plan",
    icon: "/images/icons/business.svg",
    bgColor: "#1D1D1D",
    featured: true,
    discountedPriceYearly: 209,
  },
  {
    name: "Premium plan",
    icon: "/images/icons/enterprise.svg",
    bgColor:
      "linear-gradient(112.11deg, rgba(31, 0, 55, 0.82) 2.19%, rgba(75, 0, 130, 0.1) 95.99%)",

    discountedPriceYearly: 539,
  },
];

export const getPlans = async () => {
  try {
    const response = await axiosInstance.get("/subscription/plans");
    response.data = response.data.map((plan: any) => {
      const matchingPlan = plans.find(
        (p) => p.name.toLowerCase() === plan.name.toLowerCase()
      );
      return {
        ...plan,
        prices: {
          monthly: {
            ...plan.prices.monthly,
            amount: (plan.prices.monthly.amount / 100).toFixed(2),
          },
          yearly: {
            ...plan.prices.yearly,
            amount: (plan.prices.yearly.amount / 100).toFixed(2),
            discountedPrice: matchingPlan?.discountedPriceYearly,
          },
        },
        icon: matchingPlan?.icon ?? null,
        featured: matchingPlan?.featured ?? false,
        bgColor: matchingPlan?.bgColor ?? null,
      };
    });
    return response.data.reverse();
  } catch (error) {
    console.error("Error fetching plans:", error);
    throw new Error("Failed to fetch plans");
  }
};

export const upgradePlan = async ({
  priceId,
  stripeSubscriptionId,
}: {
  priceId: string;
  stripeSubscriptionId: string;
}) => {
  try {
    const response = await axiosInstance.post("/subscription/upgrade", {
      priceId,
      subscriptionId: stripeSubscriptionId,
    });
    return response;
  } catch (error) {
    console.error("Error upgrading plan:", error);
    throw new Error("Failed to upgrade plan");
  }
};
