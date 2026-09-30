"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";

type NavigationKey = "work" | "experience" | "about" | "contact";

const navigation = [
  { index: "01", label: "Work", href: "#work", key: "work" },
  { index: "02", label: "Experience", href: "#experience", key: "experience" },
  { index: "03", label: "About", href: "#about", key: "about" },
  { index: "04", label: "Contact", href: "#contact", key: "contact" },
] satisfies ReadonlyArray<{
  index: string;
  label: string;
  href: string;
  key: NavigationKey;
}>;

const observedSections = [
  { id: "top", navigationKey: null },
  { id: "work", navigationKey: "work" },
  { id: "blarecast", navigationKey: "work" },
  { id: "your-business-date", navigationKey: "work" },
  { id: "private-production-saas", navigationKey: "work" },
  { id: "engineering-capabilities", navigationKey: null },
  { id: "experience", navigationKey: "experience" },
  { id: "about", navigationKey: "about" },
  { id: "contact", navigationKey: "contact" },
] satisfies ReadonlyArray<{ id: string; navigationKey: NavigationKey | null }>;

const premiumEase = [0.22, 1, 0.36, 1] as const;

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<NavigationKey | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavigationRef = useRef<HTMLElement>(null);

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    let frame = 0;

    const updateScrollState = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setIsScrolled(window.scrollY > 56));
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateScrollState);
    };
  }, []);

  useEffect(() => {
    const sectionMap = new Map(
      observedSections.map(({ id, navigationKey }) => [id, navigationKey]),
    );
    const sections = observedSections
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))[0];

        if (current) setActiveSection(sectionMap.get(current.target.id) ?? null);
      },
      { rootMargin: "-24% 0px -74% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    const firstLink = mobileNavigationRef.current?.querySelector<HTMLAnchorElement>("a");
    const focusableElements = () => [
      menuButtonRef.current,
      ...Array.from(
        mobileNavigationRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? [],
      ),
    ].filter(
      (element): element is HTMLButtonElement | HTMLAnchorElement => element !== null,
    );

    document.body.style.overflow = "hidden";
    firstLink?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsMenuOpen(false);
        requestAnimationFrame(() => menuButtonRef.current?.focus());
        return;
      }

      if (event.key !== "Tab") return;

      const elements = focusableElements();
      const firstElement = elements[0];
      const lastElement = elements.at(-1);

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <MotionConfig reducedMotion="user">
      <motion.header
        className={isScrolled ? "site-header site-header--scrolled" : "site-header"}
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.58, delay: 0.08, ease: premiumEase }}
      >
      <div className="container site-header__inner">
        <a className="site-header__identity" href="#top" aria-label="Imran Safdar, home">
          <span className="site-header__name">Imran Safdar</span>
          <span className="site-header__descriptor text-meta">SaaS / Product engineer</span>
        </a>

        <nav className="site-header__desktop-nav" aria-label="Primary navigation">
          <ul className="site-header__links">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  className={activeSection === item.key ? "site-header__link site-header__link--active" : "site-header__link"}
                  href={item.href}
                  aria-current={activeSection === item.key ? "location" : undefined}
                >
                  <span className="site-header__index">{item.index}</span>
                  <span className="site-header__label">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
          <span className="site-header__resume site-header__resume--pending">
            Resume / Pending
          </span>
        </nav>

        <button
          ref={menuButtonRef}
          className="site-header__menu-button"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          {isMenuOpen ? "Close" : "Menu"}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {isMenuOpen ? (
          <motion.nav
            ref={mobileNavigationRef}
            id="mobile-navigation"
            className="mobile-navigation"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.24, ease: premiumEase }}
          >
            <ul className="container mobile-navigation__links">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    className={activeSection === item.key ? "mobile-navigation__link mobile-navigation__link--active" : "mobile-navigation__link"}
                    href={item.href}
                    aria-current={activeSection === item.key ? "location" : undefined}
                    onClick={closeMenu}
                  >
                    <span className="mobile-navigation__index">{item.index}</span>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
              <li>
                <span className="mobile-navigation__pending">Resume / Pending</span>
              </li>
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
      </motion.header>
    </MotionConfig>
  );
}
