"use client";

import type { ElementType } from "react";
import { Fragment, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { cn } from "@/lib/utils";

type SplitTextTag = "h1" | "h2" | "h3" | "p" | "span";

interface SplitTextProps {
  text: string;
  as?: SplitTextTag;
  className?: string;
  delay?: number;
  stagger?: number;
  trigger?: "scroll" | "load";
}

/**
 * Lightweight word-by-word text reveal. Words are split manually instead of
 * relying on GSAP SplitText, so no paid plugin is required.
 */
export function SplitText({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
  stagger = 0.045,
  trigger = "scroll",
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(/\s+/).filter(Boolean);
  const Heading = Tag as ElementType;

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion()) return;

    const targets = element.querySelectorAll<HTMLElement>("[data-split-inner]");

    const context = gsap.context(() => {
      gsap.set(targets, {
        yPercent: 118,
        opacity: 0,
        filter: "blur(7px)",
        transformOrigin: "left bottom",
      });

      gsap.to(targets, {
        yPercent: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "power4.out",
        stagger,
        delay,
        scrollTrigger:
          trigger === "scroll"
            ? {
                trigger: element,
                start: "top 90%",
                once: true,
              }
            : undefined,
      });
    }, element);

    return () => context.revert();
  }, [text, delay, stagger, trigger]);

  return (
    <Heading ref={ref} aria-label={text} className={cn(className)}>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <Fragment key={`${word}-${index}`}>
            <span className="split-word">
              <span data-split-inner className="inline-block will-change-transform">
                {word}
              </span>
            </span>
            {index < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </Heading>
  );
}
