import { Section } from "@/components/layout/Section";
import { IconBadge } from "@/components/ui/IconBadge";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { whyQodeax } from "@/data/services";

export function FeatureGrid() {
  return (
    <Section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid mask-fade-radial opacity-50"
      />

      <div className="relative overflow-hidden rounded-[2.25rem] border border-white/8 bg-dark px-5 py-10 text-white shadow-[0_50px_120px_-60px_rgba(21,27,25,0.7)] sm:px-8 lg:px-12 lg:py-14">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/3 size-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(58,222,150,0.16),transparent_72%)] blur-2xl"
        />
        <div aria-hidden="true" className="noise-texture-dark pointer-events-none absolute inset-0" />

        <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <Reveal>
            <SectionHeading
              eyebrow="Why Qodeax"
              title="A partner who cares about the product after launch."
              titleClassName="max-w-xl"
              tone="dark"
            />
          </Reveal>
          <Reveal delay={100}>
            <p className="max-w-md text-[14.5px] leading-relaxed text-white/50 lg:justify-self-end">
              Good software is more than a working demo. We optimize for clarity, maintainability, and a team that can keep moving after handover.
            </p>
          </Reveal>
        </div>

        <div className="relative mt-10 grid gap-2.5 sm:grid-cols-2 lg:mt-12">
          {whyQodeax.map((item, index) => (
            <Reveal key={item.title} delay={index * 60} className="h-full">
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-6 transition-colors duration-500 hover:border-brand/25 hover:bg-white/[0.05]">
                <div className="flex items-start justify-between gap-4">
                  <IconBadge icon={item.icon} tone="light" />
                  <span className="font-mono text-[10px] tracking-[0.14em] text-white/22">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-heading text-[16px] leading-snug font-semibold tracking-[-0.02em] text-white/90">
                  {item.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-white/45">
                  {item.description}
                </p>
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-brand via-brand/40 to-transparent transition-transform duration-500 group-hover:scale-x-100"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
