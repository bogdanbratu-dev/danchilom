import { ValuesForm } from "@/components/admin/forms/ValuesForm";
import { getContent } from "@/lib/content";

export default async function AdminValuesPage() {
  const { values } = await getContent();
  return <ValuesForm initial={values} />;
}
