import type { HomeOverview } from "@/core/domain/home";
import { toneClasses } from "@/shared/design/tokens";
import { Panel } from "@/shared/ui/panel";
import { SectionHeading } from "@/shared/ui/section-heading";
import { AudienceSolutions } from "./audience-solutions";
import { BenefitGrid } from "./benefit-grid";
import { ContactSection } from "./contact-section";
import { ProjectPipeline } from "./project-pipeline";
import { ProductSystems } from "./product-systems";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import { Testimonials } from "./testimonials";
import { WeatherHero } from "./weather-hero";

type HomePageProps = {
  overview: HomeOverview;
};

export function HomePage({ overview }: HomePageProps) {
  return (
    <main className="min-h-screen bg-[var(--background)] text-zinc-950">
      <SiteHeader />
      <WeatherHero />

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {overview.metrics.map((metric) => (
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
          eyebrow="Service"
          title="From first measurement to final assembly"
          description="The source store highlights consultation, installation, free delivery, and a long warranty. Those promises are now part of this English ALUXIL experience."
        />
        <div className="mt-8">
          <BenefitGrid benefits={overview.benefits} />
        </div>
      </section>

      <section
        id="products"
        className="border-y border-zinc-200 bg-zinc-50 py-12"
      >
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Products"
            title="Wall-mounted and freestanding aluminium roof systems"
            description="The AW110 and AFW135 product families are presented with the key sizes, post counts, and starting prices from the reference shop."
          />
          <ProductSystems products={overview.products} />
        </div>
      </section>

      <section
        id="projects"
        className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-6 lg:grid-cols-[0.82fr_1fr] lg:px-8"
      >
        <SectionHeading
          eyebrow="Projects"
          title="Individually planned, precisely implemented"
          description="Functional, modern, or representative: ALUXIL canopies are tailored from the first idea through planning and installation."
        />
        <ProjectPipeline projects={overview.projects} />
      </section>

      <AudienceSolutions audiences={overview.audiences} />

      <section
        id="faq"
        className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-6 lg:grid-cols-[0.72fr_1fr] lg:px-8"
      >
        <SectionHeading
          eyebrow="FAQ"
          title="Need help choosing or ordering?"
          description="ALUXIL can advise by phone, email, or the contact form. The demo service layer keeps these workflows available before backend APIs are connected."
        />
        <div className="grid gap-4">
          {overview.requests.map((request) => (
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

      <Testimonials testimonials={overview.testimonials} />
      <ContactSection contact={overview.contact} />
      <SiteFooter contact={overview.contact} />
    </main>
  );
}
