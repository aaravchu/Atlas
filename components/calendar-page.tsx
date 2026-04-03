"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AtlasShell } from "@/components/atlas-shell";
import { TimeblocksPanel } from "@/components/timeblocks-panel";
import type { AtlasPlanResponse } from "@/lib/atlas-plan-schema";
import { readAtlasSession, writeAtlasSession } from "@/lib/atlas-session";
import { buildTimeblockDrafts, type TimeblockDraft } from "@/lib/timeblocks";

export function CalendarPage() {
  const router = useRouter();
  const [plan, setPlan] = useState<AtlasPlanResponse | null>(null);
  const [drafts, setDrafts] = useState<TimeblockDraft[]>([]);

  useEffect(() => {
    const session = readAtlasSession();

    if (!session.plan) {
      router.replace("/");
      return;
    }

    setPlan(session.plan);
    setDrafts(session.timeblocks ?? buildTimeblockDrafts(session.plan));
  }, [router]);

  const updateDraft = (index: number, patch: Partial<TimeblockDraft>) => {
    setDrafts((current) => {
      const next = current.map((draft, draftIndex) =>
        draftIndex === index
          ? {
              ...draft,
              ...patch
            }
          : draft
      );

      const session = readAtlasSession();
      writeAtlasSession({
        ...session,
        timeblocks: next
      });

      return next;
    });
  };

  if (!plan) {
    return null;
  }

  return (
    <AtlasShell currentStep="calendar">
      <TimeblocksPanel drafts={drafts} onDraftChange={updateDraft} />
    </AtlasShell>
  );
}
