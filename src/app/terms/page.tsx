import TermsContent from "@/components/sections/terms/TermsContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Review the Terms & Conditions governing the use of Imran Safdar's portfolio website, including intellectual property and acceptable usage policies.",
  alternates: {
    canonical: "/terms",
  },
};

const TermsPage = () => {
  return <TermsContent />;
};

export default TermsPage;
