import { LegalForm } from "@/components/admin/forms/LegalForm";
import { getContent } from "@/lib/content";

export default async function AdminLegalPage() {
  const { legal } = await getContent();
  return <LegalForm initial={legal} />;
}
