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
        {/* Lens mark + wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div style={{ position: "relative", width: 96, height: 96, display: "flex" }}>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 18,
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "#E01A1A",
                opacity: 0.92,
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "#2B3A9E",
                opacity: 0.92,
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "#6CC520",
                opacity: 0.92,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: 30,
                left: 38,
                fontSize: 40,
                fontWeight: 900,
                color: "#FFFFFF",
              }}
            >
              B
            </div>
          </div>
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
