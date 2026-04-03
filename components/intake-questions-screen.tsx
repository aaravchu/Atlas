import type { IntakeQuestion } from "@/lib/intake-questions";

type IntakeQuestionsScreenProps = {
  answers: Record<string, string>;
  input: string;
  isPending: boolean;
  questions: IntakeQuestion[];
  setAnswer: (id: string, value: string) => void;
  onBack: () => void;
  onContinue: () => void;
};

export function IntakeQuestionsScreen({
  answers,
  input,
  isPending,
  questions,
  setAnswer,
  onBack,
  onContinue
}: IntakeQuestionsScreenProps) {
  return (
    <section className="question-stage reveal-soft rounded-[36px] border border-[var(--border)] bg-white/70 p-5 shadow-[0_24px_80px_rgba(31,41,54,0.08)] backdrop-blur-[22px] sm:p-8 lg:p-10">
      <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="flex flex-col justify-between gap-8">
          <div>
            <p className="section-label">Atlas follow-up</p>
            <h2 className="mt-4 max-w-[420px] text-4xl leading-[0.95] tracking-[-0.05em] text-[var(--text)] sm:text-5xl">
              A few fast questions, then Atlas gives you a sharper plan.
            </h2>
            <p className="mt-4 max-w-[420px] font-sans text-base leading-7 text-[var(--muted)]">
              The goal is not more form fields. It is better judgment. Atlas uses your answers to
              decide what to protect, what to compress, and where you should start.
            </p>
          </div>

          <div className="question-source-card rounded-[28px] border border-[var(--border)] bg-white/72 p-5">
            <p className="section-label">Your input</p>
            <p className="mt-3 font-sans text-sm leading-7 text-[var(--text)]">{input}</p>
          </div>
        </div>

        <div className="space-y-4">
          {questions.map((question, index) => (
            <article
              key={question.id}
              className="rounded-[28px] border border-[var(--border)] bg-white/80 p-5 shadow-[0_10px_30px_rgba(31,41,54,0.04)]"
            >
              <div className="flex items-start gap-4">
                <div className="question-number flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] font-sans text-sm font-semibold text-[var(--accent)]">
                  {index + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="section-label">{question.label}</p>
                  <h3 className="mt-2 text-2xl leading-tight tracking-[-0.04em] text-[var(--text)]">
                    {question.prompt}
                  </h3>
                  <div className="mt-4 grid gap-3">
                    {question.options.map((option) => {
                      const selected = answers[question.id] === option;

                      return (
                        <button
                          key={option}
                          className={`rounded-[20px] border px-4 py-4 text-left font-sans text-sm leading-6 transition ${
                            selected
                              ? "border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--text)] shadow-[inset_0_0_0_1px_rgba(121,224,200,0.18)]"
                              : "border-[var(--border)] bg-white text-[var(--muted)] hover:border-[var(--accent)] hover:text-[var(--text)]"
                          }`}
                          type="button"
                          onClick={() => setAnswer(question.id, option)}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </article>
          ))}

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <button
              className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-white/80 px-5 py-3 font-sans text-sm font-medium text-[var(--muted)] transition hover:text-[var(--text)]"
              type="button"
              onClick={onBack}
            >
              Back
            </button>
            <button
              className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3.5 font-sans text-sm font-semibold text-white transition hover:translate-y-[-1px] hover:bg-[#16554a] disabled:cursor-wait disabled:opacity-70"
              type="button"
              disabled={isPending}
              onClick={onContinue}
            >
              {isPending ? "Structuring your week..." : "Generate my plan"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
