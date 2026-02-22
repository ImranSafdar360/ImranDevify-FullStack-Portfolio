"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface ProjectGalleryProps {
  images: string[];
}

const ProjectGallery = ({ images }: ProjectGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  // Handle keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex, images]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedIndex]);

  if (!images || images.length === 0) return null;

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % images.length);
    }
  };

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + images.length) % images.length);
    }
  };

  const getGridClasses = (index: number, total: number) => {
    if (total === 1) return "col-span-12 md:col-span-12 h-[350px] md:h-[700px]";
    if (index === 0) return "col-span-12 md:col-span-12 h-[350px] md:h-[700px]";

    // For 2 images, stack them but make them slighty less tall than the hero one
    if (total === 2) return "col-span-12 md:col-span-12 h-[350px] md:h-[650px]";

    // For 3 or more: First full width, others 50% on desktop, but maybe the 4th is full width again?
    // Let's create a masonry-like pattern
    if ((index - 1) % 3 === 2) {
      // 0, [1, 2], [3] (Wait, 3rd is index 3) => index 3 is full width.
      // Pattern: 1 full (0), 2 half (1,2), 1 full (3), 2 half (4,5)
      return "col-span-12 md:col-span-12 h-[350px] md:h-[650px]";
    }

    return "col-span-12 md:col-span-6 h-[300px] md:h-[500px]";
  };

  return (
    <div className="w-full relative py-8 md:py-16">
      {/* Background Glow */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-[#0080FF]/10 blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Dynamic Masonry/Bento Grid */}
      <div className="grid grid-cols-12 gap-5 md:gap-8 w-full max-w-7xl mx-auto px-4 md:px-0 relative z-10">
        {images.map((img, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.7,
              delay: index * 0.1,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className={`relative group cursor-pointer overflow-hidden rounded-2xl md:rounded-[32px] border border-white/5 bg-[#080808] ${getGridClasses(
              index,
              images.length,
            )} shadow-xl`}
            onClick={() => setSelectedIndex(index)}
          >
            <Image
              src={img}
              alt={`Project Visual ${index + 1}`}
              fill
              className="object-cover object-top transition-all duration-[800ms] group-hover:scale-[1.03] opacity-80 group-hover:opacity-100"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
              quality={90}
            />
            {/* Overlay Gradient on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 md:p-10">
              <div className="flex items-center justify-between transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <span className="text-white font-medium text-lg md:text-xl font-sora">
                  View Full Scale
                </span>
                <div className="bg-white/10 backdrop-blur-md text-white p-3 md:p-4 rounded-full border border-white/20 hover:bg-white/20 transition-colors">
                  <ZoomIn className="w-5 h-5 md:w-6 md:h-6 text-[#0080FF]" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]/98 backdrop-blur-2xl"
          >
            {/* Top Bar Navigation */}
            <div className="absolute top-0 left-0 w-full p-6 md:p-8 flex justify-between items-center z-[110]">
              <div className="text-white/60 font-medium text-sm md:text-base font-sora tracking-widest uppercase">
                {selectedIndex + 1} / {images.length}
              </div>
              <button
                onClick={() => setSelectedIndex(null)}
                className="p-3 md:p-4 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all duration-300 border border-white/10 hover:rotate-90"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-2 md:left-8 z-[110] p-3 md:p-5 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all duration-300 border border-white/5 hover:border-white/20 hover:scale-110 active:scale-95 group hidden sm:flex"
                  aria-label="Previous Image"
                >
                  <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 group-hover:-translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-2 md:right-8 z-[110] p-3 md:p-5 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all duration-300 border border-white/5 hover:border-white/20 hover:scale-110 active:scale-95 group hidden sm:flex"
                  aria-label="Next Image"
                >
                  <ChevronRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-1 transition-transform" />
                </button>
              </>
            )}

            <div
              className="relative w-full h-[100dvh] flex items-center justify-center p-4 md:p-12 lg:p-20"
              onClick={() => setSelectedIndex(null)}
            >
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="relative w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()} // Prevent click from closing when clicking image itself
              >
                <Image
                  src={images[selectedIndex]}
                  alt={`Project Fullscreen ${selectedIndex + 1}`}
                  fill
                  className="object-contain"
                  quality={100}
                  priority
                />
              </motion.div>
            </div>

            {/* Pagination Indicators Container */}
            {images.length > 1 && (
              <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-3 z-[110] bg-black/50 backdrop-blur-md p-3 md:p-4 rounded-full border border-white/10">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedIndex(idx);
                    }}
                    className={`h-1.5 md:h-2 rounded-full transition-all duration-500 ${
                      idx === selectedIndex
                        ? "w-8 md:w-16 bg-[#0080FF] shadow-[0_0_15px_rgba(0,128,255,0.6)]"
                        : "w-2 bg-white/30 hover:bg-white/60"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectGallery;
