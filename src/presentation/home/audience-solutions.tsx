import Image from "next/image";
import type { AudienceSegment } from "@/core/domain/home";
import { SectionHeading } from "@/shared/ui/section-heading";

type AudienceSolutionsProps = {
  audiences: AudienceSegment[];
  eyebrow: string;
  imageEyebrow: string;
  imageTitle: string;
  title: string;
  description: string;
};

export function AudienceSolutions({
  audiences,
  description,
  eyebrow,
  imageEyebrow,
  imageTitle,
  title,
}: AudienceSolutionsProps) {
  return (
    <section
      id="partners"
      className="border-y border-zinc-200 bg-zinc-50 py-14"
    >
      <div className="mx-auto grid max-w-7xl gap-9 px-5 sm:px-6 lg:grid-cols-[0.92fr_1fr] lg:px-8">
        <div className="relative min-h-[340px] overflow-hidden rounded-lg bg-zinc-900 shadow-[0_24px_70px_rgba(24,24,27,0.16)]">
          <Image
            src="/hero/day.jpg"
            alt="ALUXIL aluminium canopy for a modern home"
            fill
            sizes="(max-width: 1024px) 100vw, 46vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/62 via-zinc-950/12 to-transparent" />
          <div className="absolute bottom-0 left-0 max-w-md p-6 text-white">
            <p className="text-sm font-semibold uppercase tracking-normal text-cyan-100">
              {imageEyebrow}
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-normal">
              {imageTitle}
            </h3>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {audiences.map((audience) => (
              <div
                key={audience.id}
                className="rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-semibold text-zinc-800"
              >
                {audience.title}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
