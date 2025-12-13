"use client";

import React, { useEffect, useRef, useState } from "react";
import GradientText from "./gradient-text";
import { Target, Code, MessageSquare } from "lucide-react";

interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  number: string;
}

const featureCards: FeatureCard[] = [
  {
    icon: <Target className="w-6 h-6" />,
    title: "Product-First Thinking",
    description:
      "I approach every project from a product mindset — balancing user experience, business goals, and technical feasibility from day one.",
    number: "01",
  },
  {
    icon: <Code className="w-6 h-6" />,
    title: "Clean, Scalable Code",
    description:
      "I build systems that are easy to maintain, easy to scale, and easy for other developers to work with — no shortcuts, no chaos.",
    number: "02",
  },
  {
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Clear Communication & Ownership",
    description:
      "You'll always know what's happening, why decisions are made, and what comes next. I take ownership and deliver with accountability.",
    number: "03",
  },
];

interface Stat {
  value: string;
  label: string;
}

const stats: Stat[] = [
  {
    value: "2+",
    label: "Years Professional development experience",
  },
  {
    value: "20+",
    label: "Projects Web & mobile products shipped",
  },
  {
    value: "100%",
    label: "Focus Performance, scalability, and product quality",
  },
];

export default function WhyChooseMeSection() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(
    new Array(featureCards.length).fill(false)
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
    <section className="w-full py-20 md:py-32" style={{ background: "#06090D" }}>
      <div className="w-full max-w-[1440px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Side - Content & Stats */}
          <div className="space-y-8">
            {/* Title */}
            <h2
              className="text-4xl md:text-5xl lg:text-4xl text-white mb-6"
              style={{
                fontFamily: "var(--font-boldonse)",
                fontWeight: 400,
                fontStyle: "normal",
              }}
            >
              Why Teams <GradientText>Choose Me</GradientText> as Their
              Development Partner
            </h2>

            {/* Short Brief */}
            <div className="space-y-4 mb-12">
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                I don&apos;t just write code — I help teams build products that
                stay fast, stable, and maintainable as they grow.
              </p>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                My focus is simple: clear communication, clean architecture, and
                results that last beyond launch.
              </p>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                I work like a long-term partner, not a short-term contractor.
              </p>
            </div>

            {/* Stats - Horizontal Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <div
                    className="text-5xl md:text-6xl lg:text-7xl text-white font-bold"
                    style={{
                      fontFamily: "var(--font-boldonse)",
                      fontWeight: 400,
                      fontStyle: "normal",
                    }}
                  >
                    {stat.value}
                  </div>
                  <p className="text-gray-400 text-sm md:text-base">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Feature Cards */}
          <div className="space-y-6">
            {featureCards.map((card, index) => (
              <div
                key={card.number}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={`relative rounded-[12px] p-6 md:p-8 transition-all duration-500 ${
                  visibleCards[index]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  background: "rgba(255, 255, 255, 0.06)",
                  backdropFilter: "blur(24px) saturate(180%)",
                  WebkitBackdropFilter: "blur(24px) saturate(180%)",
                  border: "1px solid rgba(255, 255, 255, 0.12)",
                  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.25)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 40px rgba(0, 199, 254, 0.15)";
                  e.currentTarget.style.borderColor = "rgba(0, 199, 254, 0.3)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 32px 0 rgba(0, 0, 0, 0.25)";
                  e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.06)";
                }}
              >
                {/* Card Content */}
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-white"
                    style={{
                      background: "rgba(0, 199, 254, 0.1)",
                      border: "1px solid rgba(0, 199, 254, 0.2)",
                    }}
                  >
                    {card.icon}
                  </div>

                  {/* Text Content */}
                  <div className="flex-1">
                    <h3
                      className="text-xl md:text-2xl mb-3 text-white font-bold"
                      style={{
                        fontFamily: "var(--font-boldonse)",
                        fontWeight: 400,
                        fontStyle: "normal",
                      }}
                    >
                      {card.title}
                    </h3>
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  {/* Number Badge */}
                  <div
                    className="flex-shrink-0 text-gray-400 text-2xl md:text-3xl font-bold"
                    style={{
                      fontFamily: "var(--font-boldonse)",
                      fontWeight: 400,
                      fontStyle: "normal",
                    }}
                  >
                    {card.number}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

