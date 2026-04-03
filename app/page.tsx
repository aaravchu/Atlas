import Link from "next/link";
import { DemoExperience } from "@/components/demo-experience";

const workflow = [
  {
    number: "01",
    title: "Drop everything in",
    detail: "Notes, deadlines, recruiting tasks, assignments. Atlas works from the messy version."
  },
  {
    number: "02",
    title: "Atlas structures it",
    detail: "It pulls out priorities, shapes the week, and removes the need to organize by hand."
  },
  {
    number: "03",
    title: "Execute clearly",
    detail: "You get one calm system and one obvious place to start."
  }
];

const lanes = ["Classes", "Recruiting", "Clubs", "Side projects"];

export default function LandingPage() {
  return (
    <main className="landing-shell min-h-screen">
      <div className="mx-auto flex max-w-[1440px] flex-col px-4 pb-16 pt-4 sm:px-6 sm:pb-24 lg:px-10">
        <header className="landing-nav mx-auto flex w-full max-w-[1320px] items-center justify-between rounded-full px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="landing-orb" />
            <span className="landing-wordmark">Atlas</span>
          </div>
          <div className="hidden items-center gap-8 font-sans text-sm text-[var(--landing-muted)] md:flex">
            <a href="#how">How it works</a>
            <a href="#preview">Preview</a>
            <a href="#difference">Difference</a>
          </div>
          <Link className="landing-pill-button" href="/demo">
            Try Atlas
          </Link>
        </header>

        <section className="mx-auto mt-6 grid w-full max-w-[1320px] gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-8 xl:mt-8">
          <div className="flex flex-col justify-between gap-10 pt-8 sm:pt-12 lg:min-h-[720px] lg:pt-16">
            <div className="reveal-soft max-w-[620px]" style={{ animationDelay: "40ms" }}>
              <p className="landing-kicker">Built for students doing the most</p>
              <h1 className="mt-6 max-w-[560px] text-6xl leading-[0.9] tracking-[-0.08em] text-[var(--landing-ink)] sm:text-7xl lg:text-[96px]">
                Turn chaos into execution.
              </h1>
              <p className="mt-6 max-w-[520px] font-sans text-base leading-7 text-[var(--landing-muted)] sm:text-lg">
                Atlas helps students turn classes, recruiting, and everything else into a clear
                plan you can actually follow.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link className="landing-cta" href="/demo">
                  Try Atlas
                </Link>
                <p className="max-w-[260px] font-sans text-sm leading-6 text-[var(--landing-muted)]">
                  No setup. Just paste the messy version of your week.
                </p>
              </div>
            </div>

            <div
              className="reveal grid max-w-[520px] gap-3 sm:grid-cols-2"
              style={{ animationDelay: "180ms" }}
            >
              {lanes.map((lane) => (
                <div key={lane} className="landing-chip">
                  <span>{lane}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="reveal relative min-h-[720px] overflow-hidden rounded-[40px] border border-[var(--landing-line)] bg-[var(--landing-surface)] p-5 shadow-[0_30px_90px_rgba(179,184,190,0.18)] sm:p-7 lg:p-8"
            style={{ animationDelay: "120ms" }}
          >
            <div className="pointer-events-none absolute inset-x-[18%] top-[-10%] h-48 rounded-full bg-[rgba(180,198,255,0.18)] blur-3xl" />
            <div className="pointer-events-none absolute bottom-[8%] left-[8%] h-40 w-40 rounded-full bg-[rgba(190,227,216,0.2)] blur-3xl" />

            <div className="relative flex h-full flex-col gap-4 sm:gap-5">
              <div className="landing-glass-panel self-start px-4 py-3">
                <p className="landing-mini-label">Student input</p>
                <p className="mt-2 max-w-[280px] font-sans text-sm leading-6 text-[var(--landing-muted)]">
                  I have a strategy midterm, internship applications, two coffee chats, and I still
                  need to prep the next club meeting.
                </p>
              </div>

              <div className="grid flex-1 gap-4 lg:grid-cols-[1.06fr_0.94fr]">
                <div className="landing-card-stack">
                  <div className="landing-main-preview">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="landing-mini-label">Today</p>
                        <h2 className="mt-3 max-w-[320px] text-3xl leading-[1] tracking-[-0.05em] text-[var(--landing-ink)]">
                          Review likely midterm material, then send the recruiting outreach that
                          actually matters.
                        </h2>
                      </div>
                      <div className="landing-floating-tag">Priority</div>
                    </div>

                    <div className="mt-8 grid gap-3">
                      <div className="landing-task-row">
                        <div>
                          <p className="landing-task-title">
                            Review lecture 6-8 concepts for tomorrow&apos;s exam
                          </p>
                          <p className="landing-task-note">
                            Reduces academic risk before the deadline.
                          </p>
                        </div>
                        <span className="landing-task-pill">45 min</span>
                      </div>

                      <div className="landing-task-row">
                        <div>
                          <p className="landing-task-title">
                            Draft outreach for targeted networking conversations
                          </p>
                          <p className="landing-task-note">
                            Moves a real recruiting conversation forward.
                          </p>
                        </div>
                        <span className="landing-task-pill">30 min</span>
                      </div>

                      <div className="landing-task-row">
                        <div>
                          <p className="landing-task-title">
                            Draft a clear agenda for the next exec meeting
                          </p>
                          <p className="landing-task-note">
                            Prevents coordination drift and keeps momentum.
                          </p>
                        </div>
                        <span className="landing-task-pill">20 min</span>
                      </div>
                    </div>
                  </div>

                  <div className="landing-side-note landing-side-note-offset ml-auto max-w-[280px]">
                    <p className="landing-mini-label">Why it lands</p>
                    <p className="mt-2 font-sans text-sm leading-6 text-[var(--landing-muted)]">
                      Atlas does not just collect tasks. It narrows the week into something a busy
                      student can actually execute.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-4">
                  <div className="landing-focus-card landing-focus-offset mt-8 lg:mt-20">
                    <p className="landing-mini-label">Focus mode</p>
                    <h3 className="mt-3 text-2xl leading-tight tracking-[-0.04em] text-[var(--landing-ink)]">
                      One clear next move.
                    </h3>
                    <p className="mt-3 font-sans text-sm leading-6 text-[var(--landing-muted)]">
                      Review interview stories and likely questions before you reorganize the rest
                      of the week.
                    </p>
                    <div className="mt-6 inline-flex rounded-full border border-[var(--landing-line)] bg-white/70 px-3 py-2 font-sans text-xs font-medium text-[var(--landing-ink-soft)]">
                      Estimated time: 25 minutes
                    </div>
                  </div>

                  <div className="landing-meta-card">
                    <p className="landing-mini-label">Structured output</p>
                    <p className="mt-3 text-2xl leading-tight tracking-[-0.04em] text-[var(--landing-ink)]">
                      Clean priorities. Weekly shape. Less mental drag.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="reveal mx-auto mt-24 grid w-full max-w-[1240px] gap-8 lg:grid-cols-[0.86fr_1.14fr]"
          style={{ animationDelay: "120ms" }}
        >
          <div className="max-w-[360px]">
            <p className="landing-section-label">Problem</p>
            <h2 className="mt-4 text-4xl leading-[0.98] tracking-[-0.05em] text-[var(--landing-ink)] sm:text-5xl">
              Too many responsibilities, too many tools, not enough clarity.
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="landing-soft-card">
              <p className="landing-problem-text">
                Classes, recruiting, clubs, and side projects all compete for the same week.
              </p>
            </div>
            <div className="landing-soft-card">
              <p className="landing-problem-text">
                Most tools ask students to organize the mess first. Atlas starts from the mess.
              </p>
            </div>
          </div>
        </section>

        <section
          id="how"
          className="reveal mx-auto mt-24 grid w-full max-w-[1240px] gap-10 lg:grid-cols-[0.72fr_1.28fr]"
          style={{ animationDelay: "160ms" }}
        >
          <div className="max-w-[320px]">
            <p className="landing-section-label">How it works</p>
            <p className="mt-4 font-sans text-base leading-7 text-[var(--landing-muted)]">
              Three refined moves, designed to feel more like an editorial system than a workflow
              diagram.
            </p>
          </div>

          <div className="space-y-4">
            {workflow.map((step) => (
              <article
                key={step.number}
                className="grid gap-4 rounded-[28px] border border-[var(--landing-line)] bg-white/78 px-5 py-6 backdrop-blur-[20px] sm:grid-cols-[88px_1fr] sm:px-7"
              >
                <div className="font-sans text-sm tracking-[0.18em] text-[var(--landing-muted)]">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-3xl leading-tight tracking-[-0.05em] text-[var(--landing-ink)]">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-[620px] font-sans text-sm leading-6 text-[var(--landing-muted)]">
                    {step.detail}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          id="preview"
          className="reveal mx-auto mt-24 grid w-full max-w-[1320px] gap-10 lg:grid-cols-[0.95fr_1.05fr]"
          style={{ animationDelay: "220ms" }}
        >
          <div className="flex flex-col justify-between gap-10">
            <div className="max-w-[420px]">
              <p className="landing-section-label">Product preview</p>
              <h2 className="mt-4 text-5xl leading-[0.94] tracking-[-0.06em] text-[var(--landing-ink)]">
                Messy input in. Calm system out.
              </h2>
            </div>

            <div className="landing-preview-note">
              <p className="landing-mini-label">Messy input to structured output</p>
              <p className="mt-3 font-sans text-sm leading-6 text-[var(--landing-muted)]">
                Atlas translates a week that feels crowded into something ranked, shaped, and
                emotionally lighter.
              </p>
            </div>
          </div>

          <div className="relative rounded-[38px] border border-[var(--landing-line)] bg-[rgba(255,255,255,0.72)] p-5 backdrop-blur-[18px] sm:p-7">
            <div className="grid gap-4 lg:grid-cols-[1.02fr_0.98fr]">
              <div className="rounded-[28px] border border-[var(--landing-line)] bg-[rgba(255,255,255,0.82)] p-5">
                <p className="landing-mini-label">Dashboard</p>
                <div className="mt-5 grid gap-3">
                  <div className="landing-metric-card">
                    <span className="landing-metric-label">Top priority</span>
                    <span className="landing-metric-value">Classes</span>
                  </div>
                  <div className="landing-metric-card">
                    <span className="landing-metric-label">Today</span>
                    <span className="landing-metric-value">3 blocks</span>
                  </div>
                  <div className="landing-metric-card">
                    <span className="landing-metric-label">Focus</span>
                    <span className="landing-metric-value">25 min</span>
                  </div>
                </div>
              </div>

              <div className="rounded-[28px] border border-[var(--landing-line)] bg-[rgba(247,248,249,0.88)] p-5">
                <p className="landing-mini-label">Focus mode</p>
                <div className="mt-5 rounded-[22px] border border-[var(--landing-line)] bg-white/80 p-4">
                  <p className="text-xl leading-tight tracking-[-0.04em] text-[var(--landing-ink)]">
                    Review key concepts and practice likely exam material.
                  </p>
                  <p className="mt-3 font-sans text-sm leading-6 text-[var(--landing-muted)]">
                    One meaningful move, chosen so the week feels lighter after you do it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="reveal mx-auto mt-24 w-full max-w-[1320px]" style={{ animationDelay: "240ms" }}>
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[560px]">
              <p className="landing-section-label">UI experience</p>
              <h2 className="mt-4 text-5xl leading-[0.94] tracking-[-0.06em] text-[var(--landing-ink)]">
                Try the product before you even leave the page.
              </h2>
            </div>
            <p className="max-w-[340px] font-sans text-sm leading-6 text-[var(--landing-muted)]">
              Paste a crowded student week and feel Atlas turn it into something structured,
              lighter, and executable.
            </p>
          </div>

          <DemoExperience embedded />
        </section>

        <section
          id="difference"
          className="reveal mx-auto mt-24 flex w-full max-w-[1180px] flex-col gap-6 rounded-[36px] border border-[var(--landing-line)] bg-[rgba(255,255,255,0.74)] px-6 py-8 backdrop-blur-[18px] sm:px-8 sm:py-10 lg:flex-row lg:items-end lg:justify-between"
          style={{ animationDelay: "280ms" }}
        >
          <div className="max-w-[640px]">
            <p className="landing-section-label">Difference</p>
            <h2 className="mt-4 text-4xl leading-[0.98] tracking-[-0.05em] text-[var(--landing-ink)] sm:text-5xl">
              Atlas doesn&apos;t just store tasks. It decides what matters.
            </h2>
          </div>
          <p className="max-w-[320px] font-sans text-sm leading-6 text-[var(--landing-muted)]">
            Built for ambitious students who need a plan that feels lighter, sharper, and easier to
            trust.
          </p>
        </section>

        <section
          className="reveal mx-auto mt-24 w-full max-w-[1040px] pb-6 text-center"
          style={{ animationDelay: "340ms" }}
        >
          <p className="landing-section-label">Final CTA</p>
          <h2 className="mt-5 text-5xl leading-[0.94] tracking-[-0.06em] text-[var(--landing-ink)] sm:text-6xl">
            Try Atlas
          </h2>
          <p className="mx-auto mt-4 max-w-[360px] font-sans text-base leading-7 text-[var(--landing-muted)]">
            No setup. Just paste and go.
          </p>
          <div className="mt-8">
            <Link className="landing-cta" href="/demo">
              Try Atlas
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
