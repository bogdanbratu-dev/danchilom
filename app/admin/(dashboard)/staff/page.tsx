import { StaffForm } from "@/components/admin/forms/StaffForm";
import { getContent } from "@/lib/content";

export default async function AdminStaffPage() {
  const { staff } = await getContent();
  return <StaffForm initial={staff} />;
}
