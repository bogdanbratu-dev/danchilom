import Link from "next/link";

const SECTIONS: { href: string; title: string; desc: string }[] = [
  { href: "/admin/general", title: "Informații generale", desc: "Nume, deviza, anul înființării, logo, poza din capul paginii principale." },
  { href: "/admin/contact", title: "Contact & social media", desc: "Telefon, WhatsApp, email, Facebook, Instagram, program." },
  { href: "/admin/date-juridice", title: "Date juridice", desc: "Denumire, CIF, sediu — apar în politica de confidențialitate." },
  { href: "/admin/statistici", title: "Bandă de statistici", desc: "Numerele afișate pe prima pagină (ex: din 2011, 2 baze...)." },
  { href: "/admin/valori", title: "De ce AS Dan Chilom", desc: "Cele 6 motive pentru care părinții aleg clubul." },
  { href: "/admin/grupe", title: "Grupe de vârstă", desc: "Categoriile de copii, program, poze." },
  { href: "/admin/baze", title: "Baze de antrenament", desc: "Adrese, dotări, poze, hărți." },
  { href: "/admin/istoric", title: "Istoric club", desc: "Momentele importante din evoluția clubului." },
  { href: "/admin/staff", title: "Staff tehnic", desc: "Antrenori, licențe, poze." },
  { href: "/admin/citat", title: "Cuvântul lui Dan", desc: "Citatul și poza de pe prima pagină." },
  { href: "/admin/palmares", title: "Palmares", desc: "Trofeele naționale și internaționale." },
  { href: "/admin/galerie", title: "Galerie foto", desc: "Toate pozele din galeria publică." },
  { href: "/admin/faq", title: "Întrebări frecvente", desc: "Întrebările de pe pagina de grupe." },
];

export default function AdminHomePage() {
  const blobConfigured = Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID);

  return (
    <div>
      <h1 className="font-display text-3xl uppercase text-paper">Bine ai venit</h1>
      <p className="mt-2 text-muted">
        Aici poți schimba orice text, poză sau link de pe site. Alege mai jos ce vrei să editezi —
        modificările apar pe site imediat ce apeși „Salvează”.
      </p>

      {!blobConfigured && (
        <p className="mt-6 rounded-lg border border-brand/40 bg-brand/10 px-4 py-3 text-sm text-paper">
          Stocarea permanentă (Vercel Blob) nu este configurată — modificările se salvează doar
          local, pe acest calculator. Cere-i dezvoltatorului să configureze <code>BLOB_READ_WRITE_TOKEN</code>{" "}
          înainte de lansarea site-ului, ca modificările din admin să nu se piardă la o publicare nouă.
        </p>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {SECTIONS.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="rounded-xl border border-line bg-surface p-5 hover:border-brand-soft"
          >
            <p className="font-semibold text-paper">{s.title}</p>
            <p className="mt-1 text-sm text-muted">{s.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
