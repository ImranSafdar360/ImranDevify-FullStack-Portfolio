"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "@/data/projectData";
import Section from "@/components/shared/Section";
import { motion } from "framer-motion";
import Image from "next/image";

interface ProjectNavigationProps {
  currentSlug: string;
}

const ProjectNavigation = ({ currentSlug }: ProjectNavigationProps) => {
  const currentIndex = projects.findIndex((p) => p.slug === currentSlug);
  const prevProject = projects[currentIndex - 1];
  const nextProject = projects[currentIndex + 1];

  if (!prevProject && !nextProject) return null;

  return (
    <Section className="pb-0 pt-0 !max-w-full px-0 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Previous Project */}
        {prevProject ? (
          <Link
            href={`/projects/${prevProject.slug}`}
            className="group relative h-[350px] md:h-[500px] overflow-hidden bg-black flex flex-col justify-center p-8 md:p-24 border-b md:border-b-0 md:border-r border-white/5"
          >
            {/* Background Image with Advanced Overlay */}
            <motion.div
              className="absolute inset-0 z-0 opacity-20 filter grayscale group-hover:grayscale-0 group-hover:opacity-50 transition-all duration-1000 ease-out"
              initial={{ scale: 1.1 }}
              whileHover={{ scale: 1 }}
            >
              <Image
                src={prevProject.image}
                alt={prevProject.title}
                fill
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent z-1" />

            {/* Content Wrap */}
            <div className="relative z-10 flex flex-col items-start gap-4">
              <motion.div
                className="flex items-center gap-4 text-white/30 group-hover:text-blue-500 transition-colors duration-500"
                whileHover={{ x: -10 }}
              >
                <ChevronLeft
                  size={24}
                  className="group-hover:-translate-x-2 transition-transform duration-500 ease-out"
                />
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.4em] font-bold leading-none">
                    Previous
                  </span>
                </div>
              </motion.div>

              <div className="flex flex-col gap-2">
                <span className="text-white/20 text-xs font-medium uppercase tracking-widest">
                  {prevProject.category}
                </span>
                <h3 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white font-sora leading-tight tracking-tighter group-hover:text-blue-500 transition-colors duration-500">
                  {prevProject.title}
                </h3>
              </div>

              <div className="mt-8 flex items-center gap-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-700 ease-out">
                <div className="w-12 h-px bg-blue-500/50" />
                <span className="text-white/40 text-xs font-bold uppercase tracking-widest">
                  Explore Concept
                </span>
              </div>
            </div>
          </Link>
        ) : (
          <div className="hidden md:block bg-[#050505] h-[500px]" />
        )}

        {/* Next Project */}
        {nextProject ? (
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group relative h-[350px] md:h-[500px] overflow-hidden bg-black flex flex-col justify-center items-end text-right p-8 md:p-24"
          >
            {/* Background Image with Advanced Overlay */}
            <motion.div
              className="absolute inset-0 z-0 opacity-20 filter grayscale group-hover:grayscale-0 group-hover:opacity-50 transition-all duration-1000 ease-out"
              initial={{ scale: 1.1 }}
              whileHover={{ scale: 1 }}
            >
              <Image
                src={nextProject.image}
                alt={nextProject.title}
                fill
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-l from-black via-black/90 to-transparent z-1" />

            {/* Content Wrap */}
            <div className="relative z-10 flex flex-col items-end gap-4">
              <motion.div
                className="flex items-center gap-4 text-white/30 group-hover:text-blue-500 transition-colors duration-500"
                whileHover={{ x: 10 }}
              >
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.4em] font-bold leading-none">
                    Next
                  </span>
                </div>
                <ChevronRight
                  size={24}
                  className="group-hover:translate-x-2 transition-transform duration-500 ease-out"
                />
              </motion.div>

              <div className="flex flex-col gap-2">
                <span className="text-white/20 text-xs font-medium uppercase tracking-widest">
                  {nextProject.category}
                </span>
                <h3 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white font-sora leading-tight tracking-tighter group-hover:text-blue-500 transition-colors duration-500">
                  {nextProject.title}
                </h3>
              </div>

              <div className="mt-8 flex items-center flex-row-reverse gap-4 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-700 ease-out">
                <div className="w-12 h-px bg-blue-500/50" />
                <span className="text-white/40 text-xs font-bold uppercase tracking-widest">
                  Explore Concept
                </span>
              </div>
            </div>
          </Link>
        ) : (
          <div className="hidden md:block bg-[#050505] h-[500px]" />
        )}
      </div>
    </Section>
  );
};

export default ProjectNavigation;
