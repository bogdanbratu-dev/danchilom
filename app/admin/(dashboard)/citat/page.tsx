import { FounderQuoteForm } from "@/components/admin/forms/FounderQuoteForm";
import { getContent } from "@/lib/content";

export default async function AdminFounderQuotePage() {
  const { founderQuote } = await getContent();
  return <FounderQuoteForm initial={founderQuote} />;
}
