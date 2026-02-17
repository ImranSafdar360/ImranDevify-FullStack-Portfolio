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
import IconBox from "@/components/shared/IconBox";

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

      <div className="flex flex-col items-center gap-6 w-full h-full">
        {[
          expertises.slice(0, 4), // Row 1: 4 items
          expertises.slice(4, 7), // Row 2: 3 items
          expertises.slice(7, 10), // Row 3: 3 items
          expertises.slice(10, 12), // Row 4: 2 items
        ].map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex flex-wrap justify-center gap-4 w-full"
          >
            {row.map((item, index) => (
              <DynamicCard
                key={index}
                className={cn(
                  "group flex flex-row items-center justify-center gap-3 p-4 px-6 md:px-8 min-h-fit md:min-h-[90px] w-fit min-w-fit max-w-none transition-all duration-300",
                )}
              >
                <IconBox icon={item.icon} />

                <h6 className="text-base md:text-lg font-bold text-white font-sora transition-colors tracking-tight whitespace-nowrap">
                  {item.name}
                </h6>
              </DynamicCard>
            ))}
          </div>
        ))}
      </div>
    </Section>
  );
};

export default ExpertiseSection;
