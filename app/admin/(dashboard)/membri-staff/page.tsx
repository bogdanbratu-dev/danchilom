import { TeamForm } from "@/components/admin/forms/TeamForm";
import { getContent } from "@/lib/content";

export default async function AdminTeamPage() {
  const { teamMembers } = await getContent();
  return <TeamForm initial={teamMembers} />;
}
