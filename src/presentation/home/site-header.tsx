import Link from "next/link";
import { ArrowRightIcon } from "@/shared/ui/icons";

const navItems = [
  { label: "Products", href: "#products" },
  { label: "Projects", href: "#projects" },
  { label: "Partners", href: "#partners" },
  { label: "FAQ", href: "#faq" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#07111f]/82 text-white shadow-[0_12px_40px_rgba(2,6,23,0.18)] backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
        <Link href="#hero" className="text-sm font-bold tracking-normal">
          ALUXIL
        </Link>
        <nav aria-label="Primary navigation" className="hidden lg:block">
          <ul className="flex items-center gap-7 text-xs font-medium text-white/74">
            {navItems.map((item) => (
              <li key={item.href}>
                <a className="transition hover:text-white" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <div
            aria-label="Current language"
            className="hidden rounded-md border border-white/18 bg-white/10 px-2.5 py-1 text-xs font-semibold text-white/86 sm:block"
          >
            EN
          </div>
          <a
            href="#contact"
            className="inline-flex min-h-9 items-center justify-center gap-2 rounded-md border border-white/16 bg-white px-3 text-xs font-semibold text-zinc-950 transition hover:bg-cyan-50"
          >
            Configure
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}
