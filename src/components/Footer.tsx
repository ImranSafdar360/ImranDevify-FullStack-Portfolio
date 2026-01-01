"use client";

import Link from "next/link";
import { motion } from "motion/react";
import Logo from "./header/Logo";
import { Github, Linkedin, Twitter, Instagram, ArrowUpRight } from "lucide-react";
import GradientText from "./ui/gradient-text";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
         // Handle other potential in-page links if any, otherwise navigate
         // For now assuming mostly pages which Next.js Link handles, but 
         // if we want smooth scroll locally we can add logic.
         // Simple fallback for actual pages:
         window.location.href = href;
    }
  };

  const socialLinks = [
    { name: "GitHub", href: "https://github.com/imran-safdar", icon: Github },
    { name: "LinkedIn", href: "https://linkedin.com/in/imran-safdar", icon: Linkedin },
    { name: "Twitter", href: "https://twitter.com/imran_safdar", icon: Twitter },
    { name: "Instagram", href: "https://instagram.com/imran_safdar", icon: Instagram },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Portfolio", href: "/projects" },
    { name: "Blogs", href: "/blogs" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="relative w-full mt-20 px-6 pb-8">
      <div className="max-w-[1440px] mx-auto relative rounded-[32px] overflow-hidden bg-white/5 border border-white/10 backdrop-blur-2xl">
        
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00C7FE]/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0080FF]/10 blur-[120px] rounded-full pointer-events-none translate-y-1/2 -translate-x-1/3" />

        <div className="relative z-10 p-8 md:p-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            
            {/* Brand Column */}
            <div className="col-span-1 md:col-span-5 flex flex-col gap-6">
              <div className="flex items-center gap-2">
                <Logo />
              </div>
              <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                Crafting digital experiences that blend <span className="text-white font-medium">beauty</span> with <span className="text-white font-medium">performance</span>. Let's build something extraordinary together.
              </p>
              
              <div className="flex items-center gap-4 mt-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 hover:scale-110 transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5" />
                    <span className="sr-only">{social.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Navigation Column */}
            <div className="col-span-1 md:col-span-3 md:col-start-7">
              <h3 className="text-white font-bold text-xl mb-6" style={{ fontFamily: 'var(--font-boldonse)' }}>Explore</h3>
              <ul className="flex flex-col gap-4">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                        href={link.href}
                        className="group flex items-center gap-2 text-gray-400 hover:text-[#00C7FE] transition-colors"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00C7FE] opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact / CTA Column */}
            <div className="col-span-1 md:col-span-3">
              <h3 className="text-white font-bold text-xl mb-6" style={{ fontFamily: 'var(--font-boldonse)' }}>Get present</h3>
              
              <div className="flex flex-col gap-4">
                 <Link href="mailto:contact@imran.dev" className="group">
                    <span className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-1 block group-hover:text-[#00C7FE] transition-colors">Email me</span>
                    <span className="text-white text-lg font-medium group-hover:underline decoration-[#00C7FE] decoration-2 underline-offset-4">contact@imran.dev</span>
                 </Link>
                 
                 <div className="pt-4">
                    <Link 
                        href="/contact"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold hover:bg-[#00C7FE] hover:text-white transition-all duration-300 group"
                    >
                        Start a Project
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
                    </Link>
                 </div>
              </div>
            </div>

          </div>

          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-gray-500 text-sm">
              © {currentYear} Imran Safdar. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
               <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
               <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom attribution outside the card */}
      <div className="w-full text-center mt-6">
        <p className="text-[#C9C9C9]/40 text-sm flex items-center justify-center gap-2">
           Designed with <span className="animate-pulse text-red-500">❤️</span> by Amina Gul
        </p>
      </div>
    </footer>
  );
}
