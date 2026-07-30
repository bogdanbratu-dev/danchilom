import Link from "next/link";
import type { Contact } from "@/content/schema";
import { IconPhone, IconWhatsapp } from "./Icons";

/**
 * Bara fixă de acțiuni, vizibilă doar pe mobil. Cele trei lucruri pe care
 * un părinte le vrea la îndemână: să sune, să scrie pe WhatsApp, să înscrie copilul.
 */
export function MobileActionBar({ contact }: { contact: Contact }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/95 backdrop-blur-md lg:hidden">
      <div className="grid grid-cols-3 pb-[env(safe-area-inset-bottom)]">
        <a
          href={contact.phoneHref}
          className="flex min-h-14 flex-col items-center justify-center gap-1 text-[11px] font-semibold uppercase tracking-wide text-paper transition-colors active:bg-surface"
        >
          <IconPhone className="size-5 text-brand-soft" />
          Sună
        </a>
        <a
          href={contact.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-14 flex-col items-center justify-center gap-1 border-x border-line text-[11px] font-semibold uppercase tracking-wide text-paper transition-colors active:bg-surface"
        >
          <IconWhatsapp className="size-5 text-brand-soft" />
          WhatsApp
        </a>
        <Link
          href="/contact"
          className="flex min-h-14 flex-col items-center justify-center bg-brand text-[11px] font-bold uppercase tracking-wide text-white transition-colors active:bg-brand-soft"
        >
          Înscrie
          <span className="text-[11px]">copilul</span>
        </Link>
      </div>
    </div>
  );
}
