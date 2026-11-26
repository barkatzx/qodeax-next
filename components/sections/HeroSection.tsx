import { ArrowDown, ArrowUpRight, ShieldCheck } from "lucide-react";
import { HeroTitle } from "@/components/animations/HeroTitle";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/Button";
import { HeroVisual } from "@/components/visuals/HeroVisual";
import { heroContent } from "@/data/home";
import { services } from "@/data/services";

export function HeroSection() {
  const tickerItems = services.map((service) => service.title);

  return (
    <section className="relative isolate overflow-hidden pt-10 pb-0 sm:pt-14 lg:pt-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-grid mask-fade-radial opacity-70"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-[-18%] -z-10 size-[760px] rounded-full bg-[radial-gradient(closest-side,rgba(58,222,150,0.2),transparent_72%)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-[radial-gradient(60%_50%_at_50%_0%,rgba(58,222,150,0.12),transparent_72%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-white/30 to-transparent"
      />
      <div aria-hidden="true" className="noise-texture pointer-events-none absolute inset-0 -z-10" />

      <Container className="relative">
        <div className="grid gap-12 pb-16 lg:grid-cols-[1.03fr_0.97fr] lg:items-center lg:gap-8 lg:pb-24 xl:gap-14">
          <div className="relative">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-line-strong/80 bg-white/70 px-3.5 py-1.5 text-[10.5px] font-medium tracking-[0.02em] text-ink-soft shadow-[0_8px_24px_-18px_rgba(21,27,25,0.35)] backdrop-blur-md">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-brand" />
              </span>
              {heroContent.badge}
              <span className="ml-1 hidden h-3 w-px bg-line-strong sm:block" aria-hidden="true" />
              <span className="hidden font-mono text-[9px] tracking-[0.16em] text-ink-muted uppercase sm:inline">
                AI-native
              </span>
            </div>

            <HeroTitle
              titleTop={heroContent.titleTop}
              titleBottom={heroContent.titleBottom}
            />

            <p className="mt-7 max-w-xl text-[15.5px] leading-relaxed text-ink-muted sm:text-[17px]">
              {heroContent.description}
            </p>

            <div className="mt-8 flex w-full flex-col items-start gap-2.5 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
              <ButtonLink
                href="#contact"
                size="lg"
                className="w-full sm:w-auto"
                data-magnetic
              >
                {heroContent.primaryCta}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink
                href="/projects"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
                data-magnetic
              >
                {heroContent.secondaryCta}
                <ArrowDown className="size-4" aria-hidden="true" />
              </ButtonLink>
            </div>

            <div className="mt-8 flex items-start gap-3 border-t border-line pt-5">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-line bg-white/70 text-brand-deep">
                <ShieldCheck className="size-3.5" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <p className="max-w-md text-[11.5px] leading-relaxed text-ink-muted sm:text-xs">
                {heroContent.trust}
              </p>
            </div>
          </div>

          <div className="relative">
            <HeroVisual />
          </div>
        </div>
      </Container>

      <div className="relative border-y border-line bg-white/55 backdrop-blur-md">
        <div
          aria-hidden="true"
          className="mask-fade-x flex w-full overflow-hidden py-3.5"
        >
          <div className="animate-marquee flex w-max shrink-0 items-center">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center">
                {tickerItems.map((item) => (
                  <span
                    key={`${copy}-${item}`}
                    className="flex shrink-0 items-center gap-3 px-6 text-[10px] font-semibold tracking-[0.18em] whitespace-nowrap text-ink-muted uppercase"
                  >
                    <span className="size-1 rounded-full bg-brand-strong/70" aria-hidden="true" />
                    {item}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
