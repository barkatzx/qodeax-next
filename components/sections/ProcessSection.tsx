import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/data/home";

export function ProcessSection() {
  return (
    <Section id="process" className="bg-surface">
      <Reveal>
        <SectionHeading
          eyebrow="How we work"
          title="A clear path from idea to a product in use."
          description="Every engagement follows the same rhythm: understand the problem, make the plan concrete, build in reviewable increments, then launch and support."
        />
      </Reveal>

      <div className="relative mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        <div
          aria-hidden="true"
          className="absolute top-4 bottom-4 left-5 w-px bg-line md:hidden"
        />

        {processSteps.map((step, index) => (
          <Reveal key={step.number} delay={index * 70} className="h-full">
            <div className="relative h-full pl-14 lg:border-t lg:border-line lg:pt-7 lg:pl-0">
              <span className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-full border border-line bg-surface font-heading text-[12px] font-semibold text-ink lg:hidden">
                {step.number}
              </span>

              <div className="hidden items-center justify-between lg:flex">
                <span className="font-heading text-[12px] font-semibold text-ink-muted tabular-nums">
                  {step.number}
                </span>
                <span className="size-1.5 rounded-full bg-brand" aria-hidden="true" />
              </div>

              <h3 className="font-heading text-xl font-semibold tracking-[-0.02em] text-ink lg:mt-6">
                {step.title}
              </h3>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">
                {step.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {step.deliverables.map((deliverable) => (
                  <li
                    key={deliverable}
                    className="rounded-full border border-line bg-canvas px-2.5 py-1 text-[10.5px] font-medium text-ink-muted"
                  >
                    {deliverable}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
