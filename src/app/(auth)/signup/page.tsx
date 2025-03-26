import React from "react";
import SignupForm from "../../../components/authpages/SignupForm";
export const metadata = {
  title: "Sign Up - Road Darts",
  description: "Create an account to join the Road Darts community.",
  icon: "/images/logos/road-darts-logo.png",
  openGraph: {
    title: "Sign Up - Road Darts",
    description: "Create an account to join the Road Darts community.",
    url: "https://www.roaddarts.com/signup",
    type: "website",
    images: [
      {
        url: "/images/logos/road-darts-logo.png",
        width: 800,
        height: 600,
        alt: "Road Darts Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@roaddarts",
    title: "Sign Up - Road Darts",
    description: "Create an account to join the Road Darts community.",
    image: "/images/logos/road-darts-logo.png",
  },
};

const page = () => {
  return <SignupForm />;
};

export default page;
