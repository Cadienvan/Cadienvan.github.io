import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const studies = defineCollection({
  loader: glob({ pattern: "*/index.mdx", base: "./src/content/studies" }),
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
