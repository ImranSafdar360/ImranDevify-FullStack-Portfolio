"use client";

import React from "react";
import Image from "next/image";
import GradientText from "./gradient-text";
import AnimatedButton from "../Button";
import {
  Heart,
  Zap,
  Code,
  Database,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function AboutMini() {
  // Portrait image - using placeholder, replace with your actual image
  const portraitImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&fit=crop";

  return (
    <div className="relative w-full py-20 px-6">
      <div className="w-full max-w-[1440px] mx-auto">
        {/* Bento Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main About Card */}
          <div className="lg:col-span-2">
            <div
              className="relative w-full h-full min-h-[600px] rounded-[24px] overflow-hidden group"
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                backdropFilter: "blur(20px) saturate(180%)",
                WebkitBackdropFilter: "blur(20px) saturate(180%)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              {/* Portrait Image - Top 2/3 */}
              <div className="relative w-full h-[60%] overflow-hidden">
                <Image
                  src={portraitImage}
                  alt="Imran Safdar"
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#06090D]/80" />
              </div>

              {/* Quote Overlay */}
              <div
                className="absolute bottom-[45%] left-6 max-w-[280px] rounded-[16px] p-4 z-10"
                style={{
                  background: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl text-white font-serif leading-none">"</span>
                  <p className="text-white text-sm leading-relaxed">
                    I don't just write code. I build relationships and reliable systems.
                  </p>
                </div>
              </div>

              {/* Content Section - Bottom 1/3 */}
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#06090D] to-transparent">
                <h3
                  className="text-3xl md:text-4xl mb-2 text-white"
                  style={{
                    fontFamily: "var(--font-boldonse)",
                    fontWeight: 400,
                    fontStyle: "normal",
                  }}
                >
                  Imran Safdar
                </h3>
                <p className="text-lg mb-6" style={{ color: "#8B5CF6" }}>
                  Full Stack Engineer & Founder
                </p>
                <p className="text-gray-300 text-base leading-relaxed mb-6 max-w-2xl">
                  I'm a full-stack product engineer building fast, scalable, and user-focused digital experiences for SaaS founders, agencies, and startups.
                </p>
                <div className="flex items-center gap-2 mb-6">
                  <AnimatedButton onClick={() => {}}>
                    Learn more about my story
                  </AnimatedButton>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Three Smaller Cards */}
          <div className="flex flex-col gap-6">
            {/* Philosophy Card */}
            <div
              className="relative rounded-[24px] overflow-hidden group cursor-pointer"
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                backdropFilter: "blur(20px) saturate(180%)",
                WebkitBackdropFilter: "blur(20px) saturate(180%)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 40px 0 rgba(139, 92, 246, 0.2)";
                e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 32px 0 rgba(0, 0, 0, 0.3)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
              }}
            >
              <div className="p-6">
                {/* Tag */}
                <div className="flex justify-between items-start mb-4">
                  <Heart
                    className="text-[#8B5CF6] transition-transform duration-300 group-hover:scale-110"
                    size={24}
                    style={{ filter: "drop-shadow(0 0 8px rgba(139, 92, 246, 0.5))" }}
                  />
                  <span
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      color: "#ffffff",
                    }}
                  >
                    PHILOSOPHY
                  </span>
                </div>
                <h4 className="text-xl font-semibold text-white mb-3">
                  Partner, not Vendor.
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  I deeply care about the product's success. I ask the hard questions, push back on bad UX, and treat your budget like my own.
                </p>
              </div>
            </div>

            {/* Toolkit Card */}
            <div
              className="relative rounded-[24px] overflow-hidden group flex-1 cursor-pointer"
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                backdropFilter: "blur(20px) saturate(180%)",
                WebkitBackdropFilter: "blur(20px) saturate(180%)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 40px 0 rgba(59, 130, 246, 0.2)";
                e.currentTarget.style.borderColor = "rgba(59, 130, 246, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 32px 0 rgba(0, 0, 0, 0.3)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
              }}
            >
              <div className="p-6 h-full flex flex-col">
                <h4 className="text-xl font-semibold text-white mb-4">
                  Toolkit
                </h4>
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <Zap className="text-[#FBBF24]" size={20} />
                    <span className="text-gray-300 text-sm">Next.js & React</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Code className="text-[#3B82F6]" size={20} />
                    <span className="text-gray-300 text-sm">React Native</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Database className="text-[#10B981]" size={20} />
                    <span className="text-gray-300 text-sm">Node & Postgres</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Sparkles className="text-[#8B5CF6]" size={20} />
                    <span className="text-gray-300 text-sm">Tailwind</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience Card */}
            <div
              className="relative rounded-[24px] overflow-hidden group cursor-pointer"
              style={{
                background: "rgba(255, 255, 255, 0.04)",
                backdropFilter: "blur(20px) saturate(180%)",
                WebkitBackdropFilter: "blur(20px) saturate(180%)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 40px 0 rgba(16, 185, 129, 0.2)";
                e.currentTarget.style.borderColor = "rgba(16, 185, 129, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 32px 0 rgba(0, 0, 0, 0.3)";
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
              }}
            >
              <div className="p-6">
                <div className="mb-4">
                  <div className="flex items-baseline gap-2">
                    <span
                      className="text-5xl font-bold text-white"
                      style={{
                        fontFamily: "var(--font-boldonse)",
                        fontWeight: 400,
                      }}
                    >
                      5+
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">Years Experience</p>
                </div>
                <div className="flex items-center gap-2 pt-4 border-t border-gray-800">
                  <CheckCircle2 className="text-[#10B981]" size={16} />
                  <span className="text-white text-sm">100% Delivery Rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

