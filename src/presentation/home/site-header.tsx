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
  onSoundMutedChange: (muted: boolean) => void;
  soundMuted: boolean;
};

export function SiteHeader({
  locale,
  onLocaleChange,
  onSoundMutedChange,
  soundMuted,
}: SiteHeaderProps) {
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
      <div className="aluxil-site-nav__actions">
        <button
          type="button"
          className="aluxil-sound-toggle"
          aria-label={soundMuted ? "Turn sound on" : "Mute sound"}
          aria-pressed={!soundMuted}
          onClick={() => onSoundMutedChange(!soundMuted)}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4.6 9.3h3.1l4.6-4.1v13.6l-4.6-4.1H4.6z" />
            {soundMuted ? (
              <>
                <path d="m17.2 8.4 3.4 3.4" />
                <path d="m20.6 8.4-3.4 3.4" />
              </>
            ) : (
              <>
                <path d="M15.7 8.2a5 5 0 0 1 0 7.6" />
                <path d="M18.2 5.8a8.4 8.4 0 0 1 0 12.4" />
              </>
            )}
          </svg>
        </button>
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
      </div>
    </header>
  );

  if (!portalRoot) {
    return header;
  }

  return createPortal(header, portalRoot);
}
