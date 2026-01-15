"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./button";

export const ProjectsHero = () => {
  return (
    <section className="pt-32 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-start gap-6 text-left"
      >
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">Projects</span>
        </nav>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.9] selection:bg-primary/30">
          Projects Built <br />
          With <span className="italic text-primary">Purpose</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed italic">
          A selection of products I’ve designed and developed — focused on
          performance, scalability, and real-world usability.
        </p>

        {/* Micro Line */}
        <p className="text-sm text-muted-foreground/60 font-medium tracking-wide flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-primary" />
          Each project reflects how I think, build, and solve problems.
        </p>

        {/* Primary CTA */}
        <div className="pt-4">
          <Button
            size="lg"
            className="rounded-full px-8 py-6 text-lg font-bold group border border-white/10"
            variant="outline"
            asChild
          >
            <Link href="#projects">
              Explore Case Studies
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
};
