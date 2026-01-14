"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Section from "../common/Section";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import profilePic from "../../../public/images/profile-pic.png";

gsap.registerPlugin(useGSAP);

interface ProjectImage {
  src: string;
  alt: string;
  width: number;
}

const projectImages: ProjectImage[] = [
  {
    src: "https://cdn.prod.website-files.com/65c7568517fcb5339e36e278/672c6d3f3be42208d9a93cec_Jack2%20Media.webp",
    alt: "Dashboard Analytics",
    width: 320,
  },
  {
    src: "https://cdn.prod.website-files.com/65c7568517fcb5339e36e278/672c6d060d0ac5a20234a41d_motorsports%20website.webp",
    alt: "Data Visualization",
    width: 280,
  },
  {
    src: "https://cdn.prod.website-files.com/65c7568517fcb5339e36e278/672c6d3f3be42208d9a93cec_Jack2%20Media.webp",
    alt: "Mobile App Design",
    width: 360,
  },
  {
    src: "https://cdn.prod.website-files.com/65c7568517fcb5339e36e278/672c6d8619a4019a34e37414_nutradora.webp",
    alt: "Web Development",
    width: 300,
  },
  {
    src: "https://cdn.prod.website-files.com/65c7568517fcb5339e36e278/672c6cf619f16864efb14f1f_genesis%20innovation%20landing%20page.webp",
    alt: "Code Editor",
    width: 340,
  },
  {
    src: "https://cdn.prod.website-files.com/65c7568517fcb5339e36e278/672c6d3f3be42208d9a93cec_Jack2%20Media.webp",
    alt: "UI Design",
    width: 290,
  },
  {
    src: "https://cdn.prod.website-files.com/65c7568517fcb5339e36e278/672c6d060d0ac5a20234a41d_motorsports%20website.webp",
    alt: "React Development",
    width: 310,
  },
  {
    src: "https://cdn.prod.website-files.com/65c7568517fcb5339e36e278/672c6d3f3be42208d9a93cec_Jack2%20Media.webp",
    alt: "SaaS Platform",
    width: 350,
  },
  {
    src: "https://cdn.prod.website-files.com/65c7568517fcb5339e36e278/672c6d8619a4019a34e37414_nutradora.webp",
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

      const container = containerRef.current;
      if (container) {
        container.addEventListener("mouseenter", () => tween.pause());
        container.addEventListener("mouseleave", () => tween.play());
      }

      return () => {
        if (container) {
          container.removeEventListener("mouseenter", () => tween.pause());
          container.removeEventListener("mouseleave", () => tween.play());
        }
      }
    },
    { scope: containerRef }
  );

  const duplicatedImages = [...projectImages, ...projectImages];

  return (
    <Section className="w-full max-w-full relative -mt-[60px] min-h-[450px]">
      <div className="w-full h-[450px] relative flex justify-center items-center overflow-hidden" ref={containerRef}>
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[80px] lg:w-[170px] h-[450px] bg-gradient-to-r from-[#06090D] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-1/2 -translate-y-1/2  right-0 w-[80px] lg:w-[170px] h-[450px] bg-gradient-to-l from-[#06090D] to-transparent z-10 pointer-events-none"></div>
        {/* Content Card - Overlay on top of scrolling section */}
        {/* <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10 w-full max-w-[400px] h-[650px] rounded-[20px] bg-black/20">
          <div
            className="relative w-full h-full flex flex-col items-center justify-center gap-[24px] rounded-[20px] p-2 overflow-hidden"
            style={{
              background: "rgba(255, 255, 255, 0.06)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              boxShadow:
                "0 8px 32px 0 rgba(0, 0, 0, 0.25), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)",
            }}
          >
            <Image src={profilePic} alt="Profile Image" className="w-full h-full object-contain rounded-[20px]" />
          </div>
        </div> */}
        {/* Scrolling Track */}
        <div
          ref={trackRef}
          className="flex gap-6 px-6 will-change-transform"
          style={{ width: "fit-content" }}
        >
          {duplicatedImages.map((image, index) => (
            <div
              key={`${image.alt}-${index}`}
              className="flex-shrink-0 relative group rounded-[20px] overflow-hidden bg-gray-800/20 border border-gray-700/30 p-2"
              style={{
                width: `600px`,
                height: "400px",
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
