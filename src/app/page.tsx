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
  // Title and description inherit the canonical AI-product-engineer values
  // from the root layout's metadata defaults.
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
