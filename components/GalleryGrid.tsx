"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryPhoto } from "@/content/schema";
import { IconClose } from "./Icons";

export function GalleryGrid({ photos }: { photos: GalleryPhoto[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // Reținem butonul de pe care s-a deschis lightbox-ul, ca să redăm focusul la închidere.
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  const closeButton = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    setOpenIndex(null);
    lastTrigger.current?.focus();
  }, []);

  const step = useCallback(
    (delta: number) => {
      setOpenIndex((i) => (i === null ? i : (i + delta + photos.length) % photos.length));
    },
    [photos.length],
  );

  useEffect(() => {
    if (openIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };

    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [openIndex, close, step]);

  const active = openIndex === null ? null : photos[openIndex];

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {photos.map((photo, i) => (
          <li key={photo.src}>
            <button
              type="button"
              onClick={(e) => {
                lastTrigger.current = e.currentTarget;
                setOpenIndex(i);
              }}
              className="relative block aspect-[4/5] w-full overflow-hidden rounded-lg bg-surface-2"
              aria-label={`Deschide fotografia: ${photo.alt}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 23vw, (min-width: 640px) 31vw, 46vw"
                loading={i < 8 ? "eager" : "lazy"}
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </button>
          </li>
        ))}
      </ul>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Vizualizare fotografie"
          className="fixed inset-0 z-[70] flex flex-col bg-ink/95 backdrop-blur-sm"
          onClick={close}
        >
          <div className="flex items-center justify-between gap-4 px-5 py-4">
            <p className="text-xs uppercase tracking-[0.16em] text-muted">
              {(openIndex ?? 0) + 1} / {photos.length}
            </p>
            <button
              ref={closeButton}
              type="button"
              onClick={close}
              aria-label="Închide fotografia"
              className="grid size-11 place-items-center rounded-full border border-line transition-colors hover:border-brand hover:text-brand-soft"
            >
              <IconClose className="size-5" />
            </button>
          </div>

          <div
            className="relative flex-1 px-4 pb-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={active.src}
              src={active.src}
              alt={active.alt}
              fill
              sizes="100vw"
              className="animate-rise object-contain"
            />
          </div>

          <div
            className="flex items-center justify-between gap-4 px-5 pb-6 pt-2"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => step(-1)}
              className="min-h-11 rounded-full border border-line px-6 text-xs font-bold uppercase tracking-wide transition-colors hover:border-brand hover:text-brand-soft"
            >
              Înapoi
            </button>
            <p className="hidden max-w-md text-center text-xs text-muted sm:block">{active.alt}</p>
            <button
              type="button"
              onClick={() => step(1)}
              className="min-h-11 rounded-full border border-line px-6 text-xs font-bold uppercase tracking-wide transition-colors hover:border-brand hover:text-brand-soft"
            >
              Înainte
            </button>
          </div>
        </div>
      )}
    </>
  );
}
