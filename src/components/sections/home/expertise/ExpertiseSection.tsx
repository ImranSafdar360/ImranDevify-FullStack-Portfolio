"use client";

import React from "react";
import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";
import {
  Code2,
  Rocket,
  Server,
  Database,
  Smartphone,
  Cpu,
  Wind,
  GitBranch,
  Terminal,
  Figma,
  Globe,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import DynamicCard from "@/components/shared/DynamicCard";

interface ExpertiseItem {
  name: string;
  icon: React.ElementType;
}

const expertises: ExpertiseItem[] = [
  { name: "React.js", icon: Code2 },
  { name: "Next.js", icon: Globe },
  { name: "Node.js", icon: Server },
  { name: "Express.js", icon: Terminal },
  { name: "MongoDB", icon: Database },
  { name: "React Native", icon: Smartphone },
  { name: "Expo", icon: Rocket },
  { name: "TypeScript", icon: Zap },
  { name: "Tailwind CSS", icon: Wind },
  { name: "Git & GitHub", icon: GitBranch },
  { name: "Postman", icon: Cpu },
  { name: "Figma", icon: Figma },
];

const ExpertiseSection = () => {
  return (
    <Section className="max-w-[1240px] relative flex flex-col items-center gap-[64px]">
      <SectionHeader
        className="max-w-[800px] items-center text-center gap-[12px]"
        title="Everything you need to"
        description="A full-stack toolkit designed to build high-performance, scalable, and user-centric digital products across web and mobile."
        badgeText="What We Do"
        gradientText="build and scale"
      />

      <div className="flex flex-wrap justify-center gap-4 w-full h-full">
        {expertises.map((item, index) => {
          const Icon = item.icon;

          // Pattern: 4 items, 3 items, 3 items, 2 items
          let basis = "md:basis-[calc(25%-12px)]"; // 4 per row
          if (index >= 4 && index <= 9)
            basis = "md:basis-[calc(33.33%-12px)]"; // 3 per row (two rows)
          else if (index >= 10) basis = "md:basis-[calc(50%-12px)]"; // 2 per row

          return (
            <DynamicCard
              key={index}
              className={cn(
                "group flex flex-row items-center justify-center gap-5 p-6 h-full min-h-[100px] min-w-fit",
                basis,
              )}
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-[#0080FF]">
                <div className="absolute inset-0 bg-blue-500/10 blur-sm group-hover:bg-blue-500/20 transition-colors" />
                <Icon
                  className="relative z-10 w-5 h-5 text-white/70 group-hover:text-white transition-colors"
                  strokeWidth={2}
                />
              </div>

              <h6 className="text-lg font-bold text-white font-sora group-hover:text-white transition-colors tracking-tight">
                {item.name}
              </h6>
            </DynamicCard>
          );
        })}
      </div>
    </Section>
  );
};

export default ExpertiseSection;
