export function LoadingState() {
  const stages = [
    "Parsing your priorities",
    "Structuring your week",
    "Choosing your focus"
  ];

  return (
    <section className="glass-card rounded-[30px] p-6 sm:p-8">
      <p className="section-label">Atlas is Structuring</p>
      <div className="mt-5 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[28px] border border-[var(--border)] bg-white/60 p-5">
          <h2 className="text-3xl leading-tight text-balance">Building a calmer version of your week.</h2>
          <p className="mt-3 max-w-md font-sans text-sm leading-6 text-[var(--muted)]">
            Atlas is reducing the noise, ranking what matters, and picking the first move that
            creates real momentum.
          </p>
          <div className="mt-6 space-y-3">
            {stages.map((stage, index) => (
              <div
                key={stage}
                className="loading-stage rounded-[20px] border border-[var(--border)] bg-white px-4 py-4"
                style={{ animationDelay: `${index * 220}ms` }}
              >
                <div className="flex items-center gap-3">
                  <span className="loading-stage-dot" />
                  <p className="font-sans text-sm text-[var(--text)]">{stage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-[28px] border border-[var(--border)] bg-white/65 p-5">
            <div className="skeleton-sheen h-6 w-40 rounded-full bg-[#e9e3d8]" />
            <div className="skeleton-sheen mt-4 h-20 rounded-[22px] bg-[#f4efe7]" />
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="skeleton-sheen h-28 rounded-[24px] bg-white/70" />
            <div className="skeleton-sheen h-28 rounded-[24px] bg-white/70" />
            <div className="skeleton-sheen h-28 rounded-[24px] bg-white/70" />
          </div>
          <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
            <div className="skeleton-sheen h-48 rounded-[28px] bg-white/70" />
            <div className="skeleton-sheen h-48 rounded-[28px] bg-white/70" />
          </div>
        </div>
      </div>
    </section>
  );
}
