"use client";

import React from "react";
import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";
import AnimatedButton from "@/components/shared/AnimatedButton";

const ContactHero = () => {
  return (
    <Section className="max-w-full relative flex flex-col justify-start items-center pt-[130px] md:pt-[150px] pb-10 gap-8">
      <div className="relative z-20 w-full flex flex-col items-center">
        <SectionHeader
          className="max-w-full md:max-w-[700px] lg:max-w-[800px] xl:max-w-[1000px] items-center text-center gap-[12px]"
          title="Any Questions Rising? "
          description="Whether you have a question, need assistance, or want to start a new project, our team is here to help."
          badgeText="24/7 Let's Work Together"
          gradientText="We are All Here."
        />

        <div className="mt-8">
          <AnimatedButton
            onClick={() =>
              document
                .getElementById("contact-form")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Fill The Form Out!
          </AnimatedButton>
        </div>
      </div>
    </Section>
  );
};

export default ContactHero;
