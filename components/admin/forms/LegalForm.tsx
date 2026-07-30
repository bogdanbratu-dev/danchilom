"use client";

import { useState } from "react";
import type { Legal } from "@/content/schema";
import { Field, TextInput } from "@/components/admin/fields";
import { SaveBar, useSectionSave } from "@/components/admin/SectionEditor";

export function LegalForm({ initial }: { initial: Legal }) {
  const [data, setData] = useState<Legal>(initial);
  const { save, status, error } = useSectionSave("legal");

  function set<K extends keyof Legal>(key: K, value: Legal[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  return (
    <div>
      <h1 className="font-display text-3xl uppercase text-paper">Date juridice</h1>
      <p className="mt-2 text-muted">
        Apar în pagina „Politica de confidențialitate” — sunt obligatorii legal odată ce site-ul
        e public.
      </p>

      <div className="mt-8 space-y-6">
        <Field label="Denumirea juridică exactă" hint='Ex: Asociația Sportivă „Dan Chilom”'>
          <TextInput value={data.entityName} onChange={(v) => set("entityName", v)} />
        </Field>
        <Field label="CIF">
          <TextInput value={data.cif} onChange={(v) => set("cif", v)} />
        </Field>
        <Field label="Sediul social">
          <TextInput value={data.registeredAddress} onChange={(v) => set("registeredAddress", v)} />
        </Field>
      </div>

      <SaveBar onSave={() => save(data)} status={status} error={error} />
    </div>
  );
}
