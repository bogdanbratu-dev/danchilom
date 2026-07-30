import Link from "next/link";
import type { Base, Coach, Group, Trophy, Value } from "@/content/schema";
import { IconArrow, IconCheck, IconPin, ValueIcon } from "./Icons";
import { Photo } from "./UI";

/* -------------------------------------------------------------------------- */
/*  De ce AS Dan Chilom                                                        */
/* -------------------------------------------------------------------------- */

export function FeatureCard({ value }: { value: Value }) {
  return (
    <article className="cut-corner h-full border border-line bg-surface p-7 transition-colors hover:border-brand/60">
      <span className="grid size-12 place-items-center rounded-full bg-brand/15 text-brand-soft">
        <ValueIcon name={value.icon} className="size-6" />
      </span>
      <h3 className="mt-5 text-xl">{value.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{value.text}</p>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/*  Grupe                                                                      */
/* -------------------------------------------------------------------------- */

export function GroupCard({ group }: { group: Group }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface transition-colors hover:border-brand/60">
      <Photo
        src={group.image}
        alt={group.imageAlt}
        ratio="aspect-[4/3]"
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 92vw"
        zoom
      />
      <div className="flex flex-1 flex-col p-7">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-soft">
          {group.ages}
        </p>
        <h3 className="mt-2 text-2xl">{group.name}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{group.summary}</p>
        <p className="mt-5 border-t border-line pt-5 text-sm text-paper/80">{group.sessions}</p>
        <Link
          href={`/grupe#${group.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-brand-soft transition-colors hover:text-paper"
        >
          Detalii despre grupă
          <IconArrow className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/*  Baze de antrenament                                                        */
/* -------------------------------------------------------------------------- */

export function mapsUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function wazeUrl(query: string) {
  return `https://waze.com/ul?q=${encodeURIComponent(query)}`;
}

export function BaseCard({ base }: { base: Base }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface">
      <Photo
        src={base.images[0].src}
        alt={base.images[0].alt}
        ratio="aspect-[4/3]"
        sizes="(min-width: 1024px) 45vw, 92vw"
        zoom
      />
      <div className="flex flex-1 flex-col p-7">
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-soft">
          <IconPin className="size-4" />
          {base.area}
        </p>
        <h3 className="mt-3 text-2xl">{base.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{base.address}</p>

        <ul className="mt-6 flex-1 space-y-2.5 text-sm">
          {base.facilities.map((f) => (
            <li key={f} className="flex gap-3">
              <IconCheck className="mt-0.5 size-4 shrink-0 text-brand" />
              <span className="text-paper/85">{f}</span>
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap gap-3">
          <a
            href={mapsUrl(base.mapsQuery)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center rounded-full border border-line px-5 text-xs font-bold uppercase tracking-wide transition-colors hover:border-brand hover:text-brand-soft"
          >
            Google Maps
          </a>
          <a
            href={wazeUrl(base.mapsQuery)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center rounded-full border border-line px-5 text-xs font-bold uppercase tracking-wide transition-colors hover:border-brand hover:text-brand-soft"
          >
            Waze
          </a>
        </div>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/*  Staff                                                                      */
/* -------------------------------------------------------------------------- */

export function CoachCard({ coach }: { coach: Coach }) {
  return (
    <article className="cut-corner h-full border border-line bg-surface p-7">
      {coach.photo ? (
        <Photo
          src={coach.photo}
          alt={coach.name}
          ratio="aspect-square"
          className="mb-5 w-20 rounded-full"
          sizes="80px"
        />
      ) : null}
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-soft">
        {coach.license}
      </p>
      <h3 className="mt-3 text-2xl">{coach.name}</h3>
      <p className="mt-1 text-sm uppercase tracking-wide text-muted">{coach.role}</p>
      <p className="mt-5 text-sm leading-relaxed text-muted">{coach.bio}</p>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/*  Palmares                                                                   */
/* -------------------------------------------------------------------------- */

export function TrophyList({ items }: { items: Trophy[] }) {
  return (
    <ol className="mt-12 border-t border-line">
      {items.map((t) => (
        <li
          key={`${t.year}-${t.title}`}
          className="flex flex-col gap-1 border-b border-line py-5 sm:flex-row sm:items-baseline sm:gap-8"
        >
          <span className="font-display text-lg text-brand-soft sm:w-32 sm:shrink-0">
            {t.year}
          </span>
          <span className="text-base text-paper/90">{t.title}</span>
          <span className="text-xs uppercase tracking-[0.16em] text-muted sm:ml-auto sm:shrink-0">
            {t.scope === "international" ? "Internațional" : "Național"}
          </span>
        </li>
      ))}
    </ol>
  );
}
