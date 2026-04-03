"use client";

import { useMemo } from "react";
import {
  buildCalendarFileFromDrafts,
  getCalendarFilename,
  materializeTimeblocks,
  type TimeblockDraft
} from "@/lib/timeblocks";

type TimeblocksPanelProps = {
  drafts: TimeblockDraft[];
  onDraftChange: (index: number, patch: Partial<TimeblockDraft>) => void;
};

function formatTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit"
  }).format(date);
}

export function TimeblocksPanel({ drafts, onDraftChange }: TimeblocksPanelProps) {
  const blocks = useMemo(() => materializeTimeblocks(drafts), [drafts]);

  const downloadCalendar = () => {
    const file = buildCalendarFileFromDrafts(drafts);
    const blob = new Blob([file], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = getCalendarFilename();
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section
      className="reveal glass-card rounded-[30px] p-6 sm:p-8"
      style={{ animationDelay: "420ms" }}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-xl">
          <p className="section-label">Timeblocks</p>
          <h2 className="mt-3 text-3xl leading-tight text-balance sm:text-4xl">
            Turn the plan into a real calendar-ready session stack.
          </h2>
          <p className="mt-3 font-sans text-sm leading-6 text-[var(--muted)]">
            Atlas groups your focus task and top execution blocks into a schedule you can actually
            put on your calendar. Adjust the block names or lengths before you export.
          </p>
        </div>

        <button
          className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 font-sans text-sm font-semibold text-white transition hover:translate-y-[-1px] hover:bg-[#16554a] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--accent-soft)]"
          type="button"
          onClick={downloadCalendar}
        >
          Add to calendar
        </button>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="rounded-[26px] border border-[var(--border)] bg-white/75 p-5">
          <p className="section-label">Suggested run</p>
          <div className="mt-4 space-y-3">
            {blocks.map((block, index) => (
              <article
                key={`${block.title}-${block.start.toISOString()}`}
                className="rounded-[22px] border border-[var(--border)] bg-white px-4 py-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent-soft)] font-sans text-xs font-semibold text-[var(--accent)]">
                        {index + 1}
                      </span>
                      <input
                        className="min-w-0 flex-1 rounded-[14px] border border-transparent bg-[#f7f4ee] px-3 py-2 text-lg leading-tight text-[var(--text)] outline-none transition focus:border-[var(--accent)] focus:bg-white"
                        type="text"
                        value={drafts[index]?.title ?? block.title}
                        onChange={(event) =>
                          onDraftChange(index, { title: event.target.value.slice(0, 120) })
                        }
                      />
                    </div>
                    <textarea
                      className="mt-3 min-h-20 w-full resize-none rounded-[14px] border border-transparent bg-[#f7f4ee] px-3 py-3 font-sans text-sm leading-6 text-[var(--muted)] outline-none transition focus:border-[var(--accent)] focus:bg-white"
                      value={drafts[index]?.note ?? block.note}
                      onChange={(event) =>
                        onDraftChange(index, { note: event.target.value.slice(0, 180) })
                      }
                    />
                  </div>
                  <span className="rounded-full border border-[var(--border)] px-3 py-1 font-sans text-xs text-[var(--muted)]">
                    {block.source}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <label className="font-sans text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
                    Duration
                  </label>
                  <input
                    className="w-24 rounded-full border border-[var(--border)] bg-white px-3 py-2 font-sans text-sm text-[var(--text)] outline-none transition focus:border-[var(--accent)]"
                    type="number"
                    min={15}
                    max={180}
                    step={15}
                    value={drafts[index]?.durationMinutes ?? 45}
                    onChange={(event) =>
                      onDraftChange(index, {
                        durationMinutes: Math.max(
                          15,
                          Math.min(180, Number(event.target.value) || drafts[index]?.durationMinutes || 45)
                        )
                      })
                    }
                  />
                  <span className="font-sans text-sm text-[var(--muted)]">minutes</span>
                </div>
                <p className="mt-3 font-sans text-sm font-medium text-[var(--text)]">
                  {formatTime(block.start)} - {formatTime(block.end)}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-[26px] border border-[var(--border)] bg-white/70 p-5">
          <p className="section-label">Why it helps</p>
          <div className="mt-4 space-y-4">
            <div className="rounded-[22px] border border-[var(--border)] bg-white px-4 py-4">
              <h3 className="text-xl leading-tight">Calendar-ready immediately</h3>
              <p className="mt-2 font-sans text-sm leading-6 text-[var(--muted)]">
                No manual rewriting. Download an `.ics` file and drop the plan into Apple Calendar,
                Google Calendar, or Outlook.
              </p>
            </div>
            <div className="rounded-[22px] border border-[var(--border)] bg-white px-4 py-4">
              <h3 className="text-xl leading-tight">Built from the actual plan</h3>
              <p className="mt-2 font-sans text-sm leading-6 text-[var(--muted)]">
                Atlas uses the focus task and top today blocks so the schedule still reflects what
                matters instead of creating fake busywork.
              </p>
            </div>
            <div className="rounded-[22px] border border-[var(--border)] bg-white px-4 py-4">
              <h3 className="text-xl leading-tight">Good for a real student workflow</h3>
              <p className="mt-2 font-sans text-sm leading-6 text-[var(--muted)]">
                Generate the plan, export the blocks, and start working. That is a usable loop, not
                just a one-shot demo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
