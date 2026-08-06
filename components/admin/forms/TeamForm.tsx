"use client";

import { useState } from "react";
import type { TeamMember } from "@/content/schema";
import { ArrayEditor, Field, ImageField, TextInput } from "@/components/admin/fields";
import { SaveBar, useSectionSave } from "@/components/admin/SectionEditor";

export function TeamForm({ initial }: { initial: TeamMember[] }) {
  const [data, setData] = useState<TeamMember[]>(initial);
  const { save, status, error } = useSectionSave("teamMembers");

  return (
    <div>
      <h1 className="font-display text-3xl uppercase text-paper">Membri staff</h1>
      <p className="mt-2 text-muted">
        Caruselul cu echipa de pe prima pagină. Adaugă, șterge sau schimbă ordinea oricui.
      </p>

      <div className="mt-8">
        <ArrayEditor
          items={data}
          onChange={setData}
          newItem={() => ({ name: "", role: "", photo: "" })}
          itemLabel={(item, i) => item.name || `Persoană ${i + 1}`}
          renderItem={(item, update) => (
            <>
              <Field label="Nume">
                <TextInput value={item.name} onChange={(v) => update({ ...item, name: v })} />
              </Field>
              <Field label="Rol / funcție" hint='Ex: "Președinte", "Licență UEFA B", "Social Media"'>
                <TextInput value={item.role} onChange={(v) => update({ ...item, role: v })} />
              </Field>
              <Field label="Poză">
                <ImageField
                  value={item.photo}
                  onChange={(v) => update({ ...item, photo: v })}
                  folder="staff"
                  aspect="aspect-square"
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
