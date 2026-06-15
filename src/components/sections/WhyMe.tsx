"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useRef } from "react";
import SectionNumberBadge from "@/components/shared/SectionNumberBadge";

// useLayoutEffect warns during SSR; this client component is still
// server-rendered, so fall back to useEffect on the server and use the
// layout effect on the client (sets the GSAP start state before paint).
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const CARDS = [
  {
    n: "01",
    title: "One person, the whole product",
    desc: "Architecture, frontend, backend, AI, and deploy. You hire one engineer who owns the outcome — not a team to coordinate.",
    featured: true,
  },
  {
    n: "02",
    title: "AI-native, not AI-curious",
    desc: "I ship AI features in production and run my own local model stack. Not learning on your dime.",
    featured: false,
  },
  {
    n: "03",
    title: "Senior decisions",
    desc: "I make the right technical call, not just the fast one. Architecture before features.",
    featured: false,
  },
  {
    n: "04",
    title: "Ships to production",
    desc: "Real products, live, with real users. Not prototypes, not demos.",
    featured: false,
  },
  {
    n: "05",
    title: "Founder-fluent",
    desc: "I work with non-technical founders without the jargon wall. You stay in the loop the whole way.",
    featured: false,
  },
  {
    n: "06",
    title: "Fast without sloppy",
    desc: "AI-augmented velocity with the same discipline. Weeks not months, without the rebuild later.",
    featured: false,
  },
];

// Cursor-following coral spotlight — writes CSS vars straight to the tile
// (no React state, so no per-frame re-render). The ::overlay reads --mx/--my.
function handleSpotlight(e: React.MouseEvent<HTMLDivElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  el.style.setProperty("--my", `${e.clientY - rect.top}px`);
}

export default function WhyMe() {
  const sectionRef = useRef<HTMLElement>(null);
  const tileRefs = useRef<HTMLDivElement[]>([]);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    const build = (y: number, stagger: number, start: string) => {
      gsap.fromTo(
        tileRefs.current,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger,
          scrollTrigger: {
            trigger: sectionRef.current,
            start,
            toggleActions: "play none none none",
          },
        }
      );
    };

    mm.add("(min-width: 768px)", () => build(24, 0.1, "top 75%"));
    mm.add("(max-width: 767px)", () => build(18, 0.08, "top 85%"));

    return () => mm.revert();
  }, []);

  return (
    <section id="why-me" ref={sectionRef} className="py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Header */}
        <div className="mb-14 max-w-[640px]">
          <SectionNumberBadge
            number="02"
            label="Why Work With Me"
            className="mb-4"
          />
          <h2 className="mb-4 font-serif text-[34px] text-text md:text-display-2">
            Why work with me.
          </h2>
          <p className="max-w-[540px] font-sans text-body-lg text-text-muted">
            Most founders hire a full-stack dev and an AI person and a project
            manager. I&apos;m the one person who covers all three.
          </p>
        </div>

        {/* Asymmetric bento mosaic: featured 2x2 top-left, 02/03 stacked
            top-right, 04/05/06 across the bottom. No empty cells. */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:auto-rows-[minmax(200px,auto)]">
          {CARDS.map((card, i) => (
            <div
              key={card.n}
              ref={(el) => {
                if (el) tileRefs.current[i] = el;
              }}
              onMouseMove={handleSpotlight}
              style={
                card.featured
                  ? {
                      backgroundImage:
                        "linear-gradient(135deg, rgba(233,119,87,0.13) 0%, #141414 55%)",
                    }
                  : undefined
              }
              className={`group relative flex flex-col overflow-hidden rounded-2xl border transition-colors duration-300 ease-out ${
                card.featured
                  ? "border-accent/40 p-9 shadow-[inset_0_0_60px_rgba(233,119,87,0.08)] hover:border-accent/60 lg:col-span-2 lg:row-span-2"
                  : "border-border bg-bg-elevated p-7 hover:border-border-strong"
              }`}
            >
              {/* Cursor-tracked coral spotlight */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(340px circle at var(--mx, 50%) var(--my, 0%), rgba(233,119,87,0.12), transparent 70%)",
                }}
              />

              {/* Number — top */}
              <span
                className={`relative z-10 font-mono text-mono-xs uppercase tracking-wider ${
                  card.featured ? "text-accent" : "text-text-subtle"
                }`}
              >
                {card.n}
              </span>

              {/* Title + desc — pushed to the bottom (editorial bento) */}
              <div className="relative z-10 mt-auto pt-12">
                <h3
                  className={`font-serif text-text ${
                    card.featured
                      ? "text-[30px] leading-tight"
                      : "text-[20px] leading-snug"
                  }`}
                >
                  {card.title}
                </h3>
                <p className="mt-2 font-sans text-small leading-relaxed text-text-muted">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
