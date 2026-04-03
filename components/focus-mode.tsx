import type { AtlasPlanResponse } from "@/lib/atlas-plan-schema";

type FocusModeProps = {
  plan: AtlasPlanResponse;
};

export function FocusMode({ plan }: FocusModeProps) {
  return (
    <aside
      className="reveal glass-card rounded-[30px] p-6 sm:p-8"
      style={{ animationDelay: "460ms" }}
    >
      <p className="section-label">Focus Mode</p>
      <h2 className="mt-3 text-3xl leading-tight text-balance">{plan.focusTask.title}</h2>
      <p className="mt-4 font-sans text-base leading-7 text-[var(--muted)]">
        One clear task is more valuable than five half-started intentions. Atlas picks the smallest
        meaningful move that creates visible momentum.
      </p>

      <div className="mt-6 rounded-[24px] border border-[var(--border)] bg-white/75 p-5">
        <p className="font-sans text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
          Why this now
        </p>
        <p className="mt-3 font-sans text-sm leading-6 text-[var(--text)]">{plan.focusTask.whyNow}</p>
      </div>

      <div className="mt-4 rounded-[24px] border border-[var(--border)] bg-white/75 p-5">
        <p className="font-sans text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
          First move
        </p>
        <div className="mt-4 flex gap-3">
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] font-sans text-xs font-semibold text-white">
            1
          </span>
          <span className="font-sans text-sm leading-6 text-[var(--text)]">{plan.focusTask.firstStep}</span>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <article className="rounded-[24px] border border-[var(--border)] bg-white/75 p-5">
          <p className="font-sans text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
            Estimated time
          </p>
          <p className="mt-3 font-sans text-sm leading-6 text-[var(--text)]">
            {plan.focusTask.estimatedMinutes} minutes
          </p>
        </article>
        <article className="rounded-[24px] border border-[var(--border)] bg-white/75 p-5">
          <p className="font-sans text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
            Win condition
          </p>
          <p className="mt-3 font-sans text-sm leading-6 text-[var(--text)]">
            Finish this first block before reorganizing the rest of the week.
          </p>
        </article>
      </div>
    </aside>
  );
}
