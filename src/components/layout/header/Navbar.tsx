"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useDeviceType } from "@/hooks/use-mobile";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { isDesktop } = useDeviceType();

  // Close menu when switching to desktop
  useEffect(() => {
    if (isDesktop) setIsOpen(false);
  }, [isDesktop]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const leftLinks = [
    { name: "Why me?", href: "#why-me" },
    { name: "Reviews", href: "#testimonials" },
    { name: "Services", href: "#services" },
  ];

  const rightLinks = [
    { name: "About", href: "#about" },
    { name: "Portfolio", href: "/projects" },
    { name: "Contact", href: "/contact" },
  ];

  const allLinks = [...leftLinks, ...rightLinks];

  const getHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : `/${href}`;
    }
    return href;
  };

  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!href.startsWith("#")) return; // let Next.js handle page links normally

    if (pathname === "/") {
      e.preventDefault();
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    // if not on home page, let the browser navigate to /#id naturally
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="relative w-full max-w-[950px] mx-auto flex">
        {/* Main content area with dark glassmorphism effect */}
        <div
          className="w-full relative z-50 rounded-b-[32px] md:rounded-b-[64px] overflow-hidden"
          style={{
            background:
              "linear-gradient(to bottom, rgba(10, 10, 10, 0.85) 0%, rgba(15, 15, 15, 0.75) 50%, rgba(20, 20, 20, 0.65) 100%)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            boxShadow:
              "0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderTop: "none",
          }}
        >
          {/* Content container */}
          <div className="relative flex items-center justify-between px-4 md:px-20 py-4 md:py-5">
            {/* Desktop Left section */}
            <div className="hidden lg:flex items-center gap-8 flex-1 justify-start">
              {leftLinks.map((link) => (
                <Link
                  key={link.name}
                  href={getHref(link.href)}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="text-white/90 hover:text-white text-base font-semibold transition-all duration-300 relative group whitespace-nowrap"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-white group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </div>

            {/* Center section - Brand Logo */}
            <Link href="/" className="z-50">
              <Image
                src="/images/Imran-Forge.png"
                alt="Logo"
                width={100}
                height={100}
                className="w-[80px] md:w-[100px] h-auto"
              />
            </Link>

            {/* Desktop Right section */}
            <div className="hidden lg:flex items-center gap-8 flex-1 justify-end">
              {rightLinks.map((link) => (
                <Link
                  key={link.name}
                  href={getHref(link.href)}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="text-white/90 hover:text-white text-base font-semibold transition-all duration-300 relative group whitespace-nowrap"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-white group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden flex-1 justify-end">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white p-2 z-50 relative"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl lg:hidden flex flex-col items-center justify-center gap-8 pt-20"
          >
            {allLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={getHref(link.href)}
                  onClick={(e) => {
                    handleAnchorClick(e, link.href);
                    setIsOpen(false);
                  }}
                  className="text-2xl md:text-3xl font-bold text-white hover:text-[#0080FF] transition-colors"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8"
            >
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-colors"
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
