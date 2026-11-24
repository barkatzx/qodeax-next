import { ArrowUpRight, Clock3, Mail, MessageCircle, ShieldCheck } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ContactForm } from "@/components/forms/ContactForm";
import { ButtonLink } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";

const discussionTopics = [
  "Software development requirements",
  "SaaS and MVP ideas",
  "AI-powered product development",
  "Business automation",
  "Technical partnerships",
];

export function ContactSection() {
  return (
    <section id="contact" className="relative overflow-hidden bg-dark py-20 text-white sm:py-24 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[440px] bg-[radial-gradient(55%_60%_at_20%_0%,rgba(58,222,150,0.12),transparent_72%)]"
      />
      <Container className="relative">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[10px] font-medium tracking-[0.14em] text-white/60 uppercase">
              <span className="size-1.5 rounded-full bg-brand" aria-hidden="true" />
              Start a project
            </p>

            <h2 className="mt-6 font-heading text-[2.2rem] leading-[1.02] font-semibold tracking-[-0.04em] text-balance sm:text-[2.9rem]">
              Tell us what you are building.
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/55">
              Share the problem, the constraints, and where you want to get to. We will reply with a clear next step — not a sales pitch.
            </p>

            <ul className="mt-7 grid gap-2">
              {discussionTopics.map((topic) => (
                <li key={topic} className="flex items-center gap-2 text-[13px] text-white/70">
                  <span className="size-1.5 rounded-full bg-brand" aria-hidden="true" />
                  {topic}
                </li>
              ))}
            </ul>

            <div className="mt-8 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-2">
              <a
                href={`mailto:${siteConfig.email}`}
                className="group flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3.5 transition-colors hover:border-white/20 hover:bg-white/[0.05]"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  <Mail className="size-3.5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[11px] font-semibold tracking-[0.12em] text-white/50 uppercase">Email</span>
                  <span className="mt-1 block text-[12.5px] text-white/80">{siteConfig.email}</span>
                </span>
              </a>

              {siteConfig.links.whatsapp ? (
                <a
                  href={siteConfig.links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3.5 transition-colors hover:border-white/20 hover:bg-white/[0.05]"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                    <MessageCircle className="size-3.5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-[11px] font-semibold tracking-[0.12em] text-white/50 uppercase">WhatsApp</span>
                    <span className="mt-1 block text-[12.5px] text-white/80">Start a conversation</span>
                  </span>
                </a>
              ) : null}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-white/50">
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="size-3" aria-hidden="true" />
                We aim to reply within one business day
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="size-3" aria-hidden="true" />
                Your details stay private
              </span>
            </div>

            <ButtonLink
              href={siteConfig.calendly}
              variant="outlineLight"
              size="md"
              className="mt-6"
            >
              Prefer a call? Book a time
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </ButtonLink>
          </div>

          <div className="min-w-0">
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
