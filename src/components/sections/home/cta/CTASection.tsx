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
    <Section className="relative flex flex-col justify-center items-center gap-[84px] mt-32">
        <div className="relative w-full rounded-[40px] md:rounded-[64px] overflow-hidden bg-[#0A0A0A] border border-white/5 pt-20 pb-12 px-6 md:px-20 text-center">
          {/* Grid Background */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, #1a1a1a 1px, transparent 1px), linear-gradient(to bottom, #1a1a1a 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            <SectionBadge text="If You Scrolled This Far" className="mb-10" />

            {/* Main Heading */}
            <h2
              className="text-5xl md:text-[60px] tracking-tight leading-tight text-white mb-8 max-w-4xl"
              style={{ fontFamily: "var(--font-boldonse)" }}
            >
              You&apos;re serious. <br /> <GradientText>Let&apos;s talk.</GradientText>
            </h2>

            <p className="max-w-xl text-lg md:text-xl text-gray-400 mb-12 leading-relaxed">
              Your website. Built to reflect how good you really are.{" "}
              <br className="hidden md:block" />
              One that makes you stand out effortlessly.
            </p>

            {/* Action Area */}
            <div className="flex flex-col items-center gap-6 mb-16">
              <div className="flex flex-col justify-center items-center gap-[21px] sm:flex-row">
                {/* Primary CTA */}
                <AnimatedButton onClick={() => {}}>
                  Book 1:1 Meeting
                </AnimatedButton>
                <h6 className="text-gray-300 text-[22px] font-semibold">
                  or DM
                </h6>
                <SocialDock items={socialItems} />
              </div>
            </div>
          </div>
        </div>
    </Section>
  );
}
