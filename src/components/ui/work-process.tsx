"use client";

import React from "react";
import GradientText from "./gradient-text";
import AnimatedButton from "../Button";

interface ProcessStep {
  stepNumber: string;
  title: string;
  description: string;
  timeline: string;
  visualPosition: "left" | "right";
}

const processSteps: ProcessStep[] = [
  {
    stepNumber: "01",
    title: "DISCOVER",
    description:
      "Before writing a single line of code, I focus on understanding: your product vision, your users, your technical and business goals. We align on scope, priorities, and success metrics — so we build the right thing, not just something.",
    timeline: "Week 1",
    visualPosition: "left",
  },
  {
    stepNumber: "02",
    title: "DESIGN & PLAN",
    description:
      "This is where ideas become a real, scalable plan. I define: application architecture, data flow & integrations, UX structure (in collaboration or dev-led design). Everything is planned to support growth, performance, and future features.",
    timeline: "Week 1–2",
    visualPosition: "right",
  },
  {
    stepNumber: "03",
    title: "BUILD",
    description:
      "I build using modern, production-ready technologies with a focus on: clean, maintainable code, performance optimization, scalable architecture. You'll get regular updates, visibility into progress, and zero surprises.",
    timeline: "Week 2–6",
    visualPosition: "left",
  },
  {
    stepNumber: "04",
    title: "LAUNCH & SCALE",
    description:
      "After launch, the work doesn't stop. I help with: testing & deployment, performance monitoring, iterative improvements. So your product stays fast, stable, and ready to scale as users grow.",
    timeline: "Ongoing",
    visualPosition: "right",
  },
];

export default function WorkProcess() {


  return (
    <section className="w-full py-20 md:py-32" style={{ background: "#06090D" }}>
      <div className="w-full max-w-[1440px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <p
            className="text-sm md:text-base mb-4 uppercase tracking-wider"
            style={{ color: "#00C7FE" }}
          >
            My Work Process
          </p>
          <h2
            className="text-4xl md:text-5xl lg:text-6xl mb-6 text-white"
            style={{
              fontFamily: "var(--font-boldonse)",
              fontWeight: 400,
              fontStyle: "normal",
            }}
          >
            A Clear Process. <GradientText>Zero Guesswork.</GradientText>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            From first conversation to production-ready product — every step is
            structured, transparent, and built for momentum.
          </p>
        </div>

        {/* Process Steps with Timeline */}
        {/* <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 hidden md:block">
            <div
              className="w-full h-full"
              style={{ background: "rgba(255, 255, 255, 0.2)" }}
            />
          </div>

          <div className="space-y-24 md:space-y-32">
            {processSteps.map((step, index) => (
              <div
                key={step.stepNumber}
                ref={(el) => {
                  stepRefs.current[index] = el;
                }}
                className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center ${
                  visibleSteps[index]
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                } transition-all duration-700`}
              >
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block z-10">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ background: "#ffffff" }}
                  />
                </div>

                <div
                  className={
                    step.visualPosition === "left"
                      ? "order-2 md:order-1"
                      : "order-2 md:order-2"
                  }
                >
                  {step.visualPosition === "left" ? (
                    <div className="flex justify-start">
                      <CubeIcon />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 mb-4">
                        <span
                          className="text-sm md:text-base font-bold uppercase tracking-wider"
                          style={{ color: "#00C7FE" }}
                        >
                          Process {step.stepNumber}
                        </span>
                      </div>
                      <h3
                        className="text-3xl md:text-4xl lg:text-5xl text-white font-bold mb-4"
                        style={{
                          fontFamily: "var(--font-boldonse)",
                          fontWeight: 400,
                          fontStyle: "normal",
                        }}
                      >
                        {step.title}
                      </h3>
                      <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                        {step.description}
                      </p>
                      <div className="mt-6">
                        <span
                          className="text-sm md:text-base font-medium"
                          style={{ color: "#00C7FE" }}
                        >
                          Timeline: {step.timeline}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div
                  className={
                    step.visualPosition === "left"
                      ? "order-1 md:order-2"
                      : "order-1 md:order-1"
                  }
                >
                  {step.visualPosition === "left" ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 mb-4">
                        <span
                          className="text-sm md:text-base font-bold uppercase tracking-wider"
                          style={{ color: "#00C7FE" }}
                        >
                          Process {step.stepNumber}
                        </span>
                      </div>
                      <h3
                        className="text-3xl md:text-4xl lg:text-5xl text-white font-bold mb-4"
                        style={{
                          fontFamily: "var(--font-boldonse)",
                          fontWeight: 400,
                          fontStyle: "normal",
                        }}
                      >
                        {step.title}
                      </h3>
                      <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                        {step.description}
                      </p>
                      <div className="mt-6">
                        <span
                          className="text-sm md:text-base font-medium"
                          style={{ color: "#00C7FE" }}
                        >
                          Timeline: {step.timeline}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-end">
                      <CubeIcon />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div> */}

        

        {/* Optional Micro CTA */}
        <div className="text-center mt-16 md:mt-20">
          <p className="text-gray-300 text-lg md:text-xl mb-6">
            Have a product in mind?
          </p>
          <AnimatedButton onClick={() => {}}>
            Let&apos;s build it with clarity, not chaos.
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
}

