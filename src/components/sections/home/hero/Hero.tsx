"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import AnimatedButton from "@/components/shared/AnimatedButton";
import SocialDock from "@/components/ui/social-dock";
import Section from "@/components/shared/Section";
import Image from "next/image";
import FeaturedWork from "../featured-work/FeaturedWork";
import whatsappIcon from "../../../../../public/images/icons/whatsapp.png";
import linkedinIcon from "../../../../../public/images/icons/linkedin.png";
import gmailIcon from "../../../../../public/images/icons/gmail.png";

const LiquidGlass = dynamic(() => import("liquid-glass-react"), {
  ssr: false,
});

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const socialItems = [
    {
      imageSrc: whatsappIcon,
      label: "WhatsApp",
      href: "https://wa.me/your-number",
    },
    {
      imageSrc: linkedinIcon,
      label: "LinkedIn",
      href: "https://linkedin.com/in/your-profile",
    },
    {
      imageSrc: gmailIcon,
      label: "Gmail",
      href: "mailto:your-email@gmail.com",
    },
  ];
  return (
    <Section className="w-full max-w-full relative flex flex-col justify-start items-center gap-[120px] pt-[150px]">
      <Image
        src="/images/hero-bg.avif"
        alt="Hero"
        fill
        className="object-cover absolute top-0 left-0 w-full h-full"
      />

      <div
        ref={containerRef}
        className="relative w-full h-full flex flex-col justify-center items-center gap-[32px] mx-auto px-6 z-10"
      >
        <div className="relative w-full flex justify-center items-center">
          <LiquidGlass
            mouseContainer={containerRef}
            elasticity={0.3}
            padding="16px 24px"
            style={{ position: "absolute", top: "50%", left: "50%" }}
          >
            <p className="text-white text-[15px] font-medium">
              Premium Product Engineering No Templates. No Shortcuts.{" "}
            </p>
          </LiquidGlass>
        </div>

        {/* Gradient Title */}
        <h1
          className="text-4xl md:text-[60px] tracking-tight leading-[94px] mt-6 text-center max-w-[1200px]"
          style={{
            fontFamily: "var(--font-boldonse)",
          }}
        >
          Build Products That Perform, Scale, and Stand Out.
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-0 text-center max-w-[900px]">
          I’m 𝗜𝗺𝗿𝗮𝗻 𝗦𝗮𝗳𝗱𝗮𝗿, a MERN Stack & React Native developer helping 𝗦𝗮𝗮𝗦
          𝗳𝗼𝘂𝗻𝗱𝗲𝗿𝘀, 𝗮𝗴𝗲𝗻𝗰𝗶𝗲𝘀, 𝗮𝗻𝗱 𝘀𝘁𝗮𝗿𝘁𝘂𝗽𝘀 turn complex ideas into fast,
          reliable, growth-ready digital products.
        </p>

        {/* CTA Section (A/B Optimized) */}
        <div className="flex flex-col justify-center items-center gap-[21px] sm:flex-row">
          {/* Primary CTA */}
          <AnimatedButton onClick={() => {}}>Book 1:1 Meeting</AnimatedButton>
          <h6 className="text-gray-300 text-[22px] font-semibold">or DM</h6>
          <SocialDock items={socialItems} />
        </div>
      </div>
      <FeaturedWork />
    </Section>
  );
}
