import React from "react";
import LoginForm from "@/components/authpages/LoginForm";
import { generateMetadata } from "@/utils/metaData";

export const metadata = generateMetadata({
  title: "Login - Road Darts",
  description: "Access your Road Darts account by logging in.",
  url: "/login",
  image: "/images/banners/banner-icon.png",
});

const page = () => {
  return <LoginForm />;
};

export default page;
