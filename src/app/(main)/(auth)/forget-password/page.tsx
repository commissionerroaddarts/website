import ForgotPasswordForm from "@/components/authpages/ForgotPasswordForm";
import { generateMetadata } from "@/utils/metaData";
import React from "react";

const metadata = generateMetadata({
  title: "Forgot Password",
  description: "Reset your password",
  url: "/forgot-password",
  image: "/images/forgot-password.png",
});

const ForgotPasswordPage = () => {
  return <ForgotPasswordForm />;
};

export default ForgotPasswordPage;
