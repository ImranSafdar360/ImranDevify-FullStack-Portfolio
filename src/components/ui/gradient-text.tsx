import React from "react";
import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  fromColor?: string;
  toColor?: string;
  direction?:
    | "to-r"
    | "to-l"
    | "to-b"
    | "to-t"
    | "to-br"
    | "to-bl"
    | "to-tr"
    | "to-tl";
}

const GradientText = ({
  children,
  className,
  fromColor = "#00C7FE",
  toColor = "#0080FF",
  direction = "to-br",
}: GradientTextProps) => {
  const directionMap = {
    "to-r": "to right",
    "to-l": "to left",
    "to-b": "to bottom",
    "to-t": "to top",
    "to-br": "to bottom right",
    "to-bl": "to bottom left",
    "to-tr": "to top right",
    "to-tl": "to top left",
  };

  const gradientDirection = directionMap[direction] || "to bottom right";

  return (
    <span
      className={cn("bg-clip-text text-transparent inline-block", className)}
      style={{
        background: fromColor,
        backgroundImage: `linear-gradient(${gradientDirection}, ${fromColor} 5%, ${toColor} 100%)`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {children}
    </span>
  );
};

export default GradientText;
