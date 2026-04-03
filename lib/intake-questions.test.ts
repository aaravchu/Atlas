import { buildIntakeQuestions } from "@/lib/intake-questions";

describe("buildIntakeQuestions", () => {
  it("adapts prompts and options to class-heavy input", () => {
    const questions = buildIntakeQuestions(
      "I have 2 econ midterms next week, a stat test on Thursday, and I am behind on assignments."
    );

    expect(questions[0]?.prompt.toLowerCase()).toContain("midterms");
    expect(questions[1]?.prompt.toLowerCase()).toContain("econ");
    expect(questions[2]?.options[0]?.toLowerCase()).toContain("study");
  });

  it("adapts prompts to recruiting input without inventing specifics", () => {
    const questions = buildIntakeQuestions(
      "I need to apply to bain, do internship outreach, and keep up with classes."
    );

    expect(questions[0]?.prompt).toContain("Bain");
    expect(questions[0]?.options[0]?.toLowerCase()).toContain("application");
    expect(questions[1]?.prompt.toLowerCase()).toContain("recruiting");
  });
});
