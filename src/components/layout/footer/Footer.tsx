"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaLinkedinIn, FaGithub, FaTwitter } from "react-icons/fa";
import CTASection from "@/components/sections/home/cta/CTASection";
import SectionSeparator from "@/components/shared/SectionSeparator";
import Image from "next/image";
import Section from "@/components/shared/Section";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();
  const showCTA = pathname !== "/contact";

  const linksStack: {
    title: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    links: { title: string; href: string; icon: any }[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    socialLinks?: { icon: any; href: string }[];
  }[] = [
    {
      title: "Navigation",
      links: [
        { title: "About", href: "#about", icon: null },
        { title: "Featured", href: "#featured", icon: null },
        { title: "Portfolio", href: "/portfolio", icon: null },
        { title: "Testimonials", href: "#testimonials", icon: null },
        { title: "Contact", href: "/contact", icon: null },
      ],
      socialLinks: [
        {
          icon: FaGithub,
          href: "https://github.com/ImranSafdar360/",
        },
        {
          icon: FaLinkedinIn,
          href: "https://www.linkedin.com/in/imran-safdar/",
        },
        {
          icon: FaTwitter,
          href: "https://x.com/Imransafdar777/",
        },
      ],
    },
  ];

  return (
    <footer className="w-full relative flex flex-col gap-[84px] overflow-hidden">
      {showCTA && <CTASection />}
      <Section className="flex flex-col gap-[64px] z-20">
        <div className="flex flex-col justify-center md:flex-row md:justify-between mb-16 xl:mb-24 gap-10 lg:gap-0 z-20">
          {/* Column 1: Brand & Description */}
          <div className="flex flex-col items-center md:items-start gap-8 md:gap-[85px]">
            <div className="max-w-[415px] flex flex-col items-center md:items-start gap-6 lg:gap-[36px]">
              <Image
                src="/images/Imran-Forge.png"
                alt="Logo"
                width={150}
                height={150}
              />
              <p className="text-[16px] font-medium leading-[24px] text-white text-center md:text-start">
                Imran Safdar — Full-Stack Product Engineer building scalable
                SaaS platforms and high-performance mobile applications. Focused
                on clean architecture, performance, and long-term growth.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-5 md:gap-[120px]">
            {linksStack.map((linkGroup, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 items-center md:items-start md:gap-[8px]"
              >
                <h4 className="text-[16px] leading-[24px] font-sora font-bold text-[#0080FF]">
                  {linkGroup.title}
                </h4>
                <ul className="flex justify-center md:justify-start max-w-[70%] md:max-w-[100%] items-center gap-[8px] flex-wrap">
                  {linkGroup.links.map((link, idx) => (
                    <li key={idx} className="flex items-center gap-[12px]">
                      {idx == 0 ? null : (
                        <span className="w-[5px] h-[5px] bg-white rounded-full flex items-center justify-center" />
                      )}
                      <Link
                        href={link.href}
                        className="text-[14px] leading-[20px] font-medium text-white hover:text-[#0080FF] transition-colors duration-300"
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
                {linkGroup.socialLinks && (
                  <div className="flex gap-4 mt-[16px]">
                    {linkGroup.socialLinks.map((social, idx) => (
                      <Link
                        key={idx}
                        href={social.href}
                        target="_blank"
                        className="w-10 h-10 flex items-center justify-center rounded-[8px] border border-[#FFFFFF]/30 bg-[#FFFFFF]/5 hover:bg-[#0080FF] group transition-all duration-300"
                      >
                        <social.icon
                          size={20}
                          className="text-[#FFFFFF] group-hover:text-white transition-colors"
                        />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="relative flex md:flex-row flex-col justify-between items-center md:py-10 py-6">
          <div className="absolute left-0 right-0 top-[-155px] md:top-[-100px] lg:top-[-170px] z-10 opacity-5 overflow-visible xl:overflow-hidden">
            <h1 className="text-white text-[64px] md:text-[84px] lg:text-[192px] font-sora text-center lg:leading-[192px] leading-[52px] font-extrabold translate-y-[50px] xl:translate-y-[0px]">
              Imran Safdar
            </h1>
          </div>
          <SectionSeparator
            orientation="horizontal"
            color="FFFFFF"
            centerOpacity={0.25}
            className="absolute top-0 left-0 w-full h-full"
          />
          <h3 className="text-white text-[14px] font-semibold font-sora">
            Copyright © {currentYear} Imran Safdar. All rights reserved.
          </h3>
          <div className="flex justify-center items-center gap-[16px]">
            <Link
              href="/privacy"
              className="text-white text-[14px] font-semibold font-sora hover:text-[#0080FF] transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <span className="w-[5px] h-[5px] bg-white rounded-full flex items-center justify-center" />
            <Link
              href="/terms"
              className="text-white text-[14px] font-semibold font-sora hover:text-[#0080FF] transition-colors duration-300"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </Section>
    </footer>
  );
}
