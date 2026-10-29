import type { Metadata } from "next";
import { WiggleFilter } from "@/components/ui/wiggle-filter";
import { MotionLayer } from "@/lib/motion/motion-layer";
import { fontVariables } from "./fonts";
import "@/styles/base.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://imrandevify.online"),
  title: {
    default: "Imran Safdar — Portfolio",
    template: "%s | Imran Safdar",
  },
  description: "The personal portfolio of product engineer Imran Safdar.",
  authors: [{ name: "Imran Safdar" }],
  creator: "Imran Safdar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://imrandevify.online",
    siteName: "Imran Safdar",
    title: "Imran Safdar — Portfolio",
    description: "The personal portfolio of product engineer Imran Safdar.",
  },
  twitter: {
    card: "summary",
    title: "Imran Safdar — Portfolio",
    description: "The personal portfolio of product engineer Imran Safdar.",
    creator: "@imransafdar",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <WiggleFilter />
        {children}
        <MotionLayer />
      </body>
    </html>
  );
}
