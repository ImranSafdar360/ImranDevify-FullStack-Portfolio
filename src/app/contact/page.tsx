"use client";

import React from "react";
import {
  HeroSection,
  ContactOptions,
  ProcessSection,
  TrustReinforcement,
  FinalCTA,
} from "@/components/ui/contact-page-sections";
import { ContactForm } from "@/components/ui/contact-form";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-transparent text-foreground font-jakarta selection:bg-primary/30">
      {/* Hero Section */}
      <HeroSection />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left Column: Copy and Contact Options */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                Let's get the conversation started.
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl leading-relaxed italic max-w-xl">
                Choose the channel that feels easiest — I usually respond within
                24 hours. I’m always open to discussing new projects, creative
                ideas or opportunities to be part of your visions.
              </p>
            </div>

            <ContactOptions />

            <div className="hidden lg:block p-8 rounded-2xl bg-primary/5 border border-primary/10">
              <h4 className="font-bold mb-2">Why reach out?</h4>
              <p className="text-sm text-muted-foreground leading-relaxed italic">
                "I don't just build websites; I build solutions that drive
                growth. Whether you have a clear spec or just a rough idea, I'm
                here to help you navigate the technical landscape."
              </p>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="sticky top-24">
            <ContactForm />
          </div>
        </div>
      </div>

      {/* Additional Informational Sections */}
      <ProcessSection />
      <TrustReinforcement />
      <FinalCTA />
    </main>
  );
}
