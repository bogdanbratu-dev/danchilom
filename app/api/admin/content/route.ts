import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { defaultContent } from "@/content/defaults";
import { getSectionSchema, sectionKeys, type SectionKey } from "@/content/schema";
import { getContent } from "@/lib/content";
import { readStoredContent, writeStoredContent } from "@/lib/content-store";

export async function GET() {
  const content = await getContent();
  return NextResponse.json(content);
}

function isSectionKey(value: unknown): value is SectionKey {
  return typeof value === "string" && (sectionKeys as readonly string[]).includes(value);
}

export async function PUT(request: Request) {
  let body: { section?: unknown; data?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Cerere invalidă." }, { status: 400 });
  }

  if (!isSectionKey(body.section)) {
    return NextResponse.json({ error: "Secțiune necunoscută." }, { status: 400 });
  }

  const schema = getSectionSchema(body.section);
  const result = schema.safeParse(body.data);
  if (!result.success) {
    return NextResponse.json(
      { error: "Date invalide.", details: result.error.flatten() },
      { status: 400 },
    );
  }

  try {
    const current = (await readStoredContent()) ?? defaultContent;
    const updated = { ...current, [body.section]: result.data };
    await writeStoredContent(updated);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Eroare necunoscută.";
    return NextResponse.json({ error: `Salvarea a eșuat: ${message}` }, { status: 500 });
  }

  revalidatePath("/", "layout");

  return NextResponse.json({ ok: true });
}
