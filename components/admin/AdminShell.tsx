"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV: { href: string; label: string }[] = [
  { href: "/admin", label: "Pagina principală" },
  { href: "/admin/general", label: "Informații generale" },
  { href: "/admin/contact", label: "Contact & social media" },
  { href: "/admin/date-juridice", label: "Date juridice" },
  { href: "/admin/statistici", label: "Bandă de statistici" },
  { href: "/admin/valori", label: "De ce AS Dan Chilom" },
  { href: "/admin/grupe", label: "Grupe de vârstă" },
  { href: "/admin/baze", label: "Baze de antrenament" },
  { href: "/admin/istoric", label: "Istoric club" },
  { href: "/admin/staff", label: "Staff tehnic" },
  { href: "/admin/citat", label: "Cuvântul lui Dan" },
  { href: "/admin/palmares", label: "Palmares" },
  { href: "/admin/galerie", label: "Galerie foto" },
  { href: "/admin/faq", label: "Întrebări frecvente" },
  { href: "/admin/analytics", label: "Trafic site" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-svh bg-ink lg:grid lg:grid-cols-[260px_1fr]">
      <header className="flex items-center justify-between border-b border-line bg-surface px-4 py-3 lg:hidden">
        <span className="font-display text-lg uppercase text-paper">Admin ASDC</span>
        <Link href="/" className="text-sm text-brand-soft underline underline-offset-4">
          Vezi site-ul
        </Link>
      </header>

      <nav className="border-b border-line bg-surface px-2 py-2 lg:min-h-svh lg:border-b-0 lg:border-r lg:px-4 lg:py-6">
        <div className="hidden px-2 pb-6 lg:block">
          <p className="font-display text-xl uppercase text-paper">Admin ASDC</p>
          <p className="mt-1 text-xs text-muted">Editează conținutul site-ului</p>
        </div>
        <ul className="flex gap-1 overflow-x-auto no-scrollbar lg:flex-col lg:gap-0.5 lg:overflow-visible">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <li key={item.href} className="shrink-0">
                <Link
                  href={item.href}
                  className={`block whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium ${
                    active
                      ? "bg-brand/15 text-paper"
                      : "text-muted hover:bg-surface-2 hover:text-paper"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="mt-4 hidden gap-2 px-2 lg:flex lg:flex-col">
          <Link href="/" className="text-sm text-brand-soft underline underline-offset-4">
            Vezi site-ul
          </Link>
          <button
            type="button"
            onClick={logout}
            className="w-fit text-sm text-muted underline underline-offset-4 hover:text-paper"
          >
            Ieși din cont
          </button>
        </div>
      </nav>

      <main className="px-4 py-8 sm:px-8 lg:py-10">
        <div className="mx-auto max-w-3xl">{children}</div>
      </main>

      <div className="border-t border-line px-4 py-4 lg:hidden">
        <button
          type="button"
          onClick={logout}
          className="text-sm text-muted underline underline-offset-4"
        >
          Ieși din cont
        </button>
      </div>
    </div>
  );
}
