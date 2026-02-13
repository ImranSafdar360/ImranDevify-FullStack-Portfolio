"use client";

import React from "react";

interface SectionSeparatorProps {
  orientation?: "vertical" | "horizontal";
  color?: string; // Hex color without # (e.g., "FFFFFF" for white, "0080FF" for blue)
  centerOpacity?: number; // Opacity at center (0-1), default 0.15
  height?: string; // Height for vertical, width for horizontal
  width?: string; // Width for vertical, height for horizontal
  className?: string;
}

export default function SectionSeparator({
  orientation = "vertical",
  color = "FFFFFF",
  centerOpacity = 0.15,
  height,
  width,
  className = "",
}: SectionSeparatorProps) {
  // Convert hex color to RGB
  const hexToRgb = (hex: string): [number, number, number] => {
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return [r, g, b];
  };

  const [r, g, b] = hexToRgb(color);

  // Default dimensions based on orientation
  const defaultHeight = orientation === "vertical" ? height || "20px" : width || "1px";
  const defaultWidth = orientation === "vertical" ? width || "1px" : height || "100%";

  // Gradient direction based on orientation
  const gradientDirection =
    orientation === "vertical"
      ? "to bottom"
      : "to right";

  const gradientStyle = {
    background: `linear-gradient(${gradientDirection}, rgba(${r}, ${g}, ${b}, 0) 0%, rgba(${r}, ${g}, ${b}, ${centerOpacity}) 50%, rgba(${r}, ${g}, ${b}, 0) 100%)`,
    height: defaultHeight,
    width: defaultWidth,
  };

  return (
    <div
      className={className}
      style={gradientStyle}
    />
  );
}

