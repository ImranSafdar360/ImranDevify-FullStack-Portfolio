"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Linkedin,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import GradientText from "./gradient-text";
import { cn } from "@/lib/utils";
import { Button } from "./button";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export const HeroSection = () => {
  return (
    <section className="py-20 text-center px-4">
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={fadeInUp}
        className="max-w-4xl mx-auto"
      >
        <span className="text-primary font-medium tracking-wider uppercase text-sm mb-4 block">
          Contact
        </span>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-tight">
          Let’s Build Something That <br />
          <GradientText fromColor="#00C7FE" toColor="#0080FF">
            Actually Works
          </GradientText>
        </h1>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
          Whether you’re launching a new product, scaling an existing platform,
          or need a reliable development partner — I’m happy to explore how I
          can help.
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground/80 font-medium italic">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Clear communication. Clean engineering. Long-term thinking.
        </div>
      </motion.div>
    </section>
  );
};

export const ContactOptions = () => {
  const options = [
    {
      title: "Email",
      description: "For detailed project discussions",
      value: "imransafdar@email.com",
      link: "mailto:imransafdar@email.com",
      cta: "imransafdar@email.com",
      icon: Mail,
      color: "bg-blue-500/10",
      iconColor: "text-blue-500",
    },
    {
      title: "LinkedIn",
      description: "Quick intro or context",
      value: "Connect on LinkedIn",
      link: "https://linkedin.com/in/imransafdar", // Placeholder
      cta: "Connect on LinkedIn \u2192",
      icon: Linkedin,
      color: "bg-cyan-500/10",
      iconColor: "text-cyan-500",
    },
    {
      title: "WhatsApp",
      description: "Fast questions or scheduling",
      value: "Chat on WhatsApp",
      link: "https://wa.me/yournumber", // Placeholder
      cta: "Chat on WhatsApp \u2192",
      icon: MessageCircle,
      color: "bg-green-500/10",
      iconColor: "text-green-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
      {options.map((option, idx) => (
        <motion.a
          key={idx}
          href={option.link}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
          className="group relative p-6 rounded-2xl bg-muted/30 border border-white/5 hover:border-primary/20 transition-all duration-300"
        >
          <div
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110",
              option.color
            )}
          >
            <option.icon className={cn("w-6 h-6", option.iconColor)} />
          </div>
          <h3 className="text-xl font-bold mb-2">{option.title}</h3>
          <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
            {option.description}
          </p>
          <div className="text-primary font-medium group-hover:underline transition-all">
            {option.cta}
          </div>
        </motion.a>
      ))}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="col-span-full text-center text-muted-foreground text-sm italic mt-4"
      >
        Choose the channel that feels easiest — I usually respond within 24
        hours.
      </motion.p>
    </div>
  );
};

export const ProcessSection = () => {
  const steps = [
    {
      title: "I review your message and goals",
      description:
        "Every inquiry gets direct attention. I look at your project needs and how they align with my expertise.",
    },
    {
      title: "I respond with thoughts or questions",
      description:
        "Expect a detailed response with potential approaches, clarifying questions, or initial feedback.",
    },
    {
      title: "If it makes sense, we schedule a call",
      description:
        "A quick intro chat to see if we're a cultural and technical fit before committing to anything.",
    },
  ];

  return (
    <section className="py-20 border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center md:text-left">
          What Happens After You Reach Out?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              <div className="text-6xl font-black text-white/5 absolute -top-10 -left-4 pointer-events-none">
                0{idx + 1}
              </div>
              <h3 className="text-xl font-bold mb-4 relative z-10">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed italic border-l-2 border-primary/20 pl-4">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const TrustReinforcement = () => {
  return (
    <section className="py-20 border-t border-white/5 bg-gradient-to-b from-transparent to-muted/10">
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <CheckCircle2 className="text-green-500 w-6 h-6" />
              Who This Is For
            </h3>
            <ul className="space-y-4">
              {[
                "SaaS founders building real products",
                "Agencies needing a dependable dev partner",
                "Teams who value clean code and clear communication",
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 text-muted-foreground italic"
                >
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <XCircle className="text-destructive w-6 h-6" />
              Not a fit if:
            </h3>
            <p className="text-muted-foreground leading-relaxed italic border-l-2 border-destructive/20 pl-4">
              You’re looking for rushed work, quick hacks, or are purely
              price-driven over quality and long-term stability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export const FinalCTA = () => {
  return (
    <div className="py-20 border-t border-white/5 text-center px-4">
      <h2 className="text-3xl md:text-5xl font-bold mb-8">
        Have a project in mind?
      </h2>
      <p className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto leading-relaxed italic">
        Let’s talk and see if we’re a good fit. I’m always open to interesting
        collaborations.
      </p>
      <Button
        size="lg"
        className="rounded-full px-12 py-7 text-lg font-bold group"
      >
        Start the Conversation
        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
};
