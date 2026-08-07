"use client";

import { useEffect, useState } from "react";
import type { TrafficReport } from "@/lib/ga-report";

const RANGES = [
  { days: 7, label: "7 zile" },
  { days: 28, label: "28 zile" },
  { days: 90, label: "90 zile" },
];

export function AnalyticsDashboard() {
  const [days, setDays] = useState(28);
  const [report, setReport] = useState<TrafficReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`/api/admin/analytics?days=${days}`)
      .then(async (res) => {
        const body = await res.json();
        if (!res.ok) throw new Error(body.error ?? "Eroare necunoscută.");
        return body as TrafficReport;
      })
      .then((data) => {
        if (!cancelled) setReport(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "Eroare necunoscută.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [days]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {RANGES.map((r) => (
          <button
            key={r.days}
            type="button"
            onClick={() => setDays(r.days)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              days === r.days
                ? "bg-brand text-white"
                : "border border-line text-muted hover:border-brand hover:text-paper"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {loading && <p className="mt-8 text-muted">Se încarcă...</p>}

      {!loading && error && (
        <p className="mt-8 rounded-xl border border-line bg-surface p-6 text-muted">{error}</p>
      )}

      {!loading && report && (
        <div className="mt-8 space-y-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <KpiCard label="Vizitatori unici" value={report.totals.users} />
            <KpiCard label="Sesiuni" value={report.totals.sessions} />
            <KpiCard label="Pagini văzute" value={report.totals.pageViews} />
          </div>

          <div className="rounded-xl border border-line bg-surface p-6">
            <h2 className="font-display text-lg uppercase text-paper">Vizitatori pe zile</h2>
            <DayChart data={report.byDay} />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <BreakdownTable title="Țară" rows={report.byCountry} />
            <BreakdownTable title="Oraș" rows={report.byCity} />
          </div>
        </div>
      )}
    </div>
  );
}

function KpiCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-6">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-2 font-display text-3xl text-paper">{value.toLocaleString("ro-RO")}</p>
    </div>
  );
}

function DayChart({ data }: { data: { date: string; users: number }[] }) {
  if (data.length === 0) {
    return <p className="mt-4 text-muted">Nu există date în această perioadă.</p>;
  }

  const max = Math.max(1, ...data.map((d) => d.users));

  return (
    <div className="mt-6 flex h-48 items-end gap-1.5 overflow-x-auto">
      {data.map((d) => (
        <div key={d.date} className="flex min-w-[28px] flex-1 flex-col items-center gap-2">
          <div className="flex h-40 w-full items-end">
            <div
              className="w-full rounded-t bg-brand transition-all"
              style={{ height: `${Math.max(2, (d.users / max) * 100)}%` }}
              title={`${d.date}: ${d.users} vizitatori`}
            />
          </div>
          <span className="text-[10px] text-muted">{d.date}</span>
        </div>
      ))}
    </div>
  );
}

function BreakdownTable({ title, rows }: { title: string; rows: { name: string; users: number }[] }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-6">
      <h2 className="font-display text-lg uppercase text-paper">{title}</h2>
      {rows.length === 0 ? (
        <p className="mt-4 text-muted">Nu există date în această perioadă.</p>
      ) : (
        <ul className="mt-4 space-y-2">
          {rows.map((r) => (
            <li key={r.name} className="flex items-center justify-between text-sm">
              <span className="text-paper">{r.name}</span>
              <span className="text-muted">{r.users.toLocaleString("ro-RO")}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
