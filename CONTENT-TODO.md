# De confirmat cu Dan Chilom înainte de lansare

Site-ul este complet funcțional, dar o parte din conținut a fost recuperat de pe
site-ul vechi ([danchilom.academy](https://danchilom.academy/)), **care nu a mai fost
actualizat din februarie 2022**. Tot ce e mai jos trebuie confirmat sau corectat.

**Toate corecturile de mai jos se fac direct din panoul de administrare, la `/admin`**
(vezi [README.md](README.md) pentru cum se activează) — nu mai e nevoie să deschizi
codul sau să ceri modificări. Fiecare secțiune de mai jos are notat între paranteze unde
se editează în admin.

---

## 1. Prioritate mare — fără astea nu lansăm

### Bazele de antrenament (`/admin/baze`)
Pozele recente arată **un teren cu bannere Gold Nutrition și o clădire alb-roșie**, care
nu pare să corespundă niciuneia dintre cele două baze descrise pe site-ul vechi.

- [ ] Care baze sunt active în sezonul curent?
- [ ] Adresele exacte (pentru hărți și pentru Google).
- [ ] Dotările reale ale fiecărei baze (site-ul vechi zice: teren omologat FRF, nocturnă,
      3 vestiare, 70 de locuri la Arena Națională; teren 42×22 m, tenis-fotbal, balon
      presostatic încălzit la Parcul Florilor).
- [ ] Mai există balonul presostatic pentru iarnă?

### Grupele și programul (`/admin/grupe`)
- [ ] Anii de naștere pe fiecare grupă (acum: inițiere 2019–2022, juniori 2012–2018,
      performanță 2008–2011 și seniori).
- [ ] Zilele și orele de antrenament, pe grupă și pe bază.
- [ ] Numărul de antrenamente pe săptămână la fiecare grupă.
- [ ] În ce competiții e înscrisă fiecare grupă în sezonul curent.

### Taxa (`/admin/grupe`, în descrierea fiecărei grupe)
Momentan nu există un câmp separat de preț — dacă vrei un preț afișat, poate fi adăugat
în textul „Descriere scurtă" sau în lista „Ce se lucrează" al fiecărei grupe.
- [ ] Taxa lunară pe grupă. Momentan site-ul spune „sună-ne și îți spunem exact” —
      merge, dar un preț afișat convertește mai bine.
- [ ] Antrenamentul de probă este gratuit? Câte ședințe?
- [ ] Ce echipament trebuie să aibă copilul la început și ce costă echipamentul de club.

### Date de contact (`/admin/contact`)
- [ ] Telefonul **0729 669 747** este cel corect? (apare și în poze, deci pare actual)
- [ ] Emailul: `asdanchilom@yahoo.com` e de pe site-ul vechi. După cumpărarea domeniului
      recomand ceva de forma `contact@danchilom.ro` — arată mult mai serios.
- [ ] Intervalul orar în care răspundeți la telefon (acum: Luni–Vineri, 10:00–20:00).

---

## 2. Prioritate medie

### Staff tehnic (`/admin/staff`)
Momentan apar doi oameni, luați de pe site-ul vechi:
- Dan Alexandru Chilom — fondator, Licența UEFA A
- Constantin Niculae — preparator fizic (Dinamo București, Sporting Lisabona)

- [ ] Cine mai lucrează acum cu grupele? Nume, rol, licență.
- [ ] Este Constantin Niculae încă la club?
- [ ] **Poze cu antrenorii** — o poză de portret pentru fiecare ar face pagina „Despre”
      mult mai credibilă.

### Palmares (`/admin/palmares`)
Lista actuală se oprește în 2021 (debutul seniorilor în Liga 4).
- [ ] Rezultate 2022 → 2026: campionate, cupe, turnee.
- [ ] Situația actuală a echipei de seniori — mai joacă în Liga 4?
- [ ] Foști elevi ajunși la cluburi de Liga 1 sau la loturi naționale — sunt cel mai
      puternic argument pentru un părinte. Nume + club.

### Citatul de pe prima pagină (`/admin/citat`)
Textul din secțiunea magenta („Nu toți copiii care vin la noi vor ajunge fotbaliști…”)
este **scris de noi**, în spiritul academiei.
- [ ] Citește-l și spune cum l-ai formula tu. E mesajul tău personal către părinți, ideal
      ar fi să fie chiar cuvintele tale.

### Social media (`/admin/contact`)
- [ ] Facebook e confirmat. Există Instagram, TikTok sau YouTube active? Dacă da, le
      adăugăm în footer și în datele structurate pentru Google.

---

## 3. Ar ridica mult site-ul (opțional)

Poze noi se adaugă din `/admin/galerie` (galeria publică), `/admin/grupe` și `/admin/baze`
(poza fiecărei grupe/baze), `/admin/staff` (poza fiecărui antrenor) sau `/admin/general`
(poza principală și logo-ul).

- [ ] **3–5 poze orizontale (landscape), de calitate.** Toate cele 34 de poze existente
      sunt postări de Facebook în format portret 4:5, cu ramă magenta și watermark ASDC.
      Designul e construit în jurul acestei constrângeri, dar câteva poze late — terenul
      plin de copii, o fază de joc, o poză de grup — ar permite un hero mult mai
      spectaculos.
- [ ] Câteva poze de la meciuri oficiale, cu echipamentul de club.
- [ ] 2–3 testimoniale de la părinți (nume + o frază). Convertesc foarte bine.
- [ ] Un scurt video de prezentare, dacă există.

---

## 4. Aspecte juridice (obligatorii pentru GDPR) — `/admin/date-juridice`

Apar automat în [politica de confidențialitate](app/politica-de-confidentialitate/page.tsx):
- [ ] Denumirea juridică exactă a asociației.
- [ ] CIF-ul și numărul din Registrul asociațiilor și fundațiilor.
- [ ] Sediul social.

---

## 5. Domeniu — `/admin/general`

- [ ] Domeniul de cumpărat (acum e presupus `danchilom.ro`). Se schimbă la „Adresa web a
      site-ului" — de acolo se propagă în sitemap, în datele structurate și în linkurile
      de partajare.
