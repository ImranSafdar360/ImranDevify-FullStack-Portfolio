'use client';

import Hero from "@/components/ui/hero";
import FeaturedWork from "@/components/ui/featured-work";
import AboutMini from "@/components/ui/about-mini";
import CaseStudies from "@/components/ui/case-studies";
import Services from "@/components/ui/services";
import WhoIWorkWith from "@/components/ui/why-choose-me";
import WhyChooseMeSection from "@/components/ui/why-choose-me-section";
import WorkProcess from "@/components/ui/work-process";
import TestimonialsSection from "@/components/ui/testimonials-section";
import CTASection from "@/components/ui/cta-section";
import React from "react";

const HomePage = () => {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <CaseStudies />
      <AboutMini />
      <Services />
      <WhoIWorkWith />
      <WhyChooseMeSection />
      <WorkProcess />
      <TestimonialsSection />
      <CTASection />
    </>
  );
};

export default HomePage;
