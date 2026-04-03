import type { AtlasPlanResponse } from "@/lib/atlas-plan-schema";

type DashboardViewProps = {
  plan: AtlasPlanResponse;
};

export function DashboardView({ plan }: DashboardViewProps) {
  return (
    <section className="glass-card rounded-[30px] p-6 sm:p-8">
      <div
        className="reveal-soft flex flex-col gap-4 border-b border-[var(--border)] pb-6 sm:flex-row sm:items-end sm:justify-between"
        style={{ animationDelay: "80ms" }}
      >
        <div>
          <p className="section-label">Today + Week</p>
          <h2 className="mt-3 text-3xl leading-tight text-balance sm:text-4xl">
            A calmer week starts with fewer, sharper moves.
          </h2>
        </div>
        <p className="max-w-md font-sans text-sm leading-6 text-[var(--muted)]">{plan.summary}</p>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div
          className="reveal rounded-[28px] border border-[var(--border)] bg-white/78 p-5 sm:p-6"
          style={{ animationDelay: "180ms" }}
        >
          <div className="flex items-center justify-between">
            <p className="section-label">Prioritized Actions</p>
            <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 font-sans text-xs font-semibold text-[var(--accent)]">
              Ranked by urgency
            </span>
          </div>
          <div className="mt-5 space-y-3">
            {plan.priorities.map((task, index) => (
              <article
                key={task.title}
                className="rounded-[24px] border border-[var(--border)] bg-white px-4 py-5 shadow-[0_8px_24px_rgba(31,41,54,0.04)]"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] font-sans text-sm font-semibold text-[var(--accent)]">
                    {index + 1}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-[1.35rem] leading-tight text-balance">{task.title}</h3>
                      <span className="rounded-full border border-[var(--border)] px-2 py-1 font-sans text-xs text-[var(--muted)]">
                        {task.urgency} urgency
                      </span>
                    </div>
                    <p className="mt-2 font-sans text-sm leading-6 text-[var(--muted)]">
                      {task.reason}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div
          className="reveal rounded-[28px] border border-[var(--border)] bg-white/70 p-5"
          style={{ animationDelay: "320ms" }}
        >
          <p className="section-label">Today</p>
          <div className="mt-5 space-y-3">
            {plan.today.map((block) => (
              <article
                key={`${block.title}-${block.duration}`}
                className="grid gap-2 rounded-[22px] border border-[var(--border)] bg-white px-4 py-4 sm:grid-cols-[88px_1fr]"
              >
                <div>
                  <p className="font-sans text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                    Energy
                  </p>
                  <p className="mt-2 text-lg capitalize">{block.energy}</p>
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg leading-tight">{block.title}</h3>
                    <span className="rounded-full bg-[var(--accent-soft)] px-2 py-1 font-sans text-xs text-[var(--accent)]">
                      {block.duration}
                    </span>
                  </div>
                  <p className="mt-2 font-sans text-sm leading-6 text-[var(--muted)]">
                    Keep this block specific and protected. Atlas chose it because it creates momentum fast.
                  </p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-6 border-t border-[var(--border)] pt-6">
            <p className="section-label">This Week</p>
            <div className="mt-4 space-y-3">
              {plan.thisWeek.map((item) => (
                <article
                  key={`${item.title}-${item.category}`}
                  className="rounded-[22px] border border-[var(--border)] bg-white px-4 py-4"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg">{item.title}</h3>
                    <span className="rounded-full bg-[#f4efe4] px-3 py-1 font-sans text-xs text-[#6c6049]">
                      {item.category}
                    </span>
                  </div>
                  <p className="mt-2 font-sans text-sm leading-6 text-[var(--muted)]">
                    {item.deadline ? `Target: ${item.deadline}` : "No fixed deadline yet."}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
