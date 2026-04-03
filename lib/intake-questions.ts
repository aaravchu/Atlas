export type IntakeQuestion = {
  id: string;
  label: string;
  prompt: string;
  options: string[];
};

type Domain = "classes" | "clubs" | "general" | "recruiting";

type InputSignals = {
  classSubject?: string;
  classWorkload?: string;
  company?: string;
  clubScope?: string;
  nearestPressure?: string;
  recruitingLane?: string;
};

const classPatterns = [
  "midterm",
  "exam",
  "test",
  "class",
  "assignment",
  "homework",
  "lecture",
  "problem set",
  "quiz",
  "syllabus"
];

const recruitingPatterns = [
  "recruit",
  "internship",
  "interview",
  "outreach",
  "application",
  "resume",
  "coffee chat",
  "cover letter",
  "network"
];

const clubPatterns = ["club", "lead", "meeting", "exec", "board", "event", "speaker", "member"];

function hasAny(source: string, patterns: string[]) {
  return patterns.some((pattern) => source.includes(pattern));
}

function extractMatch(source: string, pattern: RegExp) {
  const match = source.match(pattern);
  return match?.[1]?.trim();
}

function toReadableName(raw: string) {
  return raw
    .split(/\s+/)
    .slice(0, 3)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function getSignals(input: string): InputSignals {
  const source = input.toLowerCase();

  const classSubject =
    extractMatch(source, /\b(econ|economics|stat|stats|finance|accounting|cs|calc|calculus|math)\b/) ??
    undefined;

  const company = extractMatch(source, /\b(?:apply|applying|application)\s+(?:to|for)\s+([a-z][a-z0-9&.\- ]{1,24})/i);

  const clubScope =
    extractMatch(source, /\b(?:lead|run|manage)\s+(?:a|the)?\s*([a-z][a-z0-9&.\- ]{1,28})\s+club/i) ??
    extractMatch(source, /\bclub\b(?:\s+(?:meeting|event|work))?/i);

  const recruitingLane =
    extractMatch(source, /\brecruit(?:ing)?\s+for\s+([a-z][a-z0-9&.\- ]{1,24})/i) ??
    extractMatch(source, /\boutreach\s+for\s+([a-z][a-z0-9&.\- ]{1,24})/i);

  const classWorkload =
    extractMatch(source, /\b(\d+\s+(?:[a-z]+\s+)?(?:midterms?|exams?|tests?))\b/) ??
    extractMatch(source, /\b(midterm|exam|test|assignment|problem set)\b/);

  const nearestPressure =
    extractMatch(source, /\b(on\s+(?:monday|tuesday|wednesday|thursday|friday|saturday|sunday))\b/) ??
    extractMatch(source, /\b(next\s+week)\b/) ??
    extractMatch(source, /\b(tonight|tomorrow|this week)\b/);

  return {
    classSubject,
    classWorkload,
    clubScope: clubScope && clubScope !== "club" ? clubScope : undefined,
    company: company ? toReadableName(company) : undefined,
    nearestPressure,
    recruitingLane
  };
}

function detectPrimaryDomain(input: string, signals: InputSignals): Domain {
  const source = input.toLowerCase();

  if (signals.company || signals.recruitingLane || hasAny(source, recruitingPatterns)) {
    return "recruiting";
  }

  if (signals.classSubject || signals.classWorkload || hasAny(source, classPatterns)) {
    return "classes";
  }

  if (signals.clubScope || hasAny(source, clubPatterns)) {
    return "clubs";
  }

  return "general";
}

function buildPriorityQuestion(primaryDomain: Domain, signals: InputSignals): IntakeQuestion {
  if (primaryDomain === "classes") {
    const pressure = signals.classWorkload ?? "the nearest exam";
    return {
      id: "priority",
      label: "Protect first",
      prompt: `What should Atlas optimize around with ${pressure}?`,
      options: [
        "Front-load the closest exam so I stop leaking points",
        "Balance exam prep with the rest of the week so nothing collapses",
        "Keep academic work moving, but leave room for recruiting too"
      ]
    };
  }

  if (primaryDomain === "recruiting") {
    const lane = signals.company ?? signals.recruitingLane ?? "recruiting";
    return {
      id: "priority",
      label: "Protect first",
      prompt: `What needs the most protection in your ${lane} push?`,
      options: [
        "Move the highest-value application or outreach first",
        "Keep recruiting alive, but do not let classes slip",
        "Use Atlas to cut this into the smallest realistic moves"
      ]
    };
  }

  if (primaryDomain === "clubs") {
    return {
      id: "priority",
      label: "Protect first",
      prompt: "What should Atlas keep from drifting this week?",
      options: [
        "Make sure the next club deliverable is clearly owned",
        "Protect school first and keep leadership work contained",
        "Shrink everything down to the fewest actions that still move the week"
      ]
    };
  }

  return {
    id: "priority",
    label: "Protect first",
    prompt: "What should Atlas protect first?",
    options: [
      "The nearest hard deadline",
      "The most important lane, even if it is not due first",
      "The fewest actions that create immediate momentum"
    ]
  };
}

function buildConstraintQuestion(primaryDomain: Domain, signals: InputSignals): IntakeQuestion {
  if (primaryDomain === "classes") {
    const subject = signals.classSubject ? `${signals.classSubject} work` : "school work";
    return {
      id: "constraint",
      label: "Real constraint",
      prompt: `What is the real limit on your ${subject} this week?`,
      options: [
        "I have one solid deep-work block and need the rest to be compact",
        "My schedule is fragmented, so shorter academic blocks will stick better",
        "I can handle one demanding block first, then lighter follow-through"
      ]
    };
  }

  if (primaryDomain === "recruiting") {
    return {
      id: "constraint",
      label: "Real constraint",
      prompt: "What makes recruiting hardest to execute right now?",
      options: [
        "Starting is the hard part, so give me the clearest first move",
        "I can do one serious block, but I need the rest to stay lightweight",
        "I need Atlas to contain recruiting so it does not take over the whole week"
      ]
    };
  }

  if (primaryDomain === "clubs") {
    return {
      id: "constraint",
      label: "Real constraint",
      prompt: "Where does leadership work usually go sideways?",
      options: [
        "It expands too much, so I need tighter scope",
        "It gets deferred behind classes unless the next action is obvious",
        "I need one clear owner-style task, not a vague reminder"
      ]
    };
  }

  return {
    id: "constraint",
    label: "Real constraint",
    prompt: "What usually derails weeks like this?",
    options: [
      "Too many competing priorities at once",
      "Not enough uninterrupted time",
      "Unclear first steps, even when I know what matters"
    ]
  };
}

function buildOutcomeQuestion(primaryDomain: Domain, signals: InputSignals): IntakeQuestion {
  if (primaryDomain === "classes") {
    const pressure = signals.nearestPressure ?? "the next few days";
    return {
      id: "outcome",
      label: "Useful outcome",
      prompt: `What would make Atlas feel genuinely helpful by ${pressure}?`,
      options: [
        "I know exactly what to study first and for how long",
        "I can see a full week that balances classes and recruiting",
        "I feel less behind because the plan is realistic, not idealized"
      ]
    };
  }

  if (primaryDomain === "recruiting") {
    return {
      id: "outcome",
      label: "Useful outcome",
      prompt: "What would make this plan feel immediately worth using?",
      options: [
        "A clear recruiting move I can finish today",
        "A week that keeps recruiting visible without wrecking everything else",
        "A focus task that creates momentum fast"
      ]
    };
  }

  if (primaryDomain === "clubs") {
    const scope = signals.clubScope ? `${signals.clubScope} work` : "club work";
    return {
      id: "outcome",
      label: "Useful outcome",
      prompt: `What should Atlas deliver for your ${scope}?`,
      options: [
        "A tight plan that keeps the next leadership action from drifting",
        "A week where school is protected and club work still moves",
        "A first move that is concrete enough to do immediately"
      ]
    };
  }

  return {
    id: "outcome",
    label: "Useful outcome",
    prompt: "What would make this plan feel genuinely useful?",
    options: [
      "Tell me where to start with confidence",
      "Give me a week that feels realistic and calm",
      "Reduce the mess to the fewest actions that matter"
    ]
  };
}

export function buildIntakeQuestions(input: string): IntakeQuestion[] {
  const signals = getSignals(input);
  const primaryDomain = detectPrimaryDomain(input, signals);

  return [
    buildPriorityQuestion(primaryDomain, signals),
    buildConstraintQuestion(primaryDomain, signals),
    buildOutcomeQuestion(primaryDomain, signals)
  ];
}

export function buildPlanningInput(input: string, answers: Record<string, string>) {
  const contextLines = Object.entries(answers)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}: ${value}`);

  if (!contextLines.length) {
    return input;
  }

  return `${input}\n\nAtlas follow-up context:\n${contextLines.join("\n")}`;
}
