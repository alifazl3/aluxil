import { LayersIcon, SparkIcon } from "@/shared/ui/icons";

export function SystemVisual() {
  return (
    <div className="relative min-h-[340px] overflow-hidden rounded-lg border border-zinc-200 bg-zinc-950 p-5 text-white shadow-[0_22px_70px_rgba(39,39,42,0.22)]">
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:36px_36px]" />
      <div className="relative flex h-full min-h-[300px] flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/10">
            <LayersIcon className="h-5 w-5" />
          </div>
          <div className="rounded-md border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-normal text-cyan-100">
            Facade system
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="h-28 rounded-md border border-white/20 bg-white/10" />
          <div className="h-36 rounded-md border border-cyan-200/50 bg-cyan-200/20" />
          <div className="h-24 self-end rounded-md border border-white/20 bg-white/10" />
          <div className="h-20 rounded-md border border-white/20 bg-white/10" />
          <div className="h-28 rounded-md border border-white/20 bg-white/10" />
          <div className="h-32 rounded-md border border-cyan-200/50 bg-cyan-200/20" />
        </div>

        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-medium text-cyan-100">
              Configured from mock APIs
            </p>
            <p className="mt-2 max-w-xs text-2xl font-semibold tracking-normal">
              Specification, fabrication, and service data in one frontend.
            </p>
          </div>
          <SparkIcon className="hidden h-8 w-8 text-cyan-200 sm:block" />
        </div>
      </div>
    </div>
  );
}
