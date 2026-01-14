"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
   Code,
   Zap,
   MapPin,
   Clock,
   ArrowUpRight,
   Database,
   Cpu,
   Smartphone
} from "lucide-react";
import AnimatedButton from "../Button";
import Section from "../common/Section";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GradientText from "./gradient-text";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function AboutMini() {
   const containerRef = useRef<HTMLDivElement>(null);
   const router = useRouter();
   const [time, setTime] = useState("");

   useEffect(() => {
      const updateTime = () => {
         setTime(
            new Date().toLocaleTimeString("en-US", {
               hour: "2-digit",
               minute: "2-digit",
               hour12: true,
               timeZone: "Asia/Karachi",
            })
         );
      };
      updateTime();
      const interval = setInterval(updateTime, 1000);
      return () => clearInterval(interval);
   }, []);

   useGSAP(
      () => {
         // Reveal animations for content blocks
         const listItems = gsap.utils.toArray<HTMLElement>(".reveal-item");

         listItems.forEach((item) => {
            gsap.fromTo(
               item,
               { y: 30, opacity: 0 },
               {
                  y: 0,
                  opacity: 1,
                  duration: 0.8,
                  ease: "power2.out",
                  scrollTrigger: {
                     trigger: item,
                     start: "top 85%",
                  }
               }
            );
         });

         // Parallax effect for the sticky image
         gsap.to(".sticky-image-container", {
            yPercent: 10,
            ease: "none",
            scrollTrigger: {
               trigger: containerRef.current,
               start: "top bottom",
               end: "bottom top",
               scrub: true,
            },
         });
      },
      { scope: containerRef }
   );

   return (
      <Section className="relative overflow-hidden">
         <div ref={containerRef} className="mx-auto px-6 py-24 lg:py-40">

            {/* Main Grid: Shifted ratio for better content balance */}
            <div className="grid grid-cols-1 lg:grid-cols-[0.85fr,1.15fr] gap-16 lg:gap-24 items-start">

               {/* Left Column: Sticky Cinematic Frame */}
               <div className="lg:sticky lg:top-32 order-1">
                  <div className="sticky-image-container relative w-full aspect-[4/5] rounded-[48px] overflow-hidden border border-white/10 group bg-[#0A0A0A]">
                     <Image
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&fit=crop"
                        alt="Imran Safdar"
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                     {/* Floating ID Tag */}
                     <div className="absolute bottom-8 left-8 right-8">
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10">
                           <div className="w-2 h-2 rounded-full bg-[#00C7FE] animate-pulse shadow-[0_0_10px_#00C7FE]" />
                           <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em]">Live Connection: PK-Global</span>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Right Column: Refined Narrative Structure */}
               <div className="flex flex-col gap-20 lg:gap-24 order-2 pt-4">

                  {/* 1. The Opening Section */}
                  <div className="reveal-item space-y-10">
                     <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00C7FE]/20 bg-[#00C7FE]/5">
                           <span className="text-[10px] font-bold text-[#00C7FE] uppercase tracking-widest">Story</span>
                        </div>
                        <h2 className="text-6xl md:text-8xl text-white font-bold leading-[0.85] tracking-tighter uppercase" style={{ fontFamily: 'var(--font-boldonse)' }}>
                           ABOUT <br /> <GradientText>MYSELF</GradientText>
                        </h2>
                     </div>

                     <div className="space-y-6">
                        <p className="text-2xl md:text-3xl text-white font-medium leading-tight max-w-xl">
                           Full-stack engineer building <span className="text-gray-500 italic">robust & high-performance</span> digital systems.
                        </p>
                        <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl">
                           With over five years of active development, I specialize in the MERN ecosystem and cross-platform mobile apps. I don't just write code; I architect solutions that scale and resonate with users.
                        </p>
                     </div>
                  </div>

                  {/* 2. Core Pillars (Competencies) */}
                  <div className="reveal-item space-y-10">
                     <div className="flex items-center gap-4">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">Core Pillars</span>
                        <div className="flex-1 h-px bg-white/10" />
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <PillarItem
                           icon={Code}
                           title="Web Systems"
                           desc="High-speed architectures using Next.js and React."
                        />
                        <PillarItem
                           icon={Smartphone}
                           title="Mobile Apps"
                           desc="Native performance with React Native & Expo."
                        />
                        <PillarItem
                           icon={Database}
                           title="Backend/Cloud"
                           desc="Scalable API logic with Node and MongoDB."
                        />
                        <PillarItem
                           icon={Zap}
                           title="Optimization"
                           desc="Core Web Vitals and performance fine-tuning."
                        />
                     </div>
                  </div>

                  {/* 3. Data Dashboard (Stats + Context) */}
                  <div className="reveal-item p-1 gap-1 rounded-[40px] bg-white/[0.03] border border-white/10 overflow-hidden">
                     <div className="bg-[#080808] rounded-[36px] p-8 lg:p-12 space-y-12">
                        <div className="grid grid-cols-2 gap-8">
                           <div className="space-y-2">
                              <span className="text-6xl font-bold text-white tracking-tighter block" style={{ fontFamily: 'var(--font-boldonse)' }}>20+</span>
                              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest leading-none">Global Projects <br /> Delivered</p>
                           </div>
                           <div className="space-y-2">
                              <span className="text-6xl font-bold text-white tracking-tighter block" style={{ fontFamily: 'var(--font-boldonse)' }}>100%</span>
                              <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest leading-none">Reliability & <br /> Satisfaction</p>
                           </div>
                        </div>

                        <div className="pt-10 border-t border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 rounded-full bg-[#00C7FE]/10 flex items-center justify-center text-[#00C7FE]">
                                 <MapPin size={22} />
                              </div>
                              <div>
                                 <p className="text-white text-sm font-bold">Rawalpindi, PK</p>
                                 <p className="text-gray-500 text-[10px] uppercase tracking-wide">Available for Remote</p>
                              </div>
                           </div>

                           <div className="flex items-center gap-4 px-6 py-4 rounded-2xl bg-white/[0.02] border border-white/5 min-w-[180px]">
                              <Clock className="text-[#00C7FE]" size={18} />
                              <div className="flex flex-col">
                                 <span className="text-[9px] text-gray-500 uppercase tracking-widest font-bold">Local Time (GMT+5)</span>
                                 <span className="text-white font-mono text-sm">{time}</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* 4. The Action */}
                  <div className="reveal-item flex flex-col sm:flex-row items-center gap-8 py-4">
                     <AnimatedButton onClick={() => router.push('/about')} className="group px-10 py-4 h-auto">
                        <span className="flex items-center gap-3 text-base font-bold uppercase tracking-tight">
                           Read Full Story
                           <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </span>
                     </AnimatedButton>
                     <span className="text-gray-500 text-sm italic">Deep dive into my 5+ year journey.</span>
                  </div>

               </div>

            </div>
         </div>
      </Section>
   );
}

function PillarItem({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) {
   return (
      <div className="group space-y-4">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-gray-400 group-hover:text-[#00C7FE] group-hover:border-[#00C7FE]/20 group-hover:bg-[#00C7FE]/5 transition-all duration-500">
               <Icon size={24} strokeWidth={1.5} />
            </div>
            <h4 className="text-xl text-white font-bold tracking-tight">{title}</h4>
         </div>
         <p className="text-gray-500 text-base leading-relaxed pl-1">{desc}</p>
      </div>
   )
}
