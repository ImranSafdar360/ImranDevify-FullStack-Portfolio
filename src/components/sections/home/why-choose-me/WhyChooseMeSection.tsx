"use client";

import React from "react";
import { Target, Code, MessageSquare } from "lucide-react";
import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";
import DynamicCard from "@/components/shared/DynamicCard";
import GradientText from "@/components/ui/gradient-text";
import AnimatedButton from "@/components/shared/AnimatedButton";
import SectionSeparator from "@/components/shared/SectionSeparator";
import { useDeviceType } from "@/hooks/use-mobile";
import { useRouter } from "next/navigation";

interface FeatureCard {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const featureCards: FeatureCard[] = [
  {
    id: 1,
    icon: <Target className="w-[35px] h-[35px]" />,
    title: "Architecture Before Features",
    description:
      "I don’t rush into coding screens. I design the backend structure, database flow, and API contracts first, so your product doesn’t collapse under future updates, new users, or added complexity. Scale isn’t added later. It’s designed early.",
  },
  {
    id: 2,
    icon: <Code className="w-[35px] h-[35px]" />,
    title: "Performance at Every Layer",
    description:
      "Slow products lose users. Period. From optimized MongoDB queries and structured indexing to efficient state management and frontend rendering, I make sure your system stays fast, stable, and responsive as traffic grows. Performance is built in, not patched later.",
  },
  {
    id: 3,
    icon: <MessageSquare className="w-[35px] h-[35px]" />,
    title: "Product Thinking, Not Just Development",
    description:
      "I don’t build features blindly. I think about user flow, monetization logic, friction points, and long-term maintainability, so every technical decision supports business growth. You get a product engineer, not just a developer.",
  },
];

const stats = [
  {
    id: 1,
    title: "100%",
    description: "On-time Delivery",
  },
  {
    id: 2,
    title: "2+",
    description: "Years Experience",
  },
  {
    id: 3,
    title: "4.5+",
    description: "Review Rating",
  },
];

export default function WhyChooseMeSection() {
  const { isMobile, isTablet } = useDeviceType();
  const router = useRouter();
  return (
    <Section
      id="why-me"
      className="relative flex justify-center items-center gap-[84px]"
    >
      <div className="h-full min-h-[600px] flex flex-col lg:flex-row justify-between items-center gap-16">
        {/* Header Section */}
        <div className="w-full h-full flex flex-col items-center lg:items-start gap-[32px] lg:gap-[44px] xl:gap-[84px] max-w-full lg:max-w-[50%]">
          <div className="flex flex-col gap-5">
            <SectionHeader
              title="Engineered for "
              description="You don’t need someone to just write code. You need someone who understands product decisions, system architecture, and long-term scalability from day one."
              badgeText="Why Work With Me?"
              gradientText="Long-Term Growth"
              isAbout={isMobile || isTablet ? false : true}
            />

            <div className="w-full max-w-full lg:max-w-[220px]">
              <SectionSeparator
                orientation="horizontal"
                color="FFFFFF"
                centerOpacity={0.25}
                className="my-[12px]"
              />
            </div>
            <div className="flex flex-wrap justify-center lg:justify-start gap-[16px] lg:gap-20 items-center">
              {stats.map((item) => (
                <div key={item.id} className="flex flex-col gap-2 items-center">
                  <h4 className="lg:text-3xl text-[24px] font-bold text-white">
                    <GradientText>{item.title}</GradientText>
                  </h4>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <AnimatedButton onClick={() => router.push("/contact")}>
            Start Building the Right Way
          </AnimatedButton>
        </div>

        {/* Expandable Cards Area */}
        <div className="w-full max-w-full lg:max-w-[50%] h-full flex flex-col justify-center gap-5">
          {featureCards.map((card) => (
            <DynamicCard key={card.id} className="max-w-full min-h-[115px]">
              <div className="flex justify-between items-center">
                <span>{card.icon}</span>
                <p className="text-[24px] leading-[32px] font-bold text-white/70 transition-all duration-300 group-hover:text-white">
                  0{card.id}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-[18px] leading-[24px] font-semibold text-white">
                  {card.title}
                </h3>
                <p className="text-gray-400 text-[16px] leading-[22px] font-normal">
                  {card.description}
                </p>
              </div>
            </DynamicCard>
          ))}
        </div>
      </div>
    </Section>
  );
}
