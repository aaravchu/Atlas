"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AtlasShell } from "@/components/atlas-shell";
import { DashboardView } from "@/components/dashboard-view";
import { FocusMode } from "@/components/focus-mode";
import { PlanMetaBanner } from "@/components/plan-meta-banner";
import type { AtlasPlanResponse } from "@/lib/atlas-plan-schema";
import { readAtlasSession, writeAtlasSession } from "@/lib/atlas-session";

export function PlanPage() {
  const router = useRouter();
  const [plan, setPlan] = useState<AtlasPlanResponse | null>(null);
  const [loaded, setLoaded] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const session = readAtlasSession();

    if (!session.plan) {
      router.replace("/");
      return;
    }

    setPlan(session.plan);
    setLoaded(true);
  }, [router]);

  useEffect(() => {
    if (loaded && contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [loaded]);

  const updatePriority = (index: number, field: "reason" | "title", value: string) => {
    setPlan((current) => {
      if (!current) {
        return current;
      }

      const priorities = current.priorities.map((priority, priorityIndex) =>
        priorityIndex === index
          ? {
              ...priority,
              [field]: value.trimStart() || priority[field]
            }
          : priority
      );

      const next = {
        ...current,
        priorities
      };

      const session = readAtlasSession();
      writeAtlasSession({
        ...session,
        plan: next
      });

      return next;
    });
  };

  const updateFocusTask = (
    field: "estimatedMinutes" | "firstStep" | "title" | "whyNow",
    value: number | string
  ) => {
    setPlan((current) => {
      if (!current) {
        return current;
      }

      const next = {
        ...current,
        focusTask: {
          ...current.focusTask,
          [field]:
            typeof value === "string"
              ? value.trimStart() || current.focusTask[field as "firstStep" | "title" | "whyNow"]
              : value
        }
      };

      const session = readAtlasSession();
      writeAtlasSession({
        ...session,
        plan: next
      });

      return next;
    });
  };

  if (!loaded || !plan) {
    return null;
  }

  return (
    <AtlasShell currentStep="plan">
      <div ref={contentRef} className="grid gap-6">
        <div className="reveal-soft">
          <PlanMetaBanner plan={plan} />
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <DashboardView plan={plan} onPriorityChange={updatePriority} />
          <FocusMode plan={plan} onFocusTaskChange={updateFocusTask} />
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-white/75 px-5 py-3 font-sans text-sm text-[var(--muted)] transition hover:text-[var(--text)]"
            type="button"
            onClick={() => router.push("/questions")}
          >
            Adjust answers
          </button>
          <button
            className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 font-sans text-sm font-semibold text-white transition hover:translate-y-[-1px] hover:bg-[#16554a]"
            type="button"
            onClick={() => router.push("/calendar")}
          >
            Build timeblocks
          </button>
        </div>
      </div>
    </AtlasShell>
  );
}
