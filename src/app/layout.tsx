import "locomotive-scroll/dist/locomotive-scroll.css";
import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Sora } from "next/font/google";
import Providers from "@/components/layout/providers/Providers";
import "./globals.css";
import Footer from "@/components/layout/footer/Footer";
import Navbar from "@/components/layout/header/Navbar";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Preloader from "@/components/shared/Preloader";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

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
  metadataBase: new URL("https://imran-devify.com"),
  title: {
    template: "%s | Imran Safdar – SaaS & React Native Engineer",
    default: "Imran Safdar – Full-Stack SaaS Developer & React Native Engineer",
  },
  description:
    "Full-Stack SaaS Developer and React Native Engineer helping startups, SaaS founders, and digital agencies build scalable web applications, mobile apps, and high-performance digital products using Next.js, MERN Stack, and modern architecture.",
  keywords: [
    "SaaS Developer",
    "Full-Stack Developer",
    "React Native Developer",
    "Next.js Developer",
    "MERN Stack Developer",
    "Startup App Developer",
    "SaaS Application Development",
    "Mobile App Developer",
    "Imran Safdar",
  ],
  authors: [{ name: "Imran Safdar" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://imran-devify.com",
    siteName: "Imran Safdar Portfolio",
    title: "Imran Safdar – Full-Stack SaaS Developer & React Native Engineer",
    description:
      "Helping SaaS founders and agencies build scalable web platforms, mobile apps, and high-performance digital products.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Imran Safdar – SaaS & React Native Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Imran Safdar – Full-Stack SaaS Developer & React Native Engineer",
    description:
      "Building scalable SaaS platforms, modern web apps, and cross-platform mobile applications.",
    images: ["/images/og-image.png"],
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
    <html lang="en" className="dark">
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
      <body
        className={`${fontSans.variable} ${fontJakarta.variable} ${fontSora.variable} antialiased dark`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Imran Safdar",
              url: "https://imran-devify.com",
              jobTitle: "Full-Stack SaaS Developer & React Native Engineer",
              description:
                "Full-Stack Developer specializing in SaaS platforms, scalable web applications, and cross-platform mobile app development using Next.js, MERN Stack, and React Native.",
              sameAs: [
                "https://www.linkedin.com/in/imran-safdar",
                "https://github.com/imran-safdar",
              ],
              knowsAbout: [
                "SaaS Development",
                "React Native App Development",
                "Next.js Development",
                "MERN Stack",
                "Startup MVP Development",
                "API Integration",
              ],
            }),
          }}
        />
        <Preloader />
        <Providers>
          <header>
            <Navbar />
          </header>
          <SmoothScroll>{children}</SmoothScroll>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
