import ContactContent from "@/components/sections/contact/ContactContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Ready to build something world-class? Get in touch with Imran Safdar to discuss your next SaaS product, agency project, or cross-platform mobile app.",
  alternates: {
    canonical: "/contact",
  },
};

const ContactPage = () => {
  return <ContactContent />;
};

export default ContactPage;
