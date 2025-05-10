import CheckoutFormWrapper from "@/components/authpages/CheckoutFormWrapper";
import { generateMetadata } from "@/utils/metaData";

export const metadata = generateMetadata({
  title: "Checkout - Road Dart",
  description:
    "Complete your purchase securely on the Road Darts checkout page.",
  url: "/checkout",
  image: "/images/icons/checkout.png",
});

const CheckoutPage = () => {
  return <CheckoutFormWrapper />;
};

export default CheckoutPage;
