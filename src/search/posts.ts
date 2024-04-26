import { create, insert } from "@orama/orama";
import posts from "../data/linkedin-posts.json";
import postsCategories from "../data/linkedin-posts-categories.json";

export default async function fill() {
  const categoriesMap = new Map<string, string>();
  for (const category of postsCategories) {
    categoriesMap.set(category.slug, `${category.title} (${category.description})`);
  }

  const postsDB = await create({
    id: "posts",
    schema: {
      title: "string",
      category: "string",
      url: "string",
    } as const,
  });

  for (const post of posts) {
    await insert(postsDB, {
      title: `LinkedIn: ${post.title}`,
      category: categoriesMap.get(post.category) ?? post.category,
      url: post.url,
    });
  }
  return {
    instance: postsDB,
    params: {
      tolerance: 1,
      limit: 20,
      boost: {
        title: 0.5,
        category: 0.2,
        date: 0.1,
      },
    },
  };
}
