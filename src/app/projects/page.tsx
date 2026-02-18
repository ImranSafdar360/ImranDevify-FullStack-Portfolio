import ProjectsContent from "@/components/sections/projects/ProjectsContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Explore a curated collection of real client work and proven results. From full-stack SaaS platforms to cross-platform mobile apps, see how Imran Safdar solves complex problems with code.",
  alternates: {
    canonical: "/projects",
  },
};

const ProjectsPage = () => {
  return <ProjectsContent />;
};

export default ProjectsPage;
