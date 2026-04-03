# AGENTS.md

## Product goal
Build Atlas, a portfolio-quality AI product for ambitious college students who feel overwhelmed by scattered responsibilities.

Atlas turns messy inputs like notes, goals, deadlines, syllabi, and recruiting tasks into a clear execution system with structured plans, prioritized actions, and a clean weekly view.

Prioritize clarity, usability, speed, and visual consistency over feature count.

## Target user
- Primary user: high-agency college students in business or tech tracks
- Typical profile: freshman through junior balancing classes, recruiting, clubs, and side projects
- Core need: instant structure without manual setup
- Core promise: reduce overwhelm and create clarity fast

## Core workflow
1. The user lands on a minimal input screen with a clear prompt.
2. The user pastes messy text such as goals, deadlines, class work, or recruiting notes.
3. AI interprets the input and generates structured tasks, categorized goals, priorities, and a weekly plan.
4. The user reviews the output in a polished dashboard.
5. The user edits, accepts, or drills into a single task.
6. The user enters a focused execution mode with minimal distraction.

## Demo moment
The strongest demo moment is instant transformation from a chaotic paragraph into a structured weekly plan, prioritized tasks, and a clean dashboard with immediate clarity.

Protect this experience.

## Product priorities
- Make the first-run experience immediately understandable
- Make AI output feel useful, structured, and calm
- Keep the interface minimal and premium
- Ensure priorities are obvious within 5 seconds
- Optimize for demo quality and first impression

## Repository map
- `app/`: routes, pages, layouts, and API handlers
- `components/`: reusable UI components
- `lib/`: utilities, AI logic, parsing, formatting, and shared business logic
- `styles/`: global styles, theme tokens, and design primitives
- `public/`: static assets

## Expected stack
- Framework: Next.js
- Language: TypeScript
- Styling: Tailwind CSS
- Backend: Next.js route handlers
- AI: OpenAI API
- Database: Supabase or Firebase
- Auth: Clerk or Supabase Auth
- Deployment: Vercel

## Commands
- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Test: `npm run test`
- Typecheck: `npm run type-check`
- Format: `npm run format`

## Coding standards
- Keep components small, focused, and reusable.
- Prefer readable code over clever abstractions.
- Reuse existing components before creating new ones.
- Keep naming consistent with the codebase.
- Keep API boundaries clean and predictable.
- Introduce new dependencies only with clear justification.
- Accessibility basics are required.

## Design standards
- Visual direction: calm, premium, minimal, precise, cinematic
- Spacing: airy and consistent, based on an 8px grid
- Typography: restrained, strong hierarchy, easy to scan
- Color: one accent color preferred
- Corners: slightly rounded, never overly soft or bubbly
- Motion: subtle, smooth, and purposeful

Avoid clutter, noisy gradients, and default-looking UI.

## UX standards
- Every key screen should be understandable within 5 seconds.
- Priorities must feel obvious at a glance.
- The product should feel like a real tool, not a prototype.
- Focus on clarity over feature density.
- Mobile responsiveness is required.
- Keyboard access and visible focus states are required.
- Hover, focus, loading, empty, error, and success states must be intentionally designed.

## Key screens
- Input Screen: capture messy intent quickly and clearly
- Dashboard: show today and week views with strong prioritization
- Focus Mode: help the user execute one task with minimal distraction

## State handling
- Loading: skeletons with subtle motion
- Empty: guided prompt with example input and a clear next step
- Error: human message with a recovery path and retry action
- Success: smooth transition and visible confirmation

## Constraints
- Do not break existing flows.
- Do not overcomplicate the UI.
- Do not add heavy dependencies without strong justification.
- Do not refactor large sections without a clear reason or plan.
- Do not ship placeholder copy in final UI unless clearly marked.
- Do not let AI output become vague, bloated, or generic.

## Anti-patterns to avoid
- Generic "AI assistant" feel
- Cluttered dashboards
- Too many features competing for attention
- Weak hierarchy or unclear priorities
- Inconsistent spacing
- Multiple competing accent colors
- Default component-library look without refinement
- Slow or awkward generation flows
- Hallucinated outputs or vague suggestions
- Overly verbose UI copy

## Definition of done
1. It works reliably.
2. The UI is polished and visually consistent.
3. Loading, empty, error, and success states are handled.
4. There is no obvious UX confusion.
5. Lint, tests, and type checks pass when applicable.
6. The result is demo-ready.

## When making changes
Before coding:
- Briefly state the plan.
- Call out any large refactor or structural change before doing it.

After coding:
- Review for bugs, weak UX, inconsistent spacing, and visual rough edges.
- Check whether the result feels premium rather than merely functional.
- Suggest final polish improvements if anything still feels close but not finished.
