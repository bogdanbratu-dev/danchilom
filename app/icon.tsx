import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getContent } from "@/lib/content";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/**
 * Favicon generat din blazon. Citește logo-ul din conținutul dinamic (local
 * sau Vercel Blob, dacă a fost schimbat din admin) și îl decupează circular —
 * aceeași idee ca `crest-clip` din UI, dar aici trebuie reprodusă manual
 * pentru că ImageResponse randează separat de CSS-ul paginii.
 */
export default async function Icon() {
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
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0c",
        }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            overflow: "hidden",
            display: "flex",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} alt="" width={30} height={30} style={{ objectFit: "cover" }} />
        </div>
      </div>
    ),
    size,
  );
}
