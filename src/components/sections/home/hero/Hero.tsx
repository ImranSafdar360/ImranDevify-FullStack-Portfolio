"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import AnimatedButton from "@/components/shared/AnimatedButton";
import { PopupModal } from "react-calendly";
import SocialDock from "@/components/ui/social-dock";
import Section from "@/components/shared/Section";
import FeaturedWork from "../featured-work/FeaturedWork";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

import whatsappIcon from "../../../../../public/images/icons/whatsapp.png";
import linkedinIcon from "../../../../../public/images/icons/linkedin.png";
import gmailIcon from "../../../../../public/images/icons/gmail.png";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);
  const [rootElement, setRootElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setRootElement(document.body);
  }, []);

  useGSAP(() => {
    // Start animation exactly after the preloader closes (1.5s delay + 0.6s fade out = 2.1s)
    const tl = gsap.timeline({ delay: 1.5 });

    tl.from(badgeRef.current, {
      opacity: 0,
      y: 30,
      duration: 1,
      ease: "power3.out",
    })
      .from(
        titleRef.current,
        { opacity: 0, y: 40, duration: 1, ease: "power3.out" },
        "-=0.85",
      )
      .from(
        subtitleRef.current,
        { opacity: 0, y: 30, duration: 1, ease: "power3.out" },
        "-=0.85",
      )
      .from(
        ctaRef.current,
        { opacity: 0, y: 30, duration: 1, ease: "power3.out" },
        "-=0.85",
      );
  });

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
    <Section className="max-w-full relative flex flex-col justify-start items-center pt-[130px] gap-[110px] md:gap-[120px] md:pt-[150px] px-0 md:px-0 lg:px-0 xl:px-0">
      <div className="absolute left-0 top-[-250px] md:top-[-250px] lg:top-[-150px] z-10 w-full h-full">
        <Image
          src="/images/hero-bg.webp"
          alt="Hero Background Effect"
          fill
          className="object-cover w-full h-full"
          priority
        />
      </div>

      <div
        ref={containerRef}
        className="relative w-full h-full flex flex-col justify-center items-center gap-[16px] lg:gap-[24px] xl:gap-[32px] mx-auto xl:px-6 z-20"
      >
        <div
          ref={badgeRef}
          className="relative w-full flex justify-center items-center"
        >
          <div className="px-4 py-2 md:px-8 md:py-3 rounded-full border border-white/30 bg-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:border-white/20 group">
            <span className="text-[12px] md:text-sm lg:text-base font-semibold tracking-wide text-white text-center whitespace-nowrap">
              30+ Projects Delivered | Scalable SaaS
            </span>
          </div>
        </div>

        {/* Gradient Title */}
        <h1
          ref={titleRef}
          className="text-[24px] md:text-[30px] lg:text-4xl xl:text-[60px] tracking-tight leading-relaxed font-sora xl:leading-[94px] text-center max-w-[90%] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[1000px]"
          style={{
            fontFamily: "var(--font-boldonse)",
          }}
        >
          Building Scalable Products That Actually Perform
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-[15px] md:text-[14px] lg:text-lg xl:text-xl text-white/70 leading-relaxed mb-0 text-center max-w-[90%] md:max-w-[500px] lg:max-w-[650px] xl:max-w-[800px] font-medium"
        >
          For SaaS founders and agencies who care about performance, clean
          architecture, and long-term scalability.
        </p>

        {/* CTA Section (A/B Optimized) */}
        <div
          ref={ctaRef}
          className="flex flex-col md:flex-row justify-center items-center gap-[16px] xl:gap-[21px]"
        >
          {/* Primary CTA */}
          <AnimatedButton onClick={() => setIsCalendlyOpen(true)}>
            Book a Strategy Call
          </AnimatedButton>
          <PopupModal
            url="https://calendly.com/imran-safdar360/30min"
            onModalClose={() => setIsCalendlyOpen(false)}
            open={isCalendlyOpen}
            rootElement={rootElement!}
          />
          <h6 className="text-gray-300 xl:text-[22px] font-semibold hidden md:block">
            or DM
          </h6>
          <SocialDock items={socialItems} />
        </div>
      </div>

      <FeaturedWork />
    </Section>
  );
}
