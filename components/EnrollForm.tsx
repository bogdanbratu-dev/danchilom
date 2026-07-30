"use client";

import { useState } from "react";
import type { Base, Contact } from "@/content/schema";
import { IconCheck, IconPhone, IconWhatsapp } from "./Icons";

const currentYear = new Date().getFullYear();
// Grupele merg de la 4 la 18 ani, deci acoperim anii de naștere corespunzători.
const birthYears = Array.from({ length: 15 }, (_, i) => currentYear - 4 - i);

type Status = "idle" | "sending" | "success" | "error" | "fallback";

const fieldClass =
  "mt-2 w-full rounded-lg border border-line bg-surface px-4 py-3 text-base text-paper placeholder:text-muted/70 focus:border-brand focus:outline-none";
const labelClass = "block text-sm font-semibold text-paper/85";

export function EnrollForm({ bases, contact }: { bases: Base[]; contact: Contact }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/inscriere", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, gdpr: data.gdpr === "on" }),
      });
      const json = (await res.json()) as { error?: string; code?: string };

      if (res.ok) {
        setStatus("success");
        form.reset();
        return;
      }

      // Emailul nu e încă activat pe server: îndrumăm părintele spre telefon.
      if (json.code === "email-neconfigurat" || json.code === "trimitere-esuata") {
        setStatus("fallback");
        return;
      }

      setError(json.error || "A apărut o eroare. Încearcă din nou.");
      setStatus("error");
    } catch {
      setStatus("fallback");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-card border border-brand/50 bg-brand/10 p-8 text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-brand text-white">
          <IconCheck className="size-7" />
        </span>
        <h3 className="mt-5 text-2xl">Cererea a ajuns la noi</h3>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-paper/80">
          Îți mulțumim. Te sunăm în cel mai scurt timp ca să stabilim ziua antrenamentului de
          probă. Dacă vrei mai repede, sună direct la {contact.phone}.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-7 min-h-11 rounded-full border border-line px-6 text-xs font-bold uppercase tracking-wide transition-colors hover:border-brand hover:text-brand-soft"
        >
          Trimite altă cerere
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate={false} className="space-y-6">
      {/* Câmp-capcană pentru boți — invizibil și scos din ordinea de tabulare. */}
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Nu completa acest câmp</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="childName" className={labelClass}>
            Numele copilului <span className="text-brand-soft">*</span>
          </label>
          <input
            id="childName"
            name="childName"
            type="text"
            required
            minLength={2}
            autoComplete="off"
            className={fieldClass}
            placeholder="Andrei Popescu"
          />
        </div>

        <div>
          <label htmlFor="birthYear" className={labelClass}>
            Anul nașterii <span className="text-brand-soft">*</span>
          </label>
          <select id="birthYear" name="birthYear" required defaultValue="" className={fieldClass}>
            <option value="" disabled>
              Alege anul
            </option>
            {birthYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="parentName" className={labelClass}>
            Numele părintelui <span className="text-brand-soft">*</span>
          </label>
          <input
            id="parentName"
            name="parentName"
            type="text"
            required
            minLength={2}
            autoComplete="name"
            className={fieldClass}
            placeholder="Maria Popescu"
          />
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            Telefon <span className="text-brand-soft">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            className={fieldClass}
            placeholder="07xx xxx xxx"
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-muted">(opțional)</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className={fieldClass}
            placeholder="nume@exemplu.ro"
          />
        </div>

        <div>
          <label htmlFor="base" className={labelClass}>
            Baza preferată
          </label>
          <select id="base" name="base" defaultValue="" className={fieldClass}>
            <option value="">Fără preferință</option>
            {bases.map((base) => (
              <option key={base.slug} value={base.slug}>
                {base.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Mesaj <span className="text-muted">(opțional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={fieldClass}
          placeholder="Spune-ne dacă a mai jucat fotbal, ce zile v-ar conveni sau orice altceva ar fi util."
        />
      </div>

      <div className="flex gap-3">
        <input
          id="gdpr"
          name="gdpr"
          type="checkbox"
          required
          className="mt-1 size-5 shrink-0 accent-[var(--color-brand)]"
        />
        <label htmlFor="gdpr" className="text-sm leading-relaxed text-muted">
          Sunt de acord ca datele de mai sus să fie folosite exclusiv pentru a fi contactat în
          legătură cu înscrierea.{" "}
          <a
            href="/politica-de-confidentialitate"
            className="font-semibold text-brand-soft underline underline-offset-4"
          >
            Politica de confidențialitate
          </a>
          . <span className="text-brand-soft">*</span>
        </label>
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-lg border border-brand/50 bg-brand/10 px-4 py-3 text-sm">
          {error}
        </p>
      )}

      {status === "fallback" && (
        <div role="alert" className="rounded-card border border-brand/50 bg-brand/10 p-5">
          <p className="text-sm leading-relaxed text-paper/90">
            Momentan nu putem trimite formularul automat. Sună-ne direct sau scrie-ne pe
            WhatsApp — răspundem la fel de repede.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <a
              href={contact.phoneHref}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand px-6 text-xs font-bold uppercase tracking-wide text-white"
            >
              <IconPhone className="size-4" />
              {contact.phone}
            </a>
            <a
              href={contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-line px-6 text-xs font-bold uppercase tracking-wide"
            >
              <IconWhatsapp className="size-4" />
              WhatsApp
            </a>
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex min-h-13 w-full items-center justify-center rounded-full bg-brand px-8 py-4 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-soft disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Se trimite…" : "Trimite cererea de înscriere"}
      </button>

      <p className="text-xs text-muted">
        Câmpurile marcate cu <span className="text-brand-soft">*</span> sunt obligatorii.
      </p>
    </form>
  );
}
