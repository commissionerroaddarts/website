import React from "react";
import LoginForm from "../../../components/authpages/LoginForm";

export const metadata = {
  title: "Login - Road Darts",
  description: "Access your Road Darts account by logging in.",
  icon: "/images/logos/road-darts-logo.png",
  openGraph: {
    title: "Login - Road Darts",
    description: "Access your Road Darts account by logging in.",
    url: "https://www.roaddarts.com/login",
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
    title: "Login - Road Darts",
    description: "Access your Road Darts account by logging in.",
    image: "/images/logos/road-darts-logo.png",
  },
};

const page = () => {
  return <LoginForm />;
};

export default page;
