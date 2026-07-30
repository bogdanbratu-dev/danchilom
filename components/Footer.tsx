import Link from "next/link";
import type { Base, Contact, NavItem, Site } from "@/content/schema";
import { Crest } from "./Crest";
import { IconClock, IconFacebook, IconInstagram, IconMail, IconPhone, IconPin } from "./Icons";

export function Footer({
  site,
  contact,
  nav,
  bases,
}: {
  site: Site;
  contact: Contact;
  nav: NavItem[];
  bases: Base[];
}) {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-site grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-4 lg:py-18">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3">
            <Crest src={site.logo} size={56} />
            <div>
              <p className="font-display text-xl">AS Dan Chilom</p>
              <p className="text-xs uppercase tracking-[0.18em] text-muted">
                Din {site.foundedYear}
              </p>
            </div>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-muted">{site.tagline}</p>
          <p className="mt-4 font-display text-sm text-brand-soft">{site.motto}</p>

          <div className="mt-6 flex gap-3">
            <a
              href={contact.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pagina de Facebook AS Dan Chilom"
              className="grid size-11 place-items-center rounded-full border border-line transition-colors hover:border-brand hover:text-brand-soft"
            >
              <IconFacebook className="size-5" />
            </a>
            {contact.instagram && (
              <a
                href={contact.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram AS Dan Chilom"
                className="grid size-11 place-items-center rounded-full border border-line transition-colors hover:border-brand hover:text-brand-soft"
              >
                <IconInstagram className="size-5" />
              </a>
            )}
          </div>
        </div>

        <div>
          <h2 className="font-display text-sm tracking-[0.18em] text-muted">Navigare</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-paper/85 transition-colors hover:text-brand-soft">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm tracking-[0.18em] text-muted">Contact</h2>
          <ul className="mt-5 space-y-4 text-sm">
            <li>
              <a href={contact.phoneHref} className="flex items-center gap-3 transition-colors hover:text-brand-soft">
                <IconPhone className="size-5 shrink-0 text-brand" />
                {contact.phone}
              </a>
            </li>
            <li>
              <a href={contact.emailHref} className="flex items-center gap-3 break-all transition-colors hover:text-brand-soft">
                <IconMail className="size-5 shrink-0 text-brand" />
                {contact.email}
              </a>
            </li>
            <li className="flex items-center gap-3 text-muted">
              <IconClock className="size-5 shrink-0 text-brand" />
              {contact.schedule}
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm tracking-[0.18em] text-muted">Baze de antrenament</h2>
          <ul className="mt-5 space-y-4 text-sm">
            {bases.map((b) => (
              <li key={b.slug} className="flex gap-3">
                <IconPin className="mt-0.5 size-5 shrink-0 text-brand" />
                <span>
                  <span className="block font-semibold">{b.name}</span>
                  <span className="block text-muted">{b.address}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-site flex flex-col gap-3 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.longName}. Toate drepturile rezervate.
          </p>
          <Link href="/politica-de-confidentialitate" className="transition-colors hover:text-brand-soft">
            Politica de confidențialitate
          </Link>
        </div>
      </div>

      {/* Spațiu ca bara fixă de pe mobil să nu acopere finalul paginii */}
      <div aria-hidden className="h-16 lg:hidden" />
    </footer>
  );
}
