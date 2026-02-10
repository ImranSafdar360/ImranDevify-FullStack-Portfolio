"use client";

import Hero from "@/components/sections/home/hero/Hero";
import FeaturedWork from "@/components/sections/home/featured-work/FeaturedWork";
import AboutMini from "@/components/sections/home/about/AboutMini";
import CaseStudies from "@/components/sections/home/case-studies/CaseStudies";
import Services from "@/components/sections/home/services/Services";
import WhoIWorkWith from "@/components/sections/home/who-i-work-with/WhoIWorkWith";
import WhyChooseMeSection from "@/components/sections/home/why-choose-me/WhyChooseMeSection";
import WorkProcess from "@/components/sections/home/work-process/WorkProcess";
import CTASection from "@/components/sections/home/cta/CTASection";
import React from "react";
import { FAQ } from "@/components/sections/home/faqs/FAQs";
import { TestimonialsSection } from "@/components/sections/home/testimonials/TestimonialsSection";

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
