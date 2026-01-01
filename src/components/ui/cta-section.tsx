"use client";

import React, { useState } from "react";
import GradientText from "./gradient-text";
import { ArrowRight, Mail } from "lucide-react";
import AnimatedButton from "../Button";
import Link from "next/link";

export default function CTASection() {
  const [hovered, setHovered] = useState(false);

  return (
    <section className="w-full py-32 relative flex items-center justify-center min-h-[600px]">
      
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px] opacity-20 transition-all duration-1000 ease-in-out"
            style={{
                background: hovered 
                    ? "radial-gradient(circle, #00C7FE 0%, transparent 70%)"
                    : "radial-gradient(circle, #0080FF 0%, transparent 70%)",
                transform: hovered ? "translate(-50%, -50%) scale(1.1)" : "translate(-50%, -50%) scale(1)"
            }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 flex flex-col items-center text-center">
        
        {/* Pre-heading Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00C7FE] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00C7FE]"></span>
            </span>
            <span className="text-sm font-medium text-gray-300">Available for new projects</span>
        </div>

        {/* Main Heading */}
        <h2 
            className="text-4xl md:text-[64px] tracking-tight leading-[94px] text-white mb-8"
            style={{ fontFamily: 'var(--font-boldonse)' }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
          Ready to <GradientText className="inline-block transition-transform duration-500 hover:scale-[1.02] cursor-default">Building</GradientText> something <br className="hidden md:block" />
          <span className="text-gray-500 italic font-serif opacity-80">extraordinary?</span>
        </h2>

        <p className="max-w-xl text-lg md:text-xl text-gray-400 mb-12 leading-relaxed">
            Let&apos;s turn your idea into a high-performance product. No fluff, just clean code and real results.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00C7FE] to-[#0080FF] rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                <AnimatedButton onClick={() => {}} className="relative min-w-[200px] h-14 text-lg">
                    Book a Free Call
                </AnimatedButton>
            </div>
            
            <Link 
                href="mailto:contact@imran.dev"
                className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-lg font-medium px-6 py-4 rounded-full hover:bg-white/5"
            >
                <Mail className="w-5 h-5 group-hover:text-[#00C7FE] transition-colors" />
                <span>Shoot me an email</span>
                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </Link>
        </div>

         {/* Footer Stats/Social Proof */}
         <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 border-t border-white/5 pt-10">
            {[
                { label: "Response Time", value: "< 24h" },
                { label: "Project Success", value: "100%" },
                { label: "Time Zone", value: "Global" },
                { label: "Code Quality", value: "A++" },
            ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                    <span className="text-white font-bold text-xl">{stat.value}</span>
                    <span className="text-gray-500 text-sm uppercase tracking-wider">{stat.label}</span>
                </div>
            ))}
         </div>

      </div>
    </section>
  );
}
