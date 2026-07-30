import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileActionBar } from "@/components/MobileActionBar";
import { getContent } from "@/lib/content";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const { site } = await getContent();
  return {
    metadataBase: new URL(site.url),
    title: {
      default: "AS Dan Chilom — Școală de fotbal pentru copii în București",
      template: "%s | AS Dan Chilom",
    },
    description: site.description,
    keywords: [
      "școală de fotbal copii București",
      "academie de fotbal juniori București",
      "fotbal copii Sector 2",
      "fotbal copii Pantelimon",
      "AS Dan Chilom",
      "înscriere fotbal copii",
    ],
    authors: [{ name: site.longName }],
    openGraph: {
      type: "website",
      locale: "ro_RO",
      url: site.url,
      siteName: site.longName,
      title: "AS Dan Chilom — Școală de fotbal pentru copii în București",
      description: site.description,
    },
    twitter: {
      card: "summary_large_image",
      title: "AS Dan Chilom — Școală de fotbal pentru copii în București",
      description: site.description,
    },
    robots: { index: true, follow: true },
    alternates: { canonical: "/" },
  };
}

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { site, contact, bases, nav } = await getContent();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: site.longName,
    alternateName: site.name,
    description: site.description,
    url: site.url,
    logo: site.logo.startsWith("http") ? site.logo : `${site.url}${site.logo}`,
    image: `${site.url}/img/galerie/copil-conduce-mingea.jpg`,
    telephone: "+40729669747",
    email: contact.email,
    foundingDate: String(site.foundedYear),
    slogan: site.motto,
    sameAs: [contact.facebook, contact.instagram].filter(Boolean),
    areaServed: { "@type": "City", name: "București" },
    sport: "Fotbal",
    address: {
      "@type": "PostalAddress",
      streetAddress: bases[0].address,
      addressLocality: "București",
      addressCountry: "RO",
    },
    location: bases.map((b) => ({
      "@type": "Place",
      name: b.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: b.address,
        addressLocality: "București",
        addressCountry: "RO",
      },
    })),
  };

  return (
    <html lang="ro" className={`${inter.variable} ${oswald.variable}`}>
      <body>
        <a
          href="#continut"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-3 focus:font-semibold focus:text-white"
        >
          Sari la conținut
        </a>
        <Header site={site} contact={contact} nav={nav} />
        <main id="continut">{children}</main>
        <Footer site={site} contact={contact} nav={nav} bases={bases} />
        <MobileActionBar contact={contact} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
