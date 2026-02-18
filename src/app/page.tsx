import HomeContent from "@/components/sections/home/HomeContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Imran Safdar | Full-Stack & React Native Engineer",
  description:
    "Explore the portfolio of Imran Safdar, a Digital Engineer specializing in high-performance SaaS products, mobile apps, and scalable web solutions.",
  alternates: {
    canonical: "/",
  },
};

const HomePage = () => {
  return <HomeContent />;
};

export default HomePage;
