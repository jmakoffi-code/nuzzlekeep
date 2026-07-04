import { readFileSync } from "fs";
import { join } from "path";

// Loaded once at module init from the @fontsource package files bundled in
// node_modules, no network fetch needed at build time. This is more
// reliable than fetching from Google Fonts during a build, since it works
// identically offline, in CI, and in production.
const zillaSlabBold = readFileSync(
  join(process.cwd(), "node_modules/@fontsource/zilla-slab/files/zilla-slab-latin-700-normal.woff")
);
const plexMonoSemibold = readFileSync(
  join(process.cwd(), "node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-600-normal.woff")
);

export function loadOgFonts() {
  return [
    { name: "Zilla Slab", data: zillaSlabBold, weight: 700, style: "normal" },
    { name: "IBM Plex Mono", data: plexMonoSemibold, weight: 600, style: "normal" },
  ];
}

