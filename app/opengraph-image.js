import { ImageResponse } from "next/og";
import { loadOgFonts } from "@/lib/og-font";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#22301F";
const PAPER = "#E9E1CC";
const SIENNA = "#B5502E";
const SLATE = "#5C6B5E";

export default async function Image() {
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
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: PAPER,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", marginBottom: 24 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              border: `4px solid ${SIENNA}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              color: SIENNA,
              fontFamily: fonts.length ? "IBM Plex Mono" : "monospace",
              marginRight: 20,
            }}
          >
            N
          </div>
          <div style={{ fontSize: 76, color: INK, fontFamily: fonts.length ? "Zilla Slab" : "serif", fontWeight: 700 }}>
            Nuzzlekeep
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: SLATE,
            fontFamily: fonts.length ? "IBM Plex Mono" : "monospace",
            letterSpacing: 1,
          }}
        >
          A field guide to pet care
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
