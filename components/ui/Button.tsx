import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn, isExternalHref } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-canvas focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-brand text-brand-foreground shadow-[0_1px_2px_rgba(21,27,25,0.12)] hover:-translate-y-px hover:bg-brand-strong",
        secondary:
          "border border-line bg-surface text-ink hover:-translate-y-px hover:border-line-strong hover:bg-white",
        dark: "bg-dark text-white hover:-translate-y-px hover:bg-dark-hover",
        outlineLight:
          "border border-white/20 bg-transparent text-white hover:border-white/35 hover:bg-white/5",
        ghost: "text-ink-soft hover:bg-ink/5 hover:text-ink",
      },
      size: {
        sm: "h-9 px-4 text-[13px]",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-[15px]",
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
