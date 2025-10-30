import { Inter, Anton } from "next/font/google";
import Providers from "@/components/Providers";

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShowOnNonAdmin from "@/components/ShowOnNonAdmin";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontAnton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable} ${fontAnton.variable} font-sans antialiased dark`}>
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
