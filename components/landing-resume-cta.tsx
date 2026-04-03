"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loadAtlasSession, readAtlasSessionHistory, type AtlasSession } from "@/lib/atlas-session";

function formatSavedTime(updatedAt: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(updatedAt));
}

export function LandingResumeCta() {
  const router = useRouter();
  const [latest, setLatest] = useState<AtlasSession | null>(null);

  useEffect(() => {
    const [mostRecent] = readAtlasSessionHistory();
    setLatest(mostRecent ?? null);
  }, []);

  if (!latest?.plan) {
    return null;
  }

  return (
    <button
      className="landing-pill-button"
      type="button"
      onClick={() => {
        loadAtlasSession(latest.id);
        router.push("/plan");
      }}
    >
      Resume last plan
      <span className="ml-2 text-[0.78rem] text-[var(--landing-muted)]">
        {formatSavedTime(latest.updatedAt)}
      </span>
    </button>
  );
}
