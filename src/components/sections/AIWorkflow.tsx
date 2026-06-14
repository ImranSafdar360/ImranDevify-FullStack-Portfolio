"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

// useLayoutEffect warns during SSR; this client component is still
// server-rendered, so fall back to useEffect on the server and use the
// layout effect on the client (sets the GSAP start state before paint).
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const PILLARS = [
  {
    n: "01",
    label: "IN THE PRODUCT",
    title: "Intelligence built in",
    desc: "Recommendation systems, AI search, assistant flows — shipped inside real products. Like the AI curation engine behind Blarecast's playlists.",
  },
  {
    n: "02",
    label: "IN THE BUILD",
    title: "AI-native workflow",
    desc: "Claude Code, Cursor, and a custom local model stack drive my development loop. Same architectural discipline, multiplied velocity.",
  },
  {
    n: "03",
    label: "IN THE INFRASTRUCTURE",
    title: "I run the stack",
    desc: "My own local AI setup with Ollama. I understand model selection, privacy tradeoffs, and cost — not just calling an API.",
  },
];

export default function AIWorkflow() {
  const sectionRef = useRef<HTMLElement>(null);
  const pillarRefs = useRef<HTMLDivElement[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.fromTo(
        pillarRefs.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.15,
          clearProps: "all",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    mm.add("(max-width: 767px)", () => {
      gsap.fromTo(
        pillarRefs.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.12,
          clearProps: "all",
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

  const goToChat = () => {
    const hero = document.getElementById("hero");
    hero?.scrollIntoView({ behavior: "smooth" });
    const input = hero?.querySelector<HTMLInputElement>("input");
    if (input) {
      // Focus after the smooth scroll begins; preventScroll keeps it smooth.
      window.setTimeout(() => input.focus({ preventScroll: true }), 500);
    }
  };

  return (
    <section id="ai-workflow" ref={sectionRef} className="relative py-24 md:py-36">
      {/* Ambient coral glow behind the pillars — atmosphere, barely there */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(233,119,87,0.10) 0%, rgba(233,119,87,0) 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-[640px] text-center">
          <p className="mb-4 font-mono text-meta uppercase tracking-wider text-text-subtle">
            How I Work With AI
          </p>
          <h2 className="mb-4 font-serif text-[34px] text-text md:text-display-2">
            How I work with AI.
          </h2>
          <p className="font-sans text-body-lg text-text-muted">
            Most developers use AI to autocomplete faster. I&apos;ve rebuilt how
            I ship products around it — in the product, in the build, and in the
            infrastructure underneath.
          </p>
        </div>

        {/* Pillars */}
        <div className="relative grid grid-cols-1 items-stretch gap-5 md:grid-cols-3">
          {/* Faint connection line between pillars (desktop only) */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-1/2 z-0 hidden h-px -translate-y-1/2 md:block"
            style={{ borderTop: "1px dashed rgba(233,119,87,0.2)" }}
          />

          {PILLARS.map((pillar, i) => {
            const isActive = activeIndex === i;
            const isDimmed = activeIndex !== null && activeIndex !== i;
            return (
              <div
                key={pillar.n}
                ref={(el) => {
                  if (el) pillarRefs.current[i] = el;
                }}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
                className={`relative flex h-full flex-col overflow-hidden rounded-2xl border p-8 transition-all duration-300 ease-out ${
                  isActive
                    ? "border-accent bg-bg-subtle"
                    : "border-border bg-bg-elevated"
                }`}
              >
                {/* Dim overlay — fades in when another pillar is focused */}
                <div
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 z-0 bg-bg transition-opacity duration-300 ${
                    isDimmed ? "opacity-45" : "opacity-0"
                  }`}
                />
                {/* Coral glow overlay — fades in when this pillar is focused */}
                <div
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    background:
                      "radial-gradient(circle at 50% 0%, rgba(233,119,87,0.12) 0%, transparent 60%)",
                  }}
                />

                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-8">
                    <span className="font-mono text-mono-sm text-accent">
                      {pillar.n}
                    </span>
                    <p className="mt-1 font-mono text-mono-xs uppercase tracking-wider text-text-subtle">
                      {pillar.label}
                    </p>
                  </div>
                  <h3 className="mb-3 font-serif text-h4 text-text">
                    {pillar.title}
                  </h3>
                  <p className="font-sans text-body leading-relaxed text-text-muted">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Re-CTA back to the hero chat */}
        <p className="mt-16 text-center font-sans text-base text-text-muted">
          This site runs on the same stack I&apos;d build yours with.{" "}
          <button
            type="button"
            onClick={goToChat}
            className="group inline-flex items-center gap-1.5 text-accent"
          >
            Try the chat
            <span className="inline-block transition-transform duration-150 group-hover:translate-x-1">
              →
            </span>
          </button>
        </p>
      </div>
    </section>
  );
}
