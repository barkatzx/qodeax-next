"use client";

import { useRef } from "react";
import {
  Boxes,
  Braces,
  Check,
  Cloud,
  Database,
  GitBranch,
  Layers,
  Rocket,
  Settings2,
  Sparkles,
  TerminalSquare,
} from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";

const stages = [
  { label: "Scope", icon: Layers },
  { label: "Design", icon: Boxes },
  { label: "Build", icon: Braces },
  { label: "Ship", icon: Rocket },
];

const services = [
  { label: "Product core", meta: "web · mobile", icon: Layers },
  { label: "AI layer", meta: "agents · retrieval", icon: Sparkles },
  { label: "API gateway", meta: "typed contracts", icon: Braces },
  { label: "Data layer", meta: "relational · vector", icon: Database },
];

const logLines = [
  ["01", "scope.defined", "workspace"],
  ["02", "architecture.approved", "core"],
  ["03", "interface.system.linked", "ui"],
  ["04", "api.contracts.validated", "api"],
  ["05", "release.candidate.ready", "ship"],
];

export function EngineeringVisual() {
  const root = useRef<HTMLDivElement>(null);

  useIsomorphicLayoutEffect(() => {
    const element = root.current;
    if (!element || prefersReducedMotion()) return;

    const context = gsap.context(() => {
      gsap.to("[data-eng-dot]", {
        opacity: 0.35,
        scale: 0.75,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        stagger: 0.28,
        ease: "sine.inOut",
      });

      gsap.fromTo(
        "[data-eng-scan]",
        { yPercent: -40, opacity: 0 },
        {
          yPercent: 480,
          opacity: 0.6,
          duration: 8,
          repeat: -1,
          ease: "none",
          delay: 1.5,
        },
      );
    }, element);

    const onMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      element.style.setProperty("--mx", `${((event.clientX - rect.left) / rect.width) * 100}%`);
      element.style.setProperty("--my", `${((event.clientY - rect.top) / rect.height) * 100}%`);
    };

    element.addEventListener("pointermove", onMove);

    return () => {
      element.removeEventListener("pointermove", onMove);
      context.revert();
    };
  }, []);

  return (
    <div ref={root} aria-hidden="true" className="relative min-w-0">
      <div className="pointer-events-none absolute -inset-10 -z-10 rounded-[3rem] bg-[radial-gradient(closest-side,rgba(58,222,150,0.14),transparent_74%)] blur-2xl" />

      <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0b100e]/95 shadow-[0_50px_140px_-50px_rgba(0,0,0,0.9)]">
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              "radial-gradient(360px circle at var(--mx, 55%) var(--my, 40%), rgba(58,222,150,0.08), transparent 70%)",
          }}
        />
        <div
          data-eng-scan
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-transparent via-brand/[0.06] to-transparent"
        />

        <div className="relative flex items-center justify-between gap-3 border-b border-white/8 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="flex gap-1.5">
              <span className="size-1.5 rounded-full bg-white/20" />
              <span className="size-1.5 rounded-full bg-white/20" />
              <span className="size-1.5 rounded-full bg-brand/70" />
            </span>
            <span className="ml-1 font-mono text-[8.5px] tracking-[0.16em] text-white/40 uppercase">
              qodeax / release workspace
            </span>
          </div>
          <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[7.5px] tracking-[0.12em] text-white/35 uppercase">
            illustrative
          </span>
        </div>

        <div className="relative grid sm:grid-cols-[86px_1fr]">
          <div className="hidden border-r border-white/8 p-2.5 sm:block">
            <div className="grid gap-1">
              {[
                { icon: Layers, label: "Overview", active: true },
                { icon: GitBranch, label: "Pipeline" },
                { icon: Boxes, label: "Services" },
                { icon: Rocket, label: "Releases" },
                { icon: TerminalSquare, label: "Logs" },
              ].map((item) => (
                <div
                  key={item.label}
                  className={`flex flex-col items-center gap-1 rounded-xl px-1 py-2 ${
                    item.active ? "bg-brand/10 text-brand" : "text-white/28"
                  }`}
                >
                  <item.icon className="size-3.5" strokeWidth={1.7} />
                  <span className="font-mono text-[6.5px] tracking-[0.1em] uppercase">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-col items-center gap-1 border-t border-white/8 pt-4 text-white/22">
              <Settings2 className="size-3.5" strokeWidth={1.7} />
              <span className="font-mono text-[6.5px] tracking-[0.1em] uppercase">
                Settings
              </span>
            </div>
          </div>

          <div className="min-w-0 p-2.5 sm:p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-heading text-sm font-semibold tracking-[-0.02em] text-white/90">
                  Product workspace
                </p>
                <p className="mt-0.5 font-mono text-[7px] tracking-[0.14em] text-white/30 uppercase">
                  one connected delivery system
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-brand/10 px-2 py-1 font-mono text-[7px] tracking-[0.12em] text-brand uppercase">
                <span className="size-1 rounded-full bg-brand" />
                connected
              </span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-4">
              {stages.map((stage, index) => (
                <div
                  key={stage.label}
                  className="relative rounded-xl border border-white/8 bg-white/[0.025] p-2.5"
                >
                  <div className="flex items-center justify-between">
                    <stage.icon className="size-3 text-brand" strokeWidth={1.8} />
                    <span className="font-mono text-[6.5px] text-white/25">
                      0{index + 1}
                    </span>
                  </div>
                  <p className="mt-2 font-heading text-[10px] font-semibold text-white/80">
                    {stage.label}
                  </p>
                  <span
                    data-eng-dot
                    className="absolute right-2 bottom-2 size-1 rounded-full bg-brand"
                  />
                </div>
              ))}
            </div>

            <div className="mt-2.5 grid gap-2.5 md:grid-cols-[1.18fr_0.82fr]">
              <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[7.5px] tracking-[0.14em] text-white/35 uppercase">
                    service map
                  </span>
                  <span className="font-mono text-[7px] text-white/22">4 layers</span>
                </div>
                <div className="mt-2 grid gap-1.5">
                  {services.map((service) => (
                    <div
                      key={service.label}
                      className="flex items-center gap-2 rounded-lg border border-white/6 bg-white/[0.02] px-2 py-1.5"
                    >
                      <service.icon className="size-3 shrink-0 text-brand/80" strokeWidth={1.7} />
                      <span className="min-w-0 flex-1 truncate font-heading text-[9.5px] font-medium text-white/75">
                        {service.label}
                      </span>
                      <span className="hidden truncate font-mono text-[6.5px] tracking-[0.08em] text-white/28 uppercase sm:block">
                        {service.meta}
                      </span>
                      <Check className="size-2.5 shrink-0 text-brand/70" strokeWidth={2.4} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-2.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[7.5px] tracking-[0.14em] text-white/35 uppercase">
                    automation
                  </span>
                  <Sparkles className="size-3 text-brand/80" />
                </div>
                <div className="mt-2 space-y-1.5">
                  {["AI assistants", "Workflow triggers", "Data sync", "Release notes"].map(
                    (item, index) => (
                      <div
                        key={item}
                        className="flex items-center justify-between gap-2 border-b border-white/6 pb-1.5 last:border-0 last:pb-0"
                      >
                        <span className="truncate text-[8.5px] text-white/55">{item}</span>
                        <span
                          className={`relative h-3 w-5 shrink-0 rounded-full ${
                            index < 3 ? "bg-brand/35" : "bg-white/10"
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 size-2 rounded-full ${
                              index < 3 ? "right-0.5 bg-brand" : "left-0.5 bg-white/35"
                            }`}
                          />
                        </span>
                      </div>
                    ),
                  )}
                </div>
                <div className="mt-2.5 rounded-lg border border-white/6 bg-[#080d0b] p-2 font-mono text-[7px] leading-relaxed text-white/35">
                  <span className="text-brand/70">$</span> qodeax deploy --target production
                  <br />
                  <span className="text-white/22">→ handover complete</span>
                </div>
              </div>
            </div>

            <div className="mt-2.5 rounded-2xl border border-white/8 bg-[#080d0b] p-2.5">
              <div className="flex items-center gap-2 border-b border-white/6 pb-1.5">
                <Cloud className="size-3 text-brand/70" strokeWidth={1.7} />
                <span className="font-mono text-[7px] tracking-[0.14em] text-white/30 uppercase">
                  build log
                </span>
                <span className="ml-auto font-mono text-[6.5px] text-white/20">tail -f</span>
              </div>
              <div className="mt-1.5 grid gap-1 font-mono text-[7px] text-white/32 sm:text-[7.5px]">
                {logLines.map(([number, line, scope]) => (
                  <p key={line} className="flex items-center gap-2">
                    <span className="text-white/18">{number}</span>
                    <span className="text-brand/50">✓</span>
                    <span className="truncate">{line}</span>
                    <span className="ml-auto hidden text-white/18 sm:block">{scope}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -right-4 -bottom-4 hidden items-center gap-2 rounded-full border border-white/10 bg-[#111a16]/90 px-3 py-1.5 font-mono text-[7.5px] tracking-[0.12em] text-white/40 uppercase shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl sm:flex">
        <span className="size-1 rounded-full bg-brand" />
        strategy · design · engineering
      </div>
    </div>
  );
}
