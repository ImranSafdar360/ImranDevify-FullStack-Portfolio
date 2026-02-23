"use client";

import React, { useRef } from "react";
import SectionBadge from "./SectionBadge";
import GradientText from "../ui/gradient-text";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const SectionHeader = ({
  title,
  description,
  badgeText,
  gradientText,
  gradientTextClassName,
  className,
  isAbout = false,
}: {
  title: string;
  description: string;
  badgeText: string;
  gradientText?: string;
  gradientTextClassName?: string;
  className?: string;
  isAbout?: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".section-header-anim", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%", // Trigger right as it enters view
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full flex flex-col gap-[16px]",
        isAbout ? "items-center lg:items-start" : "items-center",
        className,
      )}
    >
      <div className="section-header-anim">
        <SectionBadge
          className="mb-4 md:mb-5 lg:mb-6 xl:mb-[8px]"
          text={badgeText}
        />
      </div>
      <h2
        className={cn(
          "text-[36px] md:text-[40px] lg:text-[44px] xl:text-[52px] leading-[40px] md:leading-[48px] lg:leading-[52px] xl:leading-[60px] font-bold text-white font-sora section-header-anim",
          isAbout ? "text-start" : "text-center",
        )}
      >
        {title}
        {gradientText && (
          <GradientText className={cn("font-sora", gradientTextClassName)}>
            {gradientText}
          </GradientText>
        )}
      </h2>
      <p
        className={cn(
          "max-w-full md:max-w-[95%] text-[15px] md:text-[16px] lg:text-[17px] xl:text-[18px] leading-[24px] md:leading-[26px] lg:leading-[26px] xl:leading-[28px] font-medium text-white/70 section-header-anim",
          isAbout
            ? "text-start max-w-[95%]"
            : "text-center lg:max-w-[70%] max-w-full",
        )}
      >
        {description}
      </p>
    </div>
  );
};

export default SectionHeader;
