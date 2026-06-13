"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "AI Workflow", href: "#ai-workflow" },
  { label: "About", href: "#about" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`sticky top-0 z-50 border-b transition-[background-color,border-color] duration-200 ease-out ${
          scrolled
            ? "border-border bg-bg backdrop-blur-[12px]"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="container flex h-[72px] items-center justify-between">
          <Link
            href="/"
            className="font-sans text-[15px] font-medium tracking-[-0.01em]"
          >
            <span className="text-text">Imran</span>
            <span className="text-text-muted"> Safdar</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-small text-text-muted transition-colors duration-150 hover:text-text"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <Link
            href="#contact"
            className="hidden rounded-lg bg-accent px-5 py-3 font-sans text-small font-medium text-bg transition duration-150 hover:brightness-110 md:inline-block"
          >
            Book a call
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="flex flex-col gap-1 p-2 md:hidden"
          >
            <span className="h-[1.5px] w-5 bg-text" />
            <span className="h-[1.5px] w-5 bg-text" />
          </button>
        </div>
      </nav>

      {/* Mobile overlay — must be a sibling of <nav>: backdrop-filter on the
          nav makes it the containing block for fixed descendants, which would
          pin this overlay to the nav's box instead of the viewport. */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-bg md:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
            className="absolute right-6 top-6 p-2"
          >
            <span className="relative block h-5 w-5">
              <span className="absolute left-0 top-1/2 h-[1.5px] w-5 rotate-45 bg-text" />
              <span className="absolute left-0 top-1/2 h-[1.5px] w-5 -rotate-45 bg-text" />
            </span>
          </button>

          <div className="flex h-full flex-col items-center justify-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-sans text-[24px] text-text"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-12 rounded-lg bg-accent px-5 py-3 font-sans text-small font-medium text-bg transition duration-150 hover:brightness-110"
            >
              Book a call
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
