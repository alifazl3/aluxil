"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setPortalRoot(document.body);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const header = (
    <header className="aluxil-site-nav" aria-label="Primary navigation">
      <Link href="/" className="aluxil-site-nav__brand">
        Aluxil
      </Link>
      <nav className="aluxil-site-nav__links">
        {navItems[locale].map((item) => (
          <a key={`${item.href}-${item.label}`} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <div className="aluxil-language-switch" aria-label="Language selection">
        {(["de", "en"] as const).map((item) => (
          <button
            key={item}
            aria-pressed={locale === item}
            type="button"
            onClick={() => onLocaleChange(item)}
          >
            {item.toUpperCase()}
          </button>
        ))}
      </div>
    </header>
  );

  if (!portalRoot) {
    return header;
  }

  return createPortal(header, portalRoot);
}
