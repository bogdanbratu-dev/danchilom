"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { IconName } from "@/content/schema";
import { ValueIcon } from "@/components/Icons";

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="block">
      <span className="block text-sm font-semibold text-paper">{label}</span>
      {hint ? <span className="mt-0.5 block text-xs text-muted">{hint}</span> : null}
      <div className="mt-2">{children}</div>
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-line bg-surface px-4 py-3 text-base text-paper placeholder:text-muted/70 focus-visible:border-brand-soft";

export function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={inputClass}
    />
  );
}

export function NumberInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <input
      type="number"
      value={Number.isFinite(value) ? value : 0}
      onChange={(e) => onChange(Number(e.target.value))}
      className={inputClass}
    />
  );
}

export function SelectInput<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as T)}
      className={inputClass}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

export function TextArea({
  value,
  onChange,
  rows = 4,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      placeholder={placeholder}
      className={`${inputClass} resize-y`}
    />
  );
}

/** Editor pentru o listă simplă de texte (ex. lista de dotări ale unei baze). */
export function StringListEditor({
  values,
  onChange,
  placeholder,
}: {
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      {values.map((value, i) => (
        <div key={i} className="flex gap-2">
          <input
            type="text"
            value={value}
            onChange={(e) => {
              const next = [...values];
              next[i] = e.target.value;
              onChange(next);
            }}
            placeholder={placeholder}
            className={inputClass}
          />
          <button
            type="button"
            onClick={() => onChange(values.filter((_, idx) => idx !== i))}
            className="shrink-0 rounded-lg border border-line px-3 text-sm text-muted hover:border-brand hover:text-brand-soft"
            aria-label="Șterge"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...values, ""])}
        className="rounded-lg border border-dashed border-line px-4 py-2 text-sm text-muted hover:border-brand-soft hover:text-paper"
      >
        + Adaugă
      </button>
    </div>
  );
}

const ICON_LABELS: Record<IconName, string> = {
  whistle: "Fluier",
  trophy: "Trofeu",
  path: "Drum / traseu",
  heart: "Inimă",
  shield: "Scut",
  users: "Grup de oameni",
};

const ICON_NAMES = Object.keys(ICON_LABELS) as IconName[];

export function IconPicker({
  value,
  onChange,
}: {
  value: IconName;
  onChange: (value: IconName) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {ICON_NAMES.map((name) => {
        const active = value === name;
        return (
          <button
            key={name}
            type="button"
            onClick={() => onChange(name)}
            title={ICON_LABELS[name]}
            className={`flex flex-col items-center gap-1 rounded-lg border px-3 py-2 text-xs ${
              active
                ? "border-brand-soft bg-brand/10 text-paper"
                : "border-line text-muted hover:border-brand-soft/60"
            }`}
          >
            <ValueIcon name={name} className="h-5 w-5" />
            {ICON_LABELS[name]}
          </button>
        );
      })}
    </div>
  );
}

/**
 * Câmp de încărcat o poză: arată previzualizarea curentă, un buton de
 * încărcare de pe telefon/calculator și trimite fișierul la API-ul de admin.
 * La final, `onChange` primește URL-ul definitiv al pozei — restul
 * formularului nu trebuie să știe dacă poza a ajuns pe disc local sau pe
 * Vercel Blob.
 */
export function ImageField({
  value,
  onChange,
  folder = "gallery",
  aspect = "aspect-[4/5]",
}: {
  value: string;
  onChange: (url: string) => void;
  folder?: "gallery" | "staff" | "brand";
  aspect?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(file: File) {
    setUploading(true);
    setError("");
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("folder", folder);
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Încărcare eșuată.");
      onChange(json.url as string);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Încărcare eșuată.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
      <div className={`relative w-32 shrink-0 overflow-hidden rounded-lg border border-line bg-surface-2 ${aspect}`}>
        {value ? (
          <Image src={value} alt="" fill sizes="128px" className="object-cover" unoptimized={value.startsWith("http")} />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-muted">Fără poză</div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void handleFile(file);
            e.target.value = "";
          }}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-fit rounded-lg border border-line bg-surface px-4 py-2 text-sm font-semibold text-paper hover:border-brand-soft disabled:opacity-60"
        >
          {uploading ? "Se încarcă…" : value ? "Schimbă poza" : "Încarcă o poză"}
        </button>
        {error ? <p className="text-xs text-brand-soft">{error}</p> : null}
        <p className="text-xs text-muted break-all">{value || "—"}</p>
      </div>
    </div>
  );
}

/**
 * Editor generic pentru liste de obiecte (grupe, baze, staff, palmares...):
 * adaugă, șterge, mută sus/jos. Randarea câmpurilor fiecărui element se face
 * prin `renderItem`, definit separat pentru fiecare secțiune.
 */
export function ArrayEditor<T>({
  items,
  onChange,
  newItem,
  renderItem,
  itemLabel,
}: {
  items: T[];
  onChange: (items: T[]) => void;
  newItem: () => T;
  renderItem: (item: T, update: (next: T) => void) => React.ReactNode;
  itemLabel: (item: T, index: number) => string;
}) {
  function update(index: number, next: T) {
    const copy = [...items];
    copy[index] = next;
    onChange(copy);
  }

  function remove(index: number) {
    onChange(items.filter((_, i) => i !== index));
  }

  function move(index: number, dir: -1 | 1) {
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    const copy = [...items];
    [copy[index], copy[target]] = [copy[target], copy[index]];
    onChange(copy);
  }

  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <details key={i} className="rounded-xl border border-line bg-surface" open>
          <summary className="flex cursor-pointer items-center justify-between gap-3 px-4 py-3">
            <span className="font-semibold text-paper">{itemLabel(item, i)}</span>
            <span className="flex items-center gap-1">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  move(i, -1);
                }}
                disabled={i === 0}
                className="rounded-md border border-line px-2 py-1 text-xs text-muted hover:text-paper disabled:opacity-30"
                aria-label="Mută mai sus"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  move(i, 1);
                }}
                disabled={i === items.length - 1}
                className="rounded-md border border-line px-2 py-1 text-xs text-muted hover:text-paper disabled:opacity-30"
                aria-label="Mută mai jos"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  remove(i);
                }}
                className="rounded-md border border-line px-2 py-1 text-xs text-muted hover:border-brand hover:text-brand-soft"
                aria-label="Șterge"
              >
                Șterge
              </button>
            </span>
          </summary>
          <div className="space-y-4 border-t border-line px-4 py-4">
            {renderItem(item, (next) => update(i, next))}
          </div>
        </details>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, newItem()])}
        className="w-full rounded-xl border border-dashed border-line py-4 text-sm font-semibold text-muted hover:border-brand-soft hover:text-paper"
      >
        + Adaugă element nou
      </button>
    </div>
  );
}
