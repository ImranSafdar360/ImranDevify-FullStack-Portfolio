"use client";

import React from "react";
import ProjectsHero from "@/components/sections/projects/ProjectsHero";
import ProjectsGrid from "@/components/sections/projects/ProjectsGrid";
import { projects } from "@/data/projectData";
import SectionSeparator from "@/components/shared/SectionSeparator";
import { TestimonialsSection } from "@/components/sections/home/testimonials/TestimonialsSection";
import { FAQ } from "@/components/sections/home/faqs/FAQs";

const ProjectsContent = () => {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <ProjectsHero />

      <ProjectsGrid projects={projects} />

      <SectionSeparator
        orientation="horizontal"
        color="FFFFFF"
        centerOpacity={0.25}
        className="my-20 md:my-32"
      />

      <TestimonialsSection />
      <SectionSeparator
        orientation="horizontal"
        color="FFFFFF"
        centerOpacity={0.25}
        className="my-20 md:my-32"
      />
      <FAQ />
    </main>
  );
};

export default ProjectsContent;
