"use client";

import React from "react";
import { projects } from "@/data/projectData";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowButton } from "@/components/ui/FloatingButton";

gsap.registerPlugin(useGSAP);

interface ProjectNavigationProps {
  currentSlug: string;
}

const ProjectNavigation = ({ currentSlug }: ProjectNavigationProps) => {
  const currentIndex = projects.findIndex((p) => p.slug === currentSlug);
  const prevProject = projects[currentIndex - 1];
  const nextProject = projects[currentIndex + 1];

  if (!prevProject && !nextProject) return null;

  return (
    <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-40 flex justify-center items-center gap-5">
      {prevProject && (
        <div className="flex flex-col items-center gap-2 group">
          <ArrowButton
            href={`/projects/${prevProject.slug}`}
            direction="left"
            label={`Prev Case Study`}
          />
        </div>
      )}

      {nextProject && (
        <div className="flex flex-col items-center gap-2 group">
          <ArrowButton
            href={`/projects/${nextProject.slug}`}
            direction="right"
            label={`Next Case Study`}
          />
        </div>
      )}
    </div>
  );
};

export default ProjectNavigation;
