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
    title: "Product-Driven Businesses",
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
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    new Array(clients.length).fill(false)
  );
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers = itemRefs.current.map((ref, index) => {
      if (!ref) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                setVisibleItems((prev) => {
                  const newState = [...prev];
                  newState[index] = true;
                  return newState;
                });
              }, index * 150); // Staggered delay
            }
          });
        },
        { threshold: 0.1 }
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
    <section className="w-full py-20 md:py-32" style={{ background: "#06090D" }}>
      <div className="w-full max-w-[1440px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl mb-6 text-white"
            style={{
              fontFamily: "var(--font-boldonse)",
              fontWeight: 400,
              fontStyle: "normal",
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
          {clients.map((client, index) => (
            <div
              key={client.title}
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              className={`relative rounded-[12px] p-6 md:p-8 transition-all duration-500 ${
                visibleItems[index]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                background: "#262626",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(0, 199, 254, 0.2)";
                e.currentTarget.style.borderColor = "rgba(0, 199, 254, 0.4)";
                const titleElement = e.currentTarget.querySelector("h4");
                if (titleElement) {
                  (titleElement as HTMLElement).style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 32px 0 rgba(0, 0, 0, 0.3)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                const titleElement = e.currentTarget.querySelector("h4");
                if (titleElement) {
                  (titleElement as HTMLElement).style.transform = "translateY(0)";
                }
              }}
            >
              {/* Blue Bullet Point */}
              <div className="flex items-start gap-3 mb-4">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0 mt-1.5 transition-all duration-300"
                  style={{ background: "#00C7FE" }}
                />
                <h4
                  className="text-xl md:text-2xl text-white font-bold transition-all duration-300"
                  style={{
                    fontFamily: "var(--font-boldonse)",
                    fontWeight: 400,
                    fontStyle: "normal",
                  }}
                >
                  {client.title}
                </h4>
              </div>

              {/* Description */}
              <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
                {client.description}
              </p>

              {/* Micro Points */}
              <ul className="space-y-2 ml-6">
                {client.microPoints.map((point, pointIndex) => (
                  <li
                    key={pointIndex}
                    className="text-gray-400 text-xs md:text-sm leading-relaxed flex items-start gap-2"
                  >
                    <span className="text-[#00C7FE] mt-1.5">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Line */}
        <p className="text-center text-gray-300 text-lg md:text-xl mb-8">
          Serious about your product and your online presence?
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

