import { search } from "@orama/orama";
import getPublicSpeakingDB from "./public-speaking";
import getPostsDB from "./posts";
import getBlogDB from "./blog";

export const publicSpeakingDB = await getPublicSpeakingDB();
export const postsDB = await getPostsDB();
export const blogDB = await getBlogDB();

export default async function (term: string) {
  const result = [];

  for (let db of [publicSpeakingDB, postsDB, blogDB]) {
    result.push({
      id: db.instance.id,
      output: search(db.instance, {
        term,
        ...db.params,
      }),
    });
  }

  // wait for all output and then get the output.hits
  return (await Promise.all(result.map(r => r.output)))
    .map(r => r.hits)
    .flat()
    .sort((a, b) => {
      return b.score - a.score;
    });
}
