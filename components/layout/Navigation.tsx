"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function isActivePath(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

interface NavigationProps {
  className?: string;
}

export function Navigation({ className }: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className={cn("hidden items-center gap-0.5 lg:flex", className)}>
      {navItems.map((item) => {
        const isActive = isActivePath(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "group relative rounded-full px-3.5 py-2 text-[13px] font-medium tracking-[-0.005em] transition-colors focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-canvas focus-visible:outline-none",
              isActive
                ? "text-ink"
                : "text-ink-muted hover:text-ink",
            )}
          >
            <span className="relative z-10 inline-flex items-center gap-1.5">
              {isActive ? (
                <span className="size-1 rounded-full bg-brand shadow-[0_0_8px_rgba(58,222,150,0.9)]" aria-hidden="true" />
              ) : null}
              {item.label}
            </span>
            <span
              aria-hidden="true"
              className={cn(
                "absolute inset-0 -z-0 rounded-full border transition-all duration-300",
                isActive
                  ? "border-line bg-white/80 shadow-[0_2px_10px_-6px_rgba(21,27,25,0.25)]"
                  : "border-transparent bg-transparent group-hover:border-line/70 group-hover:bg-white/45",
              )}
            />
          </Link>
        );
      })}
    </nav>
  );
}
