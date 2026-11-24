import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Project } from "@/lib/types";

export function ProjectsPreview({ projects }: { projects: Project[] }) {
  if (!projects.length) return null;

  return (
    <Section id="work" className="border-y border-line bg-surface">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <Reveal>
          <SectionHeading
            eyebrow="Selected work"
            title="Products we have helped bring to life."
            titleClassName="max-w-xl"
          />
        </Reveal>
        <Reveal delay={100}>
          <ButtonLink href="/projects" variant="secondary" size="sm">
            View all projects
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </ButtonLink>
        </Reveal>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.slice(0, 3).map((project, index) => (
          <Reveal key={project._id} delay={index * 70} className="h-full">
            <ProjectCard project={project} priority={index === 0} />
          </Reveal>
        ))}
      </div>

      <p className="mt-6 text-[11.5px] text-ink-soft">
        Project details and links are managed in our content workspace.{" "}
        <Link href="/projects" className="font-medium text-brand-deep hover:underline">
          Browse the full archive
        </Link>
        .
      </p>
    </Section>
  );
}
