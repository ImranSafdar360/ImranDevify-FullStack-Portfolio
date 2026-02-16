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
// import GradientText from "@/components/ui/gradient-text";

const LiquidGlass = dynamic(() => import("liquid-glass-react"), {
  ssr: false,
});

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Social media links with demo messages
  const phoneNumber = "923494898190";
  const email = "imransafdar360@gmail.com";
  const linkedinProfile = "imran-safdar/";

  const demoMessage = encodeURIComponent(
    "Hi! I'm interested in discussing a project with you. Let's connect!",
  );
  const emailSubject = encodeURIComponent("Project Inquiry - Let's Connect");
  const emailBody = encodeURIComponent(
    "Hi Imran,\n\nI came across your portfolio and I'm interested in discussing a potential project with you.\n\nLooking forward to hearing from you!\n\nBest regards",
  );

  const socialItems = [
    {
      imageSrc: whatsappIcon,
      label: "WhatsApp",
      href: `https://wa.me/${phoneNumber}?text=${demoMessage}`,
    },
    {
      imageSrc: linkedinIcon,
      label: "LinkedIn",
      href: `https://www.linkedin.com/in/${linkedinProfile}`,
    },
    {
      imageSrc: gmailIcon,
      label: "Gmail",
      href: `mailto:${email}?subject=${emailSubject}&body=${emailBody}`,
    },
  ];
  return (
    <Section className="max-w-full relative flex flex-col justify-start items-center gap-[120px] pt-[150px]">
      <Image
        src="/images/hero-bg.webp"
        alt="Hero Background Effect"
        fill
        className="object-cover absolute top-0 left-0 w-full h-full"
        loading="lazy"
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
          I Build Conversion Focused Products That Perform and Scale.{" "}
          {/* <span className="bg-white px-2 py-1 rounded-2xl inline-block">
            <GradientText>Stand Out.</GradientText>
          </span> */}
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-0 text-center max-w-[900px] font-medium">
          I’m <span className="text-white font-semibold">Imran Safdar</span>, a
          MERN Stack & React Native developer helping {""}
          <span className="text-white font-semibold">
            SaaS founders, agencies and startups
          </span>{" "}
          turn complex ideas into fast, reliable, growth-ready digital products.
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
