"use client";

import React from "react";
import Section from "@/components/shared/Section";
import { Project } from "@/data/projectData";
import DynamicCard from "@/components/shared/DynamicCard";
import AnimatedButton from "@/components/shared/AnimatedButton";
import SectionBadge from "@/components/shared/SectionBadge";
import { useRouter } from "next/navigation";

interface ProjectContentProps {
  project: Project;
}

const ProjectContent = ({ project }: ProjectContentProps) => {
  const router = useRouter();
  return (
    <Section className="py-10 md:py-16 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-8 flex flex-col gap-20">
          {/* Overview */}
          <div className="flex flex-col gap-4">
            <span className="text-blue-500 uppercase tracking-[0.2em] text-sm font-medium">
              Overview
            </span>
            <h2 className="text-3xl font-bold text-white font-sora">
              Project Overview
            </h2>
            <p className="text-white/60 leading-relaxed">{project.overview}</p>
          </div>

          {/* Role */}
          <div className="flex flex-col gap-4">
            <span className="text-white/70 uppercase tracking-[0.2em] text-sm font-medium">
              My Role
            </span>
            <h2 className="text-3xl font-bold text-white font-sora">
              {project.role?.role}
            </h2>

            <ul className="space-y-3 mt-6">
              {project.role?.responsibilities?.map((item, index) => (
                <li key={index} className="flex gap-3 text-white/60 text-sm">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Challenges */}
          <div className="flex flex-col gap-8">
            <span className="text-white/70 uppercase tracking-[0.2em] text-sm font-medium">
              Challenges & Solutions
            </span>

            {project.challenges?.map((item, index) => (
              <div key={index} className="flex flex-col gap-4">
                <h3 className="text-2xl font-bold text-white font-sora">
                  {index + 1}. {item.title}
                </h3>

                <p className="text-white/50 leading-relaxed">
                  {item.description}
                </p>

                <DynamicCard className="min-w-full min-h-fit">
                  <p className="text-blue-400 font-semibold mb-2">Solution</p>
                  <p className="text-white/60 leading-relaxed">
                    {item.solution}
                  </p>
                </DynamicCard>
              </div>
            ))}
          </div>

          {/* Results */}
          <div className="flex flex-col gap-6">
            <span className="text-white/70 uppercase tracking-[0.2em] text-sm font-medium">
              Results
            </span>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.results?.map((result, index) => (
                <DynamicCard key={index} className="p-6 min-h-fit min-w-full">
                  <p className="text-white font-semibold">{result}</p>
                </DynamicCard>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-col gap-6">
            <span className="text-white/70 uppercase tracking-[0.2em] text-sm font-medium">
              Key Features
            </span>

            <div className="flex flex-wrap gap-3">
              {project.features?.map((feature) => (
                <SectionBadge
                  key={feature}
                  text={feature}
                  className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white/60 uppercase tracking-widest"
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-4 w-fit">
          <div className="sticky top-32 flex flex-col gap-6">
            <DynamicCard className="p-8 flex flex-col gap-8">
              <div>
                <h3 className="text-2xl font-bold text-white font-sora">
                  Project Recap
                </h3>
                <p className="text-white/70 mt-2">Built in {project.date}</p>
              </div>

              <div className="flex flex-col gap-6 text-sm">
                <div>
                  <p className="text-white/30 uppercase tracking-widest text-xs">
                    Industry
                  </p>
                  <p className="text-white">{project.category}</p>
                </div>

                <div>
                  <p className="text-white/30 uppercase tracking-widest text-xs">
                    Service
                  </p>
                  <p className="text-white">{project.service}</p>
                </div>

                <div>
                  <p className="text-white/30 uppercase tracking-widest text-xs">
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.techStack?.map((tech) => (
                      <SectionBadge
                        key={tech}
                        text={tech}
                        className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-white/60 uppercase tracking-widest"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </DynamicCard>

            <AnimatedButton
              onClick={() => router.push("/contact")}
              className="w-full"
            >
              Let’s Build Your Product
            </AnimatedButton>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default ProjectContent;
