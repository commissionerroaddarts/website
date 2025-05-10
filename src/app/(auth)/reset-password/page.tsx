import ResetPasswordForm from "@/components/authpages/ResetPasswordForm";
import { generateMetadata } from "@/utils/metaData";
import React from "react";

export const metadata = generateMetadata({
  title: "Reset Password",
  description: "Reset your password",
  url: "/reset-password",
  image: "/images/reset-password.png",
});

const ResetPasswordPage = () => {
  return <ResetPasswordForm />;
};

export default ResetPasswordPage;
