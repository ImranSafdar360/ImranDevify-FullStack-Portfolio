"use client";

import React from "react";
import Section from "@/components/shared/Section";
import { Project } from "@/data/projectData";
import DynamicCard from "@/components/shared/DynamicCard";
import AnimatedButton from "@/components/shared/AnimatedButton";
import SectionBadge from "@/components/shared/SectionBadge";

interface ProjectContentProps {
  project: Project;
}

const ProjectContent = ({ project }: ProjectContentProps) => {
  return (
    <Section className="py-10 md:py-16 lg:py-20 xl:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative">
        {/* Left Column: Project Details */}
        <div className="lg:col-span-8 flex flex-col gap-16">
          {/* My Role */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-blue-500" />
              <span className="text-blue-500 font-medium uppercase tracking-[0.2em] text-sm">
                The Impact
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl md:text-3xl font-bold text-white font-sora">
                My Role
              </h2>
              <p className="text-xl text-white/60 leading-relaxed font-light italic">
                {project.role || "Lead Designer & Developer"}
              </p>
            </div>
          </div>

          {/* Challenge */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-white/20" />
              <span className="text-white/40 font-medium uppercase tracking-[0.2em] text-sm">
                01. The Challenge
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl md:text-3xl font-bold text-white font-sora">
                The Problem
              </h2>
              <p className="text-lg text-white/50 leading-relaxed">
                {project.challenge ||
                  "Identifying and addressing complex user pain points while ensuring technical feasibility and brand alignment."}
              </p>
            </div>
          </div>

          {/* Solution */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-white/20" />
              <span className="text-white/40 font-medium uppercase tracking-[0.2em] text-sm">
                02. Our Solution
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <h2 className="text-2xl md:text-3xl font-bold text-white font-sora">
                Crafting Success
              </h2>
              <p className="text-lg text-white/50 leading-relaxed">
                {project.solution ||
                  "Implementing a robust, scalable architecture combined with intuitive UI/UX patterns to elevate the user journey."}
              </p>
              {/* Visual Accent */}
              <div className="w-full h-[1px] bg-gradient-to-r from-white/10 to-transparent mt-4" />
            </div>
          </div>

          {/* Results */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-white/20" />
              <span className="text-white/40 font-medium uppercase tracking-[0.2em] text-sm">
                03. The Outcomes
              </span>
            </div>
            <div className="flex flex-col gap-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white font-sora">
                Proven Results
              </h2>
              <div className="w-full max-w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                {project.results?.map((result, index) => (
                  <DynamicCard
                    key={index}
                    className="flex flex-col gap-4 w-full max-w-full min-h-fit"
                  >
                    <h4 className="text-3xl font-bold text-white font-sora">
                      {result.split(" ")[0]}
                    </h4>
                    <p className="text-white/40 leading-relaxed uppercase tracking-widest text-xs font-semibold">
                      {result.split(" ").slice(1).join(" ")}
                    </p>
                  </DynamicCard>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Sticky Client Details */}
        <div className="lg:col-span-4 relative">
          <div className="sticky top-32 flex flex-col gap-4 z-10">
            <DynamicCard className="w-full max-w-full flex flex-col gap-12">
              <div className="flex flex-col gap-2">
                <h3 className="text-3xl font-bold text-white font-sora">
                  Project Recap
                </h3>
                <p className="text-white/40 font-medium">
                  Delivering excellence since {project.date}
                </p>
              </div>

              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <span className="text-xs uppercase tracking-widest text-white/30 font-bold">
                    Client
                  </span>
                  <p className="text-lg font-medium text-white">
                    {project.client}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xs uppercase tracking-widest text-white/30 font-bold">
                    Industry
                  </span>
                  <p className="text-lg font-medium text-white">
                    {project.category}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xs uppercase tracking-widest text-white/30 font-bold">
                    Service
                  </span>
                  <p className="text-lg font-medium text-white">
                    {project.service}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xs uppercase tracking-widest text-white/30 font-bold">
                    Tech Stack
                  </span>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.techStack?.map((tech) => (
                      <SectionBadge
                        text={tech}
                        key={tech}
                        className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] font-bold text-white/60 uppercase tracking-widest"
                      />
                    ))}
                  </div>
                </div>
              </div>

              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex items-center justify-center py-5 px-8 rounded-2xl bg-white text-black font-bold uppercase tracking-widest text-xs transition-all duration-300 hover:bg-blue-500 hover:text-white"
                >
                  Launch Project
                </a>
              )}
            </DynamicCard>

            {/* Subtle Decorative Element */}
            <AnimatedButton onClick={() => {}} className="w-full">
              Build your product
            </AnimatedButton>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ProjectContent;
