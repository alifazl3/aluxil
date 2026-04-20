import type { ProjectSummary } from "@/core/domain/home";
import { statusLabels, toneClasses } from "@/shared/design/tokens";
import { Badge } from "@/shared/ui/badge";
import { Panel } from "@/shared/ui/panel";

const statusTone = {
  concept: toneClasses.neutral,
  fabrication: "border-cyan-200 bg-cyan-50 text-cyan-800",
  installation: toneClasses.positive,
} as const;

type ProjectPipelineProps = {
  projects: ProjectSummary[];
};

export function ProjectPipeline({ projects }: ProjectPipelineProps) {
  return (
    <Panel className="p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-zinc-950">
            Project pipeline
          </h3>
          <p className="mt-1 text-sm text-zinc-600">
            Mocked API data for schedule, phase, and installation readiness.
          </p>
        </div>
        <Badge className="border-zinc-200 bg-zinc-50 text-zinc-700">
          Live demo
        </Badge>
      </div>

      <div className="mt-6 divide-y divide-zinc-100">
        {projects.map((project) => (
          <article key={project.id} className="py-4 first:pt-0 last:pb-0">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h4 className="font-semibold text-zinc-950">{project.name}</h4>
                <p className="mt-1 text-sm text-zinc-600">
                  {project.location} · due {project.dueDate}
                </p>
              </div>
              <Badge className={statusTone[project.status]}>
                {statusLabels[project.status]}
              </Badge>
            </div>
            <div className="mt-4 h-2 rounded-full bg-zinc-100">
              <div
                className="h-full rounded-full bg-cyan-600"
                style={{ width: `${project.progress}%` }}
              />
            </div>
            <p className="mt-2 text-xs font-medium text-zinc-500">
              {project.progress}% complete
            </p>
          </article>
        ))}
      </div>
    </Panel>
  );
}
