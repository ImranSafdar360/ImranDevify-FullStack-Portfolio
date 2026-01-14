import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import Providers from "@/components/Providers";

import "./globals.css";
import ShowOnNonAdmin from "@/components/ShowOnNonAdmin";
import Footer from "@/components/Footer";
import Navbar from "@/components/header/Navbar";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

// Boldonse font is loaded via CSS @font-face in globals.css
// This approach allows the build to succeed even if font files are not present
// The CSS will handle font loading gracefully with fallbacks

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} ${fontJakarta.variable} antialiased dark`}
      >
        <Providers>
          <header>
            <ShowOnNonAdmin>
              <Navbar />
            </ShowOnNonAdmin>
          </header>
          {children}
          <footer className="mt-[100px] mx-[30px]">
            <ShowOnNonAdmin>
              <Footer />
            </ShowOnNonAdmin>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
