import clsx from "clsx";

type GlassProps = {
  children: React.ReactNode;
  variant?: "white" | "blue";
  className?: string;
  /** Use fully opaque background on mobile — for cards inside scrolling lists */
  solidMobile?: boolean;
};

export default function Glass({
  children,
  variant = "white",
  className,
  solidMobile = false,
}: GlassProps) {
  const base = clsx(
    "border rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.25)]",
    "md:backdrop-blur-xl",
  );

  const variants = {
    white: clsx(
      solidMobile ? "bg-[#07111f]" : "bg-[#07111f]/90",
      "md:bg-white/5 border-white/10",
    ),
    blue: clsx(
      solidMobile ? "bg-[#07111f]" : "bg-[#07111f]/90",
      "md:bg-sky-500/10 border-sky-400/20 shadow-[0_8px_32px_rgba(0,168,255,0.15)]",
    ),
  };

  return (
    <div className={clsx(base, variants[variant], className)}>{children}</div>
  );
}
