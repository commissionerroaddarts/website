import ResetPasswordForm from "@/components/authpages/ResetPasswordForm";
import Preloader from "@/components/global/Preloader";
import { generateMetadata } from "@/utils/metaData";
import React, { Suspense } from "react";

export const metadata = generateMetadata({
  title: "Reset Password",
  description: "Reset your password",
  url: "/reset-password",
  image: "/images/reset-password.png",
});

const ResetPasswordPage = () => {
  return (
    <Suspense fallback={<Preloader />}>
      <ResetPasswordForm />
    </Suspense>
  );
};

export default ResetPasswordPage;
