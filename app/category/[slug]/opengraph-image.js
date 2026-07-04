import { ImageResponse } from "next/og";
import { categories, getCategoryBySlug, getArticlesByCategory } from "@/lib/articles";
import { loadOgFonts } from "@/lib/og-font";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

const INK = "#22301F";
const PAPER = "#E9E1CC";
const SIENNA = "#B5502E";
const SLATE = "#5C6B5E";

export default async function Image({ params }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  const count = category ? getArticlesByCategory(category.slug).length : 0;

  const title = category?.label || "Nuzzlekeep";

  let fonts = [];
  try {
    fonts = loadOgFonts();
  } catch {
    fonts = [];
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "72px 88px",
          backgroundColor: PAPER,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: 28 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: `3px solid ${SIENNA}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              color: SIENNA,
              fontFamily: fonts.length ? "IBM Plex Mono" : "monospace",
              marginRight: 14,
            }}
          >
            N
          </div>
          <div style={{ fontSize: 26, color: INK, fontFamily: fonts.length ? "Zilla Slab" : "serif", fontWeight: 700 }}>
            Nuzzlekeep
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: fonts.length ? "IBM Plex Mono" : "monospace",
            fontSize: 20,
            color: SIENNA,
            letterSpacing: 2,
            marginBottom: 16,
          }}
        >
          CATEGORY · {count} {count === 1 ? "ENTRY" : "ENTRIES"}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 64,
            color: INK,
            fontFamily: fonts.length ? "Zilla Slab" : "serif",
            fontWeight: 700,
            lineHeight: 1.1,
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: fonts.length ? "IBM Plex Mono" : "monospace",
            fontSize: 20,
            color: SLATE,
            marginTop: 28,
          }}
        >
          nuzzlekeep.com
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
