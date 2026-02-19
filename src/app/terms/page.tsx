import TermsContent from "@/components/sections/terms/TermsContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Read the Terms & Conditions for using Imran Safdar's portfolio website. Understand the rules governing content, intellectual property, and use of this site.",
  alternates: {
    canonical: "/terms",
  },
};

const TermsPage = () => {
  return <TermsContent />;
};

export default TermsPage;
