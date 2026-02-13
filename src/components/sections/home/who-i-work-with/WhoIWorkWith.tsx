"use client";

import React from "react";
import GradientText from "@/components/ui/gradient-text";
import AnimatedButton from "@/components/shared/AnimatedButton";
import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";

interface ClientCard {
  title: string;
  description: string;
  microPoints: string[];
}

const clients: ClientCard[] = [
  {
    title: "Digital Agencies",
    description:
      "For agencies that need a reliable development partner to execute clean, scalable work — without hand-holding or shortcuts.",
    microPoints: [
      "White-label development",
      "Scalable frontends & APIs",
      "Clean handoff and documentation",
    ],
  },
  {
    title: "SaaS Founders",
    description:
      "For founders turning ideas into real products — MVPs, dashboards, internal tools, and customer-facing platforms built to scale.",
    microPoints: [
      "MVP → production",
      "Performance-focused builds",
      "Long-term product thinking",
    ],
  },
  {
    title: "Small Businesses",
    description:
      "For businesses investing in digital products, not quick fixes — where code quality, performance, and UX actually matter.",
    microPoints: [
      "Custom platforms",
      "Internal systems",
      "Growth-ready architecture",
    ],
  },
];

export default function WhoIWorkWith() {
  return (
    <Section
      className="relative flex flex-col justify-center items-center gap-[84px]"
    >
      <SectionHeader
        className="max-w-[60%] items-center gap-[8px]"
        title="Who I Usually "
        description="I work with people building serious products — not just websites. Teams that care about quality, clarity, and long-term impact."
        badgeText="Who I Work With"
        gradientText="Work With"
      />

      {/* Client Cards Grid - 3 Equal Width Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4">
        {clients.map((client) => (
          <div
            key={client.title}
            className={`group relative flex flex-col gap-[40px] rounded-[40px] p-[40px] transition-all duration-500 ease-out`}
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
            }}
          >
            {/* Header with Icon/Dot */}
            <div className="flex flex-col gap-[36px] relative z-10">
              <div className="flex items-center gap-2">
                <GradientText>
                  <p className="text-[28px] leading-[32px] font-bold text-white">
                    ●
                  </p>
                </GradientText>
                <h4 className="text-[28px] leading-[32px] font-bold text-white">
                  {client.title}
                </h4>
              </div>
              {/* Description */}
              <p className="text-[20px] leading-[28px] font-medium text-white/70 relative z-10">
                {client.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div>
        {/* Bottom Line */}
        <p className="text-center text-gray-500 text-sm md:text-base mb-10 font-light tracking-wide italic">
          &ldquo;Serious about your product and your online presence?&rdquo;
        </p>

        {/* CTA */}
        <div className="flex justify-center">
          <AnimatedButton onClick={() => { }}>
            Let&apos;s Build It Right
          </AnimatedButton>
        </div>
      </div>
    </Section>
  );
}
