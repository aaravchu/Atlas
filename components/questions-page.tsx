"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AtlasShell } from "@/components/atlas-shell";
import { IntakeQuestionsScreen } from "@/components/intake-questions-screen";
import { LoadingState } from "@/components/loading-state";
import type { AtlasPlanResponse } from "@/lib/atlas-plan-schema";
import { readAtlasSession, writeAtlasSession } from "@/lib/atlas-session";
import { buildIntakeQuestions, buildPlanningInput } from "@/lib/intake-questions";
import { buildTimeblockDrafts } from "@/lib/timeblocks";

export function QuestionsPage() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isLoaded, setIsLoaded] = useState(false);

  const questions = useMemo(() => buildIntakeQuestions(input), [input]);

  useEffect(() => {
    const session = readAtlasSession();

    if (!session.input) {
      router.replace("/start");
      return;
    }

    setInput(session.input);
    setAnswers((current) => {
      if (Object.keys(current).length) {
        return current;
      }

      const next: Record<string, string> = { ...session.answers };
      buildIntakeQuestions(session.input).forEach((question) => {
        if (!next[question.id]) {
          next[question.id] = question.options[0] ?? "";
        }
      });

      return next;
    });
    setIsLoaded(true);
  }, [router]);

  const continueToPlan = () => {
    const composedInput = buildPlanningInput(input, answers);
    setError(null);

    startTransition(async () => {
      try {
        const response = await fetch("/api/plan", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ input: composedInput })
        });

        if (!response.ok) {
          throw new Error("Atlas could not generate a plan right now.");
        }

        const plan = (await response.json()) as AtlasPlanResponse;
        writeAtlasSession({
          input,
          answers,
          plan,
          timeblocks: buildTimeblockDrafts(plan)
        });
        router.push("/plan");
      } catch (caughtError) {
        setError(caughtError instanceof Error ? caughtError.message : "Something went wrong.");
      }
    });
  };

  if (!isLoaded) {
    return null;
  }

  return (
    <AtlasShell currentStep="questions">
      {isPending ? <LoadingState /> : null}
      {!isPending ? (
        <IntakeQuestionsScreen
          answers={answers}
          input={input}
          isPending={isPending}
          questions={questions}
          setAnswer={(id, value) =>
            setAnswers((current) => ({
              ...current,
              [id]: value
            }))
          }
          onBack={() => router.push("/start")}
          onContinue={continueToPlan}
        />
      ) : null}
      {error ? (
        <section className="glass-card rounded-[24px] px-5 py-4 font-sans text-sm text-[#8b4d3d]">
          {error}
        </section>
      ) : null}
    </AtlasShell>
  );
}
