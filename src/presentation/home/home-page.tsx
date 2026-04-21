"use client";

import { useMemo, useState } from "react";
import type { HomeOverview, Locale } from "@/core/domain/home";
import { toneClasses } from "@/shared/design/tokens";
import { Panel } from "@/shared/ui/panel";
import { SectionHeading } from "@/shared/ui/section-heading";
import { AudienceSolutions } from "./audience-solutions";
import { BenefitGrid } from "./benefit-grid";
import { ContactSection } from "./contact-section";
import { ProjectPipeline } from "./project-pipeline";
import { ProductFeature } from "./product-feature";
import { ProductSystems } from "./product-systems";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { Testimonials } from "./testimonials";
import { WeatherHero } from "./weather-hero";

type HomePageProps = {
  overview: HomeOverview;
};

const copy = {
  de: {
    services: {
      eyebrow: "Service",
      title: "Von der ersten Vermessung bis zur finalen Montage",
      description:
        "Die wichtigsten Inhalte der Referenzseite bleiben erhalten: Beratung, Montage, kostenlose Lieferung und langfristige Garantie.",
    },
    products: {
      eyebrow: "Produkte",
      title: "Wandmontierte und freistehende Aluminium-Dachsysteme",
      description:
        "AW110 und AFW135 werden mit Groessen, Pfostenanzahl und Einstiegspreisen aus dem Shop gezeigt.",
      cardTitle: "Unsere Ueberdachungen",
      cardSubtitle:
        "Waehlen Sie das passende Modell und Ihre Wunschgroesse fuer Terrasse, Garten oder Carport.",
    },
    projects: {
      eyebrow: "Unsere Projekte",
      title: "Individuell geplant, passgenau umgesetzt",
      description:
        "Egal ob funktional, modern oder repraesentativ: ALUXIL begleitet von der Idee ueber die Planung bis zur Montage.",
      cardTitle: "Projektablauf",
      cardSubtitle:
        "Mock-Daten fuer Zeitplan, Projektphase und Montagebereitschaft.",
      badge: "Demo",
      dueLabel: "Ziel",
    },
    solutions: {
      eyebrow: "Loesungen",
      title: "Perfekte Systeme fuer private und professionelle Flaechen.",
      description:
        "Unsere Ueberdachungen werden exakt auf die Anforderungen von Alltag, Architektur und Nutzung zugeschnitten.",
      imageEyebrow: "Individuell geplant",
      imageTitle: "Passgenau umgesetzt fuer moderne Architektur.",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Sie benoetigen Hilfe beim Bestellen?",
      description:
        "ALUXIL beraet per Telefon, E-Mail oder Kontaktformular. Die Demo-Services halten diese Ablaufe sichtbar, bevor echte APIs angeschlossen werden.",
    },
    testimonials: {
      eyebrow: "Kundenstimmen",
      title: "Was unsere Kunden sagen",
      description:
        "Erfahrungen zufriedener ALUXIL-Kunden mit Beratung, Lieferung und Montage.",
    },
    contact: {
      call: "Rufen Sie uns an",
      consent: "Ich stimme der Datenschutzerklaerung zu.",
      description:
        "Unverbindlich und kostenlos. Wir beraten Sie zum passenden Modell, den Abmessungen und der Montage.",
      email: "E-Mail-Adresse *",
      eyebrow: "Kontakt",
      firstName: "Vorname *",
      lastName: "Nachname *",
      message: "Ihre Nachricht...",
      phone: "Telefon",
      response: "Erreichbarkeit",
      send: "Anfrage absenden",
      title: "Kontaktieren Sie uns",
    },
    footer: {
      description:
        "Aluminium-Terrassendaecher und Ueberdachungen fuer Eigenheime, professionelle Aussenbereiche und Architekturplanung.",
      links: ["Impressum", "Widerrufsbelehrung", "Kontakt", "Datenschutz"],
    },
  },
  en: {
    services: {
      eyebrow: "Service",
      title: "From first measurement to final assembly",
      description:
        "The reference store content remains available: consultation, installation, free delivery, and a long warranty.",
    },
    products: {
      eyebrow: "Products",
      title: "Wall-mounted and freestanding aluminium roof systems",
      description:
        "The AW110 and AFW135 product families are presented with sizes, post counts, and starting prices from the shop.",
      cardTitle: "Our roof systems",
      cardSubtitle:
        "Choose the model and size that fits your patio, garden, or carport.",
    },
    projects: {
      eyebrow: "Projects",
      title: "Individually planned, precisely implemented",
      description:
        "Functional, modern, or representative: ALUXIL supports every step from first idea to installation.",
      cardTitle: "Project pipeline",
      cardSubtitle:
        "Mock data for schedule, project phase, and installation readiness.",
      badge: "Demo",
      dueLabel: "target",
    },
    solutions: {
      eyebrow: "Solutions",
      title: "Perfect systems for private and professional spaces.",
      description:
        "Every canopy is tailored to the demands of everyday use, architecture, and outdoor comfort.",
      imageEyebrow: "Custom planned",
      imageTitle: "Precisely implemented for modern architecture.",
    },
    faq: {
      eyebrow: "FAQ",
      title: "Need help choosing or ordering?",
      description:
        "ALUXIL can advise by phone, email, or the contact form. Demo services keep those workflows visible before real APIs are connected.",
    },
    testimonials: {
      eyebrow: "Customer voices",
      title: "What ALUXIL customers say",
      description:
        "Experiences from satisfied ALUXIL customers across consultation, delivery, and installation.",
    },
    contact: {
      call: "Call us",
      consent: "I agree to the privacy policy.",
      description:
        "Non-binding and free. We advise you on the right model, dimensions, and installation path.",
      email: "Email address *",
      eyebrow: "Contact",
      firstName: "First name *",
      lastName: "Last name *",
      message: "Your message...",
      phone: "Phone",
      response: "Availability",
      send: "Send request",
      title: "Tell us about your project",
    },
    footer: {
      description:
        "Aluminium patio roofs and canopy systems for private homes, professional outdoor spaces, and architectural planning.",
      links: ["Legal notice", "Cancellation policy", "Contact", "Privacy"],
    },
  },
} satisfies Record<Locale, object>;

export function HomePage({ overview }: HomePageProps) {
  const [locale, setLocale] = useState<Locale>(overview.defaultLocale);
  const content = overview.locales[locale];
  const t = useMemo(() => copy[locale], [locale]);

  return (
    <>
      <SiteHeader locale={locale} onLocaleChange={setLocale} />
      <main className="min-h-screen bg-[var(--background)] text-zinc-950">
        <WeatherHero locale={locale} />

        <div className="post-hero-shell">
          <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {content.metrics.map((metric) => (
                <Panel key={metric.label} className="p-5">
                  <p className="text-sm font-medium text-zinc-500">
                    {metric.label}
                  </p>
                  <p className="mt-3 text-3xl font-semibold tracking-normal text-zinc-950">
                    {metric.value}
                  </p>
                  <p
                    className={`mt-4 inline-flex rounded-md border px-2.5 py-1 text-xs font-semibold ${toneClasses[metric.tone]}`}
                  >
                    {metric.delta}
                  </p>
                </Panel>
              ))}
            </div>
          </section>

          <section
            id="services"
            className="mx-auto max-w-7xl px-5 pb-12 sm:px-6 lg:px-8"
          >
            <SectionHeading
              eyebrow={t.services.eyebrow}
              title={t.services.title}
              description={t.services.description}
            />
            <div className="mt-8">
              <BenefitGrid benefits={content.benefits} />
            </div>
          </section>

          <ProductFeature locale={locale} />

          <section
            id="products"
            className="border-y border-zinc-200 bg-zinc-50 py-12"
          >
            <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-6 lg:px-8">
              <SectionHeading
                eyebrow={t.products.eyebrow}
                title={t.products.title}
                description={t.products.description}
              />
              <ProductSystems
                products={content.products}
                title={t.products.cardTitle}
                subtitle={t.products.cardSubtitle}
              />
            </div>
          </section>

          <section
            id="projects"
            className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-6 lg:grid-cols-[0.82fr_1fr] lg:px-8"
          >
            <SectionHeading
              eyebrow={t.projects.eyebrow}
              title={t.projects.title}
              description={t.projects.description}
            />
            <ProjectPipeline
              badge={t.projects.badge}
              dueLabel={t.projects.dueLabel}
              projects={content.projects}
              subtitle={t.projects.cardSubtitle}
              title={t.projects.cardTitle}
            />
          </section>

          <AudienceSolutions
            audiences={content.audiences}
            description={t.solutions.description}
            eyebrow={t.solutions.eyebrow}
            imageEyebrow={t.solutions.imageEyebrow}
            imageTitle={t.solutions.imageTitle}
            title={t.solutions.title}
          />

          <section
            id="faq"
            className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-6 lg:grid-cols-[0.72fr_1fr] lg:px-8"
          >
            <SectionHeading
              eyebrow={t.faq.eyebrow}
              title={t.faq.title}
              description={t.faq.description}
            />
            <div className="grid gap-4">
              {content.requests.map((request) => (
                <Panel key={request.id} className="p-5 sm:p-6">
                  <p className="text-sm font-semibold uppercase tracking-normal text-cyan-700">
                    {request.eta}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-zinc-950">
                    {request.client}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">
                    {request.request}
                  </p>
                </Panel>
              ))}
            </div>
          </section>

          <Testimonials
            description={t.testimonials.description}
            eyebrow={t.testimonials.eyebrow}
            testimonials={content.testimonials}
            title={t.testimonials.title}
          />
          <ContactSection contact={content.contact} copy={t.contact} />
          <SiteFooter contact={content.contact} copy={t.footer} />
        </div>
      </main>
    </>
  );
}
