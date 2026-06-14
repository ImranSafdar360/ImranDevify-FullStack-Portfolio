import AboutSection from "@/components/sections/AboutSection";
import AIWorkflow from "@/components/sections/AIWorkflow";
import AlsoShipped from "@/components/sections/AlsoShipped";
import FinalCTA from "@/components/sections/FinalCTA";
import Hero from "@/components/sections/Hero";
import Process from "@/components/sections/Process";
import SelectedWork from "@/components/sections/SelectedWork";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Full-Stack SaaS Developer & React Native Engineer",
  description:
    "Imran Safdar is a Full-Stack SaaS Developer and React Native Engineer helping startups, SaaS founders, and agencies build scalable web applications, high-performance mobile apps, and modern digital platforms.",
  alternates: {
    canonical: "/",
  },
};

const HomePage = () => {
  return (
    <>
      <Hero />
      <SelectedWork />
      <AlsoShipped />
      <AIWorkflow />
      <Process />
      <Services />
      <Testimonials />
      <AboutSection />
      <FinalCTA />
    </>
  );
};

export default HomePage;
