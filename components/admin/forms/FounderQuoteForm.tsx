"use client";

import { useState } from "react";
import type { FounderQuote } from "@/content/schema";
import { Field, ImageField, TextArea, TextInput } from "@/components/admin/fields";
import { SaveBar, useSectionSave } from "@/components/admin/SectionEditor";

export function FounderQuoteForm({ initial }: { initial: FounderQuote }) {
  const [data, setData] = useState<FounderQuote>(initial);
  const { save, status, error } = useSectionSave("founderQuote");

  function set<K extends keyof FounderQuote>(key: K, value: FounderQuote[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  return (
    <div>
      <h1 className="font-display text-3xl uppercase text-paper">Cuvântul lui Dan</h1>
      <p className="mt-2 text-muted">Citatul personal de pe prima pagină.</p>

      <div className="mt-8 space-y-6">
        <Field label="Text citat">
          <TextArea value={data.text} onChange={(v) => set("text", v)} rows={5} />
        </Field>
        <Field label="Semnat de">
          <TextInput value={data.author} onChange={(v) => set("author", v)} />
        </Field>
        <Field label="Rol" hint='Ex: "Fondator AS Dan Chilom"'>
          <TextInput value={data.role} onChange={(v) => set("role", v)} />
        </Field>
        <Field label="Poză">
          <ImageField value={data.image} onChange={(v) => set("image", v)} />
        </Field>
        <Field label="Descrierea pozei">
          <TextInput value={data.imageAlt} onChange={(v) => set("imageAlt", v)} />
        </Field>
      </div>

      <SaveBar onSave={() => save(data)} status={status} error={error} />
    </div>
  );
}
