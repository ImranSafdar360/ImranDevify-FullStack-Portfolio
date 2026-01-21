"use client";

import Hero from "@/components/ui/hero";
import FeaturedWork from "@/components/ui/featured-work";
import AboutMini from "@/components/ui/about-mini";
import CaseStudies from "@/components/ui/case-studies";
import Services from "@/components/ui/services";
import WhoIWorkWith from "@/components/ui/who-work-with-me";
import WhyChooseMeSection from "@/components/ui/why-choose-me-section";
import WorkProcess from "@/components/ui/work-process";
import CTASection from "@/components/ui/cta-section";
import React from "react";
import { FAQ } from "@/components/ui/FAQs";
import { TestimonialsSection } from "@/components/ui/testimonials-section";

const HomePage = () => {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <AboutMini />
      <CaseStudies />
      <Services />
      <WhoIWorkWith />
      <WorkProcess />
      <WhyChooseMeSection />
      <TestimonialsSection />
      <FAQ />
      <CTASection />
    </>
  );
};

export default HomePage;
