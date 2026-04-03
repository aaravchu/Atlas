"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AtlasShell } from "@/components/atlas-shell";
import { HeroComposer } from "@/components/hero-composer";
import {
  clearAtlasPlan,
  loadAtlasSession,
  readAtlasSession,
  readAtlasSessionHistory,
  type AtlasSession,
  writeAtlasSession
} from "@/lib/atlas-session";

const defaultPrompt =
  "I have 2 midterms next week, need to recruit for consulting, lead a club, and I'm behind on assignments";

function formatSavedTime(updatedAt: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(updatedAt));
}

export function IntakePage() {
  const router = useRouter();
  const [input, setInput] = useState(defaultPrompt);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<AtlasSession[]>([]);

  useEffect(() => {
    const session = readAtlasSession();

    if (session.input) {
      setInput(session.input);
    }

    setHistory(readAtlasSessionHistory());
  }, []);

  const continueToQuestions = () => {
    const trimmed = input.trim();

    if (!trimmed) {
      setError("Paste your notes, deadlines, or goals and Atlas will shape them into a plan.");
      return;
    }

    clearAtlasPlan();
    writeAtlasSession({
      input: trimmed,
      answers: {}
    });
    router.push("/questions");
  };

  const reopenSession = (id: string) => {
    const session = loadAtlasSession(id);

    if (!session?.plan) {
      return;
    }

    writeAtlasSession(session);
    router.push("/plan");
  };

  return (
    <AtlasShell currentStep="intake">
      <div className="grid gap-6">
        <HeroComposer
          error={error}
          input={input}
          isPending={false}
          setInput={setInput}
          onGenerate={continueToQuestions}
        />

        {history.length ? (
          <section className="glass-card rounded-[28px] p-5 sm:p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="section-label">Recent sessions</p>
                <h2 className="mt-2 text-2xl leading-tight tracking-[-0.04em] text-[var(--text)]">
                  Come back to a plan without starting over.
                </h2>
              </div>
              <p className="max-w-md font-sans text-sm leading-6 text-[var(--muted)]">
                Atlas saves your last few planning runs on this device so you can reopen, adjust,
                and export when you return.
              </p>
            </div>

            <div className="mt-5 grid gap-3">
              {history.map((session) => (
                <button
                  key={session.id}
                  className="grid gap-3 rounded-[22px] border border-[var(--border)] bg-white/80 px-4 py-4 text-left transition hover:border-[var(--accent)] hover:bg-white sm:grid-cols-[1fr_auto]"
                  type="button"
                  onClick={() => reopenSession(session.id)}
                >
                  <div className="min-w-0">
                    <p className="font-sans text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                      {formatSavedTime(session.updatedAt)}
                    </p>
                    <h3 className="mt-2 text-lg leading-tight text-[var(--text)]">
                      {session.plan?.summary ?? "Saved Atlas plan"}
                    </h3>
                    <p className="mt-2 line-clamp-2 font-sans text-sm leading-6 text-[var(--muted)]">
                      {session.input}
                    </p>
                  </div>
                  <span className="inline-flex items-center justify-center rounded-full bg-[var(--accent-soft)] px-4 py-2 font-sans text-sm font-medium text-[var(--accent)]">
                    Reopen
                  </span>
                </button>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </AtlasShell>
  );
}
