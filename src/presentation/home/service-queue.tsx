import type { ServiceRequest } from "@/core/domain/home";
import { priorityLabels, toneClasses } from "@/shared/design/tokens";
import { Badge } from "@/shared/ui/badge";
import { Panel } from "@/shared/ui/panel";

const priorityTone = {
  low: toneClasses.neutral,
  medium: "border-sky-200 bg-sky-50 text-sky-800",
  high: toneClasses.attention,
} as const;

type ServiceQueueProps = {
  requests: ServiceRequest[];
};

export function ServiceQueue({ requests }: ServiceQueueProps) {
  return (
    <Panel className="p-5 sm:p-6">
      <h3 className="text-lg font-semibold text-zinc-950">Service queue</h3>
      <p className="mt-1 text-sm text-zinc-600">
        Mock support workload for client-facing API flows.
      </p>

      <div className="mt-6 divide-y divide-zinc-100">
        {requests.map((request) => (
          <article
            key={request.id}
            className="py-4 first:pt-0 last:pb-0"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h4 className="font-semibold text-zinc-950">
                  {request.client}
                </h4>
                <p className="mt-1 text-sm text-zinc-600">{request.request}</p>
              </div>
              <Badge className={priorityTone[request.priority]}>
                {priorityLabels[request.priority]}
              </Badge>
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-normal text-zinc-500">
              ETA {request.eta}
            </p>
          </article>
        ))}
      </div>
    </Panel>
  );
}
