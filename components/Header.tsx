"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Contact, NavItem, Site } from "@/content/schema";
import { Crest } from "./Crest";
import { IconClose, IconMenu, IconPhone } from "./Icons";

export function Header({
  site,
  contact,
  nav,
}: {
  site: Site;
  contact: Contact;
  nav: NavItem[];
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Închide meniul la schimbarea paginii
  useEffect(() => setOpen(false), [pathname]);

  // Blochează scroll-ul în spatele meniului deschis
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Escape închide meniul
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "border-b border-line bg-ink/95 backdrop-blur-md"
          : "border-b border-transparent bg-gradient-to-b from-ink/90 to-transparent"
      }`}
    >
      <div className="container-site flex h-16 items-center justify-between gap-4 md:h-20">
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label={`${site.name} — pagina principală`}
        >
          <Crest src={site.logo} size={44} priority />
          <span className="leading-none">
            <span className="block font-display text-lg tracking-tight md:text-xl">
              AS Dan Chilom
            </span>
            <span className="mt-0.5 block text-[10px] uppercase tracking-[0.18em] text-muted md:text-[11px]">
              Academie de fotbal · București
            </span>
          </span>
        </Link>

        {/* Navigație desktop */}
        <nav aria-label="Navigație principală" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`relative rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-paper ${
                    isActive(item.href) ? "text-paper" : "text-muted"
                  }`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-0.5 bg-brand" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={contact.phoneHref}
            className="hidden items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold transition-colors hover:border-brand hover:text-brand-soft sm:inline-flex"
          >
            <IconPhone className="size-4" />
            {contact.phone}
          </a>
          <Link
            href="/contact"
            className="hidden rounded-full bg-brand px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-soft lg:inline-block"
          >
            Înscrie copilul
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="meniu-mobil"
            aria-label={open ? "Închide meniul" : "Deschide meniul"}
            className="grid size-11 place-items-center rounded-lg border border-line text-paper transition-colors hover:border-brand lg:hidden"
          >
            {open ? <IconClose className="size-6" /> : <IconMenu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Meniu mobil */}
      <div
        id="meniu-mobil"
        hidden={!open}
        className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-ink lg:hidden"
      >
        <nav aria-label="Navigație mobilă" className="container-site py-6">
          <ul className="flex flex-col gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`flex items-center justify-between border-b border-line py-4 font-display text-2xl transition-colors ${
                    isActive(item.href) ? "text-brand-soft" : "text-paper"
                  }`}
                >
                  {item.label}
                  <span aria-hidden className="text-brand">
                    /
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/contact"
            className="mt-8 block rounded-xl bg-brand px-6 py-4 text-center font-display text-xl text-white"
          >
            Înscrie copilul
          </Link>

          <a
            href={contact.phoneHref}
            className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-line px-6 py-4 text-center font-semibold"
          >
            <IconPhone className="size-5" />
            {contact.phone}
          </a>

          <p className="mt-6 text-center text-sm text-muted">{site.motto}</p>
        </nav>
      </div>
    </header>
  );
}
