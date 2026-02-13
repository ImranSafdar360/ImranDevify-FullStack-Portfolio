"use client";

import React from "react";
import { useRouter } from "next/navigation";
import AnimatedButton from "@/components/shared/AnimatedButton";
import CaseStudyCard from "@/components/sections/home/case-studies/CaseStudyCard";
import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";

interface CaseStudy {
  id: string;
  title: string;
  description: string;
  image: string;
  category?: string;
  client?: string;
  date?: string;
  service?: string;
  techStack?: string[];
  isCTA?: boolean;
}

const caseStudies: CaseStudy[] = [
  {
    id: "1",
    title: "PetSnap - Capturing Moments",
    description:
      "Capturing heartfelt moments for past 5 years. Trusted by 120+ happy pet parents across London.",
    image:
      "https://www.wzwebs.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FPetMock.423bd46e.png&w=1080&q=75", // placeholder, should use mockups if available
    category: "Web Design",
    client: "PetSnap",
    date: "2024",
    service: "Full Stack Dev",
    techStack: ["React", "Tailwind", "GSAP"],
  },
  {
    id: "2",
    title: "Converting First-Time Clicks",
    description:
      "For digital institutions, our onboarding system helps the user successful start the journey.",
    image:
      "https://www.wzwebs.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FMarkitMock.91eccd8b.png&w=1080&q=75",
    category: "UX/UI Design",
    client: "Fizle",
    date: "2024",
    service: "Product Design",
    techStack: ["Next.js", "Framer Motion", "Stripe"],
  },
  {
    id: "3",
    title: "Xion - Creative Dashboard",
    description:
      "Trusted by 1M+ creators around the world. Create scroll-stopping visuals with just one prompt.",
    image:
      "https://www.wzwebs.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FXionMock.673a96ac.png&w=1080&q=75",
    category: "SaaS Platform",
    client: "Xion Corp",
    date: "2023",
    service: "Dashboard Dev",
    techStack: ["React", "D3.js", "Tailwind"],
  },
  {
    id: "4",
    title: "Make Your Brand Unforgettable",
    description:
      "Trusted by founders. We help brands stand out in a crowded market with unique identity.",
    image:
      "https://www.wzwebs.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FVinhMockup.36fc6310.png&w=1080&q=75",
    category: "Branding",
    client: "Vinh Lei",
    date: "2023",
    service: "UI/UX & Branding",
    techStack: ["Next.js", "Three.js", "GSAP"],
  },
  {
    id: "5",
    title: "This Could Be You",
    description: "Book a free Brand Audit today",
    image:
      "https://www.wzwebs.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FVinhMockup.36fc6310.png&w=1080&q=75",
    isCTA: true,
    category: "Contact",
  },
];

export default function CaseStudies() {
  const router = useRouter();

  return (
    <Section className="relative flex flex-col justify-center items-center gap-[84px]">
      <SectionHeader 
      className="max-w-[60%] items-center gap-[16px]"
      title="Proven results from" 
      description="This collection shows the projects I've created to connect, represent, and inspire confidence." 
      badgeText="Case-studies" 
      gradientText="real client work" 
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {caseStudies.map((study, index) => (
          <CaseStudyCard
            key={study.id}
            study={study}
            index={index}
            onClick={() => router.push("/projects/" + study.id)}
          />
        ))}
      </div>

      <div className="flex flex-col items-center mt-8">
        <p className="text-center text-gray-400 text-lg md:text-xl mb-6 font-medium">
          Want to see more results? Let&apos;s explore it.
        </p>
        <div className="flex justify-center">
          <AnimatedButton onClick={() => { }}>
            See All Projects
          </AnimatedButton>
        </div>
      </div>
    </Section>
  );
}
