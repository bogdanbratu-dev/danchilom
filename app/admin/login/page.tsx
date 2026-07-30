"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Crest } from "@/components/Crest";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Parolă greșită.");
        return;
      }
      router.push("/admin");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-ink px-4">
      <Crest size={72} priority />
      <h1 className="mt-6 text-center font-display text-2xl uppercase text-paper">
        Administrare site
      </h1>
      <p className="mt-1 text-center text-sm text-muted">AS Dan Chilom</p>

      <form onSubmit={handleSubmit} className="mt-8 w-full max-w-sm space-y-4">
        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-paper">
            Parolă
          </label>
          <input
            id="password"
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-lg border border-line bg-surface px-4 py-3 text-base text-paper focus-visible:border-brand-soft"
          />
        </div>
        {error ? <p className="text-sm text-brand-soft">{error}</p> : null}
        <button
          type="submit"
          disabled={loading || !password}
          className="w-full rounded-lg bg-brand px-4 py-3 text-base font-semibold text-white hover:bg-brand-soft disabled:opacity-60"
        >
          {loading ? "Se verifică…" : "Intră în cont"}
        </button>
      </form>
    </div>
  );
}
