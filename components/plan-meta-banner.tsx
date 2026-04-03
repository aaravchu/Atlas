import type { AtlasPlanResponse } from "@/lib/atlas-plan-schema";

type PlanMetaBannerProps = {
  plan: AtlasPlanResponse;
};

const modeCopy = {
  live: "Live planning",
  mock: "Mock planning",
  fallback: "Fallback planning"
} as const;

export function PlanMetaBanner({ plan }: PlanMetaBannerProps) {
  return (
    <section className="glass-card flex flex-col gap-3 rounded-[24px] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="section-label">Structured in seconds</p>
        <p className="mt-2 font-sans text-sm leading-6 text-[var(--muted)]">
          {plan.meta.warning ?? "Generated from your input and shaped into an execution-ready plan."}
        </p>
      </div>
      <span className="inline-flex w-fit items-center rounded-full bg-[var(--accent-soft)] px-3 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
        {modeCopy[plan.meta.mode]}
      </span>
    </section>
  );
}
