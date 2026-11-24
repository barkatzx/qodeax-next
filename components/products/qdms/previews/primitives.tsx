import type { ReactNode } from "react";
import {
  ChartColumn,
  Bell,
  CalendarDays,
  ClipboardList,
  CreditCard,
  FlaskConical,
  LayoutDashboard,
  Search,
  Settings,
  Share2,
  Stethoscope,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type PreviewNavKey =
  | "overview"
  | "reports"
  | "patients"
  | "appointments"
  | "doctors"
  | "tests"
  | "referrals"
  | "invoices"
  | "payments";

export const previewNav: { key: PreviewNavKey; label: string; icon: LucideIcon }[] =
  [
    { key: "overview", label: "Dashboard", icon: LayoutDashboard },
    { key: "reports", label: "Reports", icon: ChartColumn },
    { key: "patients", label: "Patients", icon: UsersRound },
    { key: "appointments", label: "Appointments", icon: CalendarDays },
    { key: "doctors", label: "Doctors", icon: Stethoscope },
    { key: "tests", label: "Diagnostics", icon: FlaskConical },
    { key: "referrals", label: "Referral Sources", icon: Share2 },
    { key: "invoices", label: "Invoices", icon: ClipboardList },
    { key: "payments", label: "Payments", icon: CreditCard },
  ];

export const previewTableHeadClass =
  "border-b border-line bg-[#fafbfa] px-2.5 py-1.5 text-left text-[8.5px] font-semibold tracking-[0.07em] text-ink-muted uppercase";

export const previewTableCellClass =
  "border-b border-line/70 px-2.5 py-1.5 text-left text-[9.5px] text-ink-soft sm:text-[10px]";

interface AppWindowProps {
  active?: PreviewNavKey;
  title: string;
  subtitle?: string;
  children: ReactNode;
  variant?: "full" | "rail";
  className?: string;
}

export function AppWindow({
  active = "overview",
  title,
  subtitle,
  children,
  variant = "full",
  className,
}: AppWindowProps) {
  return (
    <div
      className={cn(
        "flex min-h-[360px] w-full bg-[#fbfcfb] text-ink @container",
        className,
      )}
    >
      {variant === "full" ? (
        <aside className="hidden w-[166px] shrink-0 flex-col border-r border-line bg-white p-2.5 md:flex">
          <div className="flex items-center gap-2 px-1.5 py-1.5">
            <LogoPulse />
            <span className="font-heading text-[12px] leading-none font-extrabold tracking-[-0.03em]">
              QDMS
            </span>
          </div>
          <p className="mt-3 px-1.5 text-[7.5px] font-semibold tracking-[0.18em] text-ink-muted uppercase">
            Workspace
          </p>
          <nav className="mt-1.5 flex flex-1 flex-col gap-0.5">
            {previewNav.map((item) => {
              const Icon = item.icon;
              const isActive = item.key === active;
              return (
                <span
                  key={item.key}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2 py-[6px] text-[10.5px]",
                    isActive
                      ? "bg-brand-soft font-semibold text-[#145c3d]"
                      : "text-ink-muted",
                  )}
                >
                  <Icon className="size-3 shrink-0" strokeWidth={1.9} />
                  {item.label}
                </span>
              );
            })}
            <span className="mt-auto flex items-center gap-2 rounded-md px-2 py-[6px] text-[10.5px] text-ink-muted">
              <Settings className="size-3 shrink-0" strokeWidth={1.9} />
              Settings
            </span>
          </nav>
          <div className="mt-2 flex items-center gap-2 rounded-lg border border-line bg-[#fafbfa] p-1.5">
            <Avatar name="Ayesha Rahman" className="size-6 text-[8px]" />
            <span className="min-w-0">
              <span className="block truncate text-[9px] font-semibold">
                Ayesha Diagnostic
              </span>
              <span className="block text-[7.5px] text-ink-muted">
                Administrator
              </span>
            </span>
          </div>
        </aside>
      ) : null}

      {variant === "rail" ? (
        <aside className="hidden w-[46px] shrink-0 flex-col items-center gap-1 border-r border-line bg-white py-2.5 sm:flex">
          <LogoPulse className="mb-2" />
          {previewNav.map((item) => {
            const Icon = item.icon;
            const isActive = item.key === active;
            return (
              <span
                key={item.key}
                className={cn(
                  "flex size-7 items-center justify-center rounded-md",
                  isActive
                    ? "bg-brand-soft text-[#145c3d]"
                    : "text-ink-muted/80",
                )}
              >
                <Icon className="size-3.5" strokeWidth={1.9} />
              </span>
            );
          })}
        </aside>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between gap-3 border-b border-line bg-white px-3 py-2 sm:px-3.5">
          <div className="min-w-0">
            <p className="truncate font-heading text-[11.5px] leading-tight font-semibold">
              {title}
            </p>
            {subtitle ? (
              <p className="mt-0.5 truncate text-[8.5px] text-ink-muted">
                {subtitle}
              </p>
            ) : null}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-md border border-line bg-[#fafbfa] px-2 py-1 text-[8.5px] text-ink-muted @xl:flex">
              <Search className="size-2.5" />
              Search records
              <kbd className="ml-1 rounded border border-line bg-white px-1 text-[7px]">
                ⌘K
              </kbd>
            </span>
            <span className="relative flex size-6 items-center justify-center rounded-md border border-line bg-white text-ink-muted">
              <Bell className="size-3" strokeWidth={1.9} />
              <span className="absolute top-1 right-1 size-1 rounded-full bg-brand" />
            </span>
            <Avatar name="Ayesha Rahman" className="size-6 text-[8px]" />
          </div>
        </div>
        <div className="min-w-0 flex-1 p-2.5 sm:p-3.5">{children}</div>
      </div>
    </div>
  );
}

function LogoPulse({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-5 shrink-0", className)}>
      <rect width="32" height="32" rx="9" className="fill-brand" />
      <path
        d="M8 16h3.4l1.7-4.5 3 9 1.9-4.5H24"
        fill="none"
        className="stroke-ink"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface PreviewPanelProps {
  title?: string;
  action?: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}

export function PreviewPanel({
  title,
  action,
  children,
  className,
  bodyClassName,
}: PreviewPanelProps) {
  return (
    <div
      className={cn(
        "min-w-0 overflow-hidden rounded-lg border border-line bg-white",
        className,
      )}
    >
      {title ? (
        <div className="flex items-center justify-between gap-2 border-b border-line px-3 py-2">
          <h4 className="truncate text-[10px] font-semibold text-ink">{title}</h4>
          {action ? (
            <span className="shrink-0 text-[8.5px] font-medium text-ink-muted">
              {action}
            </span>
          ) : null}
        </div>
      ) : null}
      <div className={cn("p-2.5", bodyClassName)}>{children}</div>
    </div>
  );
}

interface PreviewStatProps {
  label: string;
  value: string;
  delta?: string;
  icon?: LucideIcon;
  tone?: "default" | "brand";
}

export function PreviewStat({
  label,
  value,
  delta,
  icon: Icon,
  tone = "default",
}: PreviewStatProps) {
  return (
    <div
      className={cn(
        "min-w-0 rounded-lg border p-2.5",
        tone === "brand"
          ? "border-brand/30 bg-brand-soft"
          : "border-line bg-white",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-[8.5px] font-medium text-ink-muted">
          {label}
        </span>
        {Icon ? (
          <Icon
            className={cn(
              "size-3 shrink-0",
              tone === "brand" ? "text-[#177a4f]" : "text-ink-muted/70",
            )}
            strokeWidth={1.8}
          />
        ) : null}
      </div>
      <div className="mt-1.5 flex items-end gap-1.5">
        <span className="font-heading text-[15px] leading-none font-semibold tracking-[-0.02em] sm:text-[17px]">
          {value}
        </span>
        {delta ? (
          <span className="pb-0.5 text-[8px] font-medium text-[#177a4f]">
            {delta}
          </span>
        ) : null}
      </div>
    </div>
  );
}

type StatusTone = "success" | "warning" | "neutral" | "info" | "danger";

const statusToneClass: Record<StatusTone, string> = {
  success: "bg-[#e8fbf2] text-[#146b45]",
  warning: "bg-[#fdf6e3] text-[#7a5310]",
  neutral: "bg-[#f0f2f1] text-[#525b56]",
  info: "bg-[#eef2ff] text-[#3f4f9c]",
  danger: "bg-[#fdeeee] text-[#a33f3f]",
};

export function StatusPill({
  children,
  tone = "success",
}: {
  children: ReactNode;
  tone?: StatusTone;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[7.5px] font-semibold whitespace-nowrap",
        statusToneClass[tone],
      )}
    >
      <span className="size-1 rounded-full bg-current opacity-70" />
      {children}
    </span>
  );
}

const avatarPalettes = [
  "bg-[#e8fbf2] text-[#177a4f]",
  "bg-[#eef2ff] text-[#4859a8]",
  "bg-[#fdf3e7] text-[#97652a]",
  "bg-[#f3eefe] text-[#6d51a8]",
  "bg-[#eaf4fb] text-[#35749a]",
];

export function Avatar({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const initials = name
    .replace(/^Dr\.\s*/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const hash = name
    .split("")
    .reduce((total, character) => total + character.charCodeAt(0), 0);
  const palette = avatarPalettes[hash % avatarPalettes.length];

  return (
    <span
      className={cn(
        "inline-flex size-6 shrink-0 items-center justify-center rounded-full text-[8px] font-semibold",
        palette,
        className,
      )}
    >
      {initials}
    </span>
  );
}

interface MiniAreaChartProps {
  data: number[];
  className?: string;
  height?: number;
}

export function MiniAreaChart({
  data,
  className,
  height = 72,
}: MiniAreaChartProps) {
  const width = 300;
  const padding = 4;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const coordinates = data.map((value, index) => {
    const x = padding + (index * (width - padding * 2)) / (data.length - 1);
    const y =
      height - padding - ((value - min) / range) * (height - padding * 2);
    return [x, y] as const;
  });

  const linePath = coordinates
    .map(([x, y], index) => `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");

  const areaPath = `${linePath} L ${width - padding},${height - padding} L ${padding},${height - padding} Z`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={cn("h-16 w-full text-brand", className)}
      aria-hidden="true"
    >
      {[0.25, 0.5, 0.75].map((fraction) => (
        <line
          key={fraction}
          x1="0"
          x2={width}
          y1={height * fraction}
          y2={height * fraction}
          stroke="#eef1ef"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      ))}
      <path d={areaPath} fill="currentColor" opacity="0.1" />
      <path
        d={linePath}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <circle
        cx={coordinates[coordinates.length - 1][0]}
        cy={coordinates[coordinates.length - 1][1]}
        r="2.5"
        fill="currentColor"
        stroke="#ffffff"
        strokeWidth="1.2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

interface MiniComparisonChartProps {
  primary: number[];
  secondary: number[];
  className?: string;
  height?: number;
}

export function MiniComparisonChart({
  primary,
  secondary,
  className,
  height = 72,
}: MiniComparisonChartProps) {
  const width = 300;
  const padding = 4;
  const values = [...primary, ...secondary];
  const max = Math.max(...values);
  const min = 0;
  const range = max - min || 1;

  const toPath = (data: number[]) => {
    const coordinates = data.map((value, index) => {
      const x = padding + (index * (width - padding * 2)) / (data.length - 1);
      const y =
        height - padding - ((value - min) / range) * (height - padding * 2);
      return [x, y] as const;
    });
    const line = coordinates
      .map(
        ([x, y], index) =>
          `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`,
      )
      .join(" ");
    return {
      line,
      area: `${line} L ${width - padding},${height - padding} L ${padding},${height - padding} Z`,
      last: coordinates[coordinates.length - 1],
    };
  };

  const primaryPath = toPath(primary);
  const secondaryPath = toPath(secondary);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={cn("w-full", className)}
      aria-hidden="true"
    >
      {[0.25, 0.5, 0.75].map((fraction) => (
        <line
          key={fraction}
          x1="0"
          x2={width}
          y1={height * fraction}
          y2={height * fraction}
          stroke="#eef1ef"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      ))}
      <path d={primaryPath.area} fill="#3ADE96" opacity="0.09" />
      <path
        d={secondaryPath.line}
        fill="none"
        stroke="#c3cbc6"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <path
        d={primaryPath.line}
        fill="none"
        stroke="#3ADE96"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
      <circle
        cx={primaryPath.last[0]}
        cy={primaryPath.last[1]}
        r="2.5"
        fill="#3ADE96"
        stroke="#ffffff"
        strokeWidth="1.2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

interface MiniBarChartProps {
  values: number[];
  labels?: string[];
  activeIndex?: number;
  className?: string;
}

export function MiniBarChart({
  values,
  labels,
  activeIndex,
  className,
}: MiniBarChartProps) {
  const max = Math.max(...values);

  return (
    <div className={className}>
      <div className="flex h-20 items-end gap-1.5">
        {values.map((value, index) => (
          <span
            key={`${value}-${index}`}
            className={cn(
              "flex-1 rounded-t-[3px] transition-colors",
              activeIndex === index ? "bg-brand" : "bg-[#e9edeb]",
            )}
            style={{ height: `${Math.max(8, (value / max) * 100)}%` }}
          />
        ))}
      </div>
      {labels ? (
        <div className="mt-1.5 flex gap-1.5">
          {labels.map((label) => (
            <span
              key={label}
              className="flex-1 text-center text-[7.5px] text-ink-muted"
            >
              {label}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function ProgressBar({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  return (
    <div className={cn("h-1.5 w-full rounded-full bg-[#eef1ef]", className)}>
      <div
        className="h-full rounded-full bg-brand"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

