import { StatsForm } from "@/components/admin/forms/StatsForm";
import { getContent } from "@/lib/content";

export default async function AdminStatsPage() {
  const { stats } = await getContent();
  return <StatsForm initial={stats} />;
}
