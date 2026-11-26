"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpen?: number | null;
  className?: string;
}

export function Accordion({ items, defaultOpen = 0, className }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);
  const baseId = useId();

  return (
    <div className={cn("border-t border-line", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const triggerId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;
        const number = String(index + 1).padStart(2, "0");

        return (
          <div
            key={item.question}
            className={cn(
              "group relative border-b border-line transition-colors duration-300",
              isOpen ? "bg-white/50" : "hover:bg-white/40",
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-y-0 left-0 w-px origin-top bg-gradient-to-b from-brand to-brand/0 transition-transform duration-300",
                isOpen ? "scale-y-100" : "scale-y-0",
              )}
            />
            <h3>
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-start gap-4 px-2 py-5 text-left focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:outline-none sm:px-3 sm:py-6"
              >
                <span
                  className={cn(
                    "mt-1 font-mono text-[9px] tracking-[0.12em] transition-colors",
                    isOpen ? "text-brand-deep" : "text-ink-muted/45 group-hover:text-ink-muted",
                  )}
                >
                  {number}
                </span>
                <span
                  className={cn(
                    "flex-1 font-heading text-[15.5px] leading-snug font-medium tracking-[-0.015em] transition-colors sm:text-[17px]",
                    isOpen ? "text-ink" : "text-ink-soft group-hover:text-ink",
                  )}
                >
                  {item.question}
                </span>
                <span
                  className={cn(
                    "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                    isOpen
                      ? "rotate-45 border-brand bg-brand text-brand-foreground shadow-[0_0_18px_-4px_rgba(58,222,150,0.8)]"
                      : "border-line bg-surface text-ink-muted group-hover:border-brand/40 group-hover:text-brand-deep",
                  )}
                  aria-hidden="true"
                >
                  <Plus className="size-3.5" strokeWidth={2} />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              aria-hidden={!isOpen}
              className={cn(
                "grid transition-all duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pr-10 pb-6 pl-8 text-[13.5px] leading-relaxed text-ink-muted sm:pl-9 sm:text-[14.5px]">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
