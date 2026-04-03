import type { AtlasPlanResponse } from "@/lib/atlas-plan-schema";
import type { TimeblockDraft } from "@/lib/timeblocks";

export type AtlasSession = {
  answers: Record<string, string>;
  id: string;
  input: string;
  plan: AtlasPlanResponse | null;
  timeblocks: TimeblockDraft[] | null;
  updatedAt: string;
};

const CURRENT_STORAGE_KEY = "atlas-session-v2";
const HISTORY_STORAGE_KEY = "atlas-session-history-v2";

function createSessionId() {
  return `atlas-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function createEmptySession(): AtlasSession {
  return {
    answers: {},
    id: createSessionId(),
    input: "",
    plan: null,
    timeblocks: null,
    updatedAt: new Date().toISOString()
  };
}

export function getEmptySession() {
  return createEmptySession();
}

export function readAtlasSession(): AtlasSession {
  if (typeof window === "undefined") {
    return createEmptySession();
  }

  try {
    const raw = window.localStorage.getItem(CURRENT_STORAGE_KEY);

    if (!raw) {
      return createEmptySession();
    }

    const parsed = JSON.parse(raw) as Partial<AtlasSession>;

    return {
      answers: parsed.answers ?? {},
      id: parsed.id ?? createSessionId(),
      input: parsed.input ?? "",
      plan: parsed.plan ?? null,
      timeblocks: parsed.timeblocks ?? null,
      updatedAt: parsed.updatedAt ?? new Date().toISOString()
    };
  } catch {
    return createEmptySession();
  }
}

function readHistory(): AtlasSession[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(HISTORY_STORAGE_KEY);

    if (!raw) {
      return [];
    }

    return (JSON.parse(raw) as AtlasSession[]).filter((item) => item.plan);
  } catch {
    return [];
  }
}

function writeHistory(history: AtlasSession[]) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history.slice(0, 8)));
}

function upsertHistory(session: AtlasSession) {
  if (!session.plan) {
    return;
  }

  const history = readHistory();
  const next = [session, ...history.filter((item) => item.id !== session.id)].sort(
    (left, right) => new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime()
  );
  writeHistory(next);
}

export function readAtlasSessionHistory() {
  return readHistory();
}

export function loadAtlasSession(id: string) {
  if (typeof window === "undefined") {
    return null;
  }

  const session = readHistory().find((item) => item.id === id) ?? null;

  if (session) {
    window.localStorage.setItem(CURRENT_STORAGE_KEY, JSON.stringify(session));
  }

  return session;
}

export function writeAtlasSession(next: Partial<AtlasSession>) {
  if (typeof window === "undefined") {
    return;
  }

  const current = readAtlasSession();
  const merged: AtlasSession = {
    ...current,
    ...next,
    answers: next.answers ?? current.answers,
    id: next.id ?? current.id,
    timeblocks: next.timeblocks ?? current.timeblocks,
    updatedAt: new Date().toISOString()
  };

  window.localStorage.setItem(CURRENT_STORAGE_KEY, JSON.stringify(merged));
  upsertHistory(merged);
}

export function clearAtlasPlan() {
  const current = readAtlasSession();
  writeAtlasSession({
    ...current,
    plan: null,
    timeblocks: null
  });
}
