import type { ContactProfile } from "@/core/domain/home";

type SiteFooterProps = {
  contact: ContactProfile;
};

const links = ["Legal notice", "Cancellation policy", "Contact", "Privacy"];

export function SiteFooter({ contact }: SiteFooterProps) {
  return (
    <footer className="bg-[#07111f] text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
        <div>
          <p className="text-lg font-bold tracking-normal">ALUXIL</p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-white/68">
            Aluminium patio roofs and canopy systems for private homes,
            professional outdoor spaces, and architectural planning.
          </p>
          <p className="mt-4 text-sm text-white/68">{contact.phone}</p>
        </div>
        <nav aria-label="Footer navigation">
          <ul className="grid gap-2 text-sm text-white/72 sm:grid-cols-2 md:grid-cols-1">
            {links.map((link) => (
              <li key={link}>
                <a className="transition hover:text-white" href="#contact">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/10 px-5 py-4 text-center text-xs text-white/52">
        &copy; 2026 ALUXIL. Demonstration frontend.
      </div>
    </footer>
  );
}
