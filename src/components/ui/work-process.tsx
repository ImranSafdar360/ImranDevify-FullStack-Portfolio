"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GradientText from "./gradient-text";
import AnimatedButton from "../Button";
import Image from "next/image";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ProcessStep {
  id: string;
  title: string;
  description: string;
  points: string[];
  image: string;
}

const processSteps: ProcessStep[] = [
  {
    id: "01",
    title: "STRATEGY & DISCOVERY",
    description:
      "Deep diving into your vision, requirements, and user needs to build a solid foundation. No shortcuts, just pure alignment.",
    points: [
      "User research & competitive analysis",
      "Requirement documentation & technical scoping",
      "Goal setting & success metrics definition",
    ],
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "02",
    title: "ARCHITECTURE & DESIGN",
    description:
      "Crafting high-performance architecture and user-centric designs that are built to scale and delight.",
    points: [
      "Scalable system & database architecture",
      "UI/UX wireframing & high-fidelity prototyping",
      "Brand-aligned design systems",
    ],
    image:
      "https://images.unsplash.com/photo-1586717791821-3f44a563cc4c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "03",
    title: "PRECISION ENGINEERING",
    description:
      "Translating designs into clean, maintainable, and highly optimized code using the most advanced tech stacks.",
    points: [
      "Full-stack development (MERN, Next.js)",
      "API development & third-party integrations",
      "Unit testing & code optimization",
    ],
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "04",
    title: "DEPLOYMENT & GROWTH",
    description:
      "Ensuring a seamless launch and continuous optimization to keep your product fast, stable, and ready for more users.",
    points: [
      "CI/CD pipeline & cloud deployment",
      "Core Web Vitals & performance monitoring",
      "Post-launch support & iterative features",
    ],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
  },
];

export default function WorkProcess() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsRootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !stepsRootRef.current) return;

      const steps = gsap.utils.toArray<HTMLElement>(".process-item");
      const contents = gsap.utils.toArray<HTMLElement>(".process-content");
      const images = gsap.utils.toArray<HTMLElement>(
        ".process-image-container"
      );

      // Total height calculation for the section or pin duration
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${processSteps.length * 100}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      steps.forEach((step, i) => {
        // Step expansion
        if (i > 0) {
          tl.to(
            contents[i],
            {
              height: "auto",
              opacity: 1,
              duration: 1,
              ease: "power2.inOut",
            },
            i
          );

          tl.to(
            images[i],
            {
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: "power2.inOut",
            },
            i
          );

          // Close previous content
          tl.to(
            contents[i - 1],
            {
              height: 0,
              opacity: 0,
              duration: 1,
              ease: "power2.inOut",
            },
            i
          );

          tl.to(
            images[i - 1],
            {
              opacity: 0,
              scale: 0.9,
              duration: 1,
              ease: "power2.inOut",
            },
            i
          );
        } else {
          // First step is open by default but we still want it in the timeline
          tl.set(contents[0], { height: "auto", opacity: 1 });
          tl.set(images[0], { opacity: 1, scale: 1 });
        }

        // Final state: close last element if user continues scrolling past
        if (i === steps.length - 1) {
          tl.to(
            contents[i],
            {
              height: 0,
              opacity: 0,
              duration: 1,
              ease: "power2.inOut",
            },
            i + 1
          );
          tl.to(
            images[i],
            {
              opacity: 0,
              scale: 0.9,
              duration: 1,
              ease: "power2.inOut",
            },
            i + 1
          );
        }
      });

      return () => {
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#06090D] overflow-hidden min-h-screen flex flex-col justify-center"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 py-12 md:py-20 flex flex-col h-full">
        {/* Section Header - Sticky-ish behavior relative to pin */}
        <div className="mb-12 md:mb-16">
          <div className="flex justify-between items-end gap-6 flex-wrap">
            <div>
              <h2
                className="text-5xl md:text-7xl lg:text-8xl text-white mb-6"
                style={{
                  fontFamily: "var(--font-boldonse)",
                  fontWeight: 400,
                  fontStyle: "normal",
                  lineHeight: 0.9,
                }}
              >
                Work <GradientText>Process</GradientText>
              </h2>
              <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed">
                Modern, functional design that puts users first and helps your
                product stand out.
              </p>
            </div>
            <div className="hidden lg:block">
              <AnimatedButton onClick={() => {}}>
                View More Detail
              </AnimatedButton>
            </div>
          </div>
        </div>

        {/* Main Interaction Area */}
        <div
          ref={containerRef}
          className="flex-1 flex flex-col lg:flex-row gap-12 items-start"
        >
          {/* Accordion List */}
          <div ref={stepsRootRef} className="w-full lg:w-3/5 space-y-0">
            {processSteps.map((step, index) => (
              <div
                key={step.id}
                className="process-item border-b border-white/10 last:border-0"
              >
                <div className="py-8 md:py-10">
                  <h3
                    className="text-3xl md:text-5xl lg:text-6xl text-white uppercase mb-0 cursor-default"
                    style={{
                      fontFamily: "var(--font-boldonse)",
                      fontWeight: 400,
                      fontStyle: "normal",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {step.title}
                  </h3>

                  {/* Detailed Content - Animates height and opacity */}
                  <div className="process-content h-0 opacity-0 overflow-hidden">
                    <div className="pt-8 pb-4">
                      <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8 max-w-xl font-light">
                        {step.description}
                      </p>
                      <ul className="space-y-4">
                        {step.points.map((point, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-4 text-gray-300"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-[#00C7FE]" />
                            <span className="text-base md:text-lg font-light tracking-wide">
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Persistent Image Area (Right) */}
          <div className="hidden lg:flex w-2/5 h-[450px] sticky top-1/2 -translate-y-1/2 items-center justify-center">
            <div className="relative w-full h-full rounded-[32px] overflow-hidden bg-white/5 border border-white/10 backdrop-blur-xl transition-all duration-700 hover:border-[#00C7FE]/30 hover:shadow-[0_0_50px_rgba(0,199,254,0.1)]">
              {processSteps.map((step, index) => (
                <div
                  key={`img-${step.id}`}
                  className="process-image-container absolute inset-0 opacity-0 scale-90 transition-all duration-700 flex items-center justify-center p-8"
                >
                  <div className="relative w-full h-full rounded-[24px] overflow-hidden">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06090D] via-transparent to-transparent opacity-40" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile-only CTA */}
        <div className="lg:hidden mt-8 flex justify-center">
          <AnimatedButton onClick={() => {}}>View More Detail</AnimatedButton>
        </div>
      </div>
    </section>
  );
}
