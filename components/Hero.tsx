import Image from "next/image";
import type { Site } from "@/content/schema";
import { Crest } from "./Crest";
import { ButtonGhost, ButtonPrimary } from "./UI";
import { IconArrow } from "./Icons";

/**
 * Toate pozele clubului sunt portret 4:5 cu ramă magenta. Într-un hero lat,
 * `object-cover` le decupează pe verticală, dar rama ar rămâne vizibilă pe
 * margini — de aceea imaginea e scalată la 110%, ca rama să iasă din cadru.
 */
export function Hero({ site }: { site: Site }) {
  return (
    <section className="relative isolate flex min-h-[88svh] items-end overflow-hidden lg:min-h-[92vh]">
      <Image
        src={site.heroImage}
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="-z-20 scale-110 object-cover object-center"
      />

      {/* Întunecare puternică: textul trebuie să rămână lizibil pe orice zonă a pozei */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/85 to-ink/45"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/40 to-transparent"
      />
      <div aria-hidden className="stripes absolute inset-0 -z-10 opacity-60" />

      <div className="container-site pb-14 pt-28 sm:pb-20 lg:pb-28 lg:pt-36">
        <div className="max-w-3xl animate-rise">
          <div className="flex items-center gap-4">
            <Crest src={site.logo} size={76} priority />
            <p className="text-xs font-bold uppercase leading-relaxed tracking-[0.2em] text-brand-soft">
              Școală de fotbal pentru copii
              <span className="block text-paper/70">București · din {site.foundedYear}</span>
            </p>
          </div>

          <h1 className="h-hero mt-7 text-balance">
            AS Dan
            <span className="block text-brand-soft">Chilom</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper/85 sm:text-xl">
            {site.tagline}
          </p>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-muted">
            Antrenori licențiați UEFA, competiții oficiale AMFB și un drum complet, de la
            primii pași cu mingea până la echipa de seniori.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonPrimary href="/contact">
              Înscrie copilul
              <IconArrow className="size-4" />
            </ButtonPrimary>
            <ButtonGhost href="/grupe">Vezi grupele</ButtonGhost>
          </div>

          <p className="mt-10 font-display text-sm uppercase tracking-[0.18em] text-paper/60">
            „{site.motto}”
          </p>
        </div>
      </div>
    </section>
  );
}
