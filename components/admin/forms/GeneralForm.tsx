"use client";

import { useState } from "react";
import type { Site } from "@/content/schema";
import { Field, ImageField, NumberInput, TextArea, TextInput } from "@/components/admin/fields";
import { SaveBar, useSectionSave } from "@/components/admin/SectionEditor";

export function GeneralForm({ initial }: { initial: Site }) {
  const [data, setData] = useState<Site>(initial);
  const { save, status, error } = useSectionSave("site");

  function set<K extends keyof Site>(key: K, value: Site[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  return (
    <div>
      <h1 className="font-display text-3xl uppercase text-paper">Informații generale</h1>
      <p className="mt-2 text-muted">Numele clubului, deviza și pozele principale ale site-ului.</p>

      <div className="mt-8 space-y-6">
        <Field label="Nume scurt" hint="Apare în meniu și în multe locuri scurte.">
          <TextInput value={data.name} onChange={(v) => set("name", v)} />
        </Field>
        <Field label="Nume complet">
          <TextInput value={data.longName} onChange={(v) => set("longName", v)} />
        </Field>
        <Field label="Frază scurtă (tagline)" hint="Apare sub titlu, pe prima pagină.">
          <TextArea value={data.tagline} onChange={(v) => set("tagline", v)} rows={2} />
        </Field>
        <Field label="Deviza clubului">
          <TextInput value={data.motto} onChange={(v) => set("motto", v)} />
        </Field>
        <Field label="Anul înființării">
          <NumberInput value={data.foundedYear} onChange={(v) => set("foundedYear", v)} />
        </Field>
        <Field label="Descriere" hint="Folosită pentru Google și pentru distribuirea pe rețele sociale.">
          <TextArea value={data.description} onChange={(v) => set("description", v)} rows={3} />
        </Field>
        <Field label="Adresa web a site-ului" hint="Ex: https://www.danchilom.ro">
          <TextInput value={data.url} onChange={(v) => set("url", v)} />
        </Field>
        <Field label="Logo / blazon">
          <ImageField value={data.logo} onChange={(v) => set("logo", v)} folder="brand" aspect="aspect-square" />
        </Field>
        <Field label="Poza principală (hero)" hint="Poza mare din capul primei pagini.">
          <ImageField value={data.heroImage} onChange={(v) => set("heroImage", v)} folder="brand" />
        </Field>
      </div>

      <SaveBar onSave={() => save(data)} status={status} error={error} />
    </div>
  );
}
