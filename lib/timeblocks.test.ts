import { buildCalendarFile, buildTimeblocks } from "@/lib/timeblocks";
import type { AtlasPlanResponse } from "@/lib/atlas-plan-schema";

const plan: AtlasPlanResponse = {
  summary: "Test plan",
  priorities: [
    {
      title: "Review finance midterm material",
      reason: "Reduces academic risk before the deadline.",
      urgency: "high"
    }
  ],
  today: [
    {
      title: "Draft outreach for two alumni",
      duration: "30 min",
      energy: "medium"
    },
    {
      title: "Outline the next club meeting",
      duration: "20 min",
      energy: "low"
    }
  ],
  thisWeek: [],
  focusTask: {
    title: "Review likely exam material",
    whyNow: "This lowers the most immediate pressure.",
    firstStep: "Open lecture notes and practice problems.",
    estimatedMinutes: 25
  },
  meta: {
    mode: "mock"
  }
};

describe("timeblocks", () => {
  it("builds a focus block first and appends today tasks", () => {
    const blocks = buildTimeblocks(plan, new Date("2026-04-02T10:05:00"));

    expect(blocks[0]?.source).toBe("focus");
    expect(blocks).toHaveLength(3);
    expect(blocks[1]?.title).toContain("Draft outreach");
  });

  it("creates a valid calendar file", () => {
    const ics = buildCalendarFile(plan, new Date("2026-04-02T10:05:00"));

    expect(ics).toContain("BEGIN:VCALENDAR");
    expect(ics).toContain("SUMMARY:Review likely exam material");
    expect(ics).toContain("END:VCALENDAR");
  });
});
