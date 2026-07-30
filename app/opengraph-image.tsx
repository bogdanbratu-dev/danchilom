import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getContent } from "@/lib/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "AS Dan Chilom — școală de fotbal pentru copii în București";

/**
 * Imaginea care apare când site-ul e distribuit pe Facebook sau WhatsApp.
 * Blazonul e încorporat ca data URI — ImageResponse nu poate încărca imagini
 * prin URL relativ. Dacă logo-ul a fost schimbat din admin, e stocat pe
 * Vercel Blob (URL absolut) și se preia prin fetch; altfel se citește local.
 */
export default async function OpengraphImage() {
  const { site } = await getContent();

  let logoBuffer: Buffer;
  let logoContentType = "image/jpeg";
  if (site.logo.startsWith("http")) {
    const res = await fetch(site.logo);
    logoBuffer = Buffer.from(await res.arrayBuffer());
    logoContentType = res.headers.get("content-type") || logoContentType;
  } else {
    logoBuffer = await readFile(path.join(process.cwd(), "public", site.logo.replace(/^\//, "")));
  }
  const logoSrc = `data:${logoContentType};base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a0c 0%, #1c1c22 55%, #7a0043 100%)",
          padding: "72px 80px",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            alt=""
            width={168}
            height={168}
            style={{ borderRadius: 999, objectFit: "cover" }}
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 76,
                fontWeight: 700,
                letterSpacing: -1,
                lineHeight: 1.05,
              }}
            >
              AS DAN CHILOM
            </div>
            <div style={{ display: "flex", fontSize: 30, color: "#ff4fb0", marginTop: 10 }}>
              {`Școală de fotbal pentru copii · București · din ${site.foundedYear}`}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", height: 6, background: "#e6007e", margin: "56px 0 40px" }} />

        <div style={{ fontSize: 40, lineHeight: 1.25, color: "rgba(255,255,255,0.92)", display: "flex" }}>
          {site.tagline}
        </div>
      </div>
    ),
    size,
  );
}
