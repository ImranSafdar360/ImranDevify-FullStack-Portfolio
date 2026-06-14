"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef } from "react";
import { CASE_STUDIES } from "./caseStudies";

// useLayoutEffect warns during SSR; this client component is still
// server-rendered, so fall back to useEffect on the server and use the
// layout effect on the client (prevents the pre-paint flash GSAP needs to
// avoid without the console warning).
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export default function SelectedWorkSticky() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinnedColRef = useRef<HTMLDivElement>(null);
  const textBlockRefs = useRef<HTMLDivElement[]>([]);
  const imageRefs = useRef<HTMLDivElement[]>([]);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      // 1. Pin the image column for the duration of the section scroll.
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: pinnedColRef.current,
        pinSpacing: false,
      });

      // 2. Crossfade to the matching image as each text block centers.
      textBlockRefs.current.forEach((block, i) => {
        ScrollTrigger.create({
          trigger: block,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) {
              imageRefs.current.forEach((img, j) => {
                gsap.to(img, {
                  opacity: j === i ? 1 : 0,
                  duration: 0.5,
                  ease: "power2.out",
                });
              });
            }
          },
        });
      });
    });

    // Critical cleanup: reverts matchMedia, kills ScrollTriggers, unpins.
    return () => mm.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="grid grid-cols-[60%_40%] items-start gap-16"
    >
      {/* LEFT: scrolling text blocks */}
      <div>
        {CASE_STUDIES.map((study, i) => {
          const blocks = [
            { label: "Problem", body: study.problem },
            { label: "Decision", body: study.decision },
            { label: "Outcome", body: study.outcome },
          ];
          return (
            <div
              key={study.id}
              ref={(el) => {
                if (el) textBlockRefs.current[i] = el;
              }}
              className="flex min-h-screen flex-col justify-center"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-[12px] uppercase tracking-wider text-text-subtle">
                  {study.tag}
                </span>
                {study.live && (
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    <span className="font-mono text-[11px] uppercase tracking-wider text-accent">
                      Live
                    </span>
                  </span>
                )}
              </div>

              <h3 className="mb-6 font-serif text-display-3 text-text">
                {study.name}
              </h3>

              <div className="mb-8 flex flex-col gap-5">
                {blocks.map((block) => (
                  <div key={block.label}>
                    <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-text-subtle">
                      {block.label}
                    </p>
                    <p className="font-sans text-[15px] leading-relaxed text-text-muted">
                      {block.body}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mb-6 flex flex-wrap gap-2">
                {study.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-border bg-bg-subtle px-2.5 py-1 font-mono text-[11px] text-text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* TODO: real case study URLs */}
              <Link
                href="#"
                className="group inline-flex items-center gap-1.5 font-sans text-small text-accent"
              >
                Read full case study
                <span className="inline-block transition-transform duration-150 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          );
        })}
      </div>

      {/* RIGHT: pinned image column with crossfading images */}
      <div ref={pinnedColRef} className="flex h-screen items-center">
        <div className="relative aspect-[5/4] w-full overflow-hidden rounded-xl border border-border bg-gradient-to-br from-[#1a1a1a] to-[#141414]">
          {CASE_STUDIES.map((study, i) => (
            <div
              key={study.id}
              ref={(el) => {
                if (el) imageRefs.current[i] = el;
              }}
              className="absolute inset-0"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              {study.imageSrc ? (
                <Image
                  src={study.imageSrc}
                  alt={`${study.name} project interface`}
                  fill
                  className="object-contain p-6"
                  sizes="40vw"
                />
              ) : (
                /* TODO: replace with the project's real screenshot in polish phase */
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <span className="font-serif text-h4 text-text-muted opacity-40">
                    {study.name}
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-wider text-text-subtle">
                    PLACEHOLDER
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
