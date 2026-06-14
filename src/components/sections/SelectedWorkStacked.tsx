"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CASE_STUDIES, type CaseStudy } from "./caseStudies";

function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  const isEven = index % 2 === 0;
  // Mobile (DOM order): image first, text second. On lg+, even-index cards put
  // text on the left and image on the right; odd-index cards swap.
  const imageOrder = isEven ? "lg:order-2" : "lg:order-1";
  const textOrder = isEven ? "lg:order-1" : "lg:order-2";

  const blocks = [
    { label: "Problem", body: study.problem },
    { label: "Decision", body: study.decision },
    { label: "Outcome", body: study.outcome },
  ];

  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      className={`rounded-2xl border border-border bg-bg-elevated p-6 transition-[border-color] duration-300 ease-out hover:border-border-strong md:px-14 md:py-12 ${
        visible ? "animate-fade-up-card" : "opacity-0"
      }`}
    >
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* Image (real screenshot where available, placeholder otherwise) */}
        <div className={imageOrder}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-gradient-to-br from-[#1a1a1a] to-[#141414] md:aspect-[5/4]">
            {study.imageSrc ? (
              <Image
                src={study.imageSrc}
                alt={`${study.name} project interface`}
                fill
                className="object-contain p-6"
                sizes="(max-width: 1024px) 100vw, 50vw"
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
        </div>

        {/* Text content */}
        <div className={textOrder}>
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
      </div>
    </article>
  );
}

export default function SelectedWorkStacked() {
  return (
    <div className="flex flex-col gap-6">
      {CASE_STUDIES.map((study, index) => (
        <CaseStudyCard key={study.id} study={study} index={index} />
      ))}
    </div>
  );
}
