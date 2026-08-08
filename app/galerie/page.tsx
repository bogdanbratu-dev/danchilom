import type { Metadata } from "next";
import { GalleryGrid } from "@/components/GalleryGrid";
import { ButtonGhost, ButtonPrimary, PageHero } from "@/components/UI";
import { getContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Galerie foto — fotbal copii București",
  description:
    "Fotografii de la antrenamentele și meciurile AS Dan Chilom: grupele de copii, juniorii, echipa de seniori și bazele de antrenament din București.",
  alternates: { canonical: "/galerie" },
};

export default async function GaleriePage() {
  const { contact, gallery } = await getContent();

  return (
    <>
      <PageHero
        eyebrow="Galerie"
        title="Antrenamente, meciuri și zile obișnuite la club"
        intro="Nu sunt poze de ședință foto. Sunt copii la antrenament, pe ploaie, în nocturnă, la meci. Cam așa arată o săptămână la AS Dan Chilom."
      />

      <section className="container-site py-16 lg:py-20">
        <GalleryGrid photos={gallery} />
      </section>

      <section className="border-t border-line bg-surface/60">
        <div className="container-site py-16 text-center lg:py-20">
          <h2 className="text-2xl">Vrei să vezi cum se lucrează, pe viu?</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted">
            Vino la un antrenament de probă, fără nicio obligație.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonPrimary href="/contact">Înscrie copilul</ButtonPrimary>
            <ButtonGhost href={contact.facebook}>Vezi și pe Facebook</ButtonGhost>
          </div>
        </div>
      </section>
    </>
  );
}
