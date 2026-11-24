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
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_100%,rgba(58,222,150,0.14),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent"
      />

      <Container className="relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[10px] font-medium tracking-[0.14em] text-white/60 uppercase">
            <span className="size-1.5 rounded-full bg-brand" aria-hidden="true" />
            {eyebrow}
          </p>

          <h2 className="mt-6 font-heading text-[2.2rem] leading-[1.02] font-semibold tracking-[-0.04em] text-balance sm:text-[3rem] lg:text-[3.4rem]">
            {title}
          </h2>

          {description ? (
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/55 sm:text-base">
              {description}
            </p>
          ) : null}

          <div className="mt-8 flex w-full flex-col items-center justify-center gap-2.5 sm:w-auto sm:flex-row sm:gap-3">
            <ButtonLink href={primary.href} size="lg" className="w-full sm:w-auto">
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
            <p className="mt-5 text-[11px] text-white/55">{footnote}</p>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
