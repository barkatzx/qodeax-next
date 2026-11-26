"use client";

import { useEffect, useRef } from "react";
import { gsap, isFinePointer, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";

/**
 * Global interaction layer: custom cursor, magnetic buttons, and a ScrollTrigger
 * refresh once fonts and media have settled. Everything is desktop-only and
 * disabled for reduced-motion users.
 */
export function MotionProvider() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    const onLoad = () => refresh();

    document.fonts?.ready.then(refresh).catch(() => undefined);
    window.addEventListener("load", onLoad);

    return () => window.removeEventListener("load", onLoad);
  }, []);

  useEffect(() => {
    if (!isFinePointer() || prefersReducedMotion()) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    const root = document.documentElement;
    root.classList.add("has-qodeax-cursor");

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });
    gsap.set(label, { opacity: 0, scale: 0.9 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.55, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.55, ease: "power3.out" });
    const labelX = gsap.quickTo(label, "x", { duration: 0.25, ease: "power3.out" });
    const labelY = gsap.quickTo(label, "y", { duration: 0.25, ease: "power3.out" });

    let visible = false;
    let overField = false;
    let hoverScale = 1;

    const show = () => {
      if (visible) return;
      visible = true;
      gsap.to([dot, ring], { opacity: 1, duration: 0.25, ease: "power2.out" });
    };

    const hide = () => {
      visible = false;
      gsap.to([dot, ring, label], { opacity: 0, duration: 0.2 });
    };

    const resetState = () => {
      hoverScale = 1;
      gsap.to(ring, {
        scale: 1,
        backgroundColor: "rgba(58,222,150,0)",
        borderColor: "rgba(58,222,150,0.45)",
        duration: 0.35,
        ease: "power3.out",
      });
      gsap.to(dot, { scale: 1, duration: 0.3, ease: "power3.out" });
      gsap.to(label, { opacity: 0, scale: 0.9, duration: 0.2 });
    };

    const onMove = (event: PointerEvent) => {
      show();
      dotX(event.clientX);
      dotY(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);
      labelX(event.clientX + 20);
      labelY(event.clientY + 18);
    };

    const onOver = (event: PointerEvent) => {
      const target = event.target as Element | null;
      if (!target?.closest) return;

      if (target.closest("input, textarea, select, [contenteditable='true']")) {
        overField = true;
        gsap.to([dot, ring, label], { opacity: 0, duration: 0.2 });
        return;
      }

      if (overField) {
        overField = false;
        gsap.to([dot, ring], { opacity: 1, duration: 0.2 });
      }

      const interactive = target.closest<HTMLElement>(
        "a, button, [role='button'], [data-cursor]",
      );
      const labelText = interactive?.getAttribute("data-cursor-label");

      if (labelText) {
        label.textContent = labelText;
        hoverScale = 1.55;
        gsap.to(label, { opacity: 1, scale: 1, duration: 0.25, ease: "power3.out" });
        gsap.to(ring, {
          scale: 1.55,
          backgroundColor: "rgba(58,222,150,0.08)",
          borderColor: "rgba(58,222,150,0.7)",
          duration: 0.35,
          ease: "power3.out",
        });
        gsap.to(dot, { scale: 0.5, duration: 0.3 });
        return;
      }

      if (interactive) {
        hoverScale = 1.3;
        gsap.to(label, { opacity: 0, scale: 0.9, duration: 0.2 });
        gsap.to(ring, {
          scale: 1.3,
          backgroundColor: "rgba(58,222,150,0.04)",
          borderColor: "rgba(58,222,150,0.55)",
          duration: 0.35,
          ease: "power3.out",
        });
        gsap.to(dot, { scale: 0.65, duration: 0.3 });
        return;
      }

      resetState();
    };

    const onDown = () => gsap.to(ring, { scale: hoverScale * 0.86, duration: 0.2 });
    const onUp = () => gsap.to(ring, { scale: hoverScale, duration: 0.3 });

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);

    // Magnetic motion for marked calls to action.
    const cleanups: Array<() => void> = [];
    const bound = new WeakSet<Element>();

    const bindMagnets = () => {
      document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((element) => {
        if (bound.has(element)) return;
        bound.add(element);

        const xTo = gsap.quickTo(element, "x", { duration: 0.5, ease: "power3.out" });
        const yTo = gsap.quickTo(element, "y", { duration: 0.5, ease: "power3.out" });

        const move = (event: PointerEvent) => {
          const rect = element.getBoundingClientRect();
          xTo((event.clientX - (rect.left + rect.width / 2)) * 0.22);
          yTo((event.clientY - (rect.top + rect.height / 2)) * 0.22);
        };

        const leave = () => {
          xTo(0);
          yTo(0);
        };

        element.addEventListener("pointermove", move);
        element.addEventListener("pointerleave", leave);

        cleanups.push(() => {
          element.removeEventListener("pointermove", move);
          element.removeEventListener("pointerleave", leave);
          gsap.set(element, { x: 0, y: 0 });
        });
      });
    };

    bindMagnets();

    const observer = new MutationObserver(bindMagnets);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      root.classList.remove("has-qodeax-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", hide);
      observer.disconnect();
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <div aria-hidden="true">
      <div ref={dotRef} className="qodeax-cursor-dot" />
      <div ref={ringRef} className="qodeax-cursor-ring" />
      <span ref={labelRef} className="qodeax-cursor-label" />
    </div>
  );
}
