import Link from "next/link";
import { LandingResumeCta } from "@/components/landing-resume-cta";

const previewInput =
  "I have 2 midterms next week, need to recruit for consulting, lead a club, and I'm behind on assignments.";

const priorityItems = [
  {
    title: "Do one timed econ set and review mistakes",
    note: "Closest exam pressure, highest score lift.",
    meta: "High urgency"
  },
  {
    title: "Refine Bain application answers and resume bullets",
    note: "Moves a real recruiting lane forward this week.",
    meta: "Career"
  }
];

const todayItems = [
  "75 min: timed econ set + error review",
  "45 min: tighten Bain responses",
  "30 min: draft next exec meeting agenda"
];

export default function HomePage() {
  return (
    <main className="landing-shell min-h-screen px-4 py-4 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 pb-16">
        <header className="landing-nav rounded-[28px] px-5 py-4 sm:px-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="landing-orb" />
              <span className="landing-wordmark">Atlas</span>
            </div>

            <nav className="flex flex-wrap gap-2">
              <a className="landing-pill-button" href="#how-it-works">
                How it works
              </a>
              <a className="landing-pill-button" href="#preview">
                Product
              </a>
              <LandingResumeCta />
              <Link className="landing-cta" href="/start">
                Try Atlas
              </Link>
            </nav>
          </div>
        </header>

        <section className="grid gap-8 pt-4 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <div className="space-y-7">
            <div className="space-y-4">
              <p className="landing-kicker">Built for students carrying a lot at once</p>
              <h1 className="max-w-3xl text-6xl leading-[0.92] tracking-[-0.07em] text-[var(--landing-ink)] sm:text-7xl lg:text-[5.8rem]">
                Turn chaos into execution.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[var(--landing-ink-soft)] sm:text-[1.18rem]">
                Atlas helps students turn classes, recruiting, and everything else into a clear
                plan you can actually follow.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link className="landing-cta" href="/start">
                Try Atlas
              </Link>
              <LandingResumeCta />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
              <p className="text-sm leading-6 text-[var(--landing-muted)]">
                No setup. Just paste your week and go.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="landing-chip">Classes without mental sprawl</div>
              <div className="landing-chip">Recruiting with real prioritization</div>
              <div className="landing-chip">Clubs and side projects that still fit</div>
            </div>
          </div>

          <div className="landing-card-stack lg:pl-10">
            <div className="landing-main-preview">
              <div className="flex items-center justify-between gap-3">
                <p className="landing-section-label">Messy input</p>
                <span className="landing-floating-tag">Structured in seconds</span>
              </div>
              <div className="mt-4 rounded-[24px] border border-[var(--landing-line)] bg-white/78 px-5 py-5">
                <p className="font-sans text-base leading-7 text-[var(--landing-ink)]">
                  {previewInput}
                </p>
              </div>

              <div className="mt-5 grid gap-3">
                {priorityItems.map((item) => (
                  <article key={item.title} className="landing-task-row">
                    <div>
                      <h2 className="landing-task-title">{item.title}</h2>
                      <p className="landing-task-note">{item.note}</p>
                    </div>
                    <span className="landing-task-pill">{item.meta}</span>
                  </article>
                ))}
              </div>
            </div>

            <div className="landing-side-note landing-side-note-offset">
              <p className="landing-section-label">Today</p>
              <div className="mt-4 space-y-3">
                {todayItems.map((item) => (
                  <div key={item} className="landing-metric-card">
                    <span className="landing-metric-value">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="landing-focus-card landing-focus-offset">
              <p className="landing-section-label">Focus mode</p>
              <h2 className="mt-3 text-3xl leading-[1.02] tracking-[-0.05em] text-[var(--landing-ink)]">
                One sharp block.
                <br />
                Then the rest of the week.
              </h2>
              <p className="mt-4 text-sm leading-7 text-[var(--landing-ink-soft)]">
                Atlas does not just store tasks. It decides what matters and gives you a first move
                worth doing now.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <div className="landing-soft-card">
            <p className="landing-section-label">Problem</p>
            <p className="landing-problem-text mt-4">
              Classes, recruiting, clubs, deadlines. Too many responsibilities spread across too
              many tools, and none of them decide what matters first.
            </p>
          </div>

          <div id="how-it-works" className="grid gap-4 sm:grid-cols-3">
            <article className="landing-soft-card">
              <p className="landing-mini-label">01</p>
              <h2 className="mt-4 text-2xl leading-tight tracking-[-0.04em] text-[var(--landing-ink)]">
                Drop everything in
              </h2>
              <p className="mt-3 text-sm leading-7 text-[var(--landing-ink-soft)]">
                Notes, assignments, deadlines, recruiting tasks, club responsibilities.
              </p>
            </article>

            <article className="landing-soft-card">
              <p className="landing-mini-label">02</p>
              <h2 className="mt-4 text-2xl leading-tight tracking-[-0.04em] text-[var(--landing-ink)]">
                Atlas structures it
              </h2>
              <p className="mt-3 text-sm leading-7 text-[var(--landing-ink-soft)]">
                Adaptive follow-up questions, priorities, a weekly plan, and a focus task.
              </p>
            </article>

            <article className="landing-soft-card">
              <p className="landing-mini-label">03</p>
              <h2 className="mt-4 text-2xl leading-tight tracking-[-0.04em] text-[var(--landing-ink)]">
                Execute clearly
              </h2>
              <p className="mt-3 text-sm leading-7 text-[var(--landing-ink-soft)]">
                Edit the plan, build timeblocks, and export a calendar you can actually use.
              </p>
            </article>
          </div>
        </section>

        <section id="preview" className="grid gap-6 lg:grid-cols-[1.04fr_0.96fr]">
          <div className="landing-card rounded-[34px] p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="landing-section-label">Product preview</p>
                <h2 className="mt-3 text-4xl leading-[0.98] tracking-[-0.06em] text-[var(--landing-ink)]">
                  Built for students who are doing a lot.
                </h2>
              </div>
              <span className="landing-floating-tag">Live product</span>
            </div>

            <div className="mt-6 grid gap-4">
              <div className="landing-metric-card">
                <div>
                  <p className="landing-metric-label">Messy input</p>
                  <p className="mt-2 text-base leading-7 text-[var(--landing-ink-soft)]">
                    Raw notes become a usable week without manual sorting.
                  </p>
                </div>
              </div>
              <div className="landing-metric-card">
                <div>
                  <p className="landing-metric-label">Dashboard</p>
                  <p className="mt-2 text-base leading-7 text-[var(--landing-ink-soft)]">
                    Priorities lead, today stays readable, and focus mode gives a first move.
                  </p>
                </div>
              </div>
              <div className="landing-metric-card">
                <div>
                  <p className="landing-metric-label">Timeblocks</p>
                  <p className="mt-2 text-base leading-7 text-[var(--landing-ink-soft)]">
                    Light edits before export make the plan workable, not just impressive.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-[30px] border border-[var(--landing-line)] bg-white/70 p-4 shadow-[0_20px_40px_rgba(204,211,216,0.16)]">
              <div className="flex flex-wrap items-center gap-2">
                {["Capture", "Clarify", "Plan", "Timeblock"].map((step, index) => (
                  <span
                    key={step}
                    className={`rounded-full px-3 py-1.5 font-sans text-xs ${
                      index === 2
                        ? "bg-[var(--landing-ink)] text-white"
                        : "border border-[var(--landing-line)] bg-white/80 text-[var(--landing-ink-soft)]"
                    }`}
                  >
                    {step}
                  </span>
                ))}
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
                <div className="rounded-[24px] border border-[var(--landing-line)] bg-white/84 p-4">
                  <p className="landing-metric-label">Prioritized actions</p>
                  <div className="mt-4 space-y-3">
                    {priorityItems.map((item, index) => (
                      <div
                        key={`${item.title}-frame`}
                        className="flex items-start gap-3 rounded-[18px] border border-[var(--landing-line)] bg-white/92 p-3"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--landing-accent-soft)] text-xs font-semibold text-[var(--landing-ink)]">
                          {index + 1}
                        </span>
                        <div>
                          <p className="landing-task-title">{item.title}</p>
                          <p className="landing-task-note">{item.note}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="rounded-[24px] border border-[var(--landing-line)] bg-white/84 p-4">
                    <p className="landing-metric-label">Focus mode</p>
                    <h3 className="mt-3 text-2xl leading-[1.05] tracking-[-0.04em] text-[var(--landing-ink)]">
                      Do one timed econ set and review mistakes
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--landing-ink-soft)]">
                      Tuesday pressure is earliest. One sharp rep surfaces gaps quickly.
                    </p>
                  </div>

                  <div className="rounded-[24px] border border-[var(--landing-line)] bg-white/84 p-4">
                    <p className="landing-metric-label">Calendar-ready</p>
                    <div className="mt-3 space-y-2">
                      {todayItems.slice(0, 2).map((item) => (
                        <div
                          key={`${item}-calendar`}
                          className="rounded-[16px] border border-[var(--landing-line)] bg-white/90 px-3 py-3 text-sm leading-6 text-[var(--landing-ink-soft)]"
                        >
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="landing-preview-note">
              <p className="landing-section-label">Why it lands</p>
              <p className="mt-4 text-2xl leading-tight tracking-[-0.05em] text-[var(--landing-ink)]">
                Atlas doesn&apos;t store tasks. It decides what matters.
              </p>
              <p className="mt-4 text-sm leading-7 text-[var(--landing-ink-soft)]">
                That is the difference between another productivity surface and a system students
                would actually come back to.
              </p>
            </div>

            <div className="landing-meta-card">
              <p className="landing-section-label">Return loop</p>
              <p className="mt-4 text-sm leading-7 text-[var(--landing-ink-soft)]">
                Saved sessions, editable priorities, editable focus tasks, and calendar-ready
                blocks make Atlas feel like a tool instead of a one-time AI trick.
              </p>
            </div>

            <div className="landing-glass-panel p-5">
              <p className="landing-section-label">Final step</p>
              <h2 className="mt-3 text-2xl leading-tight tracking-[-0.04em] text-[var(--landing-ink)]">
                No setup. Just paste and go.
              </h2>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link className="landing-cta" href="/start">
                  Try Atlas
                </Link>
                <LandingResumeCta />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
