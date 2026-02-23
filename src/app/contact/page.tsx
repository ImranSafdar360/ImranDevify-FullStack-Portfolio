import ContactContent from "@/components/sections/contact/ContactContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hire a SaaS & React Native Developer",
  description:
    "Looking to build a SaaS platform, startup MVP, or cross-platform mobile app? Contact Imran Safdar to discuss your project and turn your product idea into a scalable digital solution.",
  alternates: {
    canonical: "/contact",
  },
};

const ContactPage = () => {
  return <ContactContent />;
};

export default ContactPage;
