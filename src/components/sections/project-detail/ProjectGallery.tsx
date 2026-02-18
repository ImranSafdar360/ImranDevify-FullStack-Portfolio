"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

interface ProjectGalleryProps {
  images: string[];
}

const ProjectGallery = ({ images }: ProjectGalleryProps) => {
  if (!images || images.length === 0) return null;

  // For looping to work smoothly with small slide counts in Swiper,
  // we repeat the array to ensure there are enough slides for the loop duplication logic.
  const displayImages =
    images.length < 6 ? [...images, ...images, ...images] : images;

  return (
    <div className="relative w-full group overflow-hidden">
      <div className="!w-[95vw] md:!w-[850px] !h-[350px] md:!h-[650px] absolute top-[47%] left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden bg-[#080808] rounded-[20px] border-[1px] border-white/5  shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-all duration-700"></div>
      {/* Gradient Glow Line */}
      <div
        className="absolute top-[7%] left-1/2 -translate-x-1/2"
        style={{
          width: "40%",
          height: "1px",
          background:
            "linear-gradient(to right, rgba(0, 128, 255, 0) 0%, rgba(0, 128, 255, 1) 50%, rgba(0, 128, 255, 0) 100%)",
        }}
      />
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        threshold={5} // Improved swipe sensitivity
        coverflowEffect={{
          rotate: 0,
          stretch: -100,
          depth: 200,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={{
          clickable: true,
          el: ".gallery-pagination",
          type: "bullets",
        }}
        navigation={{
          nextEl: ".gallery-next",
          prevEl: ".gallery-prev",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        observer={true}
        observeParents={true}
        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
        className="gallery-swiper !overflow-visible"
      >
        {displayImages.map((image, index) => (
          <SwiperSlide
            key={index}
            className="!w-[90vw] md:!w-[800px] !h-[300px] md:!h-[600px] relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-all duration-700"
          >
            <Image
              src={image}
              alt={`Project Showcase ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="(max-width: 768px) 90vw, 800px"
              loading={index === 0 ? "eager" : "lazy"}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons - Positioned right next to the central image */}
      <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] md:max-w-[880px] px-4 md:px-0 z-30 flex justify-between pointer-events-none">
        <button className="gallery-prev pointer-events-auto w-10 md:w-12 h-10 md:h-12 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white transition-all duration-300 hover:bg-white/10 hover:scale-110 active:scale-95 group/btn">
          <ChevronLeft size={20} className="md:w-6 md:h-6" />
        </button>
        <button className="gallery-next pointer-events-auto w-10 md:w-12 h-10 md:h-12 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white transition-all duration-300 hover:bg-white/10 hover:scale-110 active:scale-95 group/btn">
          <ChevronRight size={20} className="md:w-6 md:h-6" />
        </button>
      </div>

      {/* Custom Pagination - Sleek indicator below */}
      <div className="gallery-pagination !bottom-8 flex justify-center gap-3 mt-16" />

      <style jsx global>{`
        .gallery-swiper .swiper-slide {
          opacity: 0.1;
          transform: scale(0.85);
          filter: blur(8px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .gallery-swiper .swiper-slide-active {
          opacity: 1 !important;
          transform: scale(1) !important;
          filter: blur(0px) !important;
        }

        .gallery-pagination .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.1);
          opacity: 1;
          width: 40px;
          height: 2px;
          border-radius: 0;
          transition: all 0.5s ease;
          margin: 0 !important;
          cursor: pointer;
        }
        .gallery-pagination .swiper-pagination-bullet-active {
          background: #fff;
          width: 60px;
        }

        @media (max-width: 768px) {
          .gallery-pagination .swiper-pagination-bullet {
            width: 20px;
          }
          .gallery-pagination .swiper-pagination-bullet-active {
            width: 30px;
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectGallery;
