import type { AtlasPlanResponse } from "@/lib/atlas-plan-schema";

export type Timeblock = {
  title: string;
  start: Date;
  end: Date;
  source: "focus" | "today";
  note: string;
};

export type TimeblockDraft = {
  durationMinutes: number;
  note: string;
  source: "focus" | "today";
  title: string;
};

function roundToNextHalfHour(date: Date) {
  const next = new Date(date);
  next.setSeconds(0, 0);

  const minutes = next.getMinutes();

  if (minutes === 0 || minutes === 30) {
    return next;
  }

  if (minutes < 30) {
    next.setMinutes(30);
    return next;
  }

  next.setHours(next.getHours() + 1, 0, 0, 0);
  return next;
}

function getStartingPoint(now = new Date()) {
  const start = roundToNextHalfHour(now);
  const hour = start.getHours();

  if (hour < 8) {
    start.setHours(9, 0, 0, 0);
  } else if (hour >= 20) {
    start.setDate(start.getDate() + 1);
    start.setHours(9, 0, 0, 0);
  }

  return start;
}

function parseDurationToMinutes(value: string) {
  const match = value.match(/(\d+)/);
  return match ? Number(match[1]) : 30;
}

function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60 * 1000);
}

function normalizeFileStamp(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function formatIcsDate(date: Date) {
  const utc = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return utc.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

function escapeIcs(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/,/g, "\\,").replace(/;/g, "\\;");
}

export function buildTimeblockDrafts(plan: AtlasPlanResponse): TimeblockDraft[] {
  return [
    {
      title: plan.focusTask.title,
      durationMinutes: Math.min(Math.max(plan.focusTask.estimatedMinutes, 20), 120),
      source: "focus",
      note: plan.focusTask.whyNow
    },
    ...plan.today.slice(0, 3).map((item) => ({
      title: item.title,
      durationMinutes: parseDurationToMinutes(item.duration),
      source: "today" as const,
      note: `Energy: ${item.energy}`
    }))
  ];
}

export function materializeTimeblocks(drafts: TimeblockDraft[], now = new Date()) {
  const start = getStartingPoint(now);
  const blocks: Timeblock[] = [];
  let cursor = start;

  drafts.forEach((draft) => {
    const duration = Math.min(Math.max(draft.durationMinutes, 15), 180);
    blocks.push({
      title: draft.title,
      start: cursor,
      end: addMinutes(cursor, duration),
      source: draft.source,
      note: draft.note
    });
    cursor = addMinutes(cursor, duration + 10);
  });

  return blocks;
}

export function buildTimeblocks(plan: AtlasPlanResponse, now = new Date()) {
  return materializeTimeblocks(buildTimeblockDrafts(plan), now);
}

export function buildCalendarFileFromDrafts(drafts: TimeblockDraft[], now = new Date()) {
  const blocks = materializeTimeblocks(drafts, now);
  const stamp = formatIcsDate(new Date());
  const body = blocks
    .map((block, index) => {
      return [
        "BEGIN:VEVENT",
        `UID:atlas-${normalizeFileStamp(block.start)}-${index}@atlas`,
        `DTSTAMP:${stamp}`,
        `DTSTART:${formatIcsDate(block.start)}`,
        `DTEND:${formatIcsDate(block.end)}`,
        `SUMMARY:${escapeIcs(block.title)}`,
        `DESCRIPTION:${escapeIcs(block.note)}`,
        "END:VEVENT"
      ].join("\n");
    })
    .join("\n");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Atlas//Timeblocks//EN",
    "CALSCALE:GREGORIAN",
    body,
    "END:VCALENDAR"
  ].join("\n");
}

export function buildCalendarFile(plan: AtlasPlanResponse, now = new Date()) {
  return buildCalendarFileFromDrafts(buildTimeblockDrafts(plan), now);
}

export function getCalendarFilename(now = new Date()) {
  return `atlas-timeblocks-${normalizeFileStamp(now)}.ics`;
}
