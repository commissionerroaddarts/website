import React from "react";
import SignupForm from "../../../components/authpages/SignupForm";
import { generateMetadata } from "../../../utils/generateMetaData";

export const metadata = generateMetadata({
  title: "Sign Up - Road Darts",
  description: "Create an account to join the Road Darts community.",
  url: "https://www.roaddarts.com/signup",
});

const page = () => {
  return <SignupForm />;
};

export default page;
