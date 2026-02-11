"use client";

import React from "react";
import AnimatedButton from "@/components/shared/AnimatedButton";
import SocialDock from "@/components/ui/social-dock";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import whatsappIcon from "../../../../../public/images/icons/whatsapp.png";
import linkedinIcon from "../../../../../public/images/icons/linkedin.png";
import gmailIcon from "../../../../../public/images/icons/gmail.png";

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
    <section className="w-full py-20 px-6">
      <div className="max-w-[1440px] mx-auto">
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
            {/* Pre-heading Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-12">
              <span className="text-sm font-medium text-gray-300">
                If You Scrolled This Far
              </span>
            </div>

            {/* Main Heading */}
            <h2
              className="text-5xl md:text-[80px] tracking-tight leading-tight text-white mb-8 max-w-4xl"
              style={{ fontFamily: "var(--font-boldonse)" }}
            >
              You&apos;re serious. <br /> Let&apos;s talk.
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

              <div className="flex flex-col items-center gap-2 mt-4">
                <Link
                  href="/contact"
                  className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium"
                >
                  <span>Prefer a detailed form? Go to Contact Page</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <p className="text-gray-500 text-sm italic">
                  Not just happy clients. Proud ones!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
