import type { ReactNode } from "react";
import { LockKeyhole } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScreenshotFrameProps {
  children: ReactNode;
  alt: string;
  label?: string;
  className?: string;
  chrome?: boolean;
}

/**
 * Presentational window chrome for illustrative product previews.
 * The inner content is exposed as a single image to assistive technology.
 */
export function ScreenshotFrame({
  children,
  alt,
  label = "QDMS Workspace",
  className,
  chrome = true,
}: ScreenshotFrameProps) {
  return (
    <figure
      role="img"
      aria-label={alt}
      className={cn(
        "preview-shadow font-preview overflow-hidden rounded-2xl border border-line bg-surface",
        className,
      )}
    >
      {chrome ? (
        <div className="flex items-center gap-3 border-b border-line bg-[#fafbfa] px-3 py-2.5 sm:px-4">
          <div className="flex shrink-0 gap-1.5" aria-hidden="true">
            <span className="size-2 rounded-full bg-[#e4e8e5]" />
            <span className="size-2 rounded-full bg-[#e4e8e5]" />
            <span className="size-2 rounded-full bg-[#e4e8e5]" />
          </div>
          <div className="mx-auto flex min-w-0 items-center gap-1.5 rounded-full border border-line bg-white px-2.5 py-1 text-[9px] font-medium text-ink-muted sm:text-[10px]">
            <LockKeyhole className="size-2.5 shrink-0" aria-hidden="true" />
            <span className="truncate">{label}</span>
          </div>
          <span className="hidden shrink-0 text-[9px] font-medium tracking-[0.12em] text-ink-muted uppercase sm:block sm:text-[10px]">
            Sample data
          </span>
        </div>
      ) : null}
      <div aria-hidden="true">{children}</div>
    </figure>
  );
}
