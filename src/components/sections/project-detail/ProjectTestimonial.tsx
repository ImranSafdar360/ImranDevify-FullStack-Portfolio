"use client";

import React from "react";
import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";
import { Star } from "lucide-react";
import Link from "next/link";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import Image from "next/image";
import SectionSeparator from "@/components/shared/SectionSeparator";
import DynamicCard from "@/components/shared/DynamicCard";
import { Project } from "@/data/projectData";

interface ProjectTestimonialProps {
  project: Project;
}

const ProjectTestimonial = ({ project }: ProjectTestimonialProps) => {
  const { testimonial } = project;

  if (!testimonial) return null;

  return (
    <Section className="py-20 flex flex-col items-center gap-[44px] mb-16">
      <SectionHeader
        className="max-w-full md:max-w-[70%] lg:max-w-[55%] items-center gap-[16px] z-20"
        title="Client "
        description="Thought about the project outcome"
        badgeText="Review"
        gradientText="Feedback"
      />

      <div className="w-full max-w-[850px] z-20 mt-[24px]">
        <DynamicCard className="w-full max-w-fit flex flex-col gap-10">
          <div className="w-full flex justify-between">
            <div className="relative w-[60px] h-[60px] overflow-hidden rounded-full border border-white/10">
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                fill
                className="object-cover rounded-full"
              />
            </div>
            <div className="flex items-center gap-[10px]">
              {testimonial.socialLink && (
                <Link
                  href={testimonial.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {testimonial.socialPlatform === "Twitter" ? (
                    <BsTwitterX size={24} color="#FFFFFF" />
                  ) : testimonial.socialPlatform === "LinkedIn" ? (
                    <FaLinkedin size={24} color="#FFFFFF" />
                  ) : testimonial.socialPlatform === "Instagram" ? (
                    <FaInstagram size={24} color="#FFFFFF" />
                  ) : null}
                </Link>
              )}
            </div>
          </div>

          <div className="flex gap-1 justify-start">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star
                key={i}
                size={24}
                fill="#FFFFFF"
                style={{ color: "#FFFFFF" }}
              />
            ))}
          </div>

          <p className="text-2xl md:text-3xl leading-[1.4] font-light text-white font-sora italic">
            &ldquo;{testimonial.text}&rdquo;
          </p>

          <div className="w-full max-w-[50%]">
            <SectionSeparator
              orientation="horizontal"
              color="FFFFFF"
              centerOpacity={0.25}
              className="my-[12px]"
            />
          </div>

          <div className="flex flex-col items-start gap-1">
            <h6 className="text-xl font-bold text-white font-sora">
              {testimonial.name}
            </h6>
            <p className="text-xs text-white/40 uppercase tracking-[0.2em] font-bold">
              {testimonial.role}, {testimonial.company}
            </p>
          </div>
        </DynamicCard>
      </div>
    </Section>
  );
};

export default ProjectTestimonial;
