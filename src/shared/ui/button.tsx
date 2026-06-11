import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  icon?: ReactNode;
  variant?: "primary" | "secondary";
};

const variants = {
  primary:
    "border-transparent bg-zinc-950 text-white hover:bg-zinc-800 focus-visible:outline-zinc-950",
  secondary:
    "border-zinc-300 bg-white text-zinc-950 hover:border-zinc-500 focus-visible:outline-zinc-700",
};

export function Button({
  children,
  className,
  icon,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <a
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-4 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        variants[variant],
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      {icon}
    </a>
  );
}
