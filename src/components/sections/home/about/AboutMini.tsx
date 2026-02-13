"use client";

import React from "react";
import Section from "@/components/shared/Section";
import ProfilePic from "../../../../../public/images/profile-pic.avif";
import ImageCard from "@/components/shared/ImageCard";
import AnimatedButton from "@/components/shared/AnimatedButton";
import GradientText from "@/components/ui/gradient-text";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import SectionSeparator from "@/components/shared/SectionSeparator";
import { useRouter } from "next/navigation";
import SectionHeader from "@/components/shared/SectionHeader";

export default function AboutSection() {
  const router = useRouter();

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

  const handleAboutClick = () => {
    router.push("/about");
  };

  return (
    <Section className="relative flex justify-center items-center gap-[84px]">
      <ImageCard image={ProfilePic} alt="Profile Picture" />
      <div className="flex flex-col justify-center gap-[30px] w-full max-w-[50%]">
          <SectionHeader 
          title="Building Stronger Brands" 
          description="Delivering high-quality, on-demand designs with precision.
          Elevate your brand effortlessly, one snap at a time." 
          badgeText="About Imran" 
          gradientText="Creating Impressions!"
          isAbout={true}
          />
          <div className="w-full max-w-[230px]">
          <SectionSeparator 
              orientation="horizontal" 
              color="FFFFFF" 
              centerOpacity={0.25}
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <h2 className="text-[18px] leading-[22px] font-medium text-white">Expertise in 20+ elite technologies</h2>
            <p className="text-[16px] leading-[20px] font-light text-white/70">I specialize in 20+ elite technologies, from React, Next.js, and Tailwind CSS to Node.js, MongoDB, and more. I use these technologies to build high-performance, scalable, and efficient web applications.</p>
          </div>
          
        <div className="flex flex-row items-start w-full">
          <div className="relative flex items-center gap-[24px]">
            <AnimatedButton onClick={handleAboutClick}>View about Imran</AnimatedButton>
            <SectionSeparator 
              orientation="vertical" 
              color="FFFFFF" 
              centerOpacity={0.25}
              height="50px"
              width="1px"
            />
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <div className="flex justify-center items-center">
                <AnimatedTooltip items={people} />
              </div>
              <p className="text-[16px] font-medium text-white text-center sm:text-start leading-[22px]">
                Trusted by <br className="hidden sm:block" />
                Over <GradientText>50+</GradientText> Clients
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
