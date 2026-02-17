"use client";

import React from "react";
import { Target, Code, MessageSquare } from "lucide-react";
import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";
import DynamicCard from "@/components/shared/DynamicCard";
import GradientText from "@/components/ui/gradient-text";
import AnimatedButton from "@/components/shared/AnimatedButton";
import router from "next/router";
import SectionSeparator from "@/components/shared/SectionSeparator";
import { useDeviceType } from "@/hooks/use-mobile";

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
    title: "No Generic Templates",
    description: "Research-based websites that make you stand out",
  },
  {
    id: 2,
    icon: <Code className="w-[35px] h-[35px]" />,
    title: "Conversion-focused pages",
    description: "Built to Spark Action and Turn Views into Results",
  },
  {
    id: 3,
    icon: <MessageSquare className="w-[35px] h-[35px]" />,
    title: "Messaging That Connect",
    description: "Crafting words that resonate with your ideal audience.",
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
              title="Why you should choose me as your "
              description="Delivering high-quality, on-demand designs with precision.
          Elevate your brand effortlessly, one snap at a time."
              badgeText="Why me?"
              gradientText="partner"
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
          <AnimatedButton onClick={() => router.push("/about")}>
            View about Imran
          </AnimatedButton>
        </div>

        {/* Expandable Cards Area */}
        <div className="w-full max-w-full lg:max-w-[50%] h-full flex flex-col justify-center gap-5">
          {featureCards.map((card) => (
            <DynamicCard key={card.id} className="max-w-full min-h-[115px]">
              <span>{card.icon}</span>
              <div className="flex flex-col gap-2">
                <h3 className="text-[18px] leading-[24px] font-semibold text-white">
                  {card.title}
                </h3>
                <p className="text-gray-400 text-[16px] leading-[22px] font-normal">
                  {card.description}
                </p>
              </div>
              <h6 className="absolute top-1/2 -translate-y-1/2 right-[30px] text-[24px] leading-[32px] font-bold text-white/70 transition-all duration-300 group-hover:text-white">
                0{card.id}
              </h6>
            </DynamicCard>
          ))}
        </div>
      </div>
    </Section>
  );
}
