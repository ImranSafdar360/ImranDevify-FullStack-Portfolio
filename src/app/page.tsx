import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { AboutBuilderJourney } from "@/components/sections/AboutBuilderJourney";
import { BlarecastProject } from "@/components/sections/BlarecastProject";
import { ContactAvailability } from "@/components/sections/ContactAvailability";
import { EngineeringCapabilities } from "@/components/sections/EngineeringCapabilities";
import { ExperienceProgression } from "@/components/sections/ExperienceProgression";
import { Hero } from "@/components/sections/Hero";
import { PrivateProductionSaaSProject } from "@/components/sections/PrivateProductionSaaSProject";
import { SelectedWorkIntro } from "@/components/sections/SelectedWorkIntro";
import { YourBusinessDateProject } from "@/components/sections/YourBusinessDateProject";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SelectedWorkIntro />
        <BlarecastProject />
        <YourBusinessDateProject />
        <PrivateProductionSaaSProject />
        <EngineeringCapabilities />
        <ExperienceProgression />
        <AboutBuilderJourney />
        <ContactAvailability />
      </main>
      <Footer />
    </>
  );
}
