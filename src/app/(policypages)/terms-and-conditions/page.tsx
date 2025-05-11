import { generateMetadata } from "@/utils/metaData";
import React from "react";
import TermsAndConditionsSection from "./TermsConditionsSection";

export const metadata = generateMetadata({
  title: "Terms and Conditions",
  description: "Terms and Conditions",
  url: "/terms-and-conditions",
  image: "/images/terms-and-conditions.png",
});

const TermsConditionsPage = () => {
  return <TermsAndConditionsSection />;
};

export default TermsConditionsPage;
