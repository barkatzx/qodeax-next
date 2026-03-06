import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import * as React from "react";
import { twMerge } from "tailwind-merge";

/* helper function */
function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

/* button variants */
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all focus:outline-none",
  {
    variants: {
      variant: {
        default: "bg-black text-white",

        gradient:
          "text-white bg-[linear-gradient(135deg,#3b82f6_0%,#60a5fa_100%)] hover:opacity-90",
      },

      size: {
        default: "h-10 px-4 py-2",
        lg: "h-12 px-6",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

/* button props */
export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

/* button component */
export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
