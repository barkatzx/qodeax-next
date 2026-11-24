import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "next-sanity";
import type { PortableTextBlock } from "@portabletext/react";
import {
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Code2,
  ExternalLink,
  Github,
  Globe,
  Layers,
  Server,
} from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { CTASection } from "@/components/sections/CTASection";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/data/site";
import { getProjectBySlug, getProjectSlugs } from "@/lib/content";
import { sanityImageUrl } from "@/lib/utils";
import { components } from "@/sanity/portabletext";

export const revalidate = 60;

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjectSlugs();
  return projects.map((project) => ({ slug: project.slug.current }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(decodeURIComponent(slug));

  if (!project) return { title: "Project not found" };

  const description = `${project.title} — a software project by Qodeax.`;

  return {
    title: project.title,
    description,
    alternates: { canonical: `/projects/${project.slug.current}` },
    openGraph: {
      title: `${project.title} | Qodeax`,
      description,
      url: `/projects/${project.slug.current}`,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(decodeURIComponent(slug));

  if (!project) notFound();

  const imageUrl = sanityImageUrl(project.mainImage?.asset?.url, 1600, 900);
  const categories = project.categories ?? [];
  const hasLinks =
    Boolean(project.liveLink) ||
    Boolean(project.clientRepo) ||
    Boolean(project.serverRepo);

  return (
    <>
      <div className="pt-8">
        <Container>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-ink-soft transition-colors hover:text-ink"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            All projects
          </Link>
        </Container>
      </div>

      <PageHeader
        eyebrow={categories.length ? categories.join(" · ") : "Project"}
        title={project.title}
        description={
          categories.length
            ? `A ${categories.slice(0, 2).join(" / ").toLowerCase()} engagement delivered by Qodeax.`
            : "A software engagement delivered by Qodeax."
        }
      >
        {project.liveLink ? (
          <ButtonLink href={project.liveLink} size="lg" className="w-full sm:w-auto">
            View live project
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </ButtonLink>
        ) : null}
        <ButtonLink
          href="/#contact"
          variant="secondary"
          size="lg"
          className="w-full sm:w-auto"
        >
          Start a similar project
        </ButtonLink>
      </PageHeader>

      <section className="pb-14 sm:pb-18">
        <Container>
          <Reveal>
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-line bg-mist">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={project.title}
                  fill
                  priority
                  sizes="(max-width: 1200px) 100vw, 1100px"
                  className="object-cover"
                />
              ) : (
                <div className="flex size-full items-center justify-center bg-[radial-gradient(60%_60%_at_50%_40%,rgba(58,222,150,0.18),transparent_72%)]">
                  <span className="font-heading text-5xl font-semibold text-ink/15">Q</span>
                </div>
              )}
            </div>
          </Reveal>
        </Container>
      </section>

      <Section contained={false} className="pt-0 pb-20 sm:pb-24 lg:pb-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-8">
              {project.body?.length ? (
                <Reveal>
                  <Card className="p-6 sm:p-8">
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-xl bg-brand-soft text-brand-deep">
                        <BookOpen className="size-[18px]" aria-hidden="true" />
                      </span>
                      <h2 className="font-heading text-xl font-semibold tracking-[-0.025em] text-ink">
                        Project overview
                      </h2>
                    </div>
                    <div className="article-body mt-5">
                      <PortableText
                        value={project.body as PortableTextBlock[]}
                        components={components}
                      />
                    </div>
                  </Card>
                </Reveal>
              ) : null}

              {project.features?.length ? (
                <Reveal delay={60}>
                  <Card className="p-6 sm:p-8">
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-xl bg-brand-soft text-brand-deep">
                        <Layers className="size-[18px]" aria-hidden="true" />
                      </span>
                      <h2 className="font-heading text-xl font-semibold tracking-[-0.025em] text-ink">
                        Key features
                      </h2>
                    </div>
                    <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                      {project.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 rounded-xl border border-line bg-surface-soft px-3.5 py-2.5 text-[13px] leading-relaxed text-ink-soft"
                        >
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </Reveal>
              ) : null}

              {project.technologies?.length ? (
                <Reveal delay={100}>
                  <Card className="p-6 sm:p-8">
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-xl bg-brand-soft text-brand-deep">
                        <Code2 className="size-[18px]" aria-hidden="true" />
                      </span>
                      <h2 className="font-heading text-xl font-semibold tracking-[-0.025em] text-ink">
                        Technology stack
                      </h2>
                    </div>
                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {project.technologies.map((technology) => (
                        <li
                          key={technology}
                          className="rounded-full border border-line bg-canvas px-3 py-1.5 text-[11.5px] font-medium text-ink-soft"
                        >
                          {technology.trim()}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </Reveal>
              ) : null}
            </div>

            <aside className="space-y-4 lg:col-span-4">
              {hasLinks ? (
                <Card className="p-5">
                  <h2 className="font-heading text-[15px] font-semibold text-ink">Project links</h2>
                  <div className="mt-4 space-y-2">
                    {project.liveLink ? (
                      <ProjectLink
                        href={project.liveLink}
                        icon={Globe}
                        title="Live project"
                        description="Visit the deployed product"
                      />
                    ) : null}
                    {project.clientRepo ? (
                      <ProjectLink
                        href={project.clientRepo}
                        icon={Github}
                        title="Client code"
                        description="Frontend repository"
                      />
                    ) : null}
                    {project.serverRepo ? (
                      <ProjectLink
                        href={project.serverRepo}
                        icon={Server}
                        title="Server code"
                        description="Backend repository"
                      />
                    ) : null}
                  </div>
                </Card>
              ) : null}

              {categories.length ? (
                <Card className="p-5">
                  <h2 className="font-heading text-[15px] font-semibold text-ink">Project type</h2>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {categories.map((category) => (
                      <li key={category}>
                        <Badge variant="brand">{category}</Badge>
                      </li>
                    ))}
                  </ul>
                </Card>
              ) : null}

              <Card className="p-5">
                <span className="flex size-10 items-center justify-center rounded-xl bg-dark text-brand">
                  <ExternalLink className="size-[18px]" aria-hidden="true" />
                </span>
                <h2 className="mt-4 font-heading text-lg font-semibold tracking-[-0.02em] text-ink">
                  Building something similar?
                </h2>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-caption">
                  Tell us about the product, the users, and the constraints. We will help you find the
                  right first release.
                </p>
                <ButtonLink href="/#contact" size="md" className="mt-4 w-full">
                  Start a project
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </ButtonLink>
              </Card>
            </aside>
          </div>
        </Container>
      </Section>

      <CTASection
        eyebrow="Next step"
        title="Have a product that needs the same care?"
        description="We can help you shape the scope, build the foundation, and ship the first version with confidence."
        primary={{ label: "Start a project", href: "/#contact" }}
        secondary={{ label: "Browse more work", href: "/projects" }}
        footnote={`Or email ${siteConfig.email} directly.`}
      />
    </>
  );
}

function ProjectLink({
  href,
  icon: Icon,
  title,
  description,
}: {
  href: string;
  icon: typeof Globe;
  title: string;
  description: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-surface-soft p-3.5 transition-colors hover:border-line-strong hover:bg-surface"
    >
      <span className="flex items-center gap-3">
        <span className="flex size-8 items-center justify-center rounded-lg bg-surface text-ink-muted ring-1 ring-line">
          <Icon className="size-3.5" aria-hidden="true" />
        </span>
        <span>
          <span className="block text-[12.5px] font-semibold text-ink">{title}</span>
          <span className="block text-[10.5px] text-ink-caption">{description}</span>
        </span>
      </span>
      <ArrowUpRight className="size-3.5 text-ink-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
    </a>
  );
}
