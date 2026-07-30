import type { Metadata } from "next";
import { PageHero } from "@/components/UI";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Politica de confidențialitate",
  description:
    "Cum prelucrează AS Dan Chilom datele personale trimise prin formularul de înscriere de pe site.",
  alternates: { canonical: "/politica-de-confidentialitate" },
  robots: { index: false, follow: true },
};

// Denumirea juridică, CIF-ul și sediul social se editează din admin (secțiunea
// „Date juridice”) — sunt obligatorii într-o politică GDPR reală.
export default async function PoliticaPage() {
  const { contact, site, legal } = await getContent();

  return (
    <>
      <PageHero
        eyebrow="Informare GDPR"
        title="Politica de confidențialitate"
        intro="Colectăm strict datele necesare ca să te putem contacta în legătură cu înscrierea copilului. Nimic mai mult."
      />

      <article className="container-site max-w-3xl space-y-10 py-16 text-base leading-relaxed text-muted lg:py-24">
        <section>
          <h2 className="text-xl text-paper">Cine prelucrează datele</h2>
          <p className="mt-4">
            {legal.entityName || site.longName}
            {legal.cif ? ` (CIF ${legal.cif})` : ""}
            {legal.registeredAddress ? `, cu sediul în ${legal.registeredAddress}` : ", cu punctele de lucru din București, Sectorul 2"}
            . Ne poți contacta la{" "}
            <a href={contact.phoneHref} className="text-brand-soft underline underline-offset-4">
              {contact.phone}
            </a>{" "}
            sau la{" "}
            <a href={contact.emailHref} className="text-brand-soft underline underline-offset-4">
              {contact.email}
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl text-paper">Ce date colectăm</h2>
          <p className="mt-4">
            Doar datele pe care le completezi în formularul de înscriere: numele copilului și
            anul nașterii, numele părintelui sau al tutorelui, numărul de telefon, adresa de
            email (opțional), baza preferată și mesajul scris de tine.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-paper">De ce le colectăm</h2>
          <p className="mt-4">
            Ca să te putem contacta, să stabilim antrenamentul de probă și să îți spunem în ce
            grupă s-ar potrivi copilul. Temeiul prelucrării este consimțământul tău, exprimat
            prin bifarea căsuței din formular.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-paper">Cui ajung datele</h2>
          <p className="mt-4">
            Mesajul din formular ne este livrat prin email. Pentru trimiterea lui folosim
            serviciul Resend, iar site-ul este găzduit de Vercel — ambele acționează ca
            împuterniciți și nu folosesc datele în alte scopuri. Nu vindem și nu transmitem
            datele către alți terți.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-paper">Cât timp le păstrăm</h2>
          <p className="mt-4">
            Păstrăm cererile de înscriere cât timp este necesar pentru a răspunde și pentru
            eventuala înscriere a copilului. Dacă nu se concretizează o înscriere, ștergem
            datele la cerere sau, oricum, în maximum 12 luni.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-paper">Drepturile tale</h2>
          <p className="mt-4">
            Conform Regulamentului (UE) 2016/679, ai dreptul de acces la date, de rectificare,
            de ștergere, de restricționare a prelucrării, de portabilitate, dreptul de a te
            opune prelucrării și de a-ți retrage oricând consimțământul. Te poți adresa nouă la
            datele de contact de mai sus sau Autorității Naționale de Supraveghere a
            Prelucrării Datelor cu Caracter Personal.
          </p>
        </section>

        <section>
          <h2 className="text-xl text-paper">Cookie-uri</h2>
          <p className="mt-4">
            Site-ul nu folosește cookie-uri de urmărire și nu are instrumente de publicitate.
            Hărțile încorporate de la Google Maps, de pe pagina de baze, pot seta cookie-uri
            proprii atunci când sunt încărcate.
          </p>
        </section>

        <p className="border-t border-line pt-8 text-sm">
          Ultima actualizare: iulie 2026.
        </p>
      </article>
    </>
  );
}
