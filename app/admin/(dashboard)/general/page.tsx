import { GeneralForm } from "@/components/admin/forms/GeneralForm";
import { getContent } from "@/lib/content";

export default async function AdminGeneralPage() {
  const { site } = await getContent();
  return <GeneralForm initial={site} />;
}
