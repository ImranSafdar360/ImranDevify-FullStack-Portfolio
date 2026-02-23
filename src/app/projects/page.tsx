import ProjectsContent from "@/components/sections/projects/ProjectsContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SaaS & Mobile App Case Studies",
  description:
    "Explore real SaaS platforms, full-stack web applications, and React Native mobile apps built by Imran Safdar. See architecture decisions, scalability strategies, and performance-focused development.",
  alternates: {
    canonical: "/projects",
  },
};

const ProjectsPage = () => {
  return <ProjectsContent />;
};

export default ProjectsPage;
