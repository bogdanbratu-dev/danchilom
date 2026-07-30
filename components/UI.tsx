import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { IconArrow } from "./Icons";

/* -------------------------------------------------------------------------- */
/*  Titlu de secțiune                                                          */
/* -------------------------------------------------------------------------- */

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && (
        <p
          className={`flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-brand-soft ${
            align === "center" ? "justify-center" : ""
          }`}
        >
          <span aria-hidden className="h-px w-8 bg-brand" />
          {eyebrow}
        </p>
      )}
      <h2 className="h-section mt-4 text-balance">{title}</h2>
      {intro && <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">{intro}</p>}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Butoane                                                                    */
/* -------------------------------------------------------------------------- */

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold uppercase tracking-wide transition-colors min-h-12";

/**
 * `tel:` și `mailto:` sunt linkuri native (fără target="_blank", altfel se
 * deschide un tab gol pe mobil), `http(s)` se deschid în tab nou, restul
 * merg prin <Link> ca navigare internă.
 */
function LinkOrAnchor({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: ReactNode;
}) {
  if (/^(tel:|mailto:)/.test(href)) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  if (/^https?:\/\//.test(href)) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function ButtonPrimary({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <LinkOrAnchor href={href} className={`${buttonBase} bg-brand text-white hover:bg-brand-soft ${className}`}>
      {children}
    </LinkOrAnchor>
  );
}

export function ButtonGhost({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <LinkOrAnchor
      href={href}
      className={`${buttonBase} border border-line bg-white/5 text-paper hover:border-brand hover:text-brand-soft ${className}`}
    >
      {children}
    </LinkOrAnchor>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-brand-soft transition-colors hover:text-paper"
    >
      {children}
      <IconArrow className="size-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/*  Fotografie                                                                 */
/*                                                                             */
/*  Toate pozele clubului sunt postări sociale 4:5 cu ramă magenta.            */
/*  `zoom` decupează rama când imaginea e folosită full-bleed (hero, fundal).  */
/* -------------------------------------------------------------------------- */

export function Photo({
  src,
  alt,
  className = "",
  sizes = "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw",
  priority = false,
  zoom = false,
  ratio = "aspect-[4/5]",
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  zoom?: boolean;
  ratio?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-surface-2 ${ratio} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${zoom ? "scale-[1.06]" : ""}`}
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Antetul paginilor interioare                                               */
/* -------------------------------------------------------------------------- */

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt = "",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-line">
      {image && (
        <>
          <Image
            src={image}
            alt={imageAlt}
            aria-hidden={imageAlt === "" ? true : undefined}
            fill
            priority
            sizes="100vw"
            className="-z-20 scale-110 object-cover object-center"
          />
          <div aria-hidden className="absolute inset-0 -z-10 bg-ink/80" />
        </>
      )}
      <div aria-hidden className="stripes absolute inset-0 -z-10 opacity-50" />

      <div className="container-site pb-14 pt-28 sm:pb-20 lg:pb-24 lg:pt-40">
        <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-brand-soft">
          <span aria-hidden className="h-px w-8 bg-brand" />
          {eyebrow}
        </p>
        <h1 className="h-section mt-5 max-w-4xl text-balance">{title}</h1>
        {intro && (
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">{intro}</p>
        )}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Separator cu dungile din blazon                                            */
/* -------------------------------------------------------------------------- */

export function StripeDivider() {
  return <div aria-hidden className="stripes h-1.5 w-full bg-brand/20" />;
}
