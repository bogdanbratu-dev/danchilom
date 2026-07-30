import { BasesForm } from "@/components/admin/forms/BasesForm";
import { getContent } from "@/lib/content";

export default async function AdminBasesPage() {
  const { bases } = await getContent();
  return <BasesForm initial={bases} />;
}
