import AboutSection from "@/components/sections/about-page/AboutSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  // Renders as "About | Imran Safdar — AI-Product Engineer" via the layout template.
  title: "About",
  description:
    "Imran Safdar is an AI-product engineer building AI-powered SaaS products and React Native apps end-to-end for founders. Based in Lahore, working globally.",
  alternates: {
    canonical: "/about",
  },
};

const AboutPage = () => {
  return <AboutSection />;
};

export default AboutPage;
