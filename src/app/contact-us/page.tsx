import React from "react";
import ContactUsSection from "../../components/contactpage/ContactUsSection";

export const metadata = {
  title: "Contact Us - Road Darts",
  description:
    "Get in touch with the Road Darts team for any inquiries, support, or feedback.",
  icon: "/images/logos/road-darts-logo.png",
  openGraph: {
    title: "Contact Us - Road Darts",
    description:
      "Get in touch with the Road Darts team for any inquiries, support, or feedback.",
    url: "https://www.roaddarts.com/contact-us",
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
    title: "Contact Us - Road Darts",
    description:
      "Get in touch with the Road Darts team for any inquiries, support, or feedback.",
    image: "/images/logos/road-darts-logo.png",
  },
};

const page = () => {
  return <ContactUsSection />;
};

export default page;
