import type { ContactProfile } from "@/core/domain/home";
import { ArrowRightIcon } from "@/shared/ui/icons";
import { Panel } from "@/shared/ui/panel";
import { SectionHeading } from "@/shared/ui/section-heading";

type ContactSectionProps = {
  contact: ContactProfile;
};

const fieldClass =
  "min-h-11 rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-cyan-700 focus:ring-4 focus:ring-cyan-100";

export function ContactSection({ contact }: ContactSectionProps) {
  return (
    <section
      id="contact"
      className="border-t border-zinc-200 bg-white py-14"
    >
      <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-[1fr_0.72fr] lg:px-8">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="Tell us about your project"
            description="Non-binding and free. The ALUXIL team will advise you on the right canopy model, dimensions, and installation path."
          />
          <Panel className="mt-8 p-5 sm:p-6">
            <form className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  aria-label="First name"
                  className={fieldClass}
                  placeholder="First name *"
                />
                <input
                  aria-label="Last name"
                  className={fieldClass}
                  placeholder="Last name *"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  aria-label="Email address"
                  className={fieldClass}
                  placeholder="Email address *"
                  type="email"
                />
                <input
                  aria-label="Phone"
                  className={fieldClass}
                  placeholder="Phone"
                  type="tel"
                />
              </div>
              <textarea
                aria-label="Project message"
                className={`${fieldClass} min-h-32 resize-y py-3`}
                placeholder="Your message..."
              />
              <label className="flex items-start gap-3 text-sm leading-6 text-zinc-600">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-zinc-300 text-cyan-700 focus:ring-cyan-600"
                />
                <span>I agree to the privacy policy.</span>
              </label>
              <button
                type="button"
                className="inline-flex min-h-11 w-fit items-center justify-center gap-2 rounded-md bg-zinc-950 px-4 text-sm font-semibold text-white transition hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-950"
              >
                Send request
                <ArrowRightIcon className="h-4 w-4" />
              </button>
            </form>
          </Panel>
        </div>
        <aside className="grid content-start gap-4">
          <Panel className="p-5 sm:p-6">
            <p className="text-sm font-semibold uppercase tracking-normal text-cyan-700">
              Call us
            </p>
            <p className="mt-3 text-2xl font-semibold tracking-normal text-zinc-950">
              {contact.phone}
            </p>
            <p className="mt-2 text-sm text-zinc-600">{contact.hours}</p>
          </Panel>
          <Panel className="p-5 sm:p-6">
            <p className="text-sm font-semibold uppercase tracking-normal text-cyan-700">
              Response
            </p>
            <p className="mt-3 text-lg font-semibold text-zinc-950">
              {contact.responseTime}
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              {contact.privacyNote}
            </p>
          </Panel>
          <Panel className="p-5 sm:p-6">
            <p className="text-sm font-semibold uppercase tracking-normal text-cyan-700">
              ALUXIL GmbH
            </p>
            <div className="mt-3 space-y-1 text-sm leading-6 text-zinc-600">
              {contact.address.map((line) => (
                <p key={line}>{line}</p>
              ))}
              <p>{contact.email}</p>
            </div>
          </Panel>
        </aside>
      </div>
    </section>
  );
}
