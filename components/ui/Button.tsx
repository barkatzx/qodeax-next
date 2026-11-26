import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn, isExternalHref } from "@/lib/utils";

export const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background-color,border-color,color,box-shadow] duration-300 ease-out focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-canvas focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:transition-transform [&_svg]:duration-300 group-hover:[&_svg]:translate-x-0.5 group-hover:[&_svg]:-translate-y-0.5",
  {
    variants: {
      variant: {
        primary:
          "bg-brand text-brand-foreground shadow-[0_1px_2px_rgba(21,27,25,0.16),0_10px_30px_-18px_rgba(58,222,150,0.9)] hover:bg-brand-strong hover:shadow-[0_1px_2px_rgba(21,27,25,0.16),0_16px_40px_-16px_rgba(58,222,150,0.75)]",
        secondary:
          "border border-line-strong bg-surface text-ink shadow-[0_1px_2px_rgba(21,27,25,0.03)] hover:border-brand/45 hover:bg-white hover:shadow-[0_12px_30px_-24px_rgba(21,27,25,0.3)]",
        dark: "bg-dark text-white shadow-[0_10px_30px_-20px_rgba(21,27,25,0.8)] hover:bg-dark-hover",
        outlineLight:
          "border border-white/15 bg-white/[0.03] text-white hover:border-brand/50 hover:bg-white/[0.07]",
        ghost: "text-ink-soft hover:bg-ink/5 hover:text-ink",
      },
      size: {
        sm: "h-9 px-4 text-[12.5px]",
        md: "h-11 px-5 text-[13.5px]",
        lg: "h-12 px-6 text-[14.5px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

interface ButtonLinkProps
  extends ButtonVariantProps,
    Omit<ComponentPropsWithoutRef<"a">, "className" | "href"> {
  href: string;
  className?: string;
  children: ReactNode;
}

export function ButtonLink({
  href,
  variant,
  size,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  const classes = cn(buttonVariants({ variant, size }), className);

  if (isExternalHref(href)) {
    const isHttp = /^https?:/.test(href);
    return (
      <a
        href={href}
        target={isHttp ? "_blank" : undefined}
        rel={isHttp ? "noopener noreferrer" : undefined}
        className={classes}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {children}
    </Link>
  );
}

export interface ButtonProps
  extends ButtonVariantProps,
    Omit<ComponentPropsWithoutRef<"button">, "className"> {
  className?: string;
  children: ReactNode;
}

export function Button({
  variant,
  size,
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </button>
  );
}
