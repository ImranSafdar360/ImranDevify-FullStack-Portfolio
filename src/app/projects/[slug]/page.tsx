import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { projects } from "@/data/projectData";
import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";
import ProjectGallery from "@/components/sections/project-detail/ProjectGallery";
import ProjectContent from "@/components/sections/project-detail/ProjectContent";
import ProjectNavigation from "@/components/sections/project-detail/ProjectNavigation";
import SectionSeparator from "@/components/shared/SectionSeparator";
import { ArrowButton } from "@/components/ui/FloatingButton";
interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [
        {
          url: project.image,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="relative w-full min-h-screen flex flex-col items-center py-[130px]">
      <div className="fixed top-10 md:top-16 left-4 md:left-8 z-50 group">
        <ArrowButton href={`/projects`} direction="left" label={`Back`} />
      </div>
      <Section className="flex flex-col items-center gap-[84px] container mx-auto px-0 md:px-0 lg:px-0 xl:px-0">
        <SectionHeader
          className="max-w-full md:max-w-[70%] lg:max-w-[55%] items-center gap-[16px] z-20"
          title={project.title}
          description={project.description}
          badgeText={project.category}
        />
      </Section>

      {/* Gallery Section */}
      <div className="w-full my-16">
        <ProjectGallery images={project.gallery || [project.image]} />
      </div>

      {/* Project Details Content Section */}
      <ProjectContent project={project} />

      <SectionSeparator
        orientation="horizontal"
        color="FFFFFF"
        centerOpacity={0.1}
        className="w-full opacity-50"
      />

      {/* Project Navigation Section */}
      <ProjectNavigation currentSlug={slug} />
    </main>
  );
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}
