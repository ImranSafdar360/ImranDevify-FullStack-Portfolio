import { Inter, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import Providers from "@/components/Providers";

import "./globals.css";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const fontBoldonse = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-boldonse",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable} ${fontJakarta.variable} ${fontBoldonse.variable} antialiased dark`}>
        <Providers>
          {/* <header>
            <ShowOnNonAdmin>
              <Navbar />
            </ShowOnNonAdmin>
          </header> */}
          {children}
          {/* <footer className="mt-[100px] mx-[30px]">
            <ShowOnNonAdmin>
              <Footer />
            </ShowOnNonAdmin>
          </footer> */}
        </Providers>
      </body>
    </html>
  );
}
