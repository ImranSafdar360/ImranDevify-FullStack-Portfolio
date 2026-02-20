"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GradientText from "@/components/ui/gradient-text";
import ShinyText from "@/components/ui/ShinyText";
import DynamicCard from "./DynamicCard";

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reveal main content after 1.5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black pointer-events-none"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0, // Fade out softly instead of slide
            transition: { duration: 0.6, ease: "easeInOut" },
          }}
        >
          <div className="flex flex-col items-center gap-6">
            {/* Top Text */}
            <motion.p
              className="text-sm md:text-base font-jakarta text-zinc-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Need A High Quality
            </motion.p>

            {/* Center Pill Text */}
            <motion.div
              className="relative overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <DynamicCard className="w-full min-w-fit h-full min-h-fit">
                <h1
                  className="text-[24px] md:text-[30px] lg:text-4xl xl:text-[84px] tracking-tight leading-relaxed font-sora xl:leading-[94px] text-center max-w-[90%] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[1000px]"
                  style={{
                    fontFamily: "var(--font-boldonse)",
                  }}
                >
                  <GradientText
                    fromColor="#FFFFFF"
                    toColor="#A1A1AA"
                    direction="to-b"
                  >
                    Products
                  </GradientText>
                </h1>
              </DynamicCard>
            </motion.div>

            {/* Bottom Text */}
            <motion.p
              className="text-sm md:text-base font-jakarta text-zinc-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <ShinyText
                text="You are at the Right Place!"
                speed={2}
                className="text-zinc-500"
              />
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
