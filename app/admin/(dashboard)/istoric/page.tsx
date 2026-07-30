import { TimelineForm } from "@/components/admin/forms/TimelineForm";
import { getContent } from "@/lib/content";

export default async function AdminTimelinePage() {
  const { timeline } = await getContent();
  return <TimelineForm initial={timeline} />;
}
