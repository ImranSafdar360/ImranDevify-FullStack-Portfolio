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
    title: "Strategy & Discovery",
    description:
      "Deeply understanding your goals to create a strategic roadmap for success.",
    icon: <Compass className="w-10 h-10" />,
    category: "Strategy & Discovery",
    bullets: [
      "Deeply understanding your goals to create a strategic roadmap for success.",
      "Deeply understanding your goals to create a strategic roadmap for success.",
      "Deeply understanding your goals to create a strategic roadmap for success.",
    ],
  },
  {
    id: "02",
    title: "Development & Deployment",
    description:
      "Building your product with precision and ensuring it's ready for launch.",
    icon: <Code2 className="w-10 h-10" />,
    category: "Development & Deployment",
    bullets: [
      "Building your product with precision and ensuring it's ready for launch.",
      "Building your product with precision and ensuring it's ready for launch.",
      "Building your product with precision and ensuring it's ready for launch.",
    ],
  },
  {
    id: "03",
    title: "Testing & Optimization",
    description:
      "Testing your product and optimizing it for maximum performance and user satisfaction.",
    icon: <TestTube className="w-10 h-10" />,
    category: "Testing & Optimization",
    bullets: [
      "Testing your product and optimizing it for maximum performance and user satisfaction.",
      "Testing your product and optimizing it for maximum performance and user satisfaction.",
      "Testing your product and optimizing it for maximum performance and user satisfaction.",
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
          title="We Simplify The Journey"
          description="We break down complex ideas into simple, actionable steps to help you achieve your goals."
          badgeText="How We Work?"
          gradientText="From Idea To Launch."
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
