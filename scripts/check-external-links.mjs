// Finds external http(s) links referenced anywhere in app/ and lib/, and
// checks each one still resolves. Catches things like Google changing a
// support URL, or a linked resource going offline.
//
// Run with: npm run check:external-links
// Requires network access, this is meant for CI, not this sandbox.

import { readdirSync, readFileSync, statSync } from "fs";
import { join } from "path";

const ROOTS = ["app", "lib", "components"];
const URL_PATTERN = /https?:\/\/[^\s"'<>)]+/g;

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walk(full, files);
    } else if (/\.(js|jsx|mjs)$/.test(entry)) {
      files.push(full);
    }
  }
  return files;
}

const urls = new Set();

for (const root of ROOTS) {
  try {
    for (const file of walk(root)) {
      const content = readFileSync(file, "utf8");
      const matches = content.match(URL_PATTERN) || [];
      for (const url of matches) {
        // Skip template-literal interpolations like https://x.com/${slug}
        if (url.includes("${") || url.includes("`")) continue;
        // Strip trailing punctuation/quotes/backticks the regex sometimes grabs
        const cleaned = url.replace(/[,.;`'")]+$/, "");
        urls.add(cleaned);
      }
    }
  } catch {
    // root doesn't exist, skip
  }
}

// Skip font/CDN URLs meant to be fetched by the browser at request time,
// and schema.org, which is an identifier rather than a page to check.
const SKIP_PATTERNS = [
  /fonts\.googleapis\.com/,
  /fonts\.gstatic\.com/,
  /^https:\/\/schema\.org$/,
];

const toCheck = [...urls].filter((u) => !SKIP_PATTERNS.some((p) => p.test(u)));

console.log(`Checking ${toCheck.length} external link(s) found in the codebase...\n`);

let broken = 0;

for (const url of toCheck) {
  try {
    const res = await fetch(url, { method: "HEAD", redirect: "follow" });
    if (!res.ok) {
      console.log(`✗ ${res.status}  ${url}`);
      broken++;
    } else {
      console.log(`✓ ${res.status}  ${url}`);
    }
  } catch (err) {
    console.log(`✗ ERROR  ${url}  (${err.message})`);
    broken++;
  }
}

if (broken > 0) {
  console.log(`\n${broken} broken external link(s) found.`);
  process.exit(1);
} else {
  console.log(`\nAll external links resolve.`);
}
