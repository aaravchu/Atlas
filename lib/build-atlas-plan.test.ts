import { buildAtlasPlan } from "@/lib/build-atlas-plan";

describe("buildAtlasPlan", () => {
  it("pulls relevant categories from a messy student prompt", () => {
    const plan = buildAtlasPlan(
      "I have two midterms, consulting recruiting coffee chats, and a club meeting to prep for."
    );

    expect(plan.priorities[0]?.urgency).toBe("high");
    expect(plan.thisWeek.some((task) => task.category === "career")).toBe(true);
    expect(plan.today.length).toBeGreaterThan(0);
  });

  it("still returns a calm plan when no specific keywords are present", () => {
    const plan = buildAtlasPlan("My week feels messy and I need help getting organized.");

    expect(plan.priorities[0]?.title).toContain("three outcomes");
    expect(plan.focusTask.estimatedMinutes).toBe(25);
  });
});
