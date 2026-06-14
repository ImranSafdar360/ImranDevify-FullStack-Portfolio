"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useRef } from "react";

// useLayoutEffect warns during SSR; this client component is still
// server-rendered, so fall back to useEffect on the server and use the
// layout effect on the client (sets the GSAP start state before paint).
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/ImranSafdar360/", external: true },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/imran-safdar/",
    external: true,
  },
  { label: "X", href: "https://x.com/Imransafdar777/", external: true },
  { label: "Email", href: "mailto:imransafdar360@gmail.com", external: false },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    // Single, subtle fade-up on the whole content — calm section.
    mm.add("(min-width: 1px)", () => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-32">
      <div
        ref={contentRef}
        className="mx-auto max-w-[640px] px-6 text-center"
      >
        <p className="mb-4 font-mono text-meta uppercase tracking-wider text-text-subtle">
          About
        </p>
        <h2 className="mb-3 font-serif text-display-2 text-text">
          Imran Safdar.
        </h2>
        <p className="mb-8 font-mono text-mono-sm uppercase tracking-wider text-text-subtle">
          AI-Product Engineer · Lahore, PK · Working Globally
        </p>
        <p className="mb-8 font-sans text-body-lg leading-[1.7] text-text-muted">
          I&apos;m Imran Safdar, an AI-product engineer based in Lahore. I build
          SaaS products end-to-end for founders — the architecture, the
          interface, and the intelligence inside. Before AI was the default, I
          was shipping production MERN and React Native apps. Now I do both, on
          the same product, for the same client. Available for fractional
          engineering, MVP builds, and AI integration projects.
        </p>
        <div className="flex items-center justify-center gap-4">
          {SOCIALS.map((social, i) => (
            <div key={social.label} className="flex items-center gap-4">
              <a
                href={social.href}
                {...(social.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="font-mono text-mono-xs uppercase tracking-wider text-text-subtle transition-colors duration-150 hover:text-accent"
              >
                {social.label}
              </a>
              {i < SOCIALS.length - 1 && (
                <span aria-hidden className="text-text-subtle">
                  ·
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
