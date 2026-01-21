"use client";

import React, { useEffect, useRef, useState } from "react";
import GradientText from "./gradient-text";
import AnimatedButton from "../Button";

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
    <section
      className="w-full py-20 md:py-32"
      style={{ background: "#06090D" }}
    >
      <div className="w-full max-w-[1440px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl mb-6 text-white"
            style={{
              fontFamily: "var(--font-boldonse)",
            }}
          >
            Who I Usually <GradientText>Work With</GradientText>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            I work with people building serious products — not just websites.
            Teams that care about quality, clarity, and long-term impact.
          </p>
        </div>

        {/* Client Cards Grid - 3 Equal Width Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 mb-16">
          {clients.map((client, index) => (
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

        {/* Bottom Line */}
        <p className="text-center text-gray-500 text-sm md:text-base mb-10 font-light tracking-wide italic">
          &ldquo;Serious about your product and your online presence?&rdquo;
        </p>

        {/* CTA */}
        <div className="flex justify-center">
          <AnimatedButton onClick={() => {}}>
            Let&apos;s Build It Right
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
}
