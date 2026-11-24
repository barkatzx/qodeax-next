import type { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full text-[10.5px] font-semibold tracking-[0.12em] uppercase",
  {
    variants: {
      variant: {
        brand: "bg-brand-soft px-3 py-1.5 text-brand-deep",
        outline: "border border-line bg-surface px-3 py-1.5 text-ink-soft",
        dark: "border border-white/12 bg-white/6 px-3 py-1.5 text-white/70",
        plain: "text-ink-soft",
      },
    },
    defaultVariants: {
      variant: "brand",
    },
  },
);

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: ReactNode;
  className?: string;
  dot?: boolean;
}

export function Badge({ variant, className, children, dot = false }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)}>
      {dot ? (
        <span className="size-1.5 rounded-full bg-brand" aria-hidden="true" />
      ) : null}
      {children}
    </span>
  );
}
