import { ImageResponse } from "next/og";
import { articles, getArticleBySlug, getCategoryBySlug } from "@/lib/articles";
import { loadOgFonts } from "@/lib/og-font";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

const INK = "#22301F";
const PAPER = "#E9E1CC";
const CARD = "#F8F3E5";
const SIENNA = "#B5502E";
const MUSTARD = "#C89B3C";
const SLATE = "#5C6B5E";

export default async function Image({ params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  const category = article ? getCategoryBySlug(article.category) : null;

  const title = article?.title || "Nuzzlekeep";
  const tag = article?.tag || category?.label || "Pet Care";
  const entryNo = article?.entryNo;
  const meta = [
    article?.steps ? `${article.steps} steps` : null,
    article?.readTime,
    article?.difficulty ? `Difficulty: ${article.difficulty}` : null,
  ]
    .filter(Boolean)
    .join("   ·   ");

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
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: PAPER,
          fontFamily: fonts.length ? "Zilla Slab" : "serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                border: `3px solid ${SIENNA}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                color: SIENNA,
                fontFamily: fonts.length ? "IBM Plex Mono" : "monospace",
                marginRight: 16,
              }}
            >
              N
            </div>
            <div style={{ fontSize: 32, color: INK, fontWeight: 700 }}>Nuzzlekeep</div>
          </div>
          {entryNo ? (
            <div
              style={{
                display: "flex",
                fontFamily: fonts.length ? "IBM Plex Mono" : "monospace",
                fontSize: 20,
                color: SIENNA,
                border: `2px solid ${SIENNA}`,
                borderRadius: 999,
                padding: "8px 22px",
              }}
            >
              № {entryNo}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: CARD,
            border: `3px solid ${INK}`,
            padding: "48px 56px",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              position: "absolute",
              top: -22,
              left: 48,
              backgroundColor: MUSTARD,
              border: `3px solid ${INK}`,
              padding: "6px 20px",
              fontFamily: fonts.length ? "IBM Plex Mono" : "monospace",
              fontSize: 18,
              color: INK,
              letterSpacing: 2,
            }}
          >
            {tag.toUpperCase()}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 50 ? 48 : 58,
              color: INK,
              fontWeight: 700,
              lineHeight: 1.15,
              marginTop: 12,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: fonts.length ? "IBM Plex Mono" : "monospace",
            fontSize: 20,
            color: SLATE,
          }}
        >
          <div style={{ display: "flex" }}>{meta}</div>
          <div style={{ display: "flex" }}>nuzzlekeep.com</div>
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
