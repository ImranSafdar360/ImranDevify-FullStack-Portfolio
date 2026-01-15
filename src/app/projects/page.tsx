"use client";

import React from "react";
import { ProjectsHero } from "@/components/ui/projects-hero";
import { ProjectsGrid } from "@/components/ui/projects-grid";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-transparent selection:bg-primary/30">
      {/* 1. Projects Hero */}
      <ProjectsHero />

      {/* 2. Projects Grid (with Filtering) */}
      <ProjectsGrid />

      {/* 3. Bottom CTA (Soft Conversion) */}
      <section className="py-32 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <div className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-2 bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
            Let's Work Together
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Interested in a <br />
            similar project?
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl italic max-w-xl mx-auto leading-relaxed">
            Let’s discuss how I can help bring your idea to life — cleanly and
            efficiently.
          </p>
          <div className="pt-8">
            <Button
              size="lg"
              className="rounded-full px-12 py-7 text-lg font-bold group"
              asChild
            >
              <Link href="/contact">
                Start a Conversation
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
