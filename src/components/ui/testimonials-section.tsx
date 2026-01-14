"use client";

import React from "react";
import GradientText from "./gradient-text";
import AnimatedButton from "../Button";
import { AnimatedTestimonials } from "./animated-testimonials";

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Imran doesn't just code — he thinks like a product partner. He understood our vision quickly, improved our architecture, and delivered clean, scalable features without friction. Working with him felt effortless.",
    name: "SaaS Platform Founder",
    designation: "Founder, SaaS Platform",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80&fit=crop",
  },
  {
    quote:
      "What stood out most was reliability. Clear updates, solid technical decisions, and zero hand-holding required. Imran blended into our workflow like an in-house engineer.",
    name: "Digital Agency PM",
    designation: "Project Manager, Digital Agency",
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&q=80&fit=crop",
  },
  {
    quote:
      "We needed to move fast without breaking things. Imran helped us launch a stable MVP that we're now scaling with confidence. Performance, structure, and communication were all on point.",
    name: "Startup Founder",
    designation: "Startup Founder",
    src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&q=80&fit=crop",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="w-full py-20 md:py-32" style={{ background: "#06090D" }}>
      <div className="w-full max-w-[1440px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl mb-6 text-white"
            style={{
              fontFamily: "var(--font-boldonse)",
              fontWeight: 400,
              fontStyle: "normal",
            }}
          >
            Feedback That <GradientText>Inspires</GradientText>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Insightful stories from clients who trusted my expertise.
          </p>
        </div>

        {/* Animated Testimonials Component */}
        <div className="mb-16 md:mb-20 dark">
          <div className="max-w-6xl mx-auto">
            <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
          </div>
        </div>

        {/* Optional Micro Testimonial Card */}
        <div className="max-w-2xl mx-auto mb-16">
          <div
            className="rounded-[12px] p-6 md:p-8 text-center"
            style={{
              background: "rgba(255, 255, 255, 0.06)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
            }}
          >
            <p className="text-xl md:text-2xl text-white font-medium italic">
              &quot;Clean code. Clear communication. No stress.&quot;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
