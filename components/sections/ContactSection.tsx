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
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/5 bg-dark py-20 text-white sm:py-24 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-dark opacity-45"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(55%_60%_at_20%_0%,rgba(58,222,150,0.16),transparent_72%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 size-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(58,222,150,0.12),transparent_72%)] blur-2xl"
      />
      <div aria-hidden="true" className="noise-texture-dark pointer-events-none absolute inset-0" />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[10px] font-medium tracking-[0.14em] text-white/60 uppercase backdrop-blur-sm">
                <span className="size-1.5 rounded-full bg-brand shadow-[0_0_10px_rgba(58,222,150,0.8)]" aria-hidden="true" />
                Start a project
              </p>
              <span className="font-mono text-[9px] tracking-[0.18em] text-white/25 uppercase">
                Contact / Qodeax
              </span>
            </div>

            <h2 className="mt-6 max-w-xl font-heading text-[2.3rem] leading-[1.01] font-semibold tracking-[-0.045em] text-balance sm:text-[3.1rem] lg:text-[3.5rem]">
              Tell us what you are{" "}
              <span className="text-gradient-light">building.</span>
            </h2>
            <p className="mt-5 max-w-md text-[14.5px] leading-relaxed text-white/55 sm:text-[15.5px]">
              Share the problem, the constraints, and where you want to get to. We will reply with a clear next step — not a sales pitch.
            </p>

            <ul className="mt-8 grid gap-0 border-t border-white/8">
              {discussionTopics.map((topic, index) => (
                <li
                  key={topic}
                  className="group flex items-center gap-3.5 border-b border-white/8 py-3 text-[12.5px] text-white/65 transition-colors hover:text-white/90"
                >
                  <span className="font-mono text-[8.5px] tracking-[0.1em] text-white/25 transition-colors group-hover:text-brand/80">
                    0{index + 1}
                  </span>
                  <span className="size-1 rounded-full bg-brand/70" aria-hidden="true" />
                  {topic}
                  <ArrowUpRight className="ml-auto size-3 text-white/15 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand/70" aria-hidden="true" />
                </li>
              ))}
            </ul>

            <div className="mt-8 grid gap-2.5 border-t border-white/8 pt-6 sm:grid-cols-2">
              <a
                href={`mailto:${siteConfig.email}`}
                className="group flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3.5 transition-colors hover:border-brand/30 hover:bg-white/[0.05]"
              >
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand transition-colors group-hover:bg-brand/15">
                  <Mail className="size-3.5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[9px] font-semibold tracking-[0.16em] text-white/40 uppercase">Email</span>
                  <span className="mt-1 block truncate text-[12px] text-white/75">{siteConfig.email}</span>
                </span>
              </a>

              {siteConfig.links.whatsapp ? (
                <a
                  href={siteConfig.links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3.5 transition-colors hover:border-brand/30 hover:bg-white/[0.05]"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand transition-colors group-hover:bg-brand/15">
                    <MessageCircle className="size-3.5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[9px] font-semibold tracking-[0.16em] text-white/40 uppercase">WhatsApp</span>
                    <span className="mt-1 block text-[12px] text-white/75">Start a conversation</span>
                  </span>
                </a>
              ) : null}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10.5px] text-white/40">
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
              data-magnetic
            >
              Prefer a call? Book a time
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </ButtonLink>
          </div>

          <div className="relative min-w-0">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-5 rounded-[2.5rem] bg-[radial-gradient(closest-side,rgba(58,222,150,0.14),transparent_74%)] blur-2xl"
            />
            <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.03] p-1.5 shadow-[0_40px_120px_-50px_rgba(0,0,0,0.85)] backdrop-blur-sm">
              <ContactForm />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
