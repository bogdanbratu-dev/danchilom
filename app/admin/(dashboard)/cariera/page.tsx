import { FounderCareerForm } from "@/components/admin/forms/FounderCareerForm";
import { getContent } from "@/lib/content";

export default async function AdminFounderCareerPage() {
  const { founderCareer } = await getContent();
  return <FounderCareerForm initial={founderCareer} />;
}
