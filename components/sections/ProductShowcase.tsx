import { ArrowUpRight, Check, Info } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { DashboardOverviewPreview } from "@/components/products/qdms/previews/DashboardOverviewPreview";
import { ScreenshotFrame } from "@/components/products/qdms/previews/ScreenshotFrame";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { productContent } from "@/data/home";

export function ProductShowcase() {
  return (
    <Section id="products" className="relative overflow-hidden bg-dark text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(58,222,150,0.10),transparent_72%)]"
      />

      <div className="relative grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <Reveal>
          <div>
            <Badge variant="dark" dot>
              {productContent.eyebrow}
            </Badge>
            <h2 className="mt-6 font-heading text-[2.1rem] leading-[1.04] font-semibold tracking-[-0.04em] text-balance text-white sm:text-[2.7rem]">
              {productContent.title}
            </h2>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/60">
              {productContent.description}
            </p>

            <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
              {productContent.capabilities.map((capability) => (
                <li key={capability} className="flex items-center gap-2 text-[13px] text-white/75">
                  <span className="flex size-4.5 shrink-0 items-center justify-center rounded-full bg-brand/15 text-brand">
                    <Check className="size-2.5" strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  {capability}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
              <ButtonLink href="/products" size="md">
                Explore QDMS
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/#contact" variant="outlineLight" size="md">
                Talk to our team
              </ButtonLink>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120} className="min-w-0">
          <ScreenshotFrame
            className="border-white/10"
            label="QDMS Workspace"
            alt="QDMS dashboard by Qodeax showing patient, appointment, diagnostic, and financial overviews with sample data."
          >
            <DashboardOverviewPreview />
          </ScreenshotFrame>
          <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[11px] text-white/55">
            <Info className="size-3" aria-hidden="true" />
            Illustrative preview with sample data.
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
