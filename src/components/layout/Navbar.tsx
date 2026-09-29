"use client";

import { useState } from "react";

const navigation = [
  { index: "01", label: "Work", href: "#work" },
  { index: "02", label: "Experience", href: "#experience" },
  { index: "03", label: "About", href: "#about" },
  { index: "04", label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a className="site-header__identity" href="#top" aria-label="Imran Safdar, home">
          <span className="site-header__name">Imran Safdar</span>
          <span className="site-header__descriptor text-meta">SaaS / Product engineer</span>
        </a>

        <nav className="site-header__desktop-nav" aria-label="Primary navigation">
          <ul className="site-header__links">
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href}>
                  <span className="site-header__index">{item.index}</span>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
          <a className="site-header__resume" href="#resume">
            Resume <span className="site-header__arrow" aria-hidden="true">↗</span>
          </a>
        </nav>

        <button
          className="site-header__menu-button"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          {isMenuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {isMenuOpen ? (
        <nav id="mobile-navigation" className="mobile-navigation" aria-label="Mobile navigation">
          <ul className="container mobile-navigation__links">
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={closeMenu}>
                  <span className="mobile-navigation__index">{item.index}</span>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
            <li>
              <a href="#resume" onClick={closeMenu}>
                Resume <span aria-hidden="true">↗</span>
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
