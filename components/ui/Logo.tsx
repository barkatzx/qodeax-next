import { cn } from "@/lib/utils";

interface LogoProps {
  tone?: "default" | "light";
  showDescriptor?: boolean;
  className?: string;
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={cn("size-8", className)}
    >
      <rect width="32" height="32" rx="9" className="fill-brand" />
      <path
        d="M8 16h3.4l1.7-4.5 3 9 1.9-4.5H24"
        fill="none"
        className="stroke-ink"
        strokeWidth="2.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Logo({
  tone = "default",
  showDescriptor = true,
  className,
}: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="size-8 shrink-0" />
      <span className="flex flex-col gap-1">
        <span
          className={cn(
            "font-heading text-[22px] leading-none font-extrabold tracking-[-0.04em]",
            tone === "light" ? "text-white" : "text-ink",
          )}
        >
          Qodeax
        </span>
        {showDescriptor ? (
          <span
            className={cn(
              "text-[8px] leading-none font-semibold tracking-[0.24em] uppercase",
              tone === "light" ? "text-white/60" : "text-ink-soft",
            )}
          >
            Software Engineering
          </span>
        ) : null}
      </span>
    </span>
  );
}
