"use client";

import { useCallback, useEffect, useState } from "react";
import type { ContentBackup } from "@/lib/content-store";

function formatSavedAt(iso: string) {
  return new Date(iso).toLocaleString("ro-RO", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function BackupsPanel() {
  const [backups, setBackups] = useState<ContentBackup[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [savingBackup, setSavingBackup] = useState(false);

  const load = useCallback(async () => {
    setError(null);
    try {
      const res = await fetch("/api/admin/backups");
      const body = await res.json();
      if (!res.ok) throw new Error(body.error ?? "Eroare necunoscută.");
      setBackups(body.backups);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Eroare necunoscută.");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleBackupNow() {
    setSavingBackup(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/backups", { method: "POST" });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error ?? "Eroare necunoscută.");
      setMessage("Copie de siguranță salvată.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Eroare necunoscută.");
    } finally {
      setSavingBackup(false);
    }
  }

  async function handleRestore(id: string) {
    if (
      !window.confirm(
        "Sigur restaurezi conținutul site-ului la această versiune? Starea actuală va fi păstrată tot ca o copie de siguranță, deci poți reveni oricând.",
      )
    ) {
      return;
    }
    setBusyId(id);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/backups/restore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.error ?? "Eroare necunoscută.");
      setMessage("Conținutul a fost restaurat.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Eroare necunoscută.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleBackupNow}
        disabled={savingBackup}
        className="rounded-full bg-brand px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-soft disabled:opacity-60"
      >
        {savingBackup ? "Se salvează..." : "Salvează o copie acum"}
      </button>

      {message && <p className="mt-4 text-sm text-brand-soft">{message}</p>}
      {error && (
        <p className="mt-4 rounded-xl border border-line bg-surface p-4 text-sm text-muted">{error}</p>
      )}

      {backups === null && !error && <p className="mt-8 text-muted">Se încarcă...</p>}

      {backups && backups.length === 0 && (
        <p className="mt-8 text-muted">
          Nu există încă nicio copie de siguranță — se creează automat la prima salvare din admin.
        </p>
      )}

      {backups && backups.length > 0 && (
        <ul className="mt-8 divide-y divide-line rounded-xl border border-line bg-surface">
          {backups.map((b) => (
            <li key={b.id} className="flex items-center justify-between gap-4 px-6 py-4">
              <span className="text-paper">{formatSavedAt(b.savedAt)}</span>
              <button
                type="button"
                onClick={() => handleRestore(b.id)}
                disabled={busyId !== null}
                className="shrink-0 rounded-full border border-line px-4 py-2 text-sm font-medium text-muted transition-colors hover:border-brand hover:text-paper disabled:opacity-60"
              >
                {busyId === b.id ? "Se restaurează..." : "Restaurează"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
