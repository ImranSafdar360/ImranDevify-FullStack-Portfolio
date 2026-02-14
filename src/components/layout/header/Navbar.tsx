"use client";

import Link from "next/link";
import Logo from "./Logo";

export default function Navbar() {
  // Left side navigation links
  const leftLinks = [
    { name: "Work", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
  ];

  // Right side navigation links
  const rightLinks = [
    { name: "Blog", href: "/blogs" },
    { name: "Contact", href: "/contact" },
    { name: "Resume", href: "/resume" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="relative w-full max-w-[900px] mx-auto flex">

        {/* Main content area with dark glassmorphism effect */}
        <div
          className="w-full relative rounded-b-[64px] overflow-hidden px-[24px]"
          style={{
            background: 'linear-gradient(to bottom, rgba(10, 10, 10, 0.85) 0%, rgba(15, 15, 15, 0.75) 50%, rgba(20, 20, 20, 0.65) 100%)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderTop: 'none',
          }}
        >
          {/* Content container with three sections */}
          <div className="relative flex items-center justify-center px-4 md:px-8 lg:px-12 py-4 md:py-5">
            {/* Left section - 3 links */}
            <div className="flex items-center gap-4 sm:gap-6 md:gap-8 flex-1 justify-start">
              {leftLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-white/90 hover:text-white text-sm md:text-base font-semibold transition-all duration-300 relative group whitespace-nowrap"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-white group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </div>

            {/* Center section - Brand Logo */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex-shrink-0">
              <Logo />
            </div>

            {/* Right section - 3 links */}
            <div className="flex items-center gap-4 sm:gap-6 md:gap-8 flex-1 justify-end">
              {rightLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-white/90 hover:text-white text-sm md:text-base font-semibold transition-all duration-300 relative group whitespace-nowrap"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-white group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </nav>
  );
}
