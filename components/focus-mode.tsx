import type { AtlasPlanResponse } from "@/lib/atlas-plan-schema";

type FocusModeProps = {
  onFocusTaskChange?: (
    field: "estimatedMinutes" | "firstStep" | "title" | "whyNow",
    value: number | string
  ) => void;
  plan: AtlasPlanResponse;
};

export function FocusMode({ onFocusTaskChange, plan }: FocusModeProps) {
  return (
    <aside
      className="reveal glass-card rounded-[30px] p-6 sm:p-8"
      style={{ animationDelay: "460ms" }}
    >
      <p className="section-label">Focus Mode</p>
      {onFocusTaskChange ? (
        <input
          className="mt-3 w-full rounded-[20px] border border-transparent bg-white/78 px-4 py-3 text-3xl leading-tight text-balance text-[var(--text)] outline-none transition focus:border-[var(--accent)] focus:bg-white"
          type="text"
          value={plan.focusTask.title}
          onChange={(event) => onFocusTaskChange("title", event.target.value.slice(0, 120))}
        />
      ) : (
        <h2 className="mt-3 text-3xl leading-tight text-balance">{plan.focusTask.title}</h2>
      )}
      <p className="mt-4 font-sans text-base leading-7 text-[var(--muted)]">
        One clear task is more valuable than five half-started intentions. Atlas picks the smallest
        meaningful move that creates visible momentum.
      </p>

      <div className="mt-6 rounded-[24px] border border-[var(--border)] bg-white/75 p-5">
        <p className="font-sans text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
          Why this now
        </p>
        {onFocusTaskChange ? (
          <textarea
            className="mt-3 min-h-24 w-full resize-none rounded-[16px] border border-transparent bg-[#f7f4ee] px-3 py-3 font-sans text-sm leading-6 text-[var(--text)] outline-none transition focus:border-[var(--accent)] focus:bg-white"
            value={plan.focusTask.whyNow}
            onChange={(event) => onFocusTaskChange("whyNow", event.target.value.slice(0, 180))}
          />
        ) : (
          <p className="mt-3 font-sans text-sm leading-6 text-[var(--text)]">{plan.focusTask.whyNow}</p>
        )}
      </div>

      <div className="mt-4 rounded-[24px] border border-[var(--border)] bg-white/75 p-5">
        <p className="font-sans text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
          First move
        </p>
        <div className="mt-4 flex gap-3">
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] font-sans text-xs font-semibold text-white">
            1
          </span>
          {onFocusTaskChange ? (
            <textarea
              className="min-h-20 w-full resize-none rounded-[16px] border border-transparent bg-[#f7f4ee] px-3 py-3 font-sans text-sm leading-6 text-[var(--text)] outline-none transition focus:border-[var(--accent)] focus:bg-white"
              value={plan.focusTask.firstStep}
              onChange={(event) =>
                onFocusTaskChange("firstStep", event.target.value.slice(0, 180))
              }
            />
          ) : (
            <span className="font-sans text-sm leading-6 text-[var(--text)]">{plan.focusTask.firstStep}</span>
          )}
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <article className="rounded-[24px] border border-[var(--border)] bg-white/75 p-5">
          <p className="font-sans text-xs uppercase tracking-[0.22em] text-[var(--muted)]">
            Estimated time
          </p>
          {onFocusTaskChange ? (
            <div className="mt-3 flex items-center gap-3">
              <input
                className="w-24 rounded-full border border-[var(--border)] bg-white px-3 py-2 font-sans text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
                type="number"
                min={5}
                max={180}
                step={5}
                value={plan.focusTask.estimatedMinutes}
                onChange={(event) =>
                  onFocusTaskChange(
                    "estimatedMinutes",
                    Math.max(5, Math.min(180, Number(event.target.value) || 5))
                  )
                }
              />
              <span className="font-sans text-sm leading-6 text-[var(--text)]">minutes</span>
            </div>
          ) : (
            <p className="mt-3 font-sans text-sm leading-6 text-[var(--text)]">
              {plan.focusTask.estimatedMinutes} minutes
            </p>
          )}
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
