// Reports which articles haven't been reviewed in a while. This never fails
// the build, it's informational: a nudge to revisit older content, not a
// broken-site signal.
//
// Run with: npm run check:freshness

import { articles } from "../lib/articles.js";

const STALE_AFTER_MONTHS = 6;

function parseUpdated(str) {
  // Expects "MMM YYYY", e.g. "Jun 2026"
  const parsed = new Date(`1 ${str}`);
  return isNaN(parsed.getTime()) ? null : parsed;
}

function monthsBetween(a, b) {
  return (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth());
}

const now = new Date();
const stale = [];
const unparseable = [];

for (const article of articles) {
  const updated = parseUpdated(article.updated);
  if (!updated) {
    unparseable.push(article);
    continue;
  }
  const age = monthsBetween(updated, now);
  if (age >= STALE_AFTER_MONTHS) {
    stale.push({ article, age });
  }
}

stale.sort((a, b) => b.age - a.age);

console.log(`Content freshness report — ${articles.length} articles, flagging anything unreviewed for ${STALE_AFTER_MONTHS}+ months\n`);

if (stale.length === 0) {
  console.log("Nothing is due for review yet.");
} else {
  for (const { article, age } of stale) {
    console.log(`  ${age} mo  №${article.entryNo || "—"}  ${article.title}  (${article.slug})`);
  }
  console.log(`\n${stale.length} article(s) due for a review pass.`);
}

if (unparseable.length > 0) {
  console.log(`\nCouldn't parse the "updated" date on ${unparseable.length} article(s):`);
  for (const a of unparseable) {
    console.log(`  ${a.slug} — updated: "${a.updated}"`);
  }
}
