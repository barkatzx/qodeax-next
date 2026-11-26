import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { Section } from "@/components/layout/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

const healthcarePattern =
  /medicare|medical|health|diagnostic|clinic|hospital|patient|pharma/i;

function isHealthcareProject(project: Project) {
  return healthcarePattern.test(
    [project.title, ...(project.categories ?? []), ...(project.technologies ?? [])].join(" "),
  );
}

export function ProjectsPreview({ projects }: { projects: Project[] }) {
  if (!projects.length) return null;

  // Keep healthcare-related product previews off the landing page while the
  // full archive remains available on /projects.
  const nonHealthcare = projects.filter((project) => !isHealthcareProject(project));
  const pool = nonHealthcare.length ? nonHealthcare : projects;
  const visible = pool.slice(0, 3);

  return (
    <Section id="work" className="relative overflow-hidden border-y border-line bg-surface">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-fine mask-fade-radial opacity-40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-1/3 size-[460px] rounded-full bg-[radial-gradient(closest-side,rgba(58,222,150,0.09),transparent_72%)] blur-2xl"
      />

      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <Reveal>
          <SectionHeading
            eyebrow="Selected work"
            title="Products we have helped bring to life."
            titleClassName="max-w-xl"
          />
        </Reveal>
        <Reveal delay={100}>
          <ButtonLink href="/projects" variant="secondary" size="sm" data-magnetic>
            View all projects
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </ButtonLink>
        </Reveal>
      </div>

      <div
        className={cn(
          "relative mt-10 grid gap-4 sm:grid-cols-2",
          visible.length >= 3 && "lg:grid-cols-3",
        )}
      >
        {visible.map((project, index) => (
          <Reveal key={project._id} delay={index * 70} className="h-full">
            <ProjectCard project={project} priority={index === 0} />
          </Reveal>
        ))}
      </div>

      <div className="relative mt-6 flex flex-col items-start justify-between gap-3 border-t border-line pt-5 sm:flex-row sm:items-center">
        <p className="text-[11.5px] text-ink-soft">
          Project details and links are managed in our content workspace.{" "}
          <Link href="/projects" className="font-medium text-brand-deep hover:underline">
            Browse the full archive
          </Link>
          .
        </p>
        <Link
          href="/projects"
          className="group inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.12em] text-ink-muted uppercase transition-colors hover:text-ink"
        >
          All work
          <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </Link>
      </div>
    </Section>
  );
}
