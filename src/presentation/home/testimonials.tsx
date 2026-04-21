import type { Testimonial } from "@/core/domain/home";
import { Panel } from "@/shared/ui/panel";
import { SectionHeading } from "@/shared/ui/section-heading";

type TestimonialsProps = {
  testimonials: Testimonial[];
};

export function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section id="about" className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Customer voices"
        title="What ALUXIL customers say"
        description="Experiences from homeowners and project clients who needed a durable aluminium canopy with clear service."
      />
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <Panel key={testimonial.id} className="p-5 sm:p-6">
            <p className="text-base leading-7 text-zinc-700">
              &quot;{testimonial.quote}&quot;
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-cyan-700 text-sm font-bold text-white">
                {testimonial.initials}
              </div>
              <div>
                <p className="font-semibold text-zinc-950">
                  {testimonial.author}
                </p>
                <p className="text-sm text-zinc-500">{testimonial.location}</p>
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </section>
  );
}
