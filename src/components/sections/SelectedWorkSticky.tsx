"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef } from "react";
import { CASE_STUDIES } from "./caseStudies";

// useLayoutEffect warns during SSR; this client component is still
// server-rendered, so fall back to useEffect on the server and use the
// layout effect on the client (sets the GSAP start state before paint).
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const HIDDEN_CLIP = "inset(100% 0px 0px 0px)";
const SHOWN_CLIP = "inset(0% 0px 0px 0px)";

export default function SelectedWorkSticky() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinWrapRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<HTMLDivElement[]>([]);
  const imageInnerRefs = useRef<HTMLDivElement[]>([]);
  const textRefs = useRef<HTMLDivElement[]>([]);

  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const imgs = imageRefs.current;
      const inners = imageInnerRefs.current;
      const txts = textRefs.current;
      const segments = imgs.length - 1; // transitions between projects

      // Initial state: project 0 shown, the rest clipped/hidden.
      gsap.set(imgs[0], { clipPath: SHOWN_CLIP });
      imgs.slice(1).forEach((img) => gsap.set(img, { clipPath: HIDDEN_CLIP }));
      gsap.set(inners[0], { scale: 1 });
      inners.slice(1).forEach((inner) => gsap.set(inner, { scale: 1.06 }));
      gsap.set(txts[0], { autoAlpha: 1, y: 0 });
      txts.slice(1).forEach((t) => gsap.set(t, { autoAlpha: 0, y: 24 }));

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=" + window.innerHeight * 3,
          scrub: true,
          pin: pinWrapRef.current,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      });

      // Continuous parallax: every image's inner wrapper drifts bottom→top
      // across the whole pinned scroll (independent of the cover-reveal). The
      // wrapper is taller than its frame so the pan never exposes an edge.
      tl.fromTo(
        inners,
        { yPercent: 6 },
        { yPercent: -6, ease: "none", duration: segments },
        0
      );

      // One segment (1 unit) per transition: the next image covers upward,
      // settling from scale 1.06 → 1, then the text crossfades. Outgoing and
      // incoming text overlap slightly so the column is never blank.
      for (let i = 0; i < segments; i++) {
        tl.to(
          imgs[i + 1],
          { clipPath: SHOWN_CLIP, ease: "power2.inOut", duration: 0.6 },
          i
        );
        tl.fromTo(
          inners[i + 1],
          { scale: 1.06 },
          { scale: 1, ease: "power2.out", duration: 0.7 },
          i
        );
        tl.to(
          txts[i],
          { autoAlpha: 0, y: -16, ease: "power2.in", duration: 0.32 },
          i + 0.08
        );
        tl.fromTo(
          txts[i + 1],
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, ease: "power2.out", duration: 0.42 },
          i + 0.34
        );
      }
    });

    // Critical cleanup: reverts matchMedia, kills ScrollTriggers, unpins.
    return () => mm.revert();
  }, []);

  const total = String(CASE_STUDIES.length).padStart(2, "0");

  return (
    <div ref={sectionRef}>
      {/* Pinned wrapper centers the card in the viewport (clears the nav) */}
      <div ref={pinWrapRef} className="flex min-h-screen items-center">
        <div className="grid h-auto min-h-[600px] w-full grid-cols-[45fr_55fr] overflow-hidden border border-border bg-bg-elevated lg:min-h-[80vh]">
          {/* LEFT (45%): stacked text blocks, one active at a time */}
          <div className="relative border-r border-border">
            {/* Static "See all" — stays put while project content swaps below */}
            <Link
              href="#work"
              className="group absolute right-8 top-8 z-10 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.14em] text-text-subtle transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-accent lg:right-10 lg:top-10"
            >
              See all
              <span className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </Link>

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
                    if (el) textRefs.current[i] = el;
                  }}
                  style={{
                    opacity: i === 0 ? 1 : 0,
                    visibility: i === 0 ? "visible" : "hidden",
                  }}
                  className="absolute inset-0 flex flex-col p-8 lg:p-10"
                >
                  {/* HEADER (fixed at top): live badge, name, meta */}
                  <div className="shrink-0 border-b border-border pb-6 pr-28">
                    {study.live && (
                      <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                          Live
                        </span>
                      </span>
                    )}
                    <h3 className="font-serif text-[32px] leading-[1.02] text-text lg:text-[38px]">
                      {study.name}
                    </h3>
                    <p className="mt-2.5 font-mono text-[11px] uppercase tracking-[0.18em] text-text-subtle">
                      {study.tag}
                    </p>
                  </div>

                  {/* CENTER: project details, vertically centered, never
                      pushing the CTA out (min-h-0 + the CTA is shrink-0) */}
                  <div className="flex min-h-0 flex-1 flex-col justify-center gap-6 py-6">
                    <div className="flex flex-col gap-4">
                      {blocks.map((block, idx) => (
                        <div
                          key={block.label}
                          className={
                            idx > 0 ? "border-t border-border/70 pt-4" : ""
                          }
                        >
                          <p className="mb-1.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-text-subtle">
                            {block.label}
                          </p>
                          <p className="font-sans text-[12.5px] leading-[1.55] text-text-muted">
                            {block.body}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {study.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-border bg-bg-subtle px-2.5 py-1 font-mono text-[11px] text-text-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* BOTTOM: CTA pinned to the foot of the text block */}
                  {/* TODO: real case study URLs */}
                  <Link
                    href="#"
                    className="group flex shrink-0 items-center justify-between rounded-lg border border-border px-5 py-4 transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-accent active:scale-[0.99]"
                  >
                    <span className="font-sans text-small text-text transition-colors duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:text-accent">
                      Read full case study
                    </span>
                    {/* Button-in-button: arrow nested in its own circle */}
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-bg-subtle text-text-muted transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-accent group-hover:bg-accent group-hover:text-bg">
                      ↗
                    </span>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* RIGHT (55%): full-bleed image stack — cover-reveal + parallax */}
          <div className="relative overflow-hidden bg-bg-subtle">
            {CASE_STUDIES.map((study, i) => (
              <div
                key={study.id}
                ref={(el) => {
                  if (el) imageRefs.current[i] = el;
                }}
                style={{ clipPath: i === 0 ? SHOWN_CLIP : HIDDEN_CLIP }}
                className="absolute inset-0 overflow-hidden"
              >
                {/* Parallax + scale wrapper, taller than the frame so the
                    bottom→top drift never exposes an edge. */}
                <div
                  ref={(el) => {
                    if (el) imageInnerRefs.current[i] = el;
                  }}
                  className="absolute inset-x-0 -top-[10%] h-[120%] will-change-transform"
                >
                  {study.imageSrc ? (
                    <Image
                      src={study.imageSrc}
                      alt={`${study.name} project interface`}
                      fill
                      className="object-cover"
                      sizes="55vw"
                      priority={i === 0}
                    />
                  ) : (
                    /* TODO: replace with the project's real screenshot in polish phase */
                    <div
                      className="flex h-full w-full flex-col items-center justify-center gap-2"
                      style={{
                        background:
                          "linear-gradient(135deg, #1a1a1a 0%, #141414 100%)",
                      }}
                    >
                      <span className="font-serif text-h4 text-text-muted opacity-40">
                        {study.name}
                      </span>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-text-subtle">
                        PLACEHOLDER
                      </span>
                    </div>
                  )}
                </div>

                {/* Editorial index, travels up with its image during the reveal */}
                <span className="absolute right-6 top-6 z-10 font-mono text-[12px] tracking-[0.14em] text-white/70">
                  {String(i + 1).padStart(2, "0")} / {total}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
