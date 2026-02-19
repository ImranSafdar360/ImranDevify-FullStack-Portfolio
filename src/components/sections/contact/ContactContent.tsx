"use client";

import React from "react";
import ContactHero from "@/components/sections/contact/ContactHero";
import ContactFormSection from "@/components/sections/contact/ContactFormSection";
import SectionSeparator from "@/components/shared/SectionSeparator";
import { FAQ } from "@/components/sections/home/faqs/FAQs";

const ContactContent = () => {
  return (
    <main className="min-h-screen flex flex-col items-center pb-32">
      <ContactHero />

      <SectionSeparator
        orientation="horizontal"
        color="FFFFFF"
        centerOpacity={0.25}
        className="my-20 md:my-32"
      />

      <ContactFormSection />

      <SectionSeparator
        orientation="horizontal"
        color="FFFFFF"
        centerOpacity={0.25}
        className="my-20 md:my-32"
      />

      <FAQ />
    </main>
  );
};

export default ContactContent;
