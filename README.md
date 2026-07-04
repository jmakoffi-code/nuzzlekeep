# Snoutly

A field-guide-styled pet care content site, built with Next.js 16 (App Router).

## Structure

- lib/articles.js -- all content lives here: categories and articles as plain JS objects.
  Add a new article by adding an object to the articles array with a unique slug.
  Add a new category by adding an entry to categories. Routes generate automatically.
- app/page.js -- homepage
- app/category/[slug]/page.js -- category listing (dynamic route)
- app/article/[slug]/page.js -- full article template (dynamic route)
- app/search/page.js -- basic keyword search across title, excerpt, and tag
- components/ -- Header, Footer, SpecCard (article preview card), AdSlot (ad placeholder)
- app/globals.css -- the whole design system: colors, type, layout, ad slot styling

## Running locally

    npm install
    npm run dev

Visit http://localhost:3000

## Building for production

    npm run build
    npm run start

## Deploying

Standard Next.js app, ready to deploy on Vercel: push to a Git repo, import the repo
in Vercel, and it builds automatically. No environment variables needed yet.

## Adding AdSense

Ad placements use the AdSlot component in three sizes: leaderboard, in-content, and
sidebar. Once your AdSense account is approved, replace the placeholder div in
components/AdSlot.js with your actual ad unit code.

## Adding real content

Every article in lib/articles.js follows the same shape: intro, optional "what you'll
need", either numbered steps (stepList) or reference sections (sections), an optional
callout box, an optional extra section, optional quickFacts for the sidebar, and FAQs.
Not every field is required -- run `npm run check:links` after adding one to confirm
nothing's missing or misspelled before it reaches CI.

## Automated maintenance

This repo runs its own checks once it's pushed to GitHub, no manual monitoring
needed for the basics:

- **On every push and PR** (`.github/workflows/ci.yml`): validates that every
  article's slug, category, and related-article links actually resolve, then
  builds the site. A broken link or typo'd slug fails the build instead of
  reaching production.
- **Every Monday** (`.github/workflows/weekly-maintenance.yml`): checks which
  articles haven't been updated in 6+ months and whether any external links
  (Google Ads Settings, aboutads.info, the site's own domain) are broken. If
  either turns something up, it opens or updates a GitHub issue labeled
  `maintenance` automatically, so it shows up without anyone checking.
- **Weekly dependency updates** (`.github/dependabot.yml`): opens a PR when
  Next.js, React, or ESLint have updates, grouped into one PR for the core
  framework versions so they don't need reviewing one at a time.

Run any of these locally:

    npm run check:links          # data integrity: slugs, categories, related links
    npm run check:freshness      # which articles are due for a review
    npm run check:external-links # do the external links in the codebase still work
    npm run validate             # check:links + build, what CI runs on every push

### What this does and doesn't cover

It catches broken internal data (typos in slugs, orphaned related-article
links, missing required fields) and flags content that's aging, before either
one reaches a live visitor. It does not replace an editor: it can't tell you
if an article's advice is still accurate, only that the article renders and
links correctly. Reviewing the content itself, and writing new articles,
stays a human job.

