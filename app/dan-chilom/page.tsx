import type { Metadata } from "next";
import { IconArrow } from "@/components/Icons";
import { ButtonPrimary, PageHero, SectionHeading } from "@/components/UI";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Dan Chilom — fost portar, antrenor licențiat UEFA A",
  description:
    "Cariera lui Dan Chilom: portar crescut la FC Dinamo București, cu meciuri în prima ligă a Finlandei și peste 45 de prezențe la echipele naționale de tineret ale României. Azi, fondator și antrenor licențiat UEFA A la AS Dan Chilom.",
  alternates: { canonical: "/dan-chilom" },
};

export default async function DanChilomPage() {
  const { founderCareer, site } = await getContent();

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Dan Chilom",
    jobTitle: "Antrenor de fotbal, fondator AS Dan Chilom",
    description: founderCareer.intro,
    url: `${site.url}/dan-chilom`,
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "Licență de antrenor",
      name: founderCareer.license,
    },
    worksFor: { "@type": "SportsOrganization", name: site.longName },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <PageHero
        eyebrow="Dan Chilom"
        title="Fost portar, azi antrenor licențiat UEFA A"
        intro={founderCareer.intro}
        image={founderCareer.photo}
        imageAlt={founderCareer.photoAlt}
      />

      {/* Cariera de jucător ---------------------------------------------------- */}
      <section className="container-site py-20 lg:py-28">
        <SectionHeading
          eyebrow="Cariera de jucător"
          title={founderCareer.position}
          intro={founderCareer.trainedAt}
        />
        <ul className="mt-10 max-w-2xl divide-y divide-line border-y border-line">
          {founderCareer.clubs.map((c) => (
            <li
              key={c.club}
              className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <div>
                <p className="font-display text-lg uppercase text-paper">{c.club}</p>
                <p className="text-sm text-brand-soft">{c.league}</p>
              </div>
              {c.detail && <p className="text-sm leading-relaxed text-muted sm:text-right">{c.detail}</p>}
            </li>
          ))}
        </ul>
      </section>

      {/* Naționala + licență ---------------------------------------------------- */}
      <section className="border-y border-line bg-surface/60">
        <div className="container-site grid gap-12 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <SectionHeading eyebrow="Echipele naționale" title="România, la juniori și tineret" />
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
              {founderCareer.nationalTeam}
            </p>
          </div>
          <div>
            <SectionHeading eyebrow="Astăzi" title="De pe teren, la marginea terenului" />
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted">
              {founderCareer.license} Experiența de jucător, în România și în afară, stă la baza
              metodologiei cu care lucrează azi cu copiii de la AS Dan Chilom.
            </p>
          </div>
        </div>
      </section>

      {/* CTA -------------------------------------------------------------------- */}
      <section className="container-site py-20 text-center lg:py-28">
        <h2 className="text-2xl">Vrei ca și copilul tău să înveți de la un antrenor cu experiență de jucător?</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted">
          Primul antrenament e de probă și fără obligații.
        </p>
        <div className="mt-8 flex justify-center">
          <ButtonPrimary href="/contact">
            Înscrie copilul
            <IconArrow className="size-4" />
          </ButtonPrimary>
        </div>
      </section>
    </>
  );
}
