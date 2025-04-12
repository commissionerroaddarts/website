import CheckoutForm from "@/components/authpages/checkoutcomponents/CheckoutForm";
import CheckoutSummary from "@/components/authpages/checkoutcomponents/CheckoutSummary";
import { generateMetadata } from "@/utils/metaData";
import { Grid2 } from "@mui/material";
import React from "react";
export const metadata = generateMetadata({
  title: "Checkout - Road Dart",
  description:
    "Complete your purchase securely on the Road Darts checkout page.",
  url: "/checkout",
  image: "/images/icons/checkout.png",
});

const CheckoutPage = () => {
  return (
    <Grid2
      container
      spacing={5}
      className="max-w-[90%] mx-auto h-full p-4 mt-10 "
    >
      <Grid2
        size={{ xs: 12, sm: 8 }}
        className="flex flex-col justify-start items-center"
      >
        <CheckoutForm />
      </Grid2>
      <Grid2
        size={{ xs: 12, sm: 4 }}
        className="flex flex-col justify-center items-center"
      >
        <CheckoutSummary />
      </Grid2>
    </Grid2>
  );
};

export default CheckoutPage;
