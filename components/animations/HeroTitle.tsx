"use client";

import { Fragment, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

interface HeroTitleProps {
  titleTop: string;
  titleBottom: string;
}

export function HeroTitle({ titleTop, titleBottom }: HeroTitleProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  const topWords = titleTop.split(/\s+/).filter(Boolean);
  const bottomWords = titleBottom.split(/\s+/).filter(Boolean);

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion()) return;

    const targets = element.querySelectorAll<HTMLElement>("[data-hero-word]");
    const underline = element.querySelector<HTMLElement>("[data-hero-underline]");

    const context = gsap.context(() => {
      gsap.set(targets, {
        yPercent: 118,
        opacity: 0,
        filter: "blur(10px)",
        transformOrigin: "left bottom",
      });

      const timeline = gsap.timeline({ delay: 0.15 });

      timeline.to(targets, {
        yPercent: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.15,
        ease: "power4.out",
        stagger: 0.075,
      });

      if (underline) {
        timeline.fromTo(
          underline,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.9, ease: "power3.out" },
          0.75,
        );
      }
    }, element);

    return () => context.revert();
  }, []);

  return (
    <h1
      ref={ref}
      aria-label={`${titleTop} ${titleBottom}`}
      className="mt-7 font-heading text-[clamp(2.7rem,6.1vw,5.6rem)] leading-[0.94] font-semibold tracking-[-0.055em] text-ink"
    >
      <span aria-hidden="true" className="block">
        {topWords.map((word, index) => (
          <Fragment key={`${word}-${index}`}>
            <span className="split-word">
              <span data-hero-word className="inline-block will-change-transform">
                {word}
              </span>
            </span>
            {index < topWords.length - 1 ? " " : null}
            {index === 0 ? <br className="sm:hidden" /> : null}
          </Fragment>
        ))}
      </span>
      <span aria-hidden="true" className="relative mt-1 block w-fit">
        {bottomWords.map((word, index) => (
          <Fragment key={`${word}-${index}`}>
            <span className="split-word">
              <span
                data-hero-word
                className="inline-block bg-gradient-to-r from-[#0f6b45] via-[#1fa76d] to-[#3ade96] bg-clip-text text-transparent will-change-transform"
              >
                {word}
              </span>
            </span>
            {index < bottomWords.length - 1 ? " " : null}
          </Fragment>
        ))}
        <span
          aria-hidden="true"
          data-hero-underline
          className="absolute -bottom-2 left-0 h-[3px] w-full origin-left rounded-full bg-gradient-to-r from-brand via-brand-strong to-transparent shadow-[0_0_18px_rgba(58,222,150,0.55)]"
        />
      </span>
    </h1>
  );
}
