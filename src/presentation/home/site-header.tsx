"use client";

import Link from "next/link";
import type { Locale } from "@/core/domain/home";

const navItems = {
  de: [
    { label: "Schiebe", href: "#products" },
    { label: "Daecher", href: "#products" },
    { label: "Pergola", href: "#projects" },
    { label: "Markisen", href: "#partners" },
    { label: "Kontakt", href: "#contact" },
  ],
  en: [
    { label: "Sliding", href: "#products" },
    { label: "Roofs", href: "#products" },
    { label: "Pergola", href: "#projects" },
    { label: "Awnings", href: "#partners" },
    { label: "Contact", href: "#contact" },
  ],
} satisfies Record<Locale, { label: string; href: string }[]>;

type SiteHeaderProps = {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
};

export function SiteHeader({ locale, onLocaleChange }: SiteHeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-[100] overflow-x-clip border-b border-white/10 bg-[#020617]/72 text-white backdrop-blur-md">
      <div className="mx-auto flex h-11 w-full max-w-7xl min-w-0 items-center justify-between gap-3 px-5 sm:px-6 lg:px-8">
        <Link href="/" className="shrink-0 text-sm font-bold tracking-normal">
          Aluxil
        </Link>
        <div className="flex min-w-0 items-center gap-3">
          <nav
            aria-label="Primary navigation"
            className="hidden min-w-0 md:block"
          >
            <ul className="flex min-w-0 items-center gap-4 text-[11px] font-medium text-white/72 lg:gap-7 lg:text-xs">
              {navItems[locale].map((item) => (
                <li key={`${item.href}-${item.label}`}>
                  <a
                    className="whitespace-nowrap transition hover:text-white"
                    href={item.href}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex shrink-0 items-center gap-2 text-xs font-semibold">
            {(["de", "en"] as const).map((item) => (
              <button
                key={item}
                type="button"
                className={`flex h-8 min-w-14 items-center justify-center rounded-full px-4 transition ${
                  locale === item
                    ? "bg-[#f3eee7] text-zinc-950"
                    : "bg-black/70 text-white/74 hover:bg-black/82 hover:text-white"
                }`}
                onClick={() => onLocaleChange(item)}
              >
                {item.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
