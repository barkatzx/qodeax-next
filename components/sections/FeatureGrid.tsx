import { Section } from "@/components/layout/Section";
import { IconBadge } from "@/components/ui/IconBadge";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { whyQodeax } from "@/data/services";

export function FeatureGrid() {
  return (
    <Section className="border-y border-line bg-surface">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <Reveal>
          <SectionHeading
            eyebrow="Why Qodeax"
            title="A partner who cares about the product after launch."
            titleClassName="max-w-xl"
          />
        </Reveal>
        <Reveal delay={100}>
          <p className="max-w-md text-[15px] leading-relaxed text-ink-muted lg:justify-self-end">
            Good software is more than a working demo. We optimize for clarity, maintainability, and a team that can keep moving after handover.
          </p>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2">
        {whyQodeax.map((item, index) => (
          <Reveal key={item.title} delay={index * 60} className="h-full">
            <div className="group h-full bg-surface p-6 transition-colors duration-300 hover:bg-[#fcfdfc]">
              <IconBadge icon={item.icon} />
              <h3 className="mt-4 font-heading text-[16px] leading-snug font-semibold tracking-[-0.01em] text-ink">
                {item.title}
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
                {item.description}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
