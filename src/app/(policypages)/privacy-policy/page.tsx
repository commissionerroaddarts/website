import { generateMetadata } from "@/utils/metaData";
import React from "react";
import PrivacySection from "./PrivacySection";

export const metadata = generateMetadata({
  title: "Privacy Policy",
  description: "Privacy Policy",
  url: "/privacy-policy",
  image: "/images/icons/privacy-policy.png",
});

const PrivacyPolicyPage = () => {
  return <PrivacySection />;
};

export default PrivacyPolicyPage;
