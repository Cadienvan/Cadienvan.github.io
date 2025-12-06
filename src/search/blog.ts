import { create, insert } from "@orama/orama";

// Definizione del tipo per i post del blog
interface BlogPost {
  frontmatter: {
    title: string;
    date: string;
    lang?: string;
  };
  rawContent: () => string;
  url: string;
}

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

  // Carica dinamicamente tutti i blog post italiani
  const italianPosts = import.meta.glob<BlogPost>("../pages/blog/*.md", { eager: true });
  // Carica dinamicamente tutti i blog post inglesi
  const englishPosts = import.meta.glob<BlogPost>("../pages/blog/en/*.md", { eager: true });

  // Inserisci i post italiani
  for (const path in italianPosts) {
    const post = italianPosts[path];
    const slug = path.replace("../pages/blog/", "").replace(".md", "");
    await insert(blogDB, {
      title: `Blog: ${post.frontmatter.title} 🇮🇹`,
      date: post.frontmatter.date,
      content: post.rawContent(),
      url: `/blog/${slug}`,
    });
  }

  // Inserisci i post inglesi
  for (const path in englishPosts) {
    const post = englishPosts[path];
    const slug = path.replace("../pages/blog/en/", "").replace(".md", "");
    await insert(blogDB, {
      title: `Blog: ${post.frontmatter.title} 🇬🇧`,
      date: post.frontmatter.date,
      content: post.rawContent(),
      url: `/blog/en/${slug}`,
    });
  }

  return {
    instance: blogDB,
    params: {
      tolerance: 3,
      limit: 5,
      boost: {
        title: 5,
        url: 1,
        content: 0.1,
        date: 0.1,
      },
    },
  };
}
