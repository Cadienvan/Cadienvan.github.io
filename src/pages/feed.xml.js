import rss from '@astrojs/rss';

const blogPosts = (import.meta.glob('./blog/en/*.md', { eager: true }))

export function GET(context) {
  return rss({
    // `<title>` field in output xml
    title: 'Michael Di Prisco',
    // `<description>` field in output xml
    description: 'Tech Lead / Software Architect.',
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#site
    site: context.site,
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: Object.values(blogPosts).map((post) => ({
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      link: post.url,
      pubDate: post.frontmatter.date,
    })).sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate)),
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
  });
}