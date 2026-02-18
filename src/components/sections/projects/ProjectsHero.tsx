"use client";

import React from "react";
import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";
import AnimatedButton from "@/components/shared/AnimatedButton";
import { useRouter } from "next/navigation";

const ProjectsHero = () => {
  const router = useRouter();
  return (
    <Section className="max-w-full relative flex flex-col justify-start items-center pt-[130px] md:pt-[130px] pb-10 gap-8">
      <div className="relative z-20 w-full flex flex-col items-center">
        <SectionHeader
          className="max-w-full md:max-w-[700px] lg:max-w-[800px] xl:max-w-[1000px] items-center text-center gap-[12px] mt-6"
          title="Transforming Ideas Into "
          description="A selection of my best work across web development, UI/UX design, and digital branding. Each project is built with precision, performance, and purpose."
          gradientText="Digital Excellence"
          badgeText="Explore our Portfolio"
        />
      </div>
      <AnimatedButton onClick={() => router.push("/contact")}>
        Build your product
      </AnimatedButton>
    </Section>
  );
};

export default ProjectsHero;
