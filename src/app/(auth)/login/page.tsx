import React, { Suspense } from "react";
import LoginForm from "@/components/authpages/LoginForm";
import { generateMetadata } from "@/utils/metaData";
import Preloader from "@/components/global/Preloader";

export const metadata = generateMetadata({
  title: "Login - Road Darts",
  description: "Access your Road Darts account by logging in.",
  url: "/login",
  image: "/images/banners/banner-icon.png",
});

const LoginPage = () => {
  return (
    <Suspense fallback={<Preloader />}>
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;
