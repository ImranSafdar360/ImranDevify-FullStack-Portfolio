"use client";

import React from "react";
import AnimatedButton from "@/components/shared/AnimatedButton";
import SocialDock from "@/components/ui/social-dock";
import whatsappIcon from "../../../../../public/images/icons/whatsapp.png";
import linkedinIcon from "../../../../../public/images/icons/linkedin.png";
import gmailIcon from "../../../../../public/images/icons/gmail.png";
import Section from "@/components/shared/Section";
import SectionBadge from "@/components/shared/SectionBadge";
import GradientText from "@/components/ui/gradient-text";
import Image from "next/image";

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

export default function CTASection() {
  return (
    <Section className="max-w-[1080px] mx-auto relative flex flex-col justify-center items-center gap-[84px] mt-32">
      <div className="relative w-full rounded-[40px] md:rounded-[24px] overflow-hidden bg-[#0A0A0A] border border-white/5 py-20 px-6 md:px-20 text-center">
        <Image
          src="/images/CTA-background.avif"
          alt="CTA Background"
          fill
          className="absolute left-0 -bottom-0 z-10 w-full h-full object-cover"
        />
        <div className="relative z-30 flex flex-col items-center gap-[16px]">
          <SectionBadge text="If You Scrolled This Far" className="mb-[16px]" />

          {/* Main Heading */}
          <h2
            className="text-4xl md:text-[48px] lg:text-[64px] tracking-normal leading-normal text-white max-w-4xl"
            style={{ fontFamily: "var(--font-boldonse)" }}
          >
            You&apos;re serious. <br />{" "}
            <GradientText>Let&apos;s talk.</GradientText>
          </h2>

          <p className="max-w-xl text-md md:text-xl text-white/70 leading-relaxed">
            Your website. Built to reflect how good you really are.{" "}
            <br className="hidden md:block" />
            One that makes you stand out effortlessly.
          </p>

          {/* Action Area */}
          <div className="flex flex-col items-center gap-3 md:gap-6 mt-[16px]">
            <div className="flex flex-col justify-center items-center gap-3 md:gap-[21px] md:flex-row">
              {/* Primary CTA */}
              <AnimatedButton onClick={() => {}}>
                Book 1:1 Meeting
              </AnimatedButton>
              <h6 className="text-white text-[22px] font-semibold">or DM</h6>
              <SocialDock items={socialItems} />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
