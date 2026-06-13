"use client";

import Link from "next/link";
import AskMyPortfolio from "@/components/chat/AskMyPortfolio";

const HEADLINE_WORDS: { text: string; italic?: boolean; suffix?: string }[] = [
  { text: "I" },
  { text: "ship" },
  { text: "AI-powered", italic: true },
  { text: "products", italic: true, suffix: "," },
  { text: "not" },
  { text: "just" },
  { text: "code." },
];

export default function Hero() {
  return (
    <section id="hero" className="flex min-h-[calc(100vh-72px)] items-center py-24 md:py-32">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-[60%_40%] lg:gap-16">
          {/* Left: text content */}
          <div>
            <div
              className="mb-7 flex animate-fade-up items-center gap-2.5 opacity-0"
              style={{ animationDelay: "0s" }}
            >
              <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-accent" />
              <p className="font-mono text-meta uppercase text-text-muted">
                AI-Product Engineer · Lahore → Global
              </p>
            </div>

            <h1 className="mb-6 font-serif text-display-1 text-text">
              {HEADLINE_WORDS.map((word, i) => (
                <span
                  key={i}
                  className="inline-block animate-fade-up opacity-0"
                  style={{ animationDelay: `${0.1 + i * 0.05}s` }}
                >
                  {word.italic ? (
                    <span className="italic">{word.text}</span>
                  ) : (
                    word.text
                  )}
                  {word.suffix}
                  {i < HEADLINE_WORDS.length - 1 && " "}
                </span>
              ))}
            </h1>

            <p
              className="mb-9 max-w-[480px] animate-fade-up font-sans text-body-lg text-text-muted opacity-0"
              style={{ animationDelay: "0.6s" }}
            >
              I build end-to-end SaaS products with intelligence built
              in&nbsp;— the architecture, the interface, and the AI inside it.
              For founders who don&apos;t want to hire three people to ship one
              product.
            </p>

            <div
              className="flex animate-fade-up items-center gap-6 opacity-0"
              style={{ animationDelay: "0.7s" }}
            >
              <Link
                href="#contact"
                className="rounded-lg bg-accent px-6 py-3.5 font-sans text-small font-medium text-bg transition duration-150 hover:brightness-110"
              >
                Book a strategy call
              </Link>
              <Link
                href="#process"
                className="font-sans text-small text-text-muted transition-colors duration-150 hover:text-accent"
              >
                See how I work →
              </Link>
            </div>
          </div>

          {/* Right: live AI chat */}
          <div
            className="w-full max-w-[380px] animate-fade-up opacity-0"
            style={{ animationDelay: "0.8s" }}
          >
            <AskMyPortfolio />
          </div>
        </div>
      </div>
    </section>
  );
}
