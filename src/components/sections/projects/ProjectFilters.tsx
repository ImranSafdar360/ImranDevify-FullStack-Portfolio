"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ProjectFiltersProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const ProjectFilters = ({
  categories,
  activeCategory,
  onCategoryChange,
}: ProjectFiltersProps) => {
  return (
    <div className="flex justify-center w-full px-4 mb-12 mt-16">
      <div className="relative flex flex-wrap items-center justify-center p-2 bg-[#080808] rounded-[20px] border-[1px] border-white/5 backdrop-blur-xl gap-2 md:gap-4 overflow-hidden shadow-2xl">
        {/* Gradient Glow Line */}
        <div
          className="absolute top-[0px] left-1/2 -translate-x-1/2"
          style={{
            width: "40%",
            height: "1px",
            background:
              "linear-gradient(to right, rgba(0, 199, 254, 0) 0%, rgba(0, 128, 255, 1) 50%, rgba(0, 199, 254, 0) 100%)",
          }}
        />
        {categories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={cn(
                "px-5 py-2.5 md:px-8 md:py-3.5 rounded-[12px] text-sm md:text-base font-semibold transition-all duration-500 relative overflow-hidden group",
                isActive ? "text-white" : "text-white/50 hover:text-white/80",
              )}
            >
              {/* Active Background Gradient */}
              {isActive && (
                <div
                  className="absolute inset-0 z-0 animate-in fade-in zoom-in duration-500"
                  style={{
                    background:
                      "linear-gradient(to bottom right, #00C7FE 5%, #0080FF 100%)",
                  }}
                />
              )}

              {/* Hover Glow Effect */}
              {!isActive && (
                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}

              <span className="relative z-10">{category}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProjectFilters;
