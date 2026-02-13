"use client";

import React, { useEffect, useRef, useState } from "react";
import AnimatedButton from "@/components/shared/AnimatedButton";
import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";

interface ServiceCard {
  label: string;
  title: string;
  description: string;
  services: string[];
  isHero?: boolean;
}

const services: ServiceCard[] = [
  {
    label: "DESIGN",
    title: "DESIGN",
    description:
      "I design product interfaces that feel intuitive, purposeful, and friction-free — grounded in real user behavior and business goals.",
    services: [
      "Product discovery & feature scoping",
      "UI/UX design for SaaS & apps",
      "User flow & interaction design",
      "Design systems & component libraries",
      "Accessibility & usability best practices",
    ],
  },
  {
    label: "BUILD",
    title: "BUILD",
    description:
      "I build fast, scalable, and maintainable digital products using modern full-stack technologies — optimized for performance and long-term growth.",
    services: [
      "Full-stack web apps (MERN, Next.js)",
      "React Native / Expo mobile apps",
      "Backend APIs & system architecture",
      "Database design & integrations",
      "Clean, production-ready codebases",
    ],
    isHero: true,
  },
  {
    label: "SCALE",
    title: "SCALE",
    description:
      "I help products stay fast, stable, and adaptable as they grow — focusing on performance, reliability, and future-proof architecture.",
    services: [
      "Performance optimization & audits",
      "Scalability & infrastructure planning",
      "SEO & Core Web Vitals optimization",
      "Monitoring, testing & reliability",
      "Ongoing product improvements",
    ],
  },
];

export default function Services() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(
    new Array(services.length).fill(false),
  );
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = cardRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                setVisibleCards((prev) => {
                  const newState = [...prev];
                  newState[index] = true;
                  return newState;
                });
              }, index * 150); // Staggered delay
            }
          });
        },
        { threshold: 0.1 },
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer) => {
        if (observer) observer.disconnect();
      });
    };
  }, []);

  return (
    <Section className="relative flex flex-col justify-center items-center gap-[120px]">
      <SectionHeader
        className="max-w-[60%] items-center gap-[16px]"
        title="Building Stronger Brands"
        description="From idea to scalable product — I design, build, and optimize digital experiences that perform in the real world."
        badgeText="Services"
        gradientText="Creating Impressions!"
      />

      {/* Service Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {services.map((service, index) => (
          <div
            key={service.label}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className={`flex flex-col gap-[24px] group relative rounded-[40px] p-[40px] pt-[65px] transition-all duration-500 ease-out ${visibleCards[index]
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-12"
              } hover:scale-[1.02]`}
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: service.isHero
                ? "0 20px 60px rgba(0, 0, 0, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.02)"
                : "0 10px 40px rgba(0, 0, 0, 0.3)",
            }}
          >
            <div
              className="absolute -top-9 left-7 -rotate-[4deg] w-fit px-[12px] py-[8px] rounded-[10px] text-[36px] font-bold bg-white text-black uppercase z-20"
              style={{
                fontFamily: "var(--font-boldonse)",
              }}
            >
              {service.label}
            </div>

            {/* Content */}
            <div className="relative flex flex-col gap-[32px] z-10">
              {/* Description */}
              <p className="text-[20px] leading-[28px] font-medium text-white/70">
                {service.description}
              </p>

              {/* Services List */}
              <ul className="space-y-2">
                {service.services.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-center gap-4 py-[15px] border-t border-white/70 border-dashed"
                  >
                    <p className="text-[18px] leading-[22px] font-semibold text-white/90">
                      {item}
                    </p>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div>
        {/* Micro-Line */}
        <p className="text-center text-gray-500 text-[20px] leading-[28px] mb-4 font-light tracking-wide">
          &ldquo;Engineering digital products with precision, scalability, and
          impact.&rdquo;
        </p>

        {/* CTA */}
        <div className="flex justify-center">
          <AnimatedButton onClick={() => { }}>
            Have a product in mind? Let&apos;s build it right.
          </AnimatedButton>
        </div>
      </div>
    </Section>
  );
}
