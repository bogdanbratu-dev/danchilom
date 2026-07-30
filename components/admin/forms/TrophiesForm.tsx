"use client";

import { useState } from "react";
import type { Trophy } from "@/content/schema";
import { ArrayEditor, Field, SelectInput, TextInput } from "@/components/admin/fields";
import { SaveBar, useSectionSave } from "@/components/admin/SectionEditor";

export function TrophiesForm({ initial }: { initial: Trophy[] }) {
  const [data, setData] = useState<Trophy[]>(initial);
  const { save, status, error } = useSectionSave("trophies");

  return (
    <div>
      <h1 className="font-display text-3xl uppercase text-paper">Palmares</h1>
      <p className="mt-2 text-muted">Trofeele naționale și internaționale ale clubului.</p>

      <div className="mt-8">
        <ArrayEditor
          items={data}
          onChange={setData}
          newItem={() => ({ year: "", title: "", scope: "national" as const })}
          itemLabel={(item, i) => `${item.year || "?"} — ${item.title || `Trofeu ${i + 1}`}`}
          renderItem={(item, update) => (
            <>
              <Field label="An" hint='Ex: "2012 – 2013"'>
                <TextInput value={item.year} onChange={(v) => update({ ...item, year: v })} />
              </Field>
              <Field label="Titlu trofeu">
                <TextInput value={item.title} onChange={(v) => update({ ...item, title: v })} />
              </Field>
              <Field label="Nivel">
                <SelectInput
                  value={item.scope}
                  onChange={(v) => update({ ...item, scope: v })}
                  options={[
                    { value: "national", label: "Național" },
                    { value: "international", label: "Internațional" },
                  ]}
                />
              </Field>
            </>
          )}
        />
      </div>

      <SaveBar onSave={() => save(data)} status={status} error={error} />
    </div>
  );
}
