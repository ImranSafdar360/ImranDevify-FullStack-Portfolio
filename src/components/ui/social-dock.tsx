"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Image, { StaticImageData } from "next/image";

interface SocialIcon {
  imageSrc?: StaticImageData;
  label: string;
  href: string;
}

interface SocialDockProps {
  items: SocialIcon[];
  className?: string;
}

const SocialDock = ({ items, className }: SocialDockProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleClick = (href: string) => {
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {items.map((item, index) => (
        <motion.div
          key={index}
          className="relative group"
          onHoverStart={() => setHoveredIndex(index)}
          onHoverEnd={() => setHoveredIndex(null)}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          {/* Icon Container with Gradient Background */}
          <motion.div
            className="w-14 h-14 rounded-2xl flex items-center justify-center cursor-pointer relative overflow-hidden"
            onClick={() => handleClick(item.href)}
            whileHover={{
              boxShadow: `0 8px 24px rgba(255,255,255,0.4)`,
            }}
          >
            {/* Icon */}
            <div className="w-full h-full relative z-10 flex items-center justify-center">
              {item.imageSrc && (
                <Image
                  src={item.imageSrc}
                  alt={item.label}
                  fill
                  className="object-cover"
                  loading="lazy"
                />
              )}
            </div>

            {/* Shine effect on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent z-20"
              initial={{ x: "-100%" }}
              animate={hoveredIndex === index ? { x: "100%" } : { x: "-100%" }}
              transition={{ duration: 0.6 }}
            />
          </motion.div>

          {/* Tooltip */}
          <AnimatePresence>
            {hoveredIndex === index && (
              <motion.div
                initial={{ opacity: 0, y: 5, scale: 0.8 }}
                animate={{ opacity: 1, y: -8, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="absolute -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap pointer-events-none z-20"
              >
                <div className="bg-black text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg border border-white/10">
                  {item.label}
                  {/* Tooltip arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-px">
                    <div className="border-4 border-transparent border-t-black"></div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

export default SocialDock;
