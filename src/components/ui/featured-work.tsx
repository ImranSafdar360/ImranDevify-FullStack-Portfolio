"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Section from "../common/Section";
import AnimatedButton from "../Button";

interface ProjectImage {
  src: string;
  alt: string;
  width: number; // Different widths for each image
}

// Using Unsplash free images - tech/design related for portfolio showcase
// These are high-quality placeholder images that you can replace with your own project screenshots
const projectImages: ProjectImage[] = [
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&fit=crop",
    alt: "Dashboard Analytics",
    width: 320,
  },
  {
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&fit=crop",
    alt: "Data Visualization",
    width: 280,
  },
  {
    src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80&fit=crop",
    alt: "Mobile App Design",
    width: 360,
  },
  {
    src: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80&fit=crop",
    alt: "Web Development",
    width: 300,
  },
  {
    src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80&fit=crop",
    alt: "Code Editor",
    width: 340,
  },
  {
    src: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80&fit=crop",
    alt: "UI Design",
    width: 290,
  },
  {
    src: "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&q=80&fit=crop",
    alt: "React Development",
    width: 310,
  },
  {
    src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&fit=crop",
    alt: "SaaS Platform",
    width: 350,
  },
  {
    src: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80&fit=crop",
    alt: "Tech Stack",
    width: 270,
  },
];

export default function FeaturedWork() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.5; // Adjust speed (pixels per frame)
    let isAnimating = true;

    const animate = () => {
      if (!isAnimating) return;

      scrollPosition += scrollSpeed;

      // Calculate the width of the first set of images (half of total)
      const firstSetWidth = container.scrollWidth / 2;

      // Reset scroll position seamlessly when we've scrolled through first set
      if (scrollPosition >= firstSetWidth) {
        scrollPosition = 0;
      }

      container.scrollLeft = scrollPosition;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animate);

    // Pause on hover
    const handleMouseEnter = () => {
      isAnimating = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };

    const handleMouseLeave = () => {
      isAnimating = true;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    container.addEventListener("mouseenter", handleMouseEnter);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      container.removeEventListener("mouseenter", handleMouseEnter);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Duplicate images for seamless loop
  const duplicatedImages = [...projectImages, ...projectImages];

  return (
    <Section className="w-full max-w-[1440px] relative">
      {/* Horizontal Scrolling Container - Full Width */}
      <div className="w-full h-[450px] relative flex justify-center items-center">
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[80px] lg:w-[150px] h-[300px] bg-gradient-to-r from-[#06090D] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-1/2 -translate-y-1/2  right-0 w-[80px] lg:w-[150px] h-[300px] bg-gradient-to-l from-[#06090D] to-transparent z-10 pointer-events-none"></div>
        {/* Content Card - Overlay on top of scrolling section */}
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10 w-full max-w-[500px] h-[450px] px-6">
          <div
            className="relative w-full h-full flex flex-col items-center justify-center gap-[24px] rounded-[20px] overflow-hidden"
            style={{
              background: "rgba(255, 255, 255, 0.06)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              boxShadow:
                "0 8px 32px 0 rgba(0, 0, 0, 0.25), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)",
            }}
          >
              <h2
                className="text-2xl md:text-[28px] text-white text-center"
                style={{
                  fontFamily: "var(--font-boldonse)",
                  fontWeight: 400,
                  fontStyle: "normal",
                }}
              >
                Featured Work at a Glance
              </h2>
              <p className="text-gray-300 text-sm md:text-base text-center leading-relaxed max-w-md mx-auto">
                High-performing interfaces, scalable architectures, and
                user-centered product experiences — built for teams serious
                about quality.
              </p>
              <AnimatedButton onClick={() => {}}>
                Explore Case Studies
              </AnimatedButton>
          </div>
        </div>

        {/* Scrolling images with top padding to accommodate card */}
        <div
          ref={scrollContainerRef}
          className="w-full overflow-x-scroll flex gap-6 px-6 hide-scrollbar"
        >
          {duplicatedImages.map((image, index) => (
            <div
              key={`${image.alt}-${index}`}
              className="flex-shrink-0 relative group"
              style={{
                width: `${image.width}px`,
                height: "280px", // Same height for all images
              }}
            >
              <div className="relative w-full h-full rounded-[10px] overflow-hidden bg-gray-800/20 border border-gray-700/30">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes={`${image.width}px`}
                />
                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
