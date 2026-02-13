"use client";

import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Compass, Layers, Code2, Rocket } from "lucide-react";
import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";

gsap.registerPlugin(useGSAP);

interface ProcessStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const processSteps: ProcessStep[] = [
  {
    id: "01",
    title: "Strategy & Discovery",
    description:
      "Deeply understanding your goals to create a strategic roadmap for success.",
    icon: <Compass className="w-10 h-10" />,
  },
  {
    id: "02",
    title: "Architecture & Design",
    description:
      "Crafting scalable architectures and intuitive interfaces with a focus on UI/UX.",
    icon: <Layers className="w-10 h-10" />,
  },
  {
    id: "03",
    title: "Precision Engineering",
    description:
      "Building high-performance, maintainable codebases using the latest technologies.",
    icon: <Code2 className="w-10 h-10" />,
  },
  {
    id: "04",
    title: "Deployment & Growth",
    description:
      "Launching your product safely and ensuring long-term scalability and stability.",
    icon: <Rocket className="w-10 h-10" />,
  },
];

export default function WorkProcess() {
  const [activeIndex, setActiveIndex] = useState<number>(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".process-card-wrapper");
    const contents = gsap.utils.toArray<HTMLElement>(".process-card-content");
    const descriptions = gsap.utils.toArray<HTMLElement>(
      ".process-description",
    );

    cards.forEach((card, i) => {
      const isActive = activeIndex === i;

      // Card expansion and basic styles
      gsap.to(card, {
        flexGrow: isActive ? 3 : 1, // Increased ratio for more dramatic effect
        backgroundColor: isActive ? "#F3F4F6" : "rgba(255, 255, 255, 0.03)",
        borderColor: isActive
          ? "rgba(255, 255, 255, 1)"
          : "rgba(255, 255, 255, 0.05)",
        duration: 0.8,
        ease: "power3.inOut",
      });

      // Synchronized text and icon color
      gsap.to(contents[i], {
        color: isActive ? "#000000" : "#FFFFFF",
        duration: 0.6,
        ease: "power2.inOut",
      });

      // Smooth description expansion
      gsap.to(descriptions[i], {
        height: isActive ? 65 : 0,
        opacity: isActive ? 1 : 0,
        y: isActive ? 0 : 20,
        marginTop: isActive ? 24 : 0,
        duration: 0.8,
        ease: "power3.inOut",
        overwrite: true,
      });
    });
  }, [activeIndex]);

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <Section className="relative flex flex-col justify-center items-center gap-[84px]">
      <SectionHeader
        className="max-w-[60%] items-center gap-[8px]"
        title="How I Get It Done "
        description="From initial research to final launch, I follow a disciplined workflow to ensure every project exceeds expectations." 
        badgeText="Process" 
        gradientText="Smoothly" 
        />


      {/* Horizontal Expanding Cards */}
      <div
        ref={containerRef}
        className="flex flex-col md:flex-row gap-4 h-auto md:h-[400px] w-full items-stretch"
      >
        {processSteps.map((step, index) => (
          <div
            key={step.id}
            onClick={() => handleToggle(index)}
            style={{ flexBasis: "0%" }} // Crucial for predictable flex-grow expansion
            className="process-card-wrapper w-fit min-w-[250px] relative group cursor-pointer overflow-hidden rounded-[24px] md:rounded-[24px] border border-white/5"
          >
            {/* Background Pattern for Active State */}
            <div
              className={`absolute inset-0 transition-opacity duration-700 ${activeIndex === index ? "opacity-5" : "opacity-0"}`}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #000 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              ></div>
            </div>

            <div className="process-card-content h-full flex flex-col p-8 md:p-8 relative z-10">
              {/* Icon */}
              <div
                className={`mb-auto transition-transform duration-500 ${activeIndex === index ? "scale-100" : "scale-100 opacity-60"}`}
              >
                {step.icon}
              </div>

              {/* Content */}
              <div className="mt-auto">
                <div className="flex flex-col">
                  <h3 className="text-2xl md:text-[32px] font-bold tracking-tight leading-tight">
                    {step.title}
                  </h3>

                  <div className="process-description h-0 opacity-0 overflow-hidden">
                    <p className="text-current opacity-70 text-lg md:text-xl font-medium leading-relaxed max-w-[420px]">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
