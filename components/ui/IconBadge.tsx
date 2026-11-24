import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface IconBadgeProps {
  icon: LucideIcon;
  size?: "sm" | "md" | "lg";
  tone?: "brand" | "dark" | "light";
  className?: string;
}

const sizes = {
  sm: { wrapper: "size-8 rounded-lg", icon: "size-3.5" },
  md: { wrapper: "size-10 rounded-xl", icon: "size-[18px]" },
  lg: { wrapper: "size-12 rounded-xl", icon: "size-5" },
};

const tones = {
  brand: "bg-brand-soft text-brand-deep",
  dark: "bg-brand text-brand-foreground",
  light: "border border-white/10 bg-white/5 text-brand",
};

export function IconBadge({
  icon: Icon,
  size = "md",
  tone = "brand",
  className,
}: IconBadgeProps) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center",
        sizes[size].wrapper,
        tones[tone],
        className,
      )}
    >
      <Icon
        className={sizes[size].icon}
        strokeWidth={1.8}
        aria-hidden="true"
      />
    </span>
  );
}
