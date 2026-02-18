import AboutSection from "@/components/sections/about-page/AboutSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Imran Safdar's journey as a Digital Engineer. Discover my background, expertise in elite technologies, and my commitment to delivering high-quality digital solutions.",
  alternates: {
    canonical: "/about",
  },
};

const AboutPage = () => {
  return <AboutSection />;
};

export default AboutPage;
