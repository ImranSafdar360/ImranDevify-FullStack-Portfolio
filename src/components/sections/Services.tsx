"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useRef } from "react";

// useLayoutEffect warns during SSR; this client component is still
// server-rendered, so fall back to useEffect on the server and use the
// layout effect on the client (sets the GSAP start state before paint).
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const SERVICES = [
  {
    n: "01",
    name: "AI-powered SaaS products",
    desc: "End-to-end. Web app, payments, dashboard, and AI features built into the product from day one.",
  },
  {
    n: "02",
    name: "Cross-platform mobile",
    desc: "React Native with Expo. iOS and Android from one codebase, engineered to stay stable under real users.",
  },
  {
    n: "03",
    name: "AI integration into existing products",
    desc: "Already have a SaaS? I add intelligent features without rebuilding what already works.",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.fromTo(
        cardRefs.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.14,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    mm.add("(max-width: 767px)", () => {
      gsap.fromTo(
        cardRefs.current,
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Header */}
        <div className="mb-14">
          <p className="mb-4 font-mono text-meta uppercase tracking-wider text-text-subtle">
            What I Build
          </p>
          <h2 className="mb-4 font-serif text-[34px] text-text md:text-display-2">
            What I build.
          </h2>
          <p className="max-w-[520px] font-sans text-body-lg text-text-muted">
            Three ways I work with founders — from full product builds to
            dropping intelligence into something you&apos;ve already shipped.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {SERVICES.map((service, i) => (
            <div
              key={service.n}
              ref={(el) => {
                if (el) cardRefs.current[i] = el;
              }}
              className="service-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-bg-elevated p-8 transition-colors duration-150 ease-out hover:bg-bg-subtle"
            >
              {/* Coral border-draw overlay (animated via globals.css on hover) */}
              <svg
                aria-hidden
                className="pointer-events-none absolute inset-0 h-full w-full"
              >
                <rect x={1} y={1} rx={16} ry={16} fill="none" pathLength={100} />
              </svg>

              <span className="mb-8 font-mono text-mono-sm text-accent">
                {service.n}
              </span>
              <h3 className="mb-3 font-serif text-h4 text-text">
                {service.name}
              </h3>
              <p className="font-sans text-body leading-relaxed text-text-muted">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
