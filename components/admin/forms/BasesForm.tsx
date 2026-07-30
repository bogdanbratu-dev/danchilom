"use client";

import { useState } from "react";
import type { Base } from "@/content/schema";
import { ArrayEditor, Field, ImageField, StringListEditor, TextInput } from "@/components/admin/fields";
import { SaveBar, useSectionSave } from "@/components/admin/SectionEditor";

export function BasesForm({ initial }: { initial: Base[] }) {
  const [data, setData] = useState<Base[]>(initial);
  const { save, status, error } = useSectionSave("bases");

  return (
    <div>
      <h1 className="font-display text-3xl uppercase text-paper">Baze de antrenament</h1>
      <p className="mt-2 text-muted">Adresele, dotările și pozele fiecărei baze.</p>

      <div className="mt-8">
        <ArrayEditor
          items={data}
          onChange={setData}
          newItem={() => ({
            slug: "",
            name: "",
            address: "",
            area: "",
            facilities: [],
            mapsQuery: "",
            images: [],
          })}
          itemLabel={(item, i) => item.name || `Bază ${i + 1}`}
          renderItem={(item, update) => (
            <>
              <Field label="Nume bază" hint='Ex: "Baza Arena Națională"'>
                <TextInput value={item.name} onChange={(v) => update({ ...item, name: v })} />
              </Field>
              <Field label="Identificator unic (slug)" hint="Doar litere mici, cifre și cratime. Nu-l schimba dacă nu ești sigur.">
                <TextInput value={item.slug} onChange={(v) => update({ ...item, slug: v })} />
              </Field>
              <Field label="Adresă completă">
                <TextInput value={item.address} onChange={(v) => update({ ...item, address: v })} />
              </Field>
              <Field label="Zonă" hint='Ex: "Sector 2, lângă Arena Națională"'>
                <TextInput value={item.area} onChange={(v) => update({ ...item, area: v })} />
              </Field>
              <Field label="Dotări" hint="O listă scurtă, câte un rând pentru fiecare dotare.">
                <StringListEditor
                  values={item.facilities}
                  onChange={(v) => update({ ...item, facilities: v })}
                  placeholder="Ex: Nocturnă"
                />
              </Field>
              <Field label="Căutare Google Maps" hint="Ce se caută pe Google Maps/Waze pentru a găsi baza — de obicei adresa.">
                <TextInput value={item.mapsQuery} onChange={(v) => update({ ...item, mapsQuery: v })} />
              </Field>
              <Field label="Poze">
                <ArrayEditor
                  items={item.images}
                  onChange={(images) => update({ ...item, images })}
                  newItem={() => ({ src: "", alt: "" })}
                  itemLabel={(img, idx) => img.alt || `Poză ${idx + 1}`}
                  renderItem={(img, updateImg) => (
                    <>
                      <Field label="Poză">
                        <ImageField value={img.src} onChange={(v) => updateImg({ ...img, src: v })} />
                      </Field>
                      <Field label="Descrierea pozei">
                        <TextInput value={img.alt} onChange={(v) => updateImg({ ...img, alt: v })} />
                      </Field>
                    </>
                  )}
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
