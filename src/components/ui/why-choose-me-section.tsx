"use client";

import React, { useState } from "react";
import GradientText from "./gradient-text";
import { Target, Code, MessageSquare, MonitorSmartphone } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCard {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  detail: string;
}

const featureCards: FeatureCard[] = [
  {
    id: 1,
    icon: <Target className="w-6 h-6" />,
    title: "Product-First",
    description: "Balancing UX & Business Goals",
    detail:
      "I don't just ticket-push. I approach every project from a product mindset — ensuring every line of code serves a user need or a business goal.",
  },
  {
    id: 2,
    icon: <Code className="w-6 h-6" />,
    title: "Scalable Code",
    description: "Built to Grow, Not Break",
    detail:
      "I build systems that are easy to maintain and scale. Clean architecture, proper typing, and solid documentation mean your team can move fast without breaking things.",
  },
  {
    id: 3,
    icon: <MessageSquare className="w-6 h-6" />,
    title: "Clear Comms",
    description: "No Ghosting, No Jargon",
    detail:
      "You'll always know what's happening. I believe in radical transparency, daily updates, and explaining technical decisions in plain English.",
  },
  {
    id: 4,
    icon: <MonitorSmartphone className="w-6 h-6" />,
    title: "Modern Stack",
    description: "Future-Proof Tech",
    detail:
      "Leveraging the latest in Next.js, React Native, and TypeScript to build performant applications that stand the test of time.",
  },
];

export default function WhyChooseMeSection() {
  const [activeCard, setActiveCard] = useState<number>(1);

  return (
    <section className="w-full py-24 md:py-32 relative overflow-hidden" style={{ background: "#06090D" }}>
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00C7FE]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#0080FF]/10 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-6 relative z-10">
        <div className="flex flex-col xl:flex-row gap-16 items-start">
          {/* Header Section */}
          <div className="w-full xl:w-1/3 xl:sticky xl:top-32 space-y-8">
            <h2
              className="text-4xl md:text-5xl text-white leading-tight"
              style={{ fontFamily: "var(--font-boldonse)" }}
            >
              Why Teams <GradientText>Choose Me</GradientText>
            </h2>
            
            <p className="text-gray-400 text-lg leading-relaxed">
              I partner with founders and agencies who need more than just a developer. You get a technical partner who cares about the product as much as you do.
            </p>

            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                <div>
                   <h4 className="text-3xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-boldonse)" }}>100%</h4>
                   <p className="text-sm text-gray-500 uppercase tracking-wider">Success Rate</p>
                </div>
                <div>
                   <h4 className="text-3xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-boldonse)" }}>2+</h4>
                   <p className="text-sm text-gray-500 uppercase tracking-wider">Years Exp</p>
                </div>
            </div>
          </div>

          {/* Expandable Cards Area */}
          <div className="w-full xl:w-2/3 h-[600px] hidden md:flex gap-4">
            {featureCards.map((card) => (
              <div
                key={card.id}
                onClick={() => setActiveCard(card.id)}
                onMouseEnter={() => setActiveCard(card.id)}
                className={cn(
                  "relative h-full rounded-[24px] cursor-pointer overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
                  activeCard === card.id ? "flex-[3]" : "flex-[1] hover:flex-[1.2]"
                )}
              >
                {/* Background Image/Gradient */}
                <div 
                  className={cn(
                    "absolute inset-0 transition-opacity duration-500",
                    activeCard === card.id ? "opacity-100" : "opacity-60"
                  )}
                  style={{
                    background: activeCard === card.id 
                      ? "linear-gradient(145deg, rgba(20,20,25,0.95) 0%, rgba(10,10,15,0.98) 100%)"
                      : "linear-gradient(145deg, rgba(20,20,25,0.8) 0%, rgba(10,10,15,0.9) 100%)",
                  }}
                >
                    {/* Inner Noise/Texture */}
                   <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                </div>
                
                {/* Border Glow for Active */}
                <div className={cn(
                    "absolute inset-0 border transition-colors duration-500 rounded-[24px] pointer-events-none",
                    activeCard === card.id ? "border-[#00C7FE]/30" : "border-white/5"
                )} />

                {/* Content Container */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    {/* Top Icons/Number */}
                    <div className="flex justify-between items-start">
                         <div className={cn(
                             "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500",
                             activeCard === card.id ? "bg-[#00C7FE]/20 text-[#00C7FE]" : "bg-white/5 text-gray-400"
                         )}>
                             {card.icon}
                         </div>
                         <span className={cn(
                             "text-4xl font-bold transition-colors duration-500",
                             activeCard === card.id ? "text-white/10" : "text-white/5"
                         )} style={{ fontFamily: "var(--font-boldonse)" }}>
                             0{card.id}
                         </span>
                    </div>

                    {/* Middle Text (Vertical when closed) */}
                     <div className="relative flex-1 flex flex-col justify-center">
                        <h3 className={cn(
                            "text-2xl font-bold text-white mb-2 whitespace-nowrap transition-all duration-500 origin-left",
                            activeCard !== card.id && "absolute top-1/2 left-0 -rotate-90 translate-y-12 -translate-x-2"
                        )} style={{ fontFamily: "var(--font-boldonse)" }}>
                            {card.title}
                        </h3>
                        
                        <div className={cn(
                            "space-y-4 overflow-hidden transition-all duration-500",
                            activeCard === card.id ? "opacity-100 max-h-[200px] mt-4" : "opacity-0 max-h-0"
                        )}>
                             <p className="text-[#00C7FE] font-medium">{card.description}</p>
                             <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                                 {card.detail}
                             </p>
                        </div>
                     </div>

                    {/* Bottom Indicator */}
                    <div className={cn(
                        "transition-all duration-500 flex items-center gap-2",
                         activeCard === card.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    )}>
                        <div className="h-[1px] w-12 bg-[#00C7FE]" />
                        <span className="text-xs text-[#00C7FE] uppercase tracking-widest">Selected</span>
                    </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile View (Stacked) */}
          <div className="w-full flex md:hidden flex-col gap-4">
             {featureCards.map((card) => (
                 <div 
                    key={card.id}
                    className="bg-[#121212] border border-white/10 rounded-2xl p-6"
                 >
                     <div className="flex items-center gap-4 mb-4">
                         <div className="w-10 h-10 rounded-full bg-[#00C7FE]/10 flex items-center justify-center text-[#00C7FE]">
                             {card.icon}
                         </div>
                         <div>
                             <h3 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-boldonse)" }}>
                                 {card.title}
                             </h3>
                             <p className="text-xs text-[#00C7FE]">{card.description}</p>
                         </div>
                     </div>
                     <p className="text-gray-400 text-sm leading-relaxed">
                         {card.detail}
                     </p>
                 </div>
             ))}
          </div>

        </div>
      </div>
    </section>
  );
}
