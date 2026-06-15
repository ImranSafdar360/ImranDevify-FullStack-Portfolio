"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "AI Workflow", href: "#ai-workflow" },
  { label: "About", href: "#about" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const lastScrolled = useRef(false);

  // Condense the island once the page leaves the very top. Guarded so it only
  // re-renders when the boolean actually flips (no per-frame state churn).
  useEffect(() => {
    const onScroll = () => {
      const v = window.scrollY > 24;
      if (v !== lastScrolled.current) {
        lastScrolled.current = v;
        setScrolled(v);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight the link whose section sits in the upper-middle band.
  useEffect(() => {
    const sections = NAV_LINKS.map((l) =>
      document.getElementById(l.href.slice(1))
    ).filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* Floating glass island — detached from the top, centered, condenses on scroll */}
      <nav className="fixed inset-x-0 top-3 z-50 px-3 md:top-5">
        <div
          className={`relative mx-auto flex w-full max-w-[1080px] items-center justify-between rounded-full border px-2.5 py-2.5 pl-4 transition-[background-color,border-color,box-shadow,transform] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            scrolled
              ? "border-white/10 bg-bg/80 shadow-[0_10px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl"
              : "border-white/[0.06] bg-bg/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] backdrop-blur-md"
          }`}
        >
          {/* Brand — monogram mark + wordmark */}
          <Link href="/" className="group flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-accent/30 bg-accent-soft font-mono text-[12px] font-medium text-accent transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-rotate-6">
              IS
            </span>
            <span className="font-sans text-[15px] font-medium tracking-[-0.01em]">
              <span className="text-text">Imran</span>
              <span className="text-text-muted"> Safdar</span>
            </span>
          </Link>

          {/* Center links — absolutely centered, hover-pill + scroll-spy active */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const active = activeId === link.href.slice(1);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "true" : undefined}
                  className={`rounded-full px-3.5 py-1.5 font-sans text-small transition-colors duration-200 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    active
                      ? "bg-accent-soft text-accent"
                      : "text-text-muted hover:bg-white/[0.06] hover:text-text"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Right cluster — CTA (desktop) + hamburger (mobile) */}
          <div className="flex items-center gap-2">
            <Link
              href="#contact"
              className="group hidden items-center gap-2 rounded-full bg-accent py-2 pl-4 pr-2 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:brightness-110 active:scale-[0.97] md:inline-flex"
            >
              <span className="font-sans text-small font-medium text-bg">
                Book a call
              </span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-bg/15 text-[13px] text-bg transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </Link>

            {/* Mobile hamburger → X morph */}
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] md:hidden"
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 h-[1.5px] w-4 bg-text transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-[1.5px] w-4 bg-text transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                    menuOpen
                      ? "bottom-1/2 translate-y-1/2 -rotate-45"
                      : "bottom-0"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen glass overlay — sibling of <nav> so backdrop-filter
          on the island doesn't trap this fixed layer inside the nav's box. */}
      <div
        className={`fixed inset-0 z-40 flex flex-col bg-bg/95 backdrop-blur-2xl transition-[opacity,visibility] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="flex flex-1 flex-col justify-center gap-2 px-8">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{ transitionDelay: menuOpen ? `${100 + i * 70}ms` : "0ms" }}
              className={`font-serif text-[40px] leading-tight text-text transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                menuOpen
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
            >
              {link.label}
            </Link>
          ))}

          <Link
            href="#contact"
            onClick={() => setMenuOpen(false)}
            style={{
              transitionDelay: menuOpen
                ? `${100 + NAV_LINKS.length * 70}ms`
                : "0ms",
            }}
            className={`mt-8 inline-flex w-max items-center gap-2 rounded-full bg-accent py-3 pl-5 pr-3 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              menuOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <span className="font-sans text-body font-medium text-bg">
              Book a call
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-bg/15 text-bg">
              ↗
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
