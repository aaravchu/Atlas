import type { AtlasPlan } from "@/lib/atlas-plan-schema";

type Domain = "recruiting" | "classes" | "clubs" | "general";

const vaguePhraseMatchers: Array<[RegExp, string]> = [
  [/^work on\s+/i, ""],
  [/^think about\s+/i, "Clarify "],
  [/^try to\s+/i, ""],
  [/^start on\s+/i, ""],
  [/^do\s+/i, ""]
];

const actionVerbMatchers: Array<[RegExp, string]> = [
  [/\bresume\b/i, "Refine"],
  [/\bbullet\b/i, "Refine"],
  [/\bcoffee chat\b/i, "Schedule"],
  [/\boutreach\b/i, "Send"],
  [/\bapplication\b/i, "Complete"],
  [/\bmidterm\b/i, "Review"],
  [/\bexam\b/i, "Review"],
  [/\bdeck\b/i, "Draft"],
  [/\bslides?\b/i, "Draft"],
  [/\bclub\b/i, "Draft"],
  [/\binterview\b/i, "Review"],
  [/\bnotes?\b/i, "Organize"]
];

const fillerWords = /\b(the|a|an|really|very|just|some|more)\b/gi;

function stripVagueLead(title: string) {
  return vaguePhraseMatchers.reduce((current, [matcher, replacement]) => {
    return current.replace(matcher, replacement);
  }, title.trim());
}

function titleCase(value: string) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function chooseActionVerb(title: string) {
  const found = actionVerbMatchers.find(([matcher]) => matcher.test(title));
  return found?.[1] ?? "Complete";
}

function hasStrongVerb(title: string) {
  return /^(Review|Draft|Apply|Refine|Schedule|Send|Submit|Organize|Practice|Finalize|Complete|Plan|Outline|Prepare|Write|Build|Clarify)\b/i.test(
    title
  );
}

function shortenTitle(title: string) {
  const trimmed = title.replace(fillerWords, "").replace(/\s+/g, " ").trim();
  if (trimmed.length <= 72) {
    return trimmed;
  }

  return `${trimmed.slice(0, 69).trimEnd()}...`;
}

function baseNormalizeTitle(title: string) {
  const stripped = stripVagueLead(title).replace(/\s+/g, " ").trim();
  const withVerb = hasStrongVerb(stripped) ? stripped : `${chooseActionVerb(stripped)} ${stripped}`;
  return titleCase(shortenTitle(withVerb));
}

function dedupeByTitle<T extends { title: string }>(items: T[]) {
  const seen = new Set<string>();

  return items.filter((item) => {
    const key = item.title.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function countMatches(source: string, matcher: RegExp) {
  return source.match(new RegExp(matcher.source, "gi"))?.length ?? 0;
}

function detectDomain(text: string, rawInput: string): Domain {
  const titleSource = text.toLowerCase();
  const fullSource = `${text} ${rawInput}`.toLowerCase();
  const domains = [
    {
      name: "recruiting" as const,
      matcher:
        /resume|coffee chat|internship|application|behavioral|interview|network|analyst|cover letter|recruit/
    },
    {
      name: "classes" as const,
      matcher:
        /exam|midterm|final|class|lecture|assignment|homework|syllabus|quiz|office hours|case|problem set/
    },
    {
      name: "clubs" as const,
      matcher: /club|exec|meeting|event|speaker|member|outreach|logistics|board/
    }
  ];

  const scored = domains
    .map((domain) => ({
      domain: domain.name,
      score: countMatches(titleSource, domain.matcher) * 3 + countMatches(fullSource, domain.matcher)
    }))
    .sort((left, right) => right.score - left.score);

  return scored[0] && scored[0].score > 0 ? scored[0].domain : "general";
}

function hasHighConfidenceDomainMatch(title: string, rawInput: string, domain: Domain) {
  const source = `${title} ${rawInput}`.toLowerCase();

  if (domain === "recruiting") {
    return /resume|coffee chat|internship|application|behavioral|interview|network|analyst|cover letter|recruit/.test(
      source
    );
  }

  if (domain === "classes") {
    return /exam|midterm|final|class|lecture|assignment|homework|syllabus|quiz|office hours|case|problem set/.test(
      source
    );
  }

  if (domain === "clubs") {
    return /club|exec|meeting|event|speaker|member|outreach|logistics|board/.test(source);
  }

  return false;
}

function rewriteTitleForDomain(title: string, domain: Domain) {
  const t = title.toLowerCase();

  if (domain === "recruiting") {
    if (/resume|bullet/.test(t)) {
      return "Refine Resume Bullets With Stronger Impact Metrics";
    }

    if (/application|cover letter/.test(t)) {
      return "Complete Priority Application Questions";
    }

    if (/interview|behavioral/.test(t)) {
      return "Review Interview Stories And Likely Questions";
    }

    if (/network|coffee chat|outreach|alumni/.test(t)) {
      return "Draft Outreach For Targeted Networking Conversations";
    }
  }

  if (domain === "classes") {
    if (/study|exam|midterm|final|quiz/.test(t)) {
      return "Review Key Concepts And Practice Likely Exam Material";
    }

    if (/assignment|homework|problem set/.test(t)) {
      return "Finish Assignment And Note Any Blockers";
    }

    if (/class|lecture|notes|case/.test(t)) {
      return "Condense Lecture Notes Into Key Takeaways";
    }
  }

  if (domain === "clubs") {
    if (/meeting|exec/.test(t)) {
      return "Draft A Clear Agenda For The Next Meeting";
    }

    if (/event|logistics/.test(t)) {
      return "Finalize Event Logistics And Next Owners";
    }

    if (/outreach|speaker|partner/.test(t)) {
      return "Send Follow-Ups For Speaker Or Partner Outreach";
    }
  }

  return title;
}

function normalizeReason(reason: string, title: string, urgency?: string, domain: Domain = "general") {
  const trimmed = reason.trim();
  const genericWeak = /^this is important|stay on track|make progress|keep momentum|be productive/i.test(trimmed);

  if (trimmed.length >= 24 && !genericWeak) {
    return trimmed;
  }

  if (domain === "recruiting") {
    return `${title} matters now because it moves a real application or conversation forward.`;
  }

  if (domain === "classes") {
    return `${title} matters now because it reduces academic risk before the deadline.`;
  }

  if (domain === "clubs") {
    return `${title} matters now because it prevents coordination drift and keeps momentum.`;
  }

  const urgencyCopy =
    urgency === "high"
      ? "It is the fastest way to lower immediate pressure."
      : "It creates visible momentum and keeps the rest of the week from staying vague.";

  return `${title} matters now because ${urgencyCopy}`;
}

function normalizeTitle(title: string, rawInput: string, allowDomainRewrite = true) {
  const normalized = baseNormalizeTitle(title);
  const domain = detectDomain(normalized, rawInput);

  if (allowDomainRewrite && hasHighConfidenceDomainMatch(normalized, rawInput, domain)) {
    return {
      title: rewriteTitleForDomain(normalized, domain),
      domain
    };
  }

  return {
    title: normalized,
    domain
  };
}

export function normalizeAtlasPlan(plan: AtlasPlan, rawInput = ""): AtlasPlan {
  const priorities = dedupeByTitle(
    plan.priorities.map((priority) => {
      const normalized = normalizeTitle(priority.title, rawInput);

      return {
        ...priority,
        title: normalized.title,
        reason: normalizeReason(priority.reason, normalized.title, priority.urgency, normalized.domain)
      };
    })
  ).slice(0, 3);

  const today = dedupeByTitle(
    plan.today.map((item) => {
      const normalized = normalizeTitle(item.title, rawInput);

      return {
        ...item,
        title: normalized.title
      };
    })
  ).slice(0, 5);

  const thisWeek = dedupeByTitle(
    plan.thisWeek.map((item) => ({
      ...item,
      title: normalizeTitle(item.title, rawInput, false).title
    }))
  ).slice(0, 6);

  const focusTitle = normalizeTitle(plan.focusTask.title || priorities[0]?.title || "Define the next move", rawInput);
  const firstStep = normalizeTitle(plan.focusTask.firstStep, rawInput);

  return {
    ...plan,
    priorities,
    today,
    thisWeek,
    focusTask: {
      ...plan.focusTask,
      title: focusTitle.title,
      whyNow: normalizeReason(plan.focusTask.whyNow, focusTitle.title, priorities[0]?.urgency, focusTitle.domain),
      firstStep: firstStep.title
    }
  };
}
