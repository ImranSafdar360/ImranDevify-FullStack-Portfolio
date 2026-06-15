"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef } from "react";
import SectionNumberBadge from "@/components/shared/SectionNumberBadge";

// useLayoutEffect warns during SSR; this client component is still
// server-rendered, so fall back to useEffect on the server and use the
// layout effect on the client (sets the GSAP start state before paint).
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const MODELS = [
  {
    n: "01",
    label: "FRACTIONAL ENGINEERING",
    title: "Embedded in your team",
    desc: "I join your team as the engineer who ships AI-powered features week to week. Ongoing, embedded, accountable for outcomes — without the cost or commitment of a full-time senior hire.",
    best: "Best for funded startups shipping continuously.",
  },
  {
    n: "02",
    label: "MVP BUILD",
    title: "Zero to launched product",
    desc: "From architecture to a shipped, production-ready MVP — end to end, in weeks not months. Clean foundations that scale, not a throwaway prototype you rebuild in six months.",
    best: "Best for founders validating a new product.",
  },
  {
    n: "03",
    label: "AI INTEGRATION",
    title: "Intelligence into what you have",
    desc: "You already have a SaaS. I add the AI features — recommendations, search, assistants — without rebuilding what already works. Surgical, scoped, shipped.",
    best: "Best for existing products adding an AI layer.",
  },
];

export default function EngagementModels() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<HTMLDivElement[]>([]);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.fromTo(
        rowRefs.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.15,
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
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.12,
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
    <section id="engagement" ref={sectionRef} className="py-20 md:py-28">
      <div className="mx-auto max-w-[1100px] px-6">
        {/* Header */}
        <div className="mb-14">
          <SectionNumberBadge
            number="07"
            label="Engagement Models"
            className="mb-4"
          />
          <h2 className="mb-4 font-serif text-[34px] text-text md:text-display-2">
            How we can work together.
          </h2>
          <p className="max-w-[560px] font-sans text-body-lg text-text-muted">
            Three ways to bring me in — depending on where your product is and
            what you need shipped.
          </p>
        </div>

        {/* Alternating editorial rows — open, hairline-divided, NOT boxed */}
        <div className="divide-y divide-border">
          {MODELS.map((model, i) => {
            const flipped = i % 2 === 1; // row 2: detail left, identity right
            return (
              <div
                key={model.n}
                ref={(el) => {
                  if (el) rowRefs.current[i] = el;
                }}
                className={`grid grid-cols-1 items-start gap-8 py-12 lg:gap-12 ${
                  flipped
                    ? "lg:grid-cols-[1.2fr_1fr]"
                    : "lg:grid-cols-[1fr_1.2fr]"
                }`}
              >
                {/* Identity: big coral number + label */}
                <div className={flipped ? "lg:order-2" : "lg:order-1"}>
                  <span className="block font-mono text-[56px] leading-none text-accent">
                    {model.n}
                  </span>
                  <span className="mt-4 block font-mono text-mono-xs uppercase tracking-wider text-text-subtle">
                    {model.label}
                  </span>
                </div>

                {/* Detail: title, description, "best for" line */}
                <div className={flipped ? "lg:order-1" : "lg:order-2"}>
                  <h3 className="font-serif text-[28px] leading-tight text-text">
                    {model.title}
                  </h3>
                  <p className="mt-3 font-sans text-body leading-relaxed text-text-muted">
                    {model.desc}
                  </p>
                  <p className="mt-5 flex items-center gap-2 font-mono text-mono-xs uppercase tracking-wider text-text-subtle">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                    {model.best}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Closing call link */}
        <p className="mt-14 text-center font-sans text-body text-text-muted">
          Not sure which fits?{" "}
          <Link
            href="#contact"
            className="group inline-flex items-center gap-1 text-accent"
          >
            Let&apos;s figure it out on a call
            <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1">
              →
            </span>
          </Link>
        </p>
      </div>
    </section>
  );
}
