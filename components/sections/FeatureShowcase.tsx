import { Check } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { ScreenshotFrame } from "@/components/products/qdms/previews/ScreenshotFrame";
import { qdmsPreviews } from "@/components/products/qdms/previews/registry";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { QdmsDeepDive } from "@/data/qdms";
import { cn } from "@/lib/utils";

interface FeatureShowcaseProps {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  items: QdmsDeepDive[];
}

export function FeatureShowcase({
  id,
  eyebrow,
  title,
  description,
  items,
}: FeatureShowcaseProps) {
  return (
    <Section id={id}>
      <Reveal>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
      </Reveal>

      <div className="mt-14 space-y-14 lg:mt-20 lg:space-y-24">
        {items.map((feature, index) => {
          const Preview = qdmsPreviews[feature.preview];
          const reversed = index % 2 === 1;

          return (
            <article
              key={feature.id}
              id={feature.id}
              className="grid scroll-mt-28 items-center gap-8 border-t border-line pt-10 lg:grid-cols-2 lg:gap-16 lg:pt-14"
            >
              <Reveal
                className={cn("mx-auto w-full max-w-xl lg:mx-0", reversed && "lg:order-2")}
              >
                <div className="flex items-center gap-3">
                  <span className="font-heading text-[13px] font-semibold text-ink-muted tabular-nums">
                    {feature.number}
                  </span>
                  <span className="h-px w-8 bg-line-strong" aria-hidden="true" />
                  <span className="text-[10.5px] font-semibold tracking-[0.18em] text-ink-muted uppercase">
                    {feature.eyebrow}
                  </span>
                </div>

                <h3 className="mt-5 font-heading text-[1.85rem] leading-[1.06] font-semibold tracking-[-0.035em] text-balance text-ink sm:text-[2.3rem]">
                  {feature.title}
                </h3>

                <p className="mt-4 max-w-lg text-[14.5px] leading-relaxed text-ink-muted sm:text-[15px]">
                  {feature.description}
                </p>

                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {feature.points.map((point) => (
                    <li key={point} className="flex items-center gap-2 text-[13px] text-ink-soft">
                      <span className="flex size-4.5 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-deep">
                        <Check className="size-2.5" strokeWidth={2.5} aria-hidden="true" />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={100} className={cn("min-w-0", reversed && "lg:order-1")}>
                <ScreenshotFrame alt={feature.previewAlt}>
                  <Preview />
                </ScreenshotFrame>
              </Reveal>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
