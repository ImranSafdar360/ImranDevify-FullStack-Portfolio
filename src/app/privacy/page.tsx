import PrivacyContent from "@/components/sections/privacy/PrivacyContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the Privacy Policy of Imran Safdar's portfolio website to understand how user data is handled, stored, and protected.",
  alternates: {
    canonical: "/privacy",
  },
};

const PrivacyPage = () => {
  return <PrivacyContent />;
};

export default PrivacyPage;
