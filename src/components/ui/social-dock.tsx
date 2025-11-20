'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface SocialIcon {
  icon: React.ReactNode;
  label: string;
  href: string;
  gradientFrom: string;
  gradientTo: string;
}

interface SocialDockProps {
  items: SocialIcon[];
  className?: string;
}

const SocialDock = ({ items, className }: SocialDockProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {items.map((item, index) => (
        <motion.a
          key={index}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="relative group"
          onHoverStart={() => setHoveredIndex(index)}
          onHoverEnd={() => setHoveredIndex(null)}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          {/* Icon Container with Gradient Background */}
          <motion.div
            className="w-12 h-12 rounded-[8px] flex items-center justify-center cursor-pointer relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${item.gradientFrom}, ${item.gradientTo})`,
            }}
            whileHover={{
              boxShadow: `0 8px 24px ${item.gradientFrom}40`,
            }}
          >
            {/* Icon */}
            <div className="relative z-10 text-white">
              {item.icon}
            </div>
            
            {/* Shine effect on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              animate={hoveredIndex === index ? { x: '100%' } : { x: '-100%' }}
              transition={{ duration: 0.6 }}
            />
          </motion.div>

          {/* Tooltip */}
          <AnimatePresence>
            {hoveredIndex === index && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: -8, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="absolute -top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
              >
                <div className="bg-gray-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg border border-gray-700">
                  {item.label}
                  {/* Tooltip arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-px">
                    <div className="border-4 border-transparent border-t-gray-900"></div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.a>
      ))}
    </div>
  );
};

export default SocialDock;

