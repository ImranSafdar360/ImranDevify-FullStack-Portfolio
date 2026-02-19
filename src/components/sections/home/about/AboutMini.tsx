"use client";

import React from "react";
import Section from "@/components/shared/Section";
import ProfilePic from "../../../../../public/images/profile-pic.jpg";
import ImageCard from "@/components/shared/ImageCard";
import AnimatedButton from "@/components/shared/AnimatedButton";
import GradientText from "@/components/ui/gradient-text";
import SectionSeparator from "@/components/shared/SectionSeparator";
import { useRouter } from "next/navigation";
import SectionHeader from "@/components/shared/SectionHeader";
import { useDeviceType } from "@/hooks/use-mobile";
import { Star } from "lucide-react";

export default function AboutSection() {
  const router = useRouter();
  const { isMobile, isTablet } = useDeviceType();

  const handleAboutClick = () => {
    router.push("/portfolio");
  };

  return (
    <Section
      id="about"
      className="wrelative flex flex-col-reverse lg:flex-row justify-center items-center gap-[64px] lg:gap-[84px]"
    >
      <ImageCard
        className="lg:min-h-[670px]"
        image={ProfilePic}
        alt="Profile Picture"
      />
      <div className="flex flex-col justify-center gap-[30px] w-full max-w-full md:max-w-[80%] lg:max-w-[50%]">
        <SectionHeader
          title="Imran Safdar Full-Stack"
          description="I build scalable SaaS platforms and high-performance mobile apps using MERN, Next.js, and React Native (Expo).
          Focused on clean architecture, performance, and real-world usability, I create products that are built to grow, not just launch."
          badgeText="About me"
          gradientText="Product Engineer"
          isAbout={isMobile || isTablet ? false : true}
        />
        <div className="w-full max-w-full lg:max-w-[230px]">
          <SectionSeparator
            orientation="horizontal"
            color="FFFFFF"
            centerOpacity={0.25}
          />
        </div>
        <div className="flex items-center lg:items-start flex-col gap-[10px]">
          <h2 className="text-[18px] leading-[22px] font-medium text-white">
            More Than Code, I Think in Systems
          </h2>
          <p className="text-[16px] leading-normal text-center lg:text-start font-medium text-white/70">
            Strong products aren’t built by stacking features. They’re built
            through clear system design, clean backend architecture, and
            thoughtful frontend experience.
          </p>
        </div>
        <div className="flex items-center lg:items-start flex-col gap-[10px]">
          <h2 className="text-[18px] leading-[22px] font-medium text-white">
            Built for Production, Not Just Prototypes
          </h2>
          <p className="text-[16px] leading-normal text-center lg:text-start font-medium text-white/70">
            From AI-powered apps to subscription-based SaaS platforms, I’ve led
            real-world products from idea to deployment, structured for scale
            and long-term performance.
          </p>
        </div>

        <div className="flex flex-row justify-center lg:justify-start items-start w-full">
          <div className="relative flex flex-col-reverse md:flex-row items-center gap-[24px]">
            <AnimatedButton onClick={handleAboutClick}>
              Explore My Work
            </AnimatedButton>
            <SectionSeparator
              orientation="vertical"
              color="FFFFFF"
              centerOpacity={0.25}
              height="50px"
              width="1px"
              className="hidden md:block"
            />
            <div className="flex flex-col gap-2 sm:gap-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    fill="#FFFFFF"
                    style={{ color: "#FFFFFF" }}
                  />
                ))}
              </div>
              <p className="text-[16px] font-medium text-white text-center sm:text-start leading-[22px]">
                Trusted by Over <GradientText>50+</GradientText> Clients
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
