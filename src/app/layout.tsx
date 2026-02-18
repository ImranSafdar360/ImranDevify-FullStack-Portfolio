import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Sora } from "next/font/google";
import Providers from "@/components/layout/providers/Providers";
import "./globals.css";
import Footer from "@/components/layout/footer/Footer";
import Navbar from "@/components/layout/header/Navbar";

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
  title: {
    template: "%s | Imran Devify Portfolio",
    default: "Imran Safdar | Full-Stack & React Native Engineer",
  },
  description:
    "Imran Safdar is a specialized Full-Stack Engineer and React Native developer, crafting high-performance, conversion-focused digital products for SaaS founders and agencies.",
  keywords: [
    "Full-Stack Developer",
    "React Native Engineer",
    "Next.js Expert",
    "MERN Stack",
    "SaaS Development",
    "Imran Safdar",
    "Devify",
  ],
  authors: [{ name: "Imran Safdar" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://imran-devify.com", // Replace with real domain if available
    siteName: "Imran Devify Portfolio",
    title: "Imran Safdar | Digital Engineer",
    description: "Building scalable and high-performance digital products.",
    images: [
      {
        url: "/images/og-image.png", // Ensure this exists or I should create it
        width: 1200,
        height: 630,
        alt: "Imran Safdar Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Imran Safdar | Digital Engineer",
    description: "Building scalable and high-performance digital products.",
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
              jobTitle: "Full-Stack Engineer",
              description:
                "Digital Engineer specializing in high-performance SaaS products and mobile apps.",
              sameAs: [
                "https://www.linkedin.com/in/imran-safdar",
                "https://github.com/imran-safdar",
              ],
            }),
          }}
        />
        <Providers>
          <header>
            <Navbar />
          </header>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
