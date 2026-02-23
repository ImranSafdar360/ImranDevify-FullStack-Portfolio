"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const ArrowButton = ({
  href,
  onClick,
  direction,
  label,
  className = "",
}: {
  href?: string;
  onClick?: () => void;
  direction: "left" | "right";
  label: string;
  className?: string;
}) => {
  const buttonRef = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const arrow1Ref = useRef<HTMLDivElement>(null);
  const arrow2Ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const button = buttonRef.current;
      const arrow1 = arrow1Ref.current;
      const arrow2 = arrow2Ref.current;

      if (!button || !arrow1 || !arrow2) return;

      // Initial Setup
      gsap.set(arrow1, { x: 0, opacity: 1 });
      gsap.set(arrow2, { x: direction === "right" ? -30 : 30, opacity: 0 });

      const handleMouseEnter = () => {
        // Move first arrow out
        gsap.to(arrow1, {
          x: direction === "right" ? 30 : -30,
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
        });

        // Move second arrow in
        gsap.to(arrow2, {
          x: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.inOut",
        });
      };

      const handleMouseLeave = () => {
        // Reset first arrow
        gsap.to(arrow1, {
          x: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.inOut",
        });

        // Reset second arrow
        gsap.to(arrow2, {
          x: direction === "right" ? -30 : 30,
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
        });
      };

      button.addEventListener("mouseenter", handleMouseEnter);
      button.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        button.removeEventListener("mouseenter", handleMouseEnter);
        button.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: buttonRef },
  );

  const Icon = direction === "left" ? ChevronLeft : ChevronRight;

  return onClick ? (
    <button
      ref={buttonRef}
      type="button"
      onClick={onClick}
      className={`group flex items-center justify-center w-fit h-fit px-4 py-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 transition-colors duration-400 overflow-hidden shadow-xl backdrop-blur-md ${className}`}
      aria-label={label}
    >
      <div className="relative flex gap-2 items-center justify-center w-full h-full">
        {direction === "right" && (
          <p className="text-white font-medium font-sora group-hover:text-black">
            {label}
          </p>
        )}
        <Icon size={28} strokeWidth={2.5} />
        {direction === "left" && (
          <p className="text-white font-medium font-sora group-hover:text-black">
            {label}
          </p>
        )}
      </div>
    </button>
  ) : (
    <Link
      href={href || "#"}
      className={`group flex items-center justify-center w-fit h-fit px-4 py-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 transition-colors duration-400 overflow-hidden shadow-xl backdrop-blur-md ${className}`}
      aria-label={label}
    >
      <div className="relative flex gap-2 items-center justify-center w-full h-full">
        {direction === "right" && (
          <p className="text-white font-medium font-sora group-hover:text-black">
            {label}
          </p>
        )}
        <Icon size={28} strokeWidth={2.5} />
        {direction === "left" && (
          <p className="text-white font-medium font-sora group-hover:text-black">
            {label}
          </p>
        )}
      </div>
    </Link>
  );
};
