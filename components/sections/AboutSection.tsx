import { Check } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { LogoMark } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutContent } from "@/data/home";

const layers = ["Strategy", "Design", "Engineering"];

export function AboutSection() {
  return (
    <Section id="about" className="relative overflow-hidden border-y border-line bg-surface">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-fine mask-fade-radial opacity-60"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-10 size-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(58,222,150,0.13),transparent_72%)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 right-4 font-heading text-[220px] leading-none font-semibold tracking-[-0.08em] text-ink/[0.025] select-none lg:right-16"
      >
        01
      </div>

      <div className="relative grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
        <Reveal>
          <div>
            <SectionHeading
              eyebrow={aboutContent.eyebrow}
              title={aboutContent.title}
              titleClassName="max-w-lg"
            />

            <div className="relative mt-10 overflow-hidden rounded-[1.75rem] border border-white/10 bg-dark p-5 text-white shadow-[0_30px_80px_-40px_rgba(21,27,25,0.7)] sm:p-6">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-grid-dark opacity-60"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-16 -right-10 size-64 rounded-full bg-[radial-gradient(closest-side,rgba(58,222,150,0.22),transparent_72%)] blur-xl"
              />
              <div aria-hidden="true" className="noise-texture-dark pointer-events-none absolute inset-0" />

              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-mono text-[9px] font-medium tracking-[0.2em] text-white/40 uppercase">
                    One connected team
                  </p>
                  <LogoMark className="size-6" />
                </div>

                <div className="mt-6 grid gap-1.5">
                  {layers.map((layer, index) => (
                    <div
                      key={layer}
                      className="group flex items-center gap-3.5 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3.5 transition-colors duration-300 hover:border-brand/25 hover:bg-white/[0.05]"
                    >
                      <span className="font-mono text-[9px] text-brand/70">
                        0{index + 1}
                      </span>
                      <span className="font-heading text-[17px] font-semibold tracking-[-0.02em] text-white/90">
                        {layer}
                      </span>
                      <span
                        aria-hidden="true"
                        className="ml-auto h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-brand/30"
                      />
                      <span className="size-1 rounded-full bg-brand shadow-[0_0_10px_rgba(58,222,150,0.8)]" />
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-[11px] leading-relaxed text-white/40">
                  One team, from the first scope conversation to handover.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="lg:pt-8">
            <p className="text-[18px] leading-[1.65] text-ink-soft sm:text-[20px]">
              {aboutContent.description}
            </p>
            <p className="mt-5 max-w-xl text-[14.5px] leading-relaxed text-ink-muted sm:text-[15px]">
              {aboutContent.secondParagraph}
            </p>

            <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {aboutContent.points.map((point, index) => (
                <li
                  key={point}
                  className="flex items-start gap-2.5 border-t border-line pt-3 text-[13px] leading-relaxed text-ink-soft"
                >
                  <span className="mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-deep">
                    <Check className="size-2.5" strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  <span className="flex-1">{point}</span>
                  <span className="mt-0.5 font-mono text-[9px] text-ink-muted/50 tabular-nums">
                    0{index + 1}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-10 border-t border-line pt-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[9.5px] tracking-[0.2em] text-ink-muted uppercase">
                  Operating principles
                </span>
                <span className="h-px flex-1 bg-line" aria-hidden="true" />
              </div>

              <dl className="mt-5 grid gap-2.5 sm:grid-cols-3">
                {aboutContent.principles.map((principle, index) => (
                  <div
                    key={principle.label}
                    className="group relative overflow-hidden rounded-2xl border border-line bg-canvas/60 p-4 transition-colors duration-300 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-gradient-to-r after:from-brand after:to-transparent after:transition-transform after:duration-500 hover:border-brand/35 hover:bg-white hover:after:scale-x-100"
                  >
                    <dt className="text-[9.5px] font-semibold tracking-[0.16em] text-ink-muted uppercase">
                      <span className="mb-3 block font-mono text-[9px] font-normal tracking-normal text-ink-muted/60 normal-case">
                        0{index + 1}
                      </span>
                      {principle.label}
                    </dt>
                    <dd className="mt-1.5 font-heading text-[14px] leading-snug font-semibold tracking-[-0.015em] text-ink">
                      {principle.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
