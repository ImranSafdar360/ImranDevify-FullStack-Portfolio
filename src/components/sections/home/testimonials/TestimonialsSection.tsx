"use client";

import { useRef } from "react";
import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";
import { Quote } from "lucide-react";
import Image from "next/image";
import DynamicCard from "@/components/shared/DynamicCard";

import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { ArrowButton } from "@/components/ui/FloatingButton";
import SectionSeparator from "@/components/shared/SectionSeparator";

export function TestimonialsSection() {
  const swiperRef = useRef<SwiperType | null>(null);

  const reviews = [
    {
      name: "Muhammad Arif",
      image: "/images/reviews/ar-logo.webp",
      company: "@argraphics.shop",
      text: "As the owner of AR Graphics, I, Muhammad Arif, highly recommend Imran Safar for building our amazing website, www.argraphics.shop. He is highly professional, fast, and delivered exactly what our business needed!",
    },
    {
      name: "Abdullah Tabassum",
      image: "/images/reviews/abdullah-picture.webp",
      company: "Designer & Creator",
      text: "Imran transformed my ideas into a polished, well-functioning website with zero complications. His support didn’t stop after launch — he’s responsive, patient, and truly works like a reliable teammate.",
    },
  ];

  return (
    <Section
      id="testimonials"
      className="max-w-[1280px] mx-auto relative flex flex-col pt-20 pb-24 overflow-hidden"
    >
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-8 z-20">
        <div className="max-w-[700px]">
          <SectionHeader
            className="items-start text-left gap-4"
            title="Transformative "
            description="Our clients' success stories speak volumes about our dedication and expertise."
            badgeText="Testimonial"
            gradientText="Client Experiences"
            isAbout
          />
        </div>

        {/* Custom Navigation Buttons based on ProjectNavigation style */}
        <div className="flex gap-4">
          <ArrowButton
            onClick={() => swiperRef.current?.slidePrev()}
            direction="left"
            label={`Prev Review`}
          />
          <ArrowButton
            onClick={() => swiperRef.current?.slideNext()}
            direction="right"
            label={`Next Review`}
          />
        </div>
      </div>

      {/* Main Slider Container */}
      <div className="w-full relative z-20">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 2,
            },
          }}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          className="w-full !px-2 !py-4"
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index} className="h-full">
              <DynamicCard className="w-full max-w-full min-h-[500px] flex flex-col justify-between p-8 bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 rounded-3xl transition-all duration-300 relative">
                {/* Top Section */}
                <div className="flex flex-col gap-6">
                  <Quote
                    size={50}
                    fill="currentColor"
                    className="text-white/20"
                  />
                  <p className="text-[20px] leading-[1.6] text-white/90 font-medium">
                    {review.text}
                  </p>
                </div>

                <div className="w-full max-w-[50%] my-5">
                  <SectionSeparator
                    orientation="horizontal"
                    color="FFFFFF"
                    centerOpacity={0.1}
                  />
                </div>

                {/* Bottom Profile Section */}
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 flex-shrink-0 overflow-hidden rounded-full border border-white/20">
                    <Image
                      src={review.image}
                      alt={review.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h6 className="text-[16px] font-semibold text-white">
                      {review.name}
                    </h6>
                    <p className="text-[14px] font-normal text-white/50">
                      {review.company}
                    </p>
                  </div>
                </div>
              </DynamicCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </Section>
  );
}
