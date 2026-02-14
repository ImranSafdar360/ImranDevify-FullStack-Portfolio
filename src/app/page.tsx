"use client";

import Hero from "@/components/sections/home/hero/Hero";
import AboutMini from "@/components/sections/home/about/AboutMini";
import CaseStudies from "@/components/sections/home/case-studies/CaseStudies";
import Services from "@/components/sections/home/services/Services";
import WhoIWorkWith from "@/components/sections/home/who-i-work-with/WhoIWorkWith";
import WhyChooseMeSection from "@/components/sections/home/why-choose-me/WhyChooseMeSection";
import WorkProcess from "@/components/sections/home/work-process/WorkProcess";
// import CTASection from "@/components/sections/home/cta/CTASection";
import React from "react";
import { FAQ } from "@/components/sections/home/faqs/FAQs";
import { TestimonialsSection } from "@/components/sections/home/testimonials/TestimonialsSection";
import SectionSeparator from "@/components/shared/SectionSeparator";

const HomePage = () => {
  return (
    <>
      <Hero />
      <SectionSeparator orientation="horizontal" color="FFFFFF" centerOpacity={0.25} className="my-32" />
      <AboutMini />
      <SectionSeparator orientation="horizontal" color="FFFFFF" centerOpacity={0.25} className="my-32" />
      <CaseStudies />
      <SectionSeparator orientation="horizontal" color="FFFFFF" centerOpacity={0.25} className="my-32" />
      <Services />
      <SectionSeparator orientation="horizontal" color="FFFFFF" centerOpacity={0.25} className="my-32" />
      <WhoIWorkWith />
      <SectionSeparator orientation="horizontal" color="FFFFFF" centerOpacity={0.25} className="my-32" />
      <WorkProcess />
      <SectionSeparator orientation="horizontal" color="FFFFFF" centerOpacity={0.25} className="my-32" />
      <WhyChooseMeSection />
      <SectionSeparator orientation="horizontal" color="FFFFFF" centerOpacity={0.25} className="my-32" />
      <TestimonialsSection />
      <SectionSeparator orientation="horizontal" color="FFFFFF" centerOpacity={0.25} className="my-32" />
      <FAQ />
      {/* <CTASection /> */}
    </>
  );
};

export default HomePage;
