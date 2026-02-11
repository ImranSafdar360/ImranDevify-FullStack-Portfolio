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
  SiPostgresql,
  SiMysql,
  SiNextdotjs,
} from "react-icons/si";
import { IconType } from "react-icons";

const ExpertiseItem = ({ icon: Icon, text }: { icon: IconType; text: string }) => (
  <div className="flex items-center gap-4 text-white/30 hover:text-white/90 transition-all duration-500 group cursor-pointer">
    <Icon className="w-8 h-8 group-hover:scale-110 transition-transform duration-500" />
    <span className="text-[22px] font-semibold tracking-tight">{text}</span>
  </div>
);

const expertise = [
  { icon: SiReact, text: "React.js" },
  { icon: SiNextdotjs, text: "Next.js" },
  { icon: SiReact, text: "React Native" },
  { icon: SiExpo, text: "Expo" },
  { icon: SiNodedotjs, text: "Node.js" },
  { icon: SiExpress, text: "Express.js" },
  { icon: SiMongodb, text: "MongoDB" },
  { icon: SiPostgresql, text: "Postgres SQL" },
  { icon: SiMysql, text: "MySQL" },
  { icon: SiGit, text: "Git" },
  { icon: SiGithub, text: "GitHub" },
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
