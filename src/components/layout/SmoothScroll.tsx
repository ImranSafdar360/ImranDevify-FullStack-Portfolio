"use client";

import React, { useEffect, useRef } from "react";
import type LocomotiveScroll from "locomotive-scroll";

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  // Replace 'any' with the actual LocomotiveScroll type or null
  const locomotiveScrollRef = useRef<LocomotiveScroll | null>(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    const initLocomotive = async () => {
      try {
        const LocomotiveScroll = (await import("locomotive-scroll")).default;

        locomotiveScrollRef.current = new LocomotiveScroll({
          el: scrollRef.current as HTMLElement,
          smooth: true,
          multiplier: 1,
          lerp: 0.08,
          tablet: { smooth: true },
          smartphone: { smooth: true },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);
      } catch (error) {
        console.error("Locomotive Scroll failed to load:", error);
      }
    };

    initLocomotive();

    return () => {
      if (locomotiveScrollRef.current) {
        locomotiveScrollRef.current.destroy();
      }
    };
  }, []);

  return (
    <div data-scroll-container ref={scrollRef}>
      {children}
    </div>
  );
}
