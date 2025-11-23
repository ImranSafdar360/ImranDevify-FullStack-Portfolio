'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import Logo from './header/Logo';
import CustomButton from './Button';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'motion/react';

export default function Navbar() {
  const [scrollY, setScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Portfolio', href: '/projects' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Contact', href: '/contact' },
  ];

  // Calculate scroll progress from 0 to 30px
  const scrollProgress = Math.min(Math.max((scrollY - 10) / 20, 0), 1); // 0 at 10px, 1 at 30px
  const isScrolled = scrollY > 10;

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Set initial scroll position
    setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!navRef.current) return;
    const rect = navRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleResumeClick = () => {
    console.log('Resume clicked');
  };

  // Interpolate values based on scroll progress (0 to 1 from 10px to 30px scroll)
  const topOffset = scrollProgress * 30; // 0px to 30px
  const maxWidth = 1152; // max-w-6xl equivalent (1152px)
  
  // Background opacity interpolation
  const bgOpacity = scrollProgress * 0.85; // 0 to 0.85
  const borderOpacity = 0.08 + scrollProgress * 0.07; // 0.08 to 0.15
  const backdropBlur = scrollProgress * 16; // 0 to 16px
  const backdropSaturate = scrollProgress * 180; // 0 to 180%

  return (
    <motion.nav
      className="w-full fixed z-50"
      initial={false}
      animate={{
        top: `${topOffset}px`,
        paddingTop: isScrolled ? '12px' : '16px',
        paddingBottom: isScrolled ? '12px' : '16px',
        paddingLeft: isScrolled ? '24px' : '0',
        paddingRight: isScrolled ? '24px' : '0',
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
    >
      <motion.div
        ref={navRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={false}
        animate={{
          width: isScrolled ? `${maxWidth}px` : '100%',
          maxWidth: isScrolled ? `${maxWidth}px` : '100%',
          marginLeft: isScrolled ? 'auto' : '0',
          marginRight: isScrolled ? 'auto' : '0',
          backgroundColor: `rgba(15, 15, 15, ${bgOpacity})`,
          borderColor: `rgba(255, 255, 255, ${borderOpacity})`,
          backdropFilter: `blur(${backdropBlur}px) saturate(${backdropSaturate}%)`,
        }}
        className="h-14 md:h-16 rounded-xl px-4 md:px-6 flex items-center justify-between relative overflow-hidden border"
        style={{
          WebkitBackdropFilter: `blur(${backdropBlur}px) saturate(${backdropSaturate}%)`,
          boxShadow: isScrolled
            ? '0 4px 24px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            : 'none',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Interactive light effect */}
        <motion.div
          className="absolute pointer-events-none opacity-0 group-hover:opacity-100"
          style={{
            left: springX,
            top: springY,
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(0, 195, 255, 0.15) 0%, transparent 70%)',
            transform: 'translate(-50%, -50%)',
            transition: 'opacity 0.3s',
          }}
        />

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10 flex-shrink-0">
          <Logo />
        </div>

        {/* Desktop Navigation - Centered */}
        <div
          className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 px-2 py-1.5 rounded-lg"
          style={{
            fontFamily: 'var(--font-jakarta), sans-serif',
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(8px)',
          }}
        >
          {navigation.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 rounded-md transition-all duration-200 group"
              >
                <span
                  className={`relative z-10 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'text-white'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.name}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="navActiveBg"
                    className="absolute inset-0 bg-white/10 rounded-md border border-white/20"
                    initial={false}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
                {!isActive && (
                  <motion.div
                    className="absolute inset-0 bg-white/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTA Button */}
        <div className="hidden lg:block relative z-10 flex-shrink-0">
          <CustomButton onClick={handleResumeClick}>Resume</CustomButton>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden relative z-10 w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          <div className="relative w-5 h-4">
            <motion.span
              animate={{
                rotate: isMobileMenuOpen ? 45 : 0,
                y: isMobileMenuOpen ? 6 : 0,
              }}
              className="absolute top-0 left-0 w-full h-0.5 bg-white rounded-full"
            />
            <motion.span
              animate={{
                opacity: isMobileMenuOpen ? 0 : 1,
              }}
              className="absolute top-1/2 left-0 w-full h-0.5 bg-white rounded-full -translate-y-1/2"
            />
            <motion.span
              animate={{
                rotate: isMobileMenuOpen ? -45 : 0,
                y: isMobileMenuOpen ? -6 : 0,
              }}
              className="absolute bottom-0 left-0 w-full h-0.5 bg-white rounded-full"
            />
          </div>
        </button>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-20 left-4 right-4 rounded-2xl z-50 lg:hidden overflow-hidden border border-white/10"
              style={{
                background: 'rgba(15, 15, 15, 0.95)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              }}
            >
              <div className="p-4 space-y-1">
                {navigation.map((link, index) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                          isActive
                            ? 'text-white bg-white/10 border border-white/20'
                            : 'text-white/80 hover:text-white hover:bg-white/5'
                        }`}
                        style={{ fontFamily: 'var(--font-jakarta), sans-serif' }}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navigation.length * 0.05 }}
                  className="pt-4 mt-4 border-t border-white/10"
                >
                  <CustomButton onClick={handleResumeClick}>Resume</CustomButton>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

