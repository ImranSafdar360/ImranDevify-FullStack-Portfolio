"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const filters = ["All", "Web Apps", "Mobile Apps", "SaaS Platforms", "MVPs"];

export const ProjectsFilter = ({
  activeFilter,
  onFilterChange,
}: FilterProps) => {
  return (
    <div className="flex flex-wrap gap-3 mb-12 px-6 md:px-12 max-w-7xl mx-auto scrollbar-hide overflow-x-auto pb-4">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={cn(
            "px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border box-border",
            activeFilter === filter
              ? "bg-primary border-primary text-black shadow-lg shadow-primary/20"
              : "bg-muted/30 border-white/5 text-muted-foreground hover:border-primary/30 hover:text-foreground"
          )}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};
