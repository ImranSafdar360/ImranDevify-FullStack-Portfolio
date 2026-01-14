"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  SiMongodb,
  SiExpress,
  SiReact,
  SiNodedotjs,
  SiExpo,
  SiGit,
  SiGithub,
  SiOpenai,
} from "react-icons/si";
import { FaMobileAlt } from "react-icons/fa";

const ExpertiseItem = ({ icon: Icon, text }: { icon: any; text: string }) => (
  <div className="flex items-center gap-4 text-white/30 hover:text-white/90 transition-all duration-500 group cursor-pointer">
    <Icon className="w-8 h-8 group-hover:scale-110 transition-transform duration-500" />
    <span className="text-[22px] font-semibold tracking-tight">{text}</span>
  </div>
);

// Custom SVG for Cursor
const CursorLogo = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5.5 3.5L18.5 12L5.5 20.5V3.5Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M11 11.5L15 15.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// Custom SVG for Antigravity (Representing smooth, floating, powerful AI)
const AntigravityLogo = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2L2 12L12 22L22 12L12 2Z"
      stroke="currentColor"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.2"
    />
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
    <path
      d="M12 8V4M12 20V16M8 12H4M20 12H16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const expertise = [
  { icon: SiMongodb, text: "MongoDB" },
  { icon: SiExpress, text: "Express.js" },
  { icon: SiReact, text: "React" },
  { icon: SiNodedotjs, text: "Node.js" },
  { icon: SiReact, text: "React Native" },
  { icon: SiExpo, text: "Expo" },
  { icon: SiGit, text: "Git" },
  { icon: SiGithub, text: "GitHub" },
  { icon: SiOpenai, text: "AI Tools" },
  { icon: CursorLogo, text: "Cursor" },
  { icon: AntigravityLogo, text: "Antigravity" },
];

export const LogoMarquee = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const tween = gsap.to(track, {
        xPercent: -50,
        repeat: -1,
        duration: 35, // Slower for readability of expertise
        ease: "none",
      });

      const container = containerRef.current;
      if (!container) return;

      const onEnter = () => tween.pause();
      const onLeave = () => tween.play();

      container.addEventListener("mouseenter", onEnter);
      container.addEventListener("mouseleave", onLeave);

      return () => {
        tween.kill();
        container.removeEventListener("mouseenter", onEnter);
        container.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden whitespace-nowrap py-8"
    >
      <div ref={trackRef} className="flex items-center gap-16 w-fit">
        {/* First set of expertise */}
        {expertise.map((item, index) => (
          <ExpertiseItem
            key={`exp-1-${index}`}
            icon={item.icon}
            text={item.text}
          />
        ))}
        {/* Second set for seamless loop */}
        {expertise.map((item, index) => (
          <ExpertiseItem
            key={`exp-2-${index}`}
            icon={item.icon}
            text={item.text}
          />
        ))}
      </div>
    </div>
  );
};
