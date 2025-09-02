import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "../components/Providers";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StructuredData from "../components/StructuredData";
import PerformanceMonitor from "../components/PerformanceMonitor";
import Analytics from "../components/Analytics";
import CookieConsent from "../components/CookieConsent";
import PWAInstallPrompt from "../components/PWAInstallPrompt";
import ServiceWorkerRegistration from "../components/ServiceWorkerRegistration";
import { generateMetadata as generateSEOMetadata } from "../lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap',
});

export const metadata: Metadata = generateSEOMetadata({
  title: "Imran Safdar - Full Stack Developer Portfolio",
  description: "Full-stack developer passionate about creating innovative solutions and building exceptional digital experiences. Specializing in Next.js, React, Node.js, and MongoDB.",
  keywords: ["Imran Safdar", "Full Stack Developer", "Portfolio", "Next.js", "React", "Node.js", "MongoDB", "Web Development", "JavaScript", "TypeScript"],
  url: "/",
  image: "/api/og?title=Imran Safdar - Full Stack Developer&description=Full-stack developer passionate about creating innovative solutions",
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#3b82f6' },
    { media: '(prefers-color-scheme: dark)', color: '#3b82f6' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <StructuredData />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Imran Safdar Portfolio" />
        <link rel="apple-touch-icon" href="/android-chrome-192x192.png" />
      </head>
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col`}>
        <Providers>
          <ServiceWorkerRegistration />
          <Analytics />
          <PerformanceMonitor />
          <Navbar />
          <main className="flex-1" id="main-content">
            {children}
          </main>
          <Footer />
          <CookieConsent />
          <PWAInstallPrompt />
        </Providers>
      </body>
    </html>
  );
}
