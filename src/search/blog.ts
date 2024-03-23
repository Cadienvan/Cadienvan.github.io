import { create, insert } from "@orama/orama";
import * as inevitabot from "../pages/blog/inevitabot.md";

export default async function fill() {
  const blogDB = await create({
    id: "blog",
    schema: {
      title: "string",
      date: "string",
      content: "string",
      url: "string",
    } as const,
  });

  await insert(blogDB, {
    title: inevitabot.frontmatter.title,
    date: inevitabot.frontmatter.date,
    content: inevitabot.rawContent(),
    url: "/blog/inevitabot",
  });

  return { instance: blogDB, params: {
    tolerance: 3,
    limit: 5,
    boost: {
      title: 5,
      content: 0.1
    },
  } };
}
