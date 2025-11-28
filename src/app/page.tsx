'use client';

import Container from "@/components/common/Container";
import Hero from "@/components/ui/hero";
import FeaturedWork from "@/components/ui/featured-work";
import AboutMini from "@/components/ui/about-mini";
import CaseStudies from "@/components/ui/case-studies";
import React from "react";

const HomePage = () => {
  return (
    <Container>
      <Hero />
      <FeaturedWork />
      <AboutMini />
      <CaseStudies />
    </Container>
  );
};

export default HomePage;
