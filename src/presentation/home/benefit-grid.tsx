import type { SiteBenefit } from "@/core/domain/home";
import { Panel } from "@/shared/ui/panel";

type BenefitGridProps = {
  benefits: SiteBenefit[];
};

export function BenefitGrid({ benefits }: BenefitGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {benefits.map((benefit) => (
        <Panel key={benefit.id} className="p-5 sm:p-6">
          <h3 className="text-base font-semibold text-zinc-950">
            {benefit.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            {benefit.description}
          </p>
        </Panel>
      ))}
    </div>
  );
}
