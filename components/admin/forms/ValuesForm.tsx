"use client";

import { useState } from "react";
import type { Value } from "@/content/schema";
import { ArrayEditor, Field, IconPicker, TextArea, TextInput } from "@/components/admin/fields";
import { SaveBar, useSectionSave } from "@/components/admin/SectionEditor";

export function ValuesForm({ initial }: { initial: Value[] }) {
  const [data, setData] = useState<Value[]>(initial);
  const { save, status, error } = useSectionSave("values");

  return (
    <div>
      <h1 className="font-display text-3xl uppercase text-paper">De ce AS Dan Chilom</h1>
      <p className="mt-2 text-muted">Cele câteva motive pentru care părinții aleg clubul, cu câte o iconiță.</p>

      <div className="mt-8">
        <ArrayEditor
          items={data}
          onChange={setData}
          newItem={() => ({ icon: "shield" as const, title: "", text: "" })}
          itemLabel={(item, i) => item.title || `Element ${i + 1}`}
          renderItem={(item, update) => (
            <>
              <Field label="Iconiță">
                <IconPicker value={item.icon} onChange={(v) => update({ ...item, icon: v })} />
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
