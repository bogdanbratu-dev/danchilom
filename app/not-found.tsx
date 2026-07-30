import type { Metadata } from "next";
import { ButtonGhost, ButtonPrimary } from "@/components/UI";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Pagina nu a fost găsită",
  robots: { index: false, follow: false },
};

export default async function NotFound() {
  const { contact } = await getContent();

  return (
    <section className="container-site flex min-h-[70svh] flex-col justify-center py-24 text-center">
      <p className="font-display text-6xl text-brand-soft">404</p>
      <h1 className="h-section mt-6">Pagina asta nu există</h1>
      <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted">
        Probabil linkul e greșit sau pagina a fost mutată. Poți începe de la prima pagină sau
        ne poți suna direct.
      </p>
      <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
        <ButtonPrimary href="/">Înapoi la prima pagină</ButtonPrimary>
        <ButtonGhost href={contact.phoneHref}>Sună la {contact.phone}</ButtonGhost>
      </div>
    </section>
  );
}
