"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Project {
  id: string;
  title: string;
  category: string;
  client: string;
  description: string;
  outcome: string;
  image: string;
  techStack: string[];
  link: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.1 }}
      className="group"
    >
      <div className="relative aspect-[16/10] rounded-[32px] overflow-hidden bg-muted/20 border border-white/10 shadow-sm group-hover:shadow-2xl group-hover:shadow-primary/5 transition-all duration-500">
        {/* Project Image */}
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-black scale-0 group-hover:scale-100 transition-transform duration-500">
            <ArrowUpRight className="w-8 h-8 font-bold" />
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-6 left-6 flex gap-2">
          <span className="px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] uppercase tracking-widest font-bold text-white">
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="mt-8 space-y-3 px-4">
        <div className="text-xs font-bold text-primary tracking-widest uppercase">
          {project.client}
        </div>
        <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed italic max-w-md">
          {project.description}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-bold text-muted-foreground/60 bg-muted/30 px-2 py-1 rounded-md border border-white/5"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
