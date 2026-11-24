import { Check } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutContent } from "@/data/home";

export function AboutSection() {
  return (
    <Section id="about" className="border-y border-line bg-surface">
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
        <Reveal>
          <SectionHeading
            eyebrow={aboutContent.eyebrow}
            title={aboutContent.title}
            titleClassName="max-w-lg"
          />
        </Reveal>

        <Reveal delay={100}>
          <div className="max-w-xl">
            <p className="text-[15px] leading-relaxed text-ink-muted">
              {aboutContent.description}
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
              {aboutContent.secondParagraph}
            </p>

            <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
              {aboutContent.points.map((point) => (
                <li key={point} className="flex items-start gap-2 text-[13px] text-ink-soft">
                  <span className="mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-deep">
                    <Check className="size-2.5" strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <Reveal delay={140}>
        <dl className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
          {aboutContent.principles.map((principle) => (
            <div key={principle.label} className="bg-surface p-5 sm:p-6">
              <dt className="text-[10px] font-semibold tracking-[0.16em] text-ink-muted uppercase">
                {principle.label}
              </dt>
              <dd className="mt-2 font-heading text-[15px] leading-snug font-semibold tracking-[-0.01em] text-ink">
                {principle.value}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </Section>
  );
}
