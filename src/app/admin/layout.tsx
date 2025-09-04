import { Metadata } from "next";
import AdminClientLayout from "./AdminClientLayout";
import { generateMetadata as generateSEO } from "@/lib/seo";
import React from "react";

const baseMetadata = generateSEO({
  title: "Admin Dashboard",
  description:
    "Admin panel for managing portfolio content, projects, skills, testimonials, and messages.",
  url: "/admin",
  image: "/og-default.png",
  type: "website",
  section: "Admin",
  tags: ["Admin", "Dashboard", "Portfolio CMS"],
});

export const metadata: Metadata = {
  ...baseMetadata,
  other: {
    ...(baseMetadata.other as Record<string, string | number | (string | number)[]> | undefined),
    "color-scheme": "light" as const,
    "theme-color": "#faf3e0" as const,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminClientLayout>{children}</AdminClientLayout>;
}
