import type { Metadata } from "next";
import Image from "next/image";
import { mapsUrl, wazeUrl } from "@/components/Cards";
import { IconCheck, IconPin } from "@/components/Icons";
import { ButtonGhost, ButtonPrimary, PageHero } from "@/components/UI";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Baze de antrenament în Sectorul 2",
  description:
    "Bazele de antrenament AS Dan Chilom din Sectorul 2, București: teren omologat FRF lângă Arena Națională și terenul din Parcul Florilor, cu nocturnă, vestiare și balon încălzit iarna.",
  alternates: { canonical: "/baze" },
};

export default async function BazePage() {
  const { bases, contact } = await getContent();

  return (
    <>
      <PageHero
        eyebrow="Baze de antrenament"
        title="Două baze proprii, în Sectorul 2"
        intro="Terenuri cu gazon sintetic și nocturnă, vestiare și, iarna, balon presostatic încălzit. Antrenamentele merg mai departe și în noiembrie, și în ianuarie."
        image="/img/galerie/baza-teren-si-cladire.jpg"
      />

      <div className="container-site py-20 lg:py-28">
        <div className="space-y-24 lg:space-y-32">
          {bases.map((base) => (
            <section key={base.slug} id={base.slug} className="scroll-mt-28">
              <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-16">
                <div>
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-soft">
                    <IconPin className="size-4" />
                    {base.area}
                  </p>
                  <h2 className="h-section mt-4">{base.name}</h2>
                  <p className="mt-5 text-base leading-relaxed text-muted">{base.address}</p>

                  <h3 className="mt-9 text-sm uppercase tracking-[0.18em] text-paper/70">
                    Dotări
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {base.facilities.map((f) => (
                      <li key={f} className="flex gap-3 text-sm">
                        <IconCheck className="mt-0.5 size-4 shrink-0 text-brand" />
                        <span className="text-paper/85">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <ButtonPrimary href={mapsUrl(base.mapsQuery)}>
                      Deschide în Google Maps
                    </ButtonPrimary>
                    <ButtonGhost href={wazeUrl(base.mapsQuery)}>Navighează cu Waze</ButtonGhost>
                  </div>
                </div>

                <ul className="grid grid-cols-2 gap-3 sm:gap-4">
                  {base.images.map((img, i) => (
                    <li
                      key={img.src}
                      className={`relative aspect-[4/5] overflow-hidden rounded-lg bg-surface-2 ${
                        i === 0 ? "col-span-2 aspect-[4/3]" : ""
                      }`}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(min-width: 1024px) 28vw, 46vw"
                        className="object-cover"
                      />
                    </li>
                  ))}
                </ul>
              </div>

              {/* Harta se încarcă doar când ajunge în viewport, ca să nu strice LCP-ul. */}
              <div className="mt-10 overflow-hidden rounded-card border border-line">
                <iframe
                  title={`Harta către ${base.name}`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(base.mapsQuery)}&output=embed&hl=ro`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-72 w-full border-0 sm:h-96"
                />
              </div>
            </section>
          ))}
        </div>

        <div className="mt-24 rounded-card border border-line bg-surface p-8 text-center lg:p-12">
          <h2 className="text-2xl">Nu ești sigur ce bază e mai aproape de tine?</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted">
            Sună-ne și îți spunem unde se antrenează grupa copilului tău și la ce oră.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonPrimary href={contact.phoneHref}>Sună la {contact.phone}</ButtonPrimary>
            <ButtonGhost href="/contact">Scrie-ne un mesaj</ButtonGhost>
          </div>
        </div>
      </div>
    </>
  );
}
