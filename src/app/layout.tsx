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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="apple-mobile-web-app-title" content="Imran Forge" />
      </head>
      <body
        className={`${fontSans.variable} ${fontJakarta.variable} ${fontSora.variable} antialiased dark`}
      >
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
