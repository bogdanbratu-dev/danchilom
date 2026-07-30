# AS Dan Chilom Academy — site de prezentare

Site pentru academia de fotbal juvenil AS Dan Chilom (București, din 2011).
Construit mobile-first, cu accent pe înscrieri: telefon, WhatsApp și formular,
disponibile din orice punct al site-ului.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · deploy pe Vercel.

---

## Rulare locală

```bash
npm install
npm run dev
```

Site-ul pornește pe <http://localhost:3000>.

Ca să-l testezi **de pe telefon**, pe aceeași rețea Wi-Fi:

```bash
npm run dev -- -H 0.0.0.0
```

apoi deschizi pe telefon `http://IP-UL-CALCULATORULUI:3000` (îl afli cu `ipconfig`).

Alte comenzi:

```bash
npm run build   # build de producție + verificare TypeScript și ESLint
npm run start   # rulează build-ul de producție local
npm run lint
```

---

## Unde se schimbă conținutul

**Tot conținutul site-ului — texte, linkuri și poze — se editează din panoul de
administrare, la `/admin`.** Nu mai e nevoie să umbli prin cod: Dan (sau oricine altcineva)
poate schimba orice, direct din browser, de pe telefon sau calculator.

1. Deschizi `https://domeniul-tau.ro/admin` (sau `http://localhost:3000/admin` local).
2. Introduci parola din variabila de mediu `ADMIN_PASSWORD`.
3. Alegi secțiunea (Informații generale, Contact, Grupe, Baze, Galerie foto etc.),
   modifici ce trebuie și apeși **Salvează modificările** — site-ul se actualizează
   imediat, fără nicio republicare.

Fără `ADMIN_PASSWORD` configurat, `/admin` e dezactivat automat — vezi
[`.env.local.example`](.env.local.example).

### Cum sunt stocate modificările

Codul site-ului stă în acest repo (git → Vercel), dar **conținutul** (tot ce se editează
din `/admin`, inclusiv pozele încărcate) e stocat separat, pe **Vercel Blob** — de-asta
apar imediat, fără să fie nevoie de un build nou. Fără Blob conectat (nici
`BLOB_READ_WRITE_TOKEN`, nici `BLOB_STORE_ID`), modificările se salvează doar local pe
disc (`content/data.json` + `public/img/uploads/`),
util pentru dezvoltare, dar **nu suficient pentru producție**: la Vercel, discul e
resetat la fiecare redeploy. Vezi secțiunea „Publicare pe Vercel" mai jos.

Pentru dezvoltatori: schemele de date și structura fiecărei secțiuni sunt în
[`content/schema.ts`](content/schema.ts); valorile inițiale (folosite doar dacă nu s-a
salvat încă nimic din admin) sunt în [`content/defaults.ts`](content/defaults.ts).

Ce a mai rămas de confirmat cu Dan (acum se rezolvă direct din `/admin`, nu mai e nevoie
de aprobarea mea) e listat în [`CONTENT-TODO.md`](CONTENT-TODO.md).

---

## Formularul de înscriere

Formularul de pe `/contact` trimite datele către ruta `POST /api/inscriere`, care le
expediază prin email folosind [Resend](https://resend.com).

**Fără configurare, site-ul funcționează perfect.** Dacă `RESEND_API_KEY` lipsește,
formularul afișează varianta de rezervă — butoane de telefon și WhatsApp — deci niciun
părinte nu rămâne fără o cale de contact.

### Activarea emailului (~5 minute, după cumpărarea domeniului)

1. Cont gratuit pe [resend.com](https://resend.com) (3.000 emailuri/lună, suficient).
2. Adaugi domeniul în Resend și pui în DNS înregistrările cerute (SPF, DKIM).
3. Copiezi cheia de API.
4. Local: copiezi `.env.local.example` în `.env.local` și completezi valorile.
5. Pe Vercel: **Settings → Environment Variables**, adaugi aceleași variabile și
   redeployezi.

| Variabilă | Rol |
|---|---|
| `RESEND_API_KEY` | Cheia de API din Resend |
| `CONTACT_TO_EMAIL` | Adresa pe care ajung înscrierile |
| `CONTACT_FROM_EMAIL` | Expeditorul (după verificarea domeniului) |

Formularul are un câmp-capcană ascuns împotriva boților și validează datele și pe server,
nu doar în browser.

---

## Publicare pe Vercel

1. Pui proiectul pe GitHub (fără folderul `poze/` dacă vrei repo-ul mai mic — dar el e
   oricum ignorat la build).
2. [vercel.com](https://vercel.com) → **Add New → Project** → alegi repo-ul.
   Vercel detectează singur Next.js; nu trebuie schimbată nicio setare.
3. **Storage → Create Database → Blob** (din dashboard-ul proiectului) → creezi un store
   nou și îl conectezi la proiect. Vercel adaugă automat `BLOB_STORE_ID` (autentificare
   OIDC, fără un token static) în variabilele de mediu ale proiectului — necesar ca
   modificările din `/admin` să rămână salvate definitiv, nu doar local pe disc.
4. **Settings → Environment Variables** → adaugi `ADMIN_PASSWORD` cu parola aleasă pentru
   panoul de administrare.
5. **Deploy.** Site-ul e live pe un subdomeniu `.vercel.app`.

### Legarea domeniului cumpărat

1. Vercel → proiect → **Settings → Domains** → adaugi domeniul.
2. La registrar (ROTLD, Namecheap, GoDaddy…) pui înregistrările DNS afișate de Vercel:
   de regulă un `A` pentru domeniul principal și un `CNAME` pentru `www`.
3. Certificatul HTTPS se emite automat, în câteva minute.
4. **Important:** actualizezi „Adresa web a site-ului" din `/admin` → Informații generale
   cu domeniul real — de acolo se generează `sitemap.xml`, datele structurate pentru
   Google și linkurile de partajare.

### După lansare

- Trimiți `https://domeniu.ro/sitemap.xml` în [Google Search Console](https://search.google.com/search-console).
- Creezi/revendici fișa **Google Business Profile** pentru fiecare bază — pentru căutări
  de tip „școală de fotbal copii București”, fișa Google contează cel puțin cât site-ul.
- Pui linkul site-ului în descrierea paginii de Facebook.

---

## Structura proiectului

```
app/
  layout.tsx                       antet, subsol, fonturi, SEO, date structurate
  page.tsx                         prima pagină
  despre/ grupe/ baze/ galerie/    paginile interioare
  contact/                         date de contact + formular de înscriere
  politica-de-confidentialitate/
  admin/                           panoul de administrare (necesită ADMIN_PASSWORD)
  api/inscriere/route.ts           primește formularul și trimite emailul
  api/admin/                       autentificare, salvare conținut, upload poze
  sitemap.ts robots.ts             SEO
  opengraph-image.tsx icon.tsx     imaginile de partajare și favicon, generate din logo
  apple-icon.tsx                   (dinamic — se actualizează dacă logo-ul se schimbă din admin)
  globals.css                      culorile și utilitarele proprii
components/                        componentele reutilizabile
components/admin/                  formularele și piesele panoului de administrare
content/schema.ts                  forma fiecărei secțiuni de conținut (validare + tipuri)
content/defaults.ts                valorile inițiale, folosite până se salvează ceva din admin
lib/content.ts lib/content-store.ts   citirea/scrierea conținutului (Vercel Blob sau local)
lib/admin-auth.ts middleware.ts    autentificarea panoului de administrare
public/img/                        blazonul și pozele publicate
poze/                              pozele originale (nepublicate)
```

## Note de design

- Paleta vine din blazon: negru profund, magenta `#E6007E`, alb.
- Titlurile folosesc Oswald, textul Inter — ambele self-hosted prin `next/font`, cu
  suport pentru diacriticele românești, fără request către servere externe.
- Toate pozele clubului sunt postări de social media în format portret 4:5, cu ramă
  magenta. Designul e construit în jurul acestei constrângeri: pozele apar în carduri și
  mozaicuri la raportul lor nativ, iar acolo unde se folosesc pe toată lățimea, rama e
  decupată prin scalare.
- Pe mobil există o bară fixă jos cu **Sună · WhatsApp · Înscrie copilul**, mereu la
  îndemână.
