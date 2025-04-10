import CheckoutForm from "@/components/authpages/CheckoutForm";
import { generateMetadata } from "@/utils/metaData";

export const metadata = generateMetadata({
  title: "Checkout",
  description: "Checkout page for payment processing",
  url: "/checkout",
  image: "/images/checkout.png",
});

const CheckoutPage = () => {
  return <CheckoutForm />;
};

export default CheckoutPage;
