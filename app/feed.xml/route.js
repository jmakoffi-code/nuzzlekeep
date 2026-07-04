import { articles } from "@/lib/articles";

const SITE_URL = "https://snoutlypet.com";

function escapeXml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function parseUpdated(str) {
  const parsed = new Date(`1 ${str}`);
  return isNaN(parsed.getTime()) ? new Date(0) : parsed;
}

export async function GET() {
  const sorted = [...articles].sort(
    (a, b) => parseUpdated(b.updated) - parseUpdated(a.updated)
  );

  const items = sorted
    .map((a) => {
      const url = `${SITE_URL}/article/${a.slug}`;
      const pubDate = parseUpdated(a.updated).toUTCString();
      return `
    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(a.excerpt)}</description>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Snoutly — A Field Guide to Pet Care</title>
    <link>${SITE_URL}</link>
    <description>Clear, tested, step-by-step guides for dogs, cats, and small pets.</description>
    <language>en</language>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
