import { articles, categories } from "@/lib/articles";

export default function sitemap() {
  const base = "https://snoutlypet.com";

  const staticPages = [
    { url: `${base}/`, priority: 1 },
    { url: `${base}/about`, priority: 0.5 },
    { url: `${base}/privacy`, priority: 0.3 },
    { url: `${base}/contact`, priority: 0.3 },
    { url: `${base}/editorial-guidelines`, priority: 0.3 },
  ].map((p) => ({ ...p, lastModified: new Date() }));

  const categoryPages = categories.map((c) => ({
    url: `${base}/category/${c.slug}`,
    lastModified: new Date(),
    priority: 0.7,
  }));

  const articlePages = articles.map((a) => ({
    url: `${base}/article/${a.slug}`,
    lastModified: new Date(),
    priority: 0.8,
  }));

  return [...staticPages, ...categoryPages, ...articlePages];
}
