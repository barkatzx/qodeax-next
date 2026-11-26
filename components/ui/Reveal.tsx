"use client";

import { useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

/**
 * GSAP ScrollTrigger entrance. Content stays visible in the server-rendered
 * markup, so it remains readable without JavaScript.
 */
export function Reveal({ children, className, delay = 0, y = 28 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion()) return;

    const context = gsap.context(() => {
      gsap.set(element, { y, opacity: 0 });

      gsap.to(element, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        delay: delay / 1000,
        scrollTrigger: {
          trigger: element,
          start: "top 92%",
          once: true,
        },
        onComplete: () => gsap.set(element, { clearProps: "transform,opacity" }),
      });
    }, element);

    return () => context.revert();
  }, [delay, y]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
