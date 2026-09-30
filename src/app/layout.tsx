import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import "@/styles/global.css";

const fontshareStylesheet =
  "https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@700,800&f[]=satoshi@400,500,700&display=swap";

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
    <html lang="en" className={GeistMono.variable}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href={fontshareStylesheet} />
      </head>
      <body>{children}</body>
    </html>
  );
}
