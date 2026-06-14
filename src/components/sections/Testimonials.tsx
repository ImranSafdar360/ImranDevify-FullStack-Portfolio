"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useRef } from "react";

// useLayoutEffect warns during SSR; this client component is still
// server-rendered, so fall back to useEffect on the server and use the
// layout effect on the client (sets the GSAP start state before paint).
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const TESTIMONIALS = [
  {
    quote:
      "Imran transformed our landing page into a high-performance digital experience and went beyond expectations by building a complete admin dashboard for projects, leads, and testimonials. His product thinking and technical execution added real operational value to our agency.",
    name: "Founder",
    role: "XELVO CREATIVES",
  },
  {
    quote:
      "I've partnered with Imran on multiple client projects, and he consistently delivers structured, scalable, and production-ready solutions. He's someone I confidently rely on for critical development work.",
    name: "Usama Khawar",
    role: "FREELANCE COLLABORATOR",
  },
  {
    quote:
      "His product mindset, architectural thinking, and focus on scalable solutions truly stand out. He's building with intention and long-term vision.",
    name: "Ali Raza",
    role: "MENTOR & HR MANAGER",
  },
];

export default function Testimonials() {
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
          clearProps: "all",
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

  return (
    <section id="testimonials" ref={sectionRef} className="py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Header */}
        <div className="mb-16 max-w-[640px]">
          <p className="mb-4 font-mono text-meta uppercase tracking-wider text-text-subtle">
            What Clients Say
          </p>
          <h2 className="font-serif text-[34px] text-text md:text-display-2">
            Trusted by the founders I work with.
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={t.name + t.role}
              ref={(el) => {
                if (el) cardRefs.current[i] = el;
              }}
              className="relative flex h-full flex-col rounded-2xl border border-border bg-bg-elevated p-8 transition-[translate,border-color] duration-200 ease-out hover:-translate-y-1 hover:border-border-strong"
            >
              {/* Decorative coral serif quote mark */}
              <span
                aria-hidden
                className="-ml-1 -mt-2 mb-2 font-serif text-[48px] italic leading-none text-accent"
              >
                &ldquo;
              </span>

              <p className="font-sans text-base leading-relaxed text-text">
                {t.quote}
              </p>

              <div className="mt-8">
                <p className="font-sans text-small font-medium text-text">
                  {t.name}
                </p>
                <p className="mt-1 font-mono text-mono-xs uppercase tracking-wider text-text-subtle">
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* LinkedIn recommendations link */}
        <a
          href="https://www.linkedin.com/in/imran-safdar/details/recommendations/?detailScreenTabIndex=0"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-12 inline-flex items-center gap-1.5 font-sans text-small text-text-muted transition-colors duration-150 hover:text-accent"
        >
          See all recommendations on LinkedIn
          <span className="inline-block transition-transform duration-150 group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>
    </section>
  );
}
