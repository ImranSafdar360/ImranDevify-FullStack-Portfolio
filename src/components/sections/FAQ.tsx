"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import SectionNumberBadge from "@/components/shared/SectionNumberBadge";

// useLayoutEffect warns during SSR; this client component is still
// server-rendered, so fall back to useEffect on the server and use the
// layout effect on the client (sets the GSAP start state before paint).
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const FAQS = [
  {
    q: "How do you price projects?",
    a: "Depends on scope, not a fixed menu. After a short call I send a clear proposal with a fixed price or a monthly rate. No hourly billing, no surprise invoices.",
  },
  {
    q: "What's your typical timeline?",
    a: "MVPs usually 4 to 12 weeks. AI integrations and smaller scopes can be faster. I commit to a timeline before we start and keep you updated weekly.",
  },
  {
    q: "Do you work solo or with a team?",
    a: "Mostly solo, end to end — that's the advantage, one person who owns architecture, build, and AI. For bigger scopes I bring in trusted collaborators I've shipped with before.",
  },
  {
    q: "What happens after launch?",
    a: "Launch is the start. I stay on for performance, AI tuning, and scaling — either as ongoing support or a clean handoff with documentation, your call.",
  },
  {
    q: "Can you work with my existing team and codebase?",
    a: "Yes. I drop into existing repos, match your conventions, and work alongside your engineers. I'm comfortable inheriting and improving code, not just greenfield builds.",
  },
  {
    q: "How do we communicate during the build?",
    a: "Async-first — short written updates, a shared board, and a weekly check-in. You always know what's shipped and what's next without chasing me.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    const build = (yHeader: number, yItem: number, stagger: number) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: yHeader },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
      );
      tl.fromTo(
        itemRefs.current,
        { opacity: 0, y: yItem },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger,
        },
        "-=0.35"
      );
    };

    mm.add("(min-width: 768px)", () => build(24, 20, 0.08));
    mm.add("(max-width: 767px)", () => build(18, 16, 0.06));

    return () => mm.revert();
  }, []);

  return (
    <section id="faq" ref={sectionRef} className="py-20 md:py-28">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-12 px-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* LEFT — sticky header on desktop */}
        <div ref={headerRef} className="self-start lg:sticky lg:top-28">
          <SectionNumberBadge number="09" label="FAQ" className="mb-4" />
          <h2 className="font-serif text-[34px] text-text md:text-display-2">
            Questions, answered.
          </h2>
          <p className="mt-4 max-w-[360px] font-sans text-body text-text-muted">
            The things founders usually want to know before reaching out.
          </p>
          <p className="mt-8 font-sans text-body text-text-muted">
            Still have a question?{" "}
            <Link
              href="#contact"
              className="group inline-flex items-center gap-1 text-accent"
            >
              Book a call
              <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1">
                →
              </span>
            </Link>
          </p>
        </div>

        {/* RIGHT — accordion (single-open, hairline-divided, no boxes) */}
        <div>
          {FAQS.map((faq, i) => {
            const open = openIndex === i;
            return (
              <div
                key={faq.q}
                ref={(el) => {
                  if (el) itemRefs.current[i] = el;
                }}
                className="border-b border-border py-5"
              >
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="group flex w-full cursor-pointer items-center justify-between gap-6 text-left"
                >
                  <span className="font-sans text-[17px] font-medium leading-snug text-text transition-colors duration-200 ease-out group-hover:text-accent">
                    {faq.q}
                  </span>
                  {/* Plus → minus morph: vertical bar rotates flat on open */}
                  <span
                    className={`relative h-3.5 w-3.5 shrink-0 transition-colors duration-200 ease-out ${
                      open ? "text-accent" : "text-text-subtle"
                    }`}
                    aria-hidden="true"
                  >
                    <span className="absolute left-1/2 top-1/2 h-[1.5px] w-3.5 -translate-x-1/2 -translate-y-1/2 rounded bg-current" />
                    <span
                      className={`absolute left-1/2 top-1/2 h-3.5 w-[1.5px] -translate-x-1/2 -translate-y-1/2 rounded bg-current transition-transform duration-200 ease-out ${
                        open ? "rotate-90" : "rotate-0"
                      }`}
                    />
                  </span>
                </button>

                {/* Smooth height expand via animatable grid-template-rows */}
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    open
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[600px] pt-3 font-sans text-body leading-relaxed text-text-muted">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
