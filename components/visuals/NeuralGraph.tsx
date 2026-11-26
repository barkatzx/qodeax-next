"use client";

import { useId, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { useIsomorphicLayoutEffect } from "@/lib/useIsomorphicLayoutEffect";
import { cn } from "@/lib/utils";

const nodes = [
  { x: 62, y: 48, r: 3.4 },
  { x: 148, y: 28, r: 5.4 },
  { x: 232, y: 52, r: 3.8 },
  { x: 108, y: 98, r: 5 },
  { x: 196, y: 102, r: 6.4 },
  { x: 54, y: 142, r: 3.2 },
  { x: 140, y: 164, r: 4.4 },
  { x: 246, y: 148, r: 3.8 },
  { x: 274, y: 88, r: 3 },
];

const links: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [0, 3],
  [1, 4],
  [2, 4],
  [3, 4],
  [3, 5],
  [5, 6],
  [6, 4],
  [4, 7],
  [7, 8],
  [8, 2],
  [6, 7],
];

/**
 * Decorative neural/architecture graph used across the landing page.
 */
export function NeuralGraph({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const rawId = useId();
  const id = rawId.replace(/[^a-zA-Z0-9]/g, "");

  useIsomorphicLayoutEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion()) return;

    const context = gsap.context(() => {
      gsap.to("[data-node]", {
        scale: 1.55,
        opacity: 0.55,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { each: 0.22, from: "random" },
        transformOrigin: "center",
      });

      gsap.to("[data-flow]", {
        strokeDashoffset: -180,
        duration: 4.5,
        repeat: -1,
        ease: "none",
      });

      gsap.to("[data-pulse]", {
        scale: 2.2,
        opacity: 0,
        duration: 2.4,
        repeat: -1,
        stagger: { each: 0.5, from: "random" },
        ease: "power1.out",
        transformOrigin: "center",
      });
    }, element);

    return () => context.revert();
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 320 200"
      aria-hidden="true"
      className={cn("size-full", className)}
    >
      <defs>
        <pattern id={`grid-${id}`} width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        </pattern>
        <radialGradient id={`fade-${id}`} cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#3ade96" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#3ade96" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="320" height="200" fill={`url(#grid-${id})`} />
      <circle cx="160" cy="100" r="86" fill={`url(#fade-${id})`} />

      <g strokeLinecap="round">
        {links.map(([from, to], index) => {
          const a = nodes[from];
          const b = nodes[to];
          return (
            <line
              key={`line-${index}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="rgba(58,222,150,0.28)"
              strokeWidth="1"
            />
          );
        })}

        {links.slice(0, 7).map(([from, to], index) => {
          const a = nodes[from];
          const b = nodes[to];
          return (
            <line
              key={`flow-${index}`}
              data-flow
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="rgba(58,222,150,0.9)"
              strokeWidth="1.2"
              strokeDasharray="2 14"
            />
          );
        })}
      </g>

      {nodes.map((node, index) => (
        <g key={`node-${index}`}>
          <circle
            data-pulse
            cx={node.x}
            cy={node.y}
            r={node.r + 2}
            fill="none"
            stroke="rgba(58,222,150,0.45)"
            strokeWidth="1"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
          <circle
            data-node
            cx={node.x}
            cy={node.y}
            r={node.r}
            fill="#3ade96"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
        </g>
      ))}

      <g className="font-mono" fill="rgba(255,255,255,0.42)" fontSize="6.5" letterSpacing="1.2">
        <text x="132" y="20">AGENT</text>
        <text x="206" y="118">VECTOR</text>
        <text x="248" y="162">EDGE</text>
        <text x="38" y="60">API</text>
      </g>
    </svg>
  );
}
