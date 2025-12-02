"use client";

import React, { useState } from "react";
import Image from "next/image";
import Section from "../common/Section";
import GradientText from "./gradient-text";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
    category: "SaaS / Analytics",
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
    category: "Mobile / E-Commerce",
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
    category: "Enterprise / Dashboard",
    results: ["80% time saved", "500+ users", "Real-time sync"],
  },
  {
    id: "4",
    title: "AI Chat Platform",
    description:
      "Advanced AI-powered chat platform with neural network integration and real-time communication.",
    longDescription:
      "A cutting-edge AI chat platform featuring neural network integration, real-time messaging, and intelligent conversation capabilities.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80&fit=crop",
    techStack: ["Next.js", "OpenAI", "WebSocket", "PostgreSQL"],
    category: "AI / LLM",
    results: ["Real-time AI", "99.9% uptime", "1M+ messages"],
  },
];

export default function CaseStudies() {
  const [swiper, setSwiper] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const currentProject = caseStudies[activeIndex];

  return (
    <Section>
      <div className="w-full max-w-[1440px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl mb-6 text-white"
            style={{
              fontFamily: "var(--font-boldonse)",
              fontWeight: 400,
              fontStyle: "normal",
            }}
          >
            Best Project <GradientText>Picks</GradientText>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            This collection shows the projects I've created to connect, represent, and inspire confidence.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Gradient Overlays - Left & Right */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[100px] lg:w-[200px] h-[500px] md:h-[600px] lg:h-[700px] bg-gradient-to-r from-[#06090D] to-transparent z-20 pointer-events-none" />
          <div className="absolute top-1/2 -translate-y-1/2 right-0 w-[100px] lg:w-[200px] h-[500px] md:h-[600px] lg:h-[700px] bg-gradient-to-l from-[#06090D] to-transparent z-20 pointer-events-none" />

          {/* Cards Container with Preview Cards */}
          <div className="relative flex items-center justify-center gap-4 md:gap-6 mb-8">
            {/* Left Preview Card */}
            {(() => {
              const prevIndex = (activeIndex - 1 + caseStudies.length) % caseStudies.length;
              const prevProject = caseStudies[prevIndex];
              return (
                <div
                  className="hidden md:block relative w-[20%] h-[400px] md:h-[500px] rounded-[20px] overflow-hidden transition-all duration-500 cursor-pointer z-0"
                  onClick={() => swiper?.slidePrev()}
                  style={{
                    background: "rgba(255, 255, 255, 0.04)",
                    backdropFilter: "blur(20px) saturate(180%)",
                    WebkitBackdropFilter: "blur(20px) saturate(180%)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    transform: "translateX(20%) scale(0.85)",
                    opacity: 0.4,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "0.6";
                    e.currentTarget.style.transform = "translateX(15%) scale(0.88)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "0.4";
                    e.currentTarget.style.transform = "translateX(20%) scale(0.85)";
                  }}
                >
                  <Image
                    src={prevProject.image}
                    alt={prevProject.title}
                    fill
                    className="object-cover"
                    sizes="20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#06090D]/80" />
                </div>
              );
            })()}

            {/* Swiper Carousel - Main Card */}
            <div className="w-full md:w-[60%]">
            <Swiper
              onSwiper={setSwiper}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              modules={[Autoplay, EffectFade, Navigation, Pagination]}
              effect="fade"
              fadeEffect={{
                crossFade: true,
              }}
              loop={true}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              speed={800}
              slidesPerView={1}
              spaceBetween={0}
              className="case-studies-swiper"
            >
              {caseStudies.map((study, index) => (
                <SwiperSlide key={study.id}>
                  <div
                    className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] rounded-[24px] overflow-hidden group/main transition-all duration-500"
                    style={{
                      background: "rgba(255, 255, 255, 0.04)",
                      backdropFilter: "blur(20px) saturate(180%)",
                      WebkitBackdropFilter: "blur(20px) saturate(180%)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = "0 25px 70px rgba(0, 199, 254, 0.2)";
                      e.currentTarget.style.borderColor = "rgba(0, 199, 254, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "0 20px 60px rgba(0, 0, 0, 0.4)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                    }}
                  >
                    <Image
                      src={study.image}
                      alt={study.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 60vw"
                      priority={index === 0}
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#06090D]/60" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            </div>

            {/* Right Preview Card */}
            {(() => {
              const nextIndex = (activeIndex + 1) % caseStudies.length;
              const nextProject = caseStudies[nextIndex];
              return (
                <div
                  className="hidden md:block relative w-[20%] h-[400px] md:h-[500px] rounded-[20px] overflow-hidden transition-all duration-500 cursor-pointer z-0"
                  onClick={() => swiper?.slideNext()}
                  style={{
                    background: "rgba(255, 255, 255, 0.04)",
                    backdropFilter: "blur(20px) saturate(180%)",
                    WebkitBackdropFilter: "blur(20px) saturate(180%)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    transform: "translateX(-20%) scale(0.85)",
                    opacity: 0.4,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "0.6";
                    e.currentTarget.style.transform = "translateX(-15%) scale(0.88)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "0.4";
                    e.currentTarget.style.transform = "translateX(-20%) scale(0.85)";
                  }}
                >
                  <Image
                    src={nextProject.image}
                    alt={nextProject.title}
                    fill
                    className="object-cover"
                    sizes="20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#06090D]/80" />
                </div>
              );
            })()}
          </div>

          {/* Bottom Info Bar */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            {/* Left Side - Project Info */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: "#00C7FE" }}
                />
                <span className="text-white text-lg font-medium">
                  {currentProject.title}
                </span>
              </div>
              <span
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  color: "#ffffff",
                }}
              >
                {currentProject.category}
              </span>
            </div>

            {/* Right Side - View Button */}
            <button
              className="flex items-center gap-2 text-white font-medium hover:text-[#00C7FE] transition-colors duration-300"
            >
              <span>View</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Controls */}
          <div className="flex flex-col items-center gap-4">
            {/* Previous/Next Buttons */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => swiper?.slidePrev()}
                className="px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 hover:bg-white/10"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                Previous
              </button>
              <button
                onClick={() => swiper?.slideNext()}
                className="px-6 py-3 rounded-lg text-white font-medium transition-all duration-300 hover:bg-white/10"
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                Next
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center gap-2">
              {caseStudies.map((_, index) => (
                <button
                  key={index}
                  onClick={() => swiper?.slideToLoop(index)}
                  className="transition-all duration-300"
                  aria-label={`Go to project ${index + 1}`}
                >
                  <div
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? "w-8 bg-[#00C7FE]"
                        : "bg-gray-600 hover:bg-gray-500"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

