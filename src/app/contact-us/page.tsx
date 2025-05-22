import React from "react";
import ContactUsSection from "@/components/contactpage/ContactUsSection";
import { generateMetadata } from "@/utils/metaData";

export const metadata = generateMetadata({
  title: "Contact Us - Road Darts",
  description:
    "Get in touch with the Road Darts team for any inquiries, support, or feedback.",
  url: "/contact-us",
  image: "/images/banners/banner-icon.png",
});

const ContactUsPage = () => {
  return <ContactUsSection />;
};

export default ContactUsPage;
