import { GalleryForm } from "@/components/admin/forms/GalleryForm";
import { getContent } from "@/lib/content";

export default async function AdminGalleryPage() {
  const { gallery } = await getContent();
  return <GalleryForm initial={gallery} />;
}
