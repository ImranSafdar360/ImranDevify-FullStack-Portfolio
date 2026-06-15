import AboutSection from "@/components/sections/AboutSection";
import AIWorkflow from "@/components/sections/AIWorkflow";
import AlsoShipped from "@/components/sections/AlsoShipped";
import EngagementModels from "@/components/sections/EngagementModels";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Hero from "@/components/sections/Hero";
import Process from "@/components/sections/Process";
import SelectedWork from "@/components/sections/SelectedWork";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials";
import WhyMe from "@/components/sections/WhyMe";
import SectionDivider from "@/components/layout/SectionDivider";
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
      <SectionDivider />
      <SelectedWork />
      <SectionDivider />
      <WhyMe />
      <SectionDivider />
      <AlsoShipped />
      <SectionDivider />
      <AIWorkflow />
      <SectionDivider />
      <Process />
      <SectionDivider />
      <Services />
      <SectionDivider />
      <EngagementModels />
      <SectionDivider />
      <Testimonials />
      <SectionDivider />
      <FAQ />
      <SectionDivider />
      <AboutSection />
      <SectionDivider />
      <FinalCTA />
    </>
  );
};

export default HomePage;
