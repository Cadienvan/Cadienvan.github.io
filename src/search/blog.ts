import { create, insert } from "@orama/orama";
import * as inevitabot from "../pages/blog/inevitabot.md";
import * as asynchronousBatching from "../pages/blog/asynchronous-batching.md";
import * as svalutazioneFrontend from "../pages/blog/svalutazione-frontend.md";

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

  await insert(blogDB, {
    title: asynchronousBatching.frontmatter.title,
    date: asynchronousBatching.frontmatter.date,
    content: asynchronousBatching.rawContent(),
    url: "/blog/asynchronous-batching",
  });

  await insert(blogDB, {
    title: svalutazioneFrontend.frontmatter.title,
    date: svalutazioneFrontend.frontmatter.date,
    content: svalutazioneFrontend.rawContent(),
    url: "/blog/svalutazione-frontend",
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
