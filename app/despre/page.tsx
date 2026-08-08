import type { Metadata } from "next";
import Image from "next/image";
import { CoachCard, FeatureCard, TrophyList } from "@/components/Cards";
import { IconArrow } from "@/components/Icons";
import { ButtonPrimary, PageHero, SectionHeading } from "@/components/UI";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Despre academie — fotbal copii București",
  description:
    "AS Dan Chilom, din 2011: antrenori licențiați UEFA, generații crescute la club, trofee naționale și internaționale și o echipă de seniori în Liga 4.",
  alternates: { canonical: "/despre" },
};

export default async function DesprePage() {
  const { founderQuote, staff, timeline, trophies, values } = await getContent();

  return (
    <>
      <PageHero
        eyebrow="Despre noi"
        title="Un club construit generație după generație"
        intro="A început în 2010, cu o singură grupă de copii. Astăzi, AS Dan Chilom are grupe de la 4 ani până la seniori, două baze de antrenament și o metodologie care nu s-a schimbat la bază: copiii vin pentru că le place și rămân pentru că devin mai buni."
        image="/img/galerie/teren-la-apus-slogan.jpg"
      />

      {/* Povestea + poza fondatorului ---------------------------------------- */}
      <section className="container-site py-20 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:items-start lg:gap-20">
          <div>
            <SectionHeading eyebrow="Povestea" title="Cum a început AS Dan Chilom" />
            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted">
              <p>
                Dan Chilom a pornit academia în 2010, cu o singură grupă de copii născuți în
                2002. Nu exista club, nu exista bază, exista doar un antrenor care voia să
                lucreze serios cu niște copii. Un an mai târziu clubul se înființa oficial și
                se afilia la Asociația Municipală de Fotbal București.
              </p>
              <p>
                De atunci s-au adăugat generație după generație. Copiii din prima grupă au
                crescut, au câștigat campionatul Bucureștiului la mini-fotbal și au plecat
                prin turnee internaționale — la Sofia, Viena, München, Riccione. Unii au ajuns
                la cluburi de performanță, alții au rămas la club și joacă azi la echipa de
                seniori.
              </p>
              <p>
                Asta e, de fapt, ideea întregului club: un copil poate începe aici la 4 ani,
                cu mingea mai mare decât el, și poate ajunge tot aici, la 18, într-o echipă de
                seniori din Liga 4. Nu trebuie să plece în altă parte ca să crească.
              </p>
            </div>
          </div>

          <figure className="lg:sticky lg:top-28">
            <Image
              src={founderQuote.image}
              alt={founderQuote.imageAlt}
              width={640}
              height={800}
              sizes="(min-width: 1024px) 28rem, 92vw"
              className="rounded-card w-full object-cover"
            />
            <figcaption className="mt-5 border-l-2 border-brand pl-5">
              <p className="font-display text-lg">{founderQuote.author}</p>
              <p className="mt-1 text-sm text-muted">{founderQuote.role}</p>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Etape ---------------------------------------------------------------- */}
      <section className="border-y border-line bg-surface/60">
        <div className="container-site py-20 lg:py-28">
          <SectionHeading eyebrow="Etape" title="Drumul clubului, an cu an" />
          <ol className="mt-14 space-y-10 border-l border-line pl-8 sm:pl-10">
            {timeline.map((m) => (
              <li key={m.year} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[41px] top-2 size-3 rounded-full bg-brand ring-4 ring-ink sm:-left-[49px]"
                />
                <p className="font-display text-xl text-brand-soft">{m.year}</p>
                <h3 className="mt-1 text-xl">{m.title}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Filozofie ------------------------------------------------------------ */}
      <section className="container-site py-20 lg:py-28">
        <SectionHeading
          eyebrow="Filozofia noastră"
          title="Ce contează pentru noi, în ordinea asta"
          intro="Rezultatele vin dacă restul e făcut cum trebuie. Nu invers."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
            <FeatureCard key={value.title} value={value} />
          ))}
        </div>
      </section>

      {/* Staff ---------------------------------------------------------------- */}
      <section className="border-y border-line bg-surface/60">
        <div className="container-site py-20 lg:py-28">
          <SectionHeading
            eyebrow="Staff tehnic"
            title="Cine lucrează cu copiii"
            intro="Antrenori cu licență UEFA A și B și un preparator fizic cu experiență la nivel de club profesionist. Copilul tău nu e lăsat pe mâna oricui."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {staff.map((coach) => (
              <CoachCard key={coach.name} coach={coach} />
            ))}
          </div>
        </div>
      </section>

      {/* Palmares ------------------------------------------------------------- */}
      <section className="container-site py-20 lg:py-28">
        <SectionHeading
          eyebrow="Palmares"
          title="Trofee naționale și internaționale"
          intro="O parte dintre rezultatele generațiilor crescute la club."
        />
        <TrophyList items={trophies} />

        <div className="mt-14 rounded-card border border-line bg-surface p-8 text-center lg:p-12">
          <h2 className="text-2xl">Vrei ca și copilul tău să facă parte din club?</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted">
            Primul antrenament e de probă și fără obligații. Scrie-ne sau sună-ne și stabilim
            ziua.
          </p>
          <div className="mt-8 flex justify-center">
            <ButtonPrimary href="/contact">
              Înscrie copilul
              <IconArrow className="size-4" />
            </ButtonPrimary>
          </div>
        </div>
      </section>
    </>
  );
}
