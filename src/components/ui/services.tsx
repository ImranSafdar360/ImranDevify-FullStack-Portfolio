"use client";

import React, { useEffect, useRef, useState } from "react";
import GradientText from "./gradient-text";
import AnimatedButton from "../Button";

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
    new Array(services.length).fill(false)
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
    <section className="w-full py-20 md:py-32">
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
            Helping You Transform <GradientText>Your Product</GradientText>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            From idea to scalable product — I design, build, and optimize
            digital experiences that perform in the real world.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {services.map((service, index) => (
            <div
              key={service.label}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className={`relative rounded-[12px] p-6 md:p-8 transition-all duration-500 ${
                visibleCards[index]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                background: service.isHero
                  ? "#2a2a2a"
                  : "#262626",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: service.isHero
                  ? "0 20px 60px rgba(0, 0, 0, 0.4)"
                  : "0 10px 40px rgba(0, 0, 0, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow = "0 25px 70px rgba(0, 199, 254, 0.2)";
                e.currentTarget.style.borderColor = "rgba(0, 199, 254, 0.4)";
                e.currentTarget.style.background = service.isHero
                  ? "#2d2d2d"
                  : "#2a2a2a";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = service.isHero
                  ? "0 20px 60px rgba(0, 0, 0, 0.4)"
                  : "0 10px 40px rgba(0, 0, 0, 0.3)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                e.currentTarget.style.background = service.isHero
                  ? "#2a2a2a"
                  : "#262626";
              }}
            >
              {/* Rotated Label - Sticker Style */}
              <div
                className="absolute top-4 left-4 px-3 py-1.5 rounded-sm text-xs font-bold text-white uppercase tracking-wider"
                style={{
                  background: "#1a1a1a",
                  border: "1px solid rgba(255, 255, 255, 0.25)",
                  transform: "rotate(-3deg)",
                  transformOrigin: "top left",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                }}
              >
                {service.label}
              </div>

              {/* Content */}
              <div className="mt-12 md:mt-14">
                {/* Title */}
                <h3
                  className="text-2xl md:text-3xl mb-4 text-white font-bold transition-colors duration-300"
                  style={{
                    fontFamily: "var(--font-boldonse)",
                    fontWeight: 400,
                    fontStyle: "normal",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#00C7FE";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#ffffff";
                  }}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Dashed Line */}
                <div
                  className="w-full h-px mb-6"
                  style={{
                    background: "repeating-linear-gradient(to right, rgba(255, 255, 255, 0.2) 0px, rgba(255, 255, 255, 0.2) 8px, transparent 8px, transparent 16px)",
                  }}
                />

                {/* Services List */}
                <ul className="space-y-3">
                  {service.services.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <div
                        className="w-full h-px mt-2.5 flex-shrink-0"
                        style={{
                          background: "repeating-linear-gradient(to right, rgba(255, 255, 255, 0.15) 0px, rgba(255, 255, 255, 0.15) 4px, transparent 4px, transparent 8px)",
                          maxWidth: "40px",
                        }}
                      />
                      <span className="text-gray-300 text-sm md:text-base leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Micro-Line */}
        <p className="text-center text-gray-400 text-sm md:text-base mb-8">
          Built with performance, scalability, and user experience in mind — from
          day one.
        </p>

        {/* CTA */}
        <div className="flex justify-center">
          <AnimatedButton onClick={() => {}}>
            Have a product in mind? Let&apos;s build it right.
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
}

