"use client";

import React from "react";
import { IconType } from "react-icons";
import { cn } from "@/lib/utils";

interface IconBoxProps {
  // We use IconType specifically for react-icons
  // We include React.ComponentType to allow for custom SVG components
  icon: IconType | React.ComponentType<{ className?: string }>;
  className?: string;
  iconClassName?: string;
  size?: "sm" | "md" | "lg";
}

const IconBox = ({
  icon: Icon, // Destructuring to capital 'Icon' so React treats it as a component
  className,
  iconClassName,
  size = "md",
}: IconBoxProps) => {
  const sizeClasses = {
    sm: "w-8 h-8 rounded-md",
    md: "w-10 h-10 rounded-lg",
    lg: "w-12 h-12 rounded-xl",
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
        "border border-white/10 backdrop-blur-sm transition-all duration-300",
        "group-hover:border-white/20",
        sizeClasses[size],
        className,
      )}
      style={{
        background: `linear-gradient(to bottom right, #0080FF 10%, #0080FF 100%)`,
      }}
    >
      <div className="absolute inset-0 bg-white/5 blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* We check if Icon exists before rendering to prevent 
         "Icon is not a function" runtime errors 
      */}
      {Icon && (
        <Icon
          className={cn(
            "relative z-10 text-white transition-transform duration-300 group-hover:scale-110",
            iconSizeClasses[size],
            iconClassName,
          )}
        />
      )}
    </div>
  );
};

export default IconBox;
