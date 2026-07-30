import { TrophiesForm } from "@/components/admin/forms/TrophiesForm";
import { getContent } from "@/lib/content";

export default async function AdminTrophiesPage() {
  const { trophies } = await getContent();
  return <TrophiesForm initial={trophies} />;
}
