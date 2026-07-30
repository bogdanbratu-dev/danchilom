import { cache } from "react";
import { defaultContent } from "@/content/defaults";
import type { Content } from "@/content/schema";
import { readStoredContent } from "./content-store";

/**
 * Conținutul curent al site-ului (implicit + orice a fost salvat din admin).
 * Memorat per-request cu `cache()`, ca Header/Footer/pagini să poată apela
 * `getContent()` independent, fără să citească stocarea de mai multe ori.
 */
export const getContent = cache(async (): Promise<Content> => {
  const stored = await readStoredContent();
  if (!stored) return defaultContent;
  return { ...defaultContent, ...stored };
});
