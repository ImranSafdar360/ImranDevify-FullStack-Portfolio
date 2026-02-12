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
  const trackTopRef = useRef<HTMLDivElement>(null);
  const trackBottomRef = useRef<HTMLDivElement>(null);

  const duplicatedImages = [
    ...projectImages,
    ...projectImages,
    ...projectImages,
    ...projectImages,
  ];

  const reversedImages = [...duplicatedImages].reverse();

  useGSAP(
    () => {
      const trackTop = trackTopRef.current;
      const trackBottom = trackBottomRef.current;
      if (!trackTop || !trackBottom) return;

      gsap.set(trackTop, { xPercent: 0 });
      gsap.set(trackBottom, { xPercent: -50 });

      gsap.to(trackTop, {
        xPercent: -50,
        repeat: -1,
        duration: 70,
        ease: "none",
      });

      gsap.to(trackBottom, {
        xPercent: 0,
        repeat: -1,
        duration: 70,
        ease: "none",
      });
    },
    { scope: containerRef },
  );

  return (
    <Section className="w-full max-w-full relative -mt-[70px] min-h-[600px]">
      <div
        className="w-full min-h-[600px] relative flex flex-col justify-center items-center gap-[32px] overflow-hidden"
        ref={containerRef}
      >
        {/* Gradient overlays */}
        <div className="absolute top-0 left-0 w-[80px] lg:w-[170px] h-full max-h-[350px] bg-gradient-to-r from-[#050509] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[80px] lg:w-[170px] h-full max-h-[350px] bg-gradient-to-l from-[#050509] to-transparent z-10 pointer-events-none"></div>

        {/* Top Row - Moving Left to Right */}
        <div className="w-full h-[300px] relative overflow-hidden">
          <div
            ref={trackTopRef}
            className="flex gap-6 px-6 will-change-transform"
            style={{ width: "fit-content" }}
          >
            {duplicatedImages.map((image, index) => (
              <div
                key={`top-${image.alt}-${index}`}
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
                    priority={index < 4}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row - Moving Right to Left */}
        <div className="w-full h-[300px] relative overflow-hidden">
          <div
            ref={trackBottomRef}
            className="flex gap-6 px-6 will-change-transform"
            style={{ width: "fit-content" }}
          >
            {reversedImages.map((image, index) => (
              <div
                key={`bottom-${image.alt}-${index}`}
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
                    priority={index < 4}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
