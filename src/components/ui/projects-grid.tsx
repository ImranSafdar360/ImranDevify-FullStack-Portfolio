"use client";

import React, { useState, useMemo } from "react";
import { ProjectCard, Project } from "./project-card";
import { ProjectsFilter } from "./projects-filter";
import { motion, AnimatePresence } from "framer-motion";

const projectData: Project[] = [
  {
    id: "1",
    title: "GreenLeaf Studio — Crafting a Scalable Brand Platform",
    category: "Agency Client",
    client: "Startup",
    description:
      "Designed and developed a high-performance web platform focused on clarity, speed, and long-term scalability.",
    outcome: "Increased site performance by 40% and user engagement by 25%.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&fit=crop",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    link: "/case-studies/greenleaf",
  },
  {
    id: "2",
    title: "SaaSy Analytics — Enterprise Dashboard for Growth",
    category: "SaaS Platforms",
    client: "TechFlow Inc",
    description:
      "A comprehensive analytics platform designed for SaaS companies to track user behavior, revenue metrics, and product performance.",
    outcome: "Streamlined data reporting for 50+ enterprise clients.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&fit=crop",
    techStack: ["React", "Node.js", "D3.js", "Redis"],
    link: "/case-studies/saasy",
  },
  {
    id: "3",
    title: "Vogue Commerce — Mobile-First Shopping Experience",
    category: "Mobile Apps",
    client: "Vogue Fashion",
    description:
      "A full-featured e-commerce mobile app built with React Native, featuring offline capabilities and integrated payment processing.",
    outcome: "Reduced checkout abandonment by 15% through intuitive UI.",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80&fit=crop",
    techStack: ["React Native", "Firebase", "Stripe"],
    link: "/case-studies/vogue",
  },
  {
    id: "4",
    title: "Fintech MVP — Rapid Launch specialized for Founders",
    category: "MVPs",
    client: "Future Finance",
    description:
      "Developed a functional MVP for a fintech startup in 4 weeks, enabling them to secure seed funding with a working demonstration.",
    outcome: "Successfully raised $1.2M in seed funding.",
    image:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&q=80&fit=crop",
    techStack: ["Next.js", "Prisma", "PostgreSQL"],
    link: "/case-studies/fintech-mvp",
  },
  {
    id: "5",
    title: "Digital Agency Portfolio — Performance Optimization",
    category: "Web Apps",
    client: "Pixel Perfect",
    description:
      "Refactored and optimized a legacy agency portfolio, focusing on SEO, accessibility, and Core Web Vitals.",
    outcome: "Achieved 100/100 Lighthouse scores across the board.",
    image:
      "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=1200&q=80&fit=crop",
    techStack: ["TypeScript", "Next.js", "Sanity CMS"],
    link: "/case-studies/pixel-perfect",
  },
];

export const ProjectsGrid = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projectData;
    return projectData.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <div id="projects" className="py-20 scroll-mt-20">
      <ProjectsFilter
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-20 items-start">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {/* Section Divider / Premium Line */}
        <div className="mt-32 border-t border-white/5 pt-12 text-center">
          <p className="text-muted-foreground text-sm italic font-medium tracking-wide">
            More than visuals — these are working products built to scale.
          </p>
        </div>
      </div>
    </div>
  );
};
