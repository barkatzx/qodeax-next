import type { Metadata } from "next";
import { ArrowUpRight, Check, Info } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { DashboardOverviewPreview } from "@/components/products/qdms/previews/DashboardOverviewPreview";
import { ScreenshotFrame } from "@/components/products/qdms/previews/ScreenshotFrame";
import { CTASection } from "@/components/sections/CTASection";
import { FeatureShowcase } from "@/components/sections/FeatureShowcase";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { IconBadge } from "@/components/ui/IconBadge";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { qdmsCapabilities, qdmsDeepDives, qdmsSecurity } from "@/data/qdms";
import { siteConfig } from "@/data/site";

const description =
  "QDMS is a SaaS platform designed to help diagnostic centers digitize and streamline their daily operations, from patient and doctor management to appointments, diagnostic tests, referrals, and financial workflows.";

export const metadata: Metadata = {
  title: "QDMS — Diagnostic Management System",
  description,
  alternates: { canonical: "/products" },
  openGraph: {
    title: "QDMS — Diagnostic Management System | Qodeax",
    description,
    url: "/products",
  },
};

export default function ProductsPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "QDMS",
    alternateName: "Qodeax Diagnostic Management System",
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    description,
    publisher: {
      "@type": "Organization",
      name: "Qodeax",
      url: siteConfig.url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <PageHeader
        eyebrow="Qodeax product"
        title="QDMS — Qodeax Diagnostic Management System"
        description={description}
      >
        <ButtonLink href={siteConfig.calendly} size="lg" className="w-full sm:w-auto">
          Book a free demo
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </ButtonLink>
        <ButtonLink
          href="/#contact"
          variant="secondary"
          size="lg"
          className="w-full sm:w-auto"
        >
          Talk to our team
        </ButtonLink>
      </PageHeader>

      <section className="pb-16 sm:pb-20 lg:pb-24">
        <Container>
          <Reveal>
            <ScreenshotFrame
              label="QDMS Workspace"
              alt="QDMS dashboard by Qodeax showing patient visits, appointments, diagnostic orders, and revenue with sample data."
            >
              <DashboardOverviewPreview />
            </ScreenshotFrame>
            <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[11px] text-ink-muted">
              <Info className="size-3" aria-hidden="true" />
              Illustrative preview with sample data.
            </p>
          </Reveal>
        </Container>
      </section>

      <Section id="capabilities" className="border-y border-line bg-surface">
        <Reveal>
          <SectionHeading
            eyebrow="Product capabilities"
            title="One system for the daily work of a diagnostic center."
            description="QDMS connects the front desk, clinical operations, diagnostics, and financial oversight so the same records follow every patient through the center."
          />
        </Reveal>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {qdmsCapabilities.map((capability, index) => (
            <Reveal key={capability.title} delay={index * 50} className="h-full">
              <article className="h-full rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:shadow-[var(--shadow-lift)]">
                <IconBadge icon={capability.icon} />
                <h3 className="mt-5 font-heading text-[17px] leading-snug font-semibold tracking-[-0.015em] text-ink">
                  {capability.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {capability.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-line bg-surface px-5 py-4">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-deep">
              <Info className="size-3.5" aria-hidden="true" />
            </span>
            <p className="text-[12.5px] leading-relaxed text-ink-muted">
              <span className="font-semibold text-ink">Built for healthcare operations.</span>{" "}
              QDMS is designed for diagnostic centers, pathology laboratories, imaging centers, and
              multi-service facilities. Role-based access keeps each team member inside the workflows
              they need.
            </p>
          </div>
        </Reveal>
      </Section>

      <FeatureShowcase
        id="features"
        eyebrow="Inside the platform"
        title="Follow every patient, order, and payment through one connected flow."
        description="Each module works from the same patient, invoice, and payment records — so the front desk and management see the same operational picture."
        items={qdmsDeepDives}
      />

      <Section className="border-y border-line bg-surface">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <div>
              <SectionHeading
                eyebrow="Deployment & access"
                title="Your organization. Your data. Your workspace."
                description="QDMS is deployed as a dedicated single-tenant environment with role-based access, short-lived sessions, and an operational audit trail."
              />
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-line bg-surface-soft p-5">
                <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-surface text-ink-muted">
                  <Info className="size-3.5" aria-hidden="true" />
                </span>
                <p className="text-[12.5px] leading-relaxed text-ink-muted">
                  <span className="font-semibold text-ink">A note on compliance.</span> QDMS does not
                  currently claim HIPAA, ISO 27001, or other third-party certifications. Specific
                  security and compliance requirements are reviewed with each organization during
                  deployment planning.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-3xl border border-line bg-surface p-2">
              <div className="grid gap-px overflow-hidden rounded-2xl bg-line sm:grid-cols-2">
                {qdmsSecurity.map((item) => (
                  <div key={item.title} className="bg-surface p-5">
                    <span className="flex size-7 items-center justify-center rounded-lg bg-brand-soft text-brand-deep">
                      <Check className="size-3.5" strokeWidth={2.2} aria-hidden="true" />
                    </span>
                    <h3 className="mt-3.5 font-heading text-[14px] leading-snug font-semibold text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-[12px] leading-relaxed text-ink-muted">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="mt-10 flex flex-col items-start justify-between gap-3 rounded-2xl border border-line bg-canvas px-5 py-4 sm:flex-row sm:items-center">
            <div>
              <Badge variant="brand">See QDMS in context</Badge>
              <p className="mt-2 text-[12.5px] leading-relaxed text-ink-muted">
                A focused walkthrough for your center, with no commitment required.
              </p>
            </div>
            <ButtonLink href={siteConfig.calendly} size="md" className="shrink-0">
              Book a free demo
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </ButtonLink>
          </div>
        </Reveal>
      </Section>

      <CTASection
        eyebrow="Have a similar product in mind?"
        title="We build products like QDMS from the ground up."
        description="If you are shaping a SaaS platform, an operational system, or an AI-powered product, we can help you define the first release and build the foundation properly."
        primary={{ label: "Start a project", href: "/#contact" }}
        secondary={{ label: "See our work", href: "/projects" }}
        footnote="No commitment required. We will reply with a clear next step."
      />
    </>
  );
}
