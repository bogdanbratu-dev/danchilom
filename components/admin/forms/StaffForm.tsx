"use client";

import { useState } from "react";
import type { Coach } from "@/content/schema";
import { ArrayEditor, Field, ImageField, TextArea, TextInput } from "@/components/admin/fields";
import { SaveBar, useSectionSave } from "@/components/admin/SectionEditor";

export function StaffForm({ initial }: { initial: Coach[] }) {
  const [data, setData] = useState<Coach[]>(initial);
  const { save, status, error } = useSectionSave("staff");

  return (
    <div>
      <h1 className="font-display text-3xl uppercase text-paper">Staff tehnic</h1>
      <p className="mt-2 text-muted">Antrenorii și restul echipei tehnice, pe pagina „Despre”.</p>

      <div className="mt-8">
        <ArrayEditor
          items={data}
          onChange={setData}
          newItem={() => ({ name: "", role: "", license: "", bio: "", photo: "" })}
          itemLabel={(item, i) => item.name || `Persoană ${i + 1}`}
          renderItem={(item, update) => (
            <>
              <Field label="Nume">
                <TextInput value={item.name} onChange={(v) => update({ ...item, name: v })} />
              </Field>
              <Field label="Rol" hint='Ex: "Antrenor principal"'>
                <TextInput value={item.role} onChange={(v) => update({ ...item, role: v })} />
              </Field>
              <Field label="Licență" hint='Ex: "Licență UEFA A"'>
                <TextInput value={item.license} onChange={(v) => update({ ...item, license: v })} />
              </Field>
              <Field label="Biografie scurtă">
                <TextArea value={item.bio} onChange={(v) => update({ ...item, bio: v })} rows={3} />
              </Field>
              <Field label="Poză">
                <ImageField value={item.photo} onChange={(v) => update({ ...item, photo: v })} folder="staff" />
              </Field>
            </>
          )}
        />
      </div>

      <SaveBar onSave={() => save(data)} status={status} error={error} />
    </div>
  );
}
