import type { Dispatch, SetStateAction } from "react";

type HeroComposerProps = {
  error: string | null;
  input: string;
  isPending: boolean;
  setInput: Dispatch<SetStateAction<string>>;
  onGenerate: () => void;
};

export function HeroComposer({
  error,
  input,
  isPending,
  setInput,
  onGenerate
}: HeroComposerProps) {
  return (
    <section className="glass-card rounded-[32px] px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-10">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div className="max-w-3xl">
          <p className="section-label">Atlas</p>
          <h1 className="mt-4 max-w-3xl text-5xl leading-[0.96] tracking-[-0.03em] text-balance sm:text-6xl lg:text-7xl">
            Turn the chaos of college into a calm, executable week.
          </h1>
          <p className="mt-5 max-w-2xl font-sans text-base leading-7 text-[var(--muted)] sm:text-lg">
            Atlas turns messy notes, deadlines, recruiting tasks, and goals into a structured plan
            with immediate priorities. No manual setup. No clutter. Just clarity.
          </p>
        </div>

        <div className="rounded-[28px] border border-[var(--border)] bg-[var(--surface-strong)] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] sm:p-4">
          <label className="section-label" htmlFor="atlas-input">
            What are you trying to manage?
          </label>
          <textarea
            id="atlas-input"
            className="mt-3 min-h-48 w-full resize-none rounded-[24px] border border-transparent bg-white/55 px-5 py-4 text-lg leading-8 text-[var(--text)] outline-none transition duration-200 placeholder:text-[#8e897f] focus:border-[var(--accent)] focus:bg-white/80 focus:ring-4 focus:ring-[var(--accent-soft)]"
            placeholder="I have 2 midterms next week, need to recruit for consulting, lead a club, and I'm behind on assignments"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <p className="mt-3 font-sans text-sm leading-6 text-[var(--muted)]">
            Paste anything. Atlas will turn it into a clear plan.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-h-6 font-sans text-sm text-[#8b4d3d]">
              {error ? error : "No setup. No sorting. Just generate."}
            </div>
            <button
              className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3.5 font-sans text-sm font-semibold text-white transition hover:translate-y-[-1px] hover:bg-[#16554a] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--accent-soft)] disabled:cursor-wait disabled:opacity-70"
              type="button"
              disabled={isPending}
              onClick={onGenerate}
            >
              {isPending ? "Structuring your week..." : "Generate my plan"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
