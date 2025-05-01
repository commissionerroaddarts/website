import ThankYouMessage from "@/components/global/ThankYouMessage";
import { generateMetadata } from "@/utils/metaData";
import React from "react";

export const metadata = generateMetadata({
  title: "Thank You",
  description: "Thank you for your submission!",
  image: "/images/banners/banner-icon.png",
  url: "/thank-you",
});

export default function CheckoutReturnPage() {
  return <ThankYouMessage />;
}
