/**
 * Strat de stocare pentru conținutul editabil din admin.
 *
 * Pe Vercel (producție), conținutul și pozele urcate din admin se salvează în
 * Vercel Blob — sistemul de fișiere e efemer/needitabil acolo. Proiectele Blob
 * noi (create direct din dashboard) folosesc autentificare OIDC: nu primesc
 * `BLOB_READ_WRITE_TOKEN`, ci `BLOB_STORE_ID` + `VERCEL_OIDC_TOKEN` (injectat
 * automat de Vercel la runtime și reînnoit singur) — `@vercel/blob` le
 * folosește automat pe acestea dacă există, fără cod suplimentar. De-asta
 * `hasBlob()` verifică oricare dintre cele două variabile, nu doar tokenul
 * vechi. Local, fără niciuna, se scrie direct pe disc, în `content/data.json`
 * și `public/img/uploads/`, ca dezvoltarea și testarea admin-ului să meargă fără
 * niciun cont sau configurare — la fel ca fallback-ul de la formularul de
 * înscriere (vezi app/api/inscriere/route.ts).
 */
import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Content } from "@/content/schema";

const CONTENT_PATHNAME = "content/data.json";
const LOCAL_DATA_FILE = path.join(process.cwd(), "content", "data.json");
const LOCAL_UPLOADS_DIR = path.join(process.cwd(), "public", "img", "uploads");

function hasBlob() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

export async function readStoredContent(): Promise<Content | null> {
  if (hasBlob()) {
    const { list } = await import("@vercel/blob");
    const { blobs } = await list({ prefix: CONTENT_PATHNAME, limit: 1 });
    const entry = blobs.find((b) => b.pathname === CONTENT_PATHNAME);
    if (!entry) return null;
    const res = await fetch(entry.url, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as Content;
  }

  try {
    const raw = await readFile(LOCAL_DATA_FILE, "utf-8");
    return JSON.parse(raw) as Content;
  } catch {
    return null;
  }
}

export async function writeStoredContent(content: Content): Promise<void> {
  const json = JSON.stringify(content, null, 2);

  if (hasBlob()) {
    const { put } = await import("@vercel/blob");
    await put(CONTENT_PATHNAME, json, {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    return;
  }

  await mkdir(path.dirname(LOCAL_DATA_FILE), { recursive: true });
  await writeFile(LOCAL_DATA_FILE, json, "utf-8");
}

function sanitizeFilename(name: string) {
  const ext = path.extname(name).toLowerCase().replace(/[^a-z0-9.]/g, "");
  const base = path
    .basename(name, path.extname(name))
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return `${base || "poza"}${ext || ".jpg"}`;
}

/** Urcă o poză și întoarce URL-ul/calea publică sub care va fi servită. */
export async function uploadImage(
  file: Buffer,
  originalName: string,
  contentType: string,
  folder: "gallery" | "staff" | "brand" = "gallery",
): Promise<string> {
  const safeName = sanitizeFilename(originalName);
  const key = `${folder}/${randomUUID()}-${safeName}`;

  if (hasBlob()) {
    const { put } = await import("@vercel/blob");
    const { url } = await put(key, file, {
      access: "public",
      contentType,
      addRandomSuffix: false,
    });
    return url;
  }

  await mkdir(LOCAL_UPLOADS_DIR, { recursive: true });
  const localName = `${randomUUID()}-${safeName}`;
  await writeFile(path.join(LOCAL_UPLOADS_DIR, localName), file);
  return `/img/uploads/${localName}`;
}
