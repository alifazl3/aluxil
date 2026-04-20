import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

type PanelProps = {
  children: ReactNode;
  className?: string;
};

export function Panel({ children, className }: PanelProps) {
  return (
    <section
      className={cn(
        "rounded-lg border border-zinc-200 bg-white shadow-[0_18px_50px_rgba(39,39,42,0.06)]",
        className,
      )}
    >
      {children}
    </section>
  );
}
