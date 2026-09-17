import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = `${SITE.name} — ${SITE.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Branded Open Graph image: void-black canvas, RGB lens mark, wordmark, tagline. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0A0A",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        {/* Brand mark + wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`${SITE.url}/brand/logo/icon_on_black.png`}
            width={104}
            height={96}
            alt=""
          />
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 14,
              fontSize: 44,
              fontWeight: 900,
              letterSpacing: 4,
            }}
          >
            <span style={{ color: "#888888" }}>RENDERBAR</span>
            <span style={{ color: "#555555" }}>STUDIOS</span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 900,
              color: "#F5F4F2",
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 980,
            }}
          >
            Jacksonville Drone Documentation & Event Livestreaming
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 34,
              fontWeight: 800,
              color: "#E01A1A",
              letterSpacing: 2,
            }}
          >
            Motion. Story. Vision.
          </div>
        </div>

        {/* Footer line */}
        <div style={{ display: "flex", fontSize: 26, color: "#888888" }}>
          FAA Part 107 Licensed · Jacksonville, FL · Fully Insured
        </div>
      </div>
    ),
    { ...size },
  );
}
