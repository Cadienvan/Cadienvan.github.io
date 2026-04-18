import { defineCollection, z } from "astro:content";

const studies = defineCollection({
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    pdfUrl: z.string().url().optional(),
    kind: z.enum(["paper", "concept", "pattern"]).default("paper"),
    lang: z.enum(["it", "en"]).default("it"),
    order: z.number().optional(),
  }),
});

export const collections = { studies };
