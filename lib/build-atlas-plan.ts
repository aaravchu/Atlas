import type { AtlasPlan } from "@/lib/atlas-plan-schema";

const keywordMap = [
  {
    keyword: "midterm",
    priority: {
      title: "Lock your highest-yield midterm prep block",
      reason: "Academic pressure is the nearest hard deadline, so it needs a clean block before it keeps expanding.",
      urgency: "high"
    },
    today: {
      title: "Outline the most likely midterm topics",
      duration: "45 min",
      energy: "high"
    },
    week: {
      title: "Finish midterm study plan",
      deadline: "Before the first exam",
      category: "school"
    }
  },
  {
    keyword: "recruit",
    priority: {
      title: "Turn recruiting into scheduled outreach",
      reason: "Recruiting feels heavy when it stays abstract. Specific outreach creates momentum fast.",
      urgency: "high"
    },
    today: {
      title: "Send the next recruiting outreach batch",
      duration: "30 min",
      energy: "medium"
    },
    week: {
      title: "Book coffee chats and follow-ups",
      deadline: "This week",
      category: "career"
    }
  },
  {
    keyword: "club",
    priority: {
      title: "Define the club deliverable before it becomes background stress",
      reason: "Club work gets noisy when the actual output and timing are still fuzzy.",
      urgency: "medium"
    },
    today: {
      title: "Write the first draft of the club deliverable",
      duration: "40 min",
      energy: "medium"
    },
    week: {
      title: "Finalize your next club deliverable",
      deadline: "Before the next meeting",
      category: "personal"
    }
  },
  {
    keyword: "interview",
    priority: {
      title: "Protect one serious interview prep block",
      reason: "Interview prep compounds when it is consistent and focused rather than reactive.",
      urgency: "medium"
    },
    today: {
      title: "Run one focused interview practice session",
      duration: "50 min",
      energy: "high"
    },
    week: {
      title: "Complete two interview prep reps",
      deadline: "This week",
      category: "career"
    }
  }
] as const;

function pickSignals(input: string) {
  const lowered = input.toLowerCase();
  return keywordMap.filter((item) => lowered.includes(item.keyword));
}

export function buildAtlasPlan(input: string): AtlasPlan {
  const signals = pickSignals(input);

  const priorities = signals.length
    ? signals.map((item) => item.priority).slice(0, 3)
    : [
        {
          title: "Choose the three outcomes that would make this week feel under control",
          reason: "When everything is urgent, Atlas should reduce pressure by forcing a short ranked list.",
          urgency: "high" as const
        }
      ];

  const today = [
    ...(signals.map((item) => item.today).slice(0, 3) || []),
    {
      title: "Turn the rest of the brain dump into concrete next actions",
      duration: "20 min",
      energy: "low" as const
    },
    {
      title: "Reserve one recovery block so the plan stays realistic",
      duration: "15 min",
      energy: "low" as const
    }
  ].slice(0, 5);

  const thisWeek = [
    ...(signals.map((item) => item.week).slice(0, 4) || []),
    {
      title: "Clear low-value admin that is stealing attention",
      deadline: "By Friday",
      category: "admin" as const
    },
    {
      title: "Protect one personal reset block",
      deadline: "This weekend",
      category: "personal" as const
    }
  ].slice(0, 6);

  const firstPriority = priorities[0];
  const firstToday = today[0];

  return {
    summary:
      "Atlas pulled the pressure points forward, translated the vague parts into concrete actions, and left you with one obvious place to start.",
    priorities,
    today,
    thisWeek,
    focusTask: {
      title: firstPriority?.title ?? "Define the next meaningful move",
      whyNow:
        firstPriority?.reason ??
        "The fastest way to lower overwhelm is to make one important action feel specific and startable.",
      firstStep:
        firstToday?.title ??
        "Open the materials you need and define the smallest useful output for the next 20 minutes.",
      estimatedMinutes: 25
    }
  };
}
