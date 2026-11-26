import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/data/home";

export function FAQSection() {
  return (
    <Section id="faq" className="relative overflow-hidden bg-surface">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-fine mask-fade-radial opacity-40"
      />

      <div className="relative grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <div>
          <Reveal>
            <SectionHeading
              eyebrow="FAQ"
              title="Questions worth asking before you start."
              description="If your question is not here, a short conversation is usually the fastest way to an answer."
            />
          </Reveal>

          <Reveal delay={80}>
            <div className="relative mt-8 overflow-hidden rounded-2xl border border-white/8 bg-dark p-5 text-white sm:p-6">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-20 -right-12 size-48 rounded-full bg-[radial-gradient(closest-side,rgba(58,222,150,0.22),transparent_72%)] blur-xl"
              />
              <div className="relative">
                <p className="font-mono text-[9px] font-semibold tracking-[0.18em] text-white/40 uppercase">
                  Still deciding?
                </p>
                <p className="mt-2.5 text-[12.5px] leading-relaxed text-white/55">
                  Tell us what you are trying to build. We will tell you honestly whether we are the right fit.
                </p>
                <ButtonLink
                  href="/#contact"
                  variant="outlineLight"
                  size="sm"
                  className="mt-4"
                  data-magnetic
                >
                  Start a conversation
                  <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={120} className="min-w-0">
          <Accordion items={faqs} defaultOpen={0} />
        </Reveal>
      </div>
    </Section>
  );
}
