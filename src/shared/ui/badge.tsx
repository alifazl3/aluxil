import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center rounded-md border px-2.5 text-xs font-semibold",
        className,
      )}
    >
      {children}
    </span>
  );
}
