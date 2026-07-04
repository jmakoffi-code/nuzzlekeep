// Validates the content data layer for structural problems that would
// otherwise only surface as a broken page in production.
//
// Run with: npm run check:links
// Exits with code 1 if any problems are found, so this fails CI on a bad commit.

import { articles, categories } from "../lib/articles.js";

let errors = 0;

function fail(message) {
  console.error(`✗ ${message}`);
  errors++;
}

// 1. No duplicate article slugs
const slugCounts = {};
for (const a of articles) {
  slugCounts[a.slug] = (slugCounts[a.slug] || 0) + 1;
}
for (const [slug, count] of Object.entries(slugCounts)) {
  if (count > 1) fail(`Duplicate article slug "${slug}" appears ${count} times`);
}

// 2. No duplicate category slugs
const catCounts = {};
for (const c of categories) {
  catCounts[c.slug] = (catCounts[c.slug] || 0) + 1;
}
for (const [slug, count] of Object.entries(catCounts)) {
  if (count > 1) fail(`Duplicate category slug "${slug}" appears ${count} times`);
}

// 3. No duplicate entryNo (breaks the visual "№ 044" stamp system)
const entryCounts = {};
for (const a of articles) {
  if (!a.entryNo) continue;
  entryCounts[a.entryNo] = (entryCounts[a.entryNo] || 0) + 1;
}
for (const [entryNo, count] of Object.entries(entryCounts)) {
  if (count > 1) fail(`Duplicate entryNo "${entryNo}" appears ${count} times`);
}

// 4. Every article's category must exist in categories[]
const categorySlugs = new Set(categories.map((c) => c.slug));
for (const a of articles) {
  if (!categorySlugs.has(a.category)) {
    fail(`Article "${a.slug}" references unknown category "${a.category}"`);
  }
}

// 5. Every related-article slug must point to a real article
const articleSlugs = new Set(articles.map((a) => a.slug));
for (const a of articles) {
  for (const relatedSlug of a.related || []) {
    if (!articleSlugs.has(relatedSlug)) {
      fail(`Article "${a.slug}" has a related link to missing article "${relatedSlug}"`);
    }
  }
}

// 6. Every article needs the minimum fields to render without crashing
for (const a of articles) {
  if (!a.title) fail(`Article "${a.slug}" is missing a title`);
  if (!a.excerpt) fail(`Article "${a.slug}" is missing an excerpt (used in cards and meta description)`);
  if (!a.intro) fail(`Article "${a.slug}" is missing an intro`);
  if (!a.readTime) fail(`Article "${a.slug}" is missing readTime`);
  if (!a.stepList?.length && !a.sections?.length) {
    fail(`Article "${a.slug}" has neither stepList nor sections, the body will render empty`);
  }
}

if (errors > 0) {
  console.error(`\n${errors} problem(s) found in lib/articles.js`);
  process.exit(1);
} else {
  console.log(`✓ All ${articles.length} articles and ${categories.length} categories check out clean`);
}
