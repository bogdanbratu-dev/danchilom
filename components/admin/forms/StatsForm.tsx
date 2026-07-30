"use client";

import { useState } from "react";
import type { Stat } from "@/content/schema";
import { ArrayEditor, Field, TextInput } from "@/components/admin/fields";
import { SaveBar, useSectionSave } from "@/components/admin/SectionEditor";

export function StatsForm({ initial }: { initial: Stat[] }) {
  const [data, setData] = useState<Stat[]>(initial);
  const { save, status, error } = useSectionSave("stats");

  return (
    <div>
      <h1 className="font-display text-3xl uppercase text-paper">Bandă de statistici</h1>
      <p className="mt-2 text-muted">Numerele scurte afișate sub poza principală de pe prima pagină.</p>

      <div className="mt-8">
        <ArrayEditor
          items={data}
          onChange={setData}
          newItem={() => ({ value: "", label: "" })}
          itemLabel={(item, i) => item.value || item.label || `Element ${i + 1}`}
          renderItem={(item, update) => (
            <>
              <Field label="Număr / valoare" hint='Ex: "2011" sau "2 baze"'>
                <TextInput value={item.value} onChange={(v) => update({ ...item, value: v })} />
              </Field>
              <Field label="Descriere scurtă" hint='Ex: "Din" sau "Baze de antrenament"'>
                <TextInput value={item.label} onChange={(v) => update({ ...item, label: v })} />
              </Field>
            </>
          )}
        />
      </div>

      <SaveBar onSave={() => save(data)} status={status} error={error} />
    </div>
  );
}
