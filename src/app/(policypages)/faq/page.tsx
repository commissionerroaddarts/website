import { generateMetadata } from "@/utils/metaData";
import React from "react";
import FaqSection from "./FAQSection";

export const metadata = generateMetadata({
  title: "FAQ",
  description: "Frequently Asked Questions",
  url: "/faq",
  image: "/images/faq.png",
});

const FAQPage = () => {
  return <FaqSection />;
};

export default FAQPage;
