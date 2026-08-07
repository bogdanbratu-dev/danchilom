# AS Dan Chilom Academy — site de prezentare

Site Next.js pentru o academie de fotbal juvenil din București (client: Dan Chilom,
prin utilizator interpus — vezi memory pentru context). Detalii tehnice complete în
[README.md](README.md); ce trebuie confirmat de Dan înainte de lansare, în
[CONTENT-TODO.md](CONTENT-TODO.md). Planul original aprobat de utilizator (context,
research, decizii) e la:
`C:\Users\bogda\.claude\plans\as-vrea-sa-construiesc-inherited-acorn.md`.

## Stack

Next.js 15 (App Router) + React 19 + TypeScript strict + Tailwind CSS v4 (config CSS-first
prin `@theme`/`@utility` în [app/globals.css](app/globals.css), fără `tailwind.config.js`).
Deploy țintă: Vercel (gratuit). Fonturi: Oswald (titluri) + Inter (text), via `next/font/google`
cu subset `latin-ext` — obligatoriu pentru diacriticele românești (ă â î ș ț).

`create-next-app` nu a mers (nume de folder cu majusculă → interzis de npm); setup-ul e
manual, scris de mână. Nu reîncerca scaffolding-ul.

## Sursa de conținut și panoul de administrare

Conținutul site-ului **nu mai e static**. Dan (sau oricine, indiferent de nivel tehnic)
editează tot — texte, linkuri, poze — din `/admin`, protejat cu o parolă (`ADMIN_PASSWORD`).
Arhitectura:

- [content/schema.ts](content/schema.ts) — schema Zod + tipurile TypeScript pentru fiecare
  secțiune de conținut (site, contact, legal, stats, values, groups, bases, timeline,
  staff, founderQuote, trophies, gallery, faq, nav).
- [content/defaults.ts](content/defaults.ts) — valorile inițiale (seed), migrate din
  vechiul `content/site.ts`. Se folosesc doar pentru câmpurile care lipsesc din ce s-a
  salvat deja din admin — nu se editează manual după lansare.
- [lib/content-store.ts](lib/content-store.ts) — citește/scrie conținutul (JSON) și
  imaginile încărcate: pe **Vercel Blob** dacă `BLOB_READ_WRITE_TOKEN` e configurat,
  altfel local (`content/data.json` + `public/img/uploads/`, ambele gitignored). Fiecare
  scriere salvează automat starea anterioară ca o copie de siguranță (până la 30, cu
  purjare automată a celor mai vechi) — vizibile și restaurabile cu un click din
  `/admin/backups`. Restaurarea e la rândul ei reversibilă (salvează starea curentă
  înainte de a suprascrie). Nu există alt mecanism de recuperare — dacă vreodată e nevoie
  de o versiune mai veche de 30 de salvări, nu mai poate fi adusă înapoi de acolo.
- [lib/content.ts](lib/content.ts) — `getContent()`, memoizat per-request cu `cache()`
  din React; e singurul loc din care paginile/componentele citesc conținutul. Nu mai
  există import direct din `content/site.ts` (fișierul a fost șters).
- `app/admin/` + `components/admin/` — panoul de administrare. `middleware.ts` +
  [lib/admin-auth.ts](lib/admin-auth.ts) protejează `/admin/*` și `/api/admin/*` cu un
  cookie semnat HMAC (fără OAuth — utilizatorul nu e tehnic).

Editează text/date **doar** din `/admin` sau, pentru valorile inițiale ale unui site nou,
din `content/defaults.ts` — niciodată direct în componente/pagini. Componentele primesc
conținutul ca props din Server Components care apelează `getContent()`.

## Constrângere de design importantă

Toate cele 34 de poze din `public/img/galerie/` (originale în `poze/`, neatinse) sunt
**postări de social media portret 4:5, cu ramă magenta și watermark ASDC** — zero poze
landscape, zero cadre de acțiune apropiate. De-asta:
- Nu există un hero cinematic pe lățime clasic; hero-ul folosește o poză 4:5 scalată
  (`scale-110`) ca rama să iasă din cadru, plus gradient întunecat puternic.
- Pozele apar în carduri/mozaicuri la raportul lor nativ 4:5.
- Componenta `Crest` decupează blazonul (JPG cu fundal opac cu pattern) via
  `clip-path: circle(47%)` — nu editare de imagine.
- Dacă Dan trimite poze landscape noi (cerute în CONTENT-TODO), hero-ul poate trece la un
  tratament mai convențional.

## Convenții

- Text UI și comentarii în cod: **română**, cu diacritice corecte.
- Mobile-first explicit cerut de utilizator: bară fixă jos pe mobil (Sună/WhatsApp/Înscrie),
  desktop nu trebuie neglijat dar mobilul e prioritar la fiecare decizie de layout.
- Formular de înscriere ([components/EnrollForm.tsx](components/EnrollForm.tsx) +
  [app/api/inscriere/route.ts](app/api/inscriere/route.ts)): trebuie să funcționeze fără
  `RESEND_API_KEY` configurat — fallback grațios spre telefon/WhatsApp, nu eroare brută.
  Nu elimina acest fallback.
- Același principiu se aplică la `ADMIN_PASSWORD` (fără el, `/admin` răspunde clar că e
  dezactivat, nu eroare brută) și la `BLOB_READ_WRITE_TOKEN` (fără el, conținutul se
  salvează local — vezi `lib/content-store.ts`).
- La orice modificare, rulează `npm run build` (type-check + lint + prerender) înainte de a
  considera treaba terminată.

## Status (vezi memory pentru cel mai recent)

Toate cele 9 etape din planul original sunt completate (setup, poze, design foundation,
homepage, pagini interioare, formular+API, SEO, documentație, verificare). Ulterior s-a
adăugat panoul complet de administrare (`/admin`) descris mai sus, ca Dan să poată edita
singur orice conținut, în locul fluxului bazat pe `CONTENT-TODO.md` + aprobarea mea.

**Site live în producție** pe [danchilom.com](https://danchilom.com) (Vercel + domeniu
cumpărat, DNS pe GoDaddy). `ADMIN_PASSWORD` și `BLOB_READ_WRITE_TOKEN` configurate — admin-ul
scrie definitiv (nu doar local) și conținutul are copii de siguranță automate (vezi mai sus).

**Analytics** — GA4 conectat (`GA_MEASUREMENT_ID` în layout, exclude automat sesiunile din
`/admin`) + un tab nativ **`/admin/analytics`** ("Trafic site") care interoghează direct
Google Analytics Data API prin `lib/ga-report.ts`, folosind un Service Account
(`GA_SERVICE_ACCOUNT_JSON` + `GA_PROPERTY_ID` în Vercel — cheia JSON nu există nicăieri în
repo, doar în variabilele de mediu). Presetări Azi/Ieri/7/28/90 zile + interval
personalizat, grafic tip candlestick pe zile, defalcare pe țară/oraș. S-a preferat această
soluție codificată în locul unui embed Looker Studio, la cererea explicită a utilizatorului.

**SEO local** — Search Console verificat (proprietate de domeniu) cu sitemap trimis; Google
Business Profile existent identificat și în curs de actualizare (link către site, program,
status).

Nu s-a făcut încă: configurarea Resend (formularul funcționează pe fallback telefon/WhatsApp,
comportament permanent acceptat — vezi mai sus), orice conținut din `CONTENT-TODO.md`
confirmat de Dan (acum se rezolvă direct din `/admin`).
