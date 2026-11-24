import { ArrowDown, ArrowUpRight, ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { DashboardOverviewPreview } from "@/components/products/qdms/previews/DashboardOverviewPreview";
import { ScreenshotFrame } from "@/components/products/qdms/previews/ScreenshotFrame";
import { ButtonLink } from "@/components/ui/Button";
import { heroContent } from "@/data/home";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 lg:pt-20 lg:pb-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(70%_60%_at_50%_0%,rgba(58,222,150,0.12),transparent_70%)]"
      />

      <Container className="relative">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[10.5px] font-medium tracking-[0.02em] text-ink-soft shadow-[0_1px_2px_rgba(21,27,25,0.04)] sm:text-[11px]">
            <span className="size-1.5 rounded-full bg-brand" aria-hidden="true" />
            {heroContent.badge}
          </div>

          <h1 className="mt-7 font-heading text-[2.55rem] leading-[0.98] font-semibold tracking-[-0.045em] text-balance text-ink sm:text-[3.7rem] lg:text-[4.5rem]">
            {heroContent.titleTop}
            <span className="block">{heroContent.titleBottom}</span>
          </h1>

          <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-muted sm:text-[17px]">
            {heroContent.description}
          </p>

          <div className="mt-8 flex w-full flex-col items-center justify-center gap-2.5 sm:w-auto sm:flex-row sm:gap-3">
            <ButtonLink href="#contact" size="lg" className="w-full sm:w-auto">
              {heroContent.primaryCta}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink
              href="/projects"
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              {heroContent.secondaryCta}
              <ArrowDown className="size-4" aria-hidden="true" />
            </ButtonLink>
          </div>

          <p className="mt-5 flex items-center justify-center gap-2 text-center text-[11.5px] text-ink-muted sm:text-xs">
            <ShieldCheck className="size-3.5 text-ink-muted" strokeWidth={1.8} aria-hidden="true" />
            {heroContent.trust}
          </p>
        </div>

        <div className="relative mt-12 sm:mt-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-8 top-4 bottom-6 -z-10 rounded-[2.5rem] bg-[radial-gradient(55%_55%_at_50%_45%,rgba(58,222,150,0.16),transparent_72%)] blur-2xl"
          />
          <ScreenshotFrame
            label="QDMS Workspace"
            alt="QDMS dashboard by Qodeax showing patient visits, appointments, diagnostic orders, and revenue with sample data."
          >
            <DashboardOverviewPreview />
          </ScreenshotFrame>
          <p className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-center text-[11px] text-ink-caption">
            <span className="font-semibold text-ink-soft">QDMS</span>
            <span aria-hidden="true">·</span>
            <span>Our diagnostic management platform, shown with sample data.</span>
          </p>
        </div>
      </Container>
    </section>
  );
}
