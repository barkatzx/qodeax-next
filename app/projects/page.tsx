import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { getProjects } from "@/lib/content";
import { ProjectExplorer } from "./ProjectExplorer";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected software projects by Qodeax — web applications, SaaS platforms, mobile apps, and operational systems built for real use.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <PageHeader
        eyebrow="Selected work"
        title="Products we have helped design, build, and launch."
        description="A selection of client and product work across web applications, SaaS platforms, mobile apps, and operational systems."
      />
      <ProjectExplorer projects={projects} />
    </>
  );
}
