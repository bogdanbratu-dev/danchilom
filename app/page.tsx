import Image from "next/image";
import Link from "next/link";
import { BaseCard, FeatureCard, GroupCard, TrophyList } from "@/components/Cards";
import { Hero } from "@/components/Hero";
import { IconArrow, IconPhone, IconWhatsapp } from "@/components/Icons";
import { StatsBar } from "@/components/StatsBar";
import { TeamCarousel } from "@/components/TeamCarousel";
import { ButtonGhost, ButtonPrimary, SectionHeading, TextLink } from "@/components/UI";
import { getContent } from "@/lib/content";

export default async function HomePage() {
  const { site, bases, contact, founderQuote, gallery, groups, stats, teamMembers, trophies, values } =
    await getContent();

  // Primele 8 poze din galerie formează mozaicul de pe prima pagină.
  const mosaic = gallery.slice(0, 8);

  return (
    <>
      <Hero site={site} />
      <StatsBar stats={stats} />

      {/* 3 — De ce AS Dan Chilom -------------------------------------------- */}
      <section className="container-site py-20 lg:py-28">
        <SectionHeading
          eyebrow="De ce noi"
          title="Ce primește copilul tău la AS Dan Chilom"
          intro="Suntem un club mic prin alegere și serios prin structură. Totul e gândit ca un copil să vină cu drag la teren și să plece de fiecare dată puțin mai bun decât a venit."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value) => (
            <FeatureCard key={value.title} value={value} />
          ))}
        </div>
      </section>

      {/* 4 — Grupe ----------------------------------------------------------- */}
      <section className="border-y border-line bg-surface/60">
        <div className="container-site py-20 lg:py-28">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Grupe de vârstă"
              title="De la primii pași cu mingea, până la seniori"
              intro="Fiecare grupă are obiectivele ei. Copilul intră acolo unde îi e locul ca vârstă și nivel, apoi urcă firesc de la un an la altul."
            />
            <div className="hidden shrink-0 md:block">
              <TextLink href="/grupe">Toate grupele</TextLink>
            </div>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((group) => (
              <GroupCard key={group.slug} group={group} />
            ))}
          </div>

          <div className="mt-10 md:hidden">
            <TextLink href="/grupe">Toate grupele</TextLink>
          </div>
        </div>
      </section>

      {/* 5 — Cuvântul lui Dan Chilom ----------------------------------------- */}
      <section className="relative overflow-hidden bg-brand">
        <div aria-hidden className="stripes absolute inset-0 opacity-70" />
        <div className="container-site relative grid gap-12 py-20 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-20 lg:py-28">
          <blockquote className="max-w-2xl">
            <p className="font-display text-3xl uppercase leading-[1.15] text-white sm:text-4xl lg:text-5xl">
              „{founderQuote.text}”
            </p>
            <footer className="mt-8 border-t border-white/25 pt-6">
              <p className="font-display text-xl text-white">{founderQuote.author}</p>
              <p className="mt-1 text-sm text-white/80">{founderQuote.role}</p>
            </footer>
          </blockquote>

          <div className="relative mx-auto w-full max-w-sm lg:mx-0 lg:w-80">
            <Image
              src={founderQuote.image}
              alt={founderQuote.imageAlt}
              width={640}
              height={800}
              sizes="(min-width: 1024px) 20rem, 90vw"
              className="cut-corner w-full object-cover shadow-2xl shadow-black/40"
            />
          </div>
        </div>
      </section>

      {/* 6 — Palmares -------------------------------------------------------- */}
      <section className="container-site py-20 lg:py-28">
        <SectionHeading
          eyebrow="Palmares"
          title="Rezultate, acasă și în afară"
          intro="Trofeele nu sunt scopul, dar arată că munca de la antrenamente se vede în teren. Iată o parte dintre ele."
        />
        <TrophyList items={trophies} />
        <p className="mt-8 text-sm text-muted">
          Vrei povestea completă a clubului, din 2010 până azi?{" "}
          <Link href="/despre" className="font-semibold text-brand-soft underline underline-offset-4 hover:text-paper">
            Citește despre noi
          </Link>
          .
        </p>
      </section>

      {/* 7 — Baze de antrenament --------------------------------------------- */}
      <section className="border-y border-line bg-surface/60">
        <div className="container-site py-20 lg:py-28">
          <SectionHeading
            eyebrow="Unde ne antrenăm"
            title="Baze proprii, în Sectorul 2"
            intro="Terenuri cu nocturnă, vestiare și balon încălzit iarna. Antrenamentele nu se opresc din cauza vremii."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-2">
            {bases.map((base) => (
              <BaseCard key={base.slug} base={base} />
            ))}
          </div>
          <div className="mt-10">
            <TextLink href="/baze">Detalii și hărți</TextLink>
          </div>
        </div>
      </section>

      {/* 8 — Galerie --------------------------------------------------------- */}
      <section className="container-site py-20 lg:py-28">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Galerie"
            title="Așa arată o săptămână la club"
            intro="Antrenamente, meciuri, ploaie, nocturnă. Fără regie, doar copii care joacă fotbal."
          />
          <div className="hidden shrink-0 md:block">
            <TextLink href="/galerie">Toată galeria</TextLink>
          </div>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {mosaic.map((photo) => (
            <li key={photo.src} className="relative aspect-[4/5] overflow-hidden rounded-lg bg-surface-2">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 23vw, 46vw"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </li>
          ))}
        </ul>

        <div className="mt-10 md:hidden">
          <TextLink href="/galerie">Toată galeria</TextLink>
        </div>
      </section>

      {/* 8b — Membri staff ----------------------------------------------------- */}
      {teamMembers.length > 0 && (
        <section className="border-y border-line bg-surface/60">
          <div className="container-site py-20 lg:py-28">
            <SectionHeading
              eyebrow="Echipa"
              title="Membrii staff-ului"
              intro="Oamenii din spatele clubului — pe teren și în afara lui."
            />
            <div className="mt-14">
              <TeamCarousel members={teamMembers} />
            </div>
          </div>
        </section>
      )}

      {/* 9 — CTA final ------------------------------------------------------- */}
      <section className="relative isolate overflow-hidden border-t border-line bg-surface">
        <div aria-hidden className="stripes absolute inset-0 opacity-40" />
        <div className="container-site relative py-20 text-center lg:py-28">
          <SectionHeading
            align="center"
            eyebrow="Primul pas"
            title="Vino la un antrenament de probă"
            intro="Fără obligații și fără taxă. Veniți la teren, vedeți cum lucrăm, iar copilul vede dacă îi place. De acolo vorbim mai departe."
          />

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <ButtonPrimary href="/contact">
              Completează formularul
              <IconArrow className="size-4" />
            </ButtonPrimary>
            <ButtonGhost href={contact.phoneHref}>
              <IconPhone className="size-4" />
              {contact.phone}
            </ButtonGhost>
            <ButtonGhost href={contact.whatsappHref}>
              <IconWhatsapp className="size-4" />
              Scrie pe WhatsApp
            </ButtonGhost>
          </div>
        </div>
      </section>
    </>
  );
}
