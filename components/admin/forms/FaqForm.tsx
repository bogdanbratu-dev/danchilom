"use client";

import { useState } from "react";
import type { Faq } from "@/content/schema";
import { ArrayEditor, Field, TextArea, TextInput } from "@/components/admin/fields";
import { SaveBar, useSectionSave } from "@/components/admin/SectionEditor";

export function FaqForm({ initial }: { initial: Faq[] }) {
  const [data, setData] = useState<Faq[]>(initial);
  const { save, status, error } = useSectionSave("faq");

  return (
    <div>
      <h1 className="font-display text-3xl uppercase text-paper">Întrebări frecvente</h1>
      <p className="mt-2 text-muted">Apar pe pagina „Grupe”.</p>

      <div className="mt-8">
        <ArrayEditor
          items={data}
          onChange={setData}
          newItem={() => ({ q: "", a: "" })}
          itemLabel={(item, i) => item.q || `Întrebare ${i + 1}`}
          renderItem={(item, update) => (
            <>
              <Field label="Întrebare">
                <TextInput value={item.q} onChange={(v) => update({ ...item, q: v })} />
              </Field>
              <Field label="Răspuns">
                <TextArea value={item.a} onChange={(v) => update({ ...item, a: v })} rows={3} />
              </Field>
            </>
          )}
        />
      </div>

      <SaveBar onSave={() => save(data)} status={status} error={error} />
    </div>
  );
}
