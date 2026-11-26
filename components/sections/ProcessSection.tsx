"use client";

import { useRef } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processSteps } from "@/data/home";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

const phaseLabels = ["Discovery", "Architecture", "Build", "Launch"];

export function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const element = sectionRef.current;
    if (!element || prefersReducedMotion()) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        "[data-progress-h]",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-process-grid]",
            start: "top 78%",
            end: "bottom 62%",
            scrub: 0.8,
          },
        },
      );

      gsap.fromTo(
        "[data-progress-v]",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-process-grid]",
            start: "top 78%",
            end: "bottom 62%",
            scrub: 0.8,
          },
        },
      );
    }, element);

    return () => context.revert();
  }, []);

  return (
    <div ref={sectionRef}>
      <Section id="process" className="relative overflow-hidden border-y border-line bg-surface">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-grid-fine mask-fade-radial opacity-50"
        />

        <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <Reveal>
            <SectionHeading
              eyebrow="How we work"
              title="A clear path from idea to a product in use."
              description="Every engagement follows the same rhythm: understand the problem, make the plan concrete, build in reviewable increments, then launch and support."
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="border-t border-line pt-5 lg:justify-self-end lg:text-right">
              <p className="font-mono text-[9.5px] tracking-[0.18em] text-ink-muted uppercase">
                04 phases · scope to support
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5 lg:justify-end">
                {phaseLabels.map((phase) => (
                  <span
                    key={phase}
                    className="rounded-full border border-line bg-canvas/70 px-2.5 py-1 text-[10px] font-medium text-ink-muted"
                  >
                    {phase}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <div
          data-process-grid
          className="relative mt-14 grid gap-10 md:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-5"
        >
          <div
            aria-hidden="true"
            className="absolute top-4 bottom-4 left-5 w-px bg-line md:hidden"
          >
            <div
              data-progress-v
              className="h-full w-px origin-top bg-gradient-to-b from-brand via-brand-strong to-brand/20"
            />
          </div>
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 hidden h-px bg-line lg:block"
          >
            <div
              data-progress-h
              className="h-px w-full origin-left bg-gradient-to-r from-brand via-brand-strong to-brand/30"
            />
          </div>

          {processSteps.map((step, index) => (
            <Reveal key={step.number} delay={index * 70} className="h-full">
              <div className="group relative h-full pl-14 lg:border-t lg:border-transparent lg:pt-7 lg:pl-0">
                <span className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-full border border-line bg-surface font-heading text-[11px] font-semibold text-ink shadow-[0_4px_14px_-8px_rgba(21,27,25,0.3)] lg:hidden">
                  {step.number}
                </span>

                <div className="hidden items-center gap-3 lg:flex">
                  <span className="size-1.5 rounded-full bg-brand shadow-[0_0_0_4px_rgba(58,222,150,0.12)]" />
                  <span className="h-px flex-1 bg-line" aria-hidden="true" />
                  <span className="font-mono text-[9px] text-ink-muted/60">
                    {step.number}
                  </span>
                </div>

                <span
                  aria-hidden="true"
                  className="mt-6 hidden font-heading text-[3.4rem] leading-none font-semibold tracking-[-0.06em] text-ink/[0.06] lg:block"
                >
                  {step.number}
                </span>

                <h3 className="font-heading text-[1.35rem] leading-snug font-semibold tracking-[-0.025em] text-ink lg:mt-2">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-muted">
                  {step.description}
                </p>
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {step.deliverables.map((deliverable) => (
                    <li
                      key={deliverable}
                      className="rounded-full border border-line bg-canvas/80 px-2.5 py-1 text-[10px] font-medium text-ink-muted transition-colors duration-300 group-hover:border-brand/25 group-hover:text-ink-soft"
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
    </div>
  );
}
