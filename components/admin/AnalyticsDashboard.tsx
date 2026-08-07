"use client";

import { useEffect, useMemo, useState } from "react";
import type { TrafficReport } from "@/lib/ga-report";

type Preset = "today" | "yesterday" | "7" | "28" | "90" | "custom";

const PRESETS: { key: Preset; label: string }[] = [
  { key: "today", label: "Azi" },
  { key: "yesterday", label: "Ieri" },
  { key: "7", label: "7 zile" },
  { key: "28", label: "28 zile" },
  { key: "90", label: "90 zile" },
  { key: "custom", label: "Interval personalizat" },
];

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function daysAgoIso(days: number) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().slice(0, 10);
}

export function AnalyticsDashboard() {
  const [preset, setPreset] = useState<Preset>("28");
  const [customStart, setCustomStart] = useState(daysAgoIso(7));
  const [customEnd, setCustomEnd] = useState(todayIso());
  const [report, setReport] = useState<TrafficReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const range = useMemo(() => {
    switch (preset) {
      case "today":
        return { start: "today", end: "today" };
      case "yesterday":
        return { start: "yesterday", end: "yesterday" };
      case "7":
        return { start: "7daysAgo", end: "today" };
      case "28":
        return { start: "28daysAgo", end: "today" };
      case "90":
        return { start: "90daysAgo", end: "today" };
      case "custom":
        return { start: customStart, end: customEnd };
    }
  }, [preset, customStart, customEnd]);

  useEffect(() => {
    if (preset === "custom" && (!customStart || !customEnd || customStart > customEnd)) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`/api/admin/analytics?start=${range.start}&end=${range.end}`)
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
  }, [range, preset, customStart, customEnd]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.key}
            type="button"
            onClick={() => setPreset(p.key)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              preset === p.key
                ? "bg-brand text-white"
                : "border border-line text-muted hover:border-brand hover:text-paper"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {preset === "custom" && (
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-muted">
            De la
            <input
              type="date"
              value={customStart}
              max={customEnd}
              onChange={(e) => setCustomStart(e.target.value)}
              className="rounded-lg border border-line bg-ink px-3 py-2 text-paper"
            />
          </label>
          <label className="flex items-center gap-2 text-sm text-muted">
            Până la
            <input
              type="date"
              value={customEnd}
              min={customStart}
              max={todayIso()}
              onChange={(e) => setCustomEnd(e.target.value)}
              className="rounded-lg border border-line bg-ink px-3 py-2 text-paper"
            />
          </label>
          {customStart > customEnd && (
            <span className="text-sm text-brand-soft">
              Data de început trebuie să fie înainte de cea de sfârșit.
            </span>
          )}
        </div>
      )}

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
            <p className="mt-1 text-xs text-muted">
              Corpul barei arată intervalul dintre vizitatori unici și sesiuni; linia subțire
              urcă până la paginile văzute.
            </p>
            <CandlestickChart data={report.byDay} />
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

function CandlestickChart({
  data,
}: {
  data: { date: string; users: number; sessions: number; pageViews: number }[];
}) {
  if (data.length === 0) {
    return <p className="mt-4 text-muted">Nu există date în această perioadă.</p>;
  }

  const max = Math.max(1, ...data.map((d) => Math.max(d.users, d.sessions, d.pageViews)));
  const chartHeight = 160;

  return (
    <div className="mt-6 flex h-52 items-end gap-1.5 overflow-x-auto">
      {data.map((d) => {
        const low = Math.min(d.users, d.sessions);
        const high = Math.max(d.users, d.sessions);
        const wickTop = Math.max(d.users, d.sessions, d.pageViews);
        const bodyBottom = (low / max) * chartHeight;
        const bodyTop = (high / max) * chartHeight;
        const wickTopPx = (wickTop / max) * chartHeight;
        const bullish = d.sessions >= d.users;

        return (
          <div key={d.date} className="flex min-w-[28px] flex-1 flex-col items-center gap-2">
            <div className="relative flex h-40 w-full items-end justify-center">
              <svg width="100%" height={chartHeight} className="overflow-visible">
                <line
                  x1="50%"
                  x2="50%"
                  y1={chartHeight - wickTopPx}
                  y2={chartHeight - bodyBottom}
                  stroke={bullish ? "#E6007E" : "#A1A1AA"}
                  strokeWidth={2}
                />
                <rect
                  x="30%"
                  width="40%"
                  y={chartHeight - bodyTop}
                  height={Math.max(2, bodyTop - bodyBottom)}
                  fill={bullish ? "#E6007E" : "#A1A1AA"}
                  rx={2}
                />
              </svg>
              <div
                className="absolute inset-0"
                title={`${d.date} — utilizatori: ${d.users}, sesiuni: ${d.sessions}, pagini: ${d.pageViews}`}
              />
            </div>
            <span className="text-[10px] text-muted">{d.date}</span>
          </div>
        );
      })}
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
