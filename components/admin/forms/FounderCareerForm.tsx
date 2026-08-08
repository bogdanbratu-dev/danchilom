"use client";

import { useState } from "react";
import type { FounderCareer } from "@/content/schema";
import { ArrayEditor, Field, ImageField, TextArea, TextInput } from "@/components/admin/fields";
import { SaveBar, useSectionSave } from "@/components/admin/SectionEditor";

export function FounderCareerForm({ initial }: { initial: FounderCareer }) {
  const [data, setData] = useState<FounderCareer>(initial);
  const { save, status, error } = useSectionSave("founderCareer");

  function set<K extends keyof FounderCareer>(key: K, value: FounderCareer[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  return (
    <div>
      <h1 className="font-display text-3xl uppercase text-paper">Cariera lui Dan</h1>
      <p className="mt-2 text-muted">Pagina „Dan Chilom” — cariera lui de fotbalist, înainte de academie.</p>

      <div className="mt-8 space-y-6">
        <Field label="Post">
          <TextInput value={data.position} onChange={(v) => set("position", v)} placeholder='Ex: "Portar"' />
        </Field>
        <Field label="Crescut la" hint="Clubul de juniori la care a fost format">
          <TextInput value={data.trainedAt} onChange={(v) => set("trainedAt", v)} />
        </Field>
        <Field label="Text introductiv">
          <TextArea value={data.intro} onChange={(v) => set("intro", v)} rows={4} />
        </Field>
        <Field label="Poză">
          <ImageField value={data.photo} onChange={(v) => set("photo", v)} />
        </Field>
        <Field label="Descrierea pozei">
          <TextInput value={data.photoAlt} onChange={(v) => set("photoAlt", v)} />
        </Field>

        <Field label="Cluburi la care a jucat">
          <ArrayEditor
            items={data.clubs}
            onChange={(clubs) => set("clubs", clubs)}
            newItem={() => ({ club: "", league: "", detail: "" })}
            itemLabel={(item, i) => item.club || `Club ${i + 1}`}
            renderItem={(item, update) => (
              <>
                <Field label="Club">
                  <TextInput value={item.club} onChange={(v) => update({ ...item, club: v })} />
                </Field>
                <Field label="Ligă / competiție">
                  <TextInput value={item.league} onChange={(v) => update({ ...item, league: v })} />
                </Field>
                <Field label="Detalii" hint="Ex: numărul de meciuri. Poate rămâne gol.">
                  <TextInput value={item.detail} onChange={(v) => update({ ...item, detail: v })} />
                </Field>
              </>
            )}
          />
        </Field>

        <Field label="Echipele naționale">
          <TextArea value={data.nationalTeam} onChange={(v) => set("nationalTeam", v)} rows={3} />
        </Field>
        <Field label="Licență de antrenor">
          <TextInput value={data.license} onChange={(v) => set("license", v)} />
        </Field>
      </div>

      <SaveBar onSave={() => save(data)} status={status} error={error} />
    </div>
  );
}
