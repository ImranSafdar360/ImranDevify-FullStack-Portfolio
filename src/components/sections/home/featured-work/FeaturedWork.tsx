"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Section from "@/components/shared/Section";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface ProjectImage {
  src: string;
  alt: string;
  width: number;
}

const projectImages: ProjectImage[] = [
  {
    src: "https://www.wzwebs.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FPetMock.423bd46e.png&w=1080&q=75",
    alt: "Dashboard Analytics",
    width: 320,
  },
  {
    src: "https://www.wzwebs.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FMarkitMock.91eccd8b.png&w=1080&q=75",
    alt: "Data Visualization",
    width: 280,
  },
  {
    src: "https://www.wzwebs.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FXionMock.673a96ac.png&w=1080&q=75",
    alt: "Mobile App Design",
    width: 360,
  },
  {
    src: "https://www.wzwebs.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FVinhMockup.36fc6310.png&w=1080&q=75",
    alt: "Web Development",
    width: 300,
  },
  {
    src: "https://www.wzwebs.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FPetMock.423bd46e.png&w=1080&q=75",
    alt: "Code Editor",
    width: 340,
  },
  {
    src: "https://www.wzwebs.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FXionMock.673a96ac.png&w=1080&q=75",
    alt: "UI Design",
    width: 290,
  },
  {
    src: "https://www.wzwebs.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FMarkitMock.91eccd8b.png&w=1080&q=75",
    alt: "React Development",
    width: 310,
  },
  {
    src: "https://www.wzwebs.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FXionMock.673a96ac.png&w=1080&q=75",
    alt: "SaaS Platform",
    width: 350,
  },
  {
    src: "https://www.wzwebs.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FPetMock.423bd46e.png&w=1080&q=75",
    alt: "Tech Stack",
    width: 270,
  },
];

export default function FeaturedWork() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;

      const tween = gsap.to(track, {
        xPercent: 25,
        repeat: -1,
        duration: 30,
        ease: "none",
      });
    },
    { scope: containerRef },
  );

  const duplicatedImages = [...projectImages, ...projectImages];

  return (
    <Section className="w-full max-w-full relative -mt-[70px] min-h-[300px]">
      <div
        className="w-full h-[300px] relative flex justify-center items-center overflow-hidden"
        ref={containerRef}
      >
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[80px] lg:w-[170px] h-[400px] bg-gradient-to-r from-[#06090D] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-1/2 -translate-y-1/2  right-0 w-[80px] lg:w-[170px] h-[400px] bg-gradient-to-l from-[#06090D] to-transparent z-10 pointer-events-none"></div>
        {/* Scrolling Track */}
        <div
          ref={trackRef}
          className="flex gap-6 px-6 will-change-transform"
          style={{ width: "fit-content" }}
        >
          {duplicatedImages.map((image, index) => (
            <div
              key={`${image.alt}-${index}`}
              className="flex-shrink-0 relative group rounded-[20px] overflow-hidden"
              style={{
                width: `455px`,
                height: "300px",
              }}
            >
              <div className="relative w-full h-full overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover rounded-[24px]"
                  sizes={`${image.width}px`}
                  priority={index < 4} // Prioritize first few images
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
