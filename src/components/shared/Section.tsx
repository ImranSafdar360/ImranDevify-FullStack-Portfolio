import { cn } from "@/lib/utils";
import React from "react";

const Section = ({
  id,
  children,
  className,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <section
      id={id}
      className={cn("w-full max-w-[1440px] h-full mx-auto", className)}
    >
      {children}
    </section>
  );
};

export default Section;
