import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Magnet from "@/components/shared/Magnet";
import SectionBadge from "@/components/shared/SectionBadge";
import Link from "next/link";

import { Project } from "@/data/projectData";

export default function CaseStudyCard({
  study,
  index,
}: {
  study: Project;
  index: number;
}) {
  return (
    <Link href={`/projects/${study.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1, duration: 0.6 }}
        className={`w-full group relative flex flex-col gap-[24px] cursor-pointer ${index === 4 ? "col-span-2" : "col-span-2 lg:col-span-1"}`}
      >
        {/* Image Mockup Wrapper */}
        <div
          className={`w-full ${index === 4 ? "h-[275px] md:h-[500px] lg:h-[700px] xl:h-[800px]" : "h-[275px] md:h-[500px] lg:h-[400px] xl:h-[500px]"} relative overflow-hidden rounded-[1.5rem]`}
        >
          <Image
            src={study.image}
            alt={study.title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          {/* Modern Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
            <Magnet padding={300} disabled={false} magnetStrength={5}>
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
          <div className="w-full space-y-2">
            <div className="flex justify-between items-center gap-[16px]">
              <h3 className="text-[24px] leading-[30px] font-sora uppercase font-bold text-white">
                {study.title}
              </h3>
              {study.category && (
                <SectionBadge
                  className="rounded-full text-[14px]"
                  text={study.category}
                />
              )}
            </div>
            <p className="text-[18px] leading-[24px] font-medium text-white/70">
              {study.description}
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
