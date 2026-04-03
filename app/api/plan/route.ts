import { NextResponse } from "next/server";
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import {
  AtlasPlanResponseSchema,
  AtlasPlanSchema,
  type AtlasPlan
} from "@/lib/atlas-plan-schema";
import { buildAtlasPlan } from "@/lib/build-atlas-plan";
import { normalizeAtlasPlan } from "@/lib/normalize-atlas-plan";

export const runtime = "nodejs";

function getClient() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
}

function buildPrompt(input: string) {
  return `
You are Atlas, a calm and precise planning engine for ambitious college students.

Transform the user's messy input into a structured execution plan.

Rules:
- Be concise, useful, and specific.
- Do not sound like a chatbot.
- Do not use motivational fluff.
- Surface at most 3 priorities.
- Make actions concrete and immediately executable.
- Choose one clear focus task.
- Prefer realistic durations and deadlines.
- If the user mentions recruiting, classes, clubs, or side projects, reflect them naturally.
- When the input is broad or overwhelming, reduce it to the fewest actions needed to create immediate momentum.
- Output only content that fits the schema.

User input:
"""${input}"""
  `.trim();
}

export async function POST(request: Request) {
  let input = "";

  try {
    const body = (await request.json()) as { input?: string };
    input = body.input?.trim() ?? "";

    if (!input) {
      return NextResponse.json(
        { error: "Input is required to generate a plan." },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      const fallbackPlan = normalizeAtlasPlan(buildAtlasPlan(input), input);

      return NextResponse.json(
        AtlasPlanResponseSchema.parse({
          ...fallbackPlan,
          meta: { mode: "mock" }
        })
      );
    }

    const response = await getClient().responses.parse({
      model: "gpt-5",
      reasoning: { effort: "low" },
      input: [
        {
          role: "developer",
          content:
            "You are Atlas. Convert chaotic student input into a concise, structured execution plan. When the input is broad or overwhelming, reduce it to the fewest actions needed to create immediate momentum."
        },
        {
          role: "user",
          content: buildPrompt(input)
        }
      ],
      text: {
        format: zodTextFormat(AtlasPlanSchema, "atlas_plan")
      }
    });

    const parsed = response.output_parsed;

    if (!parsed) {
      throw new Error("Model returned no parsed plan.");
    }

    const plan: AtlasPlan = normalizeAtlasPlan(AtlasPlanSchema.parse(parsed), input);

    return NextResponse.json(
      AtlasPlanResponseSchema.parse({
        ...plan,
        meta: { mode: "live" }
      })
    );
  } catch (error) {
    console.error("Atlas plan route failed:", error);

    if (input) {
      const fallbackPlan = normalizeAtlasPlan(buildAtlasPlan(input), input);

      return NextResponse.json(
        AtlasPlanResponseSchema.parse({
          ...fallbackPlan,
          meta: {
            mode: "fallback",
            warning: "Live planning was unavailable. Showing fallback plan."
          }
        })
      );
    }

    return NextResponse.json(
      { error: "Unable to generate a plan right now." },
      { status: 500 }
    );
  }
}
