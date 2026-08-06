import type { TeamMember } from "@/content/schema";
import { Photo } from "@/components/UI";

/**
 * Carusel orizontal cu scroll-snap — singura secțiune a site-ului care
 * folosește acest tipar (restul galeriilor sunt grid-uri), pentru că lista de
 * membri poate crește oricând din admin fără să strice un layout de grid fix.
 */
export function TeamCarousel({ members }: { members: TeamMember[] }) {
  return (
    <div className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 lg:gap-8">
      {members.map((member, i) => (
        <article key={i} className="w-36 shrink-0 snap-start text-center sm:w-44">
          {member.photo ? (
            <Photo
              src={member.photo}
              alt={member.name}
              ratio="aspect-square"
              className="rounded-full"
              sizes="(min-width: 640px) 176px, 144px"
            />
          ) : (
            <div className="aspect-square rounded-full border border-line bg-surface-2" />
          )}
          <p className="mt-4 text-base font-semibold text-paper">{member.name}</p>
          <p className="mt-1 text-xs uppercase tracking-wide text-brand-soft">{member.role}</p>
        </article>
      ))}
    </div>
  );
}
