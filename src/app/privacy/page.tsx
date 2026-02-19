import PrivacyContent from "@/components/sections/privacy/PrivacyContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how Imran Safdar's portfolio website handles your personal information, what data is collected, and how it is protected.",
  alternates: {
    canonical: "/privacy",
  },
};

const PrivacyPage = () => {
  return <PrivacyContent />;
};

export default PrivacyPage;
