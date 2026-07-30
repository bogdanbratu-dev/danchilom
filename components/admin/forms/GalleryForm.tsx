"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { GalleryPhoto } from "@/content/schema";
import { SaveBar, useSectionSave } from "@/components/admin/SectionEditor";

/**
 * Galeria are ~30 poze — o listă de acordeoane ar fi greu de folosit, așa că
 * aici e un grid de carduri: poza + text alternativ + șterge, plus un buton
 * care poate încărca mai multe poze deodată.
 */
export function GalleryForm({ initial }: { initial: GalleryPhoto[] }) {
  const [data, setData] = useState<GalleryPhoto[]>(initial);
  const { save, status, error } = useSectionSave("gallery");
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  async function handleFiles(files: FileList) {
    setUploading(true);
    setUploadError("");
    try {
      const uploaded: GalleryPhoto[] = [];
      for (const file of Array.from(files)) {
        const form = new FormData();
        form.append("file", file);
        form.append("folder", "gallery");
        const res = await fetch("/api/admin/upload", { method: "POST", body: form });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Încărcare eșuată.");
        uploaded.push({ src: json.url as string, alt: "" });
      }
      setData((d) => [...d, ...uploaded]);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Încărcare eșuată.");
    } finally {
      setUploading(false);
    }
  }

  function updateAlt(index: number, alt: string) {
    setData((d) => d.map((p, i) => (i === index ? { ...p, alt } : p)));
  }

  function remove(index: number) {
    setData((d) => d.filter((_, i) => i !== index));
  }

  function move(index: number, dir: -1 | 1) {
    setData((d) => {
      const target = index + dir;
      if (target < 0 || target >= d.length) return d;
      const copy = [...d];
      [copy[index], copy[target]] = [copy[target], copy[index]];
      return copy;
    });
  }

  return (
    <div>
      <h1 className="font-display text-3xl uppercase text-paper">Galerie foto</h1>
      <p className="mt-2 text-muted">
        Toate pozele din galeria publică a site-ului. Poți încărca poze noi, șterge, reordona și
        schimba descrierea fiecăreia.
      </p>

      <div className="mt-6">
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.length) void handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="rounded-lg border border-line bg-surface px-4 py-3 text-sm font-semibold text-paper hover:border-brand-soft disabled:opacity-60"
        >
          {uploading ? "Se încarcă…" : "+ Adaugă poze noi"}
        </button>
        {uploadError ? <p className="mt-2 text-xs text-brand-soft">{uploadError}</p> : null}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {data.map((photo, i) => (
          <div key={i} className="rounded-xl border border-line bg-surface p-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-surface-2">
              {photo.src ? (
                <Image
                  src={photo.src}
                  alt=""
                  fill
                  sizes="200px"
                  className="object-cover"
                  unoptimized={photo.src.startsWith("http")}
                />
              ) : null}
            </div>
            <input
              type="text"
              value={photo.alt}
              onChange={(e) => updateAlt(i, e.target.value)}
              placeholder="Descrierea pozei"
              className="mt-2 w-full rounded-md border border-line bg-surface-2 px-2 py-1.5 text-xs text-paper placeholder:text-muted/70 focus-visible:border-brand-soft"
            />
            <div className="mt-2 flex items-center justify-between">
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  className="rounded-md border border-line px-1.5 py-0.5 text-xs text-muted hover:text-paper disabled:opacity-30"
                  aria-label="Mută mai devreme"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => move(i, 1)}
                  disabled={i === data.length - 1}
                  className="rounded-md border border-line px-1.5 py-0.5 text-xs text-muted hover:text-paper disabled:opacity-30"
                  aria-label="Mută mai târziu"
                >
                  ↓
                </button>
              </div>
              <button
                type="button"
                onClick={() => remove(i)}
                className="rounded-md border border-line px-2 py-0.5 text-xs text-muted hover:border-brand hover:text-brand-soft"
              >
                Șterge
              </button>
            </div>
          </div>
        ))}
      </div>

      <SaveBar onSave={() => save(data)} status={status} error={error} />
    </div>
  );
}
