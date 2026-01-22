"use client";

import Link from "next/link";
import Logo from "./header/Logo";
import { Github, Linkedin, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/imran-safdar",
      icon: Linkedin,
    },
    {
      name: "Twitter",
      href: "https://twitter.com/imran_safdar",
      icon: Twitter,
    },
    { name: "GitHub", href: "https://github.com/imran-safdar", icon: Github },
    {
      name: "Instagram",
      href: "https://instagram.com/imran_safdar",
      icon: Instagram,
    },
  ];

  const navLinks = [
    { name: "Work", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blogs" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="relative w-full py-20 px-6 overflow-hidden bg-black">
      {/* Creative Background Text */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 pointer-events-none select-none">
        <h2
          className="text-[12rem] md:text-[24rem] font-bold text-white/[0.03] whitespace-nowrap tracking-tighter"
          style={{ fontFamily: "var(--font-boldonse)" }}
        >
          IMRAN SAFDAR
        </h2>
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-12">
          {/* Logo & Slogan Column */}
          <div className="flex flex-col gap-8 max-w-sm">
            <div className="flex items-center gap-2">
              <Logo />
            </div>
            <p className="text-gray-500 text-lg leading-relaxed">
              Based in Pakistan. <br />
              Working with clients worldwide.
            </p>
            <div className="flex items-center gap-6">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                  <span className="sr-only">{social.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation & Copyright Column */}
          <div className="flex flex-col gap-8 items-start md:items-end w-full md:w-auto">
            <nav>
              <ul className="flex flex-wrap gap-x-8 gap-y-4">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-lg font-medium"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-sm text-gray-500 w-full md:w-auto justify-between border-t border-white/5 pt-8 md:border-none md:pt-0">
              <p>© {currentYear} —— Built with ❤️ by Imran Safdar</p>
              <div className="flex items-center gap-4">
                <Link
                  href="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy
                </Link>
                <Link
                  href="/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
