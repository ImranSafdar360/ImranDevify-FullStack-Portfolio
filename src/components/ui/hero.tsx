"use client";

import GradientText from "./gradient-text";
import dynamic from "next/dynamic";
import { useRef } from "react";
import AnimatedButton from "../Button";
import SocialDock from "./social-dock";
import CircularText from "../CircularText";
import { Mail } from "lucide-react";
import Section from "../common/Section";

const LiquidGlass = dynamic(() => import("liquid-glass-react"), {
  ssr: false,
});

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  // const values = [
  //   {
  //     icon: "🛠️",
  //     title: "Clean Architecture",
  //     description: "systems built to grow, not break",
  //   },
  //   {
  //     icon: "⚡",
  //     title: "Serious Performance",
  //     description: "fast, stable, optimized experiences",
  //   },
  //   {
  //     icon: "🎯",
  //     title: "Technical Precision",
  //     description: "engineered for long-term success",
  //   },
  // ];

  // Social Media Icons with brand colors
  const WhatsAppIcon = () => (
    <svg
      className="w-[34px] h-[34px]"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );

  const socialItems = [
    {
      icon: <WhatsAppIcon />,
      label: "WhatsApp",
      href: "https://wa.me/your-number",
      gradientFrom: "#25D366",
      gradientTo: "#128C7E",
    },
    {
      imageSrc: "/images/icons/linkedin.png",
      label: "LinkedIn",
      href: "https://linkedin.com/in/your-profile",
      gradientFrom: "#0077B5",
      gradientTo: "#005885",
    },
    {
      imageSrc: "/images/icons/gmail.png",
      label: "Gmail",
      href: "mailto:your-email@gmail.com",
      gradientFrom: "#ffffff",
      gradientTo: "#ffffff",
    },
  ];
  return (
    <Section className="w-full relative flex flex-col justify-center items-center gap-[120px] my-[60px]">
      {/* Gradient Circles with Blur Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Left Circle */}
        <div
          className="absolute top-0 left-0 w-[350px] h-[350px] rounded-full opacity-20 blur-[120px]"
          style={{
            background: "linear-gradient(135deg, #00C7FE 0%, #0080FF 100%)",
            transform: "translate(-20%, -20%)",
          }}
        />
        {/* Bottom Right Circle */}
        <div
          className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full opacity-20 blur-[120px]"
          style={{
            background: "linear-gradient(135deg, #0080FF 0%, #00C7FE 100%)",
            transform: "translate(20%, 20%)",
          }}
        />
      </div>

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
          className="text-4xl md:text-[64px] tracking-tight leading-[94px] mt-6 text-center max-w-[1200px]"
          style={{
            fontFamily: "var(--font-boldonse)",
            fontWeight: 400,
            fontStyle: "normal",
          }}
        >
          <GradientText>Build Products</GradientText> That Perform, Scale, and
          Stand Out.
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
          <AnimatedButton onClick={() => { }}>Book 1:1 Meeting</AnimatedButton>
          <h6 className="text-gray-300 text-[22px] font-semibold">or DM</h6>
          <SocialDock items={socialItems} />
        </div>
      </div>
      <div className="w-full flex justify-between items-center">
        <h6 className="text-gray-300 text-[16px] font-medium max-w-[350px]">
          <span className="text-white">• &nbsp;</span> Focused on clean
          architecture
          <br />
          <span className="text-white">• &nbsp;</span> Performance engineering
          <br />
          <span className="text-white">• &nbsp;</span> User-centric design
        </h6>
        <CircularText
          text="TELL*ME*ABOUT*YOUR*PROJECT*"
          onHover="slowDown"
          spinDuration={10}
          href="/contact"
          icon={<Mail className="w-8 h-8 text-[#1F1F1F]" />}
        />
      </div>
    </Section>
  );
}
