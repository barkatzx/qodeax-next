import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export const alt =
  "Qodeax — software engineering agency for custom software, SaaS, AI, and automation";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f5f6f5",
          padding: "64px",
          fontFamily: "sans-serif",
          color: "#171a19",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "#3ade96",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "30px",
              fontWeight: 800,
              color: "#151b19",
            }}
          >
            Q
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "34px", fontWeight: 800, letterSpacing: "-1px" }}>
              Qodeax
            </span>
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "4px",
                color: "#737b76",
              }}
            >
              SOFTWARE ENGINEERING
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <span
            style={{
              fontSize: "20px",
              fontWeight: 600,
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#2bc47f",
            }}
          >
            Software engineering agency
          </span>
          <span
            style={{
              fontSize: "72px",
              lineHeight: 1.02,
              fontWeight: 800,
              letterSpacing: "-3px",
              maxWidth: "900px",
            }}
          >
            Engineering ideas into reliable software.
          </span>
          <span style={{ fontSize: "24px", lineHeight: 1.4, color: "#737b76", maxWidth: "800px" }}>
            Custom software, SaaS platforms, AI products, and business automation.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #e7eae8",
            paddingTop: "24px",
            fontSize: "18px",
            color: "#737b76",
          }}
        >
          <span>qodeax.com</span>
          <span>QDMS · Projects · Blog</span>
        </div>
      </div>
    ),
    size,
  );
}
