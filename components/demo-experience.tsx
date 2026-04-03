"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { DashboardView } from "@/components/dashboard-view";
import { FocusMode } from "@/components/focus-mode";
import { HeroComposer } from "@/components/hero-composer";
import { LoadingState } from "@/components/loading-state";
import { PlanMetaBanner } from "@/components/plan-meta-banner";
import { TimeblocksPanel } from "@/components/timeblocks-panel";
import type { AtlasPlanResponse } from "@/lib/atlas-plan-schema";

const defaultPrompt =
  "I have 2 midterms next week, need to recruit for consulting, lead a club, and I'm behind on assignments";

export function DemoExperience({ embedded = false }: { embedded?: boolean }) {
  const [input, setInput] = useState(defaultPrompt);
  const [plan, setPlan] = useState<AtlasPlanResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const resultsRef = useRef<HTMLDivElement | null>(null);

  const generatePlan = (value: string) => {
    const trimmed = value.trim();

    if (!trimmed) {
      setError("Paste your notes, deadlines, or goals and Atlas will shape them into a plan.");
      return;
    }

    setError(null);

    startTransition(async () => {
      try {
        const response = await fetch("/api/plan", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ input: trimmed })
        });

        if (!response.ok) {
          throw new Error("Atlas could not generate a plan right now.");
        }

        const nextPlan = (await response.json()) as AtlasPlanResponse;
        setPlan(nextPlan);
      } catch (caughtError) {
        const message =
          caughtError instanceof Error
            ? caughtError.message
            : "Something went wrong while generating your plan.";
        setError(message);
      }
    });
  };

  useEffect(() => {
    if (plan && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [plan]);

  const Wrapper = embedded ? "div" : "main";

  return (
    <Wrapper
      className={
        embedded
          ? "app-shell rounded-[40px] border border-[var(--landing-line)] bg-[rgba(255,255,255,0.62)] px-4 py-5 shadow-[0_20px_48px_rgba(194,199,206,0.18)] sm:px-6 sm:py-6 lg:px-8"
          : "app-shell min-h-screen px-4 py-6 sm:px-6 lg:px-10"
      }
    >
      <div className={`mx-auto flex flex-col gap-6 ${embedded ? "max-w-[1280px]" : "max-w-7xl"}`}>
        <HeroComposer
          error={error}
          input={input}
          isPending={isPending}
          setInput={setInput}
          onGenerate={() => generatePlan(input)}
        />

        {isPending ? <LoadingState /> : null}

        {plan ? (
          <div ref={resultsRef} className="grid gap-6">
            <div className="reveal-soft">
              <PlanMetaBanner plan={plan} />
            </div>
            <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
              <DashboardView plan={plan} />
              <FocusMode plan={plan} />
            </div>
            <TimeblocksPanel plan={plan} />
          </div>
        ) : null}
      </div>
    </Wrapper>
  );
}
