"use client";

import React from "react";
import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";
import { Cpu, Wind, Zap } from "lucide-react";
import {
  SiMongodb,
  SiExpress,
  SiReact,
  SiNodedotjs,
  SiExpo,
  SiGithub,
  SiPostgresql,
  SiNextdotjs,
} from "react-icons/si";
import { cn } from "@/lib/utils";
import DynamicCard from "@/components/shared/DynamicCard";
import IconBox from "@/components/shared/IconBox";
import { IconType } from "react-icons";

interface ExpertiseItem {
  name: string;
  icon: IconType;
}

const expertises: ExpertiseItem[] = [
  { name: "React.js", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Express.js", icon: SiExpress },
  { name: "MongoDB", icon: SiMongodb },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "React Native", icon: SiReact },
  { name: "Expo", icon: SiExpo },
  { name: "TypeScript", icon: Zap },
  { name: "Tailwind CSS", icon: Wind },
  { name: "Git & GitHub", icon: SiGithub },
  { name: "Postman", icon: Cpu },
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
