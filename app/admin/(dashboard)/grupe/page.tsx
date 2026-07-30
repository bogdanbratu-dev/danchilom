import { GroupsForm } from "@/components/admin/forms/GroupsForm";
import { getContent } from "@/lib/content";

export default async function AdminGroupsPage() {
  const { groups } = await getContent();
  return <GroupsForm initial={groups} />;
}
