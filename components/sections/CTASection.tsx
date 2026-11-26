import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";

interface CTASectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  footnote?: string;
  id?: string;
}

export function CTASection({
  eyebrow = "Let's talk",
  title,
  description,
  primary,
  secondary,
  footnote,
  id,
}: CTASectionProps) {
  return (
    <section
      id={id}
      className="relative overflow-hidden border-t border-white/8 bg-dark py-20 text-white sm:py-24 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-dark opacity-45"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_100%,rgba(58,222,150,0.16),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 size-[620px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(58,222,150,0.12),transparent_72%)] blur-2xl"
      />
      <div aria-hidden="true" className="noise-texture-dark pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent"
      />

      <Container className="relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[10px] font-medium tracking-[0.14em] text-white/60 uppercase backdrop-blur-sm">
            <span className="size-1.5 rounded-full bg-brand shadow-[0_0_10px_rgba(58,222,150,0.8)]" aria-hidden="true" />
            {eyebrow}
          </p>

          <h2 className="mt-7 font-heading text-[2.35rem] leading-[1.01] font-semibold tracking-[-0.05em] text-balance sm:text-[3.2rem] lg:text-[3.7rem]">
            {title}
          </h2>

          {description ? (
            <p className="mt-5 max-w-xl text-[14.5px] leading-relaxed text-white/55 sm:text-base">
              {description}
            </p>
          ) : null}

          <div className="mt-9 flex w-full flex-col items-center justify-center gap-2.5 sm:w-auto sm:flex-row sm:gap-3">
            <ButtonLink
              href={primary.href}
              size="lg"
              className="w-full sm:w-auto"
              data-magnetic
            >
              {primary.label}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </ButtonLink>
            {secondary ? (
              <ButtonLink
                href={secondary.href}
                variant="outlineLight"
                size="lg"
                className="w-full sm:w-auto"
              >
                {secondary.label}
              </ButtonLink>
            ) : null}
          </div>

          {footnote ? (
            <p className="mt-5 text-[10.5px] tracking-[0.02em] text-white/40">{footnote}</p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
