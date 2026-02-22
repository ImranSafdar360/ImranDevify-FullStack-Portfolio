"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Section from "@/components/shared/Section";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { projectImages } from "@/data/featuredData";

gsap.registerPlugin(useGSAP);

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
    <Section className="w-full max-w-full relative -mt-[70px] min-h-[400px] md:min-h-[600px] z-20 px-0 md:px-0 lg:px-0 xl:px-0">
      <div
        className="w-full min-h-[400px] md:min-h-[600px] relative flex flex-col justify-center items-center gap-[32px] overflow-hidden"
        ref={containerRef}
      >
        {/* Gradient overlays */}
        <div className="absolute top-0 left-0 w-[80px] lg:w-[170px] h-full max-h-[650px] bg-gradient-to-r from-[#050509] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[80px] lg:w-[170px] h-full max-h-[650px] bg-gradient-to-l from-[#050509] to-transparent z-10 pointer-events-none"></div>

        {/* Top Row - Moving Left to Right */}
        <div className="w-full h-[200px] md:h-[300px] relative overflow-hidden">
          <div
            ref={trackTopRef}
            className="flex gap-6 px-6 will-change-transform"
            style={{ width: "fit-content" }}
          >
            {duplicatedImages.map((image, index) => (
              <div
                key={`top-${image.alt}-${index}`}
                className="w-[250px] h-[200px] md:w-[455px] md:h-[300px] flex-shrink-0 relative group rounded-[20px] overflow-hidden"
              >
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover rounded-[24px]"
                    priority={index < 4}
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row - Moving Right to Left */}
        <div className="w-full h-[200px] md:h-[300px] relative overflow-hidden">
          <div
            ref={trackBottomRef}
            className="flex gap-6 px-6 will-change-transform"
            style={{ width: "fit-content" }}
          >
            {reversedImages.map((image, index) => (
              <div
                key={`bottom-${image.alt}-${index}`}
                className="w-[250px] h-[200px] md:w-[455px] md:h-[300px] flex-shrink-0 relative group rounded-[20px] overflow-hidden"
              >
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover rounded-[24px]"
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
