"use client";

import React from "react";
import { Compass, Code2, TestTube, CheckCircle2 } from "lucide-react";
import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";
import DynamicCard from "@/components/shared/DynamicCard";
import ImageCard from "@/components/shared/ImageCard";
import SectionBadge from "@/components/shared/SectionBadge";
import SectionSeparator from "@/components/shared/SectionSeparator";
import { useDeviceType } from "@/hooks/use-mobile";

interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  bullets: string[];
}

const processSteps: ProcessStep[] = [
  {
    id: "01",
    title: "Product Clarity & Planning",
    description:
      "Before writing a single line of code, we define the foundation. We align on product goals, core features, user flow, and scalability requirements — so we build the right thing the first time.",
    icon: <Compass className="w-10 h-10" />,
    category: "Discovery",
    bullets: [
      "Requirement breakdown & feature prioritization",
      "System flow & architecture planning",
      "Technical feasibility & scalability mapping",
    ],
  },
  {
    id: "02",
    title: "Structured Development",
    description:
      "Execution without chaos. I develop the product using clean architecture principles, modular code structure, and performance-focused implementation.",
    icon: <Code2 className="w-10 h-10" />,
    category: "Build",
    bullets: [
      "Backend & database implementation",
      "Frontend / mobile development",
      "Secure authentication & API integration",
    ],
  },
  {
    id: "03",
    title: "Performance & Refinement",
    description:
      "After core development, I refine what matters. Speed, responsiveness, system stability, and user experience are carefully optimized before launch.",
    icon: <TestTube className="w-10 h-10" />,
    category: "Optimize",
    bullets: [
      "Query & API performance tuning",
      "UI/UX refinement & flow improvement",
      "Code cleanup & structural optimization",
    ],
  },
  {
    id: "04",
    title: "Deployment & Growth Readiness",
    description:
      "A product isn’t done at launch. I ensure your system is structured for future updates, scaling users, and feature expansion — without rewriting everything later.",
    icon: <TestTube className="w-10 h-10" />,
    category: "Launch & Scale",
    bullets: [
      "Production deployment support",
      "Post-launch optimization",
      "Scalability guidance for growth",
    ],
  },
];

export default function WorkProcess() {
  const { isMobile, isTablet } = useDeviceType();
  return (
    <Section className="relative flex flex-col lg:flex-row justify-center gap-[64px]">
      <div className="w-full lg:max-w-[47%] flex flex-col gap-[64px]">
        <SectionHeader
          className="gap-[8px]"
          title="A Clear Path From Idea to "
          description="Every successful product starts with clarity. My process ensures your idea is structured properly, built efficiently, and optimized for long-term growth."
          badgeText="How I Work?"
          gradientText="Scalable Product"
          isAbout={isMobile || isTablet ? false : true}
        />

        <div className="flex flex-col gap-6">
          {processSteps.map((step, index) => (
            <DynamicCard
              key={index}
              className="relative max-w-full lg:max-w-[590px] min-h-fit p-8"
            >
              <div className="flex flex-col gap-[44px]">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
                    {step.icon}
                  </div>
                  <SectionBadge className="text-sm" text={step.category} />
                </div>

                <div className="flex flex-col gap-3">
                  <h3 className="text-xl font-bold text-white font-sora">
                    {step.title}
                  </h3>
                  <p className="text-md text-white/60 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="w-full max-w-[50%]">
                  <SectionSeparator
                    orientation="horizontal"
                    color="FFFFFF"
                    centerOpacity={0.25}
                  />
                </div>

                <div className="flex flex-col gap-4">
                  {step.bullets.map((bullet, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#0080FF] shrink-0" />
                      <span className="text-white/80 font-medium">
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </DynamicCard>
          ))}
        </div>
      </div>
      <div className="static lg:sticky top-40 self-start hidden lg:block">
        <ImageCard image="/images/profile-pic.avif" alt="Services" />
      </div>
    </Section>
  );
}
