import React from "react";
import ThankYouMessage from "@/components/global/ThankYouMessage";
import { generateMetadata } from "@/utils/metaData";

export const metadata = generateMetadata({
  title: "Thank You",
  description: "Thank you for your submission!",
  image: "/images/banners/banner-icon.png",
  url: "/thank-you",
});

const ThankYouPage = () => {
  return <ThankYouMessage />;
};

export default ThankYouPage;
