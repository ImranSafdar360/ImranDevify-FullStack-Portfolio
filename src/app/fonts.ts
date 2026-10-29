import { Geist_Mono, Mohave, Rock_Salt } from "next/font/google";
import localFont from "next/font/local";

// Only fonts used above the fold are preloaded (Mohave headlines, Satoshi body); the rest load after
// without competing for bandwidth with the first paint (Lighthouse LCP, CP1).

// Display headlines (05-theme §2): uppercase, 700 only.
export const mohave = Mohave({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-mohave",
  display: "swap",
});

// Body and UI: one variable file (300–900) instead of three static weights. Self-hosted from Fontshare (ITF FFL).
export const satoshi = localFont({
  src: "../fonts/satoshi-variable.woff2",
  weight: "300 900",
  style: "normal",
  variable: "--font-satoshi",
  display: "swap",
});

// Handwritten annotations, short labels only.
export const rockSalt = Rock_Salt({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-rock-salt",
  display: "swap",
  preload: false,
});

// Small mono labels: a single weight keeps it light.
export const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-geist-mono",
  display: "swap",
  preload: false,
});

export const fontVariables = [mohave.variable, satoshi.variable, rockSalt.variable, geistMono.variable].join(" ");
