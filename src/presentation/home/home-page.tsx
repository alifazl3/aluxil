import Link from "next/link";
import type { HomeOverview } from "@/core/domain/home";
import { toneClasses } from "@/shared/design/tokens";
import { Button } from "@/shared/ui/button";
import { ArrowRightIcon } from "@/shared/ui/icons";
import { Panel } from "@/shared/ui/panel";
import { SectionHeading } from "@/shared/ui/section-heading";
import { ProjectPipeline } from "./project-pipeline";
import { ProductSystems } from "./product-systems";
import { ServiceQueue } from "./service-queue";
import { SystemVisual } from "./system-visual";

type HomePageProps = {
  overview: HomeOverview;
};

export function HomePage({ overview }: HomePageProps) {
  return (
    <main className="min-h-screen bg-[var(--background)] text-zinc-950">
      <header className="border-b border-zinc-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-lg font-bold tracking-normal text-zinc-950"
          >
            ALUXIL
          </Link>
          <nav aria-label="Primary navigation" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm font-medium text-zinc-600">
              <li>
                <a className="transition hover:text-zinc-950" href="#projects">
                  Projects
                </a>
              </li>
              <li>
                <a className="transition hover:text-zinc-950" href="#systems">
                  Systems
                </a>
              </li>
              <li>
                <a className="transition hover:text-zinc-950" href="#services">
                  Services
                </a>
              </li>
            </ul>
          </nav>
          <Button
            href="/api/overview"
            variant="secondary"
            icon={<ArrowRightIcon className="h-4 w-4" />}
          >
            Mock API
          </Button>
        </div>
      </header>

      <section className="border-b border-zinc-200 bg-zinc-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-6 lg:grid-cols-[1fr_0.86fr] lg:px-8 lg:py-16">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-cyan-700">
              Frontend demonstration
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-normal text-zinc-950 sm:text-5xl">
              Operations workspace for aluminum systems teams.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-600">
              A Next.js and TypeScript foundation with clean boundaries,
              reusable UI primitives, and mock services that keep the demo fully
              functional while real APIs are still taking shape.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                href="#projects"
                icon={<ArrowRightIcon className="h-4 w-4" />}
              >
                View project flow
              </Button>
              <Button href="#systems" variant="secondary">
                Explore systems
              </Button>
            </div>
          </div>
          <SystemVisual />
        </div>
      </section>

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
        id="projects"
        className="mx-auto grid max-w-7xl gap-8 px-5 pb-12 sm:px-6 lg:grid-cols-[0.82fr_1fr] lg:px-8"
      >
        <SectionHeading
          eyebrow="Architecture"
          title="Thin routes, typed use cases, replaceable data providers."
          description="The page consumes an application use case. The use case depends on a provider contract. The current provider is mocked, and the API route publishes the same model for client-side demos."
        />
        <ProjectPipeline projects={overview.projects} />
      </section>

      <section
        id="systems"
        className="border-y border-zinc-200 bg-zinc-50 py-12"
      >
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-[1fr_0.86fr] lg:px-8">
          <ProductSystems products={overview.products} />
          <div className="flex flex-col justify-center">
            <SectionHeading
              eyebrow="Design system"
              title="A restrained interface that can grow without drifting."
              description="Buttons, badges, panels, status tones, spacing, and typography live in shared primitives so future screens stay consistent."
            />
          </div>
        </div>
      </section>

      <section
        id="services"
        className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-6 lg:grid-cols-[0.72fr_1fr] lg:px-8"
      >
        <SectionHeading
          eyebrow="Mock services"
          title="Demo-ready data for service workflows."
          description="The mock layer gives developers and stakeholders a working site before backend contracts are finalized."
        />
        <ServiceQueue requests={overview.requests} />
      </section>
    </main>
  );
}
