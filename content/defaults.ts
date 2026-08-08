/**
 * Conținutul inițial (seed) al site-ului — folosit prima dată, înainte ca
 * cineva să modifice ceva din admin (/admin). După prima salvare din admin,
 * conținutul real vine din stocarea dinamică (vezi lib/content-store.ts);
 * acest fișier rămâne doar ca bază de pornire și ca plasă de siguranță dacă
 * un câmp nou lipsește din datele salvate.
 *
 * Câmpurile marcate cu TODO(Dan) sunt preluate de pe site-ul vechi
 * (danchilom.academy, nemodificat din februarie 2022) — Dan le poate corecta
 * oricând direct din admin, fără ajutor tehnic.
 */
import type { Content } from "./schema";

export const defaultContent: Content = {
  site: {
    name: "AS Dan Chilom",
    longName: "AS Dan Chilom Academy",
    tagline: "Fiecare copil are un început. Noi îl construim corect.",
    motto: "Uniți, nimeni nu ne poate învinge!",
    foundedYear: 2011,
    url: "https://danchilom.ro",
    description:
      "Școală de fotbal pentru copii și juniori în București, din 2011. Antrenori licențiați UEFA, competiții oficiale AMFB și FRF, baze proprii de antrenament.",
    logo: "/img/logo.jpg",
    heroImage: "/img/galerie/copii-mici-antrenament.jpg",
  },

  contact: {
    phone: "0729 669 747",
    phoneHref: "tel:+40729669747",
    whatsappHref: "https://wa.me/40729669747",
    email: "asdanchilom@yahoo.com",
    emailHref: "mailto:asdanchilom@yahoo.com",
    facebook: "https://www.facebook.com/asdanchilom/",
    instagram: "",
    youtube: "",
    tiktok: "",
    schedule: "Luni – Vineri, 10:00 – 20:00",
  },

  legal: {
    entityName: "",
    cif: "",
    registeredAddress: "",
  },

  stats: [
    { value: "2011", label: "Anul înființării clubului" },
    { value: "UEFA A/B", label: "Antrenori licențiați" },
    { value: "4–18 ani", label: "Grupe de vârstă" },
    { value: "Liga 4", label: "Echipă de seniori" },
  ],

  values: [
    {
      icon: "whistle",
      title: "Antrenori licențiați UEFA",
      text: "Lucrăm exclusiv cu antrenori care au licență UEFA A și B. Copilul tău nu învață fotbal la întâmplare, ci după o metodologie clară, potrivită vârstei lui.",
    },
    {
      icon: "trophy",
      title: "Competiții oficiale, nu doar antrenamente",
      text: "Suntem club afiliat la AMFB. Copiii joacă meciuri oficiale în campionatul Bucureștiului, cu legitimare, arbitri și clasament — acolo se învață cu adevărat.",
    },
    {
      icon: "path",
      title: "Un drum complet, de la 4 ani la seniori",
      text: "Puțini au asta: începi la grupa de inițiere și poți ajunge până la echipa de seniori din Liga 4. Nu trebuie să pleci în altă parte ca să crești.",
    },
    {
      icon: "heart",
      title: "Caracter înainte de rezultat",
      text: "Punctualitate, respect, muncă și spirit de echipă. Fotbalul e mijlocul; omul care iese la capăt e scopul. Asta ne interesează cel mai mult.",
    },
    {
      icon: "shield",
      title: "Baze proprii, antrenamente tot anul",
      text: "Terenuri cu gazon sintetic, nocturnă și vestiare. Iarna se lucrează sub balon presostatic încălzit, deci programul nu se oprește în sezonul rece.",
    },
    {
      icon: "users",
      title: "Grupe mici, atenție pentru fiecare",
      text: "Nu îngrămădim 40 de copii pe un teren. Grupele sunt echilibrate ca număr și nivel, ca fiecare copil să primească timp și corecție individuală.",
    },
  ],

  // TODO(Dan): confirmă anii de naștere pe grupe, numărul de antrenamente pe
  // săptămână și competițiile în care e înscrisă fiecare grupă în sezonul curent.
  groups: [
    {
      slug: "initiere",
      name: "Inițiere",
      ages: "4 – 7 ani",
      years: "născuți 2019 – 2022",
      summary:
        "Primul contact cu mingea și cu ideea de echipă. Totul se face prin joc: copilul trebuie să plece de la antrenament obosit și fericit, nu speriat.",
      focus: [
        "Coordonare, echilibru și motricitate generală",
        "Familiarizarea cu mingea, primele conduceri și șuturi",
        "Reguli simple de joc și de grup",
        "Încredere în sine și bucuria de a veni la teren",
      ],
      sessions: "2 antrenamente pe săptămână",
      competitions: "Jocuri de grup și turnee amicale pentru cei mici",
      image: "/img/galerie/copii-mici-antrenament.jpg",
      imageAlt:
        "Copii de grădiniță în echipament roz, la antrenamentul grupei de inițiere a AS Dan Chilom",
    },
    {
      slug: "juniori",
      name: "Juniori — competițional",
      ages: "8 – 14 ani",
      years: "născuți 2012 – 2018",
      summary:
        "Etapa în care se construiește jucătorul. Tehnica individuală devine serioasă, apar principiile tactice, iar copiii intră în campionatul oficial al Bucureștiului.",
      focus: [
        "Tehnică individuală: conducere, dribling, pasă, finalizare",
        "Principii tactice de joc, pe posturi și pe faze",
        "Pregătire fizică adaptată vârstei",
        "Meciuri oficiale în fiecare etapă",
      ],
      sessions: "3 antrenamente pe săptămână + meci oficial",
      competitions: "Campionatele AMFB (mini-fotbal și fotbal în 11)",
      image: "/img/galerie/copii-exercitii-tehnice.jpg",
      imageAlt:
        "Grupă de juniori AS Dan Chilom la un exercițiu tehnic cu conuri, pe terenul de antrenament",
    },
    {
      slug: "performanta",
      name: "Performanță și seniori",
      ages: "15 – 18 ani și seniori",
      years: "născuți 2008 – 2011 și peste",
      summary:
        "Pentru cei care vor mai mult. Volum și intensitate de club, pregătire fizică specifică și pasul firesc către echipa de seniori a clubului, care joacă în Liga 4.",
      focus: [
        "Pregătire fizică specializată și prevenirea accidentărilor",
        "Analiză tactică și responsabilitate în joc",
        "Antrenament individual pe post",
        "Promovare către echipa de seniori și către cluburi de performanță",
      ],
      sessions: "3 – 4 antrenamente pe săptămână + meci oficial",
      competitions: "Competiții FRF / AMFB și Liga 4 la seniori",
      image: "/img/galerie/juniori-alergare-grup.jpg",
      imageAlt: "Grupa de performanță a AS Dan Chilom aleargă la încălzire pe baza de antrenament",
    },
  ],

  // TODO(Dan): confirmă care baze sunt active în sezonul curent și adresele exacte.
  bases: [
    {
      slug: "arena-nationala",
      name: "Baza Arena Națională",
      address: "Str. Tony Bulandra nr. 35–39 (intrare din Str. Maior Coravu), Sector 2, București",
      area: "Sector 2 · lângă Arena Națională",
      facilities: [
        "Teren mare de fotbal, omologat FRF",
        "Instalație de nocturnă",
        "Trei vestiare",
        "70 de locuri pentru spectatori",
      ],
      mapsQuery: "Strada Tony Bulandra 35-39, București",
      images: [
        { src: "/img/galerie/baza-teren-si-cladire.jpg", alt: "Terenul de fotbal al bazei de la Arena Națională, la apus" },
        { src: "/img/galerie/banca-de-rezerve.jpg", alt: "Banca de rezerve și vestiarele bazei de antrenament" },
        { src: "/img/galerie/vestiar-nou.jpg", alt: "Vestiar nou amenajat, cu bănci, la baza de antrenament AS Dan Chilom" },
      ],
    },
    {
      slug: "parcul-florilor",
      name: "Baza Parcul Florilor",
      address: "Parcul Florilor, Pantelimon, Sector 2, București",
      area: "Sector 2 · Pantelimon",
      facilities: [
        "Teren de mini-fotbal 42 × 22 m, cu nocturnă",
        "Teren de tenis-fotbal la dimensiuni regulamentare",
        "Trei vestiare",
        "Balon presostatic încălzit, pentru antrenamente iarna",
      ],
      mapsQuery: "Parcul Florilor, Pantelimon, București",
      images: [
        { src: "/img/galerie/copii-la-banner-club.jpg", alt: "Copii la antrenament pe terenul din Parcul Florilor, lângă bannerul clubului" },
        { src: "/img/galerie/teren-cu-poarta-seara.jpg", alt: "Terenul de mini-fotbal cu poartă și nocturnă, seara" },
        { src: "/img/galerie/copii-slalom-printre-conuri.jpg", alt: "Copii care fac slalom printre conuri la antrenament" },
      ],
    },
  ],

  // TODO(Dan): confirmă anii și evenimentele din istoric și adaugă ce s-a
  // întâmplat între 2022 și azi.
  timeline: [
    { year: "2010", title: "Prima grupă", text: "Dan Chilom strânge o singură grupă de copii născuți în 2002 și începe să lucreze cu ei, de la zero." },
    { year: "2011", title: "Clubul se înființează oficial", text: "AS Dan Chilom devine club înregistrat, afiliat la Asociația Municipală de Fotbal București." },
    { year: "2013", title: "Primul titlu și primul trofeu internațional", text: "Generația 2002 devine campioană a Bucureștiului la mini-fotbal și câștigă turneul Nicola Iordanov din Bulgaria." },
    { year: "2015 – 2017", title: "Turnee în Europa", text: "Copiii academiei câștigă turnee la Viena, München și Riccione — primele deplasări mari pentru multe dintre generații." },
    { year: "2021", title: "Echipa de seniori intră în Liga 4", text: "Clubul închide cercul: un copil poate începe la 4 ani și poate ajunge, la același club, în echipa de seniori." },
  ],

  // TODO(Dan): completează staff-ul tehnic actual (nume, rol, licență) și trimite poze.
  staff: [
    {
      name: "Dan Alexandru Chilom",
      role: "Fondator și antrenor principal",
      license: "Licența UEFA A",
      bio: "A pornit academia în 2010, cu o singură grupă de copii născuți în 2002. De atunci a crescut clubul generație după generație, cu aceeași idee simplă: copiii vin la fotbal ca să le placă și rămân pentru că devin mai buni.",
      photo: "",
    },
    {
      name: "Constantin Niculae",
      role: "Preparator fizic",
      license: "Specialist pregătire fizică",
      bio: "Experiență de lucru la Dinamo București și Sporting Lisabona. Se ocupă de pregătirea fizică a grupelor mari și de prevenirea accidentărilor.",
      photo: "",
    },
  ],

  // TODO(Dan): trimite pozele fiecărui membru din echipă.
  teamMembers: [
    { name: "Ioan Chilom", role: "Președinte", photo: "" },
    { name: "Dan Chilom", role: "Licență UEFA A", photo: "" },
    { name: "Dorian Perianu", role: "Licență UEFA B", photo: "" },
    { name: "David Enache", role: "Licență UEFA C", photo: "" },
    { name: "Gheorghiu Rareș", role: "Licență UEFA C", photo: "" },
    { name: "Niculae „Sensei” Constantin", role: "Licență UEFA, preparator fizic", photo: "" },
    { name: "Sacalov Andrei", role: "Delegat", photo: "" },
    { name: "Patrick", role: "Social Media", photo: "" },
  ],

  // TODO(Dan): citatul de mai jos e scris de noi, în spiritul academiei —
  // spune-ne cum l-ai formula tu, e mesajul tău personal către părinți.
  founderQuote: {
    text: "Nu toți copiii care vin la noi vor ajunge fotbaliști. Dar toți pleacă de aici cu ceva: disciplină, prieteni, curajul de a încerca din nou după ce au greșit. Asta rămâne cu ei toată viața, indiferent ce aleg să facă mai departe.",
    author: "Dan Chilom",
    role: "Fondator, antrenor cu Licența UEFA A",
    image: "/img/galerie/dan-chilom-cu-copiii.jpg",
    imageAlt: "Dan Chilom alături de copii din academie, pe terenul de antrenament",
  },

  // TODO(Dan): completează/corectează cariera de jucător după cum vrei să apară pe site.
  founderCareer: {
    position: "Portar",
    trainedAt: "Crescut la FC Dinamo București",
    intro:
      "Înainte de a fonda academia, Dan Chilom a fost portar, crescut la FC Dinamo București. A jucat atât în România, cât și în Finlanda, iar astăzi pune la treabă, ca antrenor licențiat UEFA A, tot ce a învățat pe teren.",
    clubs: [
      { club: "Dinamo București", league: "Liga 1", detail: "1 prezență" },
      {
        club: "IFK Mariehamn",
        league: "Veikkausliiga (prima ligă a Finlandei)",
        detail: "22 de meciuri: 15 în campionat și 7 în Cupa Ligii Finlandeze",
      },
      { club: "Dinamo 2 București", league: "Liga 2", detail: "" },
      { club: "FC Snagov", league: "Liga 2 și Liga 3", detail: "" },
      { club: "FC Poiana Câmpina", league: "Liga 2", detail: "" },
      { club: "FC Buftea", league: "Ligi inferioare", detail: "" },
    ],
    nationalTeam:
      "Peste 45 de meciuri pentru echipele naționale de juniori și tineret ale României. Participant cu naționala U18 la Campionatul European din Anglia.",
    license: "Licența UEFA A, din 2018.",
    photo: "/img/galerie/dan-chilom-portar.jpg",
    photoAlt: "Dan Chilom, portar, în timpul carierei sale de jucător",
  },

  trophies: [
    { year: "2013", title: "Locul 1 — Nicola Iordanov Cup, Bulgaria", scope: "international" },
    { year: "2012–2013", title: "Campioană a Bucureștiului la mini-fotbal, generația 2002", scope: "national" },
    { year: "2015", title: "Locul 1 — Pokal Cup, Viena", scope: "international" },
    { year: "2016", title: "Locul 1 — München Summer Cup", scope: "international" },
    { year: "2016–2017", title: "Locul 3 la fotbal în 11, campionatul Bucureștiului", scope: "national" },
    { year: "2017", title: "Locul 1 — Riccione Summer Cup, Italia", scope: "international" },
    { year: "2017–2018", title: "Vicecampioană a Bucureștiului la mini-fotbal", scope: "national" },
    { year: "2021", title: "Debutul echipei de seniori în Liga 4", scope: "national" },
    // TODO(Dan): adaugă rezultatele din 2022 până azi — site-ul vechi se oprește în 2022.
  ],

  gallery: [
    { src: "/img/galerie/copil-conduce-mingea.jpg", alt: "Copil care conduce mingea la antrenamentul AS Dan Chilom" },
    { src: "/img/galerie/copil-primul-sut.jpg", alt: "Copil pregătindu-se să șuteze la poartă, pe terenul academiei" },
    { src: "/img/galerie/dan-chilom-cu-copiii.jpg", alt: "Dan Chilom alături de doi copii din academie și un fost elev al clubului" },
    { src: "/img/galerie/juniori-stretching.jpg", alt: "Grupa de juniori la stretching, înainte de antrenament" },
    { src: "/img/galerie/juniori-alergare-grup.jpg", alt: "Juniorii academiei aleargă în grup la încălzire" },
    { src: "/img/galerie/copii-mici-antrenament.jpg", alt: "Copiii de la grupa de inițiere, în echipament roz, la antrenament" },
    { src: "/img/galerie/copii-mici-cu-mingea.jpg", alt: "Copii mici alergând după minge pe terenul cu gazon sintetic" },
    { src: "/img/galerie/copii-la-banner-club.jpg", alt: "Doi copii la antrenament, lângă bannerul cu sigla AS Dan Chilom" },
    { src: "/img/galerie/antrenament-seara-copii.jpg", alt: "Antrenament de seară cu grupele de copii ale academiei" },
    { src: "/img/galerie/grupa-juniori-exercitii.jpg", alt: "Grupă de juniori strânsă pe teren, în timpul unui exercițiu" },
    { src: "/img/galerie/joc-pe-echipe-copii.jpg", alt: "Joc pe echipe la antrenamentul copiilor, cu vestre colorate" },
    { src: "/img/galerie/copii-slalom-printre-conuri.jpg", alt: "Copii care fac slalom printre conuri, cu mingea la picior" },
    { src: "/img/galerie/copii-exercitii-tehnice.jpg", alt: "Exercițiu tehnic cu mingea, la grupa de juniori" },
    { src: "/img/galerie/copii-pase-pe-teren.jpg", alt: "Copii care exersează pasele pe terenul de antrenament" },
    { src: "/img/galerie/antrenor-cu-portarul.jpg", alt: "Antrenorul lucrează individual cu portarul echipei" },
    { src: "/img/galerie/antrenament-pe-ploaie-01.jpg", alt: "Antrenament ținut pe ploaie, cu grupele de copii" },
    { src: "/img/galerie/antrenament-pe-ploaie-02.jpg", alt: "Copii la joc pe teren, în timpul unei ploi" },
    { src: "/img/galerie/antrenament-pe-ploaie-03.jpg", alt: "Antrenament pe vreme rea, la baza din Sector 2" },
    { src: "/img/galerie/antrenament-pe-ploaie-04.jpg", alt: "Exercițiu de finalizare la poartă, pe ploaie" },
    { src: "/img/galerie/antrenament-pe-ploaie-05.jpg", alt: "Joc cu tema pe teren ud, la grupele mici" },
    { src: "/img/galerie/antrenament-pe-ploaie-06.jpg", alt: "Antrenament complet, indiferent de vreme, la AS Dan Chilom" },
    { src: "/img/galerie/antrenament-pe-ploaie-07.jpg", alt: "Copii la joc pe teren, sub supravegherea antrenorului" },
    { src: "/img/galerie/antrenament-pe-ploaie-08.jpg", alt: "Antrenor și copii într-un exercițiu de posesie, pe ploaie" },
    { src: "/img/galerie/meci-in-nocturna-01.jpg", alt: "Meci disputat în nocturnă de echipele academiei" },
    { src: "/img/galerie/meci-in-nocturna-02.jpg", alt: "Meci în nocturnă, cu spectatori pe marginea terenului" },
    { src: "/img/galerie/meci-in-nocturna-03.jpg", alt: "Fază de joc în nocturnă, la echipa mare a clubului" },
    { src: "/img/galerie/incalzire-in-nocturna.jpg", alt: "Încălzirea echipei înainte de meciul din nocturnă" },
    { src: "/img/galerie/seniori-alergare-baza.jpg", alt: "Echipa de seniori la alergare, pe baza de antrenament" },
    { src: "/img/galerie/seniori-incalzire.jpg", alt: "Seniorii AS Dan Chilom la încălzire, înainte de antrenament" },
    { src: "/img/galerie/teren-la-apus-slogan.jpg", alt: "Terenul de fotbal al academiei, fotografiat la apus" },
    { src: "/img/galerie/teren-cu-poarta-seara.jpg", alt: "Poarta și terenul cu gazon sintetic, seara" },
    { src: "/img/galerie/baza-teren-si-cladire.jpg", alt: "Baza de antrenament a clubului, văzută de la colțul terenului" },
    { src: "/img/galerie/banca-de-rezerve.jpg", alt: "Banca de rezerve și vestiarele de la baza de antrenament" },
    { src: "/img/galerie/vestiar-nou.jpg", alt: "Vestiar nou amenajat, cu bănci, la baza clubului" },
  ],

  // TODO(Dan): confirmă răspunsurile, mai ales cel despre antrenamentul de probă și taxa lunară.
  faq: [
    { q: "De la ce vârstă poate începe copilul?", a: "De la 4 ani, la grupa de inițiere. La vârsta asta lucrăm prin joc: coordonare, familiarizare cu mingea și obișnuința de a fi parte dintr-un grup." },
    { q: "Copilul meu nu a mai jucat fotbal organizat. E o problemă?", a: "Nu. Cei mai mulți copii vin fără experiență. Îl punem într-o grupă potrivită ca vârstă și nivel, iar de acolo ne ocupăm noi." },
    { q: "Pot veni întâi la un antrenament, să vedem dacă îi place?", a: "Da. Sună la 0729 669 747, stabilim ziua și veniți la un antrenament de probă, fără nicio obligație. Vezi cum se lucrează, vede și copilul dacă îi place." },
    { q: "Ce echipament îi trebuie la început?", a: "Pentru primele antrenamente sunt suficiente niște ghete de teren sintetic, jambiere și apărători. Echipamentul de club se discută după înscriere." },
    { q: "Se antrenează și iarna?", a: "Da. Terenul de la Parcul Florilor este acoperit iarna cu balon presostatic încălzit, așa că programul continuă normal în sezonul rece." },
    { q: "Cât costă?", a: "Taxa lunară diferă în funcție de grupă și de numărul de antrenamente. Sună-ne la 0729 669 747 și îți spunem exact pentru grupa copilului tău." },
  ],

  nav: [
    { href: "/", label: "Acasă" },
    { href: "/despre", label: "Despre noi" },
    { href: "/dan-chilom", label: "Dan Chilom" },
    { href: "/grupe", label: "Grupe" },
    { href: "/baze", label: "Baze" },
    { href: "/galerie", label: "Galerie" },
    { href: "/contact", label: "Contact" },
  ],
};
