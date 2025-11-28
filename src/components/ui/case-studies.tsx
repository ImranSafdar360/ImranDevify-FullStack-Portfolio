"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Section from "../common/Section";
import GradientText from "./gradient-text";
import { ArrowRight } from "lucide-react";

interface CaseStudy {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  techStack: string[];
  category: string;
  results?: string[];
  link?: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: "1",
    title: "SaaS Analytics Platform",
    description:
      "Built a high-performance analytics dashboard that processes millions of data points in real-time.",
    longDescription:
      "A comprehensive analytics platform designed for SaaS companies to track user behavior, revenue metrics, and product performance. Built with React, Node.js, and optimized for scale.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&fit=crop",
    techStack: ["React", "Node.js", "PostgreSQL", "Redis", "TypeScript"],
    category: "SaaS",
    results: ["40% faster load times", "99.9% uptime", "10M+ events/day"],
  },
  {
    id: "2",
    title: "E-Commerce Mobile App",
    description:
      "Native mobile application with seamless checkout and real-time inventory management.",
    longDescription:
      "A full-featured e-commerce mobile app built with React Native, featuring offline capabilities, push notifications, and integrated payment processing.",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80&fit=crop",
    techStack: ["React Native", "Firebase", "Stripe", "Redux"],
    category: "Mobile",
    results: ["4.8★ rating", "50K+ downloads", "30% conversion"],
  },
  {
    id: "3",
    title: "Enterprise Dashboard",
    description:
      "Custom enterprise dashboard with advanced data visualization and reporting capabilities.",
    longDescription:
      "An enterprise-grade dashboard solution that consolidates data from multiple sources, providing real-time insights and customizable reporting for large organizations.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&fit=crop",
    techStack: ["Next.js", "Python", "MongoDB", "D3.js", "GraphQL"],
    category: "Enterprise",
    results: ["80% time saved", "500+ users", "Real-time sync"],
  },
  {
    id: "4",
    title: "FinTech Payment Gateway",
    description:
      "Secure, scalable payment processing system with fraud detection and compliance features.",
    longDescription:
      "A robust payment gateway solution built for financial institutions, featuring advanced security, PCI compliance, and support for multiple payment methods.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80&fit=crop",
    techStack: ["Node.js", "PostgreSQL", "Docker", "Kubernetes", "AWS"],
    category: "FinTech",
    results: ["99.99% uptime", "PCI compliant", "1M+ transactions"],
  },
];

export default function CaseStudies() {
  return (
    <Section>
      <div className="w-full max-w-[1440px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl mb-6 text-white"
            style={{
              fontFamily: "var(--font-boldonse)",
              fontWeight: 400,
              fontStyle: "normal",
            }}
          >
            Case Studies & <GradientText>Recent Work</GradientText>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Real projects engineered with performance, scalability, and user experience at the core.
          </p>
        </div>

        {/* Staggered Grid - 2×2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={study.id} study={study} index={index} />
          ))}
        </div>
      </div>
    </Section>
  );
}

interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
}

function CaseStudyCard({ study, index }: CaseStudyCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  // Stagger delay: 0ms, 100ms, 200ms, 300ms
  const staggerDelay = index * 100;

  return (
    <div
      ref={cardRef}
      className="group relative w-full rounded-[20px] overflow-hidden"
      style={{
        background: "rgba(255, 255, 255, 0.04)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.2)",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${staggerDelay}ms, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${staggerDelay}ms`,
      }}
    >
      {/* Image Container */}
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <Image
          src={study.image}
          alt={study.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        
        {/* Gradient Overlay - Only on Hover */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#06090D]/0 via-[#06090D]/0 to-[#06090D]/0 group-hover:from-[#06090D]/40 group-hover:via-[#06090D]/30 group-hover:to-[#06090D]/60 transition-all duration-500" />
      </div>

      {/* Content Section */}
      <div className="p-6 md:p-8">
        {/* Title */}
        <h3
          className="text-2xl md:text-3xl mb-4 text-white group-hover:text-[#00C7FE] transition-colors duration-300"
          style={{
            fontFamily: "var(--font-boldonse)",
            fontWeight: 400,
            fontStyle: "normal",
          }}
        >
          {study.title}
        </h3>

        {/* Value Outcome - 1-2 lines */}
        <p className="text-gray-300 text-base md:text-lg mb-6 leading-relaxed line-clamp-2">
          {study.description}
        </p>

        {/* CTA Button */}
        <button
          className="flex items-center gap-2 text-white font-medium group/btn transition-all duration-300"
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "#00C7FE";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "#ffffff";
          }}
        >
          <span className="text-base md:text-lg">View Case Study</span>
          <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-2" />
        </button>
      </div>

      {/* Hover Shadow Effect */}
      <div
        className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: "0 20px 60px rgba(0, 199, 254, 0.15)",
        }}
      />
    </div>
  );
}
