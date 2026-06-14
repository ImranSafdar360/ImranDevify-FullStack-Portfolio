"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useRef } from "react";

// useLayoutEffect warns during SSR; this client component is still
// server-rendered, so fall back to useEffect on the server and use the
// layout effect on the client (sets the GSAP start state before paint).
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const STEPS = [
  {
    n: "01",
    title: "Clarity",
    desc: "We define the product, not the feature list. Goals, scope, what scales, what doesn't.",
  },
  {
    n: "02",
    title: "Architecture",
    desc: "Backend, database, API contracts, AI integration points. Before any UI.",
  },
  {
    n: "03",
    title: "Build",
    desc: "Shipped in production-ready increments. You see real progress weekly, not at the end.",
  },
  {
    n: "04",
    title: "Iterate",
    desc: "Launch is the start, not the finish. Performance, AI tuning, scaling decisions, all in scope.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<HTMLDivElement[]>([]);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // 1. Draw the progress line as the section scrolls through the viewport.
      gsap.fromTo(
        progressLineRef.current,
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: stepsContainerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        }
      );

      // 2. Reveal each step (fade + slide) as it enters.
      stepRefs.current.forEach((step) => {
        gsap.fromTo(
          step,
          { opacity: 0, x: 20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: step,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    });

    // Mobile: the line still draws on scroll; steps stay visible (no per-step reveal).
    mm.add("(max-width: 767px)", () => {
      gsap.fromTo(
        progressLineRef.current,
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: stepsContainerRef.current,
            start: "top 70%",
            end: "bottom center",
            scrub: true,
          },
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="py-20 md:py-28">
      <div className="mx-auto max-w-[820px] px-6">
        {/* Header */}
        <div className="mb-16">
          <p className="mb-4 font-mono text-meta uppercase tracking-wider text-text-subtle">
            How a project runs
          </p>
          <h2 className="mb-4 font-serif text-[34px] text-text md:text-display-2">
            How a project actually runs.
          </h2>
          <p className="max-w-[520px] font-sans text-body-lg text-text-muted">
            No black-box process. You see where the product is, every week, from
            first call to launch and beyond.
          </p>
        </div>

        {/* Steps with timeline */}
        <div ref={stepsContainerRef} className="relative">
          {/* Static track line */}
          <div className="absolute bottom-0 left-[31px] top-0 w-[2px] bg-border" />
          {/* Animated progress line (height drawn by GSAP on scroll) */}
          <div
            ref={progressLineRef}
            className="absolute left-[31px] top-0 w-[2px] bg-accent"
            style={{ height: "0%" }}
          />

          {STEPS.map((step, i) => (
            <div
              key={step.n}
              ref={(el) => {
                if (el) stepRefs.current[i] = el;
              }}
              className="relative grid grid-cols-[64px_1fr] items-start gap-6 py-8"
            >
              {/* Number node — bg-bg mask makes the line appear to pass behind it */}
              <div className="relative z-10 flex justify-center">
                <span className="bg-bg px-2 py-1 font-mono text-[28px] leading-none text-accent">
                  {step.n}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-h4 text-text">{step.title}</h3>
                <p className="mt-2 font-sans text-base leading-relaxed text-text-muted">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
