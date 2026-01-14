"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import GradientText from "./gradient-text";
import AnimatedButton from "../Button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import router from "next/router";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface CaseStudy {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  client: string;
  date: string;
  service: string;
  techStack: string[];
}

const caseStudies: CaseStudy[] = [
  {
    id: "1",
    title: "SaaSy Analytics",
    description:
      "A comprehensive analytics platform designed for SaaS companies to track user behavior, revenue metrics, and product performance.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80&fit=crop",
    category: "SaaS Platform",
    client: "TechFlow Inc",
    date: "March 2024",
    service: "Full Stack Dev",
    techStack: ["React", "Node.js", "Redis", "AWS"],
  },
  {
    id: "2",
    title: "Vogue Commerce",
    description:
      "A full-featured e-commerce mobile app built with React Native, featuring offline capabilities and integrated payment processing.",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1600&q=80&fit=crop",
    category: "Mobile App",
    client: "Vogue Fashion",
    date: "Jan 2024",
    service: "Mobile Development",
    techStack: ["React Native", "Firebase", "Stripe"],
  },
  {
    id: "3",
    title: "Enterprise Vision",
    description:
      "An enterprise-grade dashboard solution that consolidates data from multiple sources, providing real-time insights.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80&fit=crop",
    category: "Dashboard",
    client: "Global Corp",
    date: "Nov 2023",
    service: "UI/UX Design",
    techStack: ["Next.js", "D3.js", "Python"],
  },
];

export default function CaseStudies() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      if (!isDesktop) return;

      const cards = cardsRef.current;
      const totalCards = cards.length;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${totalCards * 1000}`,
          pin: true,
          scrub: 1,
        },
      });

      cards.forEach((card, i) => {
        tl.to(card, {
          y: 0,
          duration: 1,
          ease: "power2.out",
        }, i * 1);

        if (i < totalCards - 1) {
          tl.to(card, {
            scale: 0.9,
            opacity: 0.8,
            duration: 1,
            ease: "power2.out",
          }, (i + 1) * 1);
        }
      });

    },
    { scope: containerRef }
  );

  return (

    <div ref={containerRef} className="relative bg-black">

      {/* Mobile Fallback: Simple Vertical Stack */}
      <div className="lg:hidden w-full px-6 py-20 flex flex-col gap-12">
        <HeaderContent />
        {caseStudies.map((study) => (
          <CaseStudyCard key={study.id} study={study} />
        ))}
        <BottomCTA router={router} />
      </div>

      {/* Desktop Sticky Stack */}
      <div className="hidden lg:flex flex-col items-center justify-start h-screen w-full relative overflow-hidden">
        <div className="absolute top-10 md:top-20 z-0 w-full flex justify-center">
          <HeaderContent />
        </div>

        <div className="relative w-full max-w-[1200px] h-full mt-[25vh] z-10 perspective-[1000px]">
          {caseStudies.map((study, i) => (
            <div
              key={study.id}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              className="absolute top-0 left-0 w-full h-[70vh] will-change-transform"
              style={{
                zIndex: i + 1,
                transform: i === 0 ? "translateY(20vh)" : "translateY(150vh)",
              }}
            >
              <CaseStudyCard study={study} />
            </div>
          ))}
        </div>
      </div>

      <div className="hidden lg:block">
        <BottomCTA router={router} />
      </div>

    </div>
  );
}

function HeaderContent() {
  return (
    <div className="text-center mt-[60px]">
      <h2
        className="text-5xl md:text-8xl text-white leading-tight uppercase"
        style={{ fontFamily: "var(--font-boldonse)" }}
      >
        <GradientText>Case Studies</GradientText>
      </h2>
    </div>
  )
}

function BottomCTA({ router }: { router: any }) {
  return (
    <div className="w-full py-16 text-center space-y-8 border-t border-white/10 bg-black z-20 relative">
      <h3 className="text-4xl lg:text-5xl font-bold text-white max-w-2xl mx-auto">
        Seen enough? Let&apos;s START <br />
        <span className="text-[#00C7FE]">building something amazing.</span>
      </h3>
      <div className="flex justify-center">
        <AnimatedButton onClick={() => { }}>Book a Call</AnimatedButton>
      </div>
    </div>
  )
}

function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <div className="w-full h-full p-6 lg:p-10 rounded-[32px] bg-[#0A0A0A] border border-white/10 shadow-2xl flex flex-col lg:flex-row gap-8 overflow-hidden group">

      {/* Left: Info */}
      <div className="lg:w-5/12 flex flex-col justify-between py-2 order-2 lg:order-1">
        <div className="space-y-8">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-[#00C7FE] group-hover:text-black transition-colors duration-300">
            <ArrowUpRight className="w-6 h-6" />
          </div>

          <div className="space-y-4">
            <h3 className="text-3xl lg:text-5xl font-bold text-white group-hover:text-[#00C7FE] transition-colors duration-300">
              {study.title}
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              {study.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 pt-2">
              {study.techStack.map((tech) => (
                <span key={tech} className="px-3 py-1 rounded-full text-xs font-medium text-white/70 bg-white/5 border border-white/10">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Meta Grid */}
          <div className="grid grid-cols-2 gap-y-6 pt-8 border-t border-white/10">
            <div>
              <span className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Client</span>
              <span className="text-white font-medium">{study.client}</span>
            </div>
            <div>
              <span className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Date</span>
              <span className="text-white font-medium">{study.date}</span>
            </div>
            <div>
              <span className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Service</span>
              <span className="text-white font-medium">{study.service}</span>
            </div>
            <div>
              <span className="block text-xs uppercase tracking-wider text-gray-500 mb-1">Type</span>
              <span className="text-white font-medium">{study.category}</span>
            </div>
          </div>

          <AnimatedButton
            onClick={() => router.push(`/case-studies/${study.id}`)}
          >
            Read More
          </AnimatedButton>
        </div>
      </div>

      {/* Right: Image */}
      <div className="lg:w-7/12 h-[300px] lg:h-full rounded-[24px] overflow-hidden relative order-1 lg:order-2">
        <Image
          src={study.image}
          alt={study.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
      </div>
    </div>
  );
};
