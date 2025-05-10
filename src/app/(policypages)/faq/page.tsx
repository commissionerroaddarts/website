import { generateMetadata } from "@/utils/metaData";
import React from "react";

export const metadata = generateMetadata({
  title: "FAQ",
  description: "Frequently Asked Questions",
  url: "/faq",
  image: "/images/faq.png",
});

const FAQPage = () => {
  return <div>FAQPage</div>;
};

export default FAQPage;
