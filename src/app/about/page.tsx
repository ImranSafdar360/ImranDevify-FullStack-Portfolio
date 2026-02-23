import AboutSection from "@/components/sections/about-page/AboutSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Imran Safdar – SaaS Developer",
  description:
    "Learn about Imran Safdar, a Full-Stack SaaS Developer and React Native Engineer with experience building scalable web applications, startup MVPs, and mobile platforms for founders and agencies.",
  alternates: {
    canonical: "/about",
  },
};

const AboutPage = () => {
  return <AboutSection />;
};

export default AboutPage;
