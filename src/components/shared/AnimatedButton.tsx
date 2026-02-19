"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  hoverText?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const AnimatedButton = ({
  children,
  onClick,
  hoverText,
  className = "",
  type = "button",
}: AnimatedButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textTopRef = useRef<HTMLSpanElement>(null);
  const textBottomRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const button = buttonRef.current;
      const textTop = textTopRef.current;
      const textBottom = textBottomRef.current;
      const container = containerRef.current;

      if (!button || !textTop || !textBottom || !container) return;

      // Set initial positions - ensure proper positioning
      // Using inline styles for initial state to prevent flash, GSAP will take over
      gsap.set(textTop, {
        yPercent: 0,
        opacity: 1,
        xPercent: 0,
      });
      gsap.set(textBottom, {
        yPercent: 100,
        opacity: 0,
        xPercent: -50, // Maintain horizontal centering
      });

      const handleMouseEnter = () => {
        // Animate top text going up and fading out
        gsap.to(textTop, {
          yPercent: -100,
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
        });

        // Animate bottom text coming up and fading in
        // Maintain xPercent: -50 to keep it centered horizontally
        gsap.to(textBottom, {
          yPercent: -100,
          opacity: 1,
          xPercent: -50,
          duration: 0.4,
          ease: "power2.inOut",
        });
      };

      const handleMouseLeave = () => {
        // Reset top text
        gsap.to(textTop, {
          yPercent: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.inOut",
        });

        // Reset bottom text
        // Maintain xPercent: -50 to keep it centered horizontally
        gsap.to(textBottom, {
          yPercent: 100,
          opacity: 0,
          xPercent: -50,
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

  // Determine which text to show initially and on hover
  const initialText = children;
  const hoverTextContent = hoverText || children;

  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      className={`
        relative w-fit cursor-pointer overflow-hidden
        rounded-lg lg:rounded-xl xl:rounded-2xl
        bg-white
        px-5 py-3
        md:px-6 md:py-3.5
        lg:px-7 lg:py-4
        xl:px-8 xl:py-5
        text-center
        text-[12px]
        md:text-[13px]
        lg:text-[14px]
        xl:text-[16px]
        font-bold text-black
        shadow-sm transition-all duration-300 hover:shadow-lg
        ${className}
`}
    >
      <div
        ref={containerRef}
        className="relative flex items-center justify-center w-full"
        style={{ minHeight: "1.5em" }}
      >
        {/* Initial text - visible by default */}
        <span
          ref={textTopRef}
          className="inline-block whitespace-nowrap relative z-10"
          style={{
            willChange: "transform, opacity",
            opacity: 1,
            transform: "translateY(0%)",
          }}
        >
          {initialText}
        </span>
        {/* Hover text - hidden below by default */}
        <span
          ref={textBottomRef}
          className="absolute inline-block whitespace-nowrap"
          style={{
            willChange: "transform, opacity",
            top: "50%",
            left: "50%",
            opacity: 0,
            transform: "translate(-0%, 50%)",
          }}
        >
          {hoverTextContent}
        </span>
      </div>
    </button>
  );
};

export default AnimatedButton;
