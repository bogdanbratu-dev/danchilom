"use client";

import { useState } from "react";
import type { Contact } from "@/content/schema";
import { Field, TextInput } from "@/components/admin/fields";
import { SaveBar, useSectionSave } from "@/components/admin/SectionEditor";

export function ContactForm({ initial }: { initial: Contact }) {
  const [data, setData] = useState<Contact>(initial);
  const { save, status, error } = useSectionSave("contact");

  function set<K extends keyof Contact>(key: K, value: Contact[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  return (
    <div>
      <h1 className="font-display text-3xl uppercase text-paper">Contact & social media</h1>
      <p className="mt-2 text-muted">Aceste date apar în antet, subsol și pe pagina de contact.</p>

      <div className="mt-8 space-y-6">
        <Field label="Telefon afișat" hint="Ex: 0729 669 747">
          <TextInput value={data.phone} onChange={(v) => set("phone", v)} />
        </Field>
        <Field label="Link de apelare" hint="Ex: tel:+40729669747 — trebuie să înceapă cu tel:">
          <TextInput value={data.phoneHref} onChange={(v) => set("phoneHref", v)} />
        </Field>
        <Field label="Link WhatsApp" hint="Ex: https://wa.me/40729669747">
          <TextInput value={data.whatsappHref} onChange={(v) => set("whatsappHref", v)} />
        </Field>
        <Field label="Email afișat">
          <TextInput value={data.email} onChange={(v) => set("email", v)} />
        </Field>
        <Field label="Link de email" hint="Ex: mailto:contact@danchilom.ro — trebuie să înceapă cu mailto:">
          <TextInput value={data.emailHref} onChange={(v) => set("emailHref", v)} />
        </Field>
        <Field label="Facebook" hint="Link complet către pagina de Facebook, sau lasă gol dacă nu există.">
          <TextInput value={data.facebook} onChange={(v) => set("facebook", v)} />
        </Field>
        <Field label="Instagram" hint="Link complet, sau lasă gol.">
          <TextInput value={data.instagram} onChange={(v) => set("instagram", v)} />
        </Field>
        <Field label="YouTube" hint="Link complet, sau lasă gol.">
          <TextInput value={data.youtube} onChange={(v) => set("youtube", v)} />
        </Field>
        <Field label="TikTok" hint="Link complet, sau lasă gol.">
          <TextInput value={data.tiktok} onChange={(v) => set("tiktok", v)} />
        </Field>
        <Field label="Program" hint="Ex: Luni – Vineri, 16:00 – 20:00">
          <TextInput value={data.schedule} onChange={(v) => set("schedule", v)} />
        </Field>
      </div>

      <SaveBar onSave={() => save(data)} status={status} error={error} />
    </div>
  );
}
