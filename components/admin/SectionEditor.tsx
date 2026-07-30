"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { SectionKey } from "@/content/schema";

/**
 * Fiecare pagină de admin ține propria stare a datelor editate și le trimite
 * aici pentru salvare. Un singur loc care știe cum vorbește cu API-ul —
 * paginile de secțiune doar dau `section` + `data` curente.
 */
export function useSectionSave(section: SectionKey) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState("");

  async function save(data: unknown) {
    setStatus("saving");
    setError("");
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ section, data }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Salvarea a eșuat.");
      setStatus("saved");
      router.refresh();
      setTimeout(() => setStatus("idle"), 2500);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Salvarea a eșuat.");
    }
  }

  return { save, status, error };
}

export function SaveBar({
  onSave,
  status,
  error,
}: {
  onSave: () => void;
  status: "idle" | "saving" | "saved" | "error";
  error?: string;
}) {
  return (
    <div className="sticky bottom-0 left-0 right-0 z-20 -mx-4 mt-8 border-t border-line bg-ink/95 px-4 py-4 backdrop-blur sm:mx-0 sm:rounded-xl sm:border">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm">
          {status === "saving" && <span className="text-muted">Se salvează…</span>}
          {status === "saved" && <span className="text-emerald-400">Salvat! Site-ul e deja actualizat.</span>}
          {status === "error" && <span className="text-brand-soft">{error || "Eroare la salvare."}</span>}
          {status === "idle" && <span className="text-muted">Modificările se aplică imediat pe site.</span>}
        </p>
        <button
          type="button"
          onClick={onSave}
          disabled={status === "saving"}
          className="rounded-lg bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-soft disabled:opacity-60"
        >
          Salvează modificările
        </button>
      </div>
    </div>
  );
}
