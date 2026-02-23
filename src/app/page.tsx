import HomeContent from "@/components/sections/home/HomeContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Full-Stack SaaS Developer & React Native Engineer",
  description:
    "Imran Safdar is a Full-Stack SaaS Developer and React Native Engineer helping startups, SaaS founders, and agencies build scalable web applications, high-performance mobile apps, and modern digital platforms.",
  alternates: {
    canonical: "/",
  },
};

const HomePage = () => {
  return <HomeContent />;
};

export default HomePage;
