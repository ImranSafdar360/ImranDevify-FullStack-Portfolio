"use client";

import React, { useRef } from "react";
import Section from "../common/Section";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedButton from "../Button";
import Image from "next/image";
import ProfilePic from "../../../public/images/profile-pic.png";
import Link from "next/link";
import GradientText from "./gradient-text";
import { AnimatedTooltip } from "./animated-tooltip";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
} from "react-icons/si";
import { FaLinkedinIn, FaGithub, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { LogoMarquee } from "./logo-marquee";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const SocialLinks = [
  {
    icon: <FaLinkedinIn className="w-[20px] h-[20px]" />,
    href: "/",
  },
  {
    icon: <FaGithub className="w-[20px] h-[20px]" />,
    href: "/",
  },
  {
    icon: <FaEnvelope className="w-[20px] h-[20px]" />,
    href: "/",
  },
  {
    icon: <FaPhoneAlt className="w-[20px] h-[20px]" />,
    href: "/",
  },
];

const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "Robert Johnson",
    designation: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Jane Smith",
    designation: "Data Scientist",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "UX Designer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
];

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  {
    node: <SiTypescript />,
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  {
    node: <SiTailwindcss />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
];

export default function AboutMini() {
  return (
    <Section className="relative py-[120px] flex flex-col items-center gap-[64px]">
      <div className="w-full h-auto flex items-center justify-between">
        <div className="flex flex-col gap-[24px] w-full max-w-[300px] self-start">
          <p className="text-[28px] leading-[32px] font-light text-white">
            Hey there. I'm
          </p>
          <h1
            className="text-[78px] leading-[96px] font-semibold text-white"
            style={{ fontFamily: "var(--font-boldonse)" }}
          >
            Imran <GradientText>Safdar</GradientText>
          </h1>
          <p className="text-[18px] leading-[32px] font-light text-white/70">
            I'm a Full Stack Developer with over 5 years of experience in the
            field.
          </p>
          <AnimatedButton onClick={() => {}}>See my Journey</AnimatedButton>
        </div>
        <div
          className="relative flex flex-col gap-[20px] p-[24px] rounded-[20px]"
          style={{
            background: "rgba(255, 255, 255, 0.04)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <Image
            src={ProfilePic}
            alt="About Mini"
            width={430}
            height={500}
            className="object-cover rounded-[24px] z-10"
          />
          <div className="absolute top-10 right-10 flex flex-col items-end gap-[12px] z-20">
            {SocialLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="w-[48px] h-[48px] rounded-full bg-white/7 flex items-center justify-center border border-white transition-all duration-300 ease-in-out hover:scale-110"
              >
                {link.icon}
              </Link>
            ))}
          </div>
          <div className="w-full flex justify-center items-center gap-[8px]">
            <div className="w-[8px] h-[8px] rounded-full bg-[#0080FF]" />{" "}
            <p className="text-[16px] leading-[24px] font-light text-white/70">
              Available for new project
            </p>
          </div>
        </div>
        <div className="w-full max-w-[300px] flex flex-col justify-end gap-[40px] self-end">
          <div className="flex flex-col items-end gap-[24px]">
            <p className="pl-[12px] border-l-2 border-white/70 text-[20px] leading-[24px] font-light text-white">
              Firm of the Year 2025 Font-end Developer
            </p>
            <h1
              className="text-[48px] leading-[56px] font-semibold text-white"
              style={{ fontFamily: "var(--font-boldonse)" }}
            >
              Digital <GradientText>Engineer</GradientText>
            </h1>
          </div>
          <div className="flex flex-col gap-[24px]">
            <div className="flex flex-row items-start w-full">
              <AnimatedTooltip items={people} />
            </div>
            <div>
              {" "}
              <p className="text-[18px] leading-[22px] font-light text-white/70">
                <span className="text-[30px] text-white font-semibold mr-2">
                  5K
                </span>{" "}
                Clients Word-Wide
              </p>
              <p className="text-[20px] leading-[24px] font-light text-white">
                Loved by founders globally
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-[32px] w-full">
        <h6 className="text-[20px] leading-[24px] font-light text-white">
          Expertise in 20+ elite technologies
        </h6>
        <div className="w-full h-auto relative overflow-hidden">
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[80px] lg:w-[150px] h-full bg-gradient-to-r from-[#06090D] to-transparent z-10 pointer-events-none" />
          <div className="absolute top-1/2 -translate-y-1/2  right-0 w-[80px] lg:w-[150px] h-full bg-gradient-to-l from-[#06090D] to-transparent z-10 pointer-events-none" />
          <LogoMarquee />
        </div>
      </div>
    </Section>
  );
}
