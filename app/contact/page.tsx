import type { Metadata } from "next";
import { mapsUrl } from "@/components/Cards";
import { EnrollForm } from "@/components/EnrollForm";
import {
  IconClock,
  IconFacebook,
  IconMail,
  IconPhone,
  IconPin,
  IconWhatsapp,
} from "@/components/Icons";
import { PageHero } from "@/components/UI";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact și înscrieri",
  description:
    "Înscrie copilul la AS Dan Chilom: completează formularul, sună la 0729 669 747 sau scrie-ne pe WhatsApp. Primul antrenament este de probă, fără obligații.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage() {
  const { bases, contact } = await getContent();

  return (
    <>
      <PageHero
        eyebrow="Contact și înscrieri"
        title="Hai la un antrenament de probă"
        intro="Completează formularul și te sunăm noi, sau ia legătura direct cu noi la telefon ori pe WhatsApp. Primul antrenament e fără obligații — vii, vezi cum lucrăm, decideți în cunoștință de cauză."
      />

      <div className="container-site grid gap-14 py-16 lg:grid-cols-[1fr_0.85fr] lg:gap-20 lg:py-24">
        {/* Formular ---------------------------------------------------------- */}
        <section>
          <h2 className="text-2xl">Formular de înscriere</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Ne trebuie doar câteva date ca să știm în ce grupă s-ar potrivi copilul tău.
          </p>
          <div className="mt-8">
            <EnrollForm bases={bases} contact={contact} />
          </div>
        </section>

        {/* Date de contact ---------------------------------------------------- */}
        <aside className="space-y-8">
          <section className="rounded-card border border-line bg-surface p-7">
            <h2 className="text-xl">Vorbește direct cu noi</h2>
            <ul className="mt-6 space-y-4">
              <li>
                <a
                  href={contact.phoneHref}
                  className="flex min-h-12 items-center gap-4 rounded-lg bg-brand px-5 font-bold text-white transition-colors hover:bg-brand-soft"
                >
                  <IconPhone className="size-5 shrink-0" />
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={contact.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 items-center gap-4 rounded-lg border border-line px-5 font-semibold transition-colors hover:border-brand hover:text-brand-soft"
                >
                  <IconWhatsapp className="size-5 shrink-0 text-brand" />
                  Scrie pe WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={contact.emailHref}
                  className="flex min-h-12 items-center gap-4 break-all rounded-lg border border-line px-5 text-sm font-semibold transition-colors hover:border-brand hover:text-brand-soft"
                >
                  <IconMail className="size-5 shrink-0 text-brand" />
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={contact.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 items-center gap-4 rounded-lg border border-line px-5 font-semibold transition-colors hover:border-brand hover:text-brand-soft"
                >
                  <IconFacebook className="size-5 shrink-0 text-brand" />
                  Pagina de Facebook
                </a>
              </li>
            </ul>

            <p className="mt-6 flex items-center gap-3 text-sm text-muted">
              <IconClock className="size-5 shrink-0 text-brand" />
              {contact.schedule}
            </p>
          </section>

          <section className="rounded-card border border-line bg-surface p-7">
            <h2 className="text-xl">Unde ne găsești</h2>
            <ul className="mt-6 space-y-6">
              {bases.map((base) => (
                <li key={base.slug}>
                  <p className="flex items-start gap-3 font-semibold">
                    <IconPin className="mt-0.5 size-5 shrink-0 text-brand" />
                    {base.name}
                  </p>
                  <p className="ml-8 mt-1 text-sm leading-relaxed text-muted">{base.address}</p>
                  <a
                    href={mapsUrl(base.mapsQuery)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-8 mt-2 inline-block text-xs font-bold uppercase tracking-wide text-brand-soft transition-colors hover:text-paper"
                  >
                    Deschide în Google Maps
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </>
  );
}
