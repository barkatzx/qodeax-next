"use client";

import { useRef } from "react";
import {
  Braces,
  CircleDot,
  GitBranch,
  Globe2,
  Sparkles,
} from "lucide-react";
import { LogoMark } from "@/components/ui/Logo";
import { NeuralGraph } from "@/components/visuals/NeuralGraph";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

export function HeroVisual() {
  const root = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const element = root.current;
    if (!element || prefersReducedMotion()) return;

    const context = gsap.context(() => {
      gsap.from("[data-hero-panel]", {
        y: 44,
        opacity: 0,
        duration: 1.25,
        delay: 0.25,
        ease: "power4.out",
      });

      gsap.from("[data-float]", {
        y: 22,
        opacity: 0,
        scale: 0.94,
        duration: 0.9,
        delay: 0.75,
        stagger: 0.14,
        ease: "power3.out",
      });

      gsap.to("[data-float]", {
        y: -9,
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.55,
        delay: 1.8,
      });

      gsap.to("[data-orbit]", {
        rotate: 360,
        duration: 52,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%",
      });

      gsap.fromTo(
        "[data-scan]",
        { yPercent: -20, opacity: 0 },
        {
          yPercent: 460,
          opacity: 0.7,
          duration: 7,
          repeat: -1,
          ease: "none",
          delay: 1.4,
        },
      );

      gsap.to("[data-status-dot]", {
        opacity: 0.35,
        scale: 0.8,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.3,
      });
    }, element);

    const onMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      element.style.setProperty("--mx", `${x}%`);
      element.style.setProperty("--my", `${y}%`);
    };

    element.addEventListener("pointermove", onMove);

    return () => {
      element.removeEventListener("pointermove", onMove);
      context.revert();
    };
  }, []);

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="relative mx-auto w-full max-w-[640px] lg:mr-0 lg:ml-auto"
    >
      <div className="pointer-events-none absolute -inset-12 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(58,222,150,0.18),transparent_72%)] blur-2xl" />

      <div className="pointer-events-none absolute -inset-6 -z-10 hidden opacity-70 sm:block">
        <div
          data-orbit
          className="absolute inset-0 rounded-full border border-dashed border-brand/20"
        />
        <div
          data-orbit
          className="absolute inset-8 rounded-full border border-brand/10"
          style={{ animationDirection: "reverse" }}
        />
        <span className="absolute top-1/2 -right-1 size-1.5 rounded-full bg-brand shadow-[0_0_12px_rgba(58,222,150,0.9)]" />
        <span className="absolute -top-1 left-1/2 size-1 rounded-full bg-brand/60" />
      </div>

      <div
        data-hero-panel
        className="relative overflow-hidden rounded-[1.9rem] border border-white/10 bg-[#0b100e]/95 p-2.5 shadow-[0_50px_140px_-45px_rgba(5,12,9,0.85),0_0_0_1px_rgba(255,255,255,0.02)_inset] backdrop-blur-xl"
      >
        <div
          className="pointer-events-none absolute inset-0 z-10 opacity-70"
          style={{
            background:
              "radial-gradient(340px circle at var(--mx, 50%) var(--my, 45%), rgba(58,222,150,0.09), transparent 70%)",
          }}
        />
        <div
          data-scan
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-24 bg-gradient-to-b from-transparent via-brand/[0.055] to-transparent"
        />

        <div className="relative flex items-center justify-between gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-3 py-2.5">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex gap-1.5" aria-hidden="true">
              <span className="size-1.5 rounded-full bg-white/20" />
              <span className="size-1.5 rounded-full bg-white/20" />
              <span className="size-1.5 rounded-full bg-brand/70" />
            </span>
            <span className="ml-1 flex min-w-0 items-center gap-1.5">
              <LogoMark className="size-4 shrink-0" />
              <span className="truncate font-mono text-[9px] tracking-[0.14em] text-white/45 uppercase">
                qodeax / engine
              </span>
            </span>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-brand/25 bg-brand/10 px-2 py-0.5 font-mono text-[8px] tracking-[0.16em] text-brand uppercase">
            <span className="size-1 rounded-full bg-brand" />
            live
          </span>
        </div>

        <div className="relative mt-2.5 grid gap-2.5 sm:grid-cols-[1.06fr_0.94fr]">
          <div className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-white/8 bg-[#080d0b]">
            <div className="flex items-center justify-between border-b border-white/8 px-3 py-2">
              <span className="font-mono text-[8.5px] tracking-[0.14em] text-white/40 uppercase">
                product.ts
              </span>
              <span className="rounded border border-white/10 px-1.5 py-0.5 font-mono text-[7.5px] tracking-[0.12em] text-white/35 uppercase">
                TypeScript
              </span>
            </div>
            <pre className="flex-1 overflow-hidden px-3 py-3 font-mono text-[8.5px] leading-[1.95] text-white/75 sm:text-[9px] xl:text-[9.5px]">
              <code>
                <span className="block">
                  <span className="select-none text-white/20">01 </span>
                  <span className="text-brand/80">import</span>
                  <span className="text-white/50"> {"{ "}</span>
                  <span className="text-white">qodeax</span>
                  <span className="text-white/50">{" }"}</span>
                  <span className="text-brand/80"> from </span>
                  <span className="text-[#a7c7b7]">&quot;./core&quot;</span>;
                </span>
                <span className="block">
                  <span className="select-none text-white/20">02 </span>
                </span>
                <span className="block">
                  <span className="select-none text-white/20">03 </span>
                  <span className="text-brand/80">const</span>
                  <span className="text-white"> product</span>
                  <span className="text-white/50"> = </span>
                  <span className="text-brand/80">await</span>
                  <span className="text-white"> qodeax</span>.
                  <span className="text-[#c8e6d8]">build</span>
                  <span className="text-white/50">({"{"}</span>
                </span>
                <span className="block">
                  <span className="select-none text-white/20">04 </span>
                  <span className="pl-3 text-[#9fb4a9]">strategy</span>
                  <span className="text-white/40">: </span>
                  <span className="text-[#a7c7b7]">&quot;discovery&quot;</span>,
                </span>
                <span className="block">
                  <span className="select-none text-white/20">05 </span>
                  <span className="pl-3 text-[#9fb4a9]">interface</span>
                  <span className="text-white/40">: </span>
                  <span className="text-[#a7c7b7]">&quot;systems&quot;</span>,
                </span>
                <span className="block">
                  <span className="select-none text-white/20">06 </span>
                  <span className="pl-3 text-[#9fb4a9]">intelligence</span>
                  <span className="text-white/40">: </span>
                  <span className="text-brand">true</span>,
                </span>
                <span className="block">
                  <span className="select-none text-white/20">07 </span>
                  <span className="text-white/50">{"});"}</span>
                </span>
                <span className="block">
                  <span className="select-none text-white/20">08 </span>
                </span>
                <span className="block">
                  <span className="select-none text-white/20">09 </span>
                  <span className="text-white">product</span>.
                  <span className="text-[#c8e6d8]">deploy</span>
                  <span className="text-white/50">(</span>
                  <span className="text-[#a7c7b7]">&quot;production&quot;</span>
                  <span className="text-white/50">);</span>
                </span>
                <span className="block">
                  <span className="select-none text-white/20">10 </span>
                  <span className="text-brand/60">{"// ready for the next release"}</span>
                </span>
              </code>
            </pre>
            <div className="mt-auto flex items-center justify-between border-t border-white/8 px-3 py-2 font-mono text-[8px] tracking-[0.12em] text-white/30 uppercase">
              <span className="inline-flex items-center gap-1">
                <GitBranch className="size-2.5" /> main
              </span>
              <span className="inline-flex items-center gap-1 text-brand/70">
                <CircleDot className="size-2.5" /> pipeline ready
              </span>
            </div>
          </div>

          <div className="grid min-w-0 gap-2.5">
            <div className="relative overflow-hidden rounded-2xl border border-white/8 bg-[#0a110e] p-2.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[8px] tracking-[0.16em] text-white/35 uppercase">
                  system graph
                </span>
                <span className="size-1.5 rounded-full bg-brand/80" />
              </div>
              <div className="mt-1.5 h-[118px] w-full">
                <NeuralGraph />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-2.5">
                <Braces className="size-3.5 text-brand" strokeWidth={1.7} />
                <p className="mt-2 font-heading text-[10px] font-semibold text-white/85">
                  Typed APIs
                </p>
                <p className="mt-0.5 font-mono text-[7px] tracking-[0.1em] text-white/35 uppercase">
                  end-to-end
                </p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-2.5">
                <Globe2 className="size-3.5 text-brand" strokeWidth={1.7} />
                <p className="mt-2 font-heading text-[10px] font-semibold text-white/85">
                  Edge ready
                </p>
                <p className="mt-0.5 font-mono text-[7px] tracking-[0.1em] text-white/35 uppercase">
                  distributed
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-2.5 flex items-center gap-2 overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] px-3 py-2.5">
          {["Plan", "Build", "Test", "Ship"].map((step, index) => (
            <div key={step} className="flex min-w-0 flex-1 items-center gap-2">
              <span
                data-status-dot
                className="size-1 shrink-0 rounded-full bg-brand shadow-[0_0_8px_rgba(58,222,150,0.7)]"
              />
              <span className="truncate font-mono text-[7.5px] tracking-[0.12em] text-white/45 uppercase">
                {step}
              </span>
              {index < 3 ? (
                <span className="h-px flex-1 bg-gradient-to-r from-white/15 to-transparent" />
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div
        data-float
        className="absolute -right-3 top-24 hidden items-center gap-2.5 rounded-2xl border border-white/10 bg-[#111a16]/90 px-3.5 py-2.5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)] backdrop-blur-xl xl:-right-7 xl:flex"
      >
        <span className="flex size-7 items-center justify-center rounded-lg bg-brand/15 text-brand">
          <Sparkles className="size-3.5" strokeWidth={1.8} />
        </span>
        <span>
          <span className="block font-heading text-[10.5px] font-semibold text-white/90">
            AI workflows
          </span>
          <span className="mt-0.5 block font-mono text-[7px] tracking-[0.12em] text-white/40 uppercase">
            agents · automation
          </span>
        </span>
      </div>

      <div
        data-float
        className="absolute -bottom-4 -left-3 hidden items-center gap-2.5 rounded-2xl border border-white/10 bg-[#111a16]/90 px-3.5 py-2.5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.8)] backdrop-blur-xl xl:-left-7 xl:flex"
      >
        <span className="flex size-7 items-center justify-center rounded-lg bg-brand/15 text-brand">
          <Braces className="size-3.5" strokeWidth={1.8} />
        </span>
        <span>
          <span className="block font-heading text-[10.5px] font-semibold text-white/90">
            API mesh
          </span>
          <span className="mt-0.5 block font-mono text-[7px] tracking-[0.12em] text-white/40 uppercase">
            typed · observable
          </span>
        </span>
      </div>
    </div>
  );
}
