"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import Logo from './header/Logo';
import { motion, useScroll, useMotionValueEvent, useSpring, useMotionValue } from 'motion/react';
import { cn } from "@/lib/utils";
import { Menu, X, ArrowUpRight } from "lucide-react";

// --- Magnetic Component ---
function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const position = { x: useMotionValue(0), y: useMotionValue(0) };

  const handleMouse = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    if (ref.current) {
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        position.x.set(middleX * 0.1); // Sensitivity
        position.y.set(middleY * 0.1);
    }
  };

  const reset = () => {
    position.x.set(0);
    position.y.set(0);
  };

  const { x, y } = position;
  // Smooth spring animation
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

// --- Main Navbar Component ---
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const scrolled = latest > 10;
    if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
    }
  });

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Portfolio', href: '/projects' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Contact', href: '/contact' },
  ];

  // Lock scroll
  useEffect(() => {
    if (isMobileMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
            "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
            isScrolled ? "bg-black/50 backdrop-blur-md border-b border-white/5 py-4" : "bg-transparent py-6"
        )}
      >
        <div className="max-w-[1440px] mx-auto px-6 flex items-center justify-between">
            {/* Logo */}
            <Magnetic>
                <div className="relative z-10 hover:scale-105 transition-transform duration-300">
                    <Logo />
                </div>
            </Magnetic>

            {/* Desktop Navigation - Clean Text Only */}
            <div className="hidden lg:flex items-center gap-8">
                {navigation.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Magnetic key={link.href}>
                             <Link
                                href={link.href}
                                className={cn(
                                    "relative text-sm font-medium tracking-wide transition-colors duration-200 group flex flex-col items-center",
                                    isActive ? "text-white" : "text-gray-400 hover:text-white"
                                )}
                             >
                                <span>{link.name}</span>
                                <span className={cn(
                                    "w-1 h-1 rounded-full bg-[#00C7FE] mt-1 transition-all duration-300",
                                    isActive ? "opacity-100 scale-100" : "opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100"
                                )}/>
                             </Link>
                        </Magnetic>
                    );
                })}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
                 <Magnetic>
                     <Link 
                        href="/contact"
                        className="hidden lg:flex items-center gap-2 text-sm font-medium text-white px-5 py-2.5 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all duration-300 group"
                     >
                        Let&apos;s Talk
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
                     </Link>
                 </Magnetic>

                {/* Mobile Hamburger */}
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="lg:hidden p-2 text-white hover:text-gray-300 transition-colors"
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>
        </div>
      </motion.nav>

      {/* High-Performance Mobile Overlay (Standard Transform Sheet) */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isMobileMenuOpen ? "0%" : "100%" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} // Custom cubic bezier for premium feel
        className="fixed inset-0 z-[60] bg-[#050505] lg:hidden flex flex-col px-6 py-8"
        style={{ willChange: "transform" }}
      >
        <div className="flex items-center justify-between mb-12">
            <Logo />
            <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full border border-white/10 hover:bg-white/10 text-white transition-colors"
            >
                <X className="w-6 h-6" />
            </button>
        </div>

        <nav className="flex flex-col gap-6">
            {navigation.map((link, i) => (
                <div key={link.href} className="overflow-hidden">
                     <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: isMobileMenuOpen ? "0%" : "100%" }}
                        transition={{ duration: 0.5, delay: 0.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                     >
                        <Link
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={cn(
                                "text-4xl font-bold tracking-tight inline-flex items-center gap-4 transition-colors",
                                pathname === link.href ? "text-white" : "text-gray-500 hover:text-white"
                            )}
                            style={{ fontFamily: 'var(--font-boldonse)' }}
                        >
                            {link.name}
                            {pathname === link.href && <span className="w-3 h-3 rounded-full bg-[#00C7FE]" />}
                        </Link>
                     </motion.div>
                </div>
            ))}
        </nav>

        <div className="mt-auto border-t border-white/10 pt-8">
            <p className="text-gray-500 mb-4">Socials</p>
            <div className="flex gap-6">
                {['Twitter', 'GitHub', 'LinkedIn', 'Instagram'].map((social) => (
                    <a key={social} href="#" className="text-white hover:text-[#00C7FE] transition-colors">{social}</a>
                ))}
            </div>
        </div>
      </motion.div>
    </>
  );
}
