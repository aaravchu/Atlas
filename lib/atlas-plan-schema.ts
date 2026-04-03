import { z } from "zod";

export const urgencySchema = z.enum(["low", "medium", "high"]);
export const energySchema = z.enum(["low", "medium", "high"]);
export const categorySchema = z.enum(["school", "career", "admin", "personal"]);

export const AtlasPlanSchema = z.object({
  summary: z.string().min(1).max(200),
  priorities: z
    .array(
      z.object({
        title: z.string().min(1).max(120),
        reason: z.string().min(1).max(180),
        urgency: urgencySchema
      })
    )
    .max(3),
  today: z
    .array(
      z.object({
        title: z.string().min(1).max(120),
        duration: z.string().min(1).max(40),
        energy: energySchema
      })
    )
    .max(5),
  thisWeek: z
    .array(
      z.object({
        title: z.string().min(1).max(120),
        deadline: z.string().max(60).optional(),
        category: categorySchema
      })
    )
    .max(6),
  focusTask: z.object({
    title: z.string().min(1).max(120),
    whyNow: z.string().min(1).max(180),
    firstStep: z.string().min(1).max(180),
    estimatedMinutes: z.number().int().min(5).max(180)
  })
});

export const planMetaSchema = z.object({
  mode: z.enum(["mock", "live", "fallback"]),
  warning: z.string().optional()
});

export const AtlasPlanResponseSchema = AtlasPlanSchema.extend({
  meta: planMetaSchema
});

export type AtlasPlan = z.infer<typeof AtlasPlanSchema>;
export type AtlasPlanResponse = z.infer<typeof AtlasPlanResponseSchema>;
