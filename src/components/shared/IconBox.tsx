"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconBoxProps {
  icon: LucideIcon | React.ElementType;
  className?: string;
  iconClassName?: string;
  size?: "sm" | "md" | "lg";
}

const IconBox = ({
  icon: Icon,
  className,
  iconClassName,
  size = "md",
}: IconBoxProps) => {
  const sizeClasses = {
    sm: "w-8 h-8 rounded-lg",
    md: "w-10 h-10 rounded-xl",
    lg: "w-12 h-12 rounded-2xl",
  };

  const iconSizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <div
      className={cn(
        "relative flex items-center justify-center shrink-0 overflow-hidden shadow-sm",
        "border border-white/10 backdrop-blur-sm",
        "group-hover:border-white/20 transition-all duration-300",
        sizeClasses[size],
        className,
      )}
      style={{
        background: `linear-gradient(to bottom right, #00C7FE 5%, #0080FF 100%)`,
      }}
    >
      {/* Subtle Inner Glow */}
      <div className="absolute inset-0 bg-white/5 blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <Icon
        className={cn(
          "relative z-10 text-white transition-transform duration-300 group-hover:scale-110",
          iconSizeClasses[size],
          iconClassName,
        )}
        strokeWidth={2.5}
      />
    </div>
  );
};

export default IconBox;
