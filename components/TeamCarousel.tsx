import Image from "next/image";
import type { TeamMember } from "@/content/schema";

/**
 * Carusel orizontal cu scroll-snap — singura secțiune a site-ului care
 * folosește acest tipar (restul galeriilor sunt grid-uri), pentru că lista de
 * membri poate crește oricând din admin fără să strice un layout de grid fix.
 *
 * Pozele sunt portrete integrale (nu doar cap-umeri), deci folosim
 * `object-contain` într-un cadru dreptunghiular — o decupare circulară cu
 * `object-cover` ar tăia capul multor persoane.
 */
export function TeamCarousel({ members }: { members: TeamMember[] }) {
  return (
    <div className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 lg:gap-8">
      {members.map((member, i) => (
        <article key={i} className="w-40 shrink-0 snap-start text-center sm:w-48">
          <div className="relative aspect-[3/4] overflow-hidden rounded-xl border border-line bg-surface-2">
            {member.photo ? (
              <Image
                src={member.photo}
                alt={member.name}
                fill
                sizes="(min-width: 640px) 192px, 160px"
                className="object-contain"
              />
            ) : null}
          </div>
          <p className="mt-4 text-base font-semibold text-paper">{member.name}</p>
          <p className="mt-1 text-xs uppercase tracking-wide text-brand-soft">{member.role}</p>
        </article>
      ))}
    </div>
  );
}
