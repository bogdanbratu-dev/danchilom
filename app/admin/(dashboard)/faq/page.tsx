import { FaqForm } from "@/components/admin/forms/FaqForm";
import { getContent } from "@/lib/content";

export default async function AdminFaqPage() {
  const { faq } = await getContent();
  return <FaqForm initial={faq} />;
}
