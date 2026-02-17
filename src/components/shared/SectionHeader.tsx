import React from "react";
import SectionBadge from "./SectionBadge";
import GradientText from "../ui/gradient-text";
import { cn } from "@/lib/utils";

const SectionHeader = ({
  title,
  description,
  badgeText,
  gradientText,
  gradientTextClassName,
  className,
  isAbout = false,
}: {
  title: string;
  description: string;
  badgeText: string;
  gradientText?: string;
  gradientTextClassName?: string;
  className?: string;
  isAbout?: boolean;
}) => {
  return (
    <div
      className={cn(
        "w-full flex flex-col gap-[16px]",
        isAbout ? "items-center lg:items-start" : "items-center",
        className,
      )}
    >
      <SectionBadge
        className="mb-4 md:mb-5 lg:mb-6 xl:mb-[8px]"
        text={badgeText}
      />
      <h1
        className={cn(
          "text-[36px] md:text-[40px] lg:text-[44px] xl:text-[52px] leading-[40px] md:leading-[48px] lg:leading-[52px] xl:leading-[60px] font-bold text-white font-sora",
          isAbout ? "text-start" : "text-center",
        )}
      >
        {title}
        {gradientText && (
          <GradientText className={cn("font-sora", gradientTextClassName)}>
            {gradientText}
          </GradientText>
        )}
      </h1>
      <p
        className={cn(
          "max-w-full md:max-w-[80%] text-[15px] md:text-[16px] lg:text-[17px] xl:text-[18px] leading-[24px] md:leading-[26px] lg:leading-[26px] xl:leading-[28px] font-medium text-white/70",
          isAbout
            ? "text-start max-w-[80%]"
            : "text-center lg:max-w-[70%] max-w-full",
        )}
      >
        {description}
      </p>
    </div>
  );
};

export default SectionHeader;
