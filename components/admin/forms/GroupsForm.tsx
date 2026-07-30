"use client";

import { useState } from "react";
import type { Group } from "@/content/schema";
import { ArrayEditor, Field, ImageField, StringListEditor, TextArea, TextInput } from "@/components/admin/fields";
import { SaveBar, useSectionSave } from "@/components/admin/SectionEditor";

export function GroupsForm({ initial }: { initial: Group[] }) {
  const [data, setData] = useState<Group[]>(initial);
  const { save, status, error } = useSectionSave("groups");

  return (
    <div>
      <h1 className="font-display text-3xl uppercase text-paper">Grupe de vârstă</h1>
      <p className="mt-2 text-muted">Categoriile de copii afișate pe pagina „Grupe” și pe prima pagină.</p>

      <div className="mt-8">
        <ArrayEditor
          items={data}
          onChange={setData}
          newItem={() => ({
            slug: "",
            name: "",
            ages: "",
            years: "",
            summary: "",
            focus: [],
            sessions: "",
            competitions: "",
            image: "",
            imageAlt: "",
          })}
          itemLabel={(item, i) => item.name || `Grupă ${i + 1}`}
          renderItem={(item, update) => (
            <>
              <Field label="Nume grupă" hint='Ex: "Începători"'>
                <TextInput value={item.name} onChange={(v) => update({ ...item, name: v })} />
              </Field>
              <Field label="Identificator unic (slug)" hint="Doar litere mici, cifre și cratime, fără spații. Nu-l schimba dacă nu ești sigur.">
                <TextInput value={item.slug} onChange={(v) => update({ ...item, slug: v })} />
              </Field>
              <Field label="Vârste" hint='Ex: "4 – 6 ani"'>
                <TextInput value={item.ages} onChange={(v) => update({ ...item, ages: v })} />
              </Field>
              <Field label="Ani de naștere" hint='Ex: "2019 – 2021"'>
                <TextInput value={item.years} onChange={(v) => update({ ...item, years: v })} />
              </Field>
              <Field label="Descriere scurtă">
                <TextArea value={item.summary} onChange={(v) => update({ ...item, summary: v })} rows={3} />
              </Field>
              <Field label="Ce se lucrează" hint="O listă scurtă, câte un rând pentru fiecare punct.">
                <StringListEditor
                  values={item.focus}
                  onChange={(v) => update({ ...item, focus: v })}
                  placeholder="Ex: Tehnică individuală"
                />
              </Field>
              <Field label="Antrenamente" hint='Ex: "3 antrenamente / săptămână"'>
                <TextInput value={item.sessions} onChange={(v) => update({ ...item, sessions: v })} />
              </Field>
              <Field label="Competiții" hint='Ex: "Cupe AMFB de weekend"'>
                <TextInput value={item.competitions} onChange={(v) => update({ ...item, competitions: v })} />
              </Field>
              <Field label="Poză">
                <ImageField value={item.image} onChange={(v) => update({ ...item, image: v })} />
              </Field>
              <Field label="Descrierea pozei" hint="Pentru persoane nevăzătoare și pentru Google.">
                <TextInput value={item.imageAlt} onChange={(v) => update({ ...item, imageAlt: v })} />
              </Field>
            </>
          )}
        />
      </div>

      <SaveBar onSave={() => save(data)} status={status} error={error} />
    </div>
  );
}
