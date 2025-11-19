"use client";

import { Button } from "@/components/ui/button";
import LightRays from "../LightRays";

export default function Hero() {
  return (
    <section className="w-full relative overflow-hidden bg-black text-white">
<div style={{ width: '100%', height: '600px', position: 'absolute', top: 0, left: 0 }}>
  <LightRays
    raysOrigin="top-center"
    // raysColor="#00ffff"
    raysSpeed={.5}
    lightSpread={0.9}
    rayLength={1.2}
    followMouse={true}
    mouseInfluence={0.1}
    noiseAmount={0.1}
    distortion={0.05}
    className="custom-rays"
  />
</div>
      <div className="relative w-full h-full flex flex-col justify-center items-center gap-[32px] mx-auto px-6 py-32 md:py-40">
        {/* Badge (Glassmorphism) */}
        <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-md bg-white/10 border border-white/10 mb-6">
          🚀 Full-Stack MERN + React Native Developer
        </span>

        {/* Gradient Title */}
        <h1
          className="text-4xl md:text-6xl tracking-tight leading-tight mb-6 text-center"
          style={{ fontFamily: "var(--font-boldonse), sans-serif" }}
        >
          Building{" "}
          <span className="bg-gradient-to-r from-[#0180FF] to-[#4DAAFF] bg-clip-text text-transparent">
            Fast, Stable & Scalable
          </span>{" "}
          Digital Products for SaaS & Agencies
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-10 text-center max-w-[780px]">
          I build high-performance websites, full-stack platforms, and smooth
          mobile apps that load instantly, scale naturally, and feel seamless
          for your users.
        </p>

        {/* CTA Section (A/B Optimized) */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Primary CTA */}
          <Button
            size="lg"
            className="px-8 py-6 text-base md:text-lg font-semibold bg-[#0180FF] hover:bg-[#0066CC]"
          >
            Start Your Project →
          </Button>

          {/* Secondary Ghost Button (Glass Outline) */}
          <Button
            size="lg"
            variant="outline"
            className="px-8 py-6 text-base md:text-lg font-semibold border-white/20 text-white hover:bg-white/10"
          >
            View Portfolio
          </Button>
        </div>
      </div>
    </section>
  );
}
