"use client";

import React from "react";
import GradientText from "@/components/ui/gradient-text";
import { Target, Code, MessageSquare } from "lucide-react";

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
  return (
    <section className="w-full py-24 md:py-32 relative overflow-hidden">
      <div className="w-full max-w-[1440px] mx-auto px-6 relative z-10">
        <div className="w-full h-[400px] min-h-[400px] flex justify-between items-center gap-16">
          {/* Header Section */}
          <div className="w-full h-full flex flex-col justify-between max-w-[40%]">
            <div className="flex flex-col gap-4">
              <h2
                className="text-4xl md:text-5xl text-white leading-tight"
                style={{ fontFamily: "var(--font-boldonse)" }}
              >
                Why Teams <GradientText>Choose Me</GradientText>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                I partner with founders and agencies who need more than just a
                developer. You get a technical partner who cares about the
                product as much as you do.
              </p>
            </div>

            <div className="flex justify-between items-center">
              {stats.map((item) => (
                <div key={item.id} className="flex flex-col gap-2 items-center">
                  <h4 className="text-3xl font-bold text-white">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-500 uppercase tracking-wider">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Expandable Cards Area */}
          <div className="w-full max-w-[50%] flex flex-col gap-5">
            {featureCards.map((card) => (
              <div
                key={card.id}
                className="relative group cursor-pointer w-full min-h-[115px] flex items-center gap-7 p-[30px] bg-white/5 rounded-[24px] transition-all duration-300 hover:scale-105"
              >
                <span>{card.icon}</span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-[18px] leading-[24px] font-semibold text-white">
                    {card.title}
                  </h3>
                  <p className="text-gray-400 text-[16px] leading-[22px] font-normal">
                    {card.description}
                  </p>
                </div>
                <h6
                  className="absolute top-1/2 -translate-y-1/2 right-[30px] text-[24px] leading-[32px] font-bold text-white/70 transition-all duration-300 group-hover:text-white"
                  // style={{ fontFamily: "var(--font-boldonse)" }}
                >
                  0{card.id}
                </h6>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
