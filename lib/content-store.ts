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
import { mkdir, readdir, readFile, stat, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Content } from "@/content/schema";

const CONTENT_PATHNAME = "content/data.json";
const LOCAL_DATA_FILE = path.join(process.cwd(), "content", "data.json");
const LOCAL_UPLOADS_DIR = path.join(process.cwd(), "public", "img", "uploads");

const BACKUP_PREFIX = "content/backups/";
const LOCAL_BACKUPS_DIR = path.join(process.cwd(), "content", "backups");
const MAX_BACKUPS = 30;

function hasBlob() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);
}

export async function readStoredContent(): Promise<Content | null> {
  if (hasBlob()) {
    const { list } = await import("@vercel/blob");
    const { blobs } = await list({ prefix: CONTENT_PATHNAME, limit: 1 });
    const entry = blobs.find((b) => b.pathname === CONTENT_PATHNAME);
    if (!entry) return null;
    // Vercel Blob cachează conținutul la acel URL până la 60s după o suprascriere.
    // Nu ne putem baza pe `entry.uploadedAt` (vine tot din list(), care poate
    // rămâne puțin în urmă) — folosim ceasul de sistem, mereu unic, ca fiecare
    // citire să fie un cache MISS garantat și modificările din admin să apară
    // imediat.
    const freshUrl = `${entry.url}?v=${Date.now()}`;
    const res = await fetch(freshUrl, { cache: "no-store" });
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
  await backupCurrentContent();

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

export type ContentBackup = { id: string; savedAt: string };

function backupId() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

function isValidBackupId(id: string) {
  return /^[0-9A-Za-z_-]+$/.test(id);
}

/** Salvează starea curentă ca o copie de siguranță, înainte de a fi suprascrisă. */
async function backupCurrentContent(): Promise<void> {
  const current = await readStoredContent();
  if (!current) return;

  const id = backupId();
  const json = JSON.stringify(current, null, 2);

  if (hasBlob()) {
    const { put } = await import("@vercel/blob");
    await put(`${BACKUP_PREFIX}${id}.json`, json, {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
    });
  } else {
    await mkdir(LOCAL_BACKUPS_DIR, { recursive: true });
    await writeFile(path.join(LOCAL_BACKUPS_DIR, `${id}.json`), json, "utf-8");
  }

  await pruneOldBackups();
}

/** Creează manual o copie de siguranță a conținutului curent, la cerere. */
export async function createContentBackup(): Promise<void> {
  await backupCurrentContent();
}

export async function listContentBackups(): Promise<ContentBackup[]> {
  if (hasBlob()) {
    const { list } = await import("@vercel/blob");
    const { blobs } = await list({ prefix: BACKUP_PREFIX, limit: 1000 });
    return blobs
      .map((b) => ({
        id: b.pathname.slice(BACKUP_PREFIX.length, -".json".length),
        savedAt: new Date(b.uploadedAt).toISOString(),
      }))
      .sort((a, b) => (a.savedAt < b.savedAt ? 1 : -1));
  }

  try {
    const files = await readdir(LOCAL_BACKUPS_DIR);
    const entries = await Promise.all(
      files
        .filter((f) => f.endsWith(".json"))
        .map(async (f) => {
          const st = await stat(path.join(LOCAL_BACKUPS_DIR, f));
          return { id: f.slice(0, -".json".length), savedAt: st.mtime.toISOString() };
        }),
    );
    return entries.sort((a, b) => (a.savedAt < b.savedAt ? 1 : -1));
  } catch {
    return [];
  }
}

async function pruneOldBackups(): Promise<void> {
  const backups = await listContentBackups();
  const excess = backups.slice(MAX_BACKUPS);
  if (excess.length === 0) return;

  if (hasBlob()) {
    const { del } = await import("@vercel/blob");
    await del(excess.map((b) => `${BACKUP_PREFIX}${b.id}.json`));
  } else {
    await Promise.all(
      excess.map((b) => unlink(path.join(LOCAL_BACKUPS_DIR, `${b.id}.json`)).catch(() => {})),
    );
  }
}

export async function readContentBackup(id: string): Promise<Content | null> {
  if (!isValidBackupId(id)) return null;

  if (hasBlob()) {
    const { list } = await import("@vercel/blob");
    const { blobs } = await list({ prefix: `${BACKUP_PREFIX}${id}.json`, limit: 1 });
    const entry = blobs[0];
    if (!entry) return null;
    const res = await fetch(`${entry.url}?v=${Date.now()}`, { cache: "no-store" });
    if (!res.ok) return null;
    return (await res.json()) as Content;
  }

  try {
    const raw = await readFile(path.join(LOCAL_BACKUPS_DIR, `${id}.json`), "utf-8");
    return JSON.parse(raw) as Content;
  } catch {
    return null;
  }
}

/** Restaurează conținutul dintr-o copie de siguranță. Starea curentă e la rândul ei salvată înainte, deci restaurarea e reversibilă. */
export async function restoreContentBackup(id: string): Promise<boolean> {
  const backup = await readContentBackup(id);
  if (!backup) return false;
  await writeStoredContent(backup);
  return true;
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
