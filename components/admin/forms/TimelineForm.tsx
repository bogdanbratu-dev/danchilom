"use client";

import { useState } from "react";
import type { Milestone } from "@/content/schema";
import { ArrayEditor, Field, TextArea, TextInput } from "@/components/admin/fields";
import { SaveBar, useSectionSave } from "@/components/admin/SectionEditor";

export function TimelineForm({ initial }: { initial: Milestone[] }) {
  const [data, setData] = useState<Milestone[]>(initial);
  const { save, status, error } = useSectionSave("timeline");

  return (
    <div>
      <h1 className="font-display text-3xl uppercase text-paper">Istoric club</h1>
      <p className="mt-2 text-muted">Momentele importante din evoluția clubului, pe pagina „Despre”.</p>

      <div className="mt-8">
        <ArrayEditor
          items={data}
          onChange={setData}
          newItem={() => ({ year: "", title: "", text: "" })}
          itemLabel={(item, i) => `${item.year || "?"} — ${item.title || `Moment ${i + 1}`}`}
          renderItem={(item, update) => (
            <>
              <Field label="An" hint='Ex: "2011"'>
                <TextInput value={item.year} onChange={(v) => update({ ...item, year: v })} />
              </Field>
              <Field label="Titlu">
                <TextInput value={item.title} onChange={(v) => update({ ...item, title: v })} />
              </Field>
              <Field label="Text">
                <TextArea value={item.text} onChange={(v) => update({ ...item, text: v })} rows={3} />
              </Field>
            </>
          )}
        />
      </div>

      <SaveBar onSave={() => save(data)} status={status} error={error} />
    </div>
  );
}
