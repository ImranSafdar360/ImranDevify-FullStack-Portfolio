"use client";

import React, { useState, useMemo } from "react";
import ProjectsHero from "@/components/sections/projects/ProjectsHero";
import ProjectFilters from "@/components/sections/projects/ProjectFilters";
import ProjectsGrid from "@/components/sections/projects/ProjectsGrid";
import { projects } from "@/data/projectData";
import SectionSeparator from "@/components/shared/SectionSeparator";
import { TestimonialsSection } from "@/components/sections/home/testimonials/TestimonialsSection";
import { FAQ } from "@/components/sections/home/faqs/FAQs";

const ProjectsContent = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  // Extract unique categories from projects (excluding CTA cards)
  const categories = useMemo(() => {
    const projectCategories = projects
      .filter((p) => !p.isCTA)
      .map((p) => p.category);
    return ["All", ...Array.from(new Set(projectCategories))];
  }, []);

  // Filter projects based on the active category
  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((p) => p.category === activeCategory || p.isCTA);
  }, [activeCategory]);

  return (
    <main className="min-h-screen flex flex-col items-center">
      <ProjectsHero />

      <ProjectFilters
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <ProjectsGrid projects={filteredProjects} />

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
