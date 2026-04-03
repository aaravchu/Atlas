import Link from "next/link";

type AtlasShellProps = {
  children: React.ReactNode;
  currentStep: "intake" | "questions" | "plan" | "calendar";
};

const steps = [
  { id: "intake", label: "Capture", href: "/" },
  { id: "questions", label: "Clarify", href: "/questions" },
  { id: "plan", label: "Plan", href: "/plan" },
  { id: "calendar", label: "Timeblock", href: "/calendar" }
] as const;

export function AtlasShell({ children, currentStep }: AtlasShellProps) {
  return (
    <main className="app-shell min-h-screen px-4 py-5 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="glass-card flex flex-col gap-4 rounded-[28px] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="section-label">Atlas</p>
            <h1 className="mt-2 text-2xl tracking-[-0.04em] text-[var(--text)]">
              Build a calm, executable week.
            </h1>
          </div>

          <nav className="flex flex-wrap gap-2">
            {steps.map((step) => {
              const active = step.id === currentStep;

              return (
                <Link
                  key={step.id}
                  className={`rounded-full px-4 py-2 font-sans text-sm transition ${
                    active
                      ? "bg-[var(--accent)] text-white"
                      : "border border-[var(--border)] bg-white/70 text-[var(--muted)] hover:text-[var(--text)]"
                  }`}
                  href={step.href}
                >
                  {step.label}
                </Link>
              );
            })}
          </nav>
        </header>

        {children}
      </div>
    </main>
  );
}
