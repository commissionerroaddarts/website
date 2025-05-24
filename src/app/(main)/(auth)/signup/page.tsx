import React, { Suspense } from "react";
import SignupForm from "@/components/authpages/SignupForm";
import { generateMetadata } from "@/utils/metaData";
import Preloader from "@/components/global/Preloader";

export const metadata = generateMetadata({
  title: "Sign Up - Road Darts",
  description: "Create an account to join the Road Darts community.",
  url: "/signup",
  image: "/images/banners/banner-icon.png",
});

export default async function SignupPage() {
  return (
    <Suspense fallback={<Preloader />}>
      <SignupForm />
    </Suspense>
  );
}
