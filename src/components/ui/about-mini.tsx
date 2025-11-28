"use client";

import React from "react";
import GradientText from "./gradient-text";
import AnimatedButton from "../Button";
import {
  Code,
  FileCode,
  Settings,
  Zap,
  Database,
  Layers,
  Cpu,
  Terminal,
  GitBranch,
  Package,
} from "lucide-react";

export default function AboutMini() {
  // Background icons with positions and colors
  const backgroundIcons = [
    { Icon: Code, x: "10%", y: "15%", color: "#3B82F6", size: 60, rotation: 15 },
    { Icon: FileCode, x: "85%", y: "20%", color: "#10B981", size: 50, rotation: -20 },
    { Icon: Settings, x: "15%", y: "70%", color: "#3B82F6", size: 55, rotation: 25 },
    { Icon: Zap, x: "80%", y: "75%", color: "#FBBF24", size: 45, rotation: -15 },
    { Icon: Database, x: "50%", y: "10%", color: "#10B981", size: 40, rotation: 10 },
    { Icon: Layers, x: "5%", y: "50%", color: "#3B82F6", size: 50, rotation: -25 },
    { Icon: Cpu, x: "90%", y: "55%", color: "#FBBF24", size: 45, rotation: 20 },
    { Icon: Terminal, x: "25%", y: "30%", color: "#10B981", size: 40, rotation: -10 },
    { Icon: GitBranch, x: "70%", y: "35%", color: "#3B82F6", size: 50, rotation: 15 },
    { Icon: Package, x: "45%", y: "80%", color: "#FBBF24", size: 45, rotation: -20 },
  ];

  return (
    <div 
      className="relative w-full min-h-[600px] flex items-center justify-center overflow-hidden py-20"
    >
        {/* Background Icons - Blurred and Scattered */}
        <div className="absolute inset-0 pointer-events-none">
          {backgroundIcons.map((item, index) => {
            const IconComponent = item.Icon;
            return (
              <div
                key={index}
                className="absolute opacity-20"
                style={{
                  left: item.x,
                  top: item.y,
                  transform: `rotate(${item.rotation}deg)`,
                  filter: "blur(8px)",
                }}
              >
                <IconComponent
                  size={item.size}
                  style={{ color: item.color }}
                />
              </div>
            );
          })}
          
          {/* JS Badge - Yellow Square */}
          <div
            className="absolute opacity-20"
            style={{
              left: "75%",
              top: "60%",
              transform: "rotate(-10deg)",
              filter: "blur(6px)",
            }}
          >
            <div
              className="flex items-center justify-center font-bold text-black"
              style={{
                width: "50px",
                height: "50px",
                background: "#FBBF24",
                borderRadius: "8px",
                fontSize: "18px",
              }}
            >
              JS
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-16 text-center">
          {/* Section Title */}
          <h2
            className="text-4xl md:text-5xl lg:text-6xl mb-8 text-white"
            style={{
              fontFamily: "var(--font-boldonse)",
              fontWeight: 400,
              fontStyle: "normal",
            }}
          >
            About <GradientText>Imran Studio</GradientText>
          </h2>

          {/* Short Paragraph */}
          <div className="mb-8 space-y-4">
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              I'm <span className="text-white font-semibold">Imran Safdar</span> — a full-stack product engineer building fast, scalable, and user-focused digital experiences for SaaS founders, agencies, and startups.
            </p>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              My work blends clean architecture, performance engineering, and a product-first mindset to turn ambitious ideas into smooth, reliable interfaces.
            </p>
          </div>

          {/* Micro Line */}
          <div className="mb-10">
            <p className="text-base md:text-lg text-gray-400 font-medium">
              Clean engineering. Scalable systems. Human-centered design.
            </p>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <AnimatedButton onClick={() => {}}>
              Learn more about my story
            </AnimatedButton>
          </div>
        </div>
    </div>
  );
}

