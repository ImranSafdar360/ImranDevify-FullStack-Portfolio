"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionNumberBadge from "@/components/shared/SectionNumberBadge";
import { useEffect, useLayoutEffect, useRef } from "react";

// useLayoutEffect warns during SSR; this client component is still
// server-rendered, so fall back to useEffect on the server and use the
// layout effect on the client (sets the GSAP start state before paint).
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const ALSO_SHIPPED = [
  {
    name: "React Panelist",
    desc: "Contributed UI and feature work to a live SaaS panel management platform.",
    stack: "React, TypeScript, Redux Toolkit",
    url: "#",
  },
  {
    name: "Sit Down Members",
    desc: "Built features and UI for an engagement platform for business leaders.",
    stack: "Next.js, Firebase, Redux Toolkit",
    url: "#",
  },
  {
    name: "Abdullah Designs",
    desc: "Built a creative portfolio site for a designer client.",
    stack: "React, GSAP, Locomotive",
    url: "#",
  },
];

export default function AlsoShipped() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<HTMLAnchorElement[]>([]);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.fromTo(
        rowRefs.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.12,
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
        rowRefs.current,
        { opacity: 0, y: 16 },
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
    <section id="also-shipped" ref={sectionRef} className="py-20 md:py-28">
      <div className="container">
        {/* Header */}
        <div className="mb-12">
          <SectionNumberBadge number="03" label="Also Shipped" className="mb-4" />
          <h2 className="mb-4 font-serif text-[34px] text-text md:text-display-2">
            Also shipped.
          </h2>
          <p className="max-w-[520px] font-sans text-body-lg text-text-muted">
            Beyond the flagship work — products I&apos;ve contributed meaningful
            features and UI to.
          </p>
        </div>

        {/* Rows */}
        <div className="divide-y divide-border border-b border-border">
          {ALSO_SHIPPED.map((item, i) => (
            <a
              key={item.name}
              href={item.url}
              ref={(el) => {
                if (el) rowRefs.current[i] = el;
              }}
              className="group relative grid grid-cols-1 gap-2 rounded-lg px-6 py-6 transition-all duration-200 ease-out hover:bg-bg-elevated md:grid-cols-[280px_1fr_auto] md:items-center md:gap-8"
            >
              {/* Left coral accent bar — scales in vertically on hover */}
              <span
                aria-hidden
                className="absolute left-0 top-0 h-full w-[2px] origin-center scale-y-0 bg-accent opacity-0 transition-all duration-200 ease-out group-hover:scale-y-100 group-hover:opacity-100"
              />

              <span className="font-sans text-[17px] font-medium text-text">
                {item.name}
              </span>
              <span className="font-sans text-small text-text-muted transition-colors duration-200 group-hover:text-text">
                {item.desc}
              </span>
              <span className="flex items-center gap-3 font-mono text-mono-xs uppercase text-text-subtle">
                {item.stack}
                <span className="inline-block transition-[transform,color] duration-150 group-hover:translate-x-1 group-hover:text-accent">
                  →
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
