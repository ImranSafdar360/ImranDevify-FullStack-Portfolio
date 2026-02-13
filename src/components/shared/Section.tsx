import { cn } from "@/lib/utils";
import React from "react";

const Section = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <section
      className={cn(
        "w-full max-w-[1440px] h-full mx-auto",
        className,
      )}
    >
      {children}
    </section>
  );
};

export default Section;
