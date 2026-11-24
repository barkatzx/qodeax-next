import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/data/home";

export function FAQSection() {
  return (
    <Section id="faq" className="bg-surface">
      <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <div>
          <Reveal>
            <SectionHeading
              eyebrow="FAQ"
              title="Questions worth asking before you start."
              description="If your question is not here, a short conversation is usually the fastest way to an answer."
            />
          </Reveal>

          <Reveal delay={80}>
            <div className="mt-8 rounded-2xl border border-line bg-surface-soft p-5">
              <p className="text-[10px] font-semibold tracking-[0.16em] text-ink-muted uppercase">
                Still deciding?
              </p>
              <p className="mt-2 text-[13px] leading-relaxed text-ink-muted">
                Tell us what you are trying to build. We will tell you honestly whether we are the right fit.
              </p>
              <ButtonLink href="/#contact" variant="secondary" size="sm" className="mt-4 bg-surface">
                Start a conversation
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </ButtonLink>
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
