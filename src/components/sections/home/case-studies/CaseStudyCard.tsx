import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Magnet from "@/components/shared/Magnet";

interface CaseStudy {
  id: string;
  title: string;
  description: string;
  image: string;
  category?: string;
  client?: string;
  date?: string;
  service?: string;
  techStack?: string[];
  isCTA?: boolean;
}

export default function CaseStudyCard({
  study,
  onClick,
  index,
}: {
  study: CaseStudy;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className={`w-full group relative flex flex-col gap-[24px] cursor-pointer ${index === 2 ? "col-span-2" : "col-span-1"}`}
      onClick={onClick}
    >
      {/* Image Mockup Wrapper */}
      <div
        className={`w-full ${index === 2 ? "w-full h-[800px]" : "h-[500px]"} relative overflow-hidden rounded-[1.5rem]`}
      >
        <Image
          src={study.image}
          alt={study.title}
          fill
          className="object-fill transition-transform duration-1000 group-hover:scale-110"
        />
        {/* Modern Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <Magnet padding={300} disabled={false} magnetStrength={10}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-[100px] h-[100px] flex justify-center items-center rounded-full bg-black/70 text-white text-sm font-bold"
            >
              View
            </motion.div>
          </Magnet>
        </div>
      </div>

      {/* Content */}
      <div className="flex items-start justify-between">
        <div className="w-full max-w-[70%] space-y-2">
          <h3 className="text-[24px] leading-[30px] font-bold text-white">
            {study.title}
          </h3>
          <p className="text-[18px] leading-[24px] font-medium text-white/50">
            {study.description}
          </p>
        </div>
        {study.category && (
          <div className="px-4 py-2 rounded-full border border-white/70">
            <p className="text-[14px] font-normal leading-[20px] text-white/70 uppercase">
              {study.category}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
