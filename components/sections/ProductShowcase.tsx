import { ArrowUpRight, Check, Info } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { EngineeringVisual } from "@/components/visuals/EngineeringVisual";
import { productContent } from "@/data/home";

export function ProductShowcase() {
  return (
    <Section id="products" className="relative overflow-hidden border-y border-white/5 bg-dark text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid-dark opacity-50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(58,222,150,0.14),transparent_72%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 bottom-0 size-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(58,222,150,0.13),transparent_72%)] blur-2xl"
      />
      <div aria-hidden="true" className="noise-texture-dark pointer-events-none absolute inset-0" />

      <div className="relative grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <Reveal>
          <div>
            <div className="flex items-center gap-3">
              <Badge variant="dark" dot>
                {productContent.eyebrow}
              </Badge>
              <span className="font-mono text-[9.5px] tracking-[0.18em] text-white/25 uppercase">
                Product / Engineering
              </span>
            </div>

            <h2 className="mt-7 max-w-xl font-heading text-[2.15rem] leading-[1.02] font-semibold tracking-[-0.045em] text-balance text-white sm:text-[2.8rem] lg:text-[3.2rem]">
              {productContent.title}
            </h2>
            <p className="mt-5 max-w-lg text-[14.5px] leading-relaxed text-white/55 sm:text-[15.5px]">
              {productContent.description}
            </p>

            <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
              {productContent.capabilities.map((capability) => (
                <li
                  key={capability}
                  className="flex items-center gap-2.5 border-b border-white/8 pb-2.5 text-[12.5px] text-white/70"
                >
                  <span className="flex size-4.5 shrink-0 items-center justify-center rounded-full border border-brand/25 bg-brand/10 text-brand">
                    <Check className="size-2.5" strokeWidth={2.5} aria-hidden="true" />
                  </span>
                  {capability}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-2.5 sm:flex-row">
              <ButtonLink href="/products" size="md" data-magnetic>
                Explore our products
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/#contact" variant="outlineLight" size="md">
                Talk to our team
              </ButtonLink>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120} className="min-w-0">
          <EngineeringVisual />
          <p className="mt-4 flex items-center justify-center gap-1.5 text-center font-mono text-[8.5px] tracking-[0.12em] text-white/30 uppercase">
            <Info className="size-3" aria-hidden="true" />
            Illustrative interface — not client data
          </p>
        </Reveal>
      </div>
    </Section>
  );
}
