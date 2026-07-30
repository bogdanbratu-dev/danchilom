import { ContactForm } from "@/components/admin/forms/ContactForm";
import { getContent } from "@/lib/content";

export default async function AdminContactPage() {
  const { contact } = await getContent();
  return <ContactForm initial={contact} />;
}
