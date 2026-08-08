import type { Metadata } from "next";
import Image from "next/image";
import { IconArrow, IconCheck, IconPlus } from "@/components/Icons";
import { ButtonGhost, ButtonPrimary, PageHero, SectionHeading } from "@/components/UI";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Grupe de vârstă — fotbal copii București",
  description:
    "Grupele AS Dan Chilom, de la inițiere (4–7 ani) la juniori competițional și performanță. Ce se lucrează la fiecare vârstă, câte antrenamente pe săptămână și în ce competiții jucăm.",
  alternates: { canonical: "/grupe" },
};

export default async function GrupePage() {
  const { contact, faq, groups } = await getContent();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      {faq.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <PageHero
        eyebrow="Grupe"
        title="Fiecare vârstă, cu antrenamentul potrivit pentru ea"
        intro="Un copil de 5 ani și unul de 14 nu au ce căuta la același antrenament. Grupele noastre sunt împărțite pe vârstă și nivel, iar obiectivele sunt diferite la fiecare etapă."
        image="/img/galerie/copii-exercitii-tehnice.jpg"
      />

      {/* Grupele, în detaliu -------------------------------------------------- */}
      <div className="container-site py-20 lg:py-28">
        <div className="space-y-20 lg:space-y-28">
          {groups.map((group, i) => (
            <section
              key={group.slug}
              id={group.slug}
              className="scroll-mt-28 grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16"
            >
              <div className={i % 2 === 1 ? "lg:order-2" : undefined}>
                <Image
                  src={group.image}
                  alt={group.imageAlt}
                  width={1080}
                  height={1350}
                  sizes="(min-width: 1024px) 45vw, 92vw"
                  className="rounded-card w-full object-cover"
                />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-soft">
                  {group.ages} · {group.years}
                </p>
                <h2 className="h-section mt-4">{group.name}</h2>
                <p className="mt-5 text-base leading-relaxed text-muted">{group.summary}</p>

                <h3 className="mt-8 text-sm uppercase tracking-[0.18em] text-paper/70">
                  Ce lucrăm la această grupă
                </h3>
                <ul className="mt-4 space-y-3">
                  {group.focus.map((f) => (
                    <li key={f} className="flex gap-3 text-sm">
                      <IconCheck className="mt-0.5 size-4 shrink-0 text-brand" />
                      <span className="text-paper/85">{f}</span>
                    </li>
                  ))}
                </ul>

                <dl className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="cut-corner border border-line bg-surface p-5">
                    <dt className="text-xs uppercase tracking-[0.16em] text-muted">Program</dt>
                    <dd className="mt-2 text-sm text-paper">{group.sessions}</dd>
                  </div>
                  <div className="cut-corner border border-line bg-surface p-5">
                    <dt className="text-xs uppercase tracking-[0.16em] text-muted">Competiții</dt>
                    <dd className="mt-2 text-sm text-paper">{group.competitions}</dd>
                  </div>
                </dl>

                <div className="mt-8">
                  <ButtonPrimary href="/contact">
                    Înscrie copilul la această grupă
                    <IconArrow className="size-4" />
                  </ButtonPrimary>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Orar și taxă --------------------------------------------------------- */}
      <section className="border-y border-line bg-surface/60">
        <div className="container-site py-20 lg:py-28">
          <SectionHeading
            eyebrow="Orar și taxă"
            title="Zilele de antrenament se stabilesc pe grupă"
            intro="Orarul se schimbă de la un sezon la altul, în funcție de grupă și de bază. Ca să nu-ți dăm o informație veche, îți spunem la telefon exact ziua, ora și taxa lunară pentru grupa copilului tău."
          />
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonPrimary href={contact.phoneHref}>Sună la {contact.phone}</ButtonPrimary>
            <ButtonGhost href={contact.whatsappHref}>Întreabă pe WhatsApp</ButtonGhost>
          </div>
        </div>
      </section>

      {/* Întrebări frecvente -------------------------------------------------- */}
      <section className="container-site py-20 lg:py-28">
        <SectionHeading
          eyebrow="Întrebări frecvente"
          title="Ce ne întreabă părinții cel mai des"
        />
        <div className="mt-12 max-w-3xl divide-y divide-line border-y border-line">
          {faq.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left">
                <span className="font-display text-lg uppercase leading-snug">{item.q}</span>
                <IconPlus className="mt-1 size-5 shrink-0 text-brand transition-transform group-open:rotate-45" />
              </summary>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
