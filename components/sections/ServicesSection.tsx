import { ServiceCard } from "@/components/cards/ServiceCard";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/services";

export function ServicesSection() {
  const total = String(services.length).padStart(2, "0");

  return (
    <Section id="services" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-48 top-24 size-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(58,222,150,0.1),transparent_72%)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-0 size-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(58,222,150,0.08),transparent_72%)] blur-2xl"
      />

      <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <Reveal>
          <SectionHeading
            eyebrow="What we do"
            title="Software built around the business, not the other way around."
            description="We work across the product lifecycle — from the first scope conversation to the systems that keep the product running."
          />
        </Reveal>
        <Reveal delay={100}>
          <div className="flex items-center gap-4 border-t border-line pt-5 lg:justify-end">
            <span className="font-mono text-[10px] tracking-[0.18em] text-ink-muted uppercase">
              Capabilities
            </span>
            <span className="h-px w-10 bg-line-strong" aria-hidden="true" />
            <span className="font-heading text-[2rem] leading-none font-semibold tracking-[-0.04em] text-ink/25">
              {total}
            </span>
          </div>
        </Reveal>
      </div>

      <div className="relative mt-12 grid auto-rows-fr gap-3 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
        {services.map((service, index) => (
          <Reveal
            key={service.title}
            delay={index * 60}
            className={[
              "h-full",
              index === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : "",
              index === services.length - 1 ? "sm:col-span-2 lg:col-span-1" : "",
            ].join(" ")}
          >
            <ServiceCard service={service} index={index} featured={index === 0} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
