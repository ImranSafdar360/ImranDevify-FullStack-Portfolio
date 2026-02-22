"use client";

import React from "react";
import CaseStudyCard from "@/components/sections/home/case-studies/CaseStudyCard";
import { Project } from "@/data/projectData";
import { motion, AnimatePresence } from "framer-motion";
import Section from "@/components/shared/Section";

interface ProjectsGridProps {
  projects: Project[];
}

const ProjectsGrid = ({ projects }: ProjectsGridProps) => {
  return (
    <Section className="px-4 md:px-6 lg:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 lg:gap-8 xl:gap-12">
        <AnimatePresence mode="popLayout">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="col-span-1"
            >
              <CaseStudyCard study={project} index={index} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Section>
  );
};

export default ProjectsGrid;
