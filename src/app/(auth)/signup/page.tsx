import React from "react";
import SignupForm from "@/components/authpages/SignupForm";
import { generateMetadata } from "@/utils/metaData";

export const metadata = generateMetadata({
  title: "Sign Up - Road Darts",
  description: "Create an account to join the Road Darts community.",
  url: "/signup",
  image: "/images/banners/banner-icon.png",
});

const SignupPage = () => {
  return <SignupForm />;
};

export default SignupPage;
