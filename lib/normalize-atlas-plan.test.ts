import { normalizeAtlasPlan } from "@/lib/normalize-atlas-plan";

describe("normalizeAtlasPlan", () => {
  it("dedupes priorities and replaces vague titles with sharper action verbs", () => {
    const plan = normalizeAtlasPlan({
      summary: "test",
      priorities: [
        {
          title: "work on resume",
          reason: "important",
          urgency: "high"
        },
        {
          title: "Work on resume",
          reason: "",
          urgency: "high"
        }
      ],
      today: [
        {
          title: "think about coffee chats",
          duration: "20 min",
          energy: "medium"
        }
      ],
      thisWeek: [
        {
          title: "work on applications",
          category: "career",
          deadline: "Friday"
        }
      ],
      focusTask: {
        title: "work on resume",
        whyNow: "",
        firstStep: "think about bullet points",
        estimatedMinutes: 25
      }
    }, "I need help with recruiting, coffee chats, and my resume.");

    expect(plan.priorities).toHaveLength(1);
    expect(plan.priorities[0]?.title).toBe("Refine Resume Bullets With Stronger Impact Metrics");
    expect(plan.today[0]?.title).toBe("Draft Outreach For Targeted Networking Conversations");
    expect(plan.focusTask.whyNow.length).toBeGreaterThan(10);
  });

  it("rewrites class and club tasks when the domain is obvious", () => {
    const plan = normalizeAtlasPlan(
      {
        summary: "test",
        priorities: [
          {
            title: "study for exam",
            reason: "stay on track",
            urgency: "high"
          }
        ],
        today: [
          {
            title: "plan meeting",
            duration: "20 min",
            energy: "medium"
          }
        ],
        thisWeek: [
          {
            title: "do club work",
            category: "personal",
            deadline: "Friday"
          }
        ],
        focusTask: {
          title: "study for exam",
          whyNow: "important",
          firstStep: "work on homework",
          estimatedMinutes: 30
        }
      },
      "I have a midterm this week and need to prepare for a club exec meeting."
    );

    expect(plan.priorities[0]?.title).toBe("Review Key Concepts And Practice Likely Exam Material");
    expect(plan.priorities[0]?.reason).toContain("reduces academic risk");
    expect(plan.today[0]?.title).toBe("Draft A Clear Agenda For The Next Meeting");
  });
});
