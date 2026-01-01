"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Code,
  Database,
  Smartphone,
  Server,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Globe,
  Zap,
  Layout,
  Cpu
} from "lucide-react";
import AnimatedButton from "../Button";
import Section from "../common/Section";

const BentoCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative overflow-hidden rounded-[24px] border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-xl ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100" />
      {children}
    </motion.div>
  );
};

const TechItem = ({ icon: Icon, label }: { icon: React.ElementType; label: string }) => (
  <div className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5 transition-colors hover:bg-white/10 hover:border-white/10">
    <Icon size={24} className="text-[#8B5CF6]" />
    <span className="text-xs font-medium text-gray-300">{label}</span>
  </div>
);

export default function AboutMini() {
  const portraitImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&fit=crop";

  return (
    <Section>
      <div className="mx-auto">
        {/* Section Header */}
        <div className="mb-12 text-center md:text-left bg-[#06090D]">
           <h2 className="text-sm font-semibold tracking-wider text-[#8B5CF6] uppercase mb-3">About Me</h2>
           <h3 
             className="text-3xl md:text-5xl text-white max-w-2xl text-center"
             style={{ fontFamily: 'var(--font-boldonse)' }}
           >
             Building Digital Products with Modern Technologies
           </h3>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[minmax(180px,auto)]">
          
          {/* Card 1: Hero - Span 2x2 */}
          <BentoCard className="lg:col-span-2 lg:row-span-2 min-h-[400px] flex flex-col justify-end group">
            <div className="absolute inset-0">
               <Image
                  src={portraitImage}
                  alt="Imran Safdar"
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#06090D] via-[#06090D]/50 to-transparent" />
            </div>
            
            <div className="relative z-10 p-2">
              <div 
                className="inline-block px-3 py-1 mb-4 rounded-full border border-white/20 bg-black/30 backdrop-blur-md"
              >
                 <span className="text-xs font-medium text-white">Available for work</span>
              </div>
              <h4 
                className="text-4xl text-white mb-2"
                style={{ fontFamily: 'var(--font-boldonse)' }}
              >
                Imran Safdar
              </h4>
              <p className="text-[#8B5CF6] font-medium text-lg mb-4">
                MERN Stack & React Native Developer
              </p>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-lg mb-6">
                I transform complex problems into elegant solutions. Specializing in building scalable web applications and cross-platform mobile experiences that users love.
              </p>
              <AnimatedButton onClick={() => {}}>
                Download Resume
              </AnimatedButton>
            </div>
          </BentoCard>

          {/* Card 2: MERN Stack Arsenal */}
          <BentoCard className="lg:col-span-1 lg:row-span-1">
             <div className="h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                   <div className="p-2 rounded-lg bg-[#8B5CF6]/20">
                      <Database className="text-[#8B5CF6]" size={20} />
                   </div>
                   <h5 className="text-lg font-semibold text-white">MERN Arsenal</h5>
                </div>
                <div className="grid grid-cols-2 gap-3 flex-1 content-start">
                   <TechItem icon={Database} label="MongoDB" />
                   <TechItem icon={Server} label="Express" />
                   <TechItem icon={Code} label="React" />
                   <TechItem icon={Cpu} label="Node.js" />
                </div>
             </div>
          </BentoCard>

          {/* Card 3: Mobile Specialist */}
          <BentoCard className="lg:col-span-1 lg:row-span-1 bg-gradient-to-br from-indigo-900/20 to-purple-900/20">
             <div className="h-full flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                   <div className="p-2 rounded-lg bg-blue-500/20">
                      <Smartphone className="text-blue-400" size={20} />
                   </div>
                   <h5 className="text-lg font-semibold text-white">Mobile Dev</h5>
                </div>
                <p className="text-gray-300 text-sm mb-4 flex-1">
                  Crafting native-like experiences with <strong>React Native</strong> & <strong>Expo</strong>. One codebase, everywhere.
                </p>
                <div className="flex gap-2 mt-auto">
                   <span className="px-3 py-1 rounded-md bg-white/5 text-xs text-blue-300 border border-blue-500/20">iOS</span>
                   <span className="px-3 py-1 rounded-md bg-white/5 text-xs text-green-300 border border-green-500/20">Android</span>
                </div>
             </div>
          </BentoCard>

          {/* Card 4: Stats */}
          <BentoCard className="lg:col-span-1 lg:row-span-1">
            <div className="h-full flex flex-col justify-center items-center text-center">
              <div className="mb-2">
                 <Zap className="text-yellow-400 mx-auto" size={32} />
              </div>
              <span className="text-5xl font-bold text-white mb-1" style={{ fontFamily: 'var(--font-boldonse)' }}>5+</span>
              <span className="text-gray-400 text-sm uppercase tracking-wide">Years Exp.</span>
              <div className="w-full h-px bg-white/10 my-4" />
              <div className="flex justify-between w-full px-4">
                 <div className="text-center">
                    <span className="block text-xl font-bold text-white">20+</span>
                    <span className="text-[10px] text-gray-500">PROJECTS</span>
                 </div>
                 <div className="text-center">
                    <span className="block text-xl font-bold text-white">100%</span>
                    <span className="text-[10px] text-gray-500">SUCCESS</span>
                 </div>
              </div>
            </div>
          </BentoCard>

          {/* Card 5: Connect */}
          <BentoCard className="lg:col-span-1 lg:row-span-1">
             <div className="h-full flex flex-col">
                <h5 className="text-lg font-semibold text-white mb-6">Let&apos;s Connect</h5>
                <div className="flex flex-col gap-4 flex-1">
                   <Link href="https://github.com" target="_blank" className="flex items-center gap-4 group/link">
                      <div className="p-2 rounded-full bg-white/5 group-hover/link:bg-white/10 transition-colors">
                         <Github className="text-white" size={20} />
                      </div>
                      <span className="text-gray-300 group-hover/link:text-white transition-colors">Github</span>
                   </Link>
                   <Link href="https://linkedin.com" target="_blank" className="flex items-center gap-4 group/link">
                      <div className="p-2 rounded-full bg-blue-600/20 group-hover/link:bg-blue-600/30 transition-colors">
                         <Linkedin className="text-blue-400" size={20} />
                      </div>
                      <span className="text-gray-300 group-hover/link:text-white transition-colors">LinkedIn</span>
                   </Link>
                   <Link href="mailto:hello@example.com" className="flex items-center gap-4 group/link">
                      <div className="p-2 rounded-full bg-green-600/20 group-hover/link:bg-green-600/30 transition-colors">
                         <Mail className="text-green-400" size={20} />
                      </div>
                      <span className="text-gray-300 group-hover/link:text-white transition-colors">Email</span>
                   </Link>
                </div>
             </div>
          </BentoCard>

          {/* Card 6: Philosophy */}
          <BentoCard className="lg:col-span-2 lg:row-span-1">
             <div className="flex flex-col md:flex-row items-center gap-6 h-full">
                <div className="flex-1">
                   <div className="flex items-center gap-2 mb-3">
                      <Layout className="text-[#8B5CF6]" size={20} />
                      <h5 className="text-lg font-semibold text-white">Engineering Philosophy</h5>
                   </div>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      &quot;I believe in writing code that is not just functional, but maintainable and scalable. A great product is a perfect blend of robust engineering and intuitive design.&quot;
                    </p>
                   <div className="flex gap-4">
                      <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-green-500" />
                         <span className="text-xs text-gray-400">Clean Code</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-blue-500" />
                         <span className="text-xs text-gray-400">User Centric</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-purple-500" />
                         <span className="text-xs text-gray-400">Pixel Perfect</span>
                      </div>
                   </div>
                </div>
                {/* Decorative Element */}
                <div className="relative w-full md:w-1/3 h-32 md:h-full rounded-xl bg-gradient-to-br from-purple-500/5 to-blue-500/5 border border-white/5 overflow-hidden flex items-center justify-center">
                   <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                   <Code size={48} className="text-white/10" />
                </div>
             </div>
          </BentoCard>

          {/* Card 7: Location */}
          <BentoCard className="lg:col-span-2 lg:row-span-1">
             <div className="h-full flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                   <div className="p-3 rounded-full bg-red-500/10 text-red-400">
                      <MapPin size={24} />
                   </div>
                   <div>
                      <h5 className="text-white font-medium">Remote Capable</h5>
                      <p className="text-gray-400 text-sm">Based in Pakistan, working globally</p>
                   </div>
                </div>
                <div className="hidden md:flex items-center gap-8">
                   <div className="text-right">
                      <span className="block text-xs text-gray-500 uppercase">Current Time</span>
                      <span className="text-white font-mono">{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}</span>
                   </div>
                   <Globe className="text-gray-600 animate-pulse" size={48} strokeWidth={1} />
                </div>
             </div>
          </BentoCard>

        </div>
      </div>
    </Section>
  );
}
