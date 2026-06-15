import "locomotive-scroll/dist/locomotive-scroll.css";
import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Instrument_Serif,
  Plus_Jakarta_Sans,
  Sora,
} from "next/font/google";
import Providers from "@/components/layout/providers/Providers";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Nav from "@/components/layout/Nav";
import SmoothScroll from "@/components/layout/SmoothScroll";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const fontSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: "400",
  style: ["normal", "italic"],
});

/* LEGACY fonts — still referenced by existing components; remove once
   those components are replaced in the redesign. */
const fontJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const fontSora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://imrandevify.online"),
  title: {
    default: "Imran Safdar — AI-Product Engineer | AI-Powered SaaS & Mobile",
    template: "%s | Imran Safdar — AI-Product Engineer",
  },
  description:
    "I build AI-powered SaaS products end-to-end for founders — architecture, interface, and the intelligence inside. React Native and Next.js. Based in Lahore, working globally.",
  keywords: [
    "AI-product engineer",
    "AI-powered SaaS",
    "React Native developer",
    "Next.js developer",
    "AI integration",
    "SaaS MVP",
    "Lahore",
    "fractional engineer",
  ],
  authors: [{ name: "Imran Safdar" }],
  creator: "Imran Safdar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://imrandevify.online",
    siteName: "Imran Safdar",
    title: "Imran Safdar — AI-Product Engineer | AI-Powered SaaS & Mobile",
    description:
      "I build AI-powered SaaS products end-to-end for founders — architecture, interface, and the intelligence inside. React Native and Next.js. Based in Lahore, working globally.",
    // TODO: replace og-image with new AI-product-engineer share card (1200x630)
    images: [
      {
        url: "/images/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Imran Safdar — AI-Product Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Imran Safdar — AI-Product Engineer | AI-Powered SaaS & Mobile",
    description:
      "I build AI-powered SaaS products end-to-end for founders — architecture, interface, and the intelligence inside. React Native and Next.js. Based in Lahore, working globally.",
    // TODO: replace og-image with new AI-product-engineer share card (1200x630)
    images: ["/images/og-image.webp"],
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
    <html
      lang="en"
      className={`dark ${fontSans.variable} ${fontMono.variable} ${fontSerif.variable} ${fontJakarta.variable} ${fontSora.variable}`}
    >
      <head>
        <link
          href="https://assets.calendly.com/assets/external/widget.css"
          rel="stylesheet"
        />
        <script
          src="https://assets.calendly.com/assets/external/widget.js"
          type="text/javascript"
          async
        ></script>
      </head>
      <body className="bg-bg text-text font-sans antialiased min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Imran Safdar",
              url: "https://imrandevify.online",
              jobTitle: "AI-Product Engineer",
              description:
                "AI-product engineer building AI-powered SaaS products and React Native apps end-to-end for founders — architecture, interface, and the intelligence inside.",
              sameAs: [
                "https://www.linkedin.com/in/imran-safdar",
                "https://github.com/imran-safdar",
              ],
              knowsAbout: [
                "AI-powered SaaS",
                "AI integration",
                "React Native",
                "Next.js",
                "Product engineering",
                "SaaS MVP development",
              ],
            }),
          }}
        />
        <Providers>
          <Nav />
          <SmoothScroll>
            <main className="min-h-screen">{children}</main>
          </SmoothScroll>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
