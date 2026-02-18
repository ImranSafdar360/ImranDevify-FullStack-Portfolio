"use client";

import React from "react";
import { useRouter } from "next/navigation";
import AnimatedButton from "@/components/shared/AnimatedButton";
import CaseStudyCard from "@/components/sections/home/case-studies/CaseStudyCard";
import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";
import Image from "next/image";

import { projects as caseStudies } from "@/data/projectData";

export default function CaseStudies() {
  const router = useRouter();

  return (
    <Section className="relative flex flex-col justify-center items-center gap-[34px] overflow-hidden">
      <Image
        src="/images/left-vector.svg"
        alt="Left Vector"
        width={560}
        height={235}
        className="absolute left-[-350px] lg:left-[-200px] xl:left-[-54px] top-20 z-10 hidden md:block"
      />
      <Image
        src="/images/right-vector.svg"
        alt="Right Vector"
        width={560}
        height={235}
        className="absolute right-[-350px] lg:right-[-200px] xl:right-[-54px] top-20 z-10 hidden md:block"
      />
      <SectionHeader
        className="max-w-full md:max-w-[70%] lg:max-w-[55%] items-center gap-[16px] z-20"
        title="Proven results from "
        description="This collection shows the projects I've created to connect, represent, and inspire confidence."
        badgeText="Case-studies"
        gradientText="real client work"
      />
      <AnimatedButton onClick={() => router.push("/projects")} className="z-20">
        See All Projects
      </AnimatedButton>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-12 lg:gap-6 xl:gap-12 mt-[34px] lg:mt-[84px]">
        {caseStudies.map((study, index) => (
          <CaseStudyCard key={study.id} study={study} index={index} />
        ))}
      </div>
    </Section>
  );
}
