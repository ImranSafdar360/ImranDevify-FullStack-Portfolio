import { Inter } from "next/font/google";
import Providers from "@/components/Providers";

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShowOnNonAdmin from "@/components/ShowOnNonAdmin";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scheme-only-dark">
      <body className={`${fontSans.variable} font-sans antialiased`}>
        <Providers>
          <header>
            <ShowOnNonAdmin>
              <Navbar />
            </ShowOnNonAdmin>
          </header>
          {children}
          <footer>
            <ShowOnNonAdmin>
              <Footer />
            </ShowOnNonAdmin>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
