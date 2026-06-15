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

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    // Single, subtle fade-up on enter — same calm pattern as About.
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
    <section id="contact" ref={sectionRef} className="py-28 md:py-40">
      <div ref={contentRef} className="mx-auto max-w-[720px] px-6 text-center">
        <SectionNumberBadge number="11" label="Ready to ship?" className="mb-6" />
        <h2 className="mb-8 font-serif text-[40px] leading-[1.05] text-text md:text-[56px]">
          If you&apos;re building an AI-powered product and want one person who
          can ship the whole thing,
          <br />
          <span className="italic">let&apos;s talk.</span>
        </h2>

        {/* TODO: real Calendly/booking link */}
        <a
          href="#"
          className="group mb-6 inline-flex items-center rounded-lg bg-accent px-8 py-4 font-sans text-base font-medium text-bg transition-[filter] duration-150 hover:brightness-110"
        >
          Book a strategy call
          <span className="ml-2 inline-block transition-transform duration-150 group-hover:translate-x-1">
            →
          </span>
        </a>

        <p className="font-mono text-mono-xs uppercase tracking-wider text-text-subtle">
          OR DM ME —{" "}
          <a
            href="mailto:imransafdar360@gmail.com"
            className="transition-colors duration-150 hover:text-accent"
          >
            EMAIL
          </a>{" "}
          ·{" "}
          {/* TODO: real WhatsApp number */}
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-150 hover:text-accent"
          >
            WHATSAPP
          </a>{" "}
          ·{" "}
          <a
            href="https://www.linkedin.com/in/imran-safdar/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-150 hover:text-accent"
          >
            LINKEDIN
          </a>
        </p>
      </div>
    </section>
  );
}
